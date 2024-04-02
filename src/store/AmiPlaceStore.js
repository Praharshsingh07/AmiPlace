import { configureStore } from "@reduxjs/toolkit";
import logoSlice from "./LogoSlice";
import postsSlice from "./postsSlice";
import userDetailsSlice from "./userDetailsSlice";
import createPostSlice from "./createPostSlice";

const amiPlaceStore = configureStore({
  reducer: {
    logo: logoSlice.reducer,
    userDetails: userDetailsSlice.reducer,
    posts: postsSlice.reducer,
    createPost: createPostSlice.reducer,
  },
});
export default amiPlaceStore;
