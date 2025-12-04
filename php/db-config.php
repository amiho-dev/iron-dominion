<?php
/**
 * Iron Dominion - Database Configuration & Initialization
 * 
 * Instructions for Plesk Database Setup:
 * 1. Log in to your Plesk Control Panel
 * 2. Go to Databases
 * 3. Create a new database (e.g., "iron_dominion")
 * 4. Note the database name, username, and password
 * 5. Update the configuration below
 * 6. Run this file once or visit it in your browser to initialize the database
 */

// Database credentials - UPDATE THESE FOR YOUR PLESK DATABASE
define('DB_HOST', 'dominion.thatoneamiho.cc:3306');      // dominion subdomain MariaDB
define('DB_USER', 'dominion');            // MariaDB username
define('DB_PASS', '6^cz45nR}zPL}yN');     // MariaDB password
define('DB_NAME', 'irondominion');        // MariaDB database name

// Cookie settings
define('REMEMBER_ME_DURATION', 30 * 24 * 60 * 60); // 30 days in seconds
define('SESSION_DURATION', 24 * 60 * 60);          // 24 hours in seconds

/**
 * Establish database connection
 */
function getDBConnection() {
    try {
        $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
        
        if ($conn->connect_error) {
            throw new Exception('Database connection failed: ' . $conn->connect_error);
        }
        
        // Set charset to utf8mb4
        $conn->set_charset("utf8mb4");
        
        return $conn;
    } catch (Exception $e) {
        http_response_code(500);
        die(json_encode(['error' => 'Database connection error: ' . $e->getMessage()]));
    }
}

/**
 * Initialize database - Create users table if it doesn't exist
 * Call this function once to set up the database structure
 */
function initializeDatabase() {
    $conn = getDBConnection();
    
    // SQL to create users table
    $sql = "CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(255) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP NULL,
        is_active TINYINT(1) DEFAULT 1,
        INDEX idx_username (username),
        INDEX idx_email (email)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci";
    
    if ($conn->query($sql) === TRUE) {
        $result = ['success' => true, 'message' => 'Users table created or already exists'];
    } else {
        $result = ['success' => false, 'error' => 'Error creating table: ' . $conn->error];
    }
    
    $conn->close();
    return $result;
}

/**
 * AJAX endpoint to initialize database
 * This should only be accessible during first setup
 */
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'init') {
    // Initialize database
    echo json_encode(initializeDatabase());
    exit;
}

/**
 * Enable CORS for development (adjust for production)
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
?>
