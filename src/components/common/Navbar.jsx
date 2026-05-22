// Navbar.jsx

import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiUser,
  FiLogOut,
} from "react-icons/fi";

function Navbar() {

  const navigate = useNavigate();

  // Check token
  const token = localStorage.getItem("token");

  // Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-[#050816] border-b border-[#1a1f35] sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link
            to="/"
            className="text-3xl font-bold tracking-wide"
          >
            <span className="text-white">Tech</span>

            <span className="text-cyan-400">
              Nova
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8">

            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-sm transition duration-300 ${
                  isActive
                    ? "text-cyan-400 border-b border-cyan-400 pb-1"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/products"
              className="text-sm text-gray-300 hover:text-cyan-400 transition"
            >
              Products
            </NavLink>

            <NavLink
              to="/specs"
              className="text-sm text-gray-300 hover:text-cyan-400 transition"
            >
              Specs
            </NavLink>

            <NavLink
              to="/support"
              className="text-sm text-gray-300 hover:text-cyan-400 transition"
            >
              Support
            </NavLink>

          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-5">

            {/* Cart */}
            <Link
              to="/cart"
              className="text-white hover:text-cyan-400 transition text-xl"
            >
              <FiShoppingCart />
            </Link>

            {/* If Logged In Show Logout */}
            {token ? (

              <button
                onClick={handleLogout}
                className="text-white hover:text-red-400 transition text-xl"
              >
                <FiLogOut />
              </button>

            ) : (

              /* If Not Logged In Show User Icon */
              <Link
                to="/login"
                className="text-white hover:text-cyan-400 transition text-xl"
              >
                <FiUser />
              </Link>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;