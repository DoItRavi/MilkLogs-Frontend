// File: src/routes/ProtectedRoute.jsx
import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, status } = useSelector((state) => state.auth);
  const location = useLocation();

  //  While we’re reloading the page and fetching the current user,
  //    don’t render anything (or show a spinner)
  if (status === "loading") {
    return null;
  }

  //  If not logged in, redirect to /consumer/login,
  //    and save the attempted URL in location.state.from
  if (!isAuthenticated) {
    return (
      <Navigate
        to="/consumer/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  // 3️⃣ Otherwise, render the protected component
  return children;
}
