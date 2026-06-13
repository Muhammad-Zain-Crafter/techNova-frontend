import React from "react";

const CartItem = ({ item, onIncrease, onDecrease }) => {
  return (
    <div className="flex items-center justify-between bg-[#081120] border border-[#182235] rounded-2xl p-5 hover:border-cyan-400 transition">
      
      {/* Left: Product Info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-[#0f172a] rounded-lg overflow-hidden">
          <img
            src={item.image || "https://via.placeholder.com/150"}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-white font-semibold">
            {item.name || `Product #${item.product_id}`}
          </h3>
          <p className="text-cyan-400 font-bold">
            Rs. {item.price || "0"}
          </p>
        </div>
      </div>

      {/* Right: Quantity Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => onDecrease(item.product_id)}
          className="px-3 py-1 rounded-md border border-red-500 text-red-400 hover:bg-red-500 hover:text-black"
        >
          -
        </button>

        <span className="w-8 text-center text-white">
          {item.quantity}
        </span>

        <button
          onClick={() => onIncrease(item.product_id)}
          className="px-3 py-1 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default CartItem;