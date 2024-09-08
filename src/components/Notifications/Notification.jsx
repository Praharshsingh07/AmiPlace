import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { BsReply } from "react-icons/bs";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

const Notification = ({ type, userName, postId, content, timeAgo }) => {
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postCollectionRef = collection(db, "post");
        const postDocRef = doc(postCollectionRef, postId);
        const postDoc = await getDoc(postDocRef);

        if (postDoc.exists()) {
          setPost(postDoc.data());
        } else {
          setError(`Document with ID ${postId} not found in 'post' collection`);
        }
      } catch (error) {
        setError(`Error fetching post: ${error.message}`);
      }
    };

    fetchPost();
  }, [postId]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="notification-item p-4 border my-1 rounded-lg border-gray-200 hover:bg-gray-50">
      <Link
        to="/SeePostFromNotify" 
        state={{
          payload: {
            post: post,
            postId: postId,
          },
        }}
        className="flex items-start space-x-3"
      >
        <div className="flex-shrink-0">
          {type === "like" ? (
            <FcLike className="text-2xl" />
          ) : (
            <BsReply className="text-2xl opacity-55" />
          )}
        </div>
        <div className="flex-grow">
          <p className="text-sm">
            <span className="font-medium">{userName}</span>
            {type === "like" ? " liked your post" : " commented on your post"}
          </p>
          <p className="text-xs text-gray-500 mt-1">{content}</p>
          <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
        </div>
      </Link>
    </div>
  );
};

export default Notification;
