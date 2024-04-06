const CreateUpdates = () => {
  return (
    <div className="create-updates border-[1px] border-gray-400 m-5 w-[30%] rounded-md">
      <div className="create-updates-header flex items-center justify-center border-b-[1px] border-b-gray-400 p-2">
        <h1 className="Add-updates-header font-semibold text-lg">
          Add updates
        </h1>
      </div>
      <div className="input-fields flex flex-col m-5">
        <textarea
          ref="{blogTextInput}"
          rows="6"
          className="border-[1px] border-gray-400 mt-3 p-1 focus:outline-none resize-none rounded-sm"
          id="updates-text"
          placeholder="Enter new updates here..."
          autofocus
        ></textarea>
        <label className="text-sm opacity-60" for="updates-text">
          Ex: Updates from CRC!! xyz company will visit on xyz date
        </label>
        <a
          href="#"
          className="mt-7 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick="{handleBlogSumbit()}"
        >
          Add
        </a>
      </div>
    </div>
  );
};
export default CreateUpdates;
