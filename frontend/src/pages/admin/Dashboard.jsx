import React from "react";

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Total Orders */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-blue-600">1,245</p>
        </div>

        {/* Card 2: Total Products */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-green-600">318</p>
        </div>

        {/* Card 3: Total Users */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Total Users</h3>
          <p className="text-3xl font-bold text-purple-600">876</p>
        </div>

        {/* Card 4: Pending Orders */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-2">Pending Orders</h3>
          <p className="text-3xl font-bold text-red-600">56</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
