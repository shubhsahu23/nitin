import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";
import { apiUrl } from "../../config/api";

axios.defaults.withCredentials = true;


const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.email || !data.password) {
      showToast("error", "Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(apiUrl("/api/user/login"), data, { withCredentials: true });
      if (res.data.success) {
        showToast("success", res.data.message);
        const user = res.data.user || res.data.data || {};
        const token =
          res.data.token ||
          res.data.accessToken ||
          user.token ||
          user.accessToken ||
          null;

        localStorage.setItem("user", JSON.stringify(user));
        if (token) {
          localStorage.setItem("token", token);
        }

        const userType = String(user.type || "").toLowerCase();
        setTimeout(() => {
          switch (userType) {
            case "admin":
              navigate("/adminhome");
              break;
            case "renter":
              navigate("/renterhome");
              break;
            case "owner":
              if (user.granted === "ungranted") {
                showToast("error", "Your account is not yet confirmed by the admin");
                return;
              } else {
                navigate("/ownerhome");
              }
              break;
            default:
              showToast("error", "Invalid user role. Please contact support.");
              navigate("/login");
              break;
          }

          window.location.reload();
        }, 1000);
      } else {
        showToast("error", res.data.message);
      }
    } catch (err) {
      showToast("error", err.response?.data?.message || "Login failed");
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Navbar */}
      <nav className="shadow-sm border-b" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent-primary)' }}>
              <span className="text-white font-bold text-lg">🏠</span>
            </div>
            <Link to="/" className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>RentEase</Link>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="transition-colors font-medium hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>
              Home
            </Link>
            <Link to="/register" className="transition-colors font-medium hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>
              Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-xl shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent-primary)' }}>
              <span className="text-white text-3xl">🔐</span>
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Welcome Back</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="font-medium" style={{ color: 'var(--text-primary)' }}>Email Address</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-medium)', color: 'var(--text-primary)' }}
              />
            </div>
            <div className="space-y-2">
              <label className="font-medium" style={{ color: 'var(--text-primary)' }}>Password</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors"
                style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-medium)', color: 'var(--text-primary)' }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold transition-colors shadow-sm hover:opacity-90"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}
            >
              Sign In
            </button>

            <div className="flex justify-between text-sm mt-6 pt-4 border-t border-gray-200">
              <Link to="/forgotpassword" className="text-blue-600 hover:text-blue-700 transition-colors">
                Forgot Password?
              </Link>
              <Link to="/register" className="text-blue-600 hover:text-blue-700 transition-colors">
                Create an Account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
