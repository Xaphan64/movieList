// ASSETS
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// STYLES

// LIBRARIES
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function Layout() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [nightMode, setNightMode] = useState(() => {
    // get the default theme from local storage
    return localStorage.getItem("theme") === "dark";
  });

  function handleNightMode() {
    // toggle nightmode on/off
    const mode = !nightMode;
    setNightMode(mode);
    // save mode to local storage
    localStorage.setItem("theme", mode ? "dark" : "light");
  }

  return (
    <div className={nightMode ? "dark" : ""}>
      <div
        className="flex flex-col w-full min-h-screen p-2 duration-600 light-bg text-light-text 
        dark:bg-dark-bg dark:text-dark-text"
      >
        <div className="flex flex-row justify-around">
          <Link to="/">app name</Link>
          <button
            type="button"
            onClick={handleNightMode}
            className="flex self-end p-2 text-2xl cursor-pointer transition-colors duration-300 rounded 
            hover:bg-light-border dark:hover:bg-dark-border"
          >
            {nightMode ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
