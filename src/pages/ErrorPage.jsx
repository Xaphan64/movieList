// ASSETS

// STYLES

// LIBRARIES
import { Link } from "react-router-dom";

// MISC
import { movieApp } from "../config/config";

// COMPONENTS

// CONFIGURATION
export default function ErrorPage() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <h1 className="pt-6 text-xl font-semibold sm:text-2xl">Error! This page does not exist</h1>

      <h2 className="sm:text-xl">Click on the app name to be redirected to the main page</h2>
      <h2 className="sm:text-xl">
        If you are not logged in you can{" "}
        <Link
          to="/login"
          className="font-semibold text-blue-600 light:hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 
          underline transition-colors"
        >
          log in
        </Link>{" "}
        to your
        <span className="font-semibold">{" " + movieApp.name + " "}</span>
        account
      </h2>
    </div>
  );
}
