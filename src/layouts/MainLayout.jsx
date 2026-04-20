// ASSETS

// STYLES

// LIBRARIES
import { useState } from "react";
import { Outlet } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function Layout() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [nightmode, setNightmode] = useState(false);

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleNightMode() {
    setNightmode((prev) => !prev);
  }

  return (
    <div className="flex flex-col w-full">
      <button type="button" onClick={handleNightMode} className="self-end p-2">
        {nightmode ? "☀️" : "🌙"}
      </button>

      <Outlet />
    </div>
  );
}
