import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const AdminScrumDetails = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [team, setTeam] = useState(state?.team);
  const [error, setError] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const updatedTasks = team.tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );

    const updatedTeam = { ...team, tasks: updatedTasks };

    try {
      await axios.put(`http://localhost:3001/scrumTeams/${team.id}`, updatedTeam);
      setTeam(updatedTeam);
    } catch (err) {
      setError('An error occurred while updating the task status.');
    }
  };

  if (!team) {
    return <div>No team data found.</div>;
  }

  return (
    <div>
      {/* Navigation Menu */}
      <Navbar />

      {/* Scrum Team Details */}
      <h2>Scrum Details for {team.name}</h2>

      <h3>Tasks:</h3>
      <ul>
        {team.tasks.map((task) => (
          <li key={task.id}>
            <strong>{task.title}</strong>: {task.description} (Status:
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            )
          </li>
        ))}
      </ul>

      <h3>Users:</h3>
      <ul>
        {team.users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>: {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminScrumDetails;