import React from "react";
import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <div className="p-4 bg-white rounded shadow">
      <h3 className="font-bold">{project.name}</h3>
      <p className="text-sm text-gray-600">{project.description}</p>
      <div className="mt-2 text-xs text-gray-500">Status: {project.status}</div>
      <Link to={`/project/${project._id}`} className="mt-2 inline-block text-sm text-blue-600">Open</Link>
    </div>
  );
}
