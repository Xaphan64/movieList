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
    <div className="flex gap-2">
      {page > 1 && <button onClick={() => handlePage(page, "-", 1)}>Previous</button>}

      {page > 2 && <button onClick={() => handlePage(page, "-", 2)}>{page - 2}</button>}

      {page > 1 && <button onClick={() => handlePage(page, "-", 1)}>{page - 1}</button>}

      <span className="text-dark-error font-bold">{page}</span>

      <button onClick={() => handlePage(page, "+", 1)}>{page + 1}</button>

      <button onClick={() => handlePage(page, "+", 2)}>{page + 2}</button>

      <button onClick={() => handlePage(page, "+", 1)}>next</button>
    </div>
  );
}
