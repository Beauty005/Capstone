import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [scrumTeams, setScrumTeams] = useState([]); // State for storing Scrum Teams
  const [error, setError] = useState("");

  // Fetch scrum teams from db.json
  useEffect(() => {
    axios
      .get("http://localhost:3001/scrumTeams")
      .then((response) => {
        setScrumTeams(response.data)
      })
      .catch((error) => {
        console.error("Error fetching scrum teams:", error);
        setError("Failed to load scrum teams. Please try again later.");
      });
  }, []);

  // Navigate to Scrum Details
  const handleGetDetails = (team) => {
    console.log("team --> ", team);
    navigate(`/scrum-details/${team.id}`, { state: { team } });
  };

  console.log("scrum teams ====> ", scrumTeams)

  return (
    <div className="user-dashboard">
      <Navbar />
  
      {/* Scrum Teams Section */}
      <h2 className="scrum-heading">Scrum Teams</h2>
  
      {/* Display Error Message if Fetch Fails */}
      {error && <p className="error-message">{error}</p>}
      <ul className="scrum-list">
        {scrumTeams.length > 0 ? (
          scrumTeams.map((team) => (
            <li key={team.id} className="scrum-item">
              <span>{team.name}</span>
              <button className="details-btn" onClick={() => handleGetDetails(team)}>
                Get Details
              </button>
            </li>
          ))
        ) : (
          <p>Loading scrum teams...</p>
        )}
      </ul>
    </div>
  );
  
};

export default UserDashboard;
