import React from "react";
import { useState } from "react";
import { SignIn } from "./pages/SignIn";

function App() {
  const [count, setCount] = useState(0);

  return <SignIn />;
}

export default App;
