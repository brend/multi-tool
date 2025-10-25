import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import CodeEditor from "./CodeEditor";

type ValidationResult = {
  valid: boolean;
  message: string;
  line?: number;
};

const XmlValidator: React.FC = () => {
  const [xml, setXml] = useState("");
  const [result, setResult] = useState<null | ValidationResult>(null);
  const [caret, setCaret] = useState<{ line: number; column: number }>({
    line: 1,
    column: 1,
  });

  const handleValidate = async () => {
    setResult(null);
    try {
      await invoke("validate_xml", { input: xml });
      setResult({ valid: true, message: "Valid XML!" });
    } catch (err: any) {
      // Try to extract line from error object if present
      let line: number | undefined = undefined;
      let message = "Invalid XML.";
      if (typeof err === "object" && err !== null) {
        if ("message" in err) message = err.message as string;
        if ("line" in err && typeof err.line === "number") line = err.line;
      } else if (typeof err === "string") {
        message = err;
      }
      setResult({
        valid: false,
        message,
        line,
      });
    }
  };

  return (
    <div>
      <h2>XML Validator</h2>
      <CodeEditor
        value={xml}
        onChange={setXml}
        language="xml"
        height="200px"
        errorLine={
          result && !result.valid && result.line ? result.line : undefined
        }
        onCursorChange={(line, column) => setCaret({ line, column })}
      />
      <div style={{ fontSize: "0.9em", color: "#666", marginTop: "0.25em" }}>
        Line: {caret.line}, Column: {caret.column}
      </div>
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
