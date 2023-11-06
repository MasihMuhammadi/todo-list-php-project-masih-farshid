import  { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState(-1);
  const [editedTask, setEditedTask] = useState('');
  const [error, setError] = useState('');

  const addTask = () => {
    if (newTask.trim().length < 3 || !isNaN(newTask.trim())) {
      setError('Task must be at least 3 characters long and not just a number.');
      return;
    }
  
    setError('');
  
    // Send a POST request to add the task
    axios.post('http://localhost:80/addTask.php', { title: newTask, message: newTask })
      .then(response => {
        // Handle the response here if needed
        // For example, you can retrieve the new task's ID from the response.
        setTasks([...tasks, { title: newTask, message: newTask, id: response.data.id }]);
        setNewTask('');
      })
      .catch(error => console.log(error));
  }
  

  
  const editTask = (index) => {
    setEditingTaskIndex(index);
    setEditedTask(tasks[index]);
  }

  const updateTask = () => {
    if (editedTask.trim().length < 3 || !isNaN(editedTask.trim())) {
      setError('Task must be at least 3 characters long and not just a number.');
      return;
    }
  
    setError('');
  
    // Send a POST request to update the task
    axios.post('http://localhost:80/updateTask.php', { id: tasks[editingTaskIndex].id, title: editedTask, message: editedTask })
      .then(() => {
        const updatedTasks = [...tasks];
        updatedTasks[editingTaskIndex] = { ...updatedTasks[editingTaskIndex], title: editedTask, message: editedTask };
        setTasks(updatedTasks);
        setEditingTaskIndex(-1);
      })
      .catch(error => console.error(error.message));
  }
  
  const deleteTask = (index) => {
    const taskId = tasks[index].id;
  
    // Send a POST request to delete the task
    axios.post('http://localhost:80/deleteTask.php', { id: taskId })
      .then(() => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
      })
      .catch(error => console.error(error));
  }
  
  useEffect(() => {
    axios.get('http://localhost:80/tasks.php')
      .then(response => setTasks(response.data));
  }, []);

  return (
    <div>
      <h1 className="text-center">To-Do List</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className=""
          placeholder="Enter a task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-primary" onClick={addTask}>Add</button>
        </div>
      </div>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {tasks.map((task, index) => (
          <li key={index} className="list-group-item">
            {index === editingTaskIndex ? (
              <input
                type="text"
                className="form-control"
                value={editedTask}
                onChange={(e) => setEditedTask(e.target.value)}
              />
            ) : (
              task
            )}
            {index === editingTaskIndex ? (
              <button className="btn float-end btn-success btn-sm ml-2" onClick={updateTask}>Update</button>
            ) : (
              <button className="btn btn-secondary mx-2 float-end btn-sm ml-2" onClick={() => editTask(index)}>Edit</button>
            )}
            <button className="btn btn-danger float-end mx-2 btn-sm ml-2" onClick={() => deleteTask(index)}>Delete</button> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
