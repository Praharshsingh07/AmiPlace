import { useSelector } from "react-redux";
import { auth } from "../../../firebase.config";
import Post from "./Post";

const PostsList = () => {
  const { initialPosts } = useSelector((store) => store.posts);

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
  function formatLikeCount(count) {
    // Check if the count is greater than 1 billion
    if (count >= 1000000000) {
      // Round the count to one decimal place and append "Billion"
      return (count / 1000000000).toFixed(1) + "B";
    }
    // Check if the count is greater than 1 million
    else if (count >= 1000000) {
      // Round the count to one decimal place and append "M"
      return (count / 1000000).toFixed(1) + "M";
    }
    // Check if the count is greater than 1000
    else if (count >= 1000) {
      // Round the count to one decimal place and append "K"
      return (count / 1000).toFixed(1) + "K";
    }
    // If the count is less than 1000, return the count as is
    else {
      return count.toString();
    }
  }
  return (
    <>
      {initialPosts.map((post, postIndex) => (
        <Post
          key={post.id}
          postId={post.id}
          postIndex={postIndex}
          user={post.user}
          postImage={post.postImage}
          content={post.content}
          likedBy={post.likedBy}
          likes={formatLikeCount(post.likes)}
          liked={post.likedBy.hasOwnProperty(auth.currentUser.uid)}
          timeAgo={getTimeDifference(post.createdAt)}
        />
      ))}
    </>
  );
};

export default PostsList;
