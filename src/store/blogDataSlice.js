import { createSlice } from "@reduxjs/toolkit";

const blogDataSlice = createSlice({
  name: "blogData",
  initialState: {
    blogs: [
      {
        blogId: 0,
        blogLink: "#",
        blogDisplayText: "How to crack any interview",
      },
      {
        blogId: 1,
        blogLink: "#",
        blogDisplayText: "Solve any problem of DSA in less time",
      },
      {
        blogId: 2,
        blogLink: "#",
        blogDisplayText: "Internships from Internshala",
      },
      {
        blogId: 3,
        blogLink: "#",
        blogDisplayText: "Recessions are no more?",
      },
      {
        blogId: 4,
        blogLink: "#",
        blogDisplayText: "Lorem, ipsum dolor.!",
      },
      {
        blogId: 5,
        blogLink: "#",
        blogDisplayText: "Geeks for Geeks for CSE Branch",
      },
      {
        blogId: 6,
        blogLink: "#",
        blogDisplayText: "How to use Git and GitHub",
      },
      {
        blogId: 7,
        blogLink: "#",
        blogDisplayText: "Best way to Google search",
      },
      {
        blogId: 8,
        blogLink: "#",
        blogDisplayText: "Tricks to resolve any programming errors",
      },
      {
        blogId: 9,
        blogLink: "#",
        blogDisplayText: "Copy Paste is right?",
      },
    ],
  },
  reducers: {
    addBlog: (state, action) => {
      state.blogs.unshift(action.payload);
      state.blogs.forEach((item) => {
        item.blogId++;
      });
    },
  },
});
export const blogActions = blogDataSlice.actions;
export default blogDataSlice;
