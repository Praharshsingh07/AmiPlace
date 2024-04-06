import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { postsAction } from "../../store/postsSlice";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import universalClickSlice from "../../store/universalClickSlice";
import { useEffect } from "react";

const Post = ({
  postId,
  userImage,
  postImage,
  userName,
  yearInfo,
  content,
  likes,
}) => {
  console.log("post repainted!");
  const dispatch = useDispatch();

  const [like, setLike] = useState(false);
  const [threeDots, setThreeDots] = useState(false);

  const [sound] = useSound("src/Media/multi-pop-1-188165.mp3", { volume: 0.1 });

  const handleThreeDots = () => {
    // toggle functionality
    setThreeDots(!threeDots);
  };

  const handleLike = () => {
    const newLikeState = !like;
    setLike(newLikeState);
    if (newLikeState) {
      sound();
    }
    dispatch(postsAction.isLiked({ postId: postId, like: newLikeState }));
  };
  const handleDeletePost = () => {
    // setLike(false);
    dispatch(postsAction.deletePost(postId));
    setThreeDots(false);
  };
  return (
    <div className="relative postContainer px-5 border-b-[1px] border-gray-200 hover:bg-gray-200 min-h-10">
      <div className="postHeader flex justify-between">
        <div className="userInfo flex space-x-2 my-2 ">
          <img
            src={userImage}
            alt="user_ki_photu"
            className="rounded-full w-8 h-8 ml-2 mt-2"
          />
          <div className="userName mt-2">
            <span className="text-base font-medium opacity-70">
              @{userName}
            </span>
            <span className="yearInfo opacity-60 text-sm"> ~ {yearInfo}</span>
          </div>
        </div>
        <div className=" mt-4 flex space-x-1 opacity-55">
          <span className="addedTimeAgo text-sm mt-1">8h</span>
          <div
            className="postSettings rounded-full h-7 p-1 hover:bg-white"
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
        tabindex="-1"
      >
        <div className="py-1" role="none">
          <div
            className="text-red-600 block w-full px-4 py-2 text-sm hover:bg-slate-200"
            role="menuitem"
            tabindex="-1"
            id="menu-item-0"
            onClick={handleDeletePost}
          >
            Delete Post
          </div>
          {/* <a
            href="#"
            className="text-gray-700 block px-4 py-2 text-sm"
            role="menuitem"
            tabindex="-1"
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
        <img src={postImage} alt="" className=" min-w-72 max-w-fit h-96" />
      </div>
      <div className="recations flex space-x-10">
        <div className="like ml-5 flex space-x-1 mb-3">
          {like === false ? (
            <FcLikePlaceholder
              className="text-2xl"
              onClick={() => handleLike()}
            />
          ) : (
            <FcLike className="text-2xl" onClick={() => handleLike()} />
          )}
          <div className="likesCount text-sm text-gray-500 mt-[2px]">
            {likes} Reactions
          </div>
        </div>
        <div className="comment flex space-x-1 cursor-pointer p-0 hover:text-green-500">
          <FaRegComment className="mt-[2px] opacity-55" />
          <span className="text-sm text-gray-500 hover:text-green-600 font-medium">
            Comment
          </span>
        </div>
      </div>
    </div>
  );
};
export default Post;
