import userImageSlice from "../store/userImageSlice";

const CreatePostIcon = () => {
  const userImagePath = userImageSlice.getInitialState().path;
  return (
    <div class="createPostContainer flex items-center justify-center space-x-3 border-[1px] border-gray-300 py-7 ">
      <div class="profileImg">
        <img
          class="rounded-full w-12 border-[3px] border-green-600"
          src={`${userImagePath}`}
          alt="your_pic"
        />
      </div>
      <div class="inputContent border-[1px] border-solid border-gray-200 px-4 py-2 w-[70%] cursor-pointer">
        <p class="opacity-50">Post as "Devansh Verma"</p>
      </div>
    </div>
  );
};
export default CreatePostIcon;
