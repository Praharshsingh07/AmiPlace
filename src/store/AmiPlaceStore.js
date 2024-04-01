import { configureStore } from "@reduxjs/toolkit";
import logoSlice from "./LogoSlice";
import postsSlice from "./postsSlice";
import userImageSlice from "./userImageSlice";

const amiPlaceStore = configureStore({
  reducer: {
    logo: logoSlice.reducer,
    userImage: userImageSlice.reducer,
    posts: postsSlice.reducer,
  },
});
export default amiPlaceStore;
