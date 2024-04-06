import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    initialPosts: [
      {
        postId: 0,
        userImage: "/src/Media/images/my_img.jpeg",
        userName: "devanshVerma",
        yearInfo: "3rd year CSE",
        content:
          "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
        postImage: "",
        likes: 51,
      },
      {
        postId: 1,
        userImage: "/src/Media/images/rohit.jpeg",
        userName: "rohitJain",
        yearInfo: "3rd year CSE",
        content:
          "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
        postImage: "",
        likes: 73,
      },
      {
        postId: 2,
        userImage: "/src/Media/images/anush.jpeg",
        userName: "anushMK",
        yearInfo: "3rd year CSE",
        content:
          "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
        postImage: "",
        likes: 30,
      },
      {
        postId: 3,
        userImage: "/src/Media/images/prah.png",
        userName: "praharshRajSingh",
        yearInfo: "3rd year CSE",
        content:
          "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
        likes: 19,
        postImage: "",
      },
    ],
  },
  reducers: {
    addPost: (state, action) => {
      state.initialPosts.unshift(action.payload);
      state.initialPosts.forEach((item) => {
        item.postId++;
      });
    },
    deletePost: (state, action) => {
      const newPostList = state.initialPosts.filter(
        (post) => post.postId != action.payload
      );
      for (let i = action.payload; i < newPostList.length; i++) {
        newPostList[i].postId--;
      }
      state.initialPosts = newPostList;
    },
    isLiked: (state, action) => {
      if (action.payload.like) {
        state.initialPosts[action.payload.postId].likes++;
      } else {
        state.initialPosts[action.payload.postId].likes--;
      }
    },
  },
});
export const postsAction = postsSlice.actions;
export default postsSlice;

// const INITIAL_POSTS = [
//       {
//         postId: 0,
//         userImage: "/src/Media/images/my_img.jpeg",
//         userName: "devanshVerma",
//         yearInfo: "3rd year CSE",
//         content:
//           "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
//         likes: 51,
//       },
//       {
//         postId: 1,
//         userImage: "/src/Media/images/rohit.jpeg",
//         userName: "rohitJain",
//         yearInfo: "3rd year CSE",
//         content:
//           "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
//         likes: 73,
//       },
//       {
//         postId: 2,
//         userImage: "/src/Media/images/anush.jpeg",
//         userName: "anushMK",
//         yearInfo: "3rd year CSE",
//         content:
//           "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
//         likes: 30,
//       },
//       {
//         postId: 3,
//         userImage: "/src/Media/images/prah.png",
//         userName: "praharshRajSingh",
//         yearInfo: "3rd year CSE",
//         content:
//           "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
//         likes: 19,
//       },
//     ];
