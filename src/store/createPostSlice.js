import { createSlice } from "@reduxjs/toolkit";

const createPostSlice = createSlice({
  name: "createPost",
  initialState: {
    create: false,
  },
  reducers: {
    createPost: (state) => {
      state.create = !state.create;
    },
  },
});
export const createPostActions = createPostSlice.actions;
export default createPostSlice;
