import React from "react";
import { Link } from "react-router-dom";
import { FiGithub, FiInstagram, FiTwitter, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-[#050816] border-t border-[#1a1f35] text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Top Section */}
        <div className="grid md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">
              <span className="text-white">Tech</span>
              <span className="text-cyan-400">Nova</span>
            </h2>
            <p className="text-sm mt-3 text-gray-400 leading-relaxed">
              Modern tech store delivering premium gadgets with a futuristic shopping experience.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-cyan-400 transition">Home</Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-cyan-400 transition">Products</Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-cyan-400 transition">Cart</Link>
              </li>
              <li>
                <Link to="/support" className="hover:text-cyan-400 transition">Support</Link>
              </li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>

            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-cyan-400 transition">
                <FiGithub />
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                <FiInstagram />
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                <FiTwitter />
              </a>
              <a href="mailto:support@technova.com" className="hover:text-cyan-400 transition">
                <FiMail />
              </a>
            </div>

            <p className="text-sm mt-4 text-gray-500">
              support@technova.com
            </p>
          </div>

        </div>

        {/* Bottom Bar
        <div className="mt-10 border-t border-[#1a1f35] pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

          <p>© {new Date().getFullYear()} TechNova. All rights reserved.</p>

          <p className="mt-2 md:mt-0">
            Built with React ⚡ Tailwind CSS
          </p>

        </div> */}

      </div>
    </footer>
  );
};

export default Footer;