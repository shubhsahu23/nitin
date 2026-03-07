import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import AddProperty from "./AddProperty";
import AllProperties from "./AllProperties";
import AllBookings from "./AllBookings";

const tabs = [
  { name: "Add Property", component: <AddProperty /> },
  { name: "All Properties", component: <AllProperties /> },
  { name: "All Bookings", component: <AllBookings /> },
];

const OwnerHome = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    document.cookie =
      "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Navbar */}
      <nav className="shadow-sm border-b border-gray-200" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">🏠</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900">RentEase</h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
              <span className="text-blue-600">👋</span>
              <h5 className="font-medium text-gray-700">
                Welcome, {user.userData.name}
              </h5>
            </div>
            <button
              onClick={handleLogOut}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
            >
              Log Out
            </button>
          </div>
        </div>
      </nav>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="border border-gray-200 rounded-xl shadow-sm p-2 mb-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-6 py-3 font-semibold text-sm transition-colors rounded-lg mr-2 ${
                activeTab === index
                  ? "bg-blue-600 text-white shadow-sm"
                  : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="border border-gray-200 rounded-xl shadow-sm p-8" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          {tabs[activeTab].component}
        </div>
      </div>
    </div>

  );
};

export default OwnerHome;
