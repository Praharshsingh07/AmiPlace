import { useSelector } from "react-redux";
import Comment from "./Comment";

const CommentSection = ({ postIndex }) => {
  const comments = useSelector(
    (store) => store.posts.initialPosts[postIndex].comments
  );
  return (
    <div className="comment-section-container">
      {comments.map((comment) => (
        <Comment
          key={comment.commentKey}
          userName={comment.userName}
          userImage={comment.userImage}
          yearInfo={comment.yearInfo}
          comment={comment.commentContent}
          commentImg={comment.commentImg}
        />
      ))}
    </div>
  );
};
export default CommentSection;
