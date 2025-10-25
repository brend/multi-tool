import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: "xml"; // Extend as needed for other languages
  height?: string;
  theme?: "light" | "dark";
}

const languageExtensions = {
  xml: xml(),
  // Add other languages here as needed
};

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = "xml",
  height = "200px",
  theme = "light",
}) => (
  <CodeMirror
    value={value}
    height={height}
    extensions={[languageExtensions[language]]}
    onChange={onChange}
    theme={theme}
    basicSetup={{ lineNumbers: true }}
    style={{ fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}
  />
);

export default CodeEditor;
