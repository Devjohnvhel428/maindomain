import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

function Logout() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    const logout = async()=>{
      try {
            // Sign out the user using Firebase Authentication
            await signOut(auth);
            document.cookie = "uid=; domain=enviroaitest.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
            document.cookie = "email=; domain=enviroaitest.com; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
          } catch (error) {
            console.error("Error logging out:", error);
          }
      }
      const queryParams = new URLSearchParams(location.search);
      const targetParam = queryParams.get("target");
      logout();
      if(targetParam === "3d") {
        window.location.href = "http://enviroaitest.com/login?redirect=3d";
      } else {
        navigate("/login");
      }
  })

  return (
    <>
    </>
  );
}

export default Logout;
