import React, { useEffect, useState } from "react";

const Day21 = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 4;

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await res.json();
      setData(result);
      setFiltered(result);
    };
    fetchData();
  }, []);

  // Search logic
  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(filteredData);
    setCurrentPage(1);
  }, [search, data]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filtered.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>User Dashboard</h2>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={styles.input}
      />

      <div style={styles.grid}>
        {currentItems.map((user) => (
          <div key={user.id} style={styles.card}>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.company.name}</p>
          </div>
        ))}
      </div>

      <div style={styles.pagination}>
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          style={styles.button}
        >
          Prev
        </button>

        <span style={styles.pageInfo}>
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages || totalPages === 0}
          style={styles.button}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Day21;

// Styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "auto",
    padding: "20px",
    fontFamily: "sans-serif",
    backgroundColor: "#f8fafc",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#1e293b",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
    marginTop: "20px",
  },
  button: {
    padding: "8px 12px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
  pageInfo: {
    fontWeight: "bold",
  },
};