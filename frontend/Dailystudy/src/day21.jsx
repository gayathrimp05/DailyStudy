import React, { useState } from "react";

const Day21 = () => {
  const productsData = [
    { id: 1, name: "T-Shirt", category: "Clothing", price: 500 },
    { id: 2, name: "Jeans", category: "Clothing", price: 1200 },
    { id: 3, name: "Shoes", category: "Footwear", price: 2500 },
    { id: 4, name: "Sneakers", category: "Footwear", price: 3000 },
    { id: 5, name: "Watch", category: "Accessories", price: 2000 },
    { id: 6, name: "Cap", category: "Accessories", price: 400 },
  ];

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(3000);

  const categories = ["All", "Clothing", "Footwear", "Accessories"];

  // Filtering logic
  const filteredProducts = productsData.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    const matchesPrice = product.price <= maxPrice;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Product Filter UI</h2>

      {/* Filters */}
      <div style={styles.filters}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          style={styles.select}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <div style={styles.sliderContainer}>
          <label>Max Price: ₹{maxPrice}</label>
          <input
            type="range"
            min="100"
            max="3000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Product Grid */}
      <div style={styles.grid}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} style={styles.card}>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p style={styles.price}>₹{product.price}</p>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Day21;

const styles = {
  container: {
    maxWidth: "900px",
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
  filters: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
    justifyContent: "space-between",
  },
  input: {
    flex: "1",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
  },
  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #cbd5f5",
  },
  sliderContainer: {
    display: "flex",
    flexDirection: "column",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "15px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    transition: "transform 0.2s",
  },
  price: {
    color: "#2563eb",
    fontWeight: "bold",
  },
};