// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

// Tool A: Add two numbers
#[tauri::command]
fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

// Tool B: Reverse a string
#[tauri::command]
fn reverse_string(input: String) -> String {
    input.chars().rev().collect()
}

// XML Validator: Check if input is valid XML and return error line/column if available
use serde::Serialize;

#[derive(Serialize)]
struct XmlValidationError {
    message: String,
    line: Option<usize>,
    column: Option<usize>,
}

#[tauri::command]
fn validate_xml(input: String) -> Result<(), XmlValidationError> {
    match xmltree::Element::parse(input.as_bytes()) {
        Ok(_) => Ok(()),
        Err(e) => {
            let msg = e.to_string();
            let (line, column) = extract_line_col(&msg);
            Err(XmlValidationError {
                message: msg,
                line,
                column,
            })
        }
    }
}

// Extract line/column from error string, if available
fn extract_line_col(msg: &str) -> (Option<usize>, Option<usize>) {
    let re = regex::Regex::new(r"line (\\d+) column (\\d+)").ok();
    if let Some(re) = re {
        if let Some(caps) = re.captures(msg) {
            let line = caps.get(1).and_then(|m| m.as_str().parse().ok());
            let col = caps.get(2).and_then(|m| m.as_str().parse().ok());
            return (line, col);
        }
    }
    (None, None)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            add_numbers,
            reverse_string,
            validate_xml
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
