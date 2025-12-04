/**
 * Iron Dominion - Authentication API Utility
 * 
 * Centralized API calls for auth-related endpoints
 * Usage: import { authAPI } from './api/authAPI';
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

// Fetch wrapper with default options
async function fetchAPI(endpoint, options = {}) {
  const defaultOptions = {
    credentials: 'include', // Always include cookies
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...defaultOptions,
      ...options,
    });

    const data = await response.json();

    return {
      ok: response.ok,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 0,
      data: { error: error.message },
    };
  }
}

/**
 * Authentication API methods
 */
export const authAPI = {
  /**
   * Register a new user account
   * @param {string} username - Username (3-30 chars, alphanumeric + _ -)
   * @param {string} email - Email address
   * @param {string} password - Password (min 6 chars)
   * @returns {Promise<{ok: boolean, status: number, data: object}>}
   */
  register: async (username, email, password) => {
    return fetchAPI('/php/register.php', {
      method: 'POST',
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });
  },

  /**
   * Log in a user
   * @param {string} username - Username
   * @param {string} password - Password
   * @param {boolean} rememberMe - Keep user logged in for 30 days
   * @returns {Promise<{ok: boolean, status: number, data: object}>}
   */
  login: async (username, password, rememberMe = true) => {
    return fetchAPI('/php/login.php', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        remember_me: rememberMe,
      }),
    });
  },

  /**
   * Log out current user
   * @returns {Promise<{ok: boolean, status: number, data: object}>}
   */
  logout: async () => {
    return fetchAPI('/php/logout.php', {
      method: 'POST',
    });
  },

  /**
   * Check current authentication status
   * @returns {Promise<{ok: boolean, status: number, data: object}>}
   */
  checkAuth: async () => {
    return fetchAPI('/php/check-auth.php', {
      method: 'GET',
    });
  },

  /**
   * Get API base URL (useful for debugging)
   * @returns {string}
   */
  getBaseURL: () => API_BASE_URL,
};

export default authAPI;
