import { useEffect, useState, useRef } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { postsAction } from "../../../store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import { auth, db } from "../../../firebase.config";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import CommentUtil from "./CommentUtil";
import CommentSection from "./CommentSection";
import { useLocation } from "react-router-dom";

const SeePostFromNotify = () => {
  const location = useLocation();
  const payload = location.state;
  const post = payload.payload.post;
  const postId = payload.payload.postId;
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userDetails.userData);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [yearInfo, setYearInfo] = useState("");
  const [sound] = useSound("src/Media/multi-pop-1-188165.mp3", { volume: 0.5 });
  const liked = post.likedBy.hasOwnProperty(auth.currentUser.uid);
  const [localLiked, setLocalLiked] = useState(liked);

  const timeAgo = function getTimeDifference(timestamp) {
    const now = new Date().getTime();
    const postTime = timestamp.toDate().getTime();
    const diffTime = now - postTime;
    const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
    const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }
  // function formatLikeCount(count) {
  //   if (count >= 1000000000) {
  //     return (count / 1000000000).toFixed(1) + "B";
  //   } else if (count >= 1000000) {
  //     return (count / 1000000).toFixed(1) + "M";
  //   } else if (count >= 1000) {
  //     return (count / 1000).toFixed(1) + "K";
  //   } else {
  //     return count.toString();
  //   }
  // }
  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, "users", post.user);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUserName(data.username);
        setUserImage(data.avatarURL);
        setYearInfo(data.Semister + " " + data.Branch);
      }
    };
    fetchUserData();
  }, []);
  const handleLike = async () => {
    // Get the user's UID
    const userUid = auth.currentUser.uid;

    // Toggle the frontend like state
    const newLikeState = !localLiked;
    setLocalLiked(newLikeState);
    if (newLikeState) {
      sound();
    }

    // Update the frontend state immediately
    dispatch(
      postsAction.Liked({
        postIndex: postIndex,
        like: newLikeState,
        liker: userUid,
      })
    );

    // Backend logic to update the likes count and likedBy map
    try {
      const postRef = doc(db, "post", postId);
      const postSnapshot = await getDoc(postRef);
      const postData = postSnapshot.data();

      // Initialize variables
      let updatedLikes = Object.keys(postData.likedBy || {}).length;
      let _likedBy = { ...postData.likedBy };

      // Check if the user already liked the post
      const userAlreadyLiked = _likedBy[userUid];

      // Update the likes count based on the current state of the likedBy map
      if (newLikeState && !userAlreadyLiked) {
        updatedLikes += 1;
        _likedBy[userUid] = true;
      } else if (!newLikeState && userAlreadyLiked) {
        updatedLikes -= 1;
        delete _likedBy[userUid];
      }

      // Update the post document in the database
      await updateDoc(postRef, {
        likes: updatedLikes,
        likedBy: _likedBy,
      });
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };
  useEffect(() => {
    setLocalLiked(liked);
  }, [liked]);
  
  return (
    <>
      <div className="relative postContainer px-5 w-auto md:hover:bg-gray-100 min-h-10 bg-white">
        <div className="postHeader flex justify-between">
          <div className="userInfo flex space-x-2 my-2 ">
            <img
              src={userImage}
              alt="user_ki_photu"
              className="rounded-full w-8 h-8 ml-2 mt-2 border-[0.5px]"
            />
            <div className="userName mt-2">
              <span className="text-base font-medium opacity-70">
                {userName}
              </span>
              <span className="yearInfo opacity-60 text-sm">
                {" "}
                ~ sem {yearInfo}
              </span>
            </div>
          </div>
          <div className=" mt-4 flex space-x-1 opacity-55">
            <span className="addedTimeAgo text-sm mt-1">{timeAgo} </span>
          </div>
        </div>
        <p className="content border-l-2 border-gray-400 pl-3 mb-3 mx-6 py-0 overflow-hidden">
          {post.content}
        </p>
        <div
          className={`${
            post.postImage == "" && "hidden"
          } mb-4 border-[1px] border-gray-500 w-fit ml-8`}
        >
          <img src={post.postImage} alt="" className="max-w-80" />
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
              {post.likes}
              {`${post.likes < 2 ? " Reaction" : " Reactions"}`}
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
      </div>
      <CommentUtil yourImg={userData.avatarURL} postId={postId} />
      <CommentSection comments={post.comments} postId={postId} />
    </>
  );
};
export default SeePostFromNotify;
