// ASSETS

// STYLES

// LIBRARIES
import { useState } from "react";
import { Link } from "react-router-dom";

// MISC

// COMPONENTS
import InputChecker from "../components/InputChecker";
import { passwordRules, usernameRules } from "../components/inputRules";

// CONFIGURATION
export default function Register() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [input, setInput] = useState({
    username: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  // const [error, setError] = useState({
  //   username: "",
  //   email: "",
  //   birthDate: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleRegister(e) {
    e.preventDefault();

    // console.log(input.username, input.email, input.birthDate, input.password, input.confirmPassword);

    // console.log(typeof input.birthDate);

    // console.log(`date: ${input.birthDate}`);

    // regex username validation condition
    const usernameRegex = /^[A-Za-z][A-Za-z0-9._-]{2,14}$/;

    // regex email validation condition
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // password regex condition (min 8 chars at least 1 upper, 1 lower, 1 number and 1 special)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,16}$/;

    // username empty throw error
    if (input.username.trim() === "") {
      console.log(`username is empty`);
    }
    // username too short
    else if (!usernameRegex.test(input.username)) {
      console.log(`name dont respect condition`);
    }

    // email empty throw error
    if (input.email.trim() === "") {
      console.log(`email is empty`);
    }
    // email wrong format throw error
    else if (!emailRegex.test(input.email)) {
      console.log(`invalid email address`);
    }

    // birthday empty throw error
    if (input.birthDate.trim() === "") {
      console.log(`birthday field is empty`);
    }
    // too young (less 14 years) throw error
    else if (input.birthDate > handleDate(14)) {
      console.log(`you are too young to make an account`);
    }
    // too old (more than 100 years) throw error
    else if (input.birthDate < handleDate(100)) {
      console.log(`invalid date`);
    }

    // password empty throw error
    if (input.password.trim() === "") {
      console.log(`password is empty`);
    }
    // password must be at least 1 number, 1 upper, 1 lower and 1 special character error
    else if (!passwordRegex.test(input.password)) {
      console.log(`password dont respect condition`);
    }

    // confirm password must match with password
    if (input.confirmPassword !== input.password) {
      console.log(`passwords don't match`);
    }

    // de facut si conditiile de passed form si navigate
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

    // set the input of the previous state
    setInput((prev) => ({
      ...prev,
      // use name as a key
      [name]: value,
    }));
  }

  return (
    <div className="flex flex-col items-center">
      <h1>Create your [APPNAME] account</h1>

      <form className="flex flex-col" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="username"
          name="username"
          value={input.username}
          onChange={handleChange}
          className="text-light-text dark:text-dark-text"
        />

        <InputChecker dropdownName="Username" rules={usernameRules} inputText={input.username} />

        <input
          type="text"
          placeholder="email"
          name="email"
          value={input.email}
          onChange={handleChange}
          className="text-light-text dark:text-dark-text"
        />

        <input
          type="date"
          placeholder="birthday"
          name="birthDate"
          value={input.birthDate}
          onChange={handleChange}
          className="text-light-text dark:text-dark-text"
          // style={{ colorScheme: "dark" }}
        />

        <input
          type="password"
          placeholder="password"
          name="password"
          value={input.password}
          onChange={handleChange}
          className="text-light-text dark:text-dark-text"
        />

        <InputChecker dropdownName="Password" rules={passwordRules} inputText={input.password} />

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
