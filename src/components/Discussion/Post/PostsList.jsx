import { useSelector } from "react-redux";
import Post from "./Post";

const PostsList = () => {
  const { initialPosts } = useSelector((store) => store.posts);
  return (
    <>
      {initialPosts.map((post) => (
        <Post key={post.id} postData={post} isOverylay={true} />
      ))}
    </>
  );
};

export default PostsList;
