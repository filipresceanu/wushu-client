import React, { useState, useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import { useAuth } from "../../context/AuthProvider";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [redirect, setRedirect] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = axios
        .post(
          "https://localhost:7230/api/Account/login",
          JSON.stringify({
            username: name,
            password: password,
          }),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        )
        .then((response) => {
          const accessToken = response?.data?.token;
          const userId = response?.data?.userId;
          localStorage.setItem(
            "user",
            JSON.stringify({
              username: name,
              token: accessToken,
              userId: userId,
            })
          );

          setAuth({ username: name, token: accessToken });
        });
      navigate("/competition");
    } catch (error) {
      if (!error?.message) {
        setError("No Server Response");
      } else if (error.response?.status === 400) {
        setError("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login Failed");
      }
    }
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
      <h4>Log In</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group style={{ marginBottom: "20px" }}>
          <Form.Label>Enter your full name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
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
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
