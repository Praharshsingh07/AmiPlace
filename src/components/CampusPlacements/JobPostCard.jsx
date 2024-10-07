import { deleteDoc, doc } from "firebase/firestore";
import { useState, useRef, useEffect } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useSelector } from "react-redux";
import { auth, db } from "../../firebase.config";
import CreateJobPost from "./CreateJobPost";

const JobPostCard = ({ job }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const userData = useSelector((store) => store.userDetails.userData);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [jobStatus, setJobStatus] = useState("");

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(()=>{
    const checkJobStatus = () => {
      const now = new Date();
      const closingDate = new Date(job.openedTill);
      const openingDate = new Date(job.jobOpeningDate);
      if(now >= closingDate){
        setJobStatus("closed");
      }else if(now >= openingDate && now < closingDate){
        setJobStatus("open");
      }else if(now < openingDate){
        setJobStatus("yetToOpen");
      }
    };
    checkJobStatus();
  },[]);
  

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const downloadJobDescription = () => {
    if (job.jobDescriptionFileUrl) {
      const link = document.createElement("a");
      link.href = job.jobDescriptionFileUrl;
      link.target = "_blank";
      link.download = `${job.companyName}-${job.jobRole}-Description.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };
  const handleDeleteJob = async() => {
    if(userData.userType == "Admin"){
      try {
        await deleteDoc(doc(db, "Jobs", job.id));
      } catch (error) {
        console.error("Error removing document: ", error);
      }
    }
  }

  const DeleteConfirmationDialog = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md mx-4">
        <h3 className="text-lg font-medium mb-2">Are you sure?</h3>
        <p className="text-gray-500 mb-4">
          This action cannot be undone. This will permanently delete the job
          posting.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setShowDeleteDialog(false)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleDeleteJob();
              setShowDeleteDialog(false);
            }}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`w-full max-w-2xl border-2 rounded-lg p-6 m-5 ${
        jobStatus == "closed" ? "border-red-400 bg-red-50" : jobStatus == "open" ? "border-green-400 bg-green-50" : "border-blue-400 bg-blue-50"
      }`}
    >
      <div className="flex justify-between items-start">
        <span className="text-xl font-semibold">{job.companyName}</span>
        <div className="flex items-center gap-4">
          <div className="flex text-sm">
            <span className="font-medium">
              {jobStatus == "closed"
                ? "Closed on:"
                : jobStatus == "open"
                ? "Open Till:"
                : "Opening on:"}
            </span>
            <span
              className={`ml-1 ${
                jobStatus == "closed"
                  ? "text-red-600"
                  : jobStatus == "open"
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {jobStatus == "open"
                ? formatDate(job.openedTill)
                : formatDate(job.jobOpeningDate)}
            </span>
          </div>
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded-full"
            >
              <BsThreeDots className="w-5 h-5" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                <button
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  onClick={() => {
                    setIsFormVisible(true);
                    setShowMenu(false);
                  }}
                >
                  Update Job Data
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setShowDeleteDialog(true);
                    setShowMenu(false);

                  }}
                >
                  Permanent Delete
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => {
                    setShowMenu(false);
                  }}
                >
                  Report Incorrect Data
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {isFormVisible && <CreateJobPost onClose={()=>setIsFormVisible()} jobId={job.id} />           }
      <div className="flex flex-wrap justify-between my-4 ">
        <div className="font-medium mb-2 w-full sm:w-auto">
          <span className="">Job Role: </span>
          <span className="text-blue-600">{job.jobRole}</span>
        </div>
        <div className="mb-2 w-full sm:w-auto font-medium">
          <span className="font-medium">CTC: </span>
          <span className="text-blue-600">INR. {job.ctc} LPA</span>
        </div>
        <div className="mb-2 w-full sm:w-auto">
          <span className="font-medium">Location: </span>
          <span>{job.location}</span>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-medium text-base">Requirements: </span>
        <p className="whitespace-pre-line">{job.requirements}</p>
      </div>

      <div
        className={`text-sm flex flex-wrap w-full mt-4 ${
          userData.userType == "Student" ? "justify-end" : "justify-between"
        }`}
      >
        {userData.userType == "Admin" && jobStatus=="closed" && (
          <button className="border text-white border-gray-300 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
            Fetch Applicants
          </button>
        )}
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <button
            onClick={downloadJobDescription}
            className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 transition-colors duration-200"
          >
            View Details
          </button>
          {userData.userType == "Student" && (
            <div>
              {jobStatus == "closed" ? (
                <span className="text-red-600 font-medium mt-2">Closed !</span>
              ) : jobStatus == "open" ? (
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                  Apply
                </button>
              ) : (
                <span className="text-blue-600 font-medium mt-2">
                  Not Opened
                </span>
              )}
            </div>
          )}
        </div>
      </div>
      {showDeleteDialog && <DeleteConfirmationDialog />}
    </div>
  );
};

export default JobPostCard;
