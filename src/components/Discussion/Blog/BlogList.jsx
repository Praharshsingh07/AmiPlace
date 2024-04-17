import Blog from "./Blog";
import { useSelector } from "react-redux";

const BlogList = () => {
  const { blogs } = useSelector((store) => store.blogData);

  return (
    <ul className="border-t-[1px] border-t-gray-500">
      {blogs.map((blog) => (
        <Blog
          key={blog.blogKey}
          blogLink={blog.blogLink}
          blogText={blog.blogDisplayText}
        />
      ))}
    </ul>
  );
};
export default BlogList;
