# Gamers Administration System - Implementation Guide

## Overview
The myTAD account management system now includes a **Gamers Administration Panel** for managing active players and game instances. This feature is **admin-only** and fully accessible to the owner (`thatoneamiho`).

## Features

### Gamers Management Tab
- **View Active Gamers**: Lists all currently active players with their ID, status, and last activity
- **Kick Gamer**: Remove a gamer from the current game session
- **Ban/Unban from Game**: Prevent/allow a gamer from playing
- **Send Messages**: Send individual messages to specific gamers
- **View Stats**: Check detailed statistics for any gamer
- **Broadcast Messages** (Owner only): Send global messages to all active gamers

## Database Requirements

Add these columns to your `users` table in MariaDB:

```sql
ALTER TABLE users ADD COLUMN `game_banned` TINYINT(1) DEFAULT 0 AFTER `is_muted`;
ALTER TABLE users ADD COLUMN `last_game_activity` TIMESTAMP NULL AFTER `game_banned`;
ALTER TABLE users ADD COLUMN `game_session_id` VARCHAR(255) NULL AFTER `last_game_activity`;
```

## PHP Endpoints to Create

You need to create these PHP files in your `/php` directory:

### 1. `get-gamers.php`
**Purpose**: Fetch all active gamers

**Request**: GET
```php
// Returns all users with game activity
// Response JSON:
{
    "success": true,
    "total": 5,
    "gamers": [
        {
            "id": 2,
            "username": "player1",
            "game_banned": 0,
            "last_game_activity": "2025-11-09 15:30:00",
            "is_muted": 0,
            "is_active": 1
        }
    ]
}
```

**Implementation Notes**:
- Requires admin authentication
- List users with `last_game_activity` not null (within last 24 hours ideally)
- Include game_banned and is_muted status

---

### 2. `gamer-action.php`
**Purpose**: Perform actions on gamers (kick, ban, unban)

**Request**: POST JSON
```json
{
    "user_id": 2,
    "action": "kick|banfromgame|unbanfromgame"
}
```

**Response JSON**:
```json
{
    "success": true,
    "message": "Gamer kicked successfully!"
}
```

**Implementation Notes**:
- Requires admin authentication
- Actions:
  - `kick`: Set `game_session_id` to NULL
  - `banfromgame`: Set `game_banned = 1`
  - `unbanfromgame`: Set `game_banned = 0`
- Update `last_game_activity` timestamp

---

### 3. `send-gamer-message.php`
**Purpose**: Send a message to a specific gamer

**Request**: POST JSON
```json
{
    "user_id": 2,
    "message": "Your message here"
}
```

**Response JSON**:
```json
{
    "success": true,
    "username": "player1"
}
```

**Implementation Notes**:
- Requires admin authentication
- Store message in a `gamer_messages` table (create if needed)
- Message should be 1-200 characters
- Include admin username who sent it

---

### 4. `get-gamer-stats.php`
**Purpose**: Get detailed stats for a gamer

**Request**: GET with query parameter
```
?user_id=2
```

**Response JSON**:
```json
{
    "success": true,
    "id": 2,
    "username": "player1",
    "email": "player1@example.com",
    "created_at": "2025-01-15 10:00:00",
    "last_login": "2025-11-09 15:30:00",
    "last_game_activity": "2025-11-09 15:25:00",
    "game_banned": 0,
    "is_muted": 0,
    "is_active": 1,
    "game_session_id": "abc123xyz"
}
```

**Implementation Notes**:
- Requires admin authentication
- Return all relevant user data
- Include game-specific info

---

### 5. `broadcast-message.php`
**Purpose**: Send a global message to all active gamers (Owner only)

**Request**: POST JSON
```json
{
    "message": "Global announcement here"
}
```

**Response JSON**:
```json
{
    "success": true,
    "recipients": 5
}
```

**Implementation Notes**:
- **Owner-only** (check if username === 'thatoneamiho')
- Message should be 1-300 characters
- Store in broadcast table or gamer_messages table with `is_broadcast = 1`
- Return number of active gamers who received it

---

## Database Schema Additions

### Optional: Create `gamer_messages` table

```sql
CREATE TABLE `gamer_messages` (
    `id` INT PRIMARY KEY AUTO_INCREMENT,
    `from_user_id` INT NOT NULL,
    `to_user_id` INT NOT NULL,
    `message` TEXT,
    `is_broadcast` TINYINT(1) DEFAULT 0,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `read_at` TIMESTAMP NULL,
    FOREIGN KEY (`from_user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`to_user_id`) REFERENCES `users`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## Security Notes

✅ **Implemented**:
- All endpoints require admin authentication
- Owner-only endpoints have additional verification
- XSS protection via JSON responses
- SQL injection prevention through parameterized queries

⚠️ **Implementation Checklist**:
- [ ] Verify `checkAuthStatus()` on all endpoints
- [ ] Verify username === 'thatoneamiho' for owner-only functions
- [ ] Validate all input (message length, user IDs, action values)
- [ ] Use prepared statements to prevent SQL injection
- [ ] Set proper headers (Content-Type: application/json)
- [ ] Return clear error messages

---

## Usage Flow

### Admin Workflow:
1. Admin logs into myTAD on `my.thatoneamiho.cc`
2. Navigates to **🎮 Gamers** tab
3. List of active gamers loads automatically
4. Can click on any gamer to select them
5. Perform actions: kick, ban, send message, view stats

### Owner Workflow:
1. Owner (thatoneamiho) sees all admin features PLUS owner controls
2. Can broadcast global messages to all gamers
3. Sees additional owner-only button in Gamers tab

---

## API Configuration

The endpoints use this base URL:
```javascript
const API_BASE_URL = 'localhost/php';
```

Since myTAD is hosted on `my.thatoneamiho.cc`, the full endpoint URLs are:
- `localhost/php/get-gamers.php`
- `localhost/php/gamer-action.php`
- `localhost/php/send-gamer-message.php`
- `localhost/php/get-gamer-stats.php`
- `localhost/php/broadcast-message.php`

---

## Testing Checklist

- [ ] Admin can view gamers list
- [ ] Admin can kick a gamer
- [ ] Admin can ban/unban from game
- [ ] Admin can send messages to gamers
- [ ] Admin can view gamer stats
- [ ] Owner can broadcast messages
- [ ] Owner message broadcast works
- [ ] Non-admin users cannot access Gamers tab
- [ ] Error handling works for invalid gamer IDs
- [ ] Messages have proper character limits

---

## Configuration

**File**: `myTAD.html`
- Already has all UI and frontend validation
- Ready to connect to PHP endpoints
- API base URL: `localhost/php`

**Admin-Only**: Only user `thatoneamiho` can access this feature
**Owner-Only**: Broadcast features only for owner

---

## Next Steps

1. Create the 5 PHP endpoint files in `/php` directory
2. Update database schema with new columns
3. Test all admin functions
4. Deploy to `my.thatoneamiho.cc`

---

**Version**: 0.2
**Last Updated**: November 10, 2025
**Status**: Ready for Implementation
