import { useState } from "react";
import CompanyDetails from "./CompanyDetails";

const CompanyCard = ({
  companyName,
  CTC,
  Location,
  ForBatch,
  ProfileOffered,
  FunctinalArea,
  Round1,
  Round2,
  Round3,
  Round4,
  Website,
  logo,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div
        className="company_card border-[1px] border-gray-300 p-5 my-5 hover:shadow-xl transition-shadow rounded-md"
        onClick={() => setIsOpen(true)}
      >
        <div className="logo_name flex justify-start mb-3 items-center">
          <div className="logo_name flex space-x-2">
            <img
              src={`${logo}`}
              alt="logo"
              className="w-14 max-h-14 border-[1px] border-gray-400 rounded-sm p-[0.5px]"
            />
            <span className="c-name font-bold mt-4 text-xl">{companyName}</span>
          </div>
        </div>

        <div className="location-size-industry flex justify-between my-3">
          <div className="location">
            <p className="font-bold">Location</p>
            <span className="text-gray-600">{Location}</span>
          </div>
          <div className="employee_size">
            <p className="font-bold">For Batch</p>
            <span className="text-gray-600">{ForBatch}</span>
          </div>
          <div className="CTC">
            <p className="font-bold">Package </p>
            <span className="font-semibold text-green-700">{CTC}</span>
          </div>
        </div>

        <div className="role mt-3">
          <span className="font-bold">Profile Offered: </span>
          <span className="text-blue-700 font-semibold">{ProfileOffered}</span>
        </div>
      </div>
      <CompanyDetails
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        companyName={companyName}
        CTC={CTC}
        Location={Location}
        ForBatch={ForBatch}
        ProfileOffered={ProfileOffered}
        FunctinalArea={FunctinalArea}
        Round1={Round1}
        Round2={Round2}
        Round3={Round3}
        Round4={Round4}
        Website={Website}
      />
    </>
  );
};
export default CompanyCard;
