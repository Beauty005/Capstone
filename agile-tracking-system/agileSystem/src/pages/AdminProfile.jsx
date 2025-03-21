import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";

const AdminProfile = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/users")
      .then((response) => setUsers(response.data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = () => {
    setShowForm(true); // Open modal
    setError("");
  };

  const handleCancel = () => {
    setShowForm(false); // Close modal
    setError("");
  };

  const handleCreateUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      setError("All fields are required.");
      return;
    }

    axios
      .post("http://localhost:3001/users", newUser)
      .then(() => {
        setUsers([...users, newUser]);
        setShowForm(false); // Close modal
      })
      .catch(() => setError("An error occurred while adding the user."));
  };

  const handleGetHistory = (user) => {
    axios.get("http://localhost:3001/scrumTeams").then((response) => {
      const userTasks = response.data
        .flatMap((team) => team.tasks)
        .filter((task) => task.assignedTo.includes(user.email));
      setTasks(userTasks);
      setSelectedUser(user);
    });
  };

  return (
    <div className="admin-profile-container">
      <Navbar />
      <div className="header-section">
        <h2 className="profile-header">User Profiles</h2>
        <button className="add-user-btn" onClick={handleAddUser}>
          Add New User
        </button>
      </div>

      <div className="admin-content">
        {/* User List */}
        <ul className="user-list">
          {users
            .filter((user) => user.role !== "admin") // Show only non-admin users
            .map((user) => (
              <li key={user.id} className="user-item">
                <p>
                  <strong>Name:</strong> {user.name}
                </p>
                <p>
                  <strong>Email:</strong> {user.email}
                </p>
                <button
                  className="history-btn"
                  onClick={() => handleGetHistory(user)}
                >
                  Get History
                </button>
              </li>
            ))}
        </ul>
      </div>

      {/* Modal Form for Adding User */}
      {showForm && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Add New User</h3>
            <input
              type="text"
              name="name"
              value={newUser.name}
              onChange={handleInputChange}
              placeholder="Enter name"
            />
            <input
              type="email"
              name="email"
              value={newUser.email}
              onChange={handleInputChange}
              placeholder="Enter email"
            />
            <input
              type="password"
              name="password"
              value={newUser.password}
              onChange={handleInputChange}
              placeholder="Enter password"
            />
            <select
              name="role"
              value={newUser.role}
              onChange={handleInputChange}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleCreateUser}>Create User</button>
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Task History */}
      {selectedUser && (
        <div className="task-history">
          <h3>Tasks Worked By {selectedUser.name}</h3>
          <ul>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <li key={task.id}>
                  <p>
                    <strong>Title:</strong> {task.title}
                  </p>
                  <p>
                    <strong>Description:</strong> {task.description}
                  </p>
                  <p>
                    <strong>Status:</strong> {task.status}
                  </p>
                </li>
              ))
            ) : (
              <p>No tasks assigned.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;
