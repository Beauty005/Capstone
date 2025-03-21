import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
          <p className="text">
            Don't have an account? <Link to="/signup" className="link">Sign Up</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
