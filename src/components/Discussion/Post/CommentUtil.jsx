import { useRef, useState } from "react";
import { BsImage } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { postsAction } from "../../../store/postsSlice";

const CommentUtil = ({ postIndex, yourImg }) => {
  const dispatch = useDispatch();

  const commentInput = useRef("");
  const [commentImageUrl, setCommentImageUrl] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCommentImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCancel = () => {
    commentInput.current.value = "";
    setCommentImageUrl("");
  };
  const handleAddComment = () => {
    const newComment = {
      commentKey: Math.random() * (1000000000 - 1) + 1,
      userName: "user14",
      userImage: "/src/Media/images/anush.jpeg",
      yearInfo: "3rd year CSE",
      commentContent: commentInput.current.value,
      commentImg: commentImageUrl,
    };
    dispatch(
      postsAction.addComment({ postIndex: postIndex, newComment: newComment })
    );
    setCommentImageUrl("");
    commentInput.current.value = "";
  };

  return (
    <div className="comment__Area w-full p-5 flex space-x-5">
      <div className="userImage">
        <img
          src={yourImg}
          alt="user_img"
          className="rounded-full w-8 h-8 border-[2px] border-green-600 mx-3"
        />
      </div>
      <div className="comment__Box w-full">
        <textarea
          ref={commentInput}
          className="comment__input border-[1px] border-gray-400 w-full rounded-md resize-none focus:outline-none p-2"
          rows="3"
          autoFocus
          placeholder="Add your comment..."
        ></textarea>
        <div className="comment__addControl flex justify-between mt-3">
          <div className="addImage">
            <label htmlFor="addImage">
              <BsImage className="mt-3" />
            </label>
            <input
              type="file"
              id="addImage"
              className="hidden"
              onChange={handleFileChange}
              accept=".jpeg,.png,.jpg,.raw,.gif"
            />
          </div>
          <div className="postComment flex space-x-2">
            <button
              className="Cancel font-medium"
              type="button"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button
              className="Comment border-[1px] border-gray-400 py-2 px-3 rounded-md bg-[#979797] text-white font-medium"
              type="button"
              onClick={() => handleAddComment()}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentUtil;
