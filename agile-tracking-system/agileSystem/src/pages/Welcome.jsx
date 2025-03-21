import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import "../App.css";

const WelcomePage = () => {
  const [scrumTeams, setScrumTeams] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch scrum teams from db.json
  useEffect(() => {
    axios
      .get("http://localhost:3001/scrumTeams")
      .then((response) => setScrumTeams(response.data))
      .catch((error) => {
        console.error("Error fetching scrum teams:", error);
        setError("Failed to load Scrum Teams.");
      });
  }, []);

  // Check if user is logged in
  const handleGetDetails = (team) => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate(`/scrum-details/${team.id}`, { state: { team } });
    } else {
      alert("Please log in to view details.");
      navigate("/");
    }
  };

  return (
    <div className="welcome-page">
      <Navbar />
      <h2 className="scrum-heading">Scrum Teams</h2>

      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}

      {/* Display Scrum Teams */}
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

export default WelcomePage;
