import { useState } from "react";
import API from "../../api/axios";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";

const ChangePassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.currentPassword || !form.newPassword || !form.confirmPassword) {
      return toast.error("All fields are required");
    }

    if (form.newPassword.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      setSaving(true);

      const res = await API.put(
        "/api/v1/productStore/users/changePassword",
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }
      );

      toast.success(res.data.message);

      setSuccess(true);

      setForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      toast.error(
        err.response?.data?.error ||
          err.response?.data?.message ||
          "Failed to change password"
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#030712] text-white py-6 px-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-black mb-8">
          Change <span className="text-cyan-400">Password</span>
        </h1>

        <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8">
          <h2 className="text-2xl font-bold mb-8">
            Update Your Password
          </h2>

          {success ? (
            <div className="text-center py-8">
              <FaCheckCircle className="mx-auto text-6xl text-green-400 mb-5" />

              <h3 className="text-3xl font-bold mb-2">
                Password Updated Successfully
              </h3>

              <p className="text-gray-400 mb-8">
                Your password has been changed successfully.
              </p>

              <button
                onClick={() => setSuccess(false)}
                className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-cyan-300 transition"
              >
                Change Password Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Current Password */}
              <div>
                <label className="block mb-2 text-gray-400">
                  Current Password
                </label>

                <div className="relative">
                  <input
                    type={showCurrent ? "text" : "password"}
                    name="currentPassword"
                    value={form.currentPassword}
                    onChange={handleChange}
                    placeholder="Enter current password"
                    className="w-full bg-[#030712] border border-[#1d2a44] rounded-xl px-4 py-3 pr-12 outline-none focus:border-cyan-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowCurrent(!showCurrent)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                  >
                    {showCurrent ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-2 text-gray-400">
                  New Password
                </label>

                <div className="relative">
                  <input
                    type={showNew ? "text" : "password"}
                    name="newPassword"
                    value={form.newPassword}
                    onChange={handleChange}
                    placeholder="Enter new password"
                    className="w-full bg-[#030712] border border-[#1d2a44] rounded-xl px-4 py-3 pr-12 outline-none focus:border-cyan-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                  >
                    {showNew ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-gray-400">
                  Confirm New Password
                </label>

                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm new password"
                    className="w-full bg-[#030712] border border-[#1d2a44] rounded-xl px-4 py-3 pr-12 outline-none focus:border-cyan-400"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400"
                  >
                    {showConfirm ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-cyan-300 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {saving ? "Updating..." : "Change Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
};

export default ChangePassword;