import React from "react";

const Footer = () => {
  return (
    // bg-gradient-to-r from-blue-600 to-purple-600
    <footer className="bg-gray-700 text-white py-4 text-center w-full fixed bottom-0 left-0">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          &copy; All rights reserved.
        </div>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Privacy Policy
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
