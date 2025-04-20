import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Added getDoc for checking user existence
import { auth, db } from "./firebase";

function LoginPage() {
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Authenticate the user
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user already exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        // If the user does not exist, add them to Firestore
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
        });
      }

      // Set cookies for UID and email
      document.cookie = `uid=${user.uid}; domain=enviroaitest.com; path=/`;
      document.cookie = `email=${user.email}; domain=enviroaitest.com; path=/`;

      //get redirect parameter
      const queryParams = new URLSearchParams(location.search);
      const redirectParam = queryParams.get("redirect");
      if(redirectParam === "3d") {
        window.location.href = "http://3d.enviroaitest.com/";
      } else {
        // Navigate to the home page
        navigate("/");
      }
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError(err.message);
    }
  };

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
