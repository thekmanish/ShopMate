import React, { useEffect } from "react";
import useOrderStore from "../../store/useOrderStore";
import Loader from "../../components/Loader";

const AdminOrders = () => {
  const { orders, fetchOrders, updatePaymentStatus, markAsDelivered, deleteOrder, loading } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePaymentChange = (id, newStatus) => {
    updatePaymentStatus(id, newStatus);
  };

  return (
    <div className="p-6">
      {loading && <Loader/>}
      <h2 className="text-2xl font-bold mb-4">Manage Orders</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Total</th>
            <th className="p-2 border">Payment Status</th>
            <th className="p-2 border">Change Status</th>
            <th className="p-2 border">Mark as delivered</th>
            <th className="p-2 border">Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b">
                <td className="p-2 border">{order._id}</td>
                <td className="p-2 border">{order.userId?.name || "Unknown"}</td>
                <td className="p-2 border">₹ {order.totalOrderValue}</td>
                <td className="p-2 border capitalize">{order.paymentStatus}</td>
                <td className="p-2 border ">
                    <select
                    defaultValue={order.paymentStatus}
                    onChange={(e) => {
                        if (e.target.value !== order.paymentStatus) {
                        handlePaymentChange(order._id, e.target.value);
                        }
                    }}
                    >
                    <option value="pending">Pending</option>
                    <option value="successful">Successful</option>
                    <option value="failed">Failed</option>
                    </select>
                </td>
                <td className="p-2 border text-center">
                    {order.isDelivered ? (
                    <span className="text-green-600 font-semibold">Delivered</span>
                    ) : (
                    <button
                        onClick={() => markAsDelivered(order._id)}
                        className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Mark as Delivered
                    </button>
                    )}
                </td>
                <td className="p-2 border text-center">
                  <button
                        onClick={() => deleteOrder(order._id)}
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                    >
                        Delete
                    </button>

                </td>
            </tr>

          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders;
