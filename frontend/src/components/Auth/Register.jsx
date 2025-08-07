import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Register.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
  });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleRegister(e) {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_API}/api/auth/signup`, formData)
      // .post("https://food-donation-fullstack.onrender.com/signup", formData)
      .then((res) => {
        console.log("Registration successful", res);
        if (res.status === 201) {
          const { token, role } = res.data;
          setUser({ token, role });
          localStorage.setItem("token", token);
          // If registered user is admin, redirect to admin dashboard
          if (role === "admin") {
            navigate("/admin/dashboard");
          } else {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        console.error("Registration Error:", err.response?.data || err.message);
        alert("Registration failed: " + (err.response?.data.message || "Error"));
      });
  }

  return (
    <div className="register-container">
  <form className="register-form" onSubmit={handleRegister}>
    <h2 className="text-center">Register</h2>
    
    <div className="input-group">
      <label htmlFor="username">Name</label>
      <input
        type="text"
        id="username"
        placeholder="Name"
        name="username"
        onChange={handleChange}
        required
      />
    </div>
    
    <div className="input-group">
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        placeholder="Email"
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
        placeholder="Password"
        name="password"
        onChange={handleChange}
        required
      />
    </div>
    
    <div className="input-group">
      <label htmlFor="mobile">Mobile Number</label>
      <input
        type="text"
        id="mobile"
        placeholder="Mobile Number"
        name="mobile"
        onChange={handleChange}
        required
      />
    </div>
    
    <button className="register-btn" type="submit">Register</button>
  </form>
</div>

  );
}
