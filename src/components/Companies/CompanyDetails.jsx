import React from "react";

export default function CompanyDetails() {
  const questions = [
    "Given a sorted dictionary (array of words) of an alien language, find the order of characters in the language.",
    "Given an array arr[] of size n, its prefix sum array is another array prefixSum[] of the same size, such that the value of prefixSum[i] is arr[0] + arr[1] + arr[2] … arr[i].",
    "Given an array of integers, find the next biggest number.",
    "Given an array of distinct integers arr, find all pairs of elements with the minimum absolute difference of any two elements.",
    "Lowest Common ancestor in a Binary Search Tree and Binary Tree.",
    "Implement a stack with push(), pop() and min() in O(1) time.",
    "Reverse a linked list in groups of size k",
    "Given two numbers represented by two linked lists, write a function that returns sum list",
    "Rotate a matrix by 90 degree.",
  ];
  return (
    <>
      <div className="border-[1px] h-[100px] border-gray-500 mt-[60px] mx-3 mb-[5px] bg-gradient-to-r from-[#3E6F90] via-[#80A4A0] to-[#85AD88]">
        <div className="bg-white mt-8 h-[66.5px] flex">
          <img
            src="Logos/amazon-logo-2400x2400-20223105-2.png"
            alt=""
            className="w-[75px] h-[75px] border-[1px] border-gray-500 mt-[-21px] ml-3 bg-white"
          />
          <div className="ml-3 mt-[5px]">
            <h1 className="font-extrabold text-xl">Amazon</h1>
            <h3 className="">CTC offered: 19.75 LPA</h3>
          </div>
        </div>
      </div>
      <div className="border-[1px] border-gray-500 mt-[10px] mx-3">
        <p className="ml-5 mt-3 mr-5 text-justify">
          <span className="font-bold">Job Description :</span> A Software
          Development Engineer (SDE) at Amazon typically works on designing,
          developing, and maintaining software systems and applications. The job
          description for an SDE at Amazon may include the following
          responsibilities and qualifications which will be described in
          attached PDF file forwarded by the university to all the eligible
          students. <br /> <br />
        </p>
      </div>
      <div className="mx-3 mt-3">
        <h1 className="font-extrabold">PREVIOUSLY ASKED QUESTIONS</h1>
        {questions.map((e, i) => {
          return (
            <h3 className="border-[1p] border-[#85AD8A] m-2 p-2 rounded-lg hover:shadow-md hover:shadow-black hover:duration-500">
              {i + 1}. {e}
            </h3>
          );
        })}
      </div>
    </>
  );
}
