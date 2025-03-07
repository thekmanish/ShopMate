import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating"; // If using Rating component

const Product = ({ product }) => {
  return (
    <Link to={`/product/${product._id}`} className="block">
      <div className="border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300 max-w-sm mx-auto flex flex-col items-center p-4 w-full cursor-pointer">
        {/* Image Section */}
        <img
          src={product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded-md"
        />

        <div className="text-center mt-4">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 hover:text-blue-600 transition">
            {product.name}
          </h2>

          <p className="text-gray-600 text-sm">{product.description}</p>
          <Rating rating={product.rating} />
          <p className="text-xl font-semibold text-blue-600 mt-2">
            ${product.price}
          </p>

          {/* View Details Button */}
          <button className="mt-3 px-5 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default Product;
