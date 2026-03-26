import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await register(form);
      setMessage(response.message || "Registered successfully");
      setTimeout(() => navigate("/login"), 700);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="auth-layout">
      <div className="auth-card">
        <p className="eyebrow">Get Started</p>
        <h2>Create your account</h2>

        <form onSubmit={handleSubmit} className="grid-form">
          <label>
            Full Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>

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

          <label>
            Role
            <select name="role" value={form.role} onChange={handleChange} required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          {error && <p className="error-text">{error}</p>}
          {message && <p className="success-text">{message}</p>}

          <button disabled={loading} type="submit">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p className="muted">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </section>
  );
};

export default RegisterPage;
