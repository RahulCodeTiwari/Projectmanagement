import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import FileUpload from "../components/Fileupload";

export default function Files() {
  const { authFetch } = useAuth();
  const [files, setFiles] = useState([]);

  useEffect(() => { load(); }, []);

  async function load() {
    const res = await authFetch("/api/files");
    if (res.ok) setFiles(await res.json());
  }

  async function handleFiles(fileList) {
    const fd = new FormData();
    for (const f of fileList) fd.append("files", f);
    const res = await authFetch("/api/files/upload", { method: "POST", body: fd });
    if (res.ok) load();
  }

  async function attach(fileId) {
    const taskId = prompt("Attach to task id:");
    if (!taskId) return;
    await authFetch("/api/files/attach", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ fileId, taskId }) });
    load();
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Files</h2>
      <div className="mb-3 bg-white p-3 rounded shadow">
        <FileUpload onFiles={handleFiles} />
      </div>
      <div className="grid md:grid-cols-3 gap-3">
        {files.map(f => (
          <div key={f._id} className="p-3 bg-white rounded shadow">
            <div className="font-semibold">{f.originalname || f.filename}</div>
            <div className="text-xs text-gray-500">{(f.size / 1024).toFixed(1)} KB • {new Date(f.uploadedAt).toLocaleString()}</div>
            <div className="mt-2 flex gap-2">
              <a href={f.path} target="_blank" rel="noreferrer" className="text-sm text-blue-600">Open</a>
              <button onClick={() => attach(f._id)} className="text-sm text-green-600">Attach</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
