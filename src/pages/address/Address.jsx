import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";
import { toast } from "react-hot-toast";

const Address = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [address, setAddress] = useState({
    full_name: "",
    phone: "",
    address_line: "",
    city: "",
    state: "",
    postal_code: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post(
        "/api/v1/productStore/addresses",
        address,
      );

      toast.success(response.data.message || "Address saved successfully");

      // Next step: Place Order page
      navigate("/place-order");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save address");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Glow Effects */}
      <div className="absolute top-24 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <h1 className="text-4xl font-black">
            Shipping <span className="text-cyan-400">Address</span>
          </h1>

          <p className="text-gray-400 mt-2">
            Enter your delivery details before placing your order.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}

          <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 text-gray-300">Full Name</label>

                <input
                  type="text"
                  name="full_name"
                  value={address.full_name}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Phone Number</label>

                <input
                  type="text"
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Address</label>

                <textarea
                  rows="3"
                  name="address_line"
                  value={address.address_line}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 resize-none outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-gray-300">City</label>

                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-gray-300">State</label>

                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleChange}
                    required
                    className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-gray-300">Postal Code</label>

                <input
                  type="text"
                  name="postal_code"
                  value={address.postal_code}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#030712] border border-[#182235] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
                />
              </div>
              <button
                disabled={loading}
                className="w-full py-4 rounded-xl bg-cyan-400 text-black font-bold hover:bg-cyan-300 transition disabled:opacity-60"
              >
                {loading ? "Saving..." : "Save Address"}
              </button>
            </form>
          </div>

          <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8 h-fit">
            <h2 className="text-2xl font-bold mb-6">
              Delivery <span className="text-cyan-400">Information</span>
            </h2>

            <div className="space-y-5 text-gray-300">
              <div>
                <h3 className="text-cyan-400 font-semibold mb-1">
                  Fast Delivery
                </h3>

                <p>Orders are usually delivered within 2–5 business days.</p>
              </div>

              <div>
                <h3 className="text-cyan-400 font-semibold mb-1">
                  Secure Shipping
                </h3>

                <p>Your products are packed securely to avoid any damage.</p>
              </div>

              <div>
                <h3 className="text-cyan-400 font-semibold mb-1">
                  Free Shipping
                </h3>

                <p>All orders on TechNova include free nationwide delivery.</p>
              </div>

              <hr className="border-[#182235]" />

              <div>
                <h3 className="text-2xl font-bold mb-5">
                  Payment <span className="text-cyan-400">Method</span>
                </h3>

                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 rounded-xl border border-cyan-500 bg-cyan-500/10 cursor-pointer">
                    <input type="radio" checked readOnly />
                    <span>Cash on Delivery</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-[#182235] opacity-60 cursor-not-allowed">
                    <input type="radio" disabled />
                    <span>Credit / Debit Card (Coming Soon)</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-[#182235] opacity-60 cursor-not-allowed">
                    <input type="radio" disabled />
                    <span>Easypaisa (Coming Soon)</span>
                  </label>

                  <label className="flex items-center gap-3 p-4 rounded-xl border border-[#182235] opacity-60 cursor-not-allowed">
                    <input type="radio" disabled />
                    <span>JazzCash (Coming Soon)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Address;
