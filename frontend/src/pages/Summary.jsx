import React, { useEffect } from "react";
import useCartStore from "../store/useCartStore";
import useCheckoutStore from "../store/useCheckoutStore";
import useAuthStore from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import api from "../utils/api";

const Summary = () => {
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const shippingDetails = useCheckoutStore((state) => state.shippingDetails);
  const paymentMethod = useCheckoutStore((state) => state.paymentMethod);
  const user = useAuthStore((state) => state.user);
  const { resetCheckout } = useCheckoutStore();

  const navigate = useNavigate();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    if (!shippingDetails || !paymentMethod || cart.length === 0) {
      navigate("/cart");
    }
  }, [shippingDetails, paymentMethod, cart, navigate]);

  const handlePlaceOrder = async () => {
    try {
      const payload = {
        orderItems: cart.map((item) => ({
          _id: item._id,
          name: item.name,
          image: item.image,
          quantity: item.quantity,
          price: item.price,
        })),
        paymentMethod,
        totalPrice: totalAmount,
        shipping: {
          locality: shippingDetails.country,
          pincode: shippingDetails.postalCode,
          state: shippingDetails.address,
          city: shippingDetails.city,
        },
      };

      const { data } = await api.post("/orders", payload);
      const orderId = data.orderDetails._id;
      navigate(`/orders/${orderId}`);
      setTimeout(() => {
        clearCart();
        resetCheckout();
      }, 200);
    } catch (error) {
      console.error("Order placement failed !!", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-2xl p-6">
        <CheckoutSteps currentStep={3} />
        <h2 className="text-3xl font-bold mb-6 text-center">🧾 Final Order Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-700 rounded-xl p-4">
            <h3 className="text-xl font-semibold mb-2">🚚 Shipping Address</h3>
            <p>{shippingDetails?.address}</p>
            <p>{shippingDetails?.city}, {shippingDetails?.postalCode}</p>
            <p>{shippingDetails?.country}</p>
          </div>

          <div className="bg-gray-700 rounded-xl p-4">
            <h3 className="text-xl font-semibold mb-2">💳 Payment Method</h3>
            <p>{paymentMethod}</p>
          </div>
        </div>

        <div className="bg-gray-700 rounded-xl p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">🛍️ Order Items</h3>
          <div className="divide-y divide-gray-600">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between py-3">
                <span>{item.name} × {item.quantity}</span>
                <span className="font-medium text-green-400">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-right text-xl font-bold mb-6">
          Grand Total: <span className="text-green-400">₹{totalAmount}</span>
        </div>

        <div className="flex justify-center">
          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 hover:bg-green-700 transition px-8 py-3 rounded-full text-lg font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
