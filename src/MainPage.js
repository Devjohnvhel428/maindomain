import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function MainPage() {
  const handleLogout = async () => {
    try {
      // Sign out the user using Firebase Authentication
      await signOut(auth);
      document.cookie = "uid=; domain=enviroaitest.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
      document.cookie = "email=; domain=enviroaitest.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleRedirect = () => {
    // Open localhost:3001 in a new tab
    window.open("http://3d.enviroaitest.com/", "_blank");
  };

  return (
    <div>
      <h1>Welcome to the Main Page!</h1>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleRedirect}>Go to 3D</button>
    </div>
  );
}

export default MainPage;
