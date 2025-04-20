import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.js";
import LoginPage from "./LoginPage.js";
import SignupPage from "./SignupPage.js";
import MainPage from "./MainPage.js";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={user ? <MainPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={!user ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/home" />}
        />
        <Route
          path="/signup"
          element={!user ? <SignupPage /> : <Navigate to="/home" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
