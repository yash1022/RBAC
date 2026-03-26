import { Navigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user?.role)) {
    const home = user?.role === "admin" ? "/admin" : "/dashboard";
    return <Navigate to={home} replace />;
  }

  return children;
};

export default ProtectedRoute;
