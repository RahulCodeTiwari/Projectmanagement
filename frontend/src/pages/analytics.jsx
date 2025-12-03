import React, { useEffect, useState } from "react";
import { fetcher } from "../utils/fetcher";
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const Analytics = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsData = await fetcher("/projects");
        const tasksData = await fetcher("/tasks");
        setProjects(projectsData);
        setTasks(tasksData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  // Prepare task status pie chart
  const taskStatusData = [
    { name: "Pending", value: tasks.filter(t => t.status === "Pending").length },
    { name: "In Progress", value: tasks.filter(t => t.status === "In Progress").length },
    { name: "Completed", value: tasks.filter(t => t.status === "Completed").length },
  ];

  // Prepare projects bar chart (tasks per project)
  const projectTaskData = projects.map(project => ({
    name: project.name,
    tasks: tasks.filter(t => t.projectId === project._id).length,
  }));

  if (loading) return <p>Loading analytics...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics Dashboard</h2>

      <div style={{ display: "flex", gap: "50px", flexWrap: "wrap", marginTop: "30px" }}>
        {/* Task Status Pie Chart */}
        <div>
          <h3>Task Status</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={taskStatusData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {taskStatusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        {/* Tasks per Project Bar Chart */}
        <div>
          <h3>Tasks per Project</h3>
          <ResponsiveContainer width={500} height={300}>
            <BarChart data={projectTaskData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="tasks" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
