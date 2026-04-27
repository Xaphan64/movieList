// LIBRARIES
import { Navigate, Outlet } from "react-router-dom";

// CONFIGURATION
export default function PrivateRoutes() {
  // LIBRARY CONSTANTS
  const authenticationToken = sessionStorage.getItem("token");

  // EVENT HANDLERS
  return authenticationToken ? <Outlet /> : <Navigate to="/login" />;
}
