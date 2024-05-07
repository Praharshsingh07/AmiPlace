import { combineReducers } from "@reduxjs/toolkit";
import AboutYouReducer from '../features/About_you_info/AboutYouSlice'
import  HigherEduInfoReducer from '../features/HigerEduInfo/HigerEduInfo.Slice'
import Class12thInfoReducer from "../features/Class_Info/Class12thInfo";
import Class10thInfoReducer from "../features/Class_Info/class10thInfo";
import KeySkillsInfoReducer from "../features/Key_Skills/KeySkills_features"
import InternshipInfoReducer from "../features/Intership_Info/Internship_Info.Slice"
import CertificationInfoReducer from "../features/Certification_info/Certification_Info";
const RootReducers = combineReducers({
  AboutYou: AboutYouReducer,
  HigherEdu:HigherEduInfoReducer,
  Class12th:Class12thInfoReducer,
  Class10th:Class10thInfoReducer,
  KeySkills:KeySkillsInfoReducer,
  Internship:InternshipInfoReducer,
  CertificationInfo:CertificationInfoReducer
});

export default RootReducers;
