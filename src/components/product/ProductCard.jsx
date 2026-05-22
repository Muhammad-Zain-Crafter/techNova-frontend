// components/ProductCard.jsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleProtectedAction = (e) => {

    if (!token) {

      e.preventDefault();

      navigate("/login");

    }

  };

  return (
    <div className="bg-[#081120] border border-[#182235] rounded-2xl overflow-hidden hover:border-cyan-400 transition duration-300 group">

      {/* Product Image */}
      <div className="h-60 overflow-hidden">

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

      </div>

      {/* Content */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-white mb-2">
          {product.name}
        </h2>

        <p className="text-3xl font-black text-cyan-400 mb-5">
          ${product.price}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3">

          {/* View Details */}
          <Link
            to={`/products/${product.id}`}
            onClick={handleProtectedAction}
            className="flex-1 text-center py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300"
          >
            Details
          </Link>

          {/* Add To Cart */}
          <button
            onClick={handleProtectedAction}
            className="flex-1 py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition duration-300"
          >
            Add
          </button>

        </div>

      </div>

    </div>
  );
};

export default ProductCard;