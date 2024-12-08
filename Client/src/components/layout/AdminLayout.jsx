import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="bg-gray-50 h-screen flex">
      <Sidebar />
      <main className="bg-white m-5 w-full border shadow-xl rounded-lg p-10">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
