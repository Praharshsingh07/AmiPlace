import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.config";

const UserList = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showBranchFilter, setShowBranchFilter] = useState(false);
  const [queryResults, setQueryResults] = useState([]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  async function fetchUsers() {
    const querySnapshot = await getDocs(collection(db, "users"));
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    return users;
  }
  const formatValue = (value) => {
    if (typeof value === "object" && value !== null) {
      if (value.seconds && value.nanoseconds) {
        // Convert Firestore Timestamp to a readable date string
        return new Date(value.seconds * 1000).toLocaleString();
      } else if (
        value.description ||
        value.name ||
        value.tags ||
        value.githubLink
      ) {
        // Format project-like object
        return `${value.name || "Unnamed Project"}`;
      } else {
        // For other objects, return a JSON string
        return JSON.stringify(value);
      }
    }
    return value;
  };
  const handleOptionChange = (dropdown, option, isChecked) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [dropdown]: {
        ...(prev[dropdown] || {}),
        [option]: isChecked,
      },
    }));
  };

  const executeQuery = async (query, students) => {
    let result = [];

    if (!students || students.length === 0) {
      students = await fetchUsers();
    }

    students.forEach((s) => {
      let pick = true;

      for (let i in query) {
        if (!pick) break;

        if (["Course", "Branch", "passingOutYear"].includes(i)) {
          if (!query[i].includes(s[i])) {
            pick = false;
          }
        } else if (
          ["CurrentCGPA", "TenthPercentage", "TwelfthPercentage"].includes(i)
        ) {
          if (s[i] < query[i]) {
            pick = false;
          }
        } else if (i === "isDebard") {
          if (s.isDebard !== query.isDebard) {
            pick = false;
          }
        } else if (i === "Gender") {
          if (s.Gender !== query.Gender) {
            pick = false;
          }
        } else if (i === "CurrentBacklogs") {
          if (s.CurrentBacklogs > query.CurrentBacklogs) {
            pick = false;
          }
        } else if (i === "isPlaced") {
          if (s.isPlaced !== query.isPlaced) {
            pick = false;
          }
        }
      }

      if (pick) {
        result.push(s);
      }
    });

    setQueryResults(result);
  };

  useEffect(() => {
    const selectedCourses = selectedOptions["Course"] || {};
    const shouldShowBranchFilter =
      selectedCourses["B.Tech"] || selectedCourses["M.Tech"];
    setShowBranchFilter(shouldShowBranchFilter);
  }, [selectedOptions]);

  const createQueryObject = async () => {
    const query = {};

    const addToQuery = (
      queryKey,
      dropdownTitle,
      transform = (x) => x,
      multiSelect = true
    ) => {
      const selected = Object.entries(selectedOptions[dropdownTitle] || {})
        .filter(([_, isSelected]) => isSelected)
        .map(([option]) => transform(option));

      if (selected.length > 0) {
        query[queryKey] = multiSelect ? selected : selected[0];
      }
    };

    addToQuery("Course", "Course");
    addToQuery("Branch", "Branch");
    addToQuery("passingOutYear", "Passout Batch");
    addToQuery(
      "Gender",
      "Gender Criteria",
      (gender) => (gender === "All" ? undefined : gender),
      false
    );
    addToQuery("CurrentCGPA", "Min CGPA", parseFloat, false);
    addToQuery("TwelfthPercentage", "12th", parseInt, false);
    addToQuery("TenthPercentage", "10th", parseInt, false);
    addToQuery(
      "isDebard",
      "debar criteria",
      (option) => (option === "Undebar only" ? false : undefined),
      false
    );
    addToQuery("CurrentBacklogs", "Min Backlogs", parseInt, false);
    addToQuery(
      "isPlaced",
      "Placed Criteria",
      (option) => {
        if (option === "Unplaced Only") return false;
        if (option === "Placed Only") return true;
        return undefined;
      },
      false
    );

    Object.keys(query).forEach(
      (key) => query[key] === undefined && delete query[key]
    );

    executeQuery(query, await fetchUsers());
  };

  const Dropdown = ({ title, options, multiSelect = false }) => (
    <div className="relative">
      <button
        className="px-3 py-2 bg-gray-100 rounded-md flex items-center"
        onClick={() => toggleDropdown(title)}
      >
        {title} <ChevronDown size={16} className="ml-1" />
      </button>
      {activeDropdown === title && (
        <div className="absolute mt-1 w-48 bg-white shadow-lg rounded-md z-10">
          <div className="py-1">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex items-center px-4 py-2 hover:bg-gray-100"
              >
                <input
                  type={multiSelect ? "checkbox" : "radio"}
                  id={`${title}-${option}`}
                  name={title}
                  checked={selectedOptions[title]?.[option] || false}
                  onChange={(e) => {
                    if (multiSelect) {
                      handleOptionChange(title, option, e.target.checked);
                    } else {
                      const newSelectedOptions = {
                        ...selectedOptions,
                        [title]: { [option]: true },
                      };
                      setSelectedOptions(newSelectedOptions);
                    }
                  }}
                  className="mr-2"
                />
                <label
                  htmlFor={`${title}-${option}`}
                  className="text-sm text-gray-700 w-full cursor-pointer"
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const getSpecificFields = (student) => {
    const fields = [
      "FullName",
      "Branch",
      "Course",
      "Gender",
      "CurrentBacklogs",
      "CurrentCGPA",
      "DOB",
      "EnrollmentNumber",
      "Semester",
      "Specialization",
      "TenthPercentage",
      "TwelfthPercentage",
      "email",
      "passingOutYear",
      "PersonalEmail",
    ];

    return fields.reduce((acc, field) => {
      acc[field] = student[field];
      return acc;
    }, {});
  };
  return (
    <div className="container mx-auto p-4 font-sans">
      <h2 className={`text-2xl font-semibold my-2`}>Mark Students:</h2>
      <div>
        <label htmlFor="debar">Debar / Undebar: </label>
        <input
          type="text"
          name="debar"
          id="debar"
          placeholder="Enter Enrollment Number..."
          className=" border w-[20%] px-2 py-1 mx-3"
        />
        <button className="">Debar</button>
        <button>Undebar</button>
      </div>
      <div className="my-2">
        <label htmlFor="debar">Placed / Unplaced : </label>
        <input
          type="text"
          name="debar"
          id="debar"
          placeholder="Enter Enrollment Number..."
          className=" border w-[20%] px-2 py-1 mx-3"
        />
        <button className="">Placed</button>
        <button className="">Unplaced</button>
      </div>
      <h2 className={`text-2xl font-semibold my-3`}>Filter Students:</h2>
      <div className="flex space-x-2 mb-4">
        <Dropdown
          title="Course"
          options={["B.Tech", "M.Tech", "MCA", "BCA"]}
          multiSelect={true}
        />
        {showBranchFilter && (
          <Dropdown
            title="Branch"
            options={[
              "All",
              "CSE",
              "ECE",
              "ME",
              "Civil Er.",
              "EE",
              "Chemical Er.",
              "Other",
            ]}
            multiSelect={true}
          />
        )}
        <Dropdown
          title="Passout Batch"
          options={["2025", "2026", "2027", "2028"]}
          multiSelect={true}
        />
        <Dropdown title="Gender Criteria" options={["All", "Male", "Female"]} />
        <Dropdown
          title="Min CGPA"
          options={["6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5"]}
        />
        <Dropdown
          title="12th"
          options={["60", "65", "70", "75", "80", "85", "90", "95"]}
        />
        <Dropdown
          title="10th"
          options={["60", "65", "70", "75", "80", "85", "90", "95"]}
        />
        <Dropdown title="debar criteria" options={["All", "Undebar only"]} />
        <Dropdown title="Min Backlogs" options={["0", "1", "2", "3", "4"]} />
        <Dropdown
          title="Placed Criteria"
          options={["All", "Unplaced Only", "Placed Only"]}
        />
        <button
          className="px-3 py-2 bg-blue-500 text-white rounded-md flex items-center"
          onClick={createQueryObject}
        >
          Get Students
        </button>
      </div>

      {queryResults.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                {Object.keys(getSpecificFields(queryResults[0])).map((key) => (
                  <th
                    key={key}
                    className="px-4 py-2 text-left whitespace-nowrap"
                  >
                    {key}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queryResults.map((student, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
                >
                  {Object.entries(getSpecificFields(student)).map(
                    ([key, value]) => (
                      <td
                        key={`${index}-${key}`}
                        className="border px-4 py-2 whitespace-nowrap"
                      >
                        {formatValue(value)}
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserList;
