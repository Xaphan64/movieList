// ASSETS
import ErrorIcon from "@mui/icons-material/Error";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import DangerousIcon from "@mui/icons-material/Dangerous";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

// STYLES

// LIBRARIES
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// MISC

// COMPONENTS
import InputChecker from "../components/InputChecker";
import { passwordRules, usernameRules } from "../components/inputRules";

// CONFIGURATION
export default function Register() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS
  const [userDropdown, setUserDropdown] = useState(false);
  const [passwordDropdown, setPasswordDropdown] = useState(false);
  const [error, setError] = useState("");
  const [input, setInput] = useState({
    username: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleRegister(e) {
    e.preventDefault();

    // errors object
    const newError = {
      username: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
    };

    // regex validation conditions
    const usernameRegex = /^[A-Za-z][A-Za-z0-9._-]{2,14}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,16}$/;

    // username empty throw error
    if (input.username.trim() === "") {
      newError.username = "Username is empty!";
    }
    // if username too short open the dropdown
    else if (!usernameRegex.test(input.username)) {
      setUserDropdown(true);
    }

    // email empty throw error
    if (input.email.trim() === "") {
      newError.email = "Email address is empty!";
    }
    // email wrong format throw error
    else if (!emailRegex.test(input.email)) {
      newError.email = "Invalid email address!";
    }

    // birthday empty throw error
    if (input.birthDate.trim() === "") {
      newError.birthDate = "Complete your date of birth!";
    }
    // too young (less 14 years) throw error
    else if (input.birthDate > handleDate(14)) {
      newError.birthDate = "You are too young to make an account!";
    }
    // too old (more than 100 years) throw error
    else if (input.birthDate < handleDate(100)) {
      newError.birthDate = "Invalid date of birth!";
    }

    // password empty throw error
    if (input.password.trim() === "") {
      newError.password = "Set your password!";
    }
    // open dropdown if password is not at least 1 number, 1 upper, 1 lower and 1 special character
    else if (!passwordRegex.test(input.password)) {
      setPasswordDropdown(true);
    }

    // confirm password must match with password
    if (input.confirmPassword !== input.password) {
      newError.confirmPassword = "Password and confirm password must be the same!";
    }

    // set the error
    setError(newError);

    // validations conditions
    if (
      usernameRegex.test(input.username) &&
      emailRegex.test(input.email) &&
      input.birthDate < handleDate(14) &&
      input.birthDate > handleDate(100) &&
      passwordRegex.test(input.password) &&
      input.password === input.confirmPassword
    ) {
      // save data to local storage
      localStorage.setItem("Username", input.username);
      localStorage.setItem("Email", input.email);
      localStorage.setItem("Birth Date", input.birthDate);
      localStorage.setItem("Password", input.password);
      localStorage.setItem("Confirm Password", input.confirmPassword);

      // redirect to login page
      navigate("/login");
    }
  }

  function handleDate(year) {
    // get the current date
    const now = new Date();
    let currentDate = new Date(now);

    // substract X years from the current date
    currentDate.setFullYear(currentDate.getFullYear() - year);

    // convert back to string
    const pastDate = currentDate.toISOString().split("T")[0];

    // return the result
    return pastDate;
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

    // remove error when typing into input
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="sm:text-2xl text-xl font-bold">Create your Movielyst account</h1>

      <form className="flex flex-col sm:gap-2 gap-1" autoComplete="off" onSubmit={handleRegister}>
        <div className="flex flex-col sm:gap-2 gap-1">
          <h2 className="font-semibold sm:text-base text-sm">Username</h2>
          <div className="flex flex-row relative items-center">
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={input.username}
              onChange={handleChange}
              className={`sm:p-2 w-full sm:px-11 focus:outline-none focus:ring-0 rounded-md sm:border-2 sm:text-lg
              p-1 border-1 text-sm px-8 light:text-light-text dark:text-dark-text light:border-light-border
              dark:border-dark-border dark:bg-dark-input-bg dark:focus:border-dark-focus light:focus:border-light-focus
               ${error.username ? "light:border-light-error dark:border-dark-error" : ""}`}
            />

            <PersonIcon
              sx={{ fontSize: { xs: 18, sm: 26, md: 26 } }}
              className="absolute light:text-light-text dark:text-dark-text sm:left-2 left-1"
            />
          </div>
        </div>

        {error.username && (
          <div className="flex gap-1 items-center light:text-light-error dark:text-dark-error sm:text-base text-sm">
            <DangerousIcon fontSize="small" />
            <span>{error.username}</span>
          </div>
        )}

        <InputChecker
          dropdownName="Username"
          rules={usernameRules}
          inputText={input.username}
          status={userDropdown}
        />

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
              ${error.email ? "light:border-light-error dark:border-dark-error" : ""}`}
            />

            <EmailIcon
              sx={{ fontSize: { xs: 18, sm: 26, md: 26 } }}
              className="absolute light:text-light-text dark:text-dark-text sm:left-2 left-1"
            />
          </div>
        </div>

        {error.email && (
          <div className="flex gap-1 items-center light:text-light-error dark:text-dark-error sm:text-base text-sm">
            <DangerousIcon fontSize="small" />
            <span>{error.email}</span>
          </div>
        )}

        <div className="flex flex-col sm:gap-2 gap-1">
          <h2 className="font-semibold sm:text-base text-sm">Date of birth</h2>
          <div className="flex flex-row relative items-center">
            <input
              type="date"
              name="birthDate"
              value={input.birthDate}
              onChange={handleChange}
              className={`sm:p-2 w-full sm:px-11 focus:outline-none focus:ring-0 rounded-md sm:border-2 sm:text-lg
              p-1 border-1 text-sm px-8 light:text-light-text dark:text-dark-text light:border-light-border
              dark:border-dark-border dark:bg-dark-input-bg dark:focus:border-dark-focus light:focus:border-light-focus
              ${error.birthDate ? "light:border-light-error dark:border-dark-error" : ""}`}
            />

            <CalendarTodayIcon
              sx={{ fontSize: { xs: 18, sm: 26, md: 26 } }}
              className="absolute light:text-light-text dark:text-dark-text sm:left-2 left-1"
            />
          </div>
        </div>

        {error.birthDate && (
          <div className="flex gap-1 items-center light:text-light-error dark:text-dark-error sm:text-base text-sm">
            <DangerousIcon fontSize="small" />
            <span>{error.birthDate}</span>
          </div>
        )}

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
              ${error.password ? "light:border-light-error dark:border-dark-error" : ""}`}
            />

            <LockIcon
              sx={{ fontSize: { xs: 18, sm: 26, md: 26 } }}
              className="absolute light:text-light-text dark:text-dark-text sm:left-2 left-1"
            />
          </div>
        </div>

        {error.password && (
          <div className="flex gap-1 items-center light:text-light-error dark:text-dark-error sm:text-base text-sm">
            <DangerousIcon fontSize="small" />
            <span>{error.password}</span>
          </div>
        )}

        <InputChecker
          dropdownName="Password"
          rules={passwordRules}
          inputText={input.password}
          status={passwordDropdown}
        />

        <div className="flex flex-col sm:gap-2 gap-1">
          <h2 className="font-semibold sm:text-base text-sm">Confirm Password</h2>
          <div className="flex flex-row relative items-center">
            <input
              type="password"
              placeholder="Confirm you password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
              className={`sm:p-2 w-full sm:px-11 focus:outline-none focus:ring-0 rounded-md sm:border-2 sm:text-lg
              p-1 border-1 text-sm px-8 light:text-light-text dark:text-dark-text light:border-light-border
              dark:border-dark-border dark:bg-dark-input-bg dark:focus:border-dark-focus light:focus:border-light-focus
              ${error.confirmPassword ? "light:border-light-error dark:border-dark-error" : ""}`}
            />

            <LockIcon
              sx={{ fontSize: { xs: 18, sm: 26, md: 26 } }}
              className="absolute light:text-light-text dark:text-dark-text sm:left-2 left-1"
            />
          </div>
        </div>

        {error.confirmPassword && (
          <div className="flex gap-1 items-center light:text-light-error dark:text-dark-error sm:text-base text-sm">
            <DangerousIcon fontSize="small" />
            <span>{error.confirmPassword}</span>
          </div>
        )}

        <button
          type="submit"
          className="cursor-pointer font-bold sm:p-3 p-1 rounded-md duration-300 sm:text-base text-sm
          light:bg-light-accent light:hover:bg-light-hover light:active:bg-light-active
          dark:bg-dark-accent dark:hover:bg-dark-hover dark:active:bg-dark-active"
        >
          Register
        </button>
      </form>

      <div className="flex gap-1 font-semibold sm:text-base text-sm">
        <p>Already have an account?</p>
        <Link
          className="text-blue-600 light:hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
          underline transition-colors"
          to="/login"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
