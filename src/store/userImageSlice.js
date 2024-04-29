import { createSlice } from "@reduxjs/toolkit";

const userImageSlice = createSlice({
  name: "userImage",
  initialState: {
    path: "/src/Media/images/my_img.jpeg",
  },
  reducers: {},
});

export default userImageSlice;
