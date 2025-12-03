import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const { authFetch } = useAuth();
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await authFetch("/api/projects");
    if (res.ok) setProjects(await res.json());
  }

  async function handleCreate(e) {
    e.preventDefault();
    const res = await authFetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) { setForm({ name: "", description: "" }); load(); }
  }

  return (
    <div className="p-4 grid md:grid-cols-3 gap-4">
      <div className="md:col-span-1 p-4 bg-white rounded shadow">
        <h3 className="font-bold mb-2">Create Project</h3>
        <form onSubmit={handleCreate} className="space-y-2">
          <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Project name" className="w-full p-2 border rounded" />
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full p-2 border rounded" />
          <button className="px-3 py-2 bg-blue-600 text-white rounded">Create</button>
        </form>
      </div>

      <div className="md:col-span-2">
        <div className="grid md:grid-cols-2 gap-3">
          {projects.map(p => <ProjectCard key={p._id} project={p} />)}
        </div>
      </div>
    </div>
  );
}
