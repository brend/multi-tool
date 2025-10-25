import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

const XmlValidator: React.FC = () => {
  const [xml, setXml] = useState("");
  const [result, setResult] = useState<null | {
    valid: boolean;
    message: string;
  }>(null);

  const handleValidate = async () => {
    setResult(null);
    try {
      await invoke("validate_xml", { input: xml });
      setResult({ valid: true, message: "Valid XML!" });
    } catch (err: any) {
      setResult({
        valid: false,
        message: typeof err === "string" ? err : "Invalid XML.",
      });
    }
  };

  return (
    <div>
      <h2>XML Validator</h2>
      <textarea
        value={xml}
        onChange={(e) => setXml(e.target.value)}
        rows={10}
        cols={60}
        placeholder="Paste your XML here"
        style={{ fontFamily: "monospace", width: "100%" }}
      />
      <br />
      <button onClick={handleValidate}>Validate</button>
      {result && (
        <p style={{ color: result.valid ? "green" : "red", marginTop: "1rem" }}>
          {result.message}
        </p>
      )}
    </div>
  );
};

export default XmlValidator;
