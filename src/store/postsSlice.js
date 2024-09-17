import { createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase.config";

// Fetching all docs from post collection
const fireInitPosts = [];
try {
  const postQuery = query(collection(db, "post"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(postQuery);
  querySnapshot.forEach((post) => {
    fireInitPosts.push({ ...post.data(), id: post.id });
  });
} catch (e) {
  console.error("Error adding document: ", e);
}

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    initialPosts: fireInitPosts,
  },
  reducers: {
    //Local(front-end logic) updations in initialPosts also on a particular post
    addPost: (state, action) => {
      state.initialPosts = action.payload;
    },
    Liked: (state, action) => {
      const postId = action.payload.postId;
      if (action.payload.like) {
        // Search post
        state.initialPosts.forEach((post) => {
          if (post.id == postId) {
            //id matches then update
            post.likes++;
            post.likedBy[action.payload.liker] = true;
            return;
          }
        });
      } else {
        state.initialPosts.forEach((post) => {
          if (post.id == postId) {
            post.likes--;
            delete post.likedBy[action.payload.liker];
            return;
          }
        });
      }
    },
    addComment: (state, action) => {
      const postId = action.payload.postId;
      state.initialPosts.forEach((post) => {
        if (post.id == postId) {
          post.comments.unshift(action.payload.newComment);
          return;
        }
      });
    },
    deleteComment: (state, action) => {
      const postId = action.payload.postId;
      const commentId = action.payload.id;
      state.initialPosts.forEach((post) => {
        if (post.id == postId) {
          const _comments = post.comments.filter((com) => {
            return com.id != commentId;
          });
          post.comments = _comments;
          return;
        }
      });
    },
  },
});
export const postsAction = postsSlice.actions;
export default postsSlice;
