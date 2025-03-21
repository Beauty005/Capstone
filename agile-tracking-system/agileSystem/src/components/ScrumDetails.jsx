import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const ScrumDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const team = location.state?.team;
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
  const [tasks, setTasks] = useState(team?.tasks || []);

  if (!team) {
    return <p>No team details available.</p>;
  }

  // Handle status change for admins
  const handleStatusChange = async (taskId, newStatus) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);

    try {
      // Find the updated team
      const updatedTeam = { ...team, tasks: updatedTasks };

      // Update the scrum team in db.json
      await axios.put(`http://localhost:3001/scrumTeams/${team.id}`, updatedTeam);
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="scrum-details">
      <Navbar />
      <h2 className="scrum-heading">{team.name} - Task Details</h2>
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p>
                <strong>Description:</strong> {task.description}
              </p>
              <p>
                <strong>Assigned To:</strong>
              </p>
              <ul>
                {(Array.isArray(task.assignedTo) ? task.assignedTo : [task.assignedTo]).map((email, index) => (
                  <li key={index}>{email}</li>
                ))}
              </ul>

              {isAdmin ? (
                <div>
                  <label><strong>Status:</strong></label>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              ) : (
                <p>
                  <strong>Status:</strong> {task.status}
                </p>
              )}
            </li>
          ))
        ) : (
          <p>No tasks available for this team.</p>
        )}
      </ul>
      <button className="back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default ScrumDetails;
