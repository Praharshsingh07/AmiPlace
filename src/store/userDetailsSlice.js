import { createSlice } from "@reduxjs/toolkit";

let userDataStored = "";
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userData: userDataStored,
  },
  reducers: {
    addDataToUserDataStore: (state, action) => {
      userDataStored = action.payload;
      state.userData = userDataStored;
    },
  },
});

export const userDataAction = userDetailsSlice.actions;
export default userDetailsSlice;
// const user = state.userData;
// user.name = data.FullName;
// user.branch = data.Branch;
// user.courseName = data.Course;
// user.dob = data.DOB;
// user.gender = data.Gender;
// user.yearInfo = Math.ceil(data.Semister / 2);
// user.specialization = data.Specialization;
// user.imgPath = data.avatarURL;
// user.email = data.email;
// user.gitHub = data.githubProfile;
// user.linkedIn = data.linkedinProfile;
// user.resume = data.resumeURL;
// user.keySkills = data.Skills;
// user.userName = data.username;
