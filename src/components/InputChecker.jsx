// ASSETS
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import StopIcon from "@mui/icons-material/Stop";

// STYLES

// LIBRARIES
import { useState } from "react";

// MISC

// COMPONENTS

// CONFIGURATION
export default function InputChecker({ inputText, rules, dropdownName, status }) {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS
  const [dropdown, setDropdown] = useState(false);

  // LIFE CYCLE

  // EVENT HANDLERS
  function handleIcon(condition) {
    // rhomb icon if input empty
    if (inputText === "") {
      return (
        <StopIcon
          className="text-dark-border dark:text-light-border"
          fontSize="small"
          sx={{ transform: "rotate(45deg)" }}
        />
      );
      // ok icon if input is valid
    } else if (condition) {
      return <CheckCircleIcon className="text-green-400" fontSize="small" />;
      // warning icon if input is not valid
    } else if (!condition) {
      return <ErrorIcon className="text-red-400" fontSize="small" />;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setDropdown(!dropdown)}
        className="flex flex-col w-full cursor-pointer"
      >
        <div className="flex justify-between">
          <span>{dropdownName} rules</span>
          {dropdown || status ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>

        <div
          className={`overflow-hidden transition-all ease-in-out duration-500  
        ${dropdown || status ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {rules.map((rule, i) => {
            const isValid = rule.test(inputText);
            return (
              <div key={i} className="flex gap-1 items-center text-left">
                <span>{handleIcon(isValid)}</span>
                <span className="max-w-sm">{rule.label}</span>
              </div>
            );
          })}
        </div>
      </button>
    </>
  );
}
