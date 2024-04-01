import { createSlice } from "@reduxjs/toolkit";

const logoSlice = createSlice({
  name: "logo",
  initialState: {
    path: "/src/Media/images/amity_logo.jpg",
  },
  reducers: {},
});

export default logoSlice;
