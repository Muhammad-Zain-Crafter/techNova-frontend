import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/common/Loader";
import { toast } from "react-hot-toast";
import OrderCard from "./OrderCard";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await API.get(
        "/api/v1/productStore/orders/getOrder"
      );

      setOrders(response.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-[#030712] text-white">

      {/* Glow */}
      <div className="absolute top-24 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        <div className="mb-10">
          <h1 className="text-4xl font-black">
            My <span className="text-cyan-400">Orders</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Track and manage your recent purchases.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[#081120] border border-[#182235] rounded-3xl p-16 text-center">

            <h2 className="text-3xl font-bold mb-4">
              No Orders Yet
            </h2>

            <p className="text-gray-400">
              You haven't placed any orders yet.
            </p>

          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                fetchOrders={fetchOrders}
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
};

export default OrderTable;