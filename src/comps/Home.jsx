import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Create from './Create';

const Home = () => {
  const [todos, setTodos] = useState([]);

  // Fetch tasks
  useEffect(() => {
    axios
      .get('http://localhost:5000/get')
      .then((result) => setTodos(result.data))
      .catch((err) => console.log(err));
  }, []);

  // Mark task as completed
  const handleComplete = (id, completed) => {
    axios
      .put(`http://localhost:5000/update/${id}`, { completed: !completed })
      .then((result) => {
        // Reload the page after update
        window.location.reload(); // This will reload the page
      })
      .catch((err) => console.log(err));
  };

  // Delete task
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5000/delete/${id}`)
      .then(() => {
        // Reload the page after delete
        window.location.reload(); // This will reload the page
      })
      .catch((err) => console.log(err));
  };


  return (
    <div className="flex flex-col items-center gap-8 p-4 sm:p-8 lg:p-12">
      <h2 className="font-thin text-3xl sm:text-4xl md:text-5xl">
        To-Do List
      </h2>
      <Create setTodos={setTodos} />

      <div className="flex flex-col items-center mt-5 w-full max-w-lg sm:max-w-xl">
        {todos.length === 0 ? (
          <h1 className="text-lg sm:text-xl">No records</h1>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="flex justify-between items-center w-full p-2 border-b border-gray-300 sm:px-4 md:px-6"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleComplete(todo._id, todo.completed)}
                  className="mr-2 w-4 h-4 sm:w-5 sm:h-5"
                />
                <span
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? 'gray' : 'black',
                  }}
                  className="text-sm sm:text-base"
                >
                  {todo.task}
                </span>
              </div>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-red-500 ml-2 text-sm sm:text-base"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
