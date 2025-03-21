import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return email.includes("@");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please include an '@' in the email address.");
      return;
    }

    try {
      // Check if the email is already registered
      const response = await axios.get("http://localhost:3001/users", {
        params: { email },
      });

      if (response.data.length > 0) {
        setError("Email already exists. Please use a different email.");
        return;
      }

      // Create a new user
      const newUser = {
        id: Date.now(), // Generate a unique ID
        name,
        email,
        password,
        role: "user", // Default role is 'user'
      };

      await axios.post("http://localhost:3001/users", newUser);

      // Redirect to the home page after successful sign-up
      navigate("/user-dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="signup">
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
