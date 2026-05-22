// components/ProductList.jsx

import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import ProductCard from "./ProductCard";

const ProductList = () => {

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await API.get(
        "/api/v1/productStore/products/products"
      );

      setProducts(response.data.data || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {

    return (
      <div className="text-center text-cyan-400 text-xl">
        Loading Products...
      </div>
    );

  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

      {products.map((product) => (

        <ProductCard
          key={product.id}
          product={product}
        />

      ))}

    </div>
  );
};

export default ProductList;