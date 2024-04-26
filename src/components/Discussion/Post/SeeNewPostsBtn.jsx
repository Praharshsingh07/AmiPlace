import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../../../firebase.config";
import { postsAction } from "../../../store/postsSlice";

const NewPostBtn = () => {
  const dispatch = useDispatch();

  const fetchNewPost = async () => {
    const reloadPost = [];
    try {
      const postQuery = query(
        collection(db, "post"),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(postQuery);
      querySnapshot.forEach((post) => {
        reloadPost.push({ ...post.data(), id: post.id }); // Include the document ID
      });
      dispatch(postsAction.addPost(reloadPost));
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <button
      type="button"
      className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
      onClick={fetchNewPost}
    >
      <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
      <span className="relative">See New Posts</span>
    </button>
  );
};
export default NewPostBtn;
