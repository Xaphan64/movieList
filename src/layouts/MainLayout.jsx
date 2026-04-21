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
    <div
      className={`flex flex-col w-full min-h-screen p-2 ${nightmode ? "bg-black text-white" : "bg-white text-black"}`}
    >
      <button
        type="button"
        onClick={handleNightMode}
        className={`self-end p-2 text-2xl cursor-pointer transition-colors duration-300 rounded ${nightmode ? "bg-gray-800 text-white hover:bg-gray-700" : "bg-gray-200 text-black hover:bg-gray-300"}`}
      >
        {nightmode ? "☀️" : "🌙"}
      </button>

      <Outlet />
    </div>
  );
}
