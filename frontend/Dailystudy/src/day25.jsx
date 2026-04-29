import React, { useState } from "react";

const Day25 = () => {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [selected, setSelected] = useState(null);

  // Open folder picker
  const handleOpenFolder = async () => {
    try {
      const dirHandle = await window.showDirectoryPicker();
      const tree = await readDirectory(dirHandle);
      setData(tree);
    } catch (err) {
      console.log("Cancelled or not supported", err);
    }
  };

  // Read directory recursively
  const readDirectory = async (dirHandle) => {
    const entries = [];

    for await (const entry of dirHandle.values()) {
      if (entry.kind === "file") {
        entries.push({
          id: entry.name + Math.random(),
          name: entry.name,
          type: "file",
        });
      }

      if (entry.kind === "directory") {
        const children = await readDirectory(entry);

        entries.push({
          id: entry.name + Math.random(),
          name: entry.name,
          type: "folder",
          children,
        });
      }
    }

    return entries;
  };

  // Toggle folder
  const toggleFolder = (id) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Render tree recursively
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

      <button onClick={handleOpenFolder} style={styles.button}>
        Open Folder
      </button>

      <div style={styles.sidebar}>
        {data.length > 0 ? (
          renderTree(data)
        ) : (
          <p style={{ color: "#6b7280" }}>
            No folder selected
          </p>
        )}
      </div>
    </div>
  );
};

export default Day25;

// 🎨 Styles
const styles = {
  container: {
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f3f4f6",
    minHeight: "100vh",
  },
  title: {
    marginBottom: "10px",
    color: "#1f2937",
  },
  button: {
    marginBottom: "10px",
    padding: "8px 12px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
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
    color: "#111", // 👈 ensures visibility
  },
  icon: {
    width: "20px",
  },
};