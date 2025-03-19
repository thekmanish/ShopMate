import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating"; // If using Rating component

const ProductComponent = ({ product }) => {

  return (
    <Link
      to={`/product/${product._id}`}
      className="block hover:scale-110 transition-all duration-500"
    >
      <div className="border border-gray-300 rounded-lg bg-white shadow-md hover:shadow-lg transition duration-300 max-w-sm mx-auto flex flex-col items-center p-4 w-full cursor-pointer h-[400px]">
        {/* Image Section */}
        <div className="w-40 h-40 flex justify-center items-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-center mt-4 flex flex-col justify-between h-full w-full">
          {/* Title */}
          <h2 className="text-lg font-bold text-gray-900 transition">
            {product.name}
          </h2>

          <p className="text-gray-600 text-sm">{product.description}</p>
          <Rating rating={product.ratings} />
          <p className="text-xl font-semibold text-gray-700 mt-2">
            ₹{product.price}
          </p>

          {/* View Details Button */}
          <button className="mt-3 px-5 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductComponent;
