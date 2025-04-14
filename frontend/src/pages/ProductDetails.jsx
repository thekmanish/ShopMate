import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/product/Rating";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";
import Message from "../components/Message";
import useProductStore from "../store/useProductStore";
import useCartStore from "../store/useCartStore";

const ProductDetails = () => {
  const { product, error, loading, fetchProductById } = useProductStore();
  const { individualProductId } = useParams();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  // State for quantity selection
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity }); // Pass selected quantity
    navigate("/cart");
  };

  useEffect(() => {
    fetchProductById(individualProductId);
  }, [individualProductId]);

  if (loading) return <Loader />;
  if (error) return ;
  if (!product)
    return <p className="text-center text-gray-500">Product not found.</p>;

  return (
    <div className="max-w-6xl mx-auto pb-16 p-6 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.15)] rounded-lg mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full max-w-md h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
          <p className="text-gray-600 mt-3">{product.description}</p>

          {/* Rating and Reviews */}
          <div className="flex items-center mt-3">
            <Rating rating={product.ratings} />
            <span className="ml-2 text-gray-600">
              ({product.reviewCounts} reviews)
            </span>
          </div>

          {/* Price and Stock */}
          <p className="text-3xl font-semibold text-gray-700 mt-4">
            ₹{product.price}
          </p>
          <p
            className={`mt-2 font-medium ${
              product.inStock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.inStock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Extra Info */}
          <div className="mt-4">
            <p>
              <span className="font-semibold">Brand:</span> {product.brand}
            </p>
            <p>
              <span className="font-semibold">Category:</span>{" "}
              {product.category}
            </p>
          </div>

          {/* Quantity Selector */}
          {product.inStock > 0 && (
            <div className="mt-4">
              <label htmlFor="quantity" className="font-semibold mr-2">
                Quantity:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="border border-gray-300 rounded px-3 py-1"
              >
                {[...Array(product.inStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-6 flex space-x-4">
            <button
              onClick={handleAddToCart}
              className={`px-6 py-2 rounded text-white font-semibold transition ${
                product.inStock > 0
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={product.inStock === 0}
            >
              Add to Cart
            </button>
            <button
              className={`px-6 py-2 bg-gray-700 text-white rounded hover:bg-gray-900 transition ${
                product.inStock > 0 ? "" : "cursor-not-allowed opacity-50"
              }`}
              disabled={product.inStock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
