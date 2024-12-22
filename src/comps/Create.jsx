import React, { useState } from 'react';
import axios from 'axios';

const Create = () => {
  const [task, setTask] = useState('');

  // Handle adding the task when the "Add" button is clicked or Enter is pressed
  const handleAdd = () => {
    if (task.trim()) {
      axios
        .post('http://localhost:5000/add', { task: task })
        .then(() => {
          setTask(''); // Clear the input after adding
          location.reload(); // Refresh the page to get the updated task list
        })
        .catch((err) => console.log(err));
    }
  };

  // Handle keypress to detect Enter key and trigger handleAdd
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd(); // Call the add function if Enter key is pressed
    }
  };

  return (
    <div className="w-full items-center justify-center">
      <div className="flex flex-col md:flex-row w-full gap-2 justify-center items-center">
        <input
          onChange={(e) => setTask(e.target.value)} // Update task on input change
          onKeyDown={handleKeyPress} // Handle Enter key press
          className="bg-transparent rounded-md placeholder:text-gray-500 px-3 border border-gray-500 focus:outline-none py-1.5"
          type="text"
          placeholder="Enter the task"
          value={task} // Set input value from state
        />
        <button
          onClick={handleAdd} // Add task when button is clicked
          className="w-1/2 md:w-1/12 rounded-md py-1.5 bg-black text-white"
          type="submit"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default Create;
