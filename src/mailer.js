import emailjs from '@emailjs/browser';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './firebase.config';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;

// EmailJS configuration
emailjs.init(EMAILJS_PUBLIC_KEY);

// Maximum recommended recipients per email (adjust based on your email service limits)
const MAX_RECIPIENTS = 50;

async function fetchEligibleUsers(criteria) {
  try {
    const usersRef = collection(db, 'users');
    const queryConstraints = [];

    if (criteria.genderCriteria && criteria.genderCriteria !== 'ForAll') {
      queryConstraints.push(where('gender', '==', criteria.genderCriteria));
    }

    if (criteria.placedCriteria) {
      queryConstraints.push(where('isPlaced', '==', false));
    }

    const q = query(usersRef, ...queryConstraints);
    const snapshot = await getDocs(q);
    
    return snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(user => isUserEligible(user, criteria));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

function isUserEligible(user, criteria) {
  if (!user || !criteria) return false;

  // Course check
  const userCourse = user.course;
  const isEligibleCourse = criteria.selectedCourses.some(course => 
    course === 'All_Tech' || 
    course === 'All_NonTech' || 
    course === userCourse
  );
  if (!isEligibleCourse) return false;

  // CGPA check
  if (user.cgpa < criteria.minCGPA) return false;

  // Education percentage checks
  if (user.percentage10th < criteria.min10thPercentage ||
      user.percentage12th < criteria.min12thPercentage) return false;

  // Backlog check
  if (user.backlogs > criteria.maxBacklogs) return false;

  return true;
}

async function sendBatchEmail(emailAddresses, jobData, retryCount = 0) {
  try {
    // Take the first email as the primary recipient
    const primaryEmail = emailAddresses[0];
    // Rest of the emails go to BCC
    const bccEmails = emailAddresses.slice(1);

    const templateParams = {
      to_email: primaryEmail, // Primary recipient
      to_name: 'Students',
      bcc: bccEmails.join(','), // Rest of recipients in BCC
      company_name: jobData.companyName,
      job_role: jobData.jobRole,
      ctc: jobData.ctc,
      location: jobData.location,
      requirements: jobData.requirements,
      opening_date: new Date(jobData.jobOpeningDate).toLocaleDateString(),
      closing_date: new Date(jobData.openedTill).toLocaleDateString()
    };

    console.log('Sending email with params:', {
      primaryRecipient: primaryEmail,
      bccCount: bccEmails.length
    });

    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return { success: true, emailCount: emailAddresses.length };
  } catch (error) {
    console.error(`Batch email attempt ${retryCount + 1} failed:`, error);

    if (retryCount < 2) { // Maximum 3 attempts
      console.log(`Retrying batch email in 3 seconds...`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return sendBatchEmail(emailAddresses, jobData, retryCount + 1);
    }

    return { 
      success: false, 
      error: error.text || error.message,
      emailCount: emailAddresses.length 
    };
  }
}

export async function sendEmailsToUsers(jobData) {
  if (!jobData) {
    throw new Error('No job data provided to sendEmailsToUsers');
  }

  try {
    const users = await fetchEligibleUsers(jobData.EligibilityCriteria);
    
    if (!users?.length) {
      console.log('No eligible users found to send emails to');
      return { successCount: 0, failureCount: 0 };
    }

    // Collect all valid email addresses
    const allEmails = users.reduce((emails, user) => {
      if (user.email) emails.push(user.email);
      if (user.PersonalEmail) emails.push(user.PersonalEmail);
      return emails;
    }, []);

    if (!allEmails.length) {
      console.log('No valid email addresses found');
      return { successCount: 0, failureCount: 0 };
    }

    // Split emails into batches if they exceed the maximum recipient limit
    const emailBatches = [];
    for (let i = 0; i < allEmails.length; i += MAX_RECIPIENTS) {
      emailBatches.push(allEmails.slice(i, i + MAX_RECIPIENTS));
    }

    const results = {
      successCount: 0,
      failureCount: 0,
      totalEmailsSent: 0,
      totalBatches: emailBatches.length
    };

    // Send emails in batches if necessary
    for (const [index, batch] of emailBatches.entries()) {
      console.log(`Sending batch ${index + 1} of ${emailBatches.length} (${batch.length} recipients)`);
      
      const result = await sendBatchEmail(batch, jobData);
      
      if (result.success) {
        results.successCount += result.emailCount;
        results.totalEmailsSent += 1;
      } else {
        results.failureCount += result.emailCount;
      }

      // Add delay between batches if there are more to send
      if (index < emailBatches.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    }

    console.log('Email sending completed:', {
      batches: emailBatches.length,
      totalRecipients: allEmails.length,
      successfulRecipients: results.successCount,
      failedRecipients: results.failureCount
    });

    return results;
  } catch (error) {
    console.error('Error in sendEmailsToUsers:', error);
    throw error;
  }
}