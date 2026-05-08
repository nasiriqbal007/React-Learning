import { useState } from "react";
import type { UserData } from "../../types/UserData";

function Dashboard() {
  const [users, setUsers] = useState<UserData[]>(
    () => JSON.parse(localStorage.getItem("users") || "[]") as UserData[],
  );

  const totalUsers = users.length;
  const handleDelete = (id: string) => {
    const deleted = users.filter((u) => u.id !== id);
    setUsers(deleted);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <section className="flex gap-4 mb-6">
        <div className="p-4 bg-white shadow-md rounded-md">
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
        </div>
      </section>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-left">
          <thead className="text-sm text-body bg-(--secondary-color)  rounded-base border-default">
            <tr>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Role</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {user.firstName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.lastName}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.role}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="btn-primary bg-red-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default Dashboard;
