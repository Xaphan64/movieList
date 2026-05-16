// ASSETS

// STYLES

// LIBRARIES

// MISC

// COMPONENTS

// CONFIGURATION
export default function PageNumber({ page, setPage }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  function handlePage(pgNum, operator, num) {
    // add if op is plus
    if (operator === "+") {
      setPage(pgNum + num);
      // substraction if op is minus
    } else if (operator === "-") {
      setPage(pgNum - num);
    }
  }

  return (
    <div className="flex gap-3 w-full justify-center p-5">
      {page > 1 && (
        <button
          className="cursor-pointer font-semibold px-2 rounded-full duration-300 sm:text-base text-sm
          light:bg-light-accent light:hover:bg-light-hover light:active:bg-light-active
          dark:bg-dark-accent dark:hover:bg-dark-hover dark:active:bg-dark-active"
          onClick={() => handlePage(page, "-", 1)}
        >
          Previous
        </button>
      )}

      {page > 2 && (
        <button
          className="cursor-pointer font-bold px-2 rounded-full duration-300 sm:text-base text-sm
          light:bg-light-accent light:hover:bg-light-hover light:active:bg-light-active
          dark:bg-dark-accent dark:hover:bg-dark-hover dark:active:bg-dark-active"
          onClick={() => handlePage(page, "-", 2)}
        >
          {page - 2}
        </button>
      )}

      {page > 1 && (
        <button
          className="cursor-pointer font-bold px-2 rounded-full duration-300 sm:text-base text-sm
          light:bg-light-accent light:hover:bg-light-hover light:active:bg-light-active
          dark:bg-dark-accent dark:hover:bg-dark-hover dark:active:bg-dark-active"
          onClick={() => handlePage(page, "-", 1)}
        >
          {page - 1}
        </button>
      )}

      <span className="dark:text-blue-400 light:text-blue-600 font-bold">{page}</span>

      <button
        className="cursor-pointer font-bold px-2 rounded-full duration-300 sm:text-base text-sm
          light:bg-light-accent light:hover:bg-light-hover light:active:bg-light-active
          dark:bg-dark-accent dark:hover:bg-dark-hover dark:active:bg-dark-active"
        onClick={() => handlePage(page, "+", 1)}
      >
        {page + 1}
      </button>

      <button
        className="cursor-pointer font-bold px-2 rounded-full duration-300 sm:text-base text-sm
          light:bg-light-accent light:hover:bg-light-hover light:active:bg-light-active
          dark:bg-dark-accent dark:hover:bg-dark-hover dark:active:bg-dark-active"
        onClick={() => handlePage(page, "+", 2)}
      >
        {page + 2}
      </button>

      <button
        className="cursor-pointer font-semibold px-2 rounded-full duration-300 sm:text-base text-sm
          light:bg-light-accent light:hover:bg-light-hover light:active:bg-light-active
          dark:bg-dark-accent dark:hover:bg-dark-hover dark:active:bg-dark-active"
        onClick={() => handlePage(page, "+", 1)}
      >
        next
      </button>
    </div>
  );
}
