// src/pages/admin/Dashboard.jsx

import React from "react";
import {
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiDollarSign,
  FiPlus,
  FiClipboard,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const stats = [
  {
    title: "Total Orders",
    value: "245",
    icon: <FiShoppingCart size={26} />,
  },
  {
    title: "Products",
    value: "58",
    icon: <FiPackage size={26} />,
  },
  {
    title: "Users",
    value: "120",
    icon: <FiUsers size={26} />,
  },
];

const quickActions = [
  {
    title: "Create Product",
    path: "/admin/create-product",
    icon: <FiPlus size={22} />,
  },
  {
    title: "Manage Orders",
    path: "/admin/orders",
    icon: <FiClipboard size={22} />,
  },
  {
    title: "Manage Products",
    path: "/admin/products",
    icon: <FiPackage size={22} />,
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <FiUsers size={22} />,
  },
];

const Dashboard = () => {
  return (
    <main className="bg-[#030712] min-h-screen text-white">
      {/* Background Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        {/* Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center px-4 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/10 mb-5">
            <span className="text-xs tracking-[3px] text-cyan-300 uppercase">
              Admin Panel
            </span>
          </div>

          <h1 className="text-4xl font-black mb-3">
            Welcome Back,{" "}
            <span className="text-cyan-400">Administrator</span>
          </h1>

          <p className="text-gray-400">
            Manage products, orders, and users from your futuristic dashboard.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-[#081120] border border-[#182235] rounded-3xl p-6 hover:border-cyan-400 transition duration-300"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                  {item.icon}
                </div>

                <span className="text-xs text-gray-500">Overview</span>
              </div>

              <h2 className="text-3xl font-black mb-2">{item.value}</h2>

              <p className="text-gray-400">{item.title}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-3xl font-black mb-8">
            Quick <span className="text-cyan-400">Actions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="bg-[#081120] border border-[#182235] rounded-3xl p-6 hover:border-cyan-400 hover:-translate-y-1 transition duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-5">
                  {action.icon}
                </div>

                <h3 className="text-xl font-bold mb-2">{action.title}</h3>

                <p className="text-gray-400 text-sm">
                  Manage and control your store efficiently.
                </p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-black">
              Recent <span className="text-cyan-400">Activity</span>
            </h2>

            <button className="px-5 py-2 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300">
              View All
            </button>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between border-b border-[#182235] pb-4">
              <div>
                <h3 className="font-semibold">New Product Added</h3>
                <p className="text-sm text-gray-400">
                  RTX Gaming Keyboard was added successfully.
                </p>
              </div>

              <span className="text-cyan-400 text-sm">2 min ago</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#182235] pb-4">
              <div>
                <h3 className="font-semibold">Order Status Updated</h3>
                <p className="text-sm text-gray-400">
                  Order #204 moved to shipped.
                </p>
              </div>

              <span className="text-cyan-400 text-sm">15 min ago</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">New User Registered</h3>
                <p className="text-sm text-gray-400">
                  A new customer joined your platform.
                </p>
              </div>

              <span className="text-cyan-400 text-sm">1 hour ago</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;