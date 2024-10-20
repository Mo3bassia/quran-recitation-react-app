export default function ReturnBtn({ goBack }) {
  return (
    <div className="flex justify-center items-center dark:bg-gray-800">
      <button
        onClick={() => goBack()}
        className="h-12 w-12 rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {/* Light mode - Back button */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
    </div>
  );
}
