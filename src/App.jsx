// ASSETS

// STYLES
import "./App.css";

// LIBRARIES
import { BrowserRouter, Route, Routes } from "react-router-dom";

// MISC

// COMPONENTS
import Layout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Register from "./pages/Register";

// CONFIGURATION
function App() {
  // PROPERTIES

  // API REQUESTS

  // LIBRARY CONSTANTS

  // STATE CONSTANTS

  // LIFE CYCLE

  // EVENT HANDLERS
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
