import React, { useEffect, useState, useRef } from 'react';

/**
 * MainMenu Component - The primary UI for Iron Dominion
 * Features: Animated background, military-styled buttons with hover effects,
 * responsive layout, and authentic HOI4 atmosphere
 */
const MainMenu = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [soundEnabled, setSoundEnabled] = useState(false);
  const audioRef = useRef(null);

  // Track mouse position for parallax effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initialize audio (muted by default)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.muted = true;
    }
  }, []);

  // Toggle background music
  const toggleMusic = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
      setSoundEnabled(!soundEnabled);
    }
  };

  // Handle button clicks
  const handleButtonClick = (action) => {
    console.log(`Action: ${action}`);
    // Placeholder for future functionality
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden screen-flicker">
      {/* Audio element for background music */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="/assets/theme-music.mp3"
      />

      {/* Parallax background with multiple layers */}
      <div className="parallax-bg">
        {/* Base layer - Dark gradient with background image */}
        <div
          className="parallax-layer"
          style={{
            backgroundImage: 'url(/assets/menu-background.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: `translateY(${mousePos.y * 0.05}px)`,
          }}
        />

        {/* Texture overlay - Military pattern */}
        <div
          className="parallax-layer"
          style={{
            background: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' result=\'noise\' /%3E%3CfeColorMatrix in=\'noise\' type=\'saturate\' values=\'0.3\' /%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' fill=\'%23ffd700\' filter=\'url(%23noise)\' opacity=\'0.03\' /%3E%3C/svg%3E")',
            backgroundSize: '100px 100px',
            opacity: 0.4,
            transform: `translate(${mousePos.x * 0.02}px, ${mousePos.y * 0.02}px)`,
          }}
        />

        {/* Scanline effect */}
        <div
          className="parallax-layer"
          style={{
            background: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
            pointerEvents: 'none',
          }}
        />

        {/* VHS Horizontal Effect - Lines from left to right */}
        <div className="vhs-effect" />

        {/* VHS Vertical Distortion */}
        <div className="vhs-vertical" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        {/* Top decoration bar */}
        <div className="w-full max-w-2xl mb-8 h-1 bg-gradient-to-r from-transparent via-yellow-600 to-transparent opacity-60" />

        {/* Game Title */}
        <div className="text-center mb-12 animate-slide-in">
          <h1 className="text-6xl md:text-7xl font-black tracking-widest text-yellow-400 title-glow font-hoi4 drop-shadow-2xl">
            IRON DOMINION
          </h1>
          <p className="text-yellow-600 text-sm md:text-base tracking-[0.2em] mt-2 font-military">
            GRAND STRATEGY • WORLD AT WAR
          </p>
        </div>

        {/* Subtitle */}
        <div className="w-full max-w-2xl text-center mb-12 px-4">
          <div className="border-l-4 border-r-4 border-yellow-700 border-opacity-50 py-3 px-6 bg-black bg-opacity-40">
            <p className="text-yellow-600 text-xs md:text-sm tracking-wider font-military italic">
              "Command your nation through the crucible of global conflict"
            </p>
          </div>
        </div>

        {/* Decoration separator */}
        <div className="w-full max-w-xl mb-12 flex items-center justify-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent to-yellow-700 opacity-50" />
          <div className="w-2 h-2 bg-yellow-600 opacity-70" />
          <div className="flex-1 h-px bg-gradient-to-l from-transparent to-yellow-700 opacity-50" />
        </div>

        {/* Main Menu Buttons */}
        <div className="flex flex-col gap-4 w-full max-w-sm mb-8">
          <button
            onClick={() => handleButtonClick('singleplayer')}
            className="military-btn hover:animate-pulse-glow"
          >
            ▶ SINGLEPLAYER
          </button>

          <button
            onClick={() => handleButtonClick('multiplayer')}
            className="military-btn hover:animate-pulse-glow"
          >
            ⚔ MULTIPLAYER
          </button>

          <button
            onClick={() => handleButtonClick('load')}
            className="military-btn hover:animate-pulse-glow"
          >
            📂 LOAD GAME
          </button>

          <button
            onClick={() => handleButtonClick('settings')}
            className="military-btn hover:animate-pulse-glow"
          >
            ⚙ SETTINGS
          </button>

          <button
            onClick={() => handleButtonClick('exit')}
            className="military-btn hover:animate-pulse-glow"
          >
            ⊗ EXIT GAME
          </button>
        </div>

        {/* Bottom control bar */}
        <div className="fixed bottom-4 left-4 right-4 flex justify-between items-center text-xs md:text-sm text-yellow-700">
          <button
            onClick={toggleMusic}
            className="px-3 py-1 border border-yellow-700 hover:border-yellow-500 hover:text-yellow-400 transition-all"
          >
            {soundEnabled ? '🔊 MUSIC ON' : '🔇 MUSIC OFF'}
          </button>

          <span className="text-center flex-1 font-military">
            IRON DOMINION v0.1.0 - © 2025
          </span>

          <div className="text-right">
            <p className="text-yellow-600">READY</p>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="fixed top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-yellow-600 opacity-50" />
      <div className="fixed top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-yellow-600 opacity-50" />
      <div className="fixed bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-yellow-600 opacity-50" />
      <div className="fixed bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-yellow-600 opacity-50" />
    </div>
  );
};

export default MainMenu;
