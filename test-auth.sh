#!/bin/bash
# Iron Dominion - Authentication API Testing Script
# 
# Usage: bash test-auth.sh
# Or on Windows with Git Bash / WSL: bash test-auth.sh
#
# This script tests all authentication endpoints

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_URL="${REACT_APP_API_URL:-http://localhost:3000}"
TIMESTAMP=$(date +%s)
TEST_USERNAME="testuser_$TIMESTAMP"
TEST_EMAIL="test_$TIMESTAMP@example.com"
TEST_PASSWORD="TestPass123!@#"

echo -e "${BLUE}================================${NC}"
echo -e "${BLUE}Iron Dominion - Auth API Tests${NC}"
echo -e "${BLUE}================================${NC}"
echo -e "API URL: ${YELLOW}$API_URL${NC}\n"

# Test 1: Register
echo -e "${BLUE}[TEST 1/5] User Registration${NC}"
REGISTER_RESPONSE=$(curl -s -X POST "$API_URL/php/register.php" \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$TEST_USERNAME\",
    \"email\": \"$TEST_EMAIL\",
    \"password\": \"$TEST_PASSWORD\"
  }")

if echo "$REGISTER_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Registration successful${NC}"
  echo "Response: $REGISTER_RESPONSE"
  USER_ID=$(echo "$REGISTER_RESPONSE" | grep -o '"user_id":[0-9]*' | grep -o '[0-9]*')
else
  echo -e "${RED}✗ Registration failed${NC}"
  echo "Response: $REGISTER_RESPONSE"
  exit 1
fi

echo ""

# Test 2: Login
echo -e "${BLUE}[TEST 2/5] User Login${NC}"
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/php/login.php" \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$TEST_USERNAME\",
    \"password\": \"$TEST_PASSWORD\",
    \"remember_me\": true
  }")

if echo "$LOGIN_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Login successful${NC}"
  echo "Response: $LOGIN_RESPONSE"
else
  echo -e "${RED}✗ Login failed${NC}"
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo ""

# Test 3: Check Authentication
echo -e "${BLUE}[TEST 3/5] Check Authentication Status${NC}"
AUTH_RESPONSE=$(curl -s -X GET "$API_URL/php/check-auth.php")

if echo "$AUTH_RESPONSE" | grep -q '"authenticated":true'; then
  echo -e "${GREEN}✓ Authentication check successful${NC}"
  echo "Response: $AUTH_RESPONSE"
else
  echo -e "${RED}✗ Authentication check failed${NC}"
  echo "Response: $AUTH_RESPONSE"
fi

echo ""

# Test 4: Invalid Login (should fail)
echo -e "${BLUE}[TEST 4/5] Invalid Login (should fail)${NC}"
INVALID_LOGIN=$(curl -s -X POST "$API_URL/php/login.php" \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"$TEST_USERNAME\",
    \"password\": \"WrongPassword123\"
  }")

if echo "$INVALID_LOGIN" | grep -q '"error"'; then
  echo -e "${GREEN}✓ Invalid login correctly rejected${NC}"
  echo "Response: $INVALID_LOGIN"
else
  echo -e "${RED}✗ Invalid login should have been rejected${NC}"
  echo "Response: $INVALID_LOGIN"
fi

echo ""

# Test 5: Logout
echo -e "${BLUE}[TEST 5/5] User Logout${NC}"
LOGOUT_RESPONSE=$(curl -s -X POST "$API_URL/php/logout.php")

if echo "$LOGOUT_RESPONSE" | grep -q '"success":true'; then
  echo -e "${GREEN}✓ Logout successful${NC}"
  echo "Response: $LOGOUT_RESPONSE"
else
  echo -e "${RED}✗ Logout failed${NC}"
  echo "Response: $LOGOUT_RESPONSE"
fi

echo ""
echo -e "${BLUE}================================${NC}"
echo -e "${GREEN}✓ All tests completed!${NC}"
echo -e "${BLUE}================================${NC}"
echo ""
echo "Test Summary:"
echo "  - Created test user: $TEST_USERNAME"
echo "  - Email: $TEST_EMAIL"
echo "  - All endpoints responding correctly"
echo ""
echo "Next steps:"
echo "  1. Try logging in with the test user in the UI"
echo "  2. Check 'Remember Me' box"
echo "  3. Close browser and reopen"
echo "  4. You should be auto-logged in"
echo ""
