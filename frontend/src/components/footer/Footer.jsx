import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-600 p-4 mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white">
          &copy; 2024 MyWebsite. All rights reserved.
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
