import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/common/Loader";
import { toast } from "react-hot-toast";

const MyOrders = () => {
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
        error.response?.data?.message ||
          "Failed to load orders"
      );
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500";
      case "processing":
        return "bg-blue-500/20 text-blue-400 border-blue-500";
      case "shipped":
        return "bg-purple-500/20 text-purple-400 border-purple-500";
      case "delivered":
        return "bg-green-500/20 text-green-400 border-green-500";
      case "cancelled":
        return "bg-red-500/20 text-red-400 border-red-500";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500";
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="absolute top-24 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-32 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-4xl font-black">
            My <span className="text-cyan-400">Orders</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Track all your purchases.
          </p>
        </div>
        {orders.length === 0 ? (
          <div className="bg-[#081120] border border-[#182235] rounded-3xl p-16 text-center">
            <h2 className="text-3xl font-bold mb-3">
              No Orders Found
            </h2>
            <p className="text-gray-400">
              Place your first order to see it here.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-[#081120] border border-[#182235] rounded-3xl p-8"
              >
                <div className="flex flex-wrap justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-2xl font-bold">
                      Order #{order.id}
                    </h2>
                    <p className="text-gray-400 mt-2">
                      Total:{" "}
                      <span className="text-cyan-400 font-bold">
                        Rs. {Number(order.total_price).toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <span
                    className={`px-5 py-2 rounded-full border capitalize font-semibold ${statusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">
                    Shipping Address
                  </h3>
                  <div className="text-gray-300 space-y-1">
                    <p>{order.full_name}</p>
                    <p>{order.phone}</p>
                    <p>{order.address_line}</p>
                    <p>{order.city}, {order.state}</p>
                    <p>{order.postal_code}</p>
                  </div>

                </div>
                <h3 className="text-xl font-bold mb-5">
                  Ordered Items
                </h3>

                <div className="space-y-5">

                  {order.items.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center justify-between border-b border-[#182235] pb-5"
                    >

                      <div className="flex gap-5">

                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-xl object-cover"
                        />

                        <div>

                          <h4 className="text-lg font-semibold">
                            {item.name}
                          </h4>

                          <p className="text-gray-400 mt-1">
                            Quantity: {item.quantity}
                          </p>

                          <p className="text-cyan-400 mt-2 font-bold">
                            Rs. {Number(item.price).toLocaleString()}
                          </p>

                        </div>

                      </div>

                      <div className="text-right">

                        <p className="text-gray-400">
                          Subtotal
                        </p>

                        <p className="text-2xl font-bold text-cyan-400">
                          Rs.{" "}
                          {(
                            Number(item.price) * item.quantity
                          ).toLocaleString()}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
};

export default MyOrders;