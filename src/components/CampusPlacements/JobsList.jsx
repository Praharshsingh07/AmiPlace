import { useSelector } from "react-redux";
import JobPostCard from "./JobPostCard";
import { useJobsFetch } from "./useJobsFetch";

const JobsList = () => {
  const { loading, error } = useJobsFetch();
  const jobs = useSelector((state) => state.jobs.jobs);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {jobs.map((job) => (
        <JobPostCard job={job} />
      ))}
    </div>
  );
};
export default JobsList;
