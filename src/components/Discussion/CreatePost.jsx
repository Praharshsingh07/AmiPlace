import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostActions } from "../../store/createPostSlice";
import { postsAction } from "../../store/postsSlice";
import { FcDeleteRow } from "react-icons/fc";

const CreatePost = () => {
  const { userData } = useSelector((state) => state.userDetails);
  const postContentInput = useRef();

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(createPostActions.createPost());
  };
  const handlePost = () => {
    dispatch(createPostActions.createPost());
    const postContent = postContentInput.current.value;
    const newPost = {
      postId: 4,
      userImage: userData.imgPath,
      userName: userData.userName,
      yearInfo: userData.yearInfo,
      content: postContent,
      likes: 0,
    };
    dispatch(postsAction.addPost(newPost));
  };
  return (
    <div class="createPostContainer border-[1px] border-gray-300 rounded-lg   p-2 m-3">
      <div class="create-a-post flex justify-center items-center h-10 border-b-[1px]">
        <h1 class="text-xl font-semibold mb-2">Create a post</h1>
      </div>
      <div class="userInfo border-b-[1px]">
        {/* <p class="text-sm opacity-80 ml-3 my-3">
          Create a post, others will see when you post
        </p> */}
        <div class="flex space-x-2 my-1">
          <img
            class="rounded-full w-8 border-[2px] border-green-600"
            src="src/Media/images/my_img.jpeg"
          />
          <span class="font-medium mt-1">devanshVerma</span>
        </div>
      </div>
      <textarea
        ref={postContentInput}
        rows="10"
        class="h-52 px-2 w-[100%] resize-none mt-3 focus:outline-none"
        placeholder="Share your experience or ask from others."
        autofocus
      ></textarea>
      <div class="flex justify-between">
        <div class="dummyElement">poll upload-image</div>
        <div className="submitPost flex space-x-4">
          <button
            class="py-1 px-3 bg-[#000000a6] text-white font-medium rounded-md"
            onClick={handlePost}
          >
            Post
          </button>
          <FcDeleteRow className="text-3xl" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
