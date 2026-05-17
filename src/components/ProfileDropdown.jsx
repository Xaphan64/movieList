// ASSETS

// STYLES

// LIBRARIES
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../config/config";

// MISC

// COMPONENTS

// CONFIGURATION
export default function ProfileDropdown() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const username = localStorage.getItem("Username");
  const { logout } = useContext(AuthContext);

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleLogout() {
    // remove auth token
    // sessionStorage.removeItem("token");
    logout();
    // redirect to login page
    navigate("/login");
  }

  return (
    <div
      className="flex flex-col absolute top-full left-1/2 -translate-x-1/2 mt-2 border-2 light:border-light-focus
    dark:border-dark-focus z-20 p-2 dark:text-dark-text light:text-light-text dark:bg-dark-bg light:bg-light-bg rounded"
    >
      <span className="text-center p-1 pb-2 px-15 select-none">{username}</span>

      <hr className="mx-1 py-1 light:border-light-focus dark:border-dark-focus" />

      <button
        className="dark:hover:bg-dark-hover light:hover:bg-light-hover p-2 text-center cursor-pointer rounded-md"
        type="button"
        onClick={() => navigate("/watchlist")}
      >
        Watchlist
      </button>
      <button
        className="dark:hover:bg-dark-hover light:hover:bg-light-hover p-2 text-center cursor-pointer rounded-md"
        type="button"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
