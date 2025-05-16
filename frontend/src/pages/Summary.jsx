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
    const {resetCheckout} = useCheckoutStore();

    const navigate = useNavigate();

    const totalAmount = cart.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );

useEffect(() => {
    if (!shippingDetails || !paymentMethod || cart.length === 0) {
        navigate('/cart');
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
        const orderId = data.orderDetails._id        
        navigate(`/orders/${orderId}`);
        setTimeout(() => {
          clearCart();
          resetCheckout();
        }, 200);


    } catch (error) {
        console.error("Order placement failed !!", error);
    }
}

return (
    <div className="max-w-4xl mx-auto p-4">
      <CheckoutSteps currentStep={3}/>
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Shipping Address</h3>
        <p>{shippingDetails?.address}, {shippingDetails?.city}, {shippingDetails?.postalCode} - {shippingDetails?.country}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Payment Method</h3>
        <p>{paymentMethod}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Items</h3>
        {cart.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>{item.name} x {item.quantity}</span>
            <span>₹{item.price * item.quantity}</span>
          </div>
        ))}
      </div>

      <div className="text-right font-bold text-lg mb-4">
        Total: ₹{totalAmount}
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Place Order
      </button>
    </div>
  );
};

export default Summary;