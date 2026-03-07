import axios from "axios";
import React, { useState, useEffect } from "react";
import Toast from "../common/Toast";
import { apiUrl, assetUrl } from "../../config/api";


const AllPropertiesCards = ({ loggedIn }) => {
  const [allProperties, setAllProperties] = useState([]);
  const [filterPropertyType, setPropertyType] = useState("");
  const [filterPropertyAdType, setPropertyAdType] = useState("");
  const [filterPropertyAddress, setPropertyAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [userDetails, setUserDetails] = useState({ fullName: "", phone: "" });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
  };

  const getAllProperties = async () => {
    try {
      const res = await axios.get(
        apiUrl("/api/user/getAllProperties"),
        { withCredentials: true }
      );
      setAllProperties(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBooking = async (status, propertyId, ownerId) => {
    try {
      const res = await axios.post(
        apiUrl(`/api/user/bookinghandle/${propertyId}`),
        { userDetails, status, ownerId },
        { withCredentials: true }
      );

      if (res.data.success) {
        showToast("success", res.data.message);
        setShowModal(false);
      } else {
        showToast("error", res.data.message);
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Booking failed");
    }
  };

  useEffect(() => {
    getAllProperties();
  }, []);

  const filteredProperties = allProperties
    .filter(
      (property) =>
        filterPropertyAddress === "" ||
        property.propertyAddress
          .toLowerCase()
          .includes(filterPropertyAddress.toLowerCase())
    )
    .filter(
      (property) =>
        filterPropertyAdType === "" ||
        property.propertyAdType
          .toLowerCase()
          .includes(filterPropertyAdType.toLowerCase())
    )
    .filter(
      (property) =>
        filterPropertyType === "" ||
        property.propertyType
          .toLowerCase()
          .includes(filterPropertyType.toLowerCase())
    );

  const openModal = (property) => {
    setSelectedProperty(property);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen py-8" style={{ backgroundColor: 'var(--bg-primary)' }}>
      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-8 mb-8">
        <div className="border border-gray-200 rounded-xl shadow-sm p-6" style={{ backgroundColor: 'var(--bg-secondary)' }}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter Properties</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-gray-700 font-medium text-sm">Search by Address</label>
              <input
                type="text"
                placeholder="Enter location..."
                value={filterPropertyAddress}
                onChange={(e) => setPropertyAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium text-sm">Ad Type</label>
              <select
                value={filterPropertyAdType}
                onChange={(e) => setPropertyAdType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">All Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-gray-700 font-medium text-sm">Property Type</label>
              <select
                value={filterPropertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">All Categories</option>
                <option value="commercial">Commercial</option>
                <option value="land/plot">Land/Plot</option>
                <option value="residential">Residential</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Property Cards */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <div
                key={property._id}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                <div className="relative">
                  <img
                    src={assetUrl(property.propertyImage[0]?.path)}
                    alt="Property"
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {property.propertyAdType === 'rent' ? 'For Rent' : 'For Sale'}
                  </div>
                  <div className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-sm font-medium ${
                    property.isAvailable === "Available"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {property.isAvailable}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2 line-clamp-2">{property.propertyAddress}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-700 rounded-full">
                      {property.propertyType}
                    </span>
                  </div>
                  {loggedIn && (
                    <div className="space-y-2 mb-4">
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium text-gray-900">Owner:</span> {property.ownerContact}
                      </p>
                      <p className="text-gray-600 text-sm">
                        <span className="font-medium text-gray-900">Price:</span> ₹{property.propertyAmt}
                      </p>
                    </div>
                  )}
                  {property.isAvailable === "Available" ? (
                    loggedIn ? (
                      <button
                        onClick={() => openModal(property)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        View Details & Book
                      </button>
                    ) : (
                      <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-blue-700 text-sm font-medium">
                          Login to view details and book
                        </p>
                      </div>
                    )
                  ) : (
                    <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-red-700 text-sm font-medium">Not Available</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🏠</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600">Try adjusting your filters or check back later for new listings.</p>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showModal && selectedProperty && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="border border-gray-200 rounded-xl w-full max-w-2xl relative shadow-xl" style={{ backgroundColor: 'var(--bg-secondary)' }}>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
            >
              ✕
            </button>
            <div className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-900">Property Details</h3>
              <img
                src={assetUrl(selectedProperty.propertyImage[0]?.path)}
                alt="Property"
                className="w-full h-56 object-cover rounded-xl mb-6"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600 mb-6">
                <div className="space-y-3">
                  <p className="flex items-center gap-2">
                    <span className="text-blue-600">👤</span>
                    <span className="font-semibold text-gray-900">Owner Contact:</span> {selectedProperty.ownerContact}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-600">📍</span>
                    <span className="font-semibold text-gray-900">Location:</span> {selectedProperty.propertyAddress}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-600">🏷️</span>
                    <span className="font-semibold text-gray-900">Type:</span> {selectedProperty.propertyType}
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="flex items-center gap-2">
                    <span className="text-blue-600">💰</span>
                    <span className="font-semibold text-gray-900">Price:</span> ₹{selectedProperty.propertyAmt}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-blue-600">📋</span>
                    <span className="font-semibold text-gray-900">Ad Type:</span> {selectedProperty.propertyAdType}
                  </p>
                  <p className="flex items-center gap-2">
                    <span className={`font-semibold ${selectedProperty.isAvailable === "Available" ? "text-green-600" : "text-red-600"}`}>
                      {selectedProperty.isAvailable === "Available" ? "✅" : "❌"} {selectedProperty.isAvailable}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                <p className="text-gray-700">
                  <span className="font-semibold text-gray-900">Additional Info:</span> {selectedProperty.additionalInfo}
                </p>
              </div>

              {/* Booking Form */}
              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleBooking("pending", selectedProperty._id, selectedProperty.ownerId);
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors"
                      value={userDetails.fullName}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, fullName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-700 font-medium">Phone Number</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter your phone number"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 transition-colors"
                      value={userDetails.phone}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, phone: e.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Book Property Now
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllPropertiesCards;
