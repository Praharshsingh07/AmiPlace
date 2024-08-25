// ResumeView.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase.config';

const ResumeView = () => {
  const [userResume, setUserResume] = useState(null);

  useEffect(() => {
    const fetchUserResume = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const resumeDocRef = db.collection('Resume').doc(currentUser.uid);
          const resumeDocSnapshot = await resumeDocRef.get();
          if (resumeDocSnapshot.exists) {
            setUserResume(resumeDocSnapshot.data());
          }
        } else {
          console.log('User not authenticated');
        }
      } catch (error) {
        console.error('Error fetching user resume:', error);
      }
    };

    fetchUserResume();
  }, []);

  // ... (render user resume data)
};

export default ResumeView;