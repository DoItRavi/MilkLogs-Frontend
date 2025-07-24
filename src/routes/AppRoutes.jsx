// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import ConsumerRoutes from "./ConsumerRoutes";
import LandingPage from "@/pages/LandingPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/consumer/*" element={<ConsumerRoutes />} />
    </Routes>
  );
};

export default AppRoutes;
