import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const isLoggedIn = !!user;

  const handleDashboardClick = () => {
    if (!isLoggedIn) {
      alert('Please login to access the Dashboard.');
      navigate('/');
    } else {
      navigate(user.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); 
  };

  return (
    <nav className="navbar">
      <span className="nav-link" onClick={handleDashboardClick}>
        Dashboard
      </span>
      {isLoggedIn ? (
        <>
          <Link to={user.role === "admin" ? "/admin-profile" : "/profile"} className="nav-link">Profile</Link>
          <span onClick={handleLogout} className="nav-link logout-btn">Logout</span>
        </>
      ) : (
        <Link to="/login" className="nav-link">Login</Link>
      )}
    </nav>
  );
};

export default Navbar;
