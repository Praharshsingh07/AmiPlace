import { useSelector } from "react-redux";
import Post from "./Post";

const PostsList = () => {
  // console.log("Post List repainted");
  function getTimeDifference(timestamp) {
    const now = new Date().getTime();
    const postTime = timestamp.toDate().getTime();
    const diffTime = now - postTime;
    const minutes = Math.floor((diffTime / (1000 * 60)) % 60);
    const hours = Math.floor((diffTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else {
      return `${minutes}m`;
    }
  }

  const { initialPosts } = useSelector((store) => store.posts);
  const userDataUserName = useSelector(
    (store) => store.userDetails.userData.userName
  );

  // console.log(initialPosts);
  return (
    <>
      {initialPosts.map((post, postIndex) => (
        <Post
          key={post.id}
          postId={post.id}
          postIndex={postIndex}
          userImage={post.userImage}
          postImage={post.postImage}
          userName={post.userName}
          yearInfo={post.yearInfo}
          content={post.content}
          likes={post.likes}
          likedByUsers={post.likedByUsers}
          timeAgo={getTimeDifference(post.createdAt)}
        />
      ))}
    </>
  );
};

export default PostsList;