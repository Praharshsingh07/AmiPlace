import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import CreatePostIcon from "./CreatePostIcon";
import PostsList from "./PostsList";
const PostListContainer = () => {
  const { create } = useSelector((store) => store.createPost);
  return (
    <div className="postListContainer border-[0.25px] border-b-[0px] border-gray-500 w-[100%] md:w-[70%] z-0 mt-10 rounded-md min-h-[auto]">
      {create == false ? <CreatePostIcon /> : <CreatePost />}
      <PostsList />
    </div>
  );
};
export default PostListContainer;
