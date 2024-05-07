import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import "remixicon/fonts/remixicon.css";
import EducationInfo from "../overlays/EducationInfo";
import Class12th from "../overlays/Class12th";
import Class10th from "../overlays/class10th";
import KeySkills from "../overlays/Key_Skills";
import Internship from "../overlays/Internship";

const Info_fill = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenClass12th, setIsOpenClass12th] = useState(false);
  const [isOpenClass10th, setIsOpenClass10th] = useState(false);
  const [isOpenSkills, setIsOpenSkills] = useState(false);
  const [isOpenInternships, setIsOpenInternships] = useState(false);

  const dispatch = useDispatch();

  const {
    CourseName,
    Specialization,
    CollegeName,
    CGPA,
    CourseDuration,
    LinkedinUrl,
    GitHubUrl,
  } = useSelector((store) => store.HigherEdu.HigerEducationInput);

  const LinkedInRoute = () => {
    const Url = `https://${LinkedinUrl}`;
    window.open(Url, "_blank");
  };
  const GithubRouteRoute = () => {
    const Url = `${GitHubUrl}`;
    window.open(Url, "_blank");
  };
  const toCertificate = () => {
    const Url = certification;
    window.open(Url, "_blank");
  };

  const { ExaminationBoard, Percentage, PassingYear } = useSelector(
    (store) => store.Class12th.class12_Input
  );

  const { ExaminationBoard10th, Percentage10th, PassingYear10th } = useSelector(
    (store) => store.Class10th.class10_Input
  );

  const skills = useSelector((store) => store.KeySkills.skills);

  const AddedSkills = skills.map((skill) => (
    <span key={skill.id}>
      <span className="p-2 m-2 ml-0 pl-0 text-blue-600">{skill.text}</span>
    </span>
  ));

  const certification = useSelector(
    (store) => store.CertificationInfo.certifications
  );
  // console.log(certification);

  const AddCertification = certification.map((certificate_info) => {
    if (certificate_info.id && certificate_info.certificationName) {
      return (
        <span key={certificate_info.id}>
          <span className="p-2 m-3 bg-blue-500 rounded-xl">
            <button onClick={toCertificate}>
              <span>{certificate_info.certificationName}</span>
            </button>
            <button
              className="pl-1 font-bold text-xl hover:text-white"
              onClick={() =>
                dispatch(certification.Remove(certificate_info.id))
              }
            >
              x
            </button>
          </span>
        </span>
      );
    }
    return null;
  });

  const { CompanyName, Internshipduration } = useSelector(
    (store) => store.Internship.UserInputIntership
  );

  return (
    <>
      <div className="flex flex-col bg-slate-50 rounded-xl justify-start items-center h-full w-4/5 border-solid m-3 gap-4 p-4 shadow-xl xsm:w-4/5 sm:w-4/5 md:w-4/5 lg:w-4/5">
        <div className=" flex flex-col justify-evenly bg-slate-100 border-2 border-blue-400 gap-2 h-1/3 w-full p-4 rounded-3xl sm:w-full md:w-full lg:w-full xsm:w-full">
          <h2 className="font-semibold text-2xl m-2">Education</h2>

          <div className="flex flex-col bg-blue-200 rounded-lg p-3 pl-10 w-full gap-2 mb-3">
            <h3 className="font-semibold text-lg pb-1">
              Higher Education{" "}
              <button onClick={() => setIsOpen(true)}>
                <i className="ri-edit-2-fill"></i>
              </button>
              <EducationInfo
                showModal={isOpen}
                onClose={() => setIsOpen(false)}
              />
            </h3>

            <h3 className="font-medium font-serif mr-2 text-base">
              CourseName: <span className="font-light p-3 ">{CourseName}</span>
            </h3>

            <h3 className="font-medium  font-serif mr-2 text-base">
              Specialization:{" "}
              <span className="font-light p-3 ">{Specialization}</span>
            </h3>
            <h3 className="font-medium  font-serif mr-2 text-base">
              from: <span className="font-light p-3 ">{CollegeName}</span>
            </h3>
            <h3 className="font-medium  font-serif mr-2 text-base">
              Course Duration:{" "}
              <span className="font-light p-3 ">{CourseDuration}</span>
            </h3>
            <h3 className="font-medium  font-serif mr-2 text-base">
              CGPA: <span className="font-light p-3 ">{CGPA}</span>
            </h3>
          </div>

          {/* class XII */}
          <div className="flex flex-col bg-blue-200 rounded-lg p-3 pl-10 w-full gap-2 mb-3">
            <h3 className="font-semibold text-lg pb-1">
              Class XII{" "}
              <button onClick={() => setIsOpenClass12th(true)}>
                <i className="ri-edit-2-fill"></i>
              </button>
            </h3>
            <Class12th
              showModal={isOpenClass12th}
              onClose={() => setIsOpenClass12th(false)}
            />
            <h3 className="font-medium  font-serif mr-2 text-base">
              Examination Board:{" "}
              <span className="font-light p-3 ">{ExaminationBoard}</span>
            </h3>
            <h3 className="font-medium  font-serif mr-2 text-base">
              Scored: <span className="font-light p-3 ">{Percentage}%</span>
            </h3>
            <h3 className="font-medium  font-serif mr-2 text-base">
              Passed out in:{" "}
              <span className="font-light p-3 ">{PassingYear}</span>
            </h3>
          </div>

          <div className="flex flex-col bg-blue-200 rounded-lg p-3 pl-10 w-full gap-2 mb-3">
            <h3 className="font-medium">
              Class X{" "}
              <button onClick={() => setIsOpenClass10th(true)}>
                <i className="ri-edit-2-fill"></i>
              </button>
              <Class10th
                showModal={isOpenClass10th}
                onClose={() => setIsOpenClass10th(false)}
              />
            </h3>
            <h3 className="font-medium  font-serif mr-2 text-base">
              Examination Board:{" "}
              <span className="font-light p-3 ">{ExaminationBoard10th}%</span>
            </h3>
            <h3 className="font-medium  font-serif mr-2 text-base">
              Scored: <span className="font-light p-3 ">{Percentage10th}%</span>
            </h3>
            <h3 className="font-medium  font-serif mr-2 text-base">
              Passed out in:{" "}
              <span className="font-light p-3 ">{PassingYear10th}%</span>
            </h3>
          </div>
        </div>

        {/* keySkills */}
        <div className="bg-slate-100 border-2 border-blue-400  h-1/3 w-full  p-4 rounded-3xl">
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
            {AddedSkills}
          </span>
        </div>

        {/* certification */}
        <div className="bg-slate-100 border-2 border-blue-400  h-1/3 w-full p-4 rounded-3xl">
          <h2 className="font-semibold text-lg pb-1">
            Certification <i className="ri-edit-2-fill"></i>
          </h2>

          {/* apprearing tag logic */}
          {AddCertification ? (
            <span>{AddCertification}</span>
          ) : (
            <h2 className="mt-3">
              Talk about any certified courses that you completed
            </h2>
          )}
        </div>
        <div className="bg-slate-100 border-2 border-blue-400  h-1/3 w-full p-4 rounded-3xl ">
          <h2 className="font-semibold text-lg pb-1 -m-1">
            <button onClick={() => setIsOpenInternships(true)}>
              Internships
              <i className="ri-edit-2-fill"></i>
            </button>
          </h2>
          <Internship
            showModal={isOpenInternships}
            onClose={() => setIsOpenInternships(false)}
          />

          {/* {intership tag aprearing logic} */}
          {CompanyName && Internshipduration ? (
            <>
              <div className="font-medium  font-serif mr-2 text-base">
                Company Name:
                <span className="font-normal p-3 text-base uppercase">
                  {CompanyName}
                </span>
              </div>
              <div className="font-medium  font-serif mr-2 text-base">
                Internship Duraion:
                <span className="font-normal p-3 text-base uppercase">
                  {Internshipduration}
                </span>
              </div>
            </>
          ) : (
            <h2>
              Talk about the company you interned at, what projects you
              undertook and what special skills you learned
            </h2>
          )}
        </div>
        <div className="bg-slate-100 border-2 border-blue-400  h-1/3 w-full p-4 rounded-3xl">
          <h2 className="font-semibold text-lg pb-1">LinkedIn</h2>
          <div className=" rounded-lg flex flex-col items-center gap-4 p-4">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 "
              onClick={LinkedInRoute}
            >
              <input type="hidden" className=" " value="" />
              <label
                htmlFor="text"
                className="btn upload-button cursor-pointer"
              >
                To Profile
              </label>
            </button>
            <div className="help-text title-medium text-md">
              You would be directed to my LinkedIn profile
            </div>
          </div>
        </div>
        <div className="bg-slate-100 border-2 border-blue-400  h-1/3 w-full p-4 rounded-3xl">
          <h2 className="font-semibold text-lg pb-1">Github</h2>
          <div className=" rounded-lg flex flex-col items-center gap-4 p-4">
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={GithubRouteRoute}
            >
              <input type="hidden" className=" " value="" />
              <label
                htmlFor="text"
                className="btn upload-button cursor-pointer"
              >
                To Profile
              </label>
            </button>
            <div className="help-text title-medium text-md">
              You would be directed to my GitHub profile
            </div>
          </div>
        </div>
        <div className="bg-slate-100 border-2 border-blue-400  h-1/3 w-full p-4 rounded-3xl">
          <h2 className="font-semibold text-lg pb-1">Resume</h2>
          <div className=" rounded-lg flex flex-col items-center gap-4 p-4">
            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <input
                type="file"
                className="upload-input hidden "
                id="undefined-err-inp"
              />
              <label
                htmlFor="undefined-err-inp"
                className="btn upload-button cursor-pointer"
              >
                Upload resume
              </label>
            </button>
            <div className="help-text title-14-medium text-md">
              Supported formats: doc, docx, rtf, pdf, up to 2MB
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Info_fill;
