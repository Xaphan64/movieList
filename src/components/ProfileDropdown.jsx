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
    <div className="flex flex-col w-30 absolute top-full left-1/2 -translate-x-1/2 mt-2 border">
      <span>{username}</span>
      <button type="button" onClick={() => navigate("/watchlist")}>
        watchlist page
      </button>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
