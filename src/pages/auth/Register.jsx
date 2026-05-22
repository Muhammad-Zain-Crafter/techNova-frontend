import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
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

    // Remove error while typing
    setError("");

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      // Clear previous error
      setError("");

      await API.post(
        "/api/v1/productStore/users/register",
        formData
      );

      navigate("/login");

    } catch (error) {

      setError(
        error.response?.data?.message
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
              New Identity
            </span>
          </div>

          <h1 className="text-3xl font-black mb-2">
            Create{" "}
            <span className="text-cyan-400">
              Account
            </span>
          </h1>

          <p className="text-gray-400 text-xs">
            Join the next generation platform.
          </p>

        </div>

        {/* Tabs */}
        <div className="grid grid-cols-2 bg-[#030712] border border-[#182235] rounded-lg p-1 mb-6">

          <Link
            to="/login"
            className="text-gray-400 hover:text-cyan-400 flex items-center justify-center transition duration-300"
          >
            Login
          </Link>

          <button className="bg-cyan-400 text-black font-semibold py-2 rounded-lg">
            Sign Up
          </button>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Username */}
          <div>

            <label className="block text-xs text-gray-300 mb-1.5">
              Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-[#030712] border border-[#182235] focus:border-cyan-400 outline-none rounded-lg px-3 py-2.5 text-sm text-white transition duration-300"
            />

          </div>

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
              Create Password
            </label>

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-[#030712] border border-[#182235] focus:border-cyan-400 outline-none rounded-xl px-4 py-3 text-white transition duration-300"
            />

          </div>

          {/* Error Message */}
          {
            error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs px-3 py-2 rounded-lg">
                {error}
              </div>
            )
          }

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg bg-cyan-400 text-black text-sm font-bold hover:bg-cyan-300 transition duration-300 shadow-lg shadow-cyan-500/20 disabled:opacity-70"
          >
            {loading ? "Creating..." : "Initialize Account ⚡"}
          </button>

        </form>

      </div>

    </main>
  );
};

export default Register;