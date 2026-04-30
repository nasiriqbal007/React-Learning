import { useState } from "react";
import useFetch from "./CustomHook/useFetch";
import apiUrl from "./Api/BaseUrl";
import { createUser, updateUser, deleteUser } from "./Api/ApiService";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  gender: string;
  email: string;
}

function Home() {
  const { data, loading, error, setCacheData } = useFetch<{ users: User[] }>(
    apiUrl + "/users",
  );

  const users = data?.users ?? [];

  const deleteUserById = async (id: number) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setCacheData({ users: updatedUsers });

    await deleteUser(id);
    console.log(`User with ID ${id} deleted`);
  };

  const [openForm, setForm] = useState<boolean>(false);
  const [form, setFormData] = useState<Partial<User>>({});
  const [editId, setEditId] = useState<number | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editId !== null) {
      await handleUpdateUser(editId);
    } else {
      await handleCreateUser();
    }

    setForm(false);
    setFormData({});
    setEditId(null);
  };

  const handleCreateUser = async () => {
    const newUserData = {
      id: Date.now(),
      firstName: form.firstName || "",
      lastName: form.lastName || "",
      username: form.username || "",
      gender: form.gender || "",
      email: form.email || "",
    };

    const newUser: User = newUserData;
    setCacheData({ users: [newUser, ...users] });

    const result = await createUser(newUserData);
    console.log("User created:", result);
  };

  const handleUpdateUser = async (id: number) => {
    const updatedUserData = {
      firstName: form.firstName || "",
      lastName: form.lastName || "",
      username: form.username || "",
      gender: form.gender || "",
      email: form.email || "",
    };

    const updatedUsers = users.map((u) =>
      u.id === id ? { ...u, ...updatedUserData } : u,
    );

    setCacheData({ users: updatedUsers });
    await updateUser(id, updatedUserData);
    console.log(`User updated: ${id}`);
  };

  const fields = [
    "all",
    "male",
    "female",
    "firstName",
    "lastName",
    "username",
    "email",
  ];

  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string>("all");

  const filteredUsers = users.filter((user) => {
    const q = search.toLowerCase();
    const matchSearch =
      user.firstName.toLowerCase().includes(q) ||
      user.lastName.toLowerCase().includes(q) ||
      user.username.toLowerCase().includes(q) ||
      user.email.toLowerCase().includes(q);

    const matchFilter =
      filter === "all" ||
      ((filter === "male" || filter === "female") && user.gender === filter) ||
      (filter === "firstName" && user.firstName.toLowerCase().includes(q)) ||
      (filter === "lastName" && user.lastName.toLowerCase().includes(q)) ||
      (filter === "username" && user.username.toLowerCase().includes(q)) ||
      (filter === "email" && user.email.toLowerCase().includes(q));

    return matchSearch && matchFilter;
  });

  const handleEditUser = (user: User) => {
    setFormData(user);
    setEditId(user.id);
    setForm(true);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error!</p>;

  return (
    <div className="flex flex-col h-screen rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      {/* Controls Section */}
      <div className="flex flex-row gap-2 p-4 bg-white border-b border-gray-200">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>

        <button
          onClick={() => {
            setFormData({});
            setEditId(null);
            setForm(true);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors whitespace-nowrap"
        >
          + Add User
        </button>
      </div>

      {/* Form Modal */}
      {openForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <form
            onSubmit={handleSubmit}
            className="w-80 p-6 bg-white rounded-lg shadow-lg flex flex-col gap-4 z-50"
          >
            <h2 className="text-lg font-semibold text-gray-900">
              {editId ? "Edit User" : "Create User"}
            </h2>

            <input
              name="firstName"
              value={form.firstName || ""}
              onChange={handleInputChange}
              placeholder="First Name"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="lastName"
              value={form.lastName || ""}
              onChange={handleInputChange}
              placeholder="Last Name"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              name="username"
              value={form.username || ""}
              onChange={handleInputChange}
              placeholder="Username"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <select
              name="gender"
              value={form.gender || ""}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <input
              name="email"
              value={form.email || ""}
              onChange={handleInputChange}
              placeholder="Email"
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => {
                  setForm(false);
                  setFormData({});
                  setEditId(null);
                }}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                {editId ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tabl  */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 border-b border-gray-200">
                {[
                  "ID",
                  "First Name",
                  "Last Name",
                  "Username",
                  "Gender",
                  "Email",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          </table>
        </div>

        {/*  Body */}
        <div className="flex-1 overflow-y-auto">
          <table className="w-full border-collapse">
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <td className="px-4 py-3 text-sm text-gray-400">
                      {user.id}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {user.firstName}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700">
                      {user.lastName}
                    </td>
                    <td className="px-4 py-3 text-sm text-blue-600 font-mono">
                      {user.username}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.gender === "male"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-pink-100 text-pink-700"
                        }`}
                      >
                        {user.gender}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500">
                      {user.email}
                    </td>

                    <td className="px-4 py-3 text-sm flex gap-2">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteUserById(user.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors cursor-pointer"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-gray-500"
                  >
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/*  Footer */}
        <div className="sticky bottom-0 z-20 bg-gray-50 border-t border-gray-200">
          <div className="px-4 py-3 text-sm text-gray-600">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
