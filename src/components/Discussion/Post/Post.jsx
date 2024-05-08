import { useEffect, useRef, useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { BsReply } from "react-icons/bs";
import { postsAction } from "../../../store/postsSlice";
import { BsThreeDots } from "react-icons/bs";
import { FcApproval } from "react-icons/fc";
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
import LoadingCool2 from "../../LoadingCool2";

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
  timeAgo,
}) => {
  const dispatch = useDispatch();
  const userDataUserName = useSelector(
    (store) => store.userDetails.userData.userName
  );
  const [loading, setLoading] = useState(false);
  const [localLiked, setLocalLiked] = useState(liked);
  const [threeDots, setThreeDots] = useState(false);
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [sound] = useSound("src/Media/multi-pop-1-188165.mp3", { volume: 0.2 });
  const dropdownRef = useRef(null);

  const handleThreeDots = () => {
    setThreeDots(!threeDots);
  };
  const handleLike = async () => {
    // frontend logic
    const newLikeState = !liked;
    setLocalLiked(newLikeState);
    if (newLikeState) {
      sound();
    }
    dispatch(
      postsAction.Liked({
        postIndex: postIndex,
        like: newLikeState,
        liker: userDataUserName,
      })
    );

    // backend-logic
    try {
      const postRef = doc(db, "post", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();

      // Update the likes count and the liked field
      let updatedLikes;
      // Update likedBy map
      let _likedBy = postData.likedBy;
      if (liked) {
        updatedLikes = postData.likes - 1;
        delete _likedBy[`${userDataUserName}`];
      } else {
        updatedLikes = postData.likes + 1;
        _likedBy[`${userDataUserName}`] = true;
      }
      // updating post obj
      await updateDoc(postRef, {
        likes: updatedLikes,
        likedBy: _likedBy,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  const handleDeletePost = async () => {
    setLoading(true);
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
        if (post.data().likedBy.userDataUserName) {
          post.data().liked = true;
        } else {
          post.data().liked = false;
        }
        reloadPost.push({ ...post.data(), id: post.id });
      });
      dispatch(postsAction.addPost(reloadPost));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
    setLoading(false);
    setThreeDots(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThreeDots(false);
      }
      ``;
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  return (
    <div className="relative postContainer px-5 border-b-[1px] border-gray-300 md:hover:bg-gray-100 min-h-10 bg-white">
      <div className="postHeader flex justify-between">
        <div className="userInfo flex space-x-2 my-2 ">
          <img
            src={userImage}
            alt="user_ki_photu"
            className="rounded-full w-8 h-8 ml-2 mt-2 border-[0.5px]"
          />
          <div className="userName mt-2 flex gap-2">
            <span className="text-base font-medium opacity-70 flex">
              {userName}
              {(userName === "devanshVerma" ||
                userName === "PraharshRaj" ||
                userName === "anush") && (
                <FcApproval className="mt-[4px] ml-1 text-lg" />
              )}
            </span>
            <span className="yearInfo opacity-60 text-sm mt-[3px]">
              {" "}
              ~ {yearInfo}
            </span>
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
      {loading && <LoadingCool2 />}

      {/* Post Dropdown Settings */}
      <div
        ref={dropdownRef}
        className={`absolute top-10 right-3 z-10 mt-2 w-28 md:w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
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
        </div>
      </div>
      <p className="content border-l-2 border-gray-400 pl-3 mb-3 mx-6 py-0 overflow-hidden">
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
          {localLiked === false ? (
            <FcLikePlaceholder
              className="text-2xl"
              onClick={() => handleLike()}
            />
          ) : (
            <FcLike className="text-2xl" onClick={() => handleLike()} />
          )}
          <div className="likesCount text-sm text-gray-500 mt-[2px]">
            {likes}
            {`${likes < 2 ? " Reaction" : " Reactions"}`}
          </div>
        </div>
        <div
          className="comment flex space-x-1 cursor-pointer p-0 hover:text-blue-500 mb-1"
          onClick={() => setIsPostClicked(true)}
        >
          <BsReply className="opacity-55 text-xl" />
          <span className="mt-[1px] text-sm text-gray-500 hover:text-blue-600 font-normal">
            Reply
          </span>
        </div>
      </div>
      <PostOverlay
        isOpen={isPostClicked}
        onClose={() => setIsPostClicked(!isPostClicked)}
        postIndex={postIndex}
        timeAgo={timeAgo}
        postId={postId}
        liked={localLiked}
        likes={likes}
      />
    </div>
  );
};
export default Post;
