import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export default function AdminPanel() {
  const { authFetch, user } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => { if (user?.role === "admin") load(); }, [user]);

  async function load() {
    const res = await authFetch("/api/admin/users");
    if (!res.ok) return;
    setUsers(await res.json());
  }

  if (user?.role !== "admin") return <div className="p-4">Admin only</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Panel - Users</h2>
      <div className="bg-white p-3 rounded shadow">
        <table className="w-full text-sm">
          <thead><tr><th>Name</th><th>Email</th><th>Role</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u._id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
