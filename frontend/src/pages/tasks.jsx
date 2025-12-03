import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Tasks() {
  const { authFetch } = useAuth();
  const [tasks, setTasks] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await authFetch("/api/tasks");
    if (res.ok) setTasks(await res.json());
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Tasks</h2>
      <div className="grid md:grid-cols-2 gap-3">
        {tasks.map(t => (
          <div key={t._id} className="p-3 bg-white rounded shadow">
            <div className="font-semibold">{t.title}</div>
            <div className="text-sm text-gray-600">Project: {t.project?.name}</div>
            <div className="text-xs text-gray-500">Status: {t.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
