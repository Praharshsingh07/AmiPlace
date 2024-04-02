import { GrAggregate } from "react-icons/gr";
const Blog = () => {
  return (
    <div class="blogContainer hidden md:block px-7 py-5 w-[30%] h-[100vh] sticky top-0 left-0  border-[0.25px] border-gray-500 m-5 rounded-md">
      <h1 class="text-2xl font-bold mb-2">BLOG</h1>
      <ul class="border-t-[1px] border-t-gray-500 text-blue-500">
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            How to crack any interview
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            Solve any problem of DSA in less time
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            Internships from Intershala
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            Recessions are no more?
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            Lorem, ipsum dolor.!
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            Geeks for Geeks for CSE Branch
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            How to use Git and GitHub
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            Best way to google search
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            Tricks to resolve any programming erros
          </a>
        </li>
        <li class="my-5 flex">
          <GrAggregate />
          <a className="ml-2" href="#">
            Copy Paste is right?
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Blog;
