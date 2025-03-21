import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [scrumTeams, setScrumTeams] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newScrum, setNewScrum] = useState({
    name: "",
    taskTitle: "",
    taskDescription: "",
    taskStatus: "To Do",
    assignedTo: "",
  });
  const [error, setError] = useState("");

  // Fetch scrum teams from db.json
  useEffect(() => {
    axios
      .get("http://localhost:3001/scrumTeams")
      .then((response) => setScrumTeams(response.data))
      .catch((error) => console.error("Error fetching scrum teams:", error));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleAddScrum = () => {
    setShowAddForm(true);
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewScrum({
      name: "",
      taskTitle: "",
      taskDescription: "",
      taskStatus: "To Do",
      assignedTo: "",
    });
    setError("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewScrum({ ...newScrum, [name]: value });
  };

  const handleCreateScrum = async () => {
    if (
      !newScrum.name ||
      !newScrum.taskTitle ||
      !newScrum.taskDescription ||
      !newScrum.assignedTo
    ) {
      setError("All fields are required.");
      return;
    }

    const newTeam = {
      id: Date.now(),
      name: newScrum.name,
      tasks: [
        {
          id: Date.now(),
          title: newScrum.taskTitle,
          description: newScrum.taskDescription,
          status: newScrum.taskStatus,
          assignedTo: Array.isArray(newScrum.assignedTo) ? newScrum.assignedTo : [newScrum.assignedTo],
        },
      ],
    };

    try {
      await axios.post("http://localhost:3001/scrumTeams", newTeam);
      setScrumTeams([...scrumTeams, newTeam]);
      setShowAddForm(false);
      setNewScrum({
        name: "",
        taskTitle: "",
        taskDescription: "",
        taskStatus: "To Do",
        assignedTo: "",
      });
      setError("");
    } catch (err) {
      setError("An error occurred while creating the scrum team.");
    }
  };

  const handleGetDetails = (team) => {
    navigate(`/scrum-details/${team.id}`, { state: { team } });
  };

  return (
    <div className="admin-dashboard">
      <Navbar />

      {/* Scrum Teams Section */}
      <h2 className="scrum-heading">Scrum Teams</h2>
      <button className="add-scrum-btn" onClick={handleAddScrum}>
        Add New Scrum
      </button>

      {showAddForm && (
        <>
          <div className="add-scrum-overlay" onClick={handleCancel}></div>
          <div className="add-scrum-form">
            <h3>Add New Scrum</h3>
            <input
              type="text"
              name="name"
              value={newScrum.name}
              onChange={handleInputChange}
              placeholder="Enter scrum name"
            />
            <input
              type="text"
              name="taskTitle"
              value={newScrum.taskTitle}
              onChange={handleInputChange}
              placeholder="Enter task title"
            />
            <input
              type="text"
              name="taskDescription"
              value={newScrum.taskDescription}
              onChange={handleInputChange}
              placeholder="Enter task description"
            />
            <select
              name="taskStatus"
              value={newScrum.taskStatus}
              onChange={handleInputChange}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
            {/* <input
              type="text"
              name="assignedTo"
              value={newScrum.assignedTo}
              onChange={handleInputChange}
              placeholder="Enter user email"
            /> */}
            <input
              type="text"
              name="assignedTo"
              value={newScrum.assignedTo}
              onChange={(e) =>
                setNewScrum({
                  ...newScrum,
                  assignedTo: e.target.value
                    .split(",")
                    .map((email) => email.trim()),
                })
              }
              placeholder="Enter user emails, separated by commas"
            />

            {error && <p className="error-message">{error}</p>}
            <button onClick={handleCreateScrum}>Create Scrum</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        </>
      )}

      <ul className="scrum-list">
        {scrumTeams.map((team) => (
          <li key={team.id} className="scrum-item">
            <span>{team.name}</span>
            <button
              className="details-btn"
              onClick={() => handleGetDetails(team)}
            >
              Get Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
