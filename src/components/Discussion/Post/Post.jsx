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
import { auth, db } from "../../../firebase.config";
import {
  getDocs,
  collection,
  query,
  orderBy,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  where,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import LoadingCool2 from "../../LoadingCool2";
import { Link } from "react-router-dom";
import { MdVerified } from "react-icons/md";

const Post = ({
  postId,
  postIndex,
  user,
  postImage,
  content,
  likedBy,
  likes,
  liked,
  timeAgo,
}) => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userDetails.userData);
  const userDataUserName = userData.username;
  const [loading, setLoading] = useState(false);
  const [localLiked, setLocalLiked] = useState(liked);
  const [threeDots, setThreeDots] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState("");
  const [yearInfo, setYearInfo] = useState("");
  const [isPostClicked, setIsPostClicked] = useState(false);
  const [sound] = useSound("src/Media/multi-pop-1-188165.mp3", { volume: 0.2 });
  const likedByUsers = Object.keys(likedBy);
  const dropdownRef = useRef(null);

  const handleThreeDots = () => {
    setThreeDots(!threeDots);
  };
  useEffect(() => {
    const fetchUserData = async () => {
      const userDocRef = doc(db, "users", user);
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
    const newLikeState = !liked;
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
      let updatedLikes = postData.likes;
      let _likedBy = { ...postData.likedBy }; // Copy likedBy map

      // Check if the user already liked the post
      const userAlreadyLiked = _likedBy[userUid];

      // Update the likes count based on the current state of the likedBy map
      if (newLikeState && !userAlreadyLiked) {
        updatedLikes += 1;
        _likedBy[userUid] = true; // Mark as liked by the user

        // Create a notification only if the post is not by the current user
        if (user !== userUid) {
          const notificationRef = collection(db, "notifications");
          await addDoc(notificationRef, {
            type: "like",
            senderId: userUid,
            senderName: userData.username,
            recipientId: user,
            postId: postId,
            content:
              content.substring(0, 50) + (content.length > 50 ? "..." : ""),
            createdAt: serverTimestamp(),
          });
        }
      } else if (!newLikeState && userAlreadyLiked) {
        updatedLikes -= 1;
        delete _likedBy[userUid]; // Remove user from likedBy map
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
        <Link
          to={`${
            userName == userDataUserName ? "/profile" : "/DisplayOnlyProfile"
          }`}
          state={{ user: userName }}
          className="userInfo flex space-x-2 my-2 "
        >
          <img
            src={userImage}
            alt="user_ki_photu"
            className="rounded-full w-8 h-8 ml-2 mt-2 border-[0.5px]"
          />
          <div className="userName mt-2 flex gap-2">
            <div className="text-base font-medium opacity flex">
              {userName}
              {(userName === "devanshVerma" ||
                userName === "praharshsingh07" ||
                userName === "anush") && (
                <MdVerified className="mt-[5px] ml-1 text-base text-blue-500" />
              )}
            </div>
            <span className="yearInfo opacity-60 text-sm mt-[3px]">
              {" "}
              ~ sem {yearInfo} {}
            </span>
          </div>
        </Link>
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
          <Link
            to="/LikedByList"
            state={{
              likedBy: {
                likedByUsers: likedByUsers,
                userDataUserName: userDataUserName,
              },
            }}
            className="likesCount text-sm text-gray-500 mt-[2px]"
          >
            {likes}
            {`${likes < 2 ? " Reaction" : " Reactions"}`}
          </Link>
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
