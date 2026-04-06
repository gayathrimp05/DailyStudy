import { useState } from "react";

function B() {
  const [x, setX] = useState(0);

  return (
    <button onClick={() => setX(x + 1)}>
      Clicked {x} times
    </button>
  );
}

export default B;