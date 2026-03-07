import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../common/Toast";
import { apiUrl } from "../../config/api";

axios.defaults.withCredentials = true;


const Register = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    type: "",
  });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password || !data.type) {
      return showToast("error", "Please fill all fields");
    }

    try {
      const response = await axios.post(
        apiUrl("/api/user/register"),
        data,
        { withCredentials: true }
      );

      if (response.data.success) {
        showToast("success", response.data.message);
        setTimeout(() => navigate("/login"), 1000);
      } else {
        showToast("error", response.data.message);
      }
    } catch (error) {
      showToast("error", error.response?.data?.message || "Registration failed. Please try again.");
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
            <Link to="/login" className="transition-colors font-medium hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Register Form */}
      <div className="flex-grow flex justify-center items-center px-4 py-12">
        <div className="w-full max-w-md p-8 rounded-xl shadow-sm" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-light)' }}>
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--accent-primary)' }}>
              <span className="text-white text-3xl">📝</span>
            </div>
            <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Join Our Community</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Create your account today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Email Address</label>
              <input
                type="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium">Account Type</label>
              <select
                name="type"
                value={data.type}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select Account Type</option>
                <option value="Renter">🏠 Renter</option>
                <option value="Owner">🏢 Property Owner</option>
                <option value="Admin">⚙️ Admin</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
            >
              Create Account
            </button>

            <div className="text-center text-gray-600 text-sm mt-6 pt-4 border-t border-gray-200">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
