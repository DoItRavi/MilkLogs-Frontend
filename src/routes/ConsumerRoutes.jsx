// file: src/routes/CustomerRoutes.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";

import ProtectedRoute from "./ProtectedRoute";
import ConsumerIndexRedirect from "./ConsumerIndexRedirect";
import DashboardHome from "../pages/dashboard/DashboardHome";
import AddEntry from "../pages/dashboard/AddEntry";
import UpdateEntry from "../pages/dashboard/UpdateEntry";
import CalculateBill from "../pages/dashboard/CalculateBill";
import ViewAnalytics from "../pages/dashboard/ViewAnalytics";
import UserProfile from "../pages/dashboard/UserProfile";
import DashboardWelcomePage from "../pages/dashboard/DashboardWelcomePage";

const CustomerRoutes = () => (
  <Routes>
    <Route path="/" element={<ConsumerIndexRedirect />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      }
    >
      <Route index element={<DashboardWelcomePage />} />
      <Route path="home" element={<DashboardHome />} />
      <Route path="profile" element={<UserProfile />} />
      <Route path="analytics" element={<ViewAnalytics />} />
      <Route path="add-entry" element={<AddEntry />} />
      <Route path="update-entry" element={<UpdateEntry />} />
      <Route path="calculate-bill" element={<CalculateBill />} />
    </Route>
  </Routes>
);

export default CustomerRoutes;
