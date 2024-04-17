import { createSlice } from "@reduxjs/toolkit";

const blogDataSlice = createSlice({
  name: "blogData",
  initialState: {
    blogs: [
      {
        blogId: 0,
        blogLink: "#",
        blogDisplayText: "How to crack any interview",
        blogKey: "b1",
      },
      {
        blogId: 1,
        blogLink: "#",
        blogDisplayText: "Solve any problem of DSA in less time",
        blogKey: "b2",
      },
      {
        blogId: 2,
        blogLink: "#",
        blogDisplayText: "Internships from Internshala",
        blogKey: "b3",
      },
      {
        blogId: 3,
        blogLink: "#",
        blogDisplayText: "Recessions are no more?",
        blogKey: "b4",
      },
      {
        blogId: 4,
        blogLink: "#",
        blogDisplayText: "Lorem, ipsum dolor.!",
        blogKey: "b5",
      },
      {
        blogId: 5,
        blogLink: "#",
        blogDisplayText: "Geeks for Geeks for CSE Branch",
        blogKey: "b6",
      },
      {
        blogId: 6,
        blogLink: "#",
        blogDisplayText: "How to use Git and GitHub",
        blogKey: "b7",
      },
      {
        blogId: 7,
        blogLink: "#",
        blogDisplayText: "Best way to Google search",
        blogKey: "b8",
      },
      {
        blogId: 8,
        blogLink: "#",
        blogDisplayText: "Tricks to resolve any programming errors",
        blogKey: "b9",
      },
      {
        blogId: 9,
        blogLink: "#",
        blogDisplayText: "Copy Paste is right?",
        blogKey: "b10",
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
