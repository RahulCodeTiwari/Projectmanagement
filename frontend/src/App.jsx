import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/projectDetails";
import Tasks from "./pages/Tasks";
import AdminPanel from "./pages/AdminPanel";
import Analytics from "./pages/Analytics";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useAuth } from "./hooks/useAuth";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      {user && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {user && <Navbar />}

        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
            <Route path="/projects" element={user ? <Projects /> : <Navigate to="/" />} />
            <Route path="/project/:id" element={user ? <ProjectDetails /> : <Navigate to="/" />} />
            <Route path="/tasks" element={user ? <Tasks /> : <Navigate to="/" />} />
            <Route path="/admin" element={user ? <AdminPanel /> : <Navigate to="/" />} />
            <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/" />} />
            <Route path="*" element={<div className="p-6">Page not found</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

