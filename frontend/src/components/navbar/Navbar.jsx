import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">MyWebsite</div>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Products
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-gray-300">
              Sign In
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
