import { nanoid } from "nanoid";
import { useSelector } from "react-redux";
import CompanyCard from "./CompanyCard";
import Pagination from "./Pagination";

const CompaniesList = () => {
  const companiesData = useSelector(
    (store) => store.companiesData.initialCompanies
  );
  return (
    <div className="w-[55%] mr-10">
      {companiesData.map((company, Index) => (
        <CompanyCard
          key={nanoid()}
          companyName={company.NameOfCompany}
          CTC={company.AnnualCTC}
          Location={company.Location}
          ForBatch={company.ForBatch}
          ProfileOffered={company.ProfileOffered}
          FunctinalArea={company.FunctinalArea}
          Round1={company.Round1}
          Round2={company.Round2}
          Round3={company.Round3}
          Round4={company.Round4}
          Website={company.Website}
          logo={company.logo}
        />
      ))}
      <Pagination />
    </div>
  );
};
export default CompaniesList;
