<?php
/**
 * Iron Dominion - User Login Endpoint
 * 
 * Endpoint: POST /php/login.php
 * 
 * Request body:
 * {
 *   "username": "player_name",
 *   "password": "securePassword123",
 *   "remember_me": true
 * }
 * 
 * Response:
 * {
 *   "success": true,
 *   "message": "Login successful",
 *   "user_id": 1,
 *   "username": "player_name",
 *   "email": "email@example.com",
 *   "token": "unique_session_token"
 * }
 */

require_once 'db-config.php';

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Start session if not already started
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Get JSON request body
$input = json_decode(file_get_contents('php://input'), true);

// Validate input
if (!isset($input['username']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing username or password']);
    exit;
}

$username = trim($input['username']);
$password = $input['password'];
$remember_me = isset($input['remember_me']) ? (bool)$input['remember_me'] : false;

try {
    $conn = getDBConnection();
    
    // Find user by username
    $stmt = $conn->prepare("SELECT id, username, email, password_hash FROM users WHERE username = ? AND is_active = 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
        $stmt->close();
        $conn->close();
        exit;
    }
    
    $user = $result->fetch_assoc();
    $stmt->close();
    
    // Verify password
    if (!password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid username or password']);
        $conn->close();
        exit;
    }
    
    // Generate session token
    $session_token = bin2hex(random_bytes(32));
    
    // Update last_login timestamp
    $stmt = $conn->prepare("UPDATE users SET last_login = NOW() WHERE id = ?");
    $stmt->bind_param("i", $user['id']);
    $stmt->execute();
    $stmt->close();
    
    // Store session data
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['username'] = $user['username'];
    $_SESSION['email'] = $user['email'];
    $_SESSION['token'] = $session_token;
    $_SESSION['created'] = time();
    
    $response = [
        'success' => true,
        'message' => 'Login successful',
        'user_id' => $user['id'],
        'username' => $user['username'],
        'email' => $user['email'],
        'token' => $session_token
    ];
    
    // Handle "Remember Me" cookie
    if ($remember_me) {
        $cookie_token = bin2hex(random_bytes(32));
        $cookie_expires = time() + REMEMBER_ME_DURATION;
        
        // Set HttpOnly cookies for security (not accessible via JavaScript)
        setcookie(
            'iron_dominion_remember',
            $cookie_token,
            $cookie_expires,
            '/',
            '',
            isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
            true  // HttpOnly - not accessible via JavaScript for security
        );
        
        setcookie(
            'iron_dominion_user',
            base64_encode($user['id'] . ':' . $user['username']),
            $cookie_expires,
            '/',
            '',
            isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on',
            true
        );
        
        $response['remember_me_token'] = $cookie_token;
    }
    
    $conn->close();
    
    http_response_code(200);
    echo json_encode($response);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
