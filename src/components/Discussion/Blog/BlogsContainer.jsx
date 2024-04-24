import { useState } from "react";
import BlogList from "./BlogList";
import CreateBlog from "./createBlog";
import CreateBlogIcon from "./CreateBlogIcon";

const BlogsContainer = () => {
  const [creatBlogBtn, setCreateBlogBtn] = useState(false);

  return (
    <div className="blogContainer hidden md:block border-[0.5px] border-gray-300 px-7 py-5 w-[30%] h-[100%] m-5 rounded-md bg-[#f7f7f7]">
      <h1 className="text-2xl font-bold mb-2">BLOG</h1>
      <BlogList />
      {creatBlogBtn === true ? (
        <CreateBlog setCreateBlogBtn={setCreateBlogBtn} />
      ) : (
        <CreateBlogIcon setCreateBlogBtn={setCreateBlogBtn} />
      )}
    </div>
  );
};
export default BlogsContainer;
