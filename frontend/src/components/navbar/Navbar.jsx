import React, { useState } from "react";
import { Link } from "react-router-dom";
import useCartStore from "../../store/useCartStore";
import { calculateCartTotal } from "../../utils/cartUtils";
import { FaRegUser } from "react-icons/fa";
import useAuthStore from "../../store/useAuthStore";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropDown, setDropDown] =  useState(false);
  const { cart } = useCartStore();
  const { totalItems } = calculateCartTotal(cart);
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-gray-700 shadow-md p-4 text-white">
      <div className="container mx-auto flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold whitespace-nowrap">
          SM
        </Link>

        {/* Centered Search Bar (Desktop) */}
        <div className="hidden md:flex w-full max-w-lg absolute left-1/2 transform -translate-x-1/2">
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full border rounded-full px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          />
        </div>

        <div className="flex items-center space-x-6"> 
          <div className="md:hidden">
            <input
              type="text"
              placeholder="Search..."
              className="w-40 border rounded-full px-3 py-1 text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
            />
          </div>

          <Link to="/cart" className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropDown(!dropDown)}
                className="flex items-center space-x-2 bg-gray-800 px-3 py-2 rounded-full hover:bg-gray-600 transition"
              >
                <FaRegUser className="text-xl"/>
                <span>{user.name || "User"}</span>
              </button>

              {dropDown && user && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg overflow-x-hidden">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={()=>{
                      logout();
                      setDropDown(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <span className="text-xl">
                <FaRegUser/>
              </span>
            </Link>
          )}

          {/* Hamburger Menu Button (Mobile) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-xl"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
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
