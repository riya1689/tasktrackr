import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ title: '', status: 'To Do' });

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:5000/api/tasks');
    setTasks(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/tasks', formData);
    setFormData({ title: '', status: 'To Do' });
    fetchTasks(); // refresh the list
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
  <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>TaskTrackr</h1>

  <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
    <input
      type="text"
      placeholder="Enter task title"
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
      required
      style={{ padding: '8px', marginRight: '10px', width: '200px' }}
    />
    <select
      value={formData.status}
      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
      style={{ padding: '8px', marginRight: '10px' }}
    >
      <option value="To Do">To Do</option>
      <option value="Done">Done</option>
    </select>
    <button type="submit" style={{ padding: '8px 12px', cursor: 'pointer' }}>
      Add Task
    </button>
  </form>

  <ul>
    {tasks.map((task) => (
      <li
        key={task._id}
        style={{
          marginBottom: '10px',
          fontSize: '18px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <span style={{ marginRight: '10px' }}>{task.title} –</span>

        <select
          value={task.status}
          onChange={async (e) => {
            await axios.put(`http://localhost:5000/api/tasks/${task._id}`, {
              status: e.target.value,
            });
            fetchTasks();
          }}
          style={{ padding: '4px', marginRight: '10px' }}
        >
          <option value="To Do">To Do</option>
          <option value="Done">Done</option>
        </select>

        <button
          onClick={async () => {
            await axios.delete(`http://localhost:5000/api/tasks/${task._id}`);
            fetchTasks();
          }}
          style={{
            padding: '4px 8px',
            color: '#fff',
            backgroundColor: '#e74c3c',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          ❌
        </button>
      </li>
    ))}
  </ul>
</div>
);
}

export default App;
