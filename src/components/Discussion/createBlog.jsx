import { useRef } from "react";

const CreateBlog = () => {
  const blogLinkInput = useRef();
  const blogTextInput = useRef();

  const handleBlogSumbit = () => {
    
  }
  return (
    <div class="create-blog border-[1px] border-gray-400 m-5 w-[30%] rounded-md">
      <div class="create-blog-header flex items-center justify-center border-b-[1px] border-b-gray-400 p-2">
        <h1 class="Add-blog-header font-semibold text-lg">
          Add Blog Link [link_icon]
        </h1>
      </div>
      <div class="input-fields flex flex-col m-5">
        <input
          ref={blogLinkInput}
          class="border-[1px] border-gray-400 mt-3 p-1 rounded-sm"
          id="blog-link"
          type="text"
          placeholder="Enter blog link here..."
        />
        <label class="mb-3 text-sm opacity-60" for="blog-link">
          Ex: https://blog.com
        </label>

        <input
          ref={blogTextInput}
          class="border-[1px] border-gray-400 mt-3 p-1 rounded-sm"
          id="blog-text"
          type="url"
          placeholder="Enter display text..."
        />
        <label class="text-sm opacity-60" for="blog-text">
          Ex: How to crack any interview
        </label>
        <a
          href="#"
          class="mt-7 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleBlogSumbit()}
        >
          Add
        </a>
      </div>
    </div>
  );
};
export default CreateBlog;
