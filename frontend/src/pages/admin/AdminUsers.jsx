import React, { useEffect } from "react";
import useAdminUserStore from "../../store/useAdminUserStore"; // You must implement this store
import { FaTrash } from "react-icons/fa";
import Loader from "../../components/Loader";

const AdminUsers = () => {
  const { users, fetchUsers, deleteUser, loading, error } = useAdminUserStore();

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      deleteUser(userId);
    }
  };

  return (
    <div className="p-6">
      {loading && <Loader/>}
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">User ID</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b text-center">
              <td className="p-2 border">{user._id}</td>
              <td className="p-2 border">{user.name}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border capitalize">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
