# ⚡ Iron Dominion - Quick Reference Card

## 🚀 Quick Start (30 seconds)

### React Version
```bash
npm install && npm start
# Opens at http://localhost:3000
```

### Standalone (No Build)
```bash
# Just open in browser
standalone.html
```

---

## 📁 Key Files Map

| File | Purpose | Edit For |
|------|---------|----------|
| `src/components/MainMenu.jsx` | Main UI Component | Button text, layout, handlers |
| `src/index.css` | Global Styles | Colors, animations, effects |
| `tailwind.config.js` | Theme Config | Custom colors, fonts, animations |
| `standalone.html` | No-build version | Quick testing, pure HTML/CSS/JS |
| `public/index.html` | HTML Template | Page title, meta tags |

---

## 🎨 Color Scheme

| Color | Hex Code | Use |
|-------|----------|-----|
| Gold | `#ffd700` | Text, borders, glow |
| Dark Brown | `#8b7355` | Button borders |
| Light Brown | `#d4a574` | Hover state |
| Dark Gray | `#3d3d3d` | Button background |
| Black | `#0a0a0a` | Base background |

---

## 🔧 Common Edits

### Change Game Title
**File:** `src/components/MainMenu.jsx` (line 97)
```jsx
IRON DOMINION  →  YOUR_TITLE
```

### Change Button Text
**File:** `src/components/MainMenu.jsx` (lines 116-135)
```jsx
▶ SINGLEPLAYER  →  ▶ YOUR_TEXT
```

### Change Background Color
**File:** `src/index.css` (line 24)
```css
#0a0a0a  →  #your-color
```

### Add Button Click Sound
**File:** `src/components/MainMenu.jsx`
```javascript
const playSound = () => soundRef.current?.play();
```

### Change Hover Animation
**File:** `src/index.css` (line 53)
```css
transform: translateY(-3px) scale(1.05);  // Edit this line
```

---

## 🎮 Button Names

```
▶  Play/Forward
⚔  Multiplayer/Combat
📂  Files/Load
⚙  Settings/Config
⊗  Exit/Close
🎯  Target/Objective
📊  Stats/Info
🔊  Volume/Sound
🌍  World/Map
```

---

## 💡 CSS Classes Quick Reference

```css
.military-btn          /* Regular button */
.military-btn:hover    /* When hovering */
.military-btn:active   /* When clicking */

.title-glow            /* Golden glow effect */
.parallax-bg           /* Background container */
.parallax-layer        /* Background layer */

.screen-flicker        /* CRT screen effect */
.warning-stripe        /* Diagonal stripe pattern */
```

---

## 🎭 TailwindCSS Quick Classes

```html
<!-- Text -->
text-yellow-400        <!-- Gold text -->
text-sm md:text-base   <!-- Responsive text -->
tracking-wider         <!-- Letter spacing -->
uppercase              <!-- Capital letters -->

<!-- Sizing -->
px-8 py-4              <!-- Padding -->
w-full h-screen        <!-- Full screen -->
max-w-sm               <!-- Max width -->

<!-- Effects -->
shadow-lg              <!-- Drop shadow -->
opacity-50             <!-- Transparency -->
transition-all         <!-- Animation -->
```

---

## 📱 Responsive Breakpoints

```css
sm: 640px              /* Small phones */
md: 768px              /* Tablets */
lg: 1024px             /* Desktop */
xl: 1280px             /* Large desktop */
2xl: 1536px            /* Ultra wide */
```

**Example:**
```jsx
text-base md:text-lg lg:text-2xl  // Different sizes per screen
```

---

## 🎬 Animation Reference

| Animation | Usage | Duration |
|-----------|-------|----------|
| `animate-slide-in` | Title entrance | 0.6s |
| `animate-pulse-glow` | Button hover | 2s infinite |
| `screen-flicker` | Screen effect | 0.15s infinite |

---

## 🔊 Audio Setup

```javascript
// Reference in JSX
<audio ref={audioRef} loop muted src="url" volume={0.3} />

// Toggle
audioRef.current.muted = !audioRef.current.muted;

// Volume (0-1)
audioRef.current.volume = 0.3;
```

---

## 📊 Performance Targets

- ✅ Page Load: < 3s
- ✅ Animation FPS: 60fps
- ✅ Bundle Size: < 500KB
- ✅ Lighthouse Score: > 90

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Button not working | Check console for errors, verify onClick handler |
| Animations glitchy | Use CSS instead of JS, profile in DevTools |
| Text not visible | Check contrast, verify text-shadow |
| Layout broken on mobile | Check media queries, test with DevTools |
| Audio not playing | Check CORS headers, browser autoplay policy |

---

## 🚢 Deploy in 3 Steps

```bash
# 1. Build
npm run build

# 2. Choose platform
# Netlify: netlify deploy --prod --dir=build
# Vercel: vercel deploy --prod
# GitHub Pages: git push origin main

# 3. Done! 🎉
```

---

## 📚 Documentation Files

- `SETUP.md` - Complete setup guide
- `DEVELOPER_GUIDE.md` - In-depth development guide
- `standalone.html` - No-build version
- This file - Quick reference

---

## 🎓 Quick Learning

### CSS Animation Syntax
```css
animation: name duration timing-function iteration-count;
animation: pulse-glow 2s ease-in-out infinite;
```

### React Hook - useEffect
```javascript
useEffect(() => {
  // Code runs on component mount
  return () => {
    // Cleanup on unmount
  };
}, [dependencies]); // Dependencies array
```

### TailwindCSS Responsive
```jsx
className="text-sm md:text-base lg:text-lg"
// sm and below: text-sm
// md to lg: text-base
// lg and above: text-lg
```

---

## 🎯 Next Features to Add

- [ ] Game state (Redux/Context)
- [ ] Map selection screen
- [ ] Nation picker
- [ ] Turn-based gameplay
- [ ] Diplomacy system
- [ ] Military units
- [ ] Technology tree
- [ ] Save/Load feature
- [ ] Multiplayer connection
- [ ] Settings menu

---

## 💬 Command Cheatsheet

```bash
# Development
npm start              # Start dev server
npm run build          # Production build
npm test               # Run tests

# Git
git add .              # Stage changes
git commit -m "msg"    # Commit
git push               # Push to GitHub

# Package Management
npm install            # Install dependencies
npm install pkg-name   # Add new package
npm update             # Update packages
```

---

## 🎖️ Iron Dominion Facts

- **Game Name:** Iron Dominion
- **Theme:** WW2 Grand Strategy
- **Framework:** React 18.2.0
- **Styling:** TailwindCSS 3.3.0
- **Fonts:** Roboto Condensed (Google Fonts)
- **Colors:** Gold (#ffd700) on dark backgrounds
- **Version:** 0.1.0
- **Status:** Main Menu Complete

---

**Need more info? Check SETUP.md or DEVELOPER_GUIDE.md** 📖

**Happy game developing! 🎮⚔️**
