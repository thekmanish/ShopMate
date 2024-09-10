import React from "react";

const Product = ({product}) => {
  return (
    <div className="flex border border-gray-500 rounded-lg p-4 m-1 max-w-md mx-auto">
      <img
        src={product.image}
        alt="Product"
        className="w-36 h-36 rounded-lg object-cover"
      />
      <div className="ml-4 flex flex-col justify-between">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        <p className="text-gray-600">
          {product.description}
        </p>
        <p className="text-xl font-semibold mt-2">${product.price}</p>
        <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Product;
