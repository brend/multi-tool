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

// XML Validator: Check if input is valid XML
#[tauri::command]
fn validate_xml(input: String) -> Result<(), String> {
    match xmltree::Element::parse(input.as_bytes()) {
        Ok(_) => Ok(()),
        Err(e) => Err(format!("Invalid XML: {}", e)),
    }
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
