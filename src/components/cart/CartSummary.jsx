import React from "react";
import { useNavigate } from "react-router-dom";

const CartSummary = ({ items = [] }) => {
  const navigate = useNavigate();
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const totalPrice = items.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  return (
    <div className="bg-[#081120] border border-[#182235] rounded-2xl p-6 h-fit">
      
      <h2 className="text-xl font-bold mb-5 text-white">
        Order <span className="text-cyan-400">Summary</span>
      </h2>

      <div className="flex justify-between text-gray-400 mb-3">
        <span>Items</span>
        <span>{totalItems}</span>
      </div>

      <div className="flex justify-between text-gray-400 mb-3">
        <span>Subtotal</span>
        <span>Rs. {totalPrice}</span>
      </div>

      <div className="flex justify-between text-gray-400 mb-6">
        <span>Shipping</span>
        <span className="text-green-400">Free</span>
      </div>

      <div className="border-t border-[#182235] pt-4 flex justify-between font-bold">
        <span>Total</span>
        <span className="text-cyan-400">Rs. {totalPrice}</span>
      </div>

      <button onClick={() => navigate("/address")}
      className="w-full mt-6 bg-cyan-400 text-black py-3 rounded-xl font-semibold hover:bg-cyan-300 transition">
        Checkout
      </button>
    </div>
  );
};

export default CartSummary;