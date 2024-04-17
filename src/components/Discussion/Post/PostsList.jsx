import { useSelector } from "react-redux";
import Post from "./Post";

const PostsList = () => {
  const { initialPosts } = useSelector((store) => store.posts);
  return (
    <>
      {initialPosts.map((post) => (
        <Post
          key={post.postKey}
          postId={post.postId}
          userImage={post.userImage}
          postImage={post.postImage}
          userName={post.userName}
          yearInfo={post.yearInfo}
          content={post.content}
          likes={post.likes}
          liked={post.liked}
        />
      ))}
    </>
  );
};
export default PostsList;
