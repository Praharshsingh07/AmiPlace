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

// [
//       {
//         postKey: "da3EDe",
//         postId: 0,
//         userImage: "/src/Media/images/my_img.jpeg",
//         userName: "devanshVerma",
//         yearInfo: "3rd year CSE",
//         content:
//           "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
//         postImage: "",
//         likes: 51,
//         liked: false,
//         comments: [
//           {
//             commentKey: "u13E",
//             userName: "user1",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "3rd year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u251E",
//             userName: "user25",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "1st year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u982A",
//             userName: "user98",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "2nd year BCA",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u383Ab",
//             userName: "user31",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "3rd year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//         ],
//       },
//       {
//         postKey: "rn3EDe",
//         postId: 1,
//         userImage: "/src/Media/images/rohit.jpeg",
//         userName: "rohitJain",
//         yearInfo: "3rd year CSE",
//         content:
//           "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
//         postImage: "",
//         likes: 73,
//         liked: false,
//         comments: [
//           {
//             commentKey: "u1398ndj3E",
//             userName: "user1",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "3rd year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "udjb38813E",
//             userName: "user25",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "1st year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u1993db3E",
//             userName: "user98",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "2nd year BCA",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u1200283E",
//             userName: "user31",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "3rd year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//         ],
//       },
//       {
//         postKey: "aK3EDe",
//         postId: 2,
//         userImage: "/src/Media/images/anush.jpeg",
//         userName: "anushMK",
//         yearInfo: "3rd year CSE",
//         content:
//           "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
//         postImage: "",
//         likes: 30,
//         liked: false,
//         comments: [
//           {
//             commentKey: "usnnnn13E",
//             userName: "user1",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "3rd year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "2jju13E",
//             userName: "user25",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "1st year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u989813E",
//             userName: "user98",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "2nd year BCA",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u139922bE",
//             userName: "user31",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "3rd year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//         ],
//       },
//       {
//         postKey: "ph3EDe",
//         postId: 3,
//         userImage: "/src/Media/images/prah.png",
//         userName: "praharshRajSingh",
//         yearInfo: "3rd year CSE",
//         content:
//           "During the interview, the candidate exhibited a remarkable blend of technical expertise and interpersonal skills. Their ability to navigate complex scenarios with ease and articulate solutions clearly was commendable.",
//         likes: 19,
//         postImage: "",
//         liked: false,
//         comments: [
//           {
//             commentKey: "u1gbhb3E",
//             userName: "user1",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "3rd year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u231113E",
//             userName: "user25",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "1st year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u1nmas3E",
//             userName: "user98",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "2nd year BCA",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//           {
//             commentKey: "u13E0979n",
//             userName: "user31",
//             userImage: "/src/Media/images/my_img.jpeg",
//             yearInfo: "3rd year CSE",
//             commentContent:
//               "expertise and interpersonal skills. Their ability to navigate complex scenarios ",
//             commentImg: "",
//           },
//         ],
//       },
//     ],
