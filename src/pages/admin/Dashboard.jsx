import React, { useEffect, useState } from "react";
import {
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiPlus,
  FiClipboard,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import socket from "../../socket";

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
  });

  useEffect(() => {
    fetchStats();

    socket.on("new_order", () => {
      fetchStats();
    });

    socket.on("user_registered", () => {
      fetchStats();
    });

    return () => {
      socket.off("new_order");
      socket.off("product_created");
      socket.off("user_registered");
    };
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/api/v1/productStore/users/getDashboardStats");

      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const statsData = [
    {
      title: "Total Orders",
      value: stats.orders,
      icon: <FiShoppingCart size={26} />,
    },
    {
      title: "Products",
      value: stats.products,
      icon: <FiPackage size={26} />,
    },
    {
      title: "Users",
      value: stats.users,
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

  return (
    <main className="bg-[#030712] min-h-screen text-white">
      {/* Glow */}
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
            Welcome Back <span className="text-cyan-400">Administrator</span>
          </h1>

          <p className="text-gray-400">
            Manage products, orders, and users from your dashboard.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
          {statsData.map((item, index) => (
            <div
              key={index}
              className="bg-[#081120] border border-[#182235] rounded-3xl p-6 hover:border-cyan-400 transition"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400">
                  {item.icon}
                </div>
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
                className="bg-[#081120] border border-[#182235] rounded-3xl p-6 hover:border-cyan-400 hover:-translate-y-1 transition"
              >
                <div className="w-14 h-14 rounded-2xl bg-cyan-400/10 flex items-center justify-center text-cyan-400 mb-5">
                  {action.icon}
                </div>

                <h3 className="text-xl font-bold mb-2">{action.title}</h3>

                <p className="text-gray-400 text-sm">
                  Manage your store efficiently.
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
