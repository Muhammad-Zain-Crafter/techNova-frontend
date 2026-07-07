import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/common/Loader";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/api/v1/productStore/users/getProfile");

      const user = res.data.data;

      setProfile(user);

      setForm({
        name: user.name || "",
        email: user.email || "",
      });
    } catch (err) {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await API.put(
        "/api/v1/productStore/users/updateDetails",
        form
      );

      toast.success("Profile updated successfully");

      fetchProfile();
    } catch (err) {
      toast.error("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Left Card */}

      <div className="bg-[#081120] border border-[#182235] rounded-3xl p-8">
        <div className="w-28 h-28 rounded-full bg-cyan-500 flex items-center justify-center text-4xl font-bold text-black mx-auto">
          {profile?.name?.charAt(0).toUpperCase()}
        </div>

        <h2 className="text-2xl font-bold text-center mt-5">
          {profile.name}
        </h2>

        <p className="text-gray-400 text-center mt-2">
          {profile.email}
        </p>

        <div className="mt-8 space-y-4">
          <div>
            <p className="text-gray-500 text-sm">Role</p>

            <span className="inline-block mt-1 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400">
              {profile.role}
            </span>
          </div>

          {profile.createdAt && (
            <div>
              <p className="text-gray-500 text-sm">Joined</p>

              <p className="text-gray-300">
                {new Date(profile.createdAt).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Right Card */}

      <div className="lg:col-span-2 bg-[#081120] border border-[#182235] rounded-3xl p-8">
        <h2 className="text-2xl font-bold mb-8">
          Update Information
        </h2>

        <form onSubmit={updateProfile} className="space-y-6">
          <div>
            <label className="block mb-2 text-gray-400">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-[#030712] border border-[#1d2a44] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-400">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full bg-[#030712] border border-[#1d2a44] rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              type="submit"
              disabled={saving}
              className="bg-cyan-400 text-black px-8 py-3 rounded-xl font-semibold hover:bg-cyan-300 transition disabled:opacity-60"
            >
              {saving ? "Updating..." : "Save Changes"}
            </button>

            {profile.role !== "admin" && (
              <button
                type="button"
                onClick={() => navigate("/orders")}
                className="bg-[#182235] text-cyan-400 px-8 py-3 rounded-xl font-semibold hover:bg-[#24314d] transition"
              >
                My Orders
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;