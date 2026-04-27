import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState("");

  const completed = false;
  const handleChange = (e) => {
    setText(e.target.value);

    const validInput = /^[a-zA-Z0-9 ]+$/.test(e.target.value);
    if (!validInput) {
      if (e.target.value.trim() === "") {
        setError("");
      } else {
        setError("Only numbers and letters and spaces are allowed.");
      }
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    if (!text.trim()) return;
    if (editIndex !== null) {
      // Update the existing todo item at the editIndex

      const updateTodo = todo.map(
        (item, index) =>
          //updatetodo is a new array created by mapping over the existing todo array. For each item in the todo array, it checks if the current index matches the editIndex. If it does, it creates a new object with the updated text while keeping the other properties (like completed) unchanged. If it doesn't match, it simply returns the original item.
          index === editIndex ? { ...item, text } : item,
        // The spread operator ...item is used to create a new object that contains all the properties of the original item, and then the text property is updated with the new value. This ensures that only the text is changed while preserving the completed status and any other properties of the todo item.
      );

      // After creating the updated todo array, it calls setTodo(updateTodo) to update the state with the new array, which will trigger a re-render of the component and reflect the changes in the UI.
      setTodo(updateTodo);

      setEditIndex(null);
    } else {
      // Add a new todo item to the list by creating a new array that includes all existing items and the new item with its text and completed status.
      setTodo([...todo, { text, completed }]);
    }

    setText("");
  };

  const editTodo = (index) => {
    setText(todo[index].text);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    // The deleteTodo var is crated by filtering the existing todo array. It iterates through each iteam and keeps only those items whose index does not match the index of the item to be deleted. This effectively removes the item at the specified index from the array.
    const deleteTodo = todo.filter((item, i) => i !== index);
    setTodo(deleteTodo);
  };

  const toggleComplete = (index) => {
    // if completed is false then it will be true and if it is true then it will be false
    const updatedTodo = todo.map((item, i) =>
      i === index ? { ...item, completed: !item.completed } : item,
    );
    setTodo(updatedTodo);
  };

  return (
    <>
      <main>
        <h1>Todo App</h1>
        <div className="input-row">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            required="true"
          />
          <span className={error ? "error-mesage" : ""}></span>

          <button onClick={handleSubmit} disabled={!!error}>
            {editIndex !== null ? "update" : "Add"}
          </button>
        </div>
        {error && <div className="error-message">{error}</div>}
        <ul>
          {todo.length === 0 ? (
            <li>No todo found. Please add some todos.</li>
          ) : (
            todo.map((item, index) => (
              <li key={index} className="div-row">
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleComplete(index)}
                />

                <span className={item.completed ? "completed" : ""}>
                  {item.text}
                </span>

                <button onClick={() => handleDelete(index)}>Delete</button>
                <button onClick={() => editTodo(index)}>Edit</button>
              </li>
            ))
          )}
        </ul>
      </main>
    </>
  );
}

export default App;
