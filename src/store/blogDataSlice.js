import { createSlice } from "@reduxjs/toolkit";

const blogDataSlice = createSlice({
  name: "blogData",
  initialState: {
    blogs: [
      {
        blogId: 0,
        blogLink: "",
        blogDisplayText: "",
      },
    ],
  },
  reducers: {
    addData: (state) => {
      state = [...state,]
    },
  },
});

export default blogDataSlice;
