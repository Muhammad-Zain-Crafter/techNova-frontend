import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => {
    setMenuOpen(false);
  };
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
    setMenuOpen(false);

    window.location.reload();
  };
  return (
    <header className="bg-[#050816] border-b border-[#1a1f35] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold tracking-wide">
            <span className="text-white">Tech</span>

            <span className="text-cyan-400">Nova</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {!isAdmin && (
              <>
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
                  className={({ isActive }) =>
                    `text-sm transition duration-300 ${
                      isActive
                        ? "text-cyan-400 border-b border-cyan-400 pb-1"
                        : "text-gray-300 hover:text-cyan-400"
                    }`
                  }
                >
                  Products
                </NavLink>

                <NavLink
                  to="/support"
                  className={({ isActive }) =>
                    `text-sm transition duration-300 ${
                      isActive
                        ? "text-cyan-400 border-b border-cyan-400 pb-1"
                        : "text-gray-300 hover:text-cyan-400"
                    }`
                  }
                >
                  Support
                </NavLink>
              </>
            )}

            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-sm transition duration-300 ${
                  isActive
                    ? "text-cyan-400 border-b border-cyan-400 pb-1"
                    : "text-gray-300 hover:text-cyan-400"
                }`
              }
            >
              Profile
            </NavLink>

            {isAdmin && (
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `text-sm transition duration-300 ${
                    isActive
                      ? "text-cyan-400 border-b border-cyan-400 pb-1"
                      : "text-gray-300 hover:text-cyan-400"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}
          </nav>
          {/* Right Side */}
          <div className="flex items-center gap-5">
            {/* Cart */}
            <Link
              to="/cart"
              className="text-white hover:text-cyan-400 transition text-2xl"
            >
              <FiShoppingCart />
            </Link>
            {/* Desktop Login / Logout */}
            <div className="hidden md:flex">
              {token ? (
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-red-400 transition text-2xl"
                >
                  <FiLogOut />
                </button>
              ) : (
                <Link
                  to="/login"
                  className="text-white hover:text-cyan-400 transition text-2xl"
                >
                  <FiUser />
                </Link>
              )}
            </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white text-3xl"
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-[600px]" : "max-h-0"
        }`}
      >
        <div className="bg-[#0b1020] border-t border-[#1a1f35] px-6 py-5 flex flex-col gap-5">
          {!isAdmin && (
            <>
              <NavLink
                to="/"
                onClick={closeMenu}
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={closeMenu}
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Products
              </NavLink>

              <NavLink
                to="/support"
                onClick={closeMenu}
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Support
              </NavLink>
            </>
          )}

          <NavLink
            to="/profile"
            onClick={closeMenu}
            className="text-gray-300 hover:text-cyan-400 transition"
          >
            Profile
          </NavLink>

          {isAdmin && (
            <>
              <NavLink
                to="/admin/dashboard"
                onClick={closeMenu}
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/admin/create-product"
                onClick={closeMenu}
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Create Product
              </NavLink>

              <NavLink
                to="/admin/products"
                onClick={closeMenu}
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Manage Products
              </NavLink>

              <NavLink
                to="/admin/orders"
                onClick={closeMenu}
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Manage Orders
              </NavLink>

              <NavLink
                to="/admin/users"
                onClick={closeMenu}
                className="text-gray-300 hover:text-cyan-400 transition"
              >
                Users
              </NavLink>
            </>
          )}

          {token ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition"
            >
              <FiLogOut />
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
            >
              <FiUser />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
