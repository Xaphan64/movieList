// ASSETS
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import StopIcon from "@mui/icons-material/Stop";

// STYLES

// LIBRARIES
import { useState } from "react";

// MISC

// COMPONENTS

// CONFIGURATION
export default function InputChecker({ inputText, rules, dropdownName }) {
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
      return <StopIcon className="text-gray-400" fontSize="small" sx={{ transform: "rotate(45deg)" }} />;
      // ok icon if input is valid
    } else if (condition) {
      return <CheckCircleIcon className="text-green-400" fontSize="small" />;
      // warning icon if input is not valid
    } else if (!condition) {
      return <ErrorIcon className="text-red-400" fontSize="small" />;
    }
  }

  return (
    <div>
      <button type="button" onClick={() => setDropdown(!dropdown)} className="flex w-full justify-between">
        <span>{dropdownName} rules</span>
        {dropdown ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 
        ${dropdown ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}
      >
        {rules.map((rule, i) => {
          const isValid = rule.test(inputText);
          return (
            <div key={i} className="flex gap-1 items-center">
              <span>{handleIcon(isValid)}</span>
              <span className="max-w-sm">{rule.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
