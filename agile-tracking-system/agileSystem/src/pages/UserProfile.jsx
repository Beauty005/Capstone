import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (!user) {
      alert("Please log in to view your profile.");
      navigate("/login");
      return;
    }

    // Fetch scrum teams and filter tasks assigned to the logged-in user
    axios
      .get("http://localhost:3001/scrumTeams")
      .then((response) => {
        const userTasks = response.data
          .flatMap((team) => team.tasks)
          .filter((task) => 
            Array.isArray(task.assignedTo) 
              ? task.assignedTo.includes(user.email) 
              : task.assignedTo === user.email
          );

        setTasks(userTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  return (
    <div className="profile-container">
      <Navbar />
      <h2 className="profile-heading">User Profiles</h2>
      <h3 className="task-heading">Tasks Worked By {user.name}</h3>
      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              <h3>{task.title}</h3>
              <p><strong>Description:</strong> {task.description}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Assigned Users:</strong> {Array.isArray(task.assignedTo) ? task.assignedTo.join(", ") : task.assignedTo}</p>
            </li>
          ))
        ) : (
          <p>No tasks assigned to you.</p>
        )}
      </ul>
    </div>
  );
};

export default Profile;
