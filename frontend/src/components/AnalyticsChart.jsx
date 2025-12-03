import React from "react";

export default function AnalyticsChart({ summary }) {
  if (!summary) return <div className="p-4 bg-white rounded shadow">No data</div>;
  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="text-sm text-gray-500">Total Projects</div>
      <div className="text-2xl font-bold">{summary.totalProjects}</div>
      <div className="mt-2 text-sm text-gray-500">Total Tasks</div>
      <div className="text-2xl font-bold">{summary.totalTasks}</div>
      <div className="mt-3 text-sm">
        {summary.tasksByStatus?.map(s => (
          <div key={s._id}>{s._id}: {s.count}</div>
        ))}
      </div>
    </div>
  );
}
