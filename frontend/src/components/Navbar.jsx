import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="font-bold text-lg">PM System</Link>
        <nav className="hidden md:flex gap-3 text-sm text-gray-600">
          <Link to="/projects" className="hover:underline">Projects</Link>
          <Link to="/tasks" className="hover:underline">Tasks</Link>
          <Link to="/analytics" className="hover:underline">Analytics</Link>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {user ? (
          <>
            <div className="text-sm text-gray-700">{user.name} ({user.role})</div>
            <button onClick={logout} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Logout</button>
          </>
        ) : (
          <Link to="/" className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Login</Link>
        )}
      </div>
    </div>
  );
}

