import React, { useEffect, useState } from "react";
import API from "../../api/axios";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const fetchCart = async () => {
    const res = await API.get("/api/v1/productStore/cart");
    setCartItems(res.data.data || []);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const clearCart = async () => {
    try {
      await API.delete("/api/v1/productStore/cart/clear");

      setCartItems([]); // instantly empty UI
    } catch (error) {
      console.log(error);
      alert("Failed to clear cart");
    }
  };

  const increase = async (id) => {
    await API.post("/api/v1/productStore/cart/add", {
      product_id: id,
      quantity: 1,
    });
    fetchCart();
  };

  const decrease = async (id) => {
    await API.post("/api/v1/productStore/cart/decrease", {
      product_id: id,
      quantity: 1,
    });
    fetchCart();
  };

  return (
    <div className="bg-[#030712] min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3 flex justify-end">
          <button onClick={clearCart} className="bg-red-500 md:px-4 md:py-2 px-3 py-1 rounded">
            Clear Cart
          </button>
        </div>
        {/* ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-xl font-semibold">Your cart is empty</p>
              <p className="text-sm mt-2">
                Add some products to continue shopping
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onIncrease={increase}
                onDecrease={decrease}
              />
            ))
          )}
        </div>

        {/* SUMMARY */}
        <CartSummary items={cartItems} />
      </div>
    </div>
  );
};

export default Cart;
