import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(form.email, form.password);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <p className="eyebrow">Welcome Back</p>
        <h2>Sign in to your workspace</h2>

        <form onSubmit={handleSubmit} className="grid-form">
          <label>
            Email
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </label>

          {error && <p className="error-text">{error}</p>}

          <button disabled={loading} type="submit">
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="muted">
          New here? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </section>
  );
};

export default LoginPage;
