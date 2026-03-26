import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const Shell = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Role Based Access Control</p>
          <h1>Task Control Center</h1>
        </div>
        <div className="user-chip">
          <span>{user?.name}</span>
          <strong>{user?.role}</strong>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <nav className="tabs">
        {user?.role === "user" && (
          <Link className={location.pathname === "/dashboard" ? "active" : ""} to="/dashboard">
            My Tasks
          </Link>
        )}
        {user?.role === "admin" && (
          <Link className={location.pathname === "/admin" ? "active" : ""} to="/admin">
            Admin Dashboard
          </Link>
        )}
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default Shell;
