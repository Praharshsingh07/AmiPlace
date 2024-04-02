import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FaRegComment } from "react-icons/fa";

const Post = ({ userImage, userName, yearInfo, content, likes }) => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <div class="postContainer px-5 border-b-[1px] border-gray-200 hover:bg-gray-200 cursor-pointer">
      <div class="userInfo flex space-x-2 my-2 ">
        <img
          src={userImage}
          alt="user_ki_photu"
          class="rounded-full w-8 h-8 ml-2 mt-2"
        />
        <div class="userName mt-2">
          <span class="text-base font-medium opacity-70">@{userName}</span>
          <span class="yearInfo opacity-60 text-sm"> ~ {yearInfo}</span>
        </div>
      </div>
      <p class="content border-l-2 border-gray-400 pl-3 my-3 mx-6">{content}</p>
      <div class="recations flex space-x-10">
        <div class="like ml-5 flex space-x-1 mb-3">
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
