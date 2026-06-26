import React, { useState } from "react";

import { toast } from "react-hot-toast";
import API from "../../api/axios";

const CreateProduct = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await API.post(
        "/api/v1/productStore/products/create-product",
        product
      );
      toast.success(response.data.message);
      setProduct({
        name: "",
        price: "",
        image: "",
        description: "",
        category: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="bg-[#030712] min-h-screen text-white">
      {/* Glow */}
      <div className="absolute top-32 left-24 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-32 right-24 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        {/* Heading */}
        <div className="mb-12">
          <h1 className="text-4xl font-black mb-3">
            Create <span className="text-cyan-400">Product</span>
          </h1>
          <p className="text-gray-400">
            Add new hardware products to your futuristic store.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-10">
          {/* FORM */}
          <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-gray-300">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={product.name}
                  onChange={handleChange}
                  placeholder="Sony WH-1000XM5"
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">Price</label>
                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="74999"
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">
                  Image URL
                </label>
                <input
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-gray-300">
                  Category
                </label>
                <select
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Headphones">Headphones</option>
                  <option value="Mouse">Mouse</option>
                  <option value="Keyboard">Keyboard</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Smart Watch">Smart Watch</option>
                  <option value="RAM">RAM</option>
                  <option value="SSD">SSD</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-gray-300">
                  Description
                </label>
                <textarea
                  rows={5}
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Enter product description..."
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400 resize-none"
                  required
                ></textarea>
              </div>
              <button
                disabled={loading}
                className="w-full py-4 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition duration-300"
              >
                {loading ? "Creating..." : "Create Product"}
              </button>
            </form>
          </div>

          {/* PREVIEW */}
          <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Live <span className="text-cyan-400">Preview</span>
            </h2>

            <div className="bg-[#030712] border border-[#182235] rounded-3xl overflow-hidden">
              {product.image && (
                <img
                  src={product.image}
                  alt=""
                  className="w-full h-72 object-cover"
                />
              )}

              <div className="p-6">
                <span className="text-cyan-400 text-sm uppercase">
                  {product.category || "Category"}
                </span>

                <h3 className="text-2xl font-bold mt-3 mb-3">
                  {product.name || "Product Name"}
                </h3>

                <p className="text-gray-400 mb-5 line-clamp-4">
                  {product.description || "Product description..."}
                </p>

                <div className="text-3xl font-black text-cyan-400">
                  Rs. {product.price || "0"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateProduct;