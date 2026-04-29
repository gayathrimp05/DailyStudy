import React, { useState } from "react";

// Sample file system
const initialData = [
  {
    id: 1,
    name: "Documents",
    type: "folder",
    children: [
      { id: 2, name: "Resume.pdf", type: "file" },
      { id: 3, name: "Notes.txt", type: "file" },
    ],
  },
  {
    id: 4,
    name: "Projects",
    type: "folder",
    children: [
      {
        id: 5,
        name: "ReactApp",
        type: "folder",
        children: [
          { id: 6, name: "App.js", type: "file" },
          { id: 7, name: "index.css", type: "file" },
        ],
      },
    ],
  },
  { id: 8, name: "image.png", type: "file" },
];

const Day25 = () => {
  const [data] = useState(initialData);
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState(null);

  // Toggle folder open/close
  const toggleFolder = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Recursive render
  const renderTree = (nodes, level = 0) => {
    return nodes.map((node) => {
      const isFolder = node.type === "folder";
      const isOpen = expanded[node.id];

      return (
        <div key={node.id}>
          <div
            onClick={() => {
              setSelected(node.id);
              if (isFolder) toggleFolder(node.id);
            }}
            style={{
              ...styles.item,
              paddingLeft: `${level * 20 + 10}px`,
              backgroundColor:
                selected === node.id ? "#dbeafe" : "transparent",
            }}
          >
            <span style={styles.icon}>
              {isFolder ? (isOpen ? "📂" : "📁") : "📄"}
            </span>
            {node.name}
          </div>

          {isFolder && isOpen && node.children && (
            <div>{renderTree(node.children, level + 1)}</div>
          )}
        </div>
      );
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>File Explorer</h2>

      <div style={styles.sidebar}>
        {renderTree(data)}
      </div>
    </div>
  );
};

export default Day25;

//Styling
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f3f4f6",
  },
  title: {
    marginBottom: "15px",
    color: "#1f2937",
  },
  sidebar: {
    width: "300px",
    backgroundColor: "#ffffff",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    padding: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  item: {
    padding: "6px 8px",
    cursor: "pointer",
    borderRadius: "4px",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    userSelect: "none",
  },
  icon: {
    width: "20px",
  },
};