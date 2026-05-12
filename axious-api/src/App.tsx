import "./index.css";
import axios from "axios";
import type { User } from "./types/type";
import { useState, useEffect } from "react";
type ErrorType = {
  message: string;
  code?: string;
  isCanceled?: boolean;
};
type FormType = {
  name: string;
  avatar: string;
  id: string;
};

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [error, setError] = useState<ErrorType | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [form, setForm] = useState<FormType>({
    name: "",
    avatar: "",
    id: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    if (isEditing && selectedUserId) {
      updateUser(selectedUserId, form);
    } else {
      createUser();
    }

    setOpen(false);
    setForm({ name: "", avatar: "", id: "" });
    setIsEditing(false);
    setSelectedUserId(null);
  };

  const handleError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      setError({
        message: error.message,
        code: error.code,
      });
    } else if (axios.isCancel(error)) {
      setError({
        message: "Request canceled",
        isCanceled: true,
      });
    } else {
      setError({
        message: "Unknown error",
      });
    }
  };
  const baseUrl = "https://6a03107b0d92f63dd254d03a.mockapi.io/api/v1/users";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl);

        setUsers(response.data);
        setError({ message: "" });
      } catch (error) {
        handleError(error);
      } finally {
        console.log("fetching completed");
      }
    };

    fetchData();
  }, []);

  const createUser = async () => {
    try {
      const response = await axios.post(baseUrl, form);
      setUsers((prev) => [...prev, response.data]);
      setError({ message: "" });
    } catch (error) {
      handleError(error);
    }
  };

  const updateUser = async (id: string, updatedData: Partial<User>) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, updatedData);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? response.data : user)),
      );
      setError({ message: "" });
    } catch (error) {
      handleError(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(`${baseUrl}/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setError({ message: "" });
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <div className="p-6 space-y-8 bg-gray-200 min-h-screen">
      <div>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Users
        </h2>

        <div className="flex justify-end">
          <button
            onClick={() => {
              setOpen(true);
              setIsEditing(false);

              setForm({
                name: "",
                avatar: "",
                id: "",
              });
            }}
            className="px-4 py-2  bg-blue-500 text-white rounded-lg hover:bg-blue-600 hover:cursor-pointer transition-colors duration-300 mb-4"
          >
            Add User
          </button>
        </div>
        {open && (
          <div className="fixed inset-0  bg-black/5 bg-opacity-50  flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-100 h-125 max-w-md items-center justify-center">
              <h3 className="text-xl font-semibold mb-4">
                {isEditing ? "Update User" : "Add User"}
              </h3>
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => {
                    setOpen(false);
                    setIsEditing(false);
                    setSelectedUserId(null);
                  }}
                  className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300"
                >
                  &times;
                </button>
              </div>
              <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-xl p-6 space-y-4 max-w-md mx-auto relative"
              >
                <div className="absolute -top-12 right-2">
                  <button
                    onClick={() => {
                      setOpen(false);
                      setIsEditing(false);
                      setSelectedUserId(null);
                    }}
                    className="text-white text-2xl font-bold hover:text-gray-300 transition-colors duration-300 hover:cursor-pointer"
                  >
                    &times;
                  </button>
                </div>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={handleInputChange}
                  className="w-full text-white border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                  type="text"
                  name="avatar"
                  placeholder="Enter avatar URL"
                  value={form.avatar}
                  onChange={handleInputChange}
                  className="w-full text-white border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition
                  hover:cursor-pointer
                  duration-300
                  "
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {error?.message ? (
            <div className="text-red-700 bg-red-100 border border-red-300 p-4 rounded-lg col-span-full text-center">
              {error.message}
            </div>
          ) : (
            users?.map((user) => (
              <div
                key={user.id}
                className="bg-white shadow-md hover:shadow-xl   rounded-xl p-5 flex flex-col items-center text-center
                hover:bg-gray-50
                hover:cursor-pointer
                duration-300
               
               transition-transform
                "
              >
                {/* if image issue then placeholder */}
                <img
                  src={user.avatar || "https://gravatar.com/avatar?d=mp&f=y"}
                  alt={user.name}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />

                <div className="font-semibold text-lg text-gray-800">
                  {user.name}
                </div>

                <div className="text-sm text-gray-500 mt-1">ID: {user.id}</div>

                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => {
                      setOpen(true);
                      setIsEditing(true);
                      setSelectedUserId(user.id);

                      setForm({
                        name: user.name,
                        avatar: user.avatar,
                        id: user.id,
                      });
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300
                     hover:cursor-pointer
               hover:scale-105
                    "
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-800 transition-colors duration-300
                     hover:cursor-pointer
                     hover:scale-105
                    "
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
