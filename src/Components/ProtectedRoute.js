import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/authContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();
  const location = useLocation();
  console.log("PROTECTED ROUTE", token);
  return token ? (
    children
  ) : (
    <Navigate to="/auth/login" state={{ from: location?.pathname }} replace />
  );
}
