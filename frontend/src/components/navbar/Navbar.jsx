import React from "react";

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-md p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          ShopMate
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link to="/shop" className="hover:text-yellow-300">Shop</Link>
          <Link to="/deals" className="hover:text-yellow-300">Deals</Link>
          <Link to="/about" className="hover:text-yellow-300">About</Link>
          <Link to="/contact" className="hover:text-yellow-300">Contact</Link>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black"
            />
          </div>
          <Link to="/cart" className="relative">
            <span className="text-xl">🛒</span>
            <span className="absolute -top-2 -right-2 bg-yellow-300 text-black text-xs w-5 h-5 flex items-center justify-center rounded-full">
              2
            </span>
          </Link>
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-xl">
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-600 to-purple-600 shadow-md p-4 space-y-2">
          <Link to="/shop" className="block hover:text-yellow-300">Shop</Link>
          <Link to="/deals" className="block hover:text-yellow-300">Deals</Link>
          <Link to="/about" className="block hover:text-yellow-300">About</Link>
          <Link to="/contact" className="block hover:text-yellow-300">Contact</Link>
        </div>
      )}
    </nav>
  );
}


// export default Navbar;
