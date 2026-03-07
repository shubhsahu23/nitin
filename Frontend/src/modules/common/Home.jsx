import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import p1 from "../../images/p1.jpg";
import p2 from "../../images/p2.jpg";
import p3 from "../../images/p3.jpg";
import p4 from "../../images/p4.jpg";
import AllPropertiesCards from "../user/AllPropertiesCards";

const images = [p1, p2, p3, p4];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-sm shadow-sm border-b" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-light)' }}>
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent-primary)' }}>
              <span className="text-white font-bold text-lg">🏠</span>
            </div>
            <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>RentEase</h2>
          </div>
          <div className="flex items-center space-x-8">
            <Link to="/" className="transition-colors font-medium hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>
              Home
            </Link>
            <Link to="/login" className="transition-colors font-medium hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-2 rounded-lg font-medium shadow-sm transition-colors hover:opacity-90"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-[60vh] mt-16 overflow-hidden bg-gray-50">
        {images.map((img, idx) => (
          <div
            key={idx}
            className={`absolute w-full h-full transition-opacity duration-1000 ${currentIndex === idx ? "opacity-100" : "opacity-0"}`}
          >
            <img src={img} alt={`Property ${idx + 1}`} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/20"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-8 w-full">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
                Find Your Perfect Home
              </h1>
              <p className="text-xl mb-8 leading-relaxed text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
                Discover quality rental properties that match your lifestyle and budget
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="px-8 py-3 rounded-lg font-semibold shadow-lg transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}
                >
                  Browse Properties
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-3 rounded-lg font-semibold shadow-lg transition-all hover:scale-105"
                  style={{ backgroundColor: 'var(--accent-secondary)', color: 'white' }}
                >
                  List Your Property
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? "scale-125"
                  : "hover:bg-gray-200"
              }`}
              style={{ backgroundColor: currentIndex === idx ? 'var(--bg-secondary)' : 'var(--bg-tertiary)' }}
            ></button>
          ))}
        </div>
      </div>

      {/* Properties Section */}
      <div className="max-w-7xl mx-auto py-16 px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Featured Properties
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Explore our curated selection of premium rental properties
          </p>
        </div>

        <AllPropertiesCards />
      </div>

      {/* Features Section */}
      <div className="py-16" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              Why Choose RentEase?
            </h2>
            <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
              We make finding and renting properties simple and trustworthy
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6" style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent-primary)' }}>
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Quality Properties</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Carefully vetted properties that meet our high standards</p>
            </div>

            <div className="text-center p-6" style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent-success)' }}>
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Secure & Safe</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Verified owners and secure booking process</p>
            </div>

            <div className="text-center p-6" style={{ backgroundColor: 'var(--bg-tertiary)', borderRadius: '0.5rem' }}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--accent-warm)' }}>
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>Easy Process</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Simple booking and management from start to finish</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--accent-primary)' }}>
                  <span className="text-white font-bold">🏠</span>
                </div>
                <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>RentEase</h3>
              </div>
              <p style={{ color: 'var(--text-muted)' }}>
                Making property rental simple, secure, and reliable.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>For Renters</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="transition-colors hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>Browse Properties</Link></li>
                <li><Link to="/register" className="transition-colors hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>Create Account</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>For Owners</h4>
              <ul className="space-y-2">
                <li><Link to="/register" className="transition-colors hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>List Property</Link></li>
                <li><Link to="/login" className="transition-colors hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>Manage Listings</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="transition-colors hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>Help Center</a></li>
                <li><a href="#" className="transition-colors hover:text-purple-400" style={{ color: 'var(--text-secondary)' }}>Contact Us</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center" style={{ borderColor: 'var(--border-medium)', color: 'var(--text-muted)' }}>
            <p>&copy; 2024 RentEase. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Call to Action Section */}
      <div className="py-16" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
        <div className="max-w-7xl mx-auto px-8 text-center">
          <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Looking to post your property?
          </h1>
          <p className="font-medium text-xl max-w-3xl mx-auto leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            Join thousands of property owners who trust RentEase to find reliable tenants
          </p>
          <Link
            to="/register"
            className="inline-block px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
            style={{ backgroundColor: 'var(--accent-primary)', color: 'white' }}
          >
            Register as Owner
          </Link>
        </div>
      </div>
    </div>

  );
};

export default Home;
