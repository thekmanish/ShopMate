import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-6 px-4 text-sm text-center w-full">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Shopmate
          </h2>
          <p className="mt-2 text-gray-300">
            Seamless shopping experience from cart to checkout.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/about" className="hover:text-white">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Get in Touch</h3>
          <p className="text-gray-300">
            Have questions? Contact us and we’ll respond promptly.
          </p>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-gray-600 text-gray-400">
        &copy; {new Date().getFullYear()} Shopmate. All rights reserved.
      </div>
    </footer>
  );
}
