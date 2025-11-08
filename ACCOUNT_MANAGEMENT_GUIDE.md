# Account Management System - Quick Start Guide

## What's New

Your Iron Dominion authentication system now includes a complete account management dashboard. Players can manage their profiles, change passwords, update contact info, and more—all from the secure `myDominion.html` page.

## How to Use

### Step 1: Log In
1. Go to `myDominion.html`
2. Enter your username and password
3. Click "🔐 LOGIN" (or create an account with "⚔ REGISTER")

### Step 2: Manage Your Account
Once logged in, you'll see your account overview showing:
- 👤 Your username
- 📧 Your email address
- 📅 Account creation date
- 🔄 Last login date
- 📊 Total login count

Click the **"⚙ MANAGE ACCOUNT"** button to access three management sections:

---

## Management Sections

### 📋 Profile Tab
Change your username and email address.

**Change Username:**
1. Enter a new username (3-30 characters)
2. Can only use letters, numbers, hyphens (-), and underscores (_)
3. Click "Update Username"
4. System checks if username is available
5. Your account is immediately updated

**Change Email:**
1. Enter a new email address
2. Must be a valid email format
3. Click "Update Email"
4. Email is updated on your account

### 🔒 Security Tab
Change your password and manage account deletion.

**Change Password:**
1. Enter your current password (for verification)
2. Enter your new password (6+ characters)
3. Confirm the new password by typing it again
4. Click "Update Password"
5. Password is changed immediately
6. You'll be logged back to the account overview

**Delete Account (⚠️ DANGER ZONE):**
1. Click "Delete Account" button
2. You'll get a confirmation dialog
3. You'll get a second warning explaining it cannot be undone
4. If you confirm, your account and ALL data is permanently deleted
5. You'll be logged out and returned to the login screen

### ⚡ Preferences Tab
Customize your account preferences (saved locally on your device).

**Available Preferences:**
- ☑️ **Email Notifications** - Receive email alerts about your account (default: enabled)
- 👻 **Privacy Mode** - Hide yourself from other players' lists (default: disabled)
- 🌙 **Dark Theme** - Use dark mode interface (default: enabled)

Preferences are saved instantly to your browser and persist across sessions.

---

## Back to Game

Click **"← Return to Iron Dominion"** to go back to the main game.

Click **"← Back to Account"** (from management) to return to account overview.

---

## Account Actions From Main Game

In `index.html` main menu:
- Click the **"🔐 myDOMINION"** button to go to account management
- Click the **"LOGOUT"** button to:
  1. Log out of your session
  2. Redirect to `myDominion.html` login page
  3. All session data cleared, cookies removed

---

## Security Features

✅ **Your password is secure:**
- Stored as one-way hash (bcrypt with salt)
- We never store your plain password
- Password change requires current password verification

✅ **Your session is protected:**
- Session tokens are 256-bit random numbers
- Cookies are HttpOnly (can't be accessed by JavaScript)
- Session expires when you log out

✅ **Your data is validated:**
- All inputs checked on client and server
- Username format validation (3-30 chars, alphanumeric+dash+underscore)
- Email format validation (RFC 5322 standard)

---

## Troubleshooting

**"Username already taken"**
- The username you chose is already in use
- Try a different username

**"Email already registered"**
- That email is already associated with another account
- Use a different email or recover your existing account

**"Current password is incorrect"**
- The current password you entered doesn't match
- Make sure you didn't make a typo
- Try logging out and back in if you forgot your password

**"Session expired"**
- You've been logged out due to inactivity or new login
- Log back in on the login screen

---

## API Endpoints (For Developers)

Behind the scenes, these endpoints power account management:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/php/update-username.php` | POST | Change username |
| `/php/update-email.php` | POST | Change email |
| `/php/update-password.php` | POST | Change password |
| `/php/get-account-stats.php` | GET | Fetch account stats |
| `/php/delete-account.php` | POST | Delete account |
| `/php/check-auth.php` | GET | Check if user is logged in |
| `/php/login.php` | POST | Log in |
| `/php/logout.php` | POST | Log out |
| `/php/register.php` | POST | Create new account |

All endpoints require an active session (except login/register).

---

## Frequently Asked Questions

**Q: Can I change my username back?**
A: Yes, you can change it as many times as you like (as long as the new username isn't taken).

**Q: What happens if I delete my account?**
A: Everything is permanently removed - your account, stats, preferences, everything. This cannot be undone. Make sure you're certain!

**Q: Are my preferences stored on the server?**
A: No, preferences are stored in your browser's localStorage. They're tied to this device only. If you use a different device, you'll need to set them again.

**Q: Can I recover a deleted account?**
A: No. Account deletion is permanent and irreversible. Plan accordingly!

**Q: What if I forget my password?**
A: Currently, use the account you're on to change it from the Security tab. If you're locked out, contact an administrator.

**Q: How long does my session last?**
A: Sessions last as long as you keep the browser open. With "Remember Me" enabled, you can stay logged in for up to 30 days.

---

## Best Practices

1. **Use a strong password** (mix letters, numbers, special characters if possible)
2. **Keep your email updated** (helps with account recovery)
3. **Don't share your password** with anyone
4. **Log out** when using a shared computer
5. **Enable email notifications** to be aware of account changes
6. **Review your account info regularly** to spot unauthorized changes

---

## Feedback & Bug Reports

If you encounter any issues:
1. Note down exactly what happened
2. Include any error messages you see
3. Report to your system administrator

Common issues might be:
- Network/connection problems (try refreshing the page)
- Browser compatibility (use a modern browser like Chrome, Firefox, Edge, Safari)
- Cached data (clear browser cache if things look weird)

---

**Happy gaming, Commander!**
Your account is now fully managed. Enjoy Iron Dominion! 🎮⚔️
