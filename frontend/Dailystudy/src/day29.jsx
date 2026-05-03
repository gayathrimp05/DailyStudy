import React, { useEffect, useState } from "react";

const sentences = [
  "React makes building user interfaces easier and faster.",
  "JavaScript is the language of the web.",
  "Practice coding every day to improve your skills.",
  "Frontend development requires logic and creativity.",
  "Typing speed improves with consistent practice.",
];

const Day29 = () => {
  const [text, setText] = useState("");
  const [sentence, setSentence] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Pick random sentence
  const startTest = () => {
    const random =
      sentences[Math.floor(Math.random() * sentences.length)];
    setSentence(random);
    setText("");
    setStartTime(Date.now());
    setTime(0);
    setIsRunning(true);
  };

  // Timer
  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  // Handle typing
  const handleChange = (e) => {
    const value = e.target.value;

    if (!isRunning) return;

    setText(value);

    if (value === sentence) {
      setIsRunning(false);
    }
  };

  // Calculate WPM
  const calculateWPM = () => {
    if (time === 0) return 0;
    const words = text.trim().split(" ").length;
    return Math.round((words / time) * 60);
  };

  // Accuracy
  const calculateAccuracy = () => {
    let correct = 0;
    for (let i = 0; i < text.length; i++) {
      if (text[i] === sentence[i]) correct++;
    }
    return text.length
      ? Math.round((correct / text.length) * 100)
      : 0;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Typing Speed Test</h2>

      <button onClick={startTest} style={styles.button}>
        Start Test
      </button>

      <p style={styles.sentence}>{sentence}</p>

      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Start typing here..."
        style={styles.textarea}
      />

      <div style={styles.stats}>
        <p>Time: {time}s</p>
        <p>WPM: {calculateWPM()}</p>
        <p>Accuracy: {calculateAccuracy()}%</p>
      </div>
    </div>
  );
};

export default Day29;

// Styles
const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
  },
  title: {
    textAlign: "center",
    marginBottom: "15px",
    color: "#1e293b",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  sentence: {
    backgroundColor: "#e2e8f0",
    padding: "10px",
    borderRadius: "6px",
    marginBottom: "10px",
    color: "#111",
  },
  textarea: {
    width: "100%",
    height: "100px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    marginBottom: "10px",
    color: "#000",
  },
  stats: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    color: "#1e293b",
  },
};