import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { companiesDataActions } from "../../store/companiesDataSlice";

export default function Pagination() {
  const dispatch = useDispatch();
  const currentIndex = useSelector((store) => store.companiesData.currentIndex);

  const handleNext = () => {
    dispatch(companiesDataActions.handleNextPrev("next"));
  };
  const handlePrev = () => {
    dispatch(companiesDataActions.handleNextPrev("prev"));
  };
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{currentIndex + 1}</span> to{" "}
            <span className="font-medium">{currentIndex + 10}</span> of{" "}
            <span className="font-medium">110</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex gap-2 -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              className="relative disabled:cursor-not-allowed disabled:hover:bg-white disabled:opacity-30 inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
              onClick={handlePrev}
              disabled={currentIndex == 0}
            >
              <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            {/*<div>
              { <div
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </div>
              <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                2
              </div>
              <div className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                3
              </div>
              <div className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">
                4
              </div>
              <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                5
              </div>
              <div className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                6
              </div> }
            </div>*/}
            <button
              className="relative disabled:cursor-not-allowed disabled:hover:bg-white disabled:opacity-30 inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-100 focus:z-20 focus:outline-offset-0"
              onClick={handleNext}
              disabled={currentIndex == 100}
            >
              <FaChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
