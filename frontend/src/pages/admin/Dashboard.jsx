import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/admin/stats");
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div className="text-red-600 p-4">{error}</div>;

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Welcome to the Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Orders" value={stats.totalOrders} color="text-blue-600" />
        <StatCard title="Total Products" value={stats.totalProducts} color="text-green-600" />
        <StatCard title="Total Users" value={stats.totalUsers} color="text-purple-600" />
        <StatCard title="Pending Orders" value={stats.pendingOrders} color="text-red-600" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-2xl shadow p-6">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className={`text-3xl font-bold ${color}`}>{value}</p>
  </div>
);

export default Dashboard;
