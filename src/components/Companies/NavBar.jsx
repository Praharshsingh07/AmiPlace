import React from "react";

export default function NavBar() {
  return (
    <nav className="border-b-[1px] border-gray-500 py-0 fixed right-0 top-0 left-0 flex">
      <h1 className=" py-3 ml-4 text-xl font-extrabold">AmiPlace</h1>
      <ul className="flex ml-[830px]">
        <li className=" font-bold border-b-4 border-black hover:border-[#85AD8A] hover:text-[#85AD8A] hover:duration-500 py-3 ">
          Community
        </li>
        <li className="ml-10 font-bold border-b-4 border-black hover:border-[#85AD8A] hover:text-[#85AD8A] hover:duration-500 py-3">
          Companies
        </li>
        <li className="ml-10 mt-3 font-bold">Profile</li>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-5 ml-1 mb-1"

        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
          />
        </svg>
      </ul>
    </nav>
  );
}
