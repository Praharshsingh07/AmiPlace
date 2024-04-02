import { useDispatch, useSelector } from "react-redux";
import { createPostActions } from "../../store/createPostSlice";

const CreatePostIcon = () => {
  const dispatch = useDispatch();

  const handleCreatePost = () => {
    dispatch(createPostActions.createPost());
  };

  const { userData } = useSelector((store) => store.userDetails);
  const imgPath = userData.imgPath;
  return (
    <div class="createPostContainer border-b-[1px] border-b-gray-300 flex items-center justify-center space-x-3 py-7 sticky top-0 z-10 bg-white rounded-md">
      <div class="profileImg">
        <img
          class="rounded-full w-12 border-[3px] border-green-600"
          src={`${imgPath}`}
          alt="your_pic"
        />
      </div>
      <div
        class="inputContent border-[1px] border-solid border-gray-200 px-4 py-2 w-[70%] cursor-pointer"
        onClick={handleCreatePost}
      >
        <p class="text-[#a5a5a5]">Post as "Devansh Verma"</p>
      </div>
    </div>
  );
};
export default CreatePostIcon;
