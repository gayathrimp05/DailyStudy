import { useState } from "react";

function Day18() {
  const [password, setPassword] = useState("");

  function getStrength(pwd) {
    let score = 0;

    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { label: "Weak", color: "red" };
    if (score === 2 || score === 3) return { label: "Medium", color: "orange" };
    return { label: "Strong", color: "green" };
  }

  const strength = getStrength(password);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Password Strength Checker</h2>

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        {password && (
          <>
            {/* Strength Text */}
            <p style={{ color: strength.color }}>
              Strength: {strength.label}
            </p>

            {/* Progress Bar */}
            <div style={styles.barContainer}>
              <div
                style={{
                  ...styles.bar,
                  width:
                    strength.label === "Weak"
                      ? "33%"
                      : strength.label === "Medium"
                      ? "66%"
                      : "100%",
                  background: strength.color,
                }}
              />
            </div>

            {/* Rules */}
            <ul style={styles.rules}>
              <li style={check(password.length >= 8)}>At least 8 characters</li>
              <li style={check(/[A-Z]/.test(password))}>
                Contains uppercase letter
              </li>
              <li style={check(/[0-9]/.test(password))}>
                Contains a number
              </li>
              <li style={check(/[^A-Za-z0-9]/.test(password))}>
                Contains special character
              </li>
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

// ✔ style helper
function check(condition) {
  return {
    color: condition ? "green" : "#999",
  };
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "80px",
    fontFamily: "Arial",
  },
  card: {
    width: "400px",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "10px",
  },
  barContainer: {
    height: "10px",
    background: "#eee",
    borderRadius: "5px",
    marginTop: "10px",
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    transition: "0.3s",
  },
  rules: {
    textAlign: "left",
    marginTop: "15px",
    paddingLeft: "20px",
  },
};

export default Day18;