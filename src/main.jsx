// STYLES
import "./index.css";

// LIBRARIES
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// COMPONENTS
import App from "./App.jsx";

// CONFIGURATION
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
