import { useState } from "react";
import UpdateProfile from "./UpdateProfile";
import ChangePassword from "./ChnagePassword";


const GetProfile = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <main className="min-h-screen bg-[#030712] text-white py-6 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-black mb-8">
          My <span className="text-cyan-400">Profile</span>
        </h1>

        {/* Tabs */}

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "profile"
                ? "bg-cyan-400 text-black"
                : "bg-[#081120] border border-[#182235] text-gray-300 hover:border-cyan-400"
            }`}
          >
            Update Profile
          </button>

          <button
            onClick={() => setActiveTab("password")}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              activeTab === "password"
                ? "bg-cyan-400 text-black"
                : "bg-[#081120] border border-[#182235] text-gray-300 hover:border-cyan-400"
            }`}
          >
            Change Password
          </button>
        </div>

        {activeTab === "profile" ? (
          <UpdateProfile />
        ) : (
          <ChangePassword />
        )}
      </div>
    </main>
  );
};

export default GetProfile;