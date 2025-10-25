import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const DummyToolB: React.FC = () => {
  const [input, setInput] = useState("");
  const [reversed, setReversed] = useState("");

  const handleReverse = async () => {
    try {
      const result = await invoke<string>("reverse_string", { input });
      setReversed(result);
    } catch (err) {
      setReversed("Error reversing string.");
    }
  };

  return (
    <div>
      <h2>Dummy Tool B</h2>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text to reverse"
      />
      <button onClick={handleReverse}>Reverse</button>
      {reversed && <p>Reversed: {reversed}</p>}
    </div>
  );
};

export default DummyToolB;
