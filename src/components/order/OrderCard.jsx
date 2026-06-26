import { toast } from "react-hot-toast";
import API from "../../api/axios";

const OrderCard = ({ order, fetchOrders }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500";

      case "processing":
        return "bg-blue-500/20 text-blue-400 border border-blue-500";

      case "shipped":
        return "bg-purple-500/20 text-purple-400 border border-purple-500";

      case "delivered":
        return "bg-green-500/20 text-green-400 border border-green-500";

      case "cancelled":
      case "cancel":
        return "bg-red-500/20 text-red-400 border border-red-500";

      default:
        return "bg-gray-500/20 text-gray-400 border border-gray-500";
    }
  };

  const cancelOrder = async () => {
    try {
      const response = await API.post(
        `/api/v1/productStore/orders/cancel-order/${order.id}`
      );

      toast.success(
        response.data.message || "Order cancelled successfully"
      );

      fetchOrders();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to cancel order"
      );
    }
  };

  return (
    <div className="bg-[#081120] border border-[#182235] rounded-3xl p-6 hover:border-cyan-400 transition">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          Order #{order.id}
        </h2>

        <span
          className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      <div className="space-y-3 text-gray-300">

        <p>
          <span className="text-gray-500">
            Total Price:
          </span>{" "}
          <span className="text-cyan-400 font-bold">
            Rs. {Number(order.total_price).toLocaleString()}
          </span>
        </p>

        <p>
          <span className="text-gray-500">
            Order ID:
          </span>{" "}
          #{order.id}
        </p>

      </div>

      {order.status === "pending" && (
        <button
          onClick={cancelOrder}
          className="mt-6 w-full py-3 rounded-xl bg-red-500 hover:bg-red-600 transition font-semibold"
        >
          Cancel Order
        </button>
      )}
    </div>
  );
};

export default OrderCard;