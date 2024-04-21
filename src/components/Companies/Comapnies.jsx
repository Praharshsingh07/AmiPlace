import React from "react";
import CompanyCard from "./CompanyCard";
import Trending from "./Trending";
import { CompanyCards } from "../Store/company-cards-store";
import { useContext } from "react";

export default function Comapnies() {
  const companies = useContext(CompanyCards);
  return (
    <>
      <div className="mt-[67px]">
        <div className="flex">
          <div className="ml-[420px]">
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