import { useState } from "react";
import { useSelector } from "react-redux";
import CreateJobPost from "./CreateJobPost";
import JobsList from "./JobsList";
import SearchJobPost from "./SearchJobPost";

const CampusPlacements = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { userType } = useSelector((store) => store.userDetails.userData);

  const handleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="w-full h-full pr-10">
      <SearchJobPost />
      {userType == "Admin" && (
        <button onClick={() => handleForm()}>create job</button>
      )}
      {isFormVisible && (
        <CreateJobPost onClose={() => setIsFormVisible(false)}  jobId={""}/>
      )}
      <JobsList />
    </div>
  );
};
export default CampusPlacements;
