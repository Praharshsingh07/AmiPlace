import { useState } from "react";
import BlogList from "./BlogList";
import CreateBlog from "./createBlog";
import CreateBlogIcon from "./CreateBlogIcon";

const BlogsContainer = () => {
  const [creatBlogBtn, setCreateBlogBtn] = useState(false);

  return (
    <div className="blogContainer hidden md:block px-7 py-5 w-[30%] h-[100%] sticky top-0 left-0 border-[0.25px] border-gray-500 m-5 rounded-md">
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
