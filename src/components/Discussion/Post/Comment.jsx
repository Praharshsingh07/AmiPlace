const Comment = ({ userImage, userName, yearInfo, comment, commentImg }) => {
  return (
    <div className="comment bg-gray-100 w-full border-b-[1px] border-b-gray-400">
      <div className="userInfo flex space-x-2">
        <img
          src={userImage}
          alt="user_ki_photu"
          className="rounded-full w-8 h-8 ml-2 mt-2"
        />
        <div className="userName mt-2">
          <span className="text-base font-medium opacity-70"> {userName} </span>
          <span className="yearInfo opacity-60 text-sm"> ~ {yearInfo}</span>
        </div>
      </div>
      <p className="comment-content opacity-85 ml-12 pb-3  mr-8 pr-0 ">
        {comment}
        <img
          src={commentImg}
          alt=""
          className={`${!commentImg && "hidden"} w-48`}
        />
      </p>
    </div>
  );
};
export default Comment;
