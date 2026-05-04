// ASSETS

// STYLES

// LIBRARIES
import { Link, useNavigate } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function MainPage() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS
  const navigate = useNavigate();

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      {/* Main page - to be implented later */}
      <div className="flex flex-col">
        {/* <Link
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
            underline transition-colors"
          to="/register"
        >
          Register
        </Link>

        <Link
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
            underline transition-colors"
          to="/login"
        >
          Sign in
        </Link>

        <button type="button" onClick={handleLogout}>
          Logout
        </button> */}

        {/* <MainContent /> */}

        {/* <Footer /> */}
      </div>
    </div>
  );
}

export const MainContent = () => {
  return (
    <div className="flex flex-col items-center">
      <img className="h-auto w-150" src="https://www.svgrepo.com/show/355190/reactjs.svg" alt="react-image" />

      <p className="sm:w-300 text-center">
        React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript library that
        aims to make building user interfaces based on components more "seamless". It is maintained by Meta
        (formerly Facebook) and a community of individual developers and companies. According to the 2025 Stack
        Overflow Developer Survey, React is one of the most commonly used web technologies. React can be used to
        develop single-page, mobile, or server-rendered applications with frameworks like Next.js and React
        Router. Because React is only concerned with the user interface and rendering components to the DOM,
        React applications often rely on libraries for routing and other client-side functionality. A key
        advantage of React is that it only re-renders those parts of the page that have changed, avoiding
        unnecessary re-rendering of unchanged DOM elements. React is used by an estimated 6% of all websites.
      </p>
    </div>
  );
};

export const Footer = () => {
  return (
    <div className="flex justify-center gap-1 sm:p-10 sm:flex-row flex-col text-center p-5">
      <p>For more info regaring React you can check the</p>
      <a
        className="text-blue-600 light:hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
          underline transition-colors"
        href="https://en.wikipedia.org/wiki/React_(software)"
      >
        React Wikipedia Page
      </a>
    </div>
  );
};
