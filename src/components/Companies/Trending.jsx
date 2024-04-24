import React from "react";

export default function Trending() {
  const newsHeading = [
    "10 Best Chegg Alternatives in 2024",
    "Devin AI: World.s First AI Software Engineer",
    "12 Best FlexClip Alternatives & Competitors in 2024 [Free + Paid]",
    "What Is Trunk-Or-Treat?",
    "30 OOPs Interview Questions and Answers (2024)",
    "10 Best Chegg Alternatives in 2024",
    "Devin AI: World's First AI Software Engineer",
    "12 Best FlexClip Alternatives & Competitors in 2024 [Free + Paid]",
    "What Is Trunk-Or-Treat?",
    "30 OOPs Interview Questions and Answers (2024)",
  ];
  return (
    <>
      <div className=" border-[1px] border-white rounded-md w-96 h-[500px] ml-5 mr-5 mb-5 mt-[25px] p-5 pt-4 bg-[#f5f5f7] fixed">
        <div>
          <h1 className="font-extrabold text-xl border-b-2 pb-2 mb-2 border-[#3E6F90]">
            Trending news
          </h1>
          <ul className="list-disc">
            {newsHeading.map((e, i) => {
              return <li className="ml-5">{e}</li>;
            })}
          </ul>
        </div>
      </div>
    </>
  );
}
