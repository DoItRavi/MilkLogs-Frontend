// src/routes/ConsumerIndexRedirect.jsx
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ConsumerIndexRedirect = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/consumer/dashboard");
    } else {
      navigate("/consumer/login");
    }
  }, [isAuthenticated, navigate]);

  return null;
};

export default ConsumerIndexRedirect;
