import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import AllUsers from "./AllUsers";
import AllProperty from "./AllProperty";
import AllBookings from "./AllBookings";

const AdminHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

if (!user || !user.userData) return null;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-primary)' }}>
  {/* Navbar */}
  <nav className="shadow-sm border-b border-gray-200 py-4 px-8 flex justify-between items-center" style={{ backgroundColor: 'var(--bg-secondary)' }}>
    <div className="flex items-center space-x-2">
      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">🏠</span>
      </div>
      <h2 className="text-2xl font-bold text-gray-900">RentEase</h2>
    </div>
    <div className="flex items-center space-x-6">
      <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
        <span className="text-blue-600">👋</span>
        <span className="text-gray-700">Hi, {user.userData.name}</span>
      </div>
      <button
        onClick={handleLogOut}
        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
      >
        Log Out
      </button>
    </div>
  </nav>

  {/* Admin Tabs */}
  <div className="max-w-6xl mx-auto w-full py-8 px-4">
    {/* Tabs */}
    <div className="border border-gray-200 rounded-xl shadow-sm p-6 mb-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="flex space-x-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-3 px-4 text-lg font-medium transition-colors ${
            activeTab === "users"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          All Users
        </button>
        <button
          onClick={() => setActiveTab("properties")}
          className={`pb-3 px-4 text-lg font-medium transition-colors ${
            activeTab === "properties"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          All Properties
        </button>
        <button
          onClick={() => setActiveTab("bookings")}
          className={`pb-3 px-4 text-lg font-medium transition-colors ${
            activeTab === "bookings"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600 hover:text-blue-600"
          }`}
        >
          All Bookings
        </button>
      </div>
    </div>

    {/* Tab Panels */}
    <div className="border border-gray-200 rounded-xl shadow-sm p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {activeTab === "users" && <AllUsers />}
      {activeTab === "properties" && <AllProperty />}
      {activeTab === "bookings" && <AllBookings />}
    </div>
  </div>
</div>

  );
};

export default AdminHome;
