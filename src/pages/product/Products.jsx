import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import ProductCard from "../../components/product/ProductCard";
import { FiSearch } from "react-icons/fi";
import Loader from "../../components/common/Loader";

const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await API.get(
        "/api/v1/productStore/products/products"
      );
      setProducts(response.data.data);
    } catch (error) {
      console.log("Fetch products error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique categories (you can also store category in DB)
  const categories = ["All", ...new Set(products.map(p => p.category || "General"))];

  // Filter logic (search + category)
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      (product.category || "General") === selectedCategory;

    return matchSearch && matchCategory;
  });

  if (loading) {
    return (
      <Loader />
    );
  }

  return (
    <main className="bg-[#030712] min-h-screen text-white py-20">

      {/* Search Bar */}
      <div className="max-w-6xl mx-auto px-6 mb-2">
        <div className="relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-3 py-3 rounded-lg bg-[#0b1220] border border-[#1a2235] text-white outline-none focus:border-cyan-400 transition"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-6xl mx-auto px-6 mb-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border transition text-sm ${
              selectedCategory === cat
                ? "bg-cyan-400 text-black border-cyan-400"
                : "border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-400 col-span-full">
            No products found
          </p>
        )}
      </div>

    </main>
  );
};

export default Products;