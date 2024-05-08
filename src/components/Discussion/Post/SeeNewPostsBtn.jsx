import { getDocs, collection, orderBy, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { db } from "../../../firebase.config";
import { postsAction } from "../../../store/postsSlice";
import Lottie from "lottie-react";
import loginloading from "../../../animations/loginloading.json";
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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="flex justify-center items-center w-full mb-[-45px]">
      <button
        type="button"
        className="bg-blue-500 w-fit py-2 px-3 rounded-md text-sm text-white hover:bg-blue-600"
        onClick={fetchNewPost}
      >
        See new posts
      </button>
    </div>
  );
};
export default NewPostBtn;
