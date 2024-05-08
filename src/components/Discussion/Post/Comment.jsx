import { useState, useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  doc,
  updateDoc,
  arrayRemove,
  getDoc,
  query,
  orderBy,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import { postsAction } from "../../../store/postsSlice";

const Comment = ({
  id,
  userImage,
  userName,
  yearInfo,
  comment,
  commentImg,
  timeAgo,
  postId,
}) => {
  const dispatch = useDispatch();
  const userDataUserName = useSelector(
    (store) => store.userDetails.userData.userName
  );
  const [threeDots, setThreeDots] = useState(false);
  const dropdownRef = useRef(null);

  const handleThreeDots = () => {
    setThreeDots(!threeDots);
  };

  const handleDeleteComment = async () => {
    const postRef = doc(db, "post", postId);
    const postSnapshot = await getDoc(postRef);

    const commentQuery = postSnapshot
      .data()
      .comments.find((comment) => comment.id == id);
    if (commentQuery) {
      updateDoc(postRef, {
        comments: arrayRemove(commentQuery),
      }).catch((error) => {
        console.error("Error deleting comment: ", error);
      });
    } else {
      console.log("Comment not found");
    }
    // fetch posts from db
    const reloadPost = [];
    try {
      const postQuery = query(
        collection(db, "post"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(postQuery);
      querySnapshot.forEach((post) => {
        reloadPost.push({ ...post.data(), id: post.id });
      });
      dispatch(postsAction.addPost(reloadPost));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    handleThreeDots();
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setThreeDots(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="relative comment bg-gray-100 w-full border-b-[1px] border-b-gray-400">
      <div className="userInfo space-x-2 flex justify-between pt-2">
        <div className="userName flex gap-2">
          <img
            src={userImage}
            alt="user_ki_photu"
            className="rounded-full w-8 h-8 ml-2 mt-2"
          />
          <span className="text-base font-medium opacity-70 mt-2">
            {userName}
          </span>
          <span className="yearInfo opacity-60 text-sm mt-[10px]">
            ~ {yearInfo}
          </span>
        </div>
        <div className="flex opacity-55 space-x-1 pr-4">
          <span className="addedTimeAgo text-sm mt-1">{timeAgo} </span>
          <div
            className={`postSettings rounded-full h-7 p-1 hover:bg-white ${
              userName !== userDataUserName && "hidden"
            }`}
            onClick={handleThreeDots}
          >
            <BsThreeDots className="text-xl" />
          </div>
        </div>
      </div>
      <div
        ref={dropdownRef}
        className={`absolute top-5 right-3 z-10 mt-2 w-20 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
          threeDots ? "block" : "hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        <div className="py-1" role="none">
          <div
            className="text-red-600 block cursor-pointer w-full px-4 py-1 text-sm hover:bg-slate-200"
            role="menuitem"
            tabIndex="-1"
            id="menu-item-0"
            onClick={handleDeleteComment}
          >
            Delete
          </div>
        </div>
      </div>
      <p className="comment-content opacity-85 ml-12 pb-3  mr-8 pr-0 ">
        {comment}
        <img
          src={commentImg}
          alt=""
          className={`${!commentImg && "hidden"} w-48`}
        />
      </p>
    </div>
  );
};
export default Comment;
