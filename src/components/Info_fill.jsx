import React, { useEffect, useState, useRef } from 'react';
import 'remixicon/fonts/remixicon.css';
import EducationInfo from '../overlays/EducationInfo';
import Class12th from '../overlays/Class12th';
import Class10th from '../overlays/class10th';
import KeySkills from '../overlays/Key_Skills';
import Internship from '../overlays/Internship';
import { auth } from "../firebase.config";
import { db, storage } from '../firebase.config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Info_fill = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenClass12th, setIsOpenClass12th] = useState(false);
  const [isOpenClass10th, setIsOpenClass10th] = useState(false);
  const [isOpenSkills, setIsOpenSkills] = useState(false);
  const [isOpenInternships, setIsOpenInternships] = useState(false);
  const [userResume, setUserResume] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleResume = async () => {
    console.log('Uploading resume...');
    const fileInput = fileInputRef.current;
    if (selectedFile) {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log('Uploading resume...');
          const file = selectedFile;
          const storageRef = ref(storage, `resumes/${currentUser.uid}/${file.name}`);
          const snapshot = await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(snapshot.ref);

          const userDocRef = doc(db, 'users', currentUser.uid);
          await updateDoc(userDocRef, { 'resume.fileURL': downloadURL });

          console.log('Resume uploaded successfully');
        } else {
          console.log('User not authenticated');
        }
      } catch (error) {
        console.error('Error uploading resume:', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  useEffect(() => {
    const fetchUserResume = async () => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnapshot = await getDoc(userDocRef);
          if (userDocSnapshot.exists()) {
            setUserResume(userDocSnapshot.data());
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

  const LinkedInRoute = () => {
    const Url = `https://${userResume?.LinkedinUrl}`;
    window.open(Url, '_blank');
  };

  const GithubRouteRoute = () => {
    const Url = `${userResume?.GitHubUrl}`;
    window.open(Url, '_blank');
  };

  const toCertificate = (certificateUrl) => {
    window.open(certificateUrl, '_blank');
  };

  return (
    <>
      <div className="flex flex-col bg-slate-50 rounded-xl justify-start items-center h-full w-4/5 border-solid m-3 gap-4 p-4 shadow-xl xsm:w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5">
        <div className=" flex flex-col justify-evenly bg-slate-100 border-2 border-blue-400 gap-2 h-1/3 w-full p-4 rounded-3xl sm:w-full md:w-full lg:w-full xsm:w-full">
          <h2 className="font-semibold text-2xl m-2">Education</h2>

          <div className="flex flex-col bg-blue-200 rounded-lg p-3 pl-10 w-full gap-2 mb-3">
            <h3 className="font-semibold text-lg pb-1">
              Higher Education{' '}
              <button onClick={() => setIsOpen(true)}>
                <i className="ri-edit-2-fill"></i>
              </button>
              <EducationInfo showModal={isOpen} onClose={() => setIsOpen(false)} />
            </h3>

            <h3 className="font-medium font-serif mr-2 text-base">
              CourseName: <span className="font-light p-3 ">{userResume?.educationInfo?.CourseName}</span>
            </h3>

            <h3 className="font-medium font-serif mr-2 text-base">
              Specialization: <span className="font-light p-3 ">{userResume?.educationInfo?.Specialization}</span>
            </h3>
            <h3 className="font-medium font-serif mr-2 text-base">
              from: <span className="font-light p-3 ">{userResume?.educationInfo?.CollegeName}</span>
            </h3>
            <h3 className="font-medium font-serif mr-2 text-base">
              Course Duration: <span className="font-light p-3 ">{userResume?.educationInfo?.CourseDuration}</span>
            </h3>
            <h3 className="font-medium font-serif mr-2 text-base">
              CGPA: <span className="font-light p-3 ">{userResume?.educationInfo?.CGPA}</span>
            </h3>
          </div>

          {/* class XII */}
          <div className="flex flex-col bg-blue-200 rounded-lg p-3 pl-10 w-full gap-2 mb-3">
            <h3 className="font-semibold text-lg pb-1">
              Class XII{' '}
              <button onClick={() => setIsOpenClass12th(true)}>
                <i className="ri-edit-2-fill"></i>
              </button>
            </h3>
            <Class12th showModal={isOpenClass12th} onClose={() => setIsOpenClass12th(false)} />
            <h3 className="font-medium font-serif mr-2 text-base">
              Examination Board: <span className="font-light p-3 ">{userResume?.class12thInfo?.ExaminationBoard}</span>
            </h3>
            <h3 className="font-medium font-serif mr-2 text-base">
              Scored: <span className="font-light p-3 ">{userResume?.class12thInfo?.Percentage}%</span>
            </h3>
            <h3 className="font-medium font-serif mr-2 text-base">
              Passed out in: <span className="font-light p-3 ">{userResume?.class12thInfo?.PassingYear}</span>
            </h3>
          </div>

          <div className="flex flex-col bg-blue-200 rounded-lg p-3 pl-10 w-full gap-2 mb-3">
            <h3 className="font-medium">
              Class X{' '}
              <button onClick={() => setIsOpenClass10th(true)}>
                <i className="ri-edit-2-fill"></i>
              </button>
              <Class10th showModal={isOpenClass10th} onClose={() => setIsOpenClass10th(false)} />
            </h3>
            <h3 className="font-medium font-serif mr-2 text-base">
              Examination Board:{' '}
              <span className="font-light p-3 ">{userResume?.class10thInfo?.ExaminationBoard10th}%</span>
            </h3>
            <h3 className="font-medium font-serif mr-2 text-base">
              Scored: <span className="font-light p-3 ">{userResume?.class10thInfo?.Percentage10th}%</span>
            </h3>
            <h3 className="font-medium font-serif mr-2 text-base">
              Passed out in:{' '}
              <span className="font-light p-3 ">{userResume?.class10thInfo?.PassingYear10th}</span>
            </h3>
          </div>
        </div>

        {/* keySkills */}
      <div className="bg-slate-100 border-2 border-blue-400 h-1/3 w-full p-4 rounded-3xl">
        <h2 className="font-semibold text-lg pb-1">
          Key Skills
          <button onClick={() => setIsOpenSkills(true)}>
            <i className="ri-edit-2-fill"></i>
          </button>
        </h2>
        <KeySkills
          showModal={isOpenSkills}
          onClose={() => setIsOpenSkills(false)}
        />

        <span className="text-black text-base font-semibold">
          {userResume?.keySkills?.map((skill) => (
            <span key={skill} className="p-2 m-2 ml-0 pl-0 text-blue-600">
              {skill}
            </span>
          ))}
        </span>
      </div>

      {/* certification */}
      <div className="bg-slate-100 border-2 border-blue-400 h-1/3 w-full p-4 rounded-3xl">
        <h2 className="font-semibold text-lg pb-1">
          Certification <i className="ri-edit-2-fill"></i>
        </h2>

        {/* Appearing tag logic */}
        {userResume?.certifications?.length > 0 ? (
          userResume.certifications.map((certification) => (
            <span key={certification} className="p-2 m-3 bg-blue-500 rounded-xl">
              <button onClick={() => toCertificate(certification.certificationUrl)}>
                <span>{certification.certificationName}</span>
              </button>
            </span>
          ))
        ) : (
          <h2 className="mt-3">No certifications added yet</h2>
        )}
      </div>

      <div className="bg-slate-100 border-2 border-blue-400 h-1/3 w-full p-4 rounded-3xl">
        <h2 className="font-semibold text-lg pb-1 -m-1">
          <button onClick={() => setIsOpenInternships(true)}>
            Internships
            <i className="ri-edit-2-fill"></i>
          </button>
        </h2>
        <Internship showModal={isOpenInternships} onClose={() => setIsOpenInternships(false)} />

        {/* Internship tag appearing logic */}
        {userResume?.internshipInfo ? (
          <>
            <div className="font-medium font-serif mr-2 text-base">
              Company Name:
              <span className="font-normal p-3 text-base uppercase">{userResume.internshipInfo.CompanyName}</span>
            </div>
            <div className="font-medium font-serif mr-2 text-base">
              Internship Duration:
              <span className="font-normal p-3 text-base uppercase">{userResume.internshipInfo.Internshipduration}</span>
            </div>
          </>
        ) : (
          <h2>No internship information added yet</h2>
        )}
      </div>

      <div className="bg-slate-100 border-2 border-blue-400 h-1/3 w-full p-4 rounded-3xl">
        <h2 className="font-semibold text-lg pb-1">LinkedIn</h2>
        <div className=" rounded-lg flex flex-col items-center gap-4 p-4">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={LinkedInRoute}
          >
            <input type="hidden" className=" " value="" />
            <label htmlFor="text" className="btn upload-button cursor-pointer">
              To Profile
            </label>
          </button>
          <div className="help-text title-medium text-md">You would be directed to my LinkedIn profile</div>
        </div>
      </div>

      <div className="bg-slate-100 border-2 border-blue-400 h-1/3 w-full p-4 rounded-3xl">
        <h2 className="font-semibold text-lg pb-1">GitHub</h2>
        <div className=" rounded-lg flex flex-col items-center gap-4 p-4">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={GithubRouteRoute}
          >
            <input type="hidden" className=" " value="" />
            <label htmlFor="text" className="btn upload-button cursor-pointer">
              To Profile
            </label>
          </button>
          <div className="help-text title-medium text-md">You would be directed to my GitHub profile</div>
        </div>
      </div>

      <div className="bg-slate-100 border-2 border-blue-400 h-1/3 w-full p-4 rounded-3xl">
      <h2 className="font-semibold text-lg pb-1">Resume</h2>
      <div className=" rounded-lg flex flex-col items-center gap-4 p-4">
        <button onClick={handleResume} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <input type="file" className="upload-input hidden " ref={fileInputRef} onChange={handleFileChange} />
          <label htmlFor="undefined-err-inp" className="btn upload-button cursor-pointer">
            Upload resume
          </label>
        </button>
        <div className="help-text title-14-medium text-md">Supported formats: doc, docx, rtf, pdf, up to 2MB</div>
      </div>
    </div>
    </div>
  </>
);
};

export default Info_fill;