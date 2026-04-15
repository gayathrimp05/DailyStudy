import { useState } from "react";

const questions = [
  {
    question: "What is React?",
    options: ["Library", "Framework", "Language", "Tool"],
    answer: "Library",
  },
  {
    question: "Which hook is used for state?",
    options: ["useEffect", "useState", "useRef", "useMemo"],
    answer: "useState",
  },
  {
    question: "JSX stands for?",
    options: [
      "Java Syntax Extension",
      "JavaScript XML",
      "JSON XML",
      "Java Extension",
    ],
    answer: "JavaScript XML",
  },
];

function Day10() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);

  function handleOption(option) {
    setSelected(option);

    if (option === questions[index].answer) {
      setScore(score + 1);
    }
  }

  function nextQuestion() {
    setSelected(null);

    if (index + 1 < questions.length) {
      setIndex(index + 1);
    } else {
      setShowResult(true);
    }
  }

  function restart() {
    setIndex(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
  }

  if (showResult) {
    return (
      <div style={styles.container}>
        <h2>Quiz Completed !! </h2>
        <h3>Your Score: {score} / {questions.length}</h3>
        <button onClick={restart} style={styles.button}>Restart</button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h3>Question {index + 1} / {questions.length}</h3>
        <h2>{questions[index].question}</h2>

        <div>
          {questions[index].options.map((option, i) => (
            <div
              key={i}
              onClick={() => handleOption(option)}
              style={{
                ...styles.option,
                background:
                  selected === option
                    ? option === questions[index].answer
                      ? "#a6f3b8"
                      : "#f38a93"
                    : "#0c0c0c",
                     color: selected === option ? "black" : "white",
              }}
            >
              {option}
            </div>
          ))}
        </div>

        <button
          onClick={nextQuestion}
          style={styles.button}
          disabled={!selected}
        >
          Next
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Arial",
  },
  card: {
    width: "400px",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
  option: {
    padding: "10px",
    margin: "10px 0",
    borderRadius: "8px",
    cursor: "pointer",
  },
  button: {
    marginTop: "15px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "8px",
    background: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default Day10;