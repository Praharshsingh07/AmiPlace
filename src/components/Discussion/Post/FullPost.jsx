import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";
import { postsAction } from "../../../store/postsSlice";
import { BsThreeDots } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import useSound from "use-sound";
import CommentUtil from "./CommentUtil";
import CommentSection from "./CommentSection";

const FullPost = ({ postId }) => {
  const dispatch = useDispatch();
  const post = useSelector((store) => store.posts.initialPosts[postId]);
  const yourImg = useSelector((store) => store.userDetails.userData.imgPath);

  const liked = post.liked;
  const [threeDots, setThreeDots] = useState(false);

  const [sound] = useSound("src/Media/multi-pop-1-188165.mp3", { volume: 0.1 });

  const handleThreeDots = () => {
    // toggle functionality
    setThreeDots(!threeDots);
  };

  const handleLike = () => {
    const newLikeState = !liked;
    if (newLikeState) {
      sound();
    }
    dispatch(postsAction.Liked({ postId: postId, like: newLikeState }));
  };
  const handleDeletePost = () => {
    dispatch(postsAction.deletePost(postId));
    setThreeDots(false);
  };
  return (
    <>
      <div className="relative postContainer px-5 min-h-10">
        <div className="postHeader flex justify-between">
          <div className="userInfo flex space-x-2 my-2 ">
            <img
              src={post.userImage}
              alt="user_ki_photu"
              className="rounded-full w-8 h-8 ml-2 mt-2"
            />
            <div className="userName mt-2">
              <span className="text-base font-medium opacity-70">
                {post.userName}
              </span>
              <span className="yearInfo opacity-60 text-sm">
                {" "}
                ~ {post.yearInfo}
              </span>
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
          {post.content}
        </p>
        <div
          className={`${
            post.postImage == "" && "hidden"
          } mb-4 border-[1px] border-gray-500 w-fit ml-8`}
        >
          <img
            src={post.postImage}
            alt=""
            className=" min-w-72 max-w-fit h-96"
          />
        </div>
        <div className="recations flex space-x-10">
          <div className="like ml-5 flex space-x-1 mb-3">
            {liked == false ? (
              <FcLikePlaceholder
                className="text-2xl"
                onClick={() => handleLike()}
              />
            ) : (
              <FcLike className="text-2xl" onClick={() => handleLike()} />
            )}
            <div className="likesCount text-sm text-gray-500 mt-[2px]">
              {post.likes} Reactions
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
      <CommentUtil yourImg={yourImg} />
      <CommentSection />
    </>
  );
};
export default FullPost;
