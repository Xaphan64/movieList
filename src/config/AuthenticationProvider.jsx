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
  const [notification, setNotification] = useState("");

  // LIFE CYCLE
  useEffect(() => {
    function handleSetWatchlist(value) {
      setWatchlist(value);
    }

    if (!username) {
      // setWatchlist([]);
      handleSetWatchlist([]);
      return;
    }

    // get the data from local storage or get empty []
    const saved = JSON.parse(localStorage.getItem(`watchlist_${username}`)) || [];

    // set the data
    // setWatchlist(saved);
    handleSetWatchlist(saved);
  }, [username]);

  useEffect(() => {
    if (!username) return;

    localStorage.setItem(`watchlist_${username}`, JSON.stringify(watchlist));
  }, [watchlist, username]);

  // EVENT HANDLERS
  function login(newToken) {
    // set a new token in local storage
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    // remove token from local storage
    sessionStorage.removeItem("token");
    setToken(null);
  }

  function handleInitial() {
    // if no username return empty array
    if (!username) return [];

    // get the local storage data from username or initial empty array
    return JSON.parse(localStorage.getItem(`watchlist_${username}`)) || [];
  }

  function toggleWatchlist(movie) {
    // check if the movie already exists in watchlist
    const exists = watchlist.some((item) => item.id === movie.id);

    if (exists) {
      // remove movie by id
      setWatchlist(watchlist.filter((item) => item.id !== movie.id));
      setNotification("Removed from watchlist");
    } else {
      // or add the movie into the watchlist
      setWatchlist([...watchlist, movie]);
      setNotification("Added to watchlist");
    }

    setTimeout(() => {
      setNotification("");
    }, 2000);
  }

  function isInWatchlist(movieId) {
    // check if the movie already exists in watchlist
    return watchlist.some((movie) => movie.id === movieId);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        search,
        setSearch,
        toggleWatchlist,
        isInWatchlist,
        watchlist,
        notification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
