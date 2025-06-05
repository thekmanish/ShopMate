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
  <div className="container mx-auto px-4 py-3 relative">
    {/* Top Row: Logo + Search + Icons */}
    <div className="flex items-center justify-between md:justify-start space-x-4">
      {/* Mobile: Logo Centered */}
      <div className="flex-1 flex justify-center md:justify-start relative">
        <Link
          to="/"
          className="text-xl md:text-2xl font-bold bg-gray-700 px-3 py-1 rounded-lg shadow-lg border border-gray-700 hover:border-purple-500 transition-all"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Shopmate
          </span>
        </Link>
      </div>

      {/* Left: Mobile Search Toggle */}
      <div className="md:hidden">
        <button onClick={() => setShowMobileSearch(!showMobileSearch)}>🔍</button>
      </div>

      {/* Right: Cart + User + Hamburger */}
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

        {/* User Dropdown */}
        {/* ...your user dropdown code stays the same */}

        {/* Hamburger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-xl"
        >
          {isMobileMenuOpen ? "✖" : "☰"}
        </button>
      </div>
    </div>

    {/* Desktop Search Centered */}
    <div className="hidden md:flex items-center justify-center mt-3">
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

    {/* Mobile Search and Menu stays the same */}
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
  </div>
</nav>

  );
}
