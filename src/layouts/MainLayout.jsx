// ASSETS

// STYLES

// LIBRARIES
import { Outlet } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function Layout() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleNightMode() {
    console.log(`nightmode clicked`);
  }

  return (
    <div>
      <button type="button" onClick={handleNightMode} className="p-1">
        nightmode
      </button>

      <Outlet />
    </div>
  );
}
