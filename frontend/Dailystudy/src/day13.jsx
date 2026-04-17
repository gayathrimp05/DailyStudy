import { useState, useEffect } from "react";

function Day13() {
  const [state, setState] = useState("idle"); // idle, waiting, ready
  const [startTime, setStartTime] = useState(0);
  const [reaction, setReaction] = useState(null);

  useEffect(() => {
    let timer;

    if (state === "waiting") {
      timer = setTimeout(() => {
        setState("ready");
        setStartTime(Date.now());
      }, Math.random() * 3000 + 1000); // random delay
    }

    return () => clearTimeout(timer);
  }, [state]);

  function handleClick() {
    if (state === "idle") {
      setState("waiting");
      setReaction(null);
    } else if (state === "waiting") {
      setState("idle");
      alert("Too early! :/ ");
    } else if (state === "ready") {
      const time = Date.now() - startTime;
      setReaction(time);
      setState("idle");
    }
  }

  return (
    <div
      onClick={handleClick}
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
        color: "white",
        fontFamily: "Arial",
        cursor: "pointer",

        background:
          state === "ready"
            ? "#00ff88"
            : state === "waiting"
            ? "#ff0033"
            : "#111",

        boxShadow:
          state === "ready"
            ? "0 0 50px #00ff88"
            : state === "waiting"
            ? "0 0 50px #ff0033"
            : "none",

        transition: "0.3s",
      }}
    >
      {state === "idle" && "Click to Start"}
      {state === "waiting" && "Wait..."}
      {state === "ready" && "CLICK NOW!"}

      {reaction && (
        <div style={{ position: "absolute", bottom: "50px" }}>
          ~~ Reaction Time: {reaction} ms ~~
        </div>
      )}
    </div>
  );
}

export default Day13;