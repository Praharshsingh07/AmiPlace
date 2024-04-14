import { GrAggregate } from "react-icons/gr";

const Blog = ({ blogLink, blogText }) => {
  return (
    <li className="my-5 flex hover:text-blue-600 hover:underline">
      <GrAggregate />
      <a className="ml-2 " href={blogLink}>
        {blogText}
      </a>
    </li>
  );
};
export default Blog;
