import { useState } from "react";

function App() {
  const [isOn, setIsOn] = useState(false);

  function toggle() {
    setIsOn(!isOn);
  }

  return (
    <div>
      <h1>{isOn ? "ON" : "OFF"}</h1>
      <button onClick={toggle}>Toggle</button>
    </div>
  );
}

export default App;