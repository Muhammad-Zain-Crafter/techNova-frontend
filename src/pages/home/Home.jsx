import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import ProductCard from "../../components/product/ProductCard";
import heroImg from "../../assets/hero-img.png";
import Loader from "../../components/common/Loader";
import {
  FaTruck,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    try {
      const response = await API.get("/api/v1/productStore/products/products");
      setProducts(response.data.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#030712] min-h-screen text-white overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left Content */}
            <div>
              <div className="flex justify-center md:justify-start mb-5">
                <div className="flex flex-wrap items-center px-4 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/10">
                  <span className="text-xs tracking-[3px] text-cyan-300 uppercase">
                    New Evolution 2.0
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl text-center md:text-left font-black leading-tight mb-6">
                Precision <span className="text-cyan-400">Hardware</span>
                <br />
                Engineered.
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10 text-center md:text-left">
                Shop the latest tech products with performance, innovation, and
                reliability designed for everyday creators and gamers.
              </p>
              <div className="flex flex-wrap items-center gap-5">
                <Link
                  to="/products"
                  className="w-full md:w-auto px-7 py-4 rounded-xl text-center bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition duration-300"
                >
                  Explore Products
                </Link>
                <Link
                  to="/support"
                  className="w-full md:w-auto px-7 py-4 rounded-xl border text-center border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300"
                >
                  Get Support
                </Link>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>
              <img
                src={heroImg}
                alt="Gaming Keyboard"
                className="relative z-10 w-full rounded-3xl border border-[#1a2238] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-14 border-t border-[#12192d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card */}
            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition duration-300">
              <FaTruck className="text-cyan-400 text-5xl mb-5" />
              <h3 className="text-2xl font-bold mb-3">Fast Delivery</h3>
              <p className="text-gray-400 leading-relaxed">
                Enjoy quick and reliable delivery with secure packaging and
                real-time order tracking for every purchase.
              </p>
            </div>
            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition duration-300">
              <FaShieldAlt className="text-cyan-400 text-5xl mb-5" />
              <h3 className="text-2xl font-bold mb-3">Secure Shopping</h3>
              <p className="text-gray-400 leading-relaxed">
                Shop with confidence through secure authentication and protected
                customer data for a safe online shopping experience.
              </p>
            </div>
            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition duration-300">
              <FaStar className="text-cyan-400 text-5xl mb-5" />
              <h3 className="text-2xl font-bold mb-3">Verified Reviews</h3>
              <p className="text-gray-400 leading-relaxed">
                Read authentic ratings and reviews from verified customers
                before making your purchase decision.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Products Section */}
      <section className="py-16 border-t border-[#12192d]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-black mb-2">
                Featured <span className="text-cyan-400">Hardware</span>
              </h2>
              <p className="text-gray-400 text-sm md:text-base">
                Explore premium futuristic products.
              </p>
            </div>
            <Link
              to="/products"
              className="hidden md:flex px-5 py-2.5 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300 text-sm"
            >
              View All
            </Link>
          </div>
          {/* Products Grid */}
          {loading ? (
            <Loader />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <div
                  key={product._id || product.id}
                  className="w-full max-w-[320px]"
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-center mt-8 md:hidden">
            <Link
              to="/products"
              className="px-6 py-2.5 rounded-lg border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300 text-sm"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
