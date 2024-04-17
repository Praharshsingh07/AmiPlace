const CreateBlogIcon = ({ setCreateBlogBtn }) => {
  const handleCreateBlog = () => {
    setCreateBlogBtn(true);
  };
  return (
    <button
      type="submit"
      className="mt-7 block w-full rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      onClick={() => handleCreateBlog()}
    >
      Create new blog link
    </button>
  );
};
export default CreateBlogIcon;
