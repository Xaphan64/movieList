// ASSETS
import DangerousIcon from "@mui/icons-material/Dangerous";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";

// STYLES

// LIBRARIES
import { useId, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function Login() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();
  const token = useId();

  // STATE CONSTANTS
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleLogin(e) {
    e.preventDefault();

    //if email or password does not match with the one in localStorage show error
    if (
      input.email !== localStorage.getItem("Email", input.email) ||
      input.password !== localStorage.getItem("Password", input.password)
    ) {
      console.log(`password or email incorrect`);
      setError("Incorrect email or password");
    }

    //if both conditions are met login (navigate to main page & create a token)
    if (
      input.email === localStorage.getItem("Email", input.email) &&
      input.password === localStorage.getItem("Password", input.password)
    ) {
      console.log("login successfull");
      navigate("/");
      sessionStorage.setItem("token", token);
    }
  }

  function handleChange(e) {
    // deconstruct name and value
    const { name, value } = e.target;

    // set the input
    setInput((prev) => ({
      ...prev,
      // use name as a key
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="sm:text-2xl text-xl font-bold">Login to Movielyst </h1>

      <form className="flex flex-col sm:gap-2 gap-1" autoComplete="off" onSubmit={handleLogin}>
        <div className="flex flex-col sm:gap-2 gap-1">
          <h2 className="font-semibold sm:text-base text-sm">Email</h2>
          <div className="flex flex-row relative items-center">
            <input
              type="text"
              placeholder="Enter your email address"
              name="email"
              value={input.email}
              onChange={handleChange}
              className={`sm:p-2 w-full sm:px-11 focus:outline-none focus:ring-0 rounded-md sm:border-2 sm:text-lg
              p-1 border-1 text-sm px-8 light:text-light-text dark:text-dark-text light:border-light-border
              dark:border-dark-border dark:bg-dark-input-bg dark:focus:border-dark-focus light:focus:border-light-focus
              ${error ? "light:border-light-error dark:border-dark-error" : ""}`}
            />

            <EmailIcon
              sx={{ fontSize: { xs: 18, sm: 26, md: 26 } }}
              className="absolute light:text-light-text dark:text-dark-text sm:left-2 left-1"
            />
          </div>
        </div>

        <div className="flex flex-col sm:gap-2 gap-1">
          <h2 className="font-semibold sm:text-base text-sm">Password</h2>
          <div className="flex flex-row relative items-center">
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={input.password}
              onChange={handleChange}
              className={`sm:p-2 w-full sm:px-11 focus:outline-none focus:ring-0 rounded-md sm:border-2 sm:text-lg
              p-1 border-1 text-sm px-8 light:text-light-text dark:text-dark-text light:border-light-border
              dark:border-dark-border dark:bg-dark-input-bg dark:focus:border-dark-focus light:focus:border-light-focus
              ${error ? "light:border-light-error dark:border-dark-error" : ""}`}
            />

            <LockIcon
              sx={{ fontSize: { xs: 18, sm: 26, md: 26 } }}
              className="absolute light:text-light-text dark:text-dark-text sm:left-2 left-1"
            />
          </div>
        </div>

        {error && (
          <div className="flex gap-1 items-center light:text-light-error dark:text-dark-error sm:text-base text-sm">
            <DangerousIcon fontSize="small" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          className="cursor-pointer font-bold sm:p-3 p-1 rounded-md duration-300 sm:text-base text-sm
          light:bg-light-accent light:hover:bg-light-hover light:active:bg-light-active
          dark:bg-dark-accent dark:hover:bg-dark-hover dark:active:bg-dark-active"
        >
          Login
        </button>
      </form>

      <div className="flex gap-1 font-semibold sm:text-base text-sm">
        <p>No account?</p>
        <Link
          className="text-blue-600 light:hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
          underline transition-colors"
          to="/register"
        >
          Register
        </Link>
      </div>
    </div>
  );
}
