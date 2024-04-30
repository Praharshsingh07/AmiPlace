import { useSelector } from "react-redux";
import Comment from "./Comment";
import { nanoid } from "nanoid";
import { useState } from "react";

const CommentSection = ({ postIndex }) => {
  const post = useSelector((store) => store.posts.initialPosts[postIndex]);
  const comments = post.comments;
  const postId = post.id;
  // const [commentId,setCommentId] = useState("");
  // const createCommentId = ()=>{
  //   setCommentId(nanoid());
  //   return commentId;
  // }
  function getTimeDifference(timestamp) {
    const now = new Date().getTime();
    const postTime = timestamp;
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
  return (
    <div className="comment-section-container">
      {comments.map((comment) => (
        <Comment
          key={nanoid()}
          id={comment.id}
          userName={comment.userName}
          userImage={comment.userImage}
          yearInfo={comment.yearInfo}
          comment={comment.commentContent}
          commentImg={comment.commentImg}
          timeAgo={getTimeDifference(comment.createdAt)}
          postId={postId}
        />
      ))}
    </div>
  );
};
export default CommentSection;
