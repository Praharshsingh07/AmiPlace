import { configureStore } from "@reduxjs/toolkit";
import logoSlice from "./LogoSlice";
import postsSlice from "./postsSlice";
import userDetailsSlice from "./userDetailsSlice";
import createPostSlice from "./createPostSlice";
import blogDataSlice from "./blogDataSlice";
import universalClickSlice from "./universalClickSlice";
import companiesDataSlice from "./companiesDataSlice";
import AboutYouReducer from "./features/About_you_info/AboutYouSlice";
import HigherEduInfoReducer from "./features/HigerEduInfo/HigerEduInfo.Slice";
import Class12thInfoReducer from "./features/Class_Info/Class12thInfo";
import Class10thInfoReducer from "./features/Class_Info/class10thInfo";
import KeySkillsInfoReducer from "./features/Key_Skills/KeySkills_features";
import InternshipInfoReducer from "./features/Intership_Info/Internship_Info.Slice";
import CertificationInfoReducer from "./features/Certification_info/Certification_Info";

const amiPlaceStore = configureStore({
  reducer: {
    logo: logoSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    posts: postsSlice.reducer,
    blogData: blogDataSlice.reducer,
    createPost: createPostSlice.reducer,
    universalClick: universalClickSlice.reducer,
    companiesData: companiesDataSlice.reducer,
    AboutYou: AboutYouReducer,
    HigherEdu: HigherEduInfoReducer,
    Class12th: Class12thInfoReducer,
    Class10th: Class10thInfoReducer,
    KeySkills: KeySkillsInfoReducer,
    Internship: InternshipInfoReducer,
    CertificationInfo: CertificationInfoReducer,
  },
});
export default amiPlaceStore;
