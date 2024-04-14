import { BsImage } from "react-icons/bs";

const CommentUtil = ({ yourImg }) => {
  return (
    <div class="comment__Area w-full p-5 flex space-x-5">
      <div class="userImage">
        <img
          src={yourImg}
          alt="user_img"
          class="rounded-full w-8 h-8 border-[2px] border-green-600 mx-3"
        />
      </div>
      <div class="comment__Box w-full">
        <textarea
          class="comment__input border-[1px] border-gray-400 w-full rounded-md resize-none focus:outline-none p-2"
          rows="3"
          autoFocus
          placeholder="Add your comment..."
        ></textarea>
        <div class="comment__addControl flex justify-between mt-3">
          <div class="addImage">
            <label for="addImage">
              <BsImage className="mt-3" />
            </label>
            <input type="file" id="addImage" class="hidden" />
          </div>
          <div class="postComment flex space-x-2">
            <button class="Cancel font-medium" type="button">
              Cancel
            </button>
            <button
              class="Comment border-[1px] border-gray-400 py-2 px-3 rounded-md bg-[#979797] text-white font-medium"
              type="button"
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
