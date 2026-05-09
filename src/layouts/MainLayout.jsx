// ASSETS
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

// STYLES

// LIBRARIES
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

// MISC
import { movieApp } from "../config/config";

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
    <div className={nightMode ? "dark" : "light"}>
      <div
        className="layout flex flex-col w-full min-h-screen p-2 duration-450 
        light:bg-light-bg light:text-light-text dark:bg-dark-bg dark:text-dark-text"
      >
        <div className="flex md:justify-around items-center justify-between">
          <Link to="/" className="font-semibold">
            {movieApp.name}
          </Link>

          <input type="text" placeholder="Search for a movie..." />

          <div className="relative border w-24">
            <button className="absolute right-0 top-1/2 -translate-y-1/2">Profile</button>
            <button
              type="button"
              onClick={handleNightMode}
              className="flex self-end p-2 text-2xl cursor-pointer transition-colors duration-300 rounded 
            light:hover:bg-light-border dark:hover:bg-dark-border"
            >
              {nightMode ? <LightModeIcon /> : <DarkModeIcon />}
            </button>
          </div>
        </div>

        <Outlet />
      </div>
    </div>
  );
}
