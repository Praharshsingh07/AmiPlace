import CreatePostIcon from "./CreatePostIcon";
import PostsList from "./PostsList";
const PostListContainer = () => {
  return (
    <div className="postListContainer w-[100%] md:w-[70%]">
      <CreatePostIcon />
      <PostsList />
    </div>
  );
};
export default PostListContainer;
