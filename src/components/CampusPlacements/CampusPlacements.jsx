import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { PlusCircle } from "lucide-react";
import CreateJobPost from "./CreateJobPost";
import JobsList from "./JobsList";
import SearchJobPost from "./SearchJobPost";

const TypewriterText = ({ texts, typingSpeed = 50, deletingSpeed = 50, pauseDuration = 1000 }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer;

    if (isDeleting) {
      if (currentText === '') {
        setIsDeleting(false);
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
        timer = setTimeout(() => {}, pauseDuration);
      } else {
        timer = setTimeout(() => {
          setCurrentText((prevText) => prevText.slice(0, -1));
        }, deletingSpeed);
      }
    } else {
      if (currentText === texts[currentTextIndex]) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      } else {
        timer = setTimeout(() => {
          setCurrentText((prevText) => texts[currentTextIndex].slice(0, prevText.length + 1));
        }, typingSpeed);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, currentTextIndex, isDeleting, texts, typingSpeed, deletingSpeed, pauseDuration]);

  // Find the longest text to use for sizing
  const longestText = texts.reduce((a, b) => a.length > b.length ? a : b, '');

  return (
    <div style={{ minHeight: '1.2em', position: 'relative' }}>
      <span 
        className="text-3xl font-bold invisible"
        aria-hidden="true"
        style={{ visibility: 'hidden', whiteSpace: 'pre' }}
      >
        {longestText}
      </span>
      <span 
        className="text-3xl font-bold absolute top-0 left-0 right-0"
        style={{ whiteSpace: 'pre' }}
      >
        {currentText}
      </span>
    </div>
  );
};

const CampusPlacements = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [filter, setFilter] = useState("Currently Opened");
  const { userType } = useSelector((store) => store.userDetails.userData);

  const handleForm = () => {
    setIsFormVisible(!isFormVisible);
  };
  const backgroundImageUrl = 'https://firebasestorage.googleapis.com/v0/b/amiplace-3c576.appspot.com/o/amitybg%2Famitybg-2.webp?alt=media&token=95df1c1a-ad6a-4b41-9673-533e3ce10f81';
  
  const typingTexts = ["Campus Placements", "Career Opportunities . . .", "Job Listings", "Recruitment Drive . . ."];

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen min-w-full bg-white relative">
      <div 
        className="hidden md:block absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      
      <div className="relative z-10">
        <h1 className="text-center mb-8 sm:text-white">
          <TypewriterText texts={typingTexts} />
        </h1>

        <div className="mb-8">
          <SearchJobPost />
        </div>

        <div className="flex items-center mb-6">
          <div className="space-x-2 mx-auto">
            {["All", "Currently Opened", "Upcoming", "Closed"].map((option) => (
              <button
                key={option}
                onClick={() => setFilter(option)}
                className={`px-2 py-1 md:px-4 md:py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === option
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {userType === "Admin" && (
            <button
              onClick={handleForm}
              className="flex items-center px-3 py-1 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              <span className="sm:before:content-['Create_Job'] before:content-['Add']"></span>
            </button>
          )}
        </div>

        {isFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
              <CreateJobPost onClose={() => setIsFormVisible(false)} jobId={""} />
            </div>
          </div>
        )}

        <JobsList filter={filter} />
      </div>
    </div>
  );
};

export default CampusPlacements;