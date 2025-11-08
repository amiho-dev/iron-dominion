@echo off
REM Iron Dominion - Authentication API Testing Script (Windows)
REM 
REM Usage: test-auth.bat
REM Requires: curl (built-in on Windows 10+)
REM
REM This batch script tests all authentication endpoints

setlocal enabledelayedexpansion

REM Configuration
set API_URL=http://localhost:3000
set TEST_USERNAME=testuser_%RANDOM%
set TEST_EMAIL=test_%RANDOM%@example.com
set TEST_PASSWORD=TestPass123!@#

cls
echo.
echo ================================
echo Iron Dominion - Auth API Tests
echo ================================
echo.
echo API URL: %API_URL%
echo.

REM Test 1: Register
echo [TEST 1/5] User Registration
curl -X POST "%API_URL%/php/register.php" ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"%TEST_USERNAME%\", \"email\": \"%TEST_EMAIL%\", \"password\": \"%TEST_PASSWORD%\"}"

echo.
echo.

REM Test 2: Login
echo [TEST 2/5] User Login
curl -X POST "%API_URL%/php/login.php" ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"%TEST_USERNAME%\", \"password\": \"%TEST_PASSWORD%\", \"remember_me\": true}"

echo.
echo.

REM Test 3: Check Authentication
echo [TEST 3/5] Check Authentication Status
curl -X GET "%API_URL%/php/check-auth.php"

echo.
echo.

REM Test 4: Invalid Login (should fail)
echo [TEST 4/5] Invalid Login (should fail)
curl -X POST "%API_URL%/php/login.php" ^
  -H "Content-Type: application/json" ^
  -d "{\"username\": \"%TEST_USERNAME%\", \"password\": \"WrongPassword123\"}"

echo.
echo.

REM Test 5: Logout
echo [TEST 5/5] User Logout
curl -X POST "%API_URL%/php/logout.php"

echo.
echo.
echo ================================
echo Tests completed!
echo ================================
echo.
echo Test Summary:
echo   - Created test user: %TEST_USERNAME%
echo   - Email: %TEST_EMAIL%
echo   - All endpoints should respond above
echo.
echo Next steps:
echo   1. Check responses for "success":true
echo   2. Try logging in with the test user in the UI
echo   3. Check 'Remember Me' box
echo   4. Close browser and reopen
echo   5. You should be auto-logged in
echo.
pause
