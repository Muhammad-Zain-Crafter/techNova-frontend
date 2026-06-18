import React from "react";

const CartItem = ({ item, onIncrease, onDecrease }) => {
  return (
    <div className="bg-[#081120] border border-[#182235] rounded-2xl p-4 sm:p-5 hover:border-cyan-400 transition">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        
        {/* Product Info */}
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#0f172a] rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={item.image || "https://via.placeholder.com/150"}
              alt={item.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm sm:text-base truncate">
              {item.name || `Product #${item.product_id}`}
            </h3>

            <p className="text-cyan-400 font-bold text-sm sm:text-base">
              Rs. {item.price || "0"}
            </p>
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-center sm:justify-end gap-3">
          <button
            onClick={() => onDecrease(item.product_id)}
            className="w-9 h-9 rounded-md border border-red-500 text-red-400 hover:bg-red-500 hover:text-black transition"
          >
            -
          </button>

          <span className="w-8 text-center text-white font-medium">
            {item.quantity}
          </span>

          <button
            onClick={() => onIncrease(item.product_id)}
            className="w-9 h-9 rounded-md border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;