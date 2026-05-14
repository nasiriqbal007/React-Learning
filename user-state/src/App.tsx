import { useCallback, useMemo, useReducer, useState } from "react";
import { initialState } from "./UserReducer";
import userReducer from "./UserReducer";
import { Button } from "./components/Button";
import { Button2 } from "./components/Button2";

function App() {
  const users = [
    { id: 1, name: "Ali", email: "ali@example.com" },
    { id: 2, name: "Sara", email: "sara@example.com" },
    { id: 3, name: "Hassan", email: "hassan@example.com" },
    { id: 4, name: "Fatima", email: "fatima@example.com" },
    { id: 5, name: "Ahmed", email: "ahmed@example.com" },
  ];
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);
  const handleCount1 = () => {
    setCount1(count1 + 1);
  };
  const handleCount2 = () => {
    setCount2(count2 + 1);
  };
  const handleCount3 = useCallback(() => {
    setCount3((prev) => prev + 1);
  }, []);

  const hugeValue = useMemo(() => {
    console.log("Calculating huge value...");
    let val = 0;
    for (let i = 0; i < 1000000000; i++) {
      val += i * count1;
    }

    return val;
  }, [count1]);

  const [filter, setFilter] = useState<"all" | "active" | "inactive">("all");
  const [state, dispatch] = useReducer(userReducer, initialState);
  const filteredUsers = users.filter((user) => {
    const userState = state[user.id] || { active: true, show: true };

    if (filter === "active") return userState.active;
    if (filter === "inactive") return !userState.active;

    return true;
  });

  return (
    <div className="px-4 py-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <p className="text-green-400">Total Users: {users.length}</p>
      <div className="flex space-x-4 mt-4">
        <Button onClick={handleCount1}>Count 1: {count1}</Button>
        <Button onClick={handleCount2}>Count 2: {count2}</Button>
        <Button2 onClick={handleCount3} count={count3} />
      </div>
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <p className="text-gray-700">Huge Value: {hugeValue}</p>
      </div>
      <div className="overflow-x-auto">
        <div className="mb-4 flex items-center justify-end ">
          <label className="mr-4 font-medium">Filter:</label>
          <select
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value as "all" | "active" | "inactive")
            }
            className="border border-gray-300 rounded px-2 py-1"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => {
              const userState = state[user.id] || { active: true, show: true };

              return (
                <tr key={user.id}>
                  <td className="border px-4 py-2">{user.id}</td>

                  <td
                    className={`border px-4 py-2 ${
                      userState.active
                        ? "text-green-500"
                        : "text-gray-500 line-through"
                    }`}
                  >
                    {userState.show ? user.name : "Hidden"}
                  </td>

                  <td
                    className={`border px-4 py-2 ${
                      userState.active
                        ? "text-green-500"
                        : "text-gray-500 line-through"
                    }`}
                  >
                    {userState.show ? user.email : "Hidden"}
                  </td>

                  <td className="border px-4 py-2">
                    <button
                      onClick={() =>
                        dispatch({ type: "toggleShow", userId: user.id })
                      }
                      className="px-3 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      {userState.show ? "Hide" : "Show"}
                    </button>

                    <button
                      onClick={() => {
                        dispatch({ type: "toggleActive", userId: user.id });
                        console.log("clicked on render");
                      }}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      {userState.active ? "Active" : "Inactive"}
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4 text-red-500">
                  No Users Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
