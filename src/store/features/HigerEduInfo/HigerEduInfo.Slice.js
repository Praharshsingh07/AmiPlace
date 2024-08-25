import { createSlice } from "@reduxjs/toolkit";

const HigerEducationInput = {
  CourseName: "",
  Specialization: "",
  CollegeName: "",
  CGPA: "",
  CourseDuration: "",
  LinkedinUrl: "",
  GitHubUrl: "",
};

export const HigherEducationInfo = createSlice({
  name: "HigerEducationInfo",
  initialState: { HigerEducationInput },
  reducers: {
    HandleInputForm2: (state, action) => {
      state.HigerEducationInput = action.payload;
    },
  },
});
export const EducationInfoAction = HigherEducationInfo.actions;
export default HigherEducationInfo.reducer;
