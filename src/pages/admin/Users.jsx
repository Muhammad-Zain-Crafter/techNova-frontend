import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loader from "../../components/common/Loader";
import { toast } from "react-hot-toast";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await API.get(
        "/api/v1/productStore/users/getAllUsers"
      );

      setUsers(response.data.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch users"
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <main className="min-h-screen bg-[#030712] text-white">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-16">

        {/* Header */}

        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-black">
              Manage <span className="text-cyan-400">Users</span>
            </h1>

            <p className="text-gray-400 mt-2">
              Total Registered Users:{" "}
              <span className="text-cyan-400 font-semibold">
                {users.length}
              </span>
            </p>
          </div>
        </div>

        {/* Table */}

        <div className="overflow-x-auto rounded-3xl border border-[#182235] bg-[#081120]">

          <table className="w-full">

            <thead className="bg-[#111c2f]">
              <tr>
                <th className="text-left px-6 py-4">#</th>
                <th className="text-left px-6 py-4">Avatar</th>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Email</th>
                <th className="text-left px-6 py-4">Role</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr
                  key={user.userid}
                  className="border-t border-[#182235] hover:bg-[#111c2f] transition"
                >
                  <td className="px-6 py-5 text-gray-400">
                    {index + 1}
                  </td>

                  <td className="px-6 py-5">
                    <div className="w-11 h-11 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {user.name}
                  </td>

                  <td className="px-6 py-5 text-gray-400">
                    {user.email}
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        user.role === "admin"
                          ? "bg-red-500/20 text-red-400 border border-red-500"
                          : "bg-cyan-500/20 text-cyan-400 border border-cyan-500"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                </tr>
              ))}

              {users.length === 0 && (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-16 text-gray-400"
                  >
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};

export default Users;