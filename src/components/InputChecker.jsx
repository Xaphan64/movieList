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
          className="light:text-dark-border dark:text-light-border"
          fontSize="small"
          sx={{ transform: "rotate(45deg)" }}
        />
      );
      // ok icon if input is valid
    } else if (condition) {
      return <CheckCircleIcon className="text-green-500" fontSize="small" />;
      // warning icon if input is not valid
    } else if (!condition) {
      return <ErrorIcon className="light:text-light-error dark:text-dark-error" fontSize="small" />;
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setDropdown(!dropdown)}
        className="flex flex-col w-full cursor-pointer sm:p-1 rounded light:bg-light-accent light:focus:border-dark-border
        dark:bg-dark-accent border-1 border-transparent dark:focus:border-light-border focus:border-1 
        hover:dark:bg-dark-hover hover:light:bg-light-hover sm:text-base text-sm"
      >
        <div className="flex justify-between items-center sm:p-1 px-1">
          <span className="sm:font-bold font-semibold">{dropdownName} rules</span>
          {dropdown || status ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </div>

        <div
          className={`overflow-hidden transition-all ease-in-out duration-500 flex flex-col sm:gap-3 gap-1
            ${dropdown || status ? "max-h-50 opacity-100" : "max-h-0 opacity-0"}`}
        >
          <hr className="light:border-dark-focus dark:border-light-border sm:mt-2 hidden" />

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
