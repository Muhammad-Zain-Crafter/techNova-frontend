import React from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

 const handleAddToCart = async (e) => {
  e.preventDefault();

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    await API.post(
      "/api/v1/productStore/cart/add",
      {
        product_id: product.product_id || product.id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Item added to cart 🛒");
  } catch (error) {
    console.log(error);
    toast.error("Failed to add to cart");
  }
};

  const handleProtectedAction = (e) => {
    if (!token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="w-full max-w-[320px] bg-[#081120] border border-[#182235] rounded-2xl overflow-hidden hover:border-cyan-400 transition duration-300 group mx-auto">
      {/* Image */}
      <div className="h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-white mb-2 line-clamp-1">
          {product.name}
        </h2>

        <p className="text-xl font-black text-cyan-400 mb-4">
          Rs. {product.price}
        </p>

        <div className="flex items-center gap-3">
          <Link
            to={`/products/${product.id}`}
            onClick={handleProtectedAction}
            className="flex-1 text-center py-2 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300 text-sm"
          >
            Details
          </Link>
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 rounded-lg bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition duration-300 text-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;