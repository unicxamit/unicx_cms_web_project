import React from "react";

import Dashboard_sidebar from "./Dashboard_sidebar";
import { Outlet } from "react-router-dom";
import "../services/serviceStyle/admin_dashboard.css";
const AdminDashboard = () => {
  return (
    <div className="dashboard_layouts">

      <div className="sidebar_wrappers">
        <Dashboard_sidebar />
      </div>

      <div className="content_wrappers">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminDashboard;
