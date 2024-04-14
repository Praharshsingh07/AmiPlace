import { useRef } from "react";
import { GrAggregate } from "react-icons/gr";
import { useDispatch } from "react-redux";
import { blogActions } from "../../../store/blogDataSlice";

const CreateBlog = ({ setCreateBlogBtn }) => {
  const dispatch = useDispatch();
  const blogLinkInput = useRef();
  const blogTextInput = useRef();

  const handleBlogSumbit = () => {
    const blogLink = blogLinkInput.current.value;
    const blogText = blogTextInput.current.value;
    if (blogLink != "" && blogText != "") {
      const newBlog = {
        blogId: -1,
        blogLink: blogLink,
        blogDisplayText: blogText,
        blogKey: Math.random() * (1000000000 - 1) + 1,
      };
      dispatch(blogActions.addBlog(newBlog));
      setCreateBlogBtn(false);
    } else {
      alert("ADD BLOG (ALERT!!) \n Enter all input fields");
    }
  };
  return (
    <div className="create-blog border-[1px] border-gray-400 rounded-md">
      <div className="create-blog-header flex space-x-1 items-center justify-center border-b-[1px] border-b-gray-400 p-2">
        <h1 className="Add-blog-header font-semibold text-lg">Add Blog Link</h1>
        <GrAggregate />
      </div>
      <div className="input-fields flex flex-col m-5">
        <input
          ref={blogLinkInput}
          className="border-[1px] border-gray-400 mt-3 p-1 rounded-sm"
          id="blog-link"
          type="url"
          placeholder="Enter blog link here..."
        />
        <label className="mb-3 text-sm opacity-60" for="blog-link">
          Ex: https://blog.com
        </label>

        <input
          ref={blogTextInput}
          className="border-[1px] border-gray-400 mt-3 p-1 rounded-sm"
          id="blog-text"
          type="text"
          placeholder="Enter display text..."
        />
        <label className="text-sm opacity-60" for="blog-text">
          Ex: How to crack any interview
        </label>
        <a
          href="#"
          className="mt-7 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleBlogSumbit}
        >
          Add
        </a>
      </div>
    </div>
  );
};
export default CreateBlog;
