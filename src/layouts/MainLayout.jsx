// ASSETS
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

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
  const [nightMode, setNightMode] = useState(false);

  // EVENT HANDLERS
  function handleNightMode() {
    // toggle nightmode on/off
    setNightMode(!nightMode);
  }

  return (
    <div className={nightMode ? "dark" : ""}>
      <div className="flex flex-col w-full min-h-screen p-2 duration-600 light-bg text-light-text dark:bg-dark-bg dark:text-dark-text">
        <button
          type="button"
          onClick={handleNightMode}
          className="flex self-end p-2 text-2xl cursor-pointer transition-colors duration-300 rounded hover:bg-light-border dark:hover:bg-dark-border"
        >
          {nightMode ? <LightModeIcon /> : <DarkModeIcon />}
        </button>

        <Outlet />
      </div>
    </div>
  );
}
