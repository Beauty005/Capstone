import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { Card, CardContent } from "./components/Card";
import { Button } from "./components/Button";
import "./App.css";

const teams = [
  { id: 1, name: "Scrum Team A" },
  { id: 2, name: "Scrum Team B" },
  { id: 3, name: "Scrum Team C" },
];

const WelcomePage = () => (
  <div className="container center">
    <h1 className="title">Welcome to Agile Track System</h1>
    <p className="subtitle">Efficient task and team management for Agile projects</p>
    <Link to="/login">
      <Button>Get Started</Button>
    </Link>
  </div>
);

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "admin@example.com" && password === "admin123") {
      navigate("/dashboard"); // Redirect to Dashboard on successful login
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container center">
      <Card className="card">
        <CardContent>
          <h2 className="title">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <Button onClick={handleLogin}>Login</Button>
          <p className="text">Don't have an account? <Link to="/signup" className="link">Sign Up</Link></p>
        </CardContent>
      </Card>
    </div>
  );
};

const SignUpPage = () => (
  <div className="container center">
    <Card className="card">
      <CardContent>
        <h2 className="title">Sign Up</h2>
        <input type="text" placeholder="Name" className="input" />
        <input type="email" placeholder="Email" className="input" />
        <input type="password" placeholder="Password" className="input" />
        <Button>Sign Up</Button>
      </CardContent>
    </Card>
  </div>
);

const Dashboard = () => (
  <div className="container">
    <h1 className="title">Scrum Teams</h1>
    <div className="grid">
      {teams.map((team) => (
        <Card key={team.id} className="card">
          <CardContent>
            <h2 className="subtitle">{team.name}</h2>
            <Link to={`/team/${team.id}`}>
              <Button>Get Details</Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const Profiles = () => <h2 className="container title">User Profiles</h2>;
const TeamDetails = ({ id }) => <h2 className="container title">Scrum Details for Team {id}</h2>;
const Logout = () => <h2 className="container title">Logging out...</h2>;

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <Link to="/">Dashboard</Link>
          <Link to="/profiles">Profiles</Link>
          <Link to="/logout">Logout</Link>
        </nav>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route path="/team/:id" element={<TeamDetails />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;