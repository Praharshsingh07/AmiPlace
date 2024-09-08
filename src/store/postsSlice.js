import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";

const fireInitPosts = [];
try {
  const postQuery = query(collection(db, "post"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(postQuery);
  querySnapshot.forEach((post) => {
    fireInitPosts.push({ ...post.data(), id: post.id }); // Include the document ID
  });
} catch (e) {
  console.error("Error adding document: ", e);
}
// console.log(fireInitPosts);

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    initialPosts: fireInitPosts,
  },
  reducers: {
    addPost: (state, action) => {
      state.initialPosts = action.payload;
    },
    Liked: (state, action) => {
      if (action.payload.like) {
        state.initialPosts[action.payload.postIndex].likes++;
        state.initialPosts[action.payload.postIndex].likedBy[
          `${action.payload.liker}`
        ] = true;
      } else {
        state.initialPosts[action.payload.postIndex].likes--;
        delete state.initialPosts[action.payload.postIndex].likedBy[
          `${action.payload.liker}`
        ];
      }
    },
    addComment: (state, action) => {
      state.initialPosts[action.payload.postIndex].comments.unshift(
        action.payload.newComment
      );
    },
  },
});
export const postsAction = postsSlice.actions;
export default postsSlice;
