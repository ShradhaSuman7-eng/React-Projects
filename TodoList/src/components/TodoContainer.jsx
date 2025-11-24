import React, { useState } from "react";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (value) => {
    setInput(value);

    if (value.trim() !== "") {
      setClicked(true);
    } else {
      setClicked(false);
    }
  };

  const addTodo = () => {
    const value = input.trim();

    if (!value) return;

    if (isEditing) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].todo = value;
      setTodos(updatedTodos);
      setIsEditing(false);
      setEditIndex(null);
    } else {
      if (!todos.some((t) => t.todo === value)) {
        setTodos([...todos, { todo: value, isCompleted: false }]);
      }
    }

    setInput("");
    setClicked(false);
  };

  const handleTodoCompletion = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = {
      ...updatedTodos[index],
      isCompleted: !updatedTodos[index].isCompleted,
    };
    setTodos(updatedTodos);
  };

  const handleEditOfTodo = (index) => {
    setIsEditing(true);
    setEditIndex(index);
    setInput(todos[index].todo);
    setClicked(true);
  };

  const handleCancel = () => {
    setInput("");
    setClicked(false);
    setIsEditing(false);
    setEditIndex(null);
  };

  const handleDeleteTodo = (index) => {
    let allTodo = [...todos];
    allTodo = allTodo.filter((todo, i) => i !== index);
    setTodos(allTodo);
  };

  return (
    <div className="flex flex-col justify-center items-center ">
      <div className="justify-start items-start">
        <div className="flex flex-col gap-4  w-full">
          <div className="mt-8">
            <input
              type="text"
              placeholder="Enter your todo"
              value={input}
              className="border w-[500px] focus:border-2 border-blue-500 focus:outline-none p-2 rounded"
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>

          <div className="flex justify-start gap-4">
            <button
              onClick={addTodo}
              disabled={!clicked}
              className={`px-3 py-2 rounded-2xl font-semibold border transition-all duration-300 
        ${
          clicked
            ? "bg-blue-600 text-white hover:bg-blue-700 border-blue-700 shadow-md"
            : "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
        }`}
            >
              Submit
            </button>

            <button
              onClick={handleCancel}
              className={`px-3 py-2 rounded-2xl font-semibold border transition-all duration-300
        ${
          clicked
            ? "bg-blue-600 text-white hover:bg-blue-700  border-blue-700 shadow-md"
            : "bg-gray-300 text-gray-500 cursor-not-allowed border-gray-300"
        }`}
            >
              Cancel
            </button>
          </div>

          <p>
            <i>Double click on todo to toggle completion status</i>
          </p>
        </div>

        <div className="mt-4 flex flex-col  w-full">
          {todos.map((text, index) => (
            <div
              key={index}
              className="flex justify-between gap-3 mt-2 items-center w-full"
            >
              <div>
                <p
                  className={`${text.isCompleted ? "line-through" : ""}`}
                  onDoubleClick={() => handleTodoCompletion(index)}
                >
                  {text.todo}
                </p>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => handleEditOfTodo(index)}
                  className="bg-green-600 px-2 rounded"
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 px-2 rounded"
                  onClick={() => handleDeleteTodo(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
