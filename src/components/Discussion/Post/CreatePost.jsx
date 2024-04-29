import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FcDeleteRow } from "react-icons/fc";
import { BsImage } from "react-icons/bs";
import { createPostActions } from "../../../store/createPostSlice";
import { postsAction } from "../../../store/postsSlice";
import {
  getDocs,
  addDoc,
  collection,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase.config";
import LoadingCool from "../../LoadingCool";

const CreatePost = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.userDetails);
  const [postContent, setPostContent] = useState("");
  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      // only after successfull reading of data by readAsDataURL() ,reader.onload runs and set that dataURL(imagefile content~ url in imageUrl state)
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      // this runs first asynchronously ~ reads all file content as dataURL
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = () => {
    dispatch(createPostActions.createPost());
  };

  const handlePost = async () => {
    setLoading(true);
    const newPost = {
      postId: -1,
      userImage: userData.imgPath,
      postImage: imageUrl,
      userName: userData.userName,
      yearInfo: userData.yearInfo,
      content: postContent,
      liked: false,
      likes: 0,
      likedBy: {},
      createdAt: serverTimestamp(),
      comments: [],
    };
    // adding post in firebase collection~(post)
    try {
      const docRef = await addDoc(collection(db, "post"), newPost);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // fetching posts from firebase collection~(post)
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
    setLoading(false);
    dispatch(createPostActions.createPost());
  };

  return (
    <div className="createPostContainer border-[1px] border-gray-300 rounded-lg p-2 m-3">
      <div className="create-a-post flex justify-center items-center h-10">
        <h1 className="text-xl font-semibold">Create a post</h1>
      </div>
      <div className="userInfo border-b-[1px]">
        {/* <p className="text-sm italic opacity-60 ml-3 my-3 ">
          Try to be professional and humble with others!
        </p> */}
        <div className="flex space-x-2 mb-2">
          <img
            className="rounded-full w-8 border-[2px] border-green-600"
            src="src/Media/images/my_img.jpeg"
          />
          <span className="font-medium mt-1">devanshVerma</span>
        </div>
      </div>
      <textarea
        rows="10"
        className="h-52 px-2 w-[100%] resize-none mt-3 focus:outline-none"
        placeholder="Share your experience or ask from others."
        onChange={(e) => setPostContent(e.target.value)}
        autoFocus
      ></textarea>
      {loading && <LoadingCool />}
      <div className="flex justify-between">
        <label
          htmlFor="imageInput"
          className="text-2xl ml-5 opacity-60 cursor-pointer"
        >
          <BsImage />
        </label>
        <input
          id="imageInput"
          type="file"
          onChange={handleFileChange}
          accept=".jpeg,.png,.jpg,.raw,.gif"
          className="hidden"
        />
        <div className="submitPost flex space-x-4">
          <button
            disabled={postContent.length < 3}
            className="py-1 px-3 disabled:bg-slate-200 disabled:cursor-not-allowed bg-[#000000a6]  text-white font-medium rounded-md"
            onClick={handlePost}
          >
            Post
          </button>
          <FcDeleteRow className="text-3xl" onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
