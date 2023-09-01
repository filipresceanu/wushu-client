import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post(
        "https://localhost:7230/api/Account/register",
        JSON.stringify({
          username: name,
          password: password,
          email: email,
          redirect: redirect,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      if (!error?.message) {
        setError("No Server Response");
      } else if (error.response?.status === 400) {
        setError("Missing Username or Password");
      } else {
        setError("SignUp Failed");
      }
    }
  };

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "block",
        width: 700,
        padding: 30,
        color: "white",
      }}
    >
      <h4>Sign Up</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{ marginBottom: "20px" }}>
          <Form.Label>Enter your full name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-1">
          <Form.Label>Enter your email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your your email address"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "20px" }}>
          <Form.Label>Enter your password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" style={{ marginRight: "20px" }}>
          Submit
        </Button>
        <Button variant="info" onClick={navigateToLogin}>
          Already have an account? LogIn
        </Button>
      </Form>
    </div>
  );
}

export default SignUp;
