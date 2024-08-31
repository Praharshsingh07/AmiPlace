import { useState } from "react";
import { BsImage } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { FcCheckmark } from "react-icons/fc";
import { db } from "../../../firebase.config";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { postsAction } from "../../../store/postsSlice";

const CommentUtil = ({ postIndex, yourImg, postId }) => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.userDetails.userData);

  const [commentInput, setCommentInput] = useState("");
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
  const handleCommentImageUrl = () => {
    if (commentImageUrl) {
      setCommentImageUrl("");
    }
  };
  const handleCancel = () => {
    setCommentInput("");
    setCommentImageUrl("");
  };
  const handleAddComment = async () => {
    const newComment = {
      id: Math.random() * 1000000000,
      userName: userData.username,
      userImage: userData.avatarURL,
      yearInfo: userData.Semister + " " + userData.Branch,
      commentContent: commentInput,
      commentImg: commentImageUrl,
      createdAt: new Date().getTime(),
    };
    try {
      const postRef = doc(db, "post", postId);
      await updateDoc(postRef, {
        comments: arrayUnion(newComment),
      });
    } catch (error) {
      console.error("Error adding comment:", error);
    }
    handleCancel();
    const reloadPost = [];
    try {
      const postQuery = query(
        collection(db, "post"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(postQuery);
      querySnapshot.forEach((post) => {
        reloadPost.push({ ...post.data(), id: post.id }); // Include the document ID
      });
      dispatch(postsAction.addPost(reloadPost));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
          className="comment__input border-[1px] border-gray-400 w-full rounded-md resize-none focus:outline-none p-2"
          rows="3"
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
          autoFocus
          placeholder="Add your comment..."
        ></textarea>
        <div className="comment__addControl flex justify-between mt-3">
          <div className="addImage">
            <label htmlFor="addImage" onClick={handleCommentImageUrl}>
              {commentImageUrl ? (
                <>
                  <FcCheckmark />
                  <span className="text-sm text-green-600">selected</span>
                </>
              ) : (
                <BsImage className="mt-3" />
              )}
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
