import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { calculateCartTotal } from "../../utils/cartUtils";
import { FaRegUser } from "react-icons/fa";
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

  // 🧠 Outside click to close user dropdown
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
    <nav className="bg-gray-700 text-white shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between md:justify-start px-4 py-3 space-x-4">
        {/* Left: Mobile Search Toggle */}
        <div className="md:hidden">
          <button onClick={() => setShowMobileSearch(!showMobileSearch)}>
            🔍
          </button>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:flex items-center flex-1 justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search for products..."
            className="w-full max-w-md border rounded-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
          >
            🔍
          </button>
        </div>

        {/* Center: Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold bg-gray-700 px-3 py-1 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-all
             md:static absolute left-1/2 transform -translate-x-1/2 md:transform-none md:mr-auto"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Shopmate
          </span>
        </Link>

        {/* Right: Cart, User, Hamburger */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link to="/cart" className="relative text-xl">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          {/* User Icon with Dropdown */}
          <div className="relative" ref={userDropdownRef}>
            <button
              onClick={() => setIsUserDropdownOpen((prev) => !prev)}
              className="flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 px-3 py-2 rounded-full hover:shadow-lg transition"
            >
              <FaRegUser className="text-white text-xl" />
            </button>

            {isUserDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-gray-900 border border-gray-300 rounded-2xl shadow-2xl z-50 overflow-hidden">
                {user ? (
                  <>
                    <div className="px-5 py-3 border-b font-medium">
                      👋 Welcome,{" "}
                      <span className="font-bold">
                        {user.name?.split(" ")[0]}
                      </span>
                    </div>
                    <Link
                      to="/profile"
                      onClick={closeMenus}
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      🛠️ Profile
                    </Link>
                    <Link
                      to="/my-orders"
                      onClick={closeMenus}
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      📦 My Orders
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        onClick={closeMenus}
                        className="block px-5 py-3 hover:bg-gray-100 font-semibold text-blue-600"
                      >
                        🛡️ Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        closeMenus();
                      }}
                      className="w-full text-left px-5 py-3 hover:bg-gray-100"
                    >
                      🚪 Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={closeMenus}
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      🔐 Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={closeMenus}
                      className="block px-5 py-3 hover:bg-gray-100"
                    >
                      ✍️ Signup
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-xl"
          >
            {isMobileMenuOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Search Input */}
      {showMobileSearch && (
        <div className="md:hidden px-4 pb-2 bg-gray-700">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products..."
            className="w-full px-4 py-2 rounded border text-black"
          />
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-gray-700 text-white px-4 pb-4 space-y-2">
          <Link to="/" onClick={closeMenus} className="block">
            Home
          </Link>
          <Link to="/contact" onClick={closeMenus} className="block">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
