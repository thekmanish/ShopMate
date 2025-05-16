import { NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-4">
          <NavLink to="/admin" end className="block hover:text-yellow-400">
            Dashboard
          </NavLink>
          <NavLink to="/admin/orders" className="block hover:text-yellow-400">
            Manage Orders
          </NavLink>
          <NavLink to="/admin/products" className="block hover:text-yellow-400">
            Manage Products
          </NavLink>
          <NavLink to="/admin/users" className="block hover:text-yellow-400">
            Manage Users
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
