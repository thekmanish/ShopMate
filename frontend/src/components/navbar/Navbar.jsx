import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { calculateCartTotal } from "../../utils/cartUtils";
import { FaRegUser } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { cart } = useCartStore();
  const { totalItems } = calculateCartTotal(cart);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm(""); // optional: clear input after search
      setIsOpen(false); // optional: close mobile menu after search
    }
  };

  return (
    <nav className="bg-gray-700 shadow-md text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 relative">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold whitespace-nowrap z-10 relative group"
        >
          <span className="text-white bg-gray-700 px-4 py-2 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-all duration-300">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:from-pink-400 group-hover:to-orange-300 transition-all duration-500 tracking-tight">
              Shopmate
            </span>
          </span>
        </Link>

        {/* Search Bar Desktop */}
        <div className="hidden md:flex flex-1 justify-center items-center z-0">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full max-w-lg border rounded-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
          <button
            onClick={handleSearch}
            className="ml-2 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200"
          >
            🔍
          </button>
        </div>

        {/* Right Side (User, Cart, Hamburger) */}
        <div className="flex items-center space-x-4 md:space-x-6 z-10">
          {/* Mobile Search Bar */}
          <div className="md:hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="px-3 py-1 rounded border border-gray-300 focus:outline-none"
            />
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </Link>

          {/* User Dropdown */}
          <div className="relative group">
            {/* User Icon */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-2 rounded-full hover:shadow-lg transition cursor-pointer">
              <FaRegUser className="text-xl text-white" />
            </div>

            {/* Dropdown - Logged In */}
            {user && (
              <div className="absolute right-0 mt-3 w-56 bg-white bg-opacity-90 text-gray-900 border border-gray-300 rounded-2xl shadow-2xl z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible pointer-events-auto transition-all duration-300 overflow-hidden">
                <div className="px-5 py-3 border-b border-gray-200 font-medium">
                  👋 Welcome,{" "}
                  <span className="font-bold">{user.name?.split(" ")[0]}</span>
                </div>

                <Link
                  to="/profile"
                  className="block px-5 py-3 hover:bg-gray-100 transition"
                >
                  🛠️ Profile
                </Link>

                <Link
                  to="/my-orders"
                  className="block px-5 py-3 hover:bg-gray-100 transition"
                >
                  📦 My Orders
                </Link>

                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="block px-5 py-3 hover:bg-gray-100 transition font-semibold text-blue-600"
                  >
                    🛡️ Admin Panel
                  </Link>
                )}

                <button
                  onClick={logout}
                  className="w-full text-left px-5 py-3 hover:bg-gray-100 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}

            {/* Dropdown - Logged Out */}
            {!user && (
              <div className="absolute right-0 mt-3 w-44 bg-white bg-opacity-90 text-gray-900 border border-gray-300 rounded-2xl shadow-2xl z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible pointer-events-auto transition-all duration-300 overflow-hidden">
                <Link
                  to="/login"
                  className="block px-5 py-3 hover:bg-gray-100 transition"
                >
                  🔐 Login
                </Link>
                <Link
                  to="/signup"
                  className="block px-5 py-3 hover:bg-gray-100 transition"
                >
                  ✍️ Signup
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-2xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 p-4 space-y-2">
          <Link to="/" className="block" onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/shop" className="block" onClick={() => setIsOpen(false)}>
            Shop
          </Link>
          <Link to="/deals" className="block" onClick={() => setIsOpen(false)}>
            Deals
          </Link>
          <Link
            to="/contact"
            className="block"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
