// src/pages/Home.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../../api/axios";
import ProductCard from "../../components/product/ProductCard";
import heroImg from "../../assets/hero-img.png";
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
        {/* Glow Effects */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>
        <div className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* LEFT CONTENT */}
            <div>
              <div className="inline-block mb-5 px-4 py-1 rounded-full border border-cyan-400/40 bg-cyan-500/10">
                <span className="text-xs tracking-[3px] text-cyan-300 uppercase">
                  New Evolution 2.0
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl text-center md:text-left font-black leading-tight mb-6">
                Precision <span className="text-cyan-400">Hardware</span>
                <br />
                Engineered.
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
                Shop the latest tech products with performance, innovation, and
                reliability designed for everyday creators and gamers.
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-5">
                <Link
                  to="/products"
                  className="px-7 py-4 rounded-xl bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition duration-300"
                >
                  Explore Specs
                </Link>

                <button className="px-7 py-4 rounded-xl border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition duration-300">
                  Watch Reveal
                </button>
              </div>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full"></div>

              <img
                src={heroImg}
                s
                alt="Gaming Keyboard"
                className="relative z-10 w-full rounded-3xl border border-[#1a2238] shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="py-20 border-t border-[#12192d]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card */}
            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition duration-300">
              <div className="text-cyan-400 text-4xl mb-5">⚡</div>

              <h3 className="text-2xl font-bold mb-3">Quantum Latency</h3>

              <p className="text-gray-400 leading-relaxed">
                Measured at sub-millisecond response times across our entire
                ecosystem.
              </p>
            </div>

            {/* Feature Card */}
            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition duration-300">
              <div className="text-cyan-400 text-4xl mb-5">🛡️</div>

              <h3 className="text-2xl font-bold mb-3">Encrypted Core</h3>

              <p className="text-gray-400 leading-relaxed">
                Military-grade hardware encryption for advanced device
                protection.
              </p>
            </div>

            {/* Feature Card */}
            <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 hover:border-cyan-400 transition duration-300">
              <div className="text-cyan-400 text-4xl mb-5">♾️</div>

              <h3 className="text-2xl font-bold mb-3">Lifetime Warranty</h3>

              <p className="text-gray-400 leading-relaxed">
                Premium support and hardware reliability built for long-term
                performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="py-16 border-t border-[#12192d]">
        <div className="max-w-5xl mx-auto px-6">
          {/* Heading */}
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
            <div className="text-center text-cyan-400 text-lg">
              Loading Products...
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center">
              {products.slice(0, 6).map((product) => (
                <div className="w-full max-w-[320px]">
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>
          )}

          {/* Mobile Button */}
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
