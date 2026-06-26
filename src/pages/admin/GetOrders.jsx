import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/common/Loader";
import { toast } from "react-hot-toast";

const GetOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get(
        "/api/v1/productStore/orders/getAllOrders",
      );

      setOrders(response.data.data || []);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  const updateOrderStatus = async (orderId, status) => {
    try {
      const response = await API.put(
        `/api/v1/productStore/orders/update-order-status/${orderId}`,
        {
          status,
        },
      );

      toast.success(
        response.data.message || "Order status updated successfully",
      );

      fetchOrders();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Failed to update order status",
      );
    }
  };
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500";

      case "completed":
      case "delivered":
        return "bg-green-500/20 text-green-400 border border-green-500";

      case "cancelled":
      case "cancel":
        return "bg-red-500/20 text-red-400 border border-red-500";

      default:
        return "bg-gray-500/20 text-gray-300 border border-gray-500";
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + Number(order.total_price),
    0,
  );

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-[#030712] text-white py-12 px-6">
      {/* Glow */}
      <div className="absolute top-20 left-24 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl font-black">
            Customer <span className="text-cyan-400">Orders</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Manage and monitor all customer orders.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <div className="bg-[#081120] border border-[#182235] rounded-2xl p-6">
            <p className="text-gray-400">Total Orders</p>

            <h2 className="text-4xl font-black mt-2">{orders.length}</h2>
          </div>

          <div className="bg-[#081120] border border-[#182235] rounded-2xl p-6">
            <p className="text-gray-400">Total Revenue</p>

            <h2 className="text-4xl font-black mt-2 text-cyan-400">
              Rs. {totalRevenue.toLocaleString()}
            </h2>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#081120] border border-[#182235] rounded-3xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#0b1528]">
                <tr className="text-left">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">User ID</th>
                  <th className="px-6 py-4">Total Price</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Address</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t border-[#182235] hover:bg-[#0b1528] transition"
                  >
                    <td className="px-6 py-5 font-semibold">#{order.id}</td>

                    <td className="px-6 py-5">{order.user_id}</td>

                    <td className="px-6 py-5 text-cyan-400 font-semibold">
                      Rs. {Number(order.total_price).toLocaleString()}
                    </td>

                    <td className="px-6 py-5">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className={`px-3 py-2 rounded-lg bg-[#030712] border outline-none ${getStatusColor(
                          order.status,
                        )}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="px-6 py-5">{order.address_id ?? "N/A"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {orders.length === 0 && (
            <div className="text-center py-12 text-gray-400">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default GetOrders;
