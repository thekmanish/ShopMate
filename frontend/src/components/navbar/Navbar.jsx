import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { calculateCartTotal } from "../../utils/cartUtils";
import { FaRegUser } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { cart } = useCartStore();
  const { totalItems } = calculateCartTotal(cart);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-gray-700 shadow-md text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold whitespace-nowrap z-10">
          SM
        </Link>

        {/* Search Bar Desktop */}
        <div className="hidden md:flex flex-1 justify-center z-0">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full max-w-lg border rounded-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        {/* Right Side (User, Cart, Hamburger) */}
        <div className="flex items-center space-x-4 md:space-x-6 z-10">
          {/* Mobile Search Bar */}
          <div className="md:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-32 border rounded-full px-3 py-1 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </Link>

          <div className="relative group">
            {/* User Icon */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-700 px-4 py-2 rounded-full hover:shadow-lg transition cursor-pointer">
              <FaRegUser className="text-xl text-white" />
            </div>

            {/* Dropdown - Logged In */}
            {user && (
            <div className="absolute right-0 mt-3 w-56 bg-white bg-opacity-90 text-gray-900 border border-gray-300 rounded-2xl shadow-2xl z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 overflow-hidden">
              <div className="px-5 py-3 border-b border-gray-200 font-medium">
                👋 Welcome, <span className="font-bold">{user.name?.split(" ")[0]}</span>
              </div>

              <Link
                onClick={() => setDropDown(false)}
                to="/profile"
                className="block px-5 py-3 hover:bg-gray-100 transition"
              >
                🛠️ Profile
              </Link>

              {/* ✅ Admin Link */}
              {user.isAdmin && (
                <Link
                  onClick={() => setDropDown(false)}
                  to="/admin"
                  className="block px-5 py-3 hover:bg-gray-100 transition font-semibold text-blue-600"
                >
                  🛡️ Admin Panel
                </Link>
              )}

              <button
                onClick={() => {
                  logout();
                  setDropDown(false);
                }}
                className="block w-full text-left px-5 py-3 hover:bg-gray-100 transition"
              >
                🚪 Logout
              </button>
            </div>
          )}


            {/* Dropdown - Logged Out */}
            {!user && (
              <div className="absolute right-0 mt-3 w-44 bg-white bg-opacity-90 text-gray-900 border border-gray-300 rounded-2xl shadow-2xl z-50 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 overflow-hidden">
                <Link
                  onClick={() => setDropDown(false)}
                  to="/login"
                  className="block px-5 py-3 hover:bg-gray-100 transition"
                >
                  🔐 Login
                </Link>
                <Link
                  onClick={() => setDropDown(false)}
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
          <Link to="/" className="block">
            Home
          </Link>
          <Link to="/shop" className="block">
            Shop
          </Link>
          <Link to="/deals" className="block">
            Deals
          </Link>
          <Link to="/contact" className="block">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
