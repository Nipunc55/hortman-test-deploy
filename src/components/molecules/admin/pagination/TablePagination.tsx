const TablePagination = ({
  currentPage,
  totalPages,
  setCurrentPage
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (value: number) => void;
}) => {
  const handlePreviousClick = () => {
    setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-full flex justify-end my-5 px-5">
      <div className="flex items-center gap-8">
        <button
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
          className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border ${
            currentPage === 1 ? "border-gray-900" : "border-textPrimary"
          }  text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke={currentPage === 1 ? "currentColor" : "#C8934F"}
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              ></path>
            </svg>
          </span>
        </button>
        <p className="block font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
          Page <strong className="text-gray-900">{currentPage}</strong> of
          <strong className="text-gray-900 ml-2">{totalPages}</strong>
        </p>
        <button
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
          className={`relative h-8 max-h-[32px] w-8 max-w-[32px] select-none rounded-lg border ${
            currentPage === totalPages
              ? "border-gray-900"
              : "border-textPrimary"
          } text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none`}
          type="button"
        >
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke={currentPage === totalPages ? "currentColor" : "#C8934F"}
              aria-hidden="true"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default TablePagination;
