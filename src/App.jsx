import React, { useState, useEffect } from 'react';
import MainMenu from './components/MainMenu';
import LoginPage from './components/LoginPage';

/**
 * Iron Dominion - Hearts of Iron IV Style Web Game
 * Main App Component with Authentication
 */
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Get API base URL - adjust based on your deployment environment
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/php/check-auth.php`, {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          if (data.authenticated) {
            setUser(data);
            setIsAuthenticated(true);
          }
        }
      } catch (err) {
        console.error('Auth check failed:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [apiBaseUrl]);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    try {
      await fetch(`${apiBaseUrl}/php/logout.php`, {
        method: 'POST',
        credentials: 'include'
      });
    } catch (err) {
      console.error('Logout error:', err);
    }
    
    setIsAuthenticated(false);
    setUser(null);
  };

  // Show loading state
  if (loading) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-black text-yellow-500 mb-4" style={{ textShadow: '0 0 20px rgba(217, 119, 6, 0.8)' }}>
            IRON DOMINION
          </div>
          <div className="text-yellow-600 animate-pulse">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen">
      {isAuthenticated ? (
        <>
          {/* Logout button in top right */}
          <div className="absolute top-4 right-4 z-50">
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded text-sm transition-colors"
            >
              Logout ({user?.username})
            </button>
          </div>
          <MainMenu />
        </>
      ) : (
        <LoginPage 
          onLoginSuccess={handleLoginSuccess} 
          apiBaseUrl={apiBaseUrl}
        />
      )}
    </div>
  );
}

export default App;
