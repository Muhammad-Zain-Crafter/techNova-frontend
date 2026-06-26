import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import Loader from "../../components/common/Loader";
import { toast } from "react-hot-toast";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);

  const [address, setAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [addressRes, cartRes] = await Promise.all([
        API.get("/api/v1/productStore/addresses"),
        API.get("/api/v1/productStore/cart"),
      ]);

      setAddress(addressRes.data.data || null);
      setCartItems(cartRes.data.data || []);
    } catch (error) {
      toast.error("Failed to load order details");
    } finally {
      setLoading(false);
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );

  const placeOrder = async () => {
    try {
      if (!address) {
        return toast.error("Please add an address first.");
      }

      if (cartItems.length === 0) {
        return toast.error("Your cart is empty.");
      }

      setPlacing(true);

      const items = cartItems.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      }));
      console.log(items);
      console.log(address);
      const response = await API.post(
        "/api/v1/productStore/orders/create-order",
        {
          items,
          address_id: address.id,
        },
      );

      await API.delete("/api/v1/productStore/cart/clear");

      toast.success(response.data.message || "Order placed successfully");

      navigate("/orders");
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to place order",
      );
    } finally {
      setPlacing(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black mb-10">
          Review <span className="text-cyan-400">Order</span>
        </h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Shipping Address */}

          <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Shipping Address</h2>

            {address ? (
              <div className="space-y-3 text-gray-300">
                <p>
                  <span className="text-cyan-400">Name:</span>{" "}
                  {address.full_name}
                </p>

                <p>
                  <span className="text-cyan-400">Phone:</span> {address.phone}
                </p>

                <p>
                  <span className="text-cyan-400">Address:</span>{" "}
                  {address.address_line}
                </p>

                <p>
                  {address.city}, {address.state}
                </p>

                <p>{address.postal_code}</p>
              </div>
            ) : (
              <p className="text-red-400">
                No address found. Please add an address first.
              </p>
            )}
          </div>

          {/* Order Summary */}

          <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty.</p>
            ) : (
              <>
                <div className="space-y-5">
                  {cartItems.map((item) => (
                    <div
                      key={item.product_id}
                      className="flex items-center justify-between border-b border-[#182235] pb-4"
                    >
                      <div className="flex gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />

                        <div>
                          <h3 className="font-semibold">{item.name}</h3>

                          <p className="text-gray-400">Qty: {item.quantity}</p>
                        </div>
                      </div>

                      <div className="text-cyan-400 font-bold">
                        Rs. {Number(item.price) * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#182235] mt-8 pt-6">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>

                    <span className="text-cyan-400">
                      Rs. {total.toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={placeOrder}
                    disabled={placing || !address}
                    className="w-full mt-8 py-4 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition disabled:opacity-50"
                  >
                    {placing ? "Placing Order..." : "Place Order"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default PlaceOrder;
