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
    <button
      type="button"
      className="relative rounded px-5 py-2.5 overflow-hidden group bg-green-500 hover:bg-gradient-to-r hover:from-green-500 hover:to-green-400 text-white hover:ring-2 hover:ring-offset-2 hover:ring-green-400 transition-all ease-out duration-300"
      onClick={fetchNewPost}
    >
      <Lottie
        animationData={loginloading}
        loop={true}
        style={{ width: 100, height: 50 }}
      />
      <span className="relative">Refresh</span>
    </button>
  );
};
export default NewPostBtn;
