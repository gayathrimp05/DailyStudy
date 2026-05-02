import React, { useState } from "react";

const Day27 = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! Ask me something.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");

  // Random fallback responses
  const randomReplies = [
    "Interesting...",
    "Tell me more.",
    "I'm not sure I understand.",
    "Can you explain that?",
    "Hmm...",
    "Okay, go on.",
  ];

  // Keyword-based responses
  const keywordReplies = {
    hello: "Hi there!",
    hi: "Hello!",
    react: "React is a powerful frontend library.",
    javascript: "JavaScript runs the web.",
    bye: "Goodbye! Have a great day.",
  };

  // Get bot reply
  const getBotReply = (userText) => {
    const lower = userText.toLowerCase();

    for (let key in keywordReplies) {
      if (lower.includes(key)) {
        return keywordReplies[key];
      }
    }

    // fallback random
    const randomIndex = Math.floor(Math.random() * randomReplies.length);
    return randomReplies[randomIndex];
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    const botMsg = { text: getBotReply(input), sender: "bot" };

    setMessages([...messages, userMsg, botMsg]);
    setInput("");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chatbot</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf:
                msg.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.sender === "user" ? "#2563eb" : "#e5e7eb",
              color: msg.sender === "user" ? "#fff" : "#000",
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Day27;

// Styles
const styles = {
  container: {
    maxWidth: "500px",
    margin: "auto",
    padding: "20px",
    fontFamily: "Segoe UI, sans-serif",
    backgroundColor: "#f8fafc",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
    color: "#1e293b",
  },
  chatBox: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "10px",
    backgroundColor: "#fff",
    overflowY: "auto",
    marginBottom: "10px",
  },
  message: {
    padding: "8px 12px",
    borderRadius: "12px",
    maxWidth: "70%",
  },
  inputArea: {
    display: "flex",
    gap: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};