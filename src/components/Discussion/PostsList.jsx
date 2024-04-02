import { useSelector } from "react-redux";
import Post from "./Post";

const PostsList = () => {
  const { initialPosts } = useSelector((store) => store.posts);
  return (
    <>
      {initialPosts.map((post) => (
        <Post
          userImage={post.userImage}
          userName={post.userName}
          yearInfo={post.yearInfo}
          content={post.content}
          likes={post.likes}
        />
      ))}
    </>
  );
};
export default PostsList;
