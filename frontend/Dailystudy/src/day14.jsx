import { useState, useEffect } from "react";

// 🎨 Color pairs
const icons = ["#ff4d4d", "#4da6ff", "#4dff88", "#ffd24d", "#b84dff", "#ff944d"];

function shuffleCards() {
  const doubled = [...icons, ...icons];
  return doubled
    .sort(() => Math.random() - 0.5)
    .map((color, index) => ({
      id: index,
      value: color,
      flipped: false,
      matched: false,
    }));
}

function Day14() {
  const [cards, setCards] = useState(shuffleCards());
  const [selected, setSelected] = useState([]);

  function handleClick(card) {
    if (card.flipped || card.matched || selected.length === 2) return;

    const updated = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );

    setCards(updated);
    setSelected([...selected, card]);
  }

  useEffect(() => {
    if (selected.length === 2) {
      const [first, second] = selected;

      if (first.value === second.value) {
        // ✅ Match
        setCards((prev) =>
          prev.map((c) =>
            c.value === first.value ? { ...c, matched: true } : c
          )
        );
        setSelected([]);
      } else {
        // ❌ Not match → flip back
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id
                ? { ...c, flipped: false }
                : c
            )
          );
          setSelected([]);
        }, 700);
      }
    }
  }, [selected]);

  function resetGame() {
    setCards(shuffleCards());
    setSelected([]);
  }

  return (
    <div style={styles.container}>
      <h2 style={{ color: "#fff" }}>Memory Game</h2>

      <div style={styles.grid}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleClick(card)}
            style={{
              ...styles.card,

              background:
                card.flipped || card.matched ? card.value : "#111",

              border: "2px solid",
              borderColor:
                card.flipped || card.matched ? card.value : "#ff0033",


              boxShadow:
                card.flipped || card.matched
                  ? `0 0 15px ${card.value}`
                  : "0 0 10px #ff0033",
            }}
          >
            {/* hidden state */}
            {!card.flipped && !card.matched && "?"}
          </div>
        ))}
      </div>

      <button onClick={resetGame} style={styles.button}>
        Reset
      </button>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center",
    marginTop: "20px",
    fontFamily: "Arial",
    background: "#000",
    minHeight: "100vh",
    padding: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 80px)",
    gap: "12px",
    justifyContent: "center",
    marginTop: "20px",
  },
  card: {
    width: "80px",
    height: "80px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "24px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#fff",
    transition: "0.3s",
  },
  button: {
    marginTop: "20px",
    padding: "10px 15px",
    borderRadius: "8px",
    border: "none",
    background: "#00ff88",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Day14;