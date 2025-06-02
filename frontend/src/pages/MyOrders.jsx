import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useOrderStore from '../store/useOrderStore';
import Loader from '../components/Loader';
import api from '../utils/api';

const MyOrders = () => {
    const [myOrders, setMyOrders] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [error, setError] = useState('');

  useEffect(() => {
    const fetchMyOrders = async () => {
        setLoading(true);
        try {
            const { data } = await api.get("/orders");
            setMyOrders(data.orders);           
        } catch (err) {
            setError(err.message);      
        } finally {
            setLoading(false);
        }
    };
    fetchMyOrders();
  }, []);

  const paymentStatusLabels = {
    successful: "Successful",
    failed: "Failed",
    pending: "Pending"
  };
  
  return (
      <div className="max-w-4xl mx-auto p-4">

      <h2 className="text-2xl font-bold mb-4">📦 My Orders</h2>

      {loading && <Loader />}
      {error && <p className="text-red-500">{error}</p>}

      {myOrders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <Link
                to={`/orders/${order._id}`}
                key={order._id}
                className="block border rounded-lg p-4 shadow bg-white hover:bg-gray-100 transition"
            >
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Status:</strong> {paymentStatusLabels[order.paymentStatus]}</p>
                <p><strong>Delivery:</strong> {order.isDelivered ? "✅ Delivered" : "⏳ Pending"}</p>
                <p><strong>Total Items:</strong> {order.items?.length}</p>
                <p className="text-blue-600 mt-2 text-sm">Click to view details</p>
            </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
