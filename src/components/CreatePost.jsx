const CreatePost = () => {
  return (
    <div class="createPostContainer border-[1px] border-gray-300 rounded-lg w-[35%] h-[40%] p-2">
      <div class="create-a-post flex justify-center items-center h-10 border-b-[1px]">
        <h1 class="text-xl font-semibold mb-2">Create a post</h1>
      </div>
      <div class="userInfo border-b-[1px]">
        <p class="text-sm opacity-80 ml-3 my-3">
          Create a post, others will see when you post
        </p>
        <div class="flex space-x-2 my-1">
          <img
            class="rounded-full w-8 border-[2px] border-green-600"
            src="./my_img.jpeg"
          />
          <span class="font-medium mt-1">devanshVerma</span>
        </div>
      </div>
      <textarea
        rows="10"
        class="h-52 px-2 w-[100%] resize-none mt-3 focus:outline-none"
        placeholder="Share your experience or ask from others."
        autofocus
      ></textarea>
      <div class="submitPost flex justify-between">
        <div class="dummyElement">poll upload-image</div>
        <button class="py-1 px-3 bg-[#000000a6] text-white font-medium rounded-md">
          Post
        </button>
      </div>
    </div>
  );
};
export default CreatePost;
