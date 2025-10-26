# 🎮 Iron Dominion - Developer Guide

## Quick Start

### Option 1: React Version (Recommended for Development)
```bash
npm install
npm start
```
Runs on `http://localhost:3000`

### Option 2: Standalone HTML Version
Simply open `standalone.html` in your browser. No build process needed!

---

## 📁 File Structure Explained

### Core React Application
- **`src/App.jsx`** - Main React component, renders MainMenu
- **`src/index.js`** - React DOM entry point
- **`src/index.css`** - Global styles using TailwindCSS
- **`src/components/MainMenu.jsx`** - Main menu UI component (250+ lines)

### Configuration Files
- **`tailwind.config.js`** - TailwindCSS theme configuration
- **`postcss.config.js`** - PostCSS for CSS processing
- **`package.json`** - Dependencies and scripts

### Static Assets
- **`public/index.html`** - HTML template
- **`public/.htaccess`** - Server compression (Gzip)
- **`standalone.html`** - Standalone HTML version (no build needed)

---

## 🎨 Styling Deep Dive

### TailwindCSS Custom Configuration

#### Custom Colors
```javascript
// tailwind.config.js
colors: {
  "metallic": "#3d3d3d",     // Button base
  "rust": "#8b4513",         // Borders
  "warred": "#8b0000",       // Alert red
  "militarygreen": "#1a1a1a" // Backgrounds
}
```

#### Custom Fonts
```javascript
fontFamily: {
  "hoi4": ["Roboto Condensed", "Arial Black", "sans-serif"],
  "military": ["Courier New", "monospace"],
}
```

#### Custom Animations
```javascript
animation: {
  "pulse-glow": "pulse-glow 2s infinite",    // Glow effect
  "slide-in": "slide-in 0.6s ease-out",      // Entry animation
  "flicker": "flicker 0.15s infinite",       // Screen flicker
}
```

### CSS Classes Reference

```css
.military-btn          /* Main button styling */
.military-btn:hover    /* Hover effect */
.military-btn:active   /* Click effect */
.military-btn::before  /* Shine effect */

.parallax-bg          /* Background container */
.parallax-layer       /* Individual background layers */

.title-glow           /* Title text effect */
.warning-stripe       /* Diagonal stripe pattern */
.screen-flicker       /* CRT flicker effect */
```

---

## 🎮 Component Architecture

### MainMenu Component
The heart of the application. Located in `src/components/MainMenu.jsx`

**Key Features:**
- Mouse position tracking for parallax
- Audio system with mute toggle
- Button click handlers
- Responsive layout

**State Management:**
```javascript
const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
const [soundEnabled, setSoundEnabled] = useState(false);
```

**Effects:**
```javascript
// Mouse tracking
useEffect(() => { /* parallax calculation */ }, [])

// Audio initialization
useEffect(() => { /* setup audio */ }, [])
```

---

## 🚀 Customization Recipes

### Change Button Text
**File:** `src/components/MainMenu.jsx` (lines 116-135)
```jsx
<button className="military-btn" onClick={() => handleButtonClick('action')}>
  ✨ NEW BUTTON TEXT
</button>
```

### Change Color Scheme
**Option 1 - TailwindCSS Classes:**
```jsx
// Change from gold to silver
className="text-yellow-400"  → className="text-gray-300"
className="text-yellow-600"  → className="text-gray-400"
className="border-yellow-700" → className="border-gray-600"
```

**Option 2 - Global CSS:**
Edit `src/index.css`, find:
```css
color: #ffd700;  /* Golden */
```
Change to your color (e.g., `#c0c0c0` for silver)

### Add Background Image
**File:** `src/components/MainMenu.jsx` (line 62)

Replace:
```jsx
background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
```

With:
```jsx
backgroundImage: 'url(/assets/your-image.jpg)',
backgroundSize: 'cover',
backgroundPosition: 'center',
```

### Add Sound Effects
**File:** `src/components/MainMenu.jsx`

Add audio refs and handlers:
```jsx
const clickSoundRef = useRef(null);

const playClickSound = () => {
  clickSoundRef.current?.play();
};

// In button onClick:
<button onClick={() => { playClickSound(); handleButtonClick('action'); }}>
```

Add audio element:
```jsx
<audio ref={clickSoundRef} src="/assets/click.mp3" />
```

### Change Button Hover Effects
**File:** `src/index.css` (lines 41-65)

Modify the `.military-btn:hover` class:
```css
.military-btn:hover {
  transform: scale(1.1) rotate(1deg);  /* Add rotation */
  box-shadow: /* custom shadows */;
}
```

### Add More Menu Items
**File:** `src/components/MainMenu.jsx`

Add button in the buttons container (after line 118):
```jsx
<button
  onClick={() => handleButtonClick('newaction')}
  className="military-btn hover:animate-pulse-glow"
>
  🎯 NEW ACTION
</button>
```

### Adjust Animation Speeds
**File:** `tailwind.config.js` (keyframes section)

