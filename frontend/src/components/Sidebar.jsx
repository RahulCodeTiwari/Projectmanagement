import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-50 p-4 border-r hidden md:block">
      <ul className="space-y-2 text-sm text-gray-700">
        <li><Link to="/dashboard" className="block py-2 px-2 rounded hover:bg-white">Dashboard</Link></li>
        <li><Link to="/projects" className="block py-2 px-2 rounded hover:bg-white">Projects</Link></li>
        <li><Link to="/tasks" className="block py-2 px-2 rounded hover:bg-white">Tasks</Link></li>
        <li><Link to="/analytics" className="block py-2 px-2 rounded hover:bg-white">Analytics</Link></li>
        <li><Link to="/admin" className="block py-2 px-2 rounded hover:bg-white">Admin Panel</Link></li>
      </ul>
    </aside>
  );
}
