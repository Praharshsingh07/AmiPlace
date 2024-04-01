import { useState } from "react";
import { FcLikePlaceholder } from "react-icons/fc";
import { FcLike } from "react-icons/fc";

const Post = ({ userImage, userName, yearInfo, content, likes }) => {
  const [like, setLike] = useState(false);
  const handleLike = () => {
    setLike(!like);
  };
  return (
    <div class="postContainer border-2 border-gray-200">
      <div class="userInfo flex space-x-2">
        <img
          src={userImage}
          alt="user_ki_photu"
          class="rounded-full w-10 ml-2 mt-2"
        />
        <div class="userName mt-3">
          <span class="text-lg font-medium opacity-70">@{userName}</span>
          <span class="yearInfo opacity-60 text-sm"> ~ {yearInfo}</span>
        </div>
      </div>
      <p class="content border-l-2 border-gray-400 pl-3 my-3 mx-6">{content}</p>
      <div class="recations flex justify-between">
        <div class="like ml-5 flex space-x-1" onClick={() => handleLike()}>
          {like === false ? (
            <FcLikePlaceholder className="text-2xl" />
          ) : (
            <FcLike className="text-2xl" />
          )}
          <div className="likesCount">{likes}</div>
        </div>
        <button class="bg-purple-300 py-1 px-3 rounded-lg mr-8 mb-3">
          reply
        </button>
      </div>
    </div>
  );
};
export default Post;
