import { GrAggregate } from "react-icons/gr";

const Blog = ({ blogLink, blogText }) => {
  return (
    <li className="my-5 flex">
      <GrAggregate />
      <a className="ml-2" href={blogLink}>
        {blogText}
      </a>
    </li>
  );
};
export default Blog;
