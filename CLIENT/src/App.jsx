import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import useAuth from "./context/useAuth";
import AdminPage from "./pages/AdminPage";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={isAuthenticated ? (user?.role === "admin" ? "/admin" : "/dashboard") : "/login"} replace />}
      />

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute roles={["user"]}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
