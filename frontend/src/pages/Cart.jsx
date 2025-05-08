import React from "react";
import useCartStore from "../store/useCartStore";
import useCheckoutStore from "../store/useCheckoutStore";
import { useNavigate } from "react-router-dom";
import { calculateCartTotal } from "../utils/cartUtils";
import CheckoutSteps from "../components/CheckoutSteps";

const Cart = () => {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart } = useCartStore();
  const { allowShippingAccess } = useCheckoutStore();

  const { subtotal, taxPrice, shippingPrice, totalPrice } = calculateCartTotal(cart);
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/shipping');
    allowShippingAccess(true);
  };

  return (
    <div className="container mx-auto p-4 sm:p-6">
      <div className="px-2 sm:px-4 md:px-10 py-4 sm:py-6">
        <h1 className="text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
          Your Shopping Cart 🛒
        </h1>

        {cart.length === 0 ? "" : <CheckoutSteps currentStep={0} />}

        {cart.length === 0 ? (
          <p className="text-gray-600 text-center">
            Your cart is empty. Start adding some items!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Cart Items Section */}
            <div className="md:col-span-2">
              <ul className="space-y-4">
                {cart.map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-col sm:flex-row justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">{item.name}</h2>
                        <p className="text-gray-600">₹{item.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2 space-x-2">
                          <button
                            onClick={() => decreaseQuantity(item._id)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200"
                          >
                            -
                          </button>
                          <span className="px-4 text-gray-700">{item.quantity}</span>
                          <button
                            onClick={() => increaseQuantity(item._id)}
                            className="px-3 py-1 bg-gray-300 text-gray-700 rounded-full hover:bg-gray-400 transition-colors duration-200"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="mt-4 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-200"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Responsive Order Summary Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow w-full">
              <h2 className="text-xl font-semibold mb-4 text-gray-800 text-center md:text-left break-words">
                Order Summary
              </h2>

              <div className="space-y-2 text-base text-gray-700">
                <div className="flex flex-wrap justify-between">
                  <span className="w-1/2">Subtotal:</span>
                  <span className="w-1/2 text-right">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span className="w-1/2">Shipping:</span>
                  <span className="w-1/2 text-right">
                    {shippingPrice === 0 ? "Free" : `₹${shippingPrice.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex flex-wrap justify-between">
                  <span className="w-1/2">Tax (10%):</span>
                  <span className="w-1/2 text-right">₹{taxPrice.toFixed(2)}</span>
                </div>
                <div className="flex flex-wrap justify-between font-bold text-green-600 text-lg pt-2 border-t mt-2">
                  <span className="w-1/2">Total:</span>
                  <span className="w-1/2 text-right">₹{totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3 mt-6">
                <button
                  onClick={handleProceed}
                  className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-gray-900 transition-all"
                >
                  Proceed to Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-700 transition-all"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
