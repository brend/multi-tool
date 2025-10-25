# Multi-Tool

**Multi-Tool** is an extensible desktop utility app built with Tauri and React. Inspired by PowerToys and developer toolkits, it provides a unified interface for a variety of productivity tools.

## Features

- Sidebar for quick tool selection
- Modular tool system: easily add new tools or validators
- Built-in tools include:
  - XML Validator with syntax highlighting and error location
  - Simple math and string utilities
- Syntax-highlighted code editor with caret position display
- Designed for future plugin and extension support

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```
2. Run in development mode:
   ```
   npm run tauri dev
   ```
3. Build for release:
   ```
   npm run tauri build
   ```

## Extending

To add a new tool:
- Create a React component in `src/tools/`
- Register it in `src/toolRegistry.ts`

The architecture is ready for future plugin support.

---
