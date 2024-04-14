const Overlay = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen ? (
        <div className="overlay">
          <div
            className="overlay__background bg-[#0000004a] w-full h-full fixed top-0 left-0 cursor-pointer z-10"
            onClick={onClose}
          />
          <div className="overlay__container bg-white fixed inset-0 m-auto z-20 p-[30px] w-fit h-fit">
            <div className="overlay__controls flex justify-end items-center">
              <button
                className="closeOverlay bg-transparent text-[36px] cursor-pointer inline-block after:content-['\00d7']"
                type="button"
                onClick={onClose}
              ></button>
            </div>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};
export default Overlay;
