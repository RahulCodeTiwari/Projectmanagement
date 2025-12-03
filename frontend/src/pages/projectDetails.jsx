import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProjectDetails() {
  const { id } = useParams();
  const { authFetch } = useAuth();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [taskForm, setTaskForm] = useState({ title: "", description: "" });

  useEffect(() => { load(); }, [id]);

  async function load() {
    const pRes = await authFetch(`/api/projects/${id}`);
    if (pRes.ok) setProject(await pRes.json());
    const tRes = await authFetch(`/api/tasks?project=${id}`);
    if (tRes.ok) setTasks(await tRes.json());
  }

  async function submitTask(e) {
    e.preventDefault();
    const res = await authFetch("/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...taskForm, project: id })
    });
    if (res.ok) { setTaskForm({ title: "", description: "" }); load(); }
  }

  if (!project) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">{project.name}</h2>
      <p className="text-sm text-gray-600">{project.description}</p>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Create Task</h3>
          <form onSubmit={submitTask} className="space-y-2">
            <input value={taskForm.title} onChange={e => setTaskForm({ ...taskForm, title: e.target.value })} placeholder="Task title" className="w-full p-2 border rounded" />
            <textarea value={taskForm.description} onChange={e => setTaskForm({ ...taskForm, description: e.target.value })} placeholder="Description" className="w-full p-2 border rounded" />
            <button className="px-3 py-2 bg-indigo-600 text-white rounded">Add Task</button>
          </form>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-bold mb-2">Tasks</h3>
          <ul className="space-y-2">
            {tasks.map(t => (
              <li key={t._id} className="p-2 border rounded">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-xs text-gray-500">{t.status} • {t.priority}</div>
                  </div>
                  <div className="text-sm text-blue-600">{t.assignee?.name || "Unassigned"}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
