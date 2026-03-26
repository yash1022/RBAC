import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="auth-layout">
      <div className="auth-card">
        <h2>404</h2>
        <p className="muted">The page you are looking for does not exist.</p>
        <Link to="/dashboard">Go to dashboard</Link>
      </div>
    </section>
  );
};

export default NotFoundPage;
