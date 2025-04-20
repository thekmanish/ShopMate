import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api"; // ya jahan se tu axios ya fetch ka instance use karta hai

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const { data } = await api.get(`/orders/${orderId}`);
        setOrder(data.orderInfo);
      } catch (error) {
        console.error("Failed to fetch order details", error);
      }
    };
    fetchOrder();
  }, [orderId]);

  if (!order) return <div className="text-white p-10">Loading order details...</div>;

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h2 className="text-3xl font-bold mb-4">Order Summary</h2>
      <p>Order ID: {order._id}</p>
      <p>Status: {order.paymentStatus}</p>
      <p>Total: ₹{order.totalOrderValue}</p>

      <h3 className="mt-6 text-2xl font-semibold">Items:</h3>
      <ul className="space-y-2">
        {order.items.map((item, idx) => (
          <li key={idx} className="border-b border-gray-700 py-2">
            {item.name} — {item.quantity} x ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
