// ASSETS

// STYLES

// LIBRARIES
import { useEffect, useState } from "react";

// MISC
import { AuthContext } from "./config";

// COMPONENTS

// CONFIGURATION
export default function AuthenticationProvider({ children }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const username = localStorage.getItem("Username");

  // STATE CONSTANTS
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [search, setSearch] = useState("");
  const [watchlist, setWatchlist] = useState(handleInitial);

  // LIFE CYCLE
  useEffect(() => {
    if (!username) {
      setWatchlist([]);
      return;
    }

    // get the data from local storage or get empty []
    const saved = JSON.parse(localStorage.getItem(`watchlist_${username}`)) || [];

    // set the data
    setWatchlist(saved);
  }, [username]);

  useEffect(() => {
    if (!username) return;

    localStorage.setItem(`watchlist_${username}`, JSON.stringify(watchlist));
  }, [watchlist, username]);

  // EVENT HANDLERS
  function login(newToken) {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    sessionStorage.removeItem("token");
    setToken(null);
  }

  function handleInitial() {
    // get token from local storage
    // const token = sessionStorage.getItem("token");

    // if no token return empty array
    if (!username) return [];

    // get the local storage data from token or initial empty array
    return JSON.parse(localStorage.getItem(`watchlist_${username}`)) || [];
  }

  function toggleWatchlist(movie) {
    const exists = watchlist.some((item) => item.id === movie.id);

    if (exists) {
      setWatchlist(watchlist.filter((item) => item.id !== movie.id));
    } else {
      setWatchlist([...watchlist, movie]);
    }
  }

  function isInWatchlist(movieId) {
    return watchlist.some((movie) => movie.id === movieId);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, search, setSearch, toggleWatchlist, isInWatchlist }}>
      {children}
    </AuthContext.Provider>
  );
}
