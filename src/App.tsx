import { /*React,*/ useState } from "react";
import { toolRegistry } from "./toolRegistry";
import "./App.css";

function App() {
  const [selectedToolId, setSelectedToolId] = useState(toolRegistry[0].id);
  const selectedTool = toolRegistry.find((tool) => tool.id === selectedToolId);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <nav
        style={{
          width: 220,
          background: "#222",
          color: "#fff",
          padding: "1rem 0",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ margin: "0 1rem 1rem 1rem" }}>Tools</h2>
        {toolRegistry.map((tool) => (
          <button
            key={tool.id}
            onClick={() => setSelectedToolId(tool.id)}
            style={{
              background: selectedToolId === tool.id ? "#444" : "transparent",
              color: "#fff",
              border: "none",
              textAlign: "left",
              padding: "0.75rem 1rem",
              cursor: "pointer",
              fontWeight: selectedToolId === tool.id ? "bold" : "normal",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <span>{tool.icon}</span>
            {tool.name}
          </button>
        ))}
      </nav>
      {/* Main View */}
      <main style={{ flex: 1, padding: "2rem" }}>
        {selectedTool ? <selectedTool.Component /> : <p>No tool selected.</p>}
      </main>
    </div>
  );
}

export default App;
