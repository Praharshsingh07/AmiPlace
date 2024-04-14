import { useState } from "react";
import BlogList from "./BlogList";
import CreateBlog from "./createBlog";
import CreateBlogIcon from "./CreateBlogIcon";

const BlogsContainer = () => {
  const [creatBlogBtn, setCreateBlogBtn] = useState(false);

  return (
    <div className="blogContainer hidden md:block px-7 py-5 w-[30%] h-[100%] sticky top-0 left-0 m-5 rounded-md shadow-xl bg-[rgb(255,255,255)]">
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
