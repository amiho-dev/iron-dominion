import React, { useState } from 'react';

/**
 * Iron Dominion - Login/Register Component
 * 
 * Features:
 * - Switch between Login and Register modes
 * - Form validation
 * - Remember Me checkbox (persistent login via cookies)
 * - Error handling with user feedback
 */
function LoginPage({ onLoginSuccess, apiBaseUrl }) {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  // Form state for login
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });

  // Form state for register
  const [registerForm, setRegisterForm] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`${apiBaseUrl}/php/login.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          username: loginForm.username,
          password: loginForm.password,
          remember_me: rememberMe
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setSuccess('Login successful! Redirecting...');
      
      // Call parent callback with user data
      if (onLoginSuccess) {
        setTimeout(() => {
          onLoginSuccess(data);
        }, 500);
      }

    } catch (err) {
      setError(err.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Client-side validation
    if (registerForm.password !== registerForm.passwordConfirm) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/php/register.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerForm.username,
          email: registerForm.email,
          password: registerForm.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess('Account created successfully! Switching to login...');
      
      // Clear form and switch to login
      setTimeout(() => {
        setRegisterForm({ username: '', email: '', password: '', passwordConfirm: '' });
        setMode('login');
        // Pre-fill username for convenience
        setLoginForm({ username: registerForm.username, password: '' });
      }, 1500);

    } catch (err) {
      setError(err.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black via-gray-900 to-black flex items-center justify-center">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      {/* Main container */}
      <div className="relative z-10 w-full max-w-md px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-yellow-500 mb-2 drop-shadow-lg" 
              style={{ textShadow: '0 0 20px rgba(217, 119, 6, 0.8)' }}>
            IRON DOMINION
          </h1>
          <p className="text-gray-400 text-sm">
            {mode === 'login' ? 'Return to the battlefield' : 'Join the ranks'}
          </p>
        </div>

        {/* Main card */}
        <div className="bg-gray-950 border-2 border-yellow-600 rounded-lg p-8 backdrop-blur-sm bg-opacity-80 shadow-2xl">
          
          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900 border border-red-600 rounded text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-6 p-4 bg-green-900 border border-green-600 rounded text-green-200 text-sm">
              {success}
            </div>
          )}

          {/* Login Form */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-yellow-500 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={loginForm.username}
                  onChange={handleLoginChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 text-white placeholder-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label className="block text-yellow-500 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 text-white placeholder-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center mt-4">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading}
                  className="w-4 h-4 bg-gray-900 border border-yellow-600 rounded cursor-pointer"
                />
                <label htmlFor="rememberMe" className="ml-2 text-sm text-yellow-500 cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'LOGIN'}
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="text-yellow-500 hover:text-yellow-400 font-bold"
                >
                  Register
                </button>
              </p>
            </form>
          )}

          {/* Register Form */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-yellow-500 text-sm font-bold mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 text-white placeholder-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  placeholder="Choose a username (3-30 chars)"
                />
              </div>

              <div>
                <label className="block text-yellow-500 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 text-white placeholder-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-yellow-500 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 text-white placeholder-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  placeholder="Create a strong password (6+ chars)"
                />
              </div>

              <div>
                <label className="block text-yellow-500 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="passwordConfirm"
                  value={registerForm.passwordConfirm}
                  onChange={handleRegisterChange}
                  disabled={loading}
                  required
                  className="w-full px-4 py-2 bg-gray-900 border border-yellow-600 text-white placeholder-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'REGISTER'}
              </button>

              <p className="text-center text-gray-400 text-sm mt-4">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-yellow-500 hover:text-yellow-400 font-bold"
                >
                  Login
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          🔒 Passwords are securely hashed with bcrypt
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
