import React, { useState } from "react";
import "./AdminLogin.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AdminLogin = ({ url, setAdminToken }) => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const onChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${url}/api/user/login`, data);

      if (!res.data.success) {
        toast.error(res.data.message || "Login failed");
        return;
      }

      const user = res.data.user;
      if (!user.isAdmin) {
        toast.error("You are not authorized as admin");
        return;
      }

      const token = res.data.token;

      localStorage.setItem("adminToken", token);
      setAdminToken(token);

      toast.success("Welcome admin 👑");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Server error during login");
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login-form" onSubmit={onSubmit}>
        <h2>BlizzBazar Admin Login</h2>
        <p className="subtitle">Only authorized admins can access this panel.</p>

        <input
          type="email"
          name="email"
          placeholder="Admin email"
          value={data.email}
          onChange={onChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={onChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
