import React from "react";

export default function FileUpload({ onFiles }) {
  const handle = (e) => {
    onFiles(e.target.files);
  };
  return <input type="file" multiple onChange={handle} />;
}
