import { useSelector } from "react-redux";
import Post from "./Post";

const PostsList = () => {
  const { initialPosts } = useSelector((store) => store.posts);
  return (
    <>
      {console.log("postListRepainted")}
      {initialPosts.map((post) => (
        <Post
          postId={post.postId}
          userImage={post.userImage}
          postImage={post.postImage}
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
