import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import CreatePostIcon from "./CreatePostIcon";
import PostsList from "./PostsList";
const PostListContainer = () => {
  const { create } = useSelector((store) => store.createPost);
  return (
    <div className="postListContainer w-[100%] md:w-[70%] mt-10 rounded-t-md h-[100%] shadow-2xl">
      {create == false ? <CreatePostIcon /> : <CreatePost />}
      <PostsList />
    </div>
  );
};
export default PostListContainer;
