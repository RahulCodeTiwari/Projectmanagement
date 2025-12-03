import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ProjectCard from "../components/ProjectCard";

export default function Dashboard() {
  const { authFetch } = useAuth();
  const [projects, setProjects] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    try {
      const res = await authFetch("/api/projects");
      if (!res.ok) return;
      const data = await res.json();
      setProjects(data);
    } catch (err) {}
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {projects.slice(0, 6).map(p => <ProjectCard key={p._id} project={p} />)}
      </div>
    </div>
  );
}
