import React from "react";
import CompanyCard from "./CompanyCard";
import Trending from "./Trending";

export default function Companies() {
  const companies = [
    {
      id: 1,
      image: "Logos/amazon-logo-2400x2400-20223105-2.png",
      name: "Amazon",
      location: "Noida",
      jTitle: "SDE",
      desc: "Amazon, a global e-commerce and technology giant, pioneers innovation with customer-centric solutions, including retail, cloud computing, hardware, and entertainment services.",
      questions: ["amazon question 1"],
    },
    {
      id: 2,
      image: "Logos/google-logo-2400x2400-20220519.png",
      name: "Google",
      location: "Bangalore",
      jTitle: "SDE",
      desc: "Google, a tech powerhouse founded in 1998, dominates internet search and services, offering a vast ecosystem spanning from advertising to cloud computing and hardware innovation.",
      questions: ["google question 1"],
    },
    {
      id: 3,
      image: "Logos/microsoft-logo-2400x2400-20220513-3.png",
      name: "Microsoft",
      location: "Bangalore",
      jTitle: "SDE",
      desc: "Microsoft is a global technology corporation renowned for its software products, including Windows, Office, Azure cloud services, and innovative hardware like Surface devices.",
      questions: ["microspft question 1"],
    },
    {
      id: 4,
      image: "Logos/facebook-logo-2400x2400-20220512.png",
      name: "facebook",
      location: "-",
      jTitle: "SDE",
      desc: "Facebook, a leading social media conglomerate, offers software developers opportunities to innovate on platforms like Facebook, Instagram, WhatsApp, and Oculus, shaping global connectivity and digital experiences.",
      questions: ["facebook question 1"],
    },
    {
      id: 5,
      image: "Logos/ibm-logo-2400x2400-20220519-1.png",
      name: "IBM",
      location: "Gurgaon",
      jTitle: "SDE",
      desc: "IBM, a global technology and consulting corporation, pioneers in hardware, software, and cloud computing solutions, driving innovation across industries since its inception in 1911.",
      questions: ["IBM question 1"],
    },
  ];
  return (
    <>
      <div className="mt-[67px]">
        <div className="flex mt-[-20px]">
          <div className="ml-[420px] mt-[25px]">
            {companies.map((e) => {
              return (
                <CompanyCard
                  id={e.id}
                  name={e.name}
                  jTitle={e.jTitle}
                  desc={e.desc}
                  image={e.image}
                  location={e.location}
                />
              );
            })}
          </div>
          <Trending></Trending>
        </div>
      </div>
    </>
  );
}
