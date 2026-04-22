// ASSETS

// STYLES

// LIBRARIES
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

// MISC

// COMPONENTS

// CONFIGURATION
export default function Layout() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [nightMode, setNightMode] = useState(false);

  // LIFE CYCLE
  // useEffect(() => {
  //   const root = document.documentElement;

  //   if (nightMode) {
  //     root.classList.add("dark");
  //   } else {
  //     root.classList.remove("dark");
  //   }
  // }, [nightMode]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // EVENT HANDLERS
  function handleNightMode() {
    // document.documentElement.classList.toggle("dark");

    setNightMode((prev) => !prev);
  }

  // function handleNightMode() {
  //   const root = document.documentElement;

  //   if (root.classList.contains("dark")) {
  //     root.classList.remove("dark");
  //     setNightMode(false);
  //   } else {
  //     root.classList.add("dark");
  //     setNightMode(true);
  //   }
  // }

  return (
    // <div
    //   className={`flex flex-col w-full min-h-screen p-2 duration-600 ${nightMode ? "bg-black text-white" : "bg-white text-black"}`}
    // >
    //   <button
    //     type="button"
    //     onClick={handleNightMode}
    //     className={`self-end p-2 text-2xl cursor-pointer transition-colors duration-300 rounded ${nightMode ? "text-white hover:bg-gray-700" : "text-black hover:bg-gray-300"}`}
    //   >
    //     {nightMode ? "☀️" : "🌙"}
    //   </button>

    //   <Outlet />
    // </div>

    // <div className="min-h-screen bg-white text-black dark:bg-black dark:text-white transition-colors duration-300">
    //   <button onClick={handleNightMode}>{nightMode ? "☀️" : "🌙"}</button>

    //   <div className="p-5">
    //     <p>Night mode: {nightMode ? "ON" : "OFF"}</p>
    //   </div>

    //   <div className="bg-white dark:bg-red-500 min-h-screen">TEST</div>

    //   <Outlet />
    // </div>

    <div className="min-h-screen bg-white dark:bg-red-500">TEST</div>
  );
}
