import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

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

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl">
        Loading order details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">🧾 Order Summary</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <p><span className="font-semibold text-gray-400">Order ID:</span> {order._id}</p>
            <p><span className="font-semibold text-gray-400">Status:</span> 
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium 
                ${order.paymentStatus === "Success" ? "bg-green-600" : order.paymentStatus === "Failed" ? "bg-red-600" : "bg-yellow-500"}`}>
                {order.paymentStatus}
              </span>
            </p>
            <p><span className="font-semibold text-gray-400">Delivery:</span> 
              {order.isDelivered ? " ✅ Delivered" : " ⏳ Pending"}
            </p>
            <p><span className="font-semibold text-gray-400">Total Amount:</span> ₹{order.totalOrderValue}</p>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold text-gray-400">Order Date:</span> {new Date(order.createdAt).toLocaleDateString()}</p>
            <p><span className="font-semibold text-gray-400">Items Count:</span> {order.items?.length}</p>
            <p><span className="font-semibold text-gray-400">Payment Method:</span> {order.paymentMethod || "N/A"}</p>
            <p><span className="font-semibold text-gray-400">Shipping Address:</span> {order.address.state} {order.address.city} {order.address.locality} {order.address.pincode}</p>
          </div>
        </div>

        <h3 className="text-2xl font-semibold mb-4">📦 Items in this order:</h3>
        <div className="bg-gray-700 rounded-lg p-4 space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center border-b border-gray-600 pb-2">
              <div>
                <p className="text-lg font-medium">{item.name}</p>
                <p className="text-sm text-gray-300">Qty: {item.quantity}</p>
              </div>
              <p className="text-lg font-bold">₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
