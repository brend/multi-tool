import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { xml } from "@codemirror/lang-xml";
import { EditorView, Decoration, ViewPlugin } from "@codemirror/view";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: "xml"; // Extend as needed for other languages
  height?: string;
  theme?: "light" | "dark";
  errorLine?: number; // 1-based line number to highlight
  onCursorChange?: (line: number, column: number) => void; // 1-based
}

const languageExtensions = {
  xml: xml(),
  // Add other languages here as needed
};

function errorLineExtension(line: number | undefined) {
  if (!line) return [];
  return [
    ViewPlugin.fromClass(
      class {
        decorations;
        constructor(view: EditorView) {
          if (!line || line < 1 || line > view.state.doc.lines) {
            this.decorations = Decoration.none;
            return;
          }
          const linePos = view.state.doc.line(line);
          this.decorations = Decoration.set([
            Decoration.line({ class: "cm-error-line" }).range(linePos.from),
          ]);
        }
      },
      {
        decorations: (v) => v.decorations,
      },
    ),
  ];
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language = "xml",
  height = "200px",
  theme = "light",
  errorLine,
  onCursorChange,
}) => (
  <CodeMirror
    value={value}
    height={height}
    extensions={[
      languageExtensions[language],
      ...errorLineExtension(errorLine),
    ]}
    onChange={onChange}
    theme={theme}
    basicSetup={{ lineNumbers: true }}
    style={{ fontSize: "1rem", border: "1px solid #ccc", borderRadius: "4px" }}
    onUpdate={(viewUpdate) => {
      if (onCursorChange) {
        const pos = viewUpdate.state.selection.main.head;
        const line = viewUpdate.state.doc.lineAt(pos);
        const lineNumber = line.number;
        const column = pos - line.from + 1;
        onCursorChange(lineNumber, column);
      }
    }}
  />
);

export default CodeEditor;
