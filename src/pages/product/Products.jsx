import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import ProductCard from "../../components/product/ProductCard";


const Products = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [products, setProducts] = useState([]);
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

  if (loading) {
    return (
      <div className="bg-[#030712] min-h-screen flex items-center justify-center text-cyan-400">
        Loading...
      </div>
    );
  }

  return (
    <main className="bg-[#030712] min-h-screen text-white py-20">
      <div className="max-w-6xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 gap-10">

        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

      </div>
    </main>
  );
};

export default Products;