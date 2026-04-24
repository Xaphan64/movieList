// ASSETS

// STYLES

// LIBRARIES
import { useState } from "react";
import { Link } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function Register() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleRegister(e) {
    e.preventDefault();

    console.log(input.username, input.email, input.password, input.confirmPassword);
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
      <h1>register page</h1>

      <form className="flex flex-col" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={input.username}
          onChange={handleChange}
          className="text-light-text dark:text-dark-text"
        />

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

        <input
          type="password"
          placeholder="confirmPassword"
          name="confirmPassword"
          value={input.confirmPassword}
          onChange={handleChange}
          className="text-light-text dark:text-dark-text"
        />

        <button type="submit">register button</button>

        <div className="flex gap-1">
          <p>Already have an account?</p>
          <Link
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
            underline transition-colors"
            to="/login"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}
