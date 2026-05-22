// ASSETS
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import logo from "../config/logo.png";

// STYLES

// LIBRARIES
import { useContext, useEffect, useRef, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// MISC
import { Access_key, AuthContext, movieApp } from "../config/config";
import ProfileDropdown from "../components/ProfileDropdown";
import MainPage from "../pages/MainPage";

// COMPONENTS

// CONFIGURATION
export default function Layout() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const location = useLocation();
  const nagivate = useNavigate();
  const isAuth = location.pathname === "/login" || location.pathname === "/register";
  const isMainPage = location.pathname === "/";
  const dropdownRef = useRef(null);

  // STATE CONSTANTS
  const { search, setSearch } = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [nightMode, setNightMode] = useState(() => {
    // get the default theme from local storage
    return localStorage.getItem("theme") === "dark";
  });

  const showResults = !isMainPage && search.trim() && searchResults.length > 0;

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

  useEffect(() => {
    // do nothing on input if search is empty or in main page
    if (!search.trim() || isMainPage) return;

    const fetchSearch = async () => {
      // use a timer to debounce
      const timer = setTimeout(async () => {
        try {
          const res = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${Access_key}&query=${search}`,
          );

          // get only the 1st 5 results
          setSearchResults(res.data.results.slice(0, 5));
        } catch (err) {
          console.log(err);
        }
      }, 400);

      return () => clearTimeout(timer);
    };

    // remove search results dropdown from main page
    if (!isMainPage) {
      fetchSearch();
    }
  }, [search, isMainPage]);

  useEffect(() => {
    // close modal on path change
    function handleCloseModal() {
      setProfileDropdown(false);
    }

    // clear input on page change
    setSearch("");
    handleCloseModal();
    // setProfileDropdown(false);
    // setSearchResults([]);
  }, [location.pathname, setSearch]);

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
          <Link to="/" className="font-semibold md:text-base text-xs">
            {movieApp.name}
          </Link>

          <div className="relative py-1">
            <input
              type="text"
              placeholder="Search movie..."
              className={`${isAuth ? "invisible" : "visible"} w-full focus:outline-none focus:ring-0 rounded-md md:border-2 md:text-lg
              p-1 border-1 text-sm md:px-3 light:text-light-text dark:text-dark-text light:border-light-border md:p-0 md:min-w-[420px]  
              dark:border-dark-border dark:bg-dark-input-bg dark:focus:border-dark-focus light:focus:border-light-focus
              md:m-0 mx-1 py-0`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            />

            {isFocused && showResults > 0 && (
              <div
                className="absolute top-full left-0 w-full border-2 border light:border-light-focus
              dark:border-dark-focus z-50 rounded-md p-1 dark:bg-dark-bg light:bg-light-bg"
              >
                {searchResults.map((movie) => (
                  <div
                    key={movie.id}
                    className="p-2 cursor-pointer dark:text-dark-text light:text-light-text dark:bg-dark-bg 
                    light:bg-light-bg dark:hover:bg-dark-hover light:hover:bg-light-hover rounded-md"
                    onClick={() => nagivate(`/movie/${movie.id}`)}
                  >
                    {movie.title}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex md:gap-2 gap-0">
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
