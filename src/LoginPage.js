import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, browserLocalPersistence, setPersistence } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import axios from "axios";
import { auth } from "./firebase";

function LoginPage() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Authenticate the user
      await setPersistence(auth, browserLocalPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Request a custom token from the backend using axios
      const response = await axios.post("http://enviroaitest.com:5000/generateCustomToken", {
        uid: user.uid,
      });
      const { customToken } = response.data;
      // Set cookies for UID and email
      if(process.env.REACT_APP_ENVIRONMENT === "dev") {
        document.cookie = `authToken=${customToken}; path=/; domain=localhost;`;
      } else {
        document.cookie = `authToken=${customToken}; path=/; domain=enviroaitest.com;`;
      }

      //get redirect parameter
      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      const targetParam = queryParams.get("target");
      if(redirectParam === "3d" || targetParam === "3d") {
        if(process.env.REACT_APP_ENVIRONMENT === "dev") {
          window.location.href = "http://localhost:5173";
        } else {
          window.location.href = "http://3d.enviroaitest.com/";
        }
      } else {
        // Navigate to the home page
        navigate("/");
      }
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError(err.message);
    }
  };

  useEffect(()=>{
    const logout = async()=>{
      try {
            // Sign out the user using Firebase Authentication
            await signOut(auth);
            if(process.env.REACT_APP_ENVIRONMENT === "dev") {
              document.cookie = `authToken=; path=/; domain=localhost;  expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
            } else {
              document.cookie = `authToken=; path=/; domain=enviroaitest.com;  expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
            }
          } catch (error) {
            console.error("Error logging out:", error);
          }
      }
      const queryParams = new URLSearchParams(location.search);
      const targetParam = queryParams.get("target");
      if(targetParam === "3d") {
        logout();
      }
  })

  return (
    <div>
      <h1>Login</h1>
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
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;
