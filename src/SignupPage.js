import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { auth } from "./firebase";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      const user = data.user;
      // Request a custom token from the backend using axios
      const response = await axios.post("http://localhost:5000/generateCustomToken", {
        uid: user.uid,
      });
      const { customToken } = response.data;
      // Set cookies for UID and email
      if(process.env.REACT_APP_ENVIRONMENT === "dev") {
        document.cookie = `authToken=${customToken}; path=/; domain=localhost;`;
      } else {
        document.cookie = `authToken=${customToken}; path=/; domain=enviroaitest.com;`;
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default SignupPage;
