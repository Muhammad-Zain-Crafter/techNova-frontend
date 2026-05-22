import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../api/axios";

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
        }
      );

      setProduct(response.data.data); // ✅ IMPORTANT FIX
    } catch (error) {
      console.log("Product detail error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#030712] min-h-screen flex items-center justify-center text-cyan-400">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-[#030712] min-h-screen flex items-center justify-center text-red-400">
        Product not found
      </div>
    );
  }

return (
  <main className="bg-[#030712] min-h-screen text-white py-20">
    <div className="max-w-6xl mx-auto px-6">

      {/* Back Button */}
      <button
        onClick={() => navigate("/products")}
        className="mb-8 flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
      >
        ← Back to Products
      </button>

      <div className="grid md:grid-cols-2 gap-12">

        {/* Image */}
        <div className="rounded-2xl overflow-hidden border border-[#182235]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div>
          <h1 className="text-4xl font-black mb-4">
            {product.name}
          </h1>

          <p className="text-gray-400 mb-6">
            {product.description || "No description available"}
          </p>

          <div className="text-3xl font-bold text-cyan-400 mb-6">
            ${product.price}
          </div>

          <button className="px-6 py-3 bg-cyan-400 text-black font-bold rounded-lg hover:bg-cyan-300 transition">
            Add To Cart ⚡
          </button>
        </div>

      </div>
    </div>
  </main>
);
};

export default ProductDetails;