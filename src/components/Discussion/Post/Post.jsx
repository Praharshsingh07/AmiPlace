import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { postsAction } from "../../../store/postsSlice";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import PostOverlay from "./PostOverlay";
import { db } from "../../../firebase.config";
import {
  getDocs,
  collection,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
} from "firebase/firestore";

const Post = ({
  postId,
  postIndex,
  userImage,
  postImage,
  userName,
  yearInfo,
  content,
  likes,
  liked,
  likedByUsers,
  timeAgo,
}) => {
  const dispatch = useDispatch();
  const userDataUserName = useSelector(
    (store) => store.userDetails.userData.userName
  );

  const [threeDots, setThreeDots] = useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);

  const [sound] = useSound("src/Media/multi-pop-1-188165.mp3", { volume: 0.1 });
  const handleThreeDots = () => {
    // toggle functionality
    setThreeDots(!threeDots);
  };

  const handleLike = async () => {
    try {
      const postRef = doc(db, "post", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();
  
      if (postData) {
        let likedByUsers;
        if (postData.likedByUsers && typeof postData.likedByUsers === 'object') {
          likedByUsers = new Map(Object.entries(postData.likedByUsers));
        } else {
          // Handle the case where likedByUsers is missing or has an incorrect data type
          likedByUsers = new Map();
        }
  
        // Check if the current user has already liked the post
        const isLiked = likedByUsers.has(userDataUserName);
  
        let updatedLikes, updatedLikedByUsers;
  
        if (isLiked) {
          // Unlike the post
          updatedLikes = postData.likes - 1;
          updatedLikedByUsers = new Map(likedByUsers);
          updatedLikedByUsers.delete(userDataUserName);
        } else {
          // Like the post
          updatedLikes = postData.likes + 1;
          updatedLikedByUsers = new Map(likedByUsers);
          updatedLikedByUsers.set(userDataUserName, true);
        }
  
        const updatedLikedByUsersObj = Object.fromEntries(updatedLikedByUsers);
  
        await updateDoc(postRef, {
          likes: updatedLikes,
          likedByUsers: updatedLikedByUsersObj,
        });
  
        // Declare and initialize reloadPost
        const reloadPost = [];
        const postQuery = query(collection(db, "post"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(postQuery);
        querySnapshot.forEach((post) => {
          reloadPost.push({ ...post.data(), id: post.id });
        });
  
        // Use reloadPost to update the posts in the Redux store
        const updatedPosts = reloadPost.map((post) =>
          post.id === postId
            ? { ...post, likes: updatedLikes, likedByUsers: updatedLikedByUsers }
            : post
        );
        dispatch(postsAction.addPost(updatedPosts));
      } else {
        console.error("Invalid post data structure");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  // const handleLike = () => {

  // };
  const handleDeletePost = async () => {
    try {
      await deleteDoc(doc(db, "post", postId));
      console.log("Document successfully deleted!");

      // Refresh the post list after deletion
      const reloadPost = [];
      const postQuery = query(
        collection(db, "post"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(postQuery);
      querySnapshot.forEach((post) => {
        reloadPost.push({ ...post.data(), id: post.id });
      });
      dispatch(postsAction.addPost(reloadPost));
      setThreeDots(false);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };
  return (
    <div className="relative postContainer px-5 border-b-[1px] border-gray-300 hover:bg-gray-100 min-h-10 bg-white">
      <div className="postHeader flex justify-between">
        <div className="userInfo flex space-x-2 my-2 ">
          <img
            src={userImage}
            alt="user_ki_photu"
            className="rounded-full w-8 h-8 ml-2 mt-2"
          />
          <div className="userName mt-2">
            <span className="text-base font-medium opacity-70">{userName}</span>
            <span className="yearInfo opacity-60 text-sm"> ~ {yearInfo}</span>
          </div>
        </div>
        <div className=" mt-4 flex space-x-1 opacity-55">
          <span className="addedTimeAgo text-sm mt-1">{timeAgo} </span>
          <div
            className={`postSettings rounded-full h-7 p-1 hover:bg-white ${
              userName != userDataUserName && "hidden"
            }`}
            onClick={() => handleThreeDots()}
          >
            <BsThreeDots className="text-xl" />
          </div>
        </div>
      </div>
      {/* Post Dropdown Settings */}
      <div
        className={`absolute top-10 right-3 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          threeDots ? "block" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          <div
            className="text-red-600 block w-full px-4 py-2 text-sm hover:bg-slate-200"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onClick={handleDeletePost}
          >
            Delete Post
          </div>
          {/* <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-1"
          >
            Support
          </a> */}
        </div>
      </div>
      <p className="content border-l-2 border-gray-400 pl-3 mb-3 mx-6 py-0">
        {content}
      </p>
      <div
        className={`${
          postImage == "" && "hidden"
        } mb-4 border-[1px] border-gray-500 w-fit ml-8`}
      >
        <img src={postImage} alt="" className="max-w-80" />
      </div>
      <div className="recations flex space-x-10">
      <div className="like ml-5 flex space-x-1 mb-3">
  {liked ? (
    <FcLike className="text-2xl" onClick={handleLike} />
  ) : (
    <FcLikePlaceholder className="text-2xl" onClick={handleLike} />
  )}
  <div className="likesCount text-sm text-gray-500 mt-[2px]">
    {likes}
    {`${likes > 1 ? "Reactions" : likes === 0 ? "" : "Reaction"}`}
  </div>
</div>
        <div
          className="comment flex space-x-1 cursor-pointer p-0 hover:text-green-500"
          onClick={() => setIsPostClicked(true)}
        >
          <FaRegComment className="mt-[2px] opacity-55" />
          <span className="text-sm text-gray-500 hover:text-green-600 font-medium">
            Comment
          </span>
        </div>
      </div>
      <PostOverlay
        isOpen={isPostClicked}
        onClose={() => setIsPostClicked(!isPostClicked)}
        postIndex={postIndex}
        timeAgo={timeAgo}
      />
    </div>
  );
};
export default Post;
