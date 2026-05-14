import { NavLink, Outlet, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import { useContext, useState } from "react";

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `px-4 py-3 rounded-lg transition-all ${
    isActive
      ? "bg-(--primary-color) text-(--background-color) font-bold"
      : "text-(--text-color) hover:bg-(--secondary-color)"
  }`;

function Admin() {
  const { user, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate("/login/admin");
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-screen w-full">
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
        />
      )}

      {/* Sidebar  */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-56 bg-(--greyColor) border-r border-(--secondary-color) z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col shadow-xl ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center justify-between px-8 py-6 border-b border-(--secondary-color) bg-(--background-color)">
          <h2 className="text-2xl font-bold text-(--text-color)">Admin</h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden text-2xl text-(--text-color) hover:bg-(--secondary-color) w-10 h-10 flex items-center justify-center rounded-lg transition-colors font-bold"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-4 py-6">
          <NavLink
            to="/admin/dashboard"
            className={linkClass}
            onClick={closeSidebar}
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/products"
            className={linkClass}
            onClick={closeSidebar}
          >
            Products
          </NavLink>

          <NavLink
            to="/admin/add-product"
            className={linkClass}
            onClick={closeSidebar}
          >
            Add Product
          </NavLink>
        </nav>

        <div className="px-4 py-4 mt-auto border-t border-(--secondary-color)">
          <p className="text-xs text-(--text-color) opacity-70 mb-3">
            Welcome, <span className="font-semibold">{user?.firstName}</span>
          </p>
          <button
            onClick={handleLogout}
            className="w-full bg-(--primary-color) text-(--background-color) py-2 px-4 rounded-lg font-medium hover:bg-(--primary-hover) transition-colors"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col bg-(--background-color) w-full">
        {/* Mobile */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden fixed top-6 left-6 z-20 bg-(--primary-color) text-(--background-color) p-3 rounded-lg hover:shadow-lg transition-all font-bold text-lg"
          >
            ☰
          </button>
        )}

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
export default Admin;
