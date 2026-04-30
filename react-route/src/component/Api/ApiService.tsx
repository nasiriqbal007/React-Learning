import baseApiUrl from "./BaseUrl";

const createUser = async (data: object) => {
  try {
    const r = await fetch(`${baseApiUrl}/users/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  } catch (e) {
    console.log(e);
  }
};

const updateUser = async (id: number, data: object) => {
  try {
    const r = await fetch(`${baseApiUrl}/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  } catch (e) {
    console.log(e);
  }
};
const deleteUser = async (id: number) => {
  try {
    const r = await fetch(`${baseApiUrl}/users/${id}`, {
      method: "DELETE",
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    return r.json();
  } catch (e) {
    console.log(e);
  }
};
export { createUser, updateUser, deleteUser };
