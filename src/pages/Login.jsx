// ASSETS

// STYLES

// LIBRARIES
import { useState } from "react";
import { Link } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function Login() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleLogin(e) {
    e.preventDefault();

    console.log(input.email, input.password);
  }

  function handleChange(e) {
    // deconstruct name and value
    const { name, value } = e.target;

    // set the input of the previous state
    setInput((prev) => ({
      ...prev,
      // use name as a key
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col items-center">
      <h1>login page</h1>

      <form className="flex flex-col" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          className="text-light-text dark:text-dark-text"
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          className="text-light-text dark:text-dark-text"
        />

        <button type="submit">login button</button>

        <div className="flex gap-1">
          <p>No account?</p>
          <Link
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
            underline transition-colors"
            to="/register"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}
