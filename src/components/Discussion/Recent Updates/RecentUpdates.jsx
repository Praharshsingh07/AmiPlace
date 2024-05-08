import { RiMessage3Fill } from "react-icons/ri";

const RecentUpdates = ({ RecentUpdatesClassNames }) => {
  return (
    <div className={RecentUpdatesClassNames}>
      <h1 className="text-xl font-semibold mb-2">Recent Updates</h1>
      <ul className="border-t-[1px] border-t-gray-500 ">
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2"> TCS coming for lorem ispum</span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">Adobe offered 40LPA lelo agar dum hai</span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">DSA Karlo Pyare</span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">
            CRC said try for getting jobs by your own
          </span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">Practice! Practice! Practice!</span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">
            Geeks for Geeks ke founder aaye the fir gaye
          </span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">Mess ka khana achha milta hai mat khana</span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">
            OD milna band hogyi hehe ... ab jao bunk pe
          </span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">Done for the Day guys...</span>
        </li>
        <li className="my-5 flex">
          <RiMessage3Fill />
          <span className="ml-2">
            hello world humne ye app bhot din me banaya hai
          </span>
        </li>
      </ul>
    </div>
  );
};
export default RecentUpdates;
