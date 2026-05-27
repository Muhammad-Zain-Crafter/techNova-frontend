// src/pages/Login.jsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // Error State
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear error while typing
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      setError("");

      const response = await API.post(
        "/api/v1/productStore/users/login",
        formData,
      );

      // Save token
      localStorage.setItem("token", response.data.token);

      // Save user data
      localStorage.setItem("user", JSON.stringify(response.data.data));

      // Redirect Admin
      if (response.data.data.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

      window.location.reload();
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Login Failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] flex items-center justify-center px-6 relative overflow-hidden text-white">
      {/* Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-10 right-10 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm bg-[#081120]/90 border border-[#182235] rounded-2xl p-6 shadow-2xl backdrop-blur-xl">
        {/* Heading */}
        <div className="text-center mb-6">
          <div className="inline-block mb-4 px-4 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/10">
            <span className="text-xs tracking-[3px] text-cyan-300 uppercase">
              Secure Access
            </span>
          </div>

          <h1 className="text-3xl font-black mb-2">
            Access <span className="text-cyan-400">Portal</span>
          </h1>

          <p className="text-gray-400 text-xs">
            Login to continue into the futuristic system.
          </p>
        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-[#030712] border border-[#182235] rounded-lg p-1 mb-6">
          <button className="bg-cyan-400 text-black text-sm font-semibold py-2 rounded-lg">
            Login
          </button>

          <Link
            to="/register"
            className="text-gray-400 hover:text-cyan-400 flex items-center justify-center text-sm transition duration-300"
          >
            Sign Up
          </Link>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-xs text-gray-300 mb-1.5">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-[#030712] border border-[#182235] focus:border-cyan-400 outline-none rounded-lg px-3 py-2.5 text-sm text-white transition duration-300"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-xs text-gray-300 mb-1.5">
              Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#030712] border border-[#182235] focus:border-cyan-400 outline-none rounded-lg px-3 py-2.5 text-sm text-white transition duration-300"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2 rounded-lg">
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-cyan-400 text-black text-sm font-bold hover:bg-cyan-300 transition duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-70"
          >
            {loading ? "Authorizing..." : "Authorize System ⚡"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
