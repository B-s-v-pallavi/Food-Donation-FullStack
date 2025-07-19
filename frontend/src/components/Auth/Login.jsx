import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For displaying errors
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError(null); // Clear previous errors

    axios
      .post("https://food-donation-fullstack.onrender.com/login", formData)
      .then((res) => {
        if (res.status === 200) {
          const { token, role } = res.data;
          setUser({ token, role });
          localStorage.setItem("token", token);

          // Redirect based on role
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login failed. Please try again.");
      })
      .finally(() => {
        setLoading(false); // Reset loading state
      });
  }

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        
        <div className="input-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>

        <button className="login-btn" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