Change duration in animation definition:
```javascript
"slide-in": "slide-in 0.6s ease-out",  // Change 0.6s to desired value
```

---

## 🎵 Audio Management

### Background Music
```javascript
// In MainMenu.jsx - line 84
<audio
  ref={audioRef}
  loop
  preload="auto"
  src="YOUR_AUDIO_URL_HERE"
/>
```

### Supported Formats
- MP3 (.mp3)
- WebM (.webm)
- WAV (.wav)
- OGG (.ogg)

### Volume Control
```javascript
audioRef.current.volume = 0.5;  // 0 to 1 scale
```

### Best Practices
- Use muted by default (better UX)
- Provide visible toggle button
- Keep volume at 0.2-0.4 to avoid overwhelming
- Use high-quality source (bitrate > 128kbps)

---

## 📱 Responsive Design

### Current Breakpoints (from TailwindCSS)
```css
sm: 640px
md: 768px  
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Testing Responsive Layouts

**Chrome DevTools:**
1. Press F12
2. Click device toggle (Ctrl+Shift+M)
3. Select device or set custom dimensions

**Common Test Resolutions:**
- 1920x1080 (Desktop)
- 1280x720 (Landscape Tablet)
- 768x1024 (iPad Portrait)
- 390x844 (iPhone)
- 360x640 (Mobile Portrait)

### Media Query Examples
```css
/* Extra large screens */
@media (min-width: 1920px) {
  .military-btn { font-size: 1.5rem; }
}

/* Tablets */
@media (max-width: 768px) {
  .military-btn { padding: 0.75rem 1.5rem; }
}

/* Mobile */
@media (max-width: 480px) {
  .title-main { font-size: clamp(1.5rem, 5vw, 3rem); }
}
```

---

## 🔍 Debugging Tips

### Console Logging
```javascript
// Check button clicks
console.log(`Action: ${action}`);

// Check mouse position
console.log(`Mouse: ${mousePos.x}, ${mousePos.y}`);

// Check audio state
console.log(`Audio muted: ${audioRef.current.muted}`);
```

### Browser DevTools
- **Elements Tab** - Inspect HTML structure
- **Styles Tab** - View applied CSS
- **Console Tab** - JavaScript errors and logs
- **Performance Tab** - Animation frame rate

### Common Issues

**Button not responding:**
- Check console for JavaScript errors
- Verify onClick handler is called
- Check CSS overflow: hidden on parent

**Animations janky:**
- Use CSS animations instead of JavaScript
- Profile in Chrome DevTools Performance tab
- Reduce complexity of parallax calculations

**Text not visible:**
- Check contrast ratio (should be > 4.5:1 for WCAG)
- Verify text-shadow doesn't obscure text
- Check font-size with clamp() function

---

## 🚢 Deployment

### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod --dir=build
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
npm run build
vercel deploy --prod
```

### GitHub Pages Deployment
```bash
# Add to package.json
"homepage": "https://username.github.io/hoi4fake",

# Deploy script
npm run build
git add build
git commit -m "Deploy"
git push origin main
```

### Self-Hosted
1. Run `npm run build`
2. Upload contents of `/build` folder to server
3. Configure server to serve `public/index.html` on all routes

---

## 📈 Performance Optimization

### Current Optimizations
✅ CSS animations (not JavaScript)  
✅ Minimal React re-renders  
✅ SVG background patterns  
✅ Lazy font loading (Google Fonts)  

### Additional Optimization Ideas
- [ ] Image optimization with WebP format
- [ ] Code splitting for future pages
- [ ] Service Worker for offline support
- [ ] Gzip compression on server
- [ ] Minification and bundling

### Measuring Performance
```bash
# Lighthouse audit in Chrome
1. DevTools → Lighthouse
2. Run audit for Desktop/Mobile
3. Check Performance, Accessibility scores
```

---

## 🎓 Learning Resources

### React
- [React Official Docs](https://react.dev)
- [React Hooks Guide](https://react.dev/reference/react)

### TailwindCSS
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [TailwindCSS Components](https://tailwindcss.com/docs/components)

### CSS Animations
- [MDN Animation Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/animation)
- [Animate.css Library](https://animate.style/)

### Game Design
- [Game Design Patterns](https://www.gamedesignpatterns.org/)
- [HOI4 Wiki](https://hoi4.paradoxwikis.com/)

---

## 🤝 Contributing

Want to improve Iron Dominion? Here's how:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

### Contribution Guidelines
- Follow existing code style
- Test on multiple screen sizes
- Add comments for complex logic
- Update README if adding features
- Ensure no console errors

---

## 📝 License

This project is for educational and personal use. Not affiliated with Paradox Interactive.

---

## 🎯 Next Steps

1. **Try it out** - Open `standalone.html` in browser
2. **Run development server** - `npm start`
3. **Customize colors** - Edit `tailwind.config.js`
4. **Add new pages** - Create components in `src/components/`
5. **Deploy** - Follow deployment instructions

**Happy coding! 🎖️**
