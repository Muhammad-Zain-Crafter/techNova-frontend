import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-toastify";
import Loader from "../common/Loader";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await API.get(
        `/api/v1/productStore/products/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProduct(response.data.data);
    } catch (error) {
      console.log("Product detail error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <div className="bg-[#030712] min-h-screen flex items-center justify-center text-red-400">
        Product not found
      </div>
    );
  }
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
        },
      );

      toast.success("Item added to cart 🛒");
    } catch (error) {
      console.log(error);
      toast.error("Failed to add to cart");
    }
  };

  return (
    <main className="bg-[#030712] min-h-screen text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/products")}
          className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
        >
          ← Back to Products
        </button>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden border border-[#182235] h-[350px] w-[370px] mx-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div>
            <h1 className="text-4xl font-black mb-4">{product.name}</h1>

            <p className="text-gray-400 mb-6">
              {product.description || "No description available"}
            </p>

            <div className="text-3xl font-bold text-cyan-400 mb-6">
              Rs. {product.price}
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 py-3 px-3 font-bold rounded-lg bg-cyan-400 text-black hover:bg-cyan-300 transition duration-300 text-sm"
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;
