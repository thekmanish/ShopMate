import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

const ProductComponent = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="block hover:scale-105 transition-transform duration-300"
    >
      <div className="border border-gray-200 rounded-xl bg-white shadow-md hover:shadow-xl transition duration-300 p-4 h-[360px] flex flex-col items-center">
        {/* Image Section */}
        <div className="w-full h-40 flex justify-center items-center overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-contain"
          />
        </div>

        {/* Content Section */}
        <div className="mt-4 text-center flex flex-col flex-grow w-full">
          <h2 className="text-base font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h2>
          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-2">
            <Rating rating={product.ratings} />
          </div>

          <p className="text-lg font-bold text-gray-700 mt-1">
            ₹{product.price}
          </p>

          {/* Button */}
          <button className="mt-auto px-4 py-2 bg-gray-800 text-white text-sm rounded hover:bg-gray-900 transition">
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductComponent;
