import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const DummyToolA: React.FC = () => {
  const [a, setA] = useState(0);
  const [b, setB] = useState(0);
  const [result, setResult] = useState<number | null>(null);

  const handleAdd = async () => {
    try {
      const sum = await invoke<number>("add_numbers", { a, b });
      setResult(sum);
    } catch (err) {
      setResult(null);
      // Optionally handle error
    }
  };

  return (
    <div>
      <h2>Dummy Tool A</h2>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
        <input
          type="number"
          value={a}
          onChange={(e) => setA(Number(e.target.value))}
          style={{ width: "4rem" }}
        />
        <span>+</span>
        <input
          type="number"
          value={b}
          onChange={(e) => setB(Number(e.target.value))}
          style={{ width: "4rem" }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>
      {result !== null && (
        <p style={{ marginTop: "1rem" }}>
          Result: <strong>{result}</strong>
        </p>
      )}
    </div>
  );
};

export default DummyToolA;
