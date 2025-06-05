import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { calculateCartTotal } from "../../utils/cartUtils";
import { FaRegUser, FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const userDropdownRef = useRef(null);
  const { cart } = useCartStore();
  const { totalItems } = calculateCartTotal(cart);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setShowMobileSearch(false);
    }
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(e.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Navbar Row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo - Left side */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-2xl font-bold bg-gray-700 px-3 py-1 rounded-lg hover:border-purple-500 transition-all flex items-center"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Shop<span className="text-yellow-300">mate</span>
              </span>
              <span className="ml-2 text-yellow-300">🔑</span>
            </Link>
          </div>

          {/* Desktop Search - Centered */}
          <div className="hidden md:flex flex-1 max-w-xl mx-6">
            <div className="relative w-full">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search for products..."
                className="w-full border-0 rounded-full px-5 py-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-md"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-6">
            {/* Mobile Search Toggle */}
            <button 
              onClick={() => setShowMobileSearch(!showMobileSearch)} 
              className="md:hidden text-xl hover:text-yellow-300 transition-colors"
            >
              <FaSearch className="w-5 h-5" />
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative hover:text-yellow-300 transition-colors">
              <FaShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center text-sm rounded-full focus:outline-none hover:text-yellow-300 transition-colors"
              >
                {user ? (
                  <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center font-bold border-2 border-yellow-300">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <FaRegUser className="w-6 h-6" />
                )}
              </button>
              {isUserDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-1 z-50 border border-gray-200">
                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center"
                      >
                        <span className="mr-2">👤</span> Profile
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center"
                      >
                        <span className="mr-2">🚪</span> Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center"
                      >
                        <span className="mr-2">🔑</span> Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={() => setIsUserDropdownOpen(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors flex items-center"
                      >
                        <span className="mr-2">✨</span> Register
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-xl hover:text-yellow-300 transition-colors"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        {showMobileSearch && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                placeholder="Search products..."
                className="w-full px-5 py-2 rounded-full border-0 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow-md"
              />
              <button
                onClick={handleSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-purple-600 transition-colors"
              >
                <FaSearch className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-600 px-4 py-3 space-y-3 rounded-b-lg shadow-inner">
            <Link 
              to="/" 
              onClick={closeMenus} 
              className="block py-2 px-3 hover:bg-gray-500 rounded-lg transition-colors flex items-center"
            >
              <span className="mr-2">🏠</span> Home
            </Link>
            <Link 
              to="/contact" 
              onClick={closeMenus} 
              className="block py-2 px-3 hover:bg-gray-500 rounded-lg transition-colors flex items-center"
            >
              <span className="mr-2">📞</span> Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}