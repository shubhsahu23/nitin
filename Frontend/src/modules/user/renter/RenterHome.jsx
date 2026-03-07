import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";
import PropTypes from "prop-types";
import AllPropertiesCards from "../AllPropertiesCards";
import AllProperty from "./AllProperties";

const CustomTabPanel = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} className="w-full mt-6">
      {value === index && <div>{children}</div>}
    </div>
  );
};

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const RenterHome = () => {
  const user = useContext(UserContext);
  const [value, setValue] = useState(0);

  if (!user || !user.userData) return null;

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {/* Navbar */}
      <nav className="shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">🏠</span>
          </div>
          <Link to="/" className="text-2xl font-bold text-gray-900">RentEase</Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-gray-100 px-4 py-2 rounded-full">
            <span className="text-blue-600">👋</span>
            <h5 className="font-medium text-gray-700">
              Hi, {user.userData.name}
            </h5>
          </div>
          <Link
            to="/"
            onClick={handleLogOut}
            className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
          >
            Log Out
          </Link>
        </div>
      </nav>

      {/* Tabs */}
      <div className="w-full max-w-5xl mx-auto mt-8 border border-gray-200 rounded-xl shadow-sm p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-6 py-3 text-sm font-medium transition-colors ${
              value === 0
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setValue(0)}
          >
            All Properties
          </button>
          <button
            className={`px-6 py-3 text-sm font-medium transition-colors ml-6 ${
              value === 1
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
            onClick={() => setValue(1)}
          >
            Booking History
          </button>
        </div>

        {/* Tab Panels */}
        <CustomTabPanel value={value} index={0}>
          <div className="mt-6">
            <AllPropertiesCards loggedIn={user.userLoggedIn} />
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div className="mt-6">
            <AllProperty />
          </div>
        </CustomTabPanel>
      </div>
    </div>
  );
};

export default RenterHome;
