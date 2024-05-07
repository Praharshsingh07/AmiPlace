import { createSlice } from "@reduxjs/toolkit";

const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    userData: {
      userName: "devanshVerma",
      imgPath: "/src/Media/images/my_img.jpeg",
      yearInfo: "3rd year CSE",
    },
  },
  reducers: {},
});

export default userDetailsSlice;
