// ASSETS

// STYLES

// LIBRARIES
import { useState } from "react";

// MISC
import { AuthContext } from "./config";

// COMPONENTS

// CONFIGURATION
export default function AuthenticationProvider({ children }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [search, setSearch] = useState("");

  // LIFE CYCLE

  // EVENT HANDLERS
  function login(newToken) {
    sessionStorage.setItem("token", newToken);
    setToken(newToken);
  }

  function logout() {
    sessionStorage.removeItem("token");
    setToken(null);
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, search, setSearch }}>{children}</AuthContext.Provider>
  );
}
