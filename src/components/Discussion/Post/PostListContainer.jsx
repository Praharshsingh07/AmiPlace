import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import CreatePostIcon from "./CreatePostIcon";
import PostsList from "./PostsList";
const PostListContainer = () => {
  const { create } = useSelector((store) => store.createPost);
  return (
    <div className="postListContainer w-[100%] md:max-w-[729px]  rounded-t-md h-[100%] md:border-[1px] border-x-[1px] border-b-[1px] border-gray-300 md:mt-10">
      {create == false ? <CreatePostIcon /> : <CreatePost />}
      <PostsList />
    </div>
  );
};
export default PostListContainer;
