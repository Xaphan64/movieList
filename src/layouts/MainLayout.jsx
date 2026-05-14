// ASSETS
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// STYLES

// LIBRARIES
import { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

// MISC
import { AuthContext, movieApp } from "../config/config";
import ProfileDropdown from "../components/ProfileDropdown";

// COMPONENTS

// CONFIGURATION
export default function Layout() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const location = useLocation();
  const isAuth = location.pathname === "/login" || location.pathname === "/register";
  const dropdownRef = useRef(null);

  // STATE CONSTANTS
  const { search, setSearch } = useContext(AuthContext);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [nightMode, setNightMode] = useState(() => {
    // get the default theme from local storage
    return localStorage.getItem("theme") === "dark";
  });

  // LIFE CYCLE
  useEffect(() => {
    function handleClick(event) {
      // if clicked outside close the modal
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdown(false);
      }
    }

    // on click run the function to close the modal
    document.addEventListener("mousedown", handleClick);

    // cleanup after close
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  // EVENT HANDLERS
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
        <div className="flex md:justify-evenly items-center justify-between">
          <Link to="/" className="font-semibold">
            {movieApp.name}
          </Link>

          <input
            type="text"
            placeholder="Search movie..."
            className={`${isAuth ? "invisible" : "visible"} border`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2">
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdown((prev) => !prev)}
                className={`${isAuth ? "invisible" : "visible"} flex self-end p-2 text-2xl cursor-pointer transition-colors duration-300 rounded 
              light:hover:bg-light-border dark:hover:bg-dark-border`}
              >
                <AccountCircleIcon />
              </button>

              {profileDropdown && <ProfileDropdown setProfileDropdown={setProfileDropdown} />}
            </div>

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
