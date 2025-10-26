# Iron Dominion - Hearts of Iron IV Style Web Game

A WW2 grand strategy game knockoff with an authentic Hearts of Iron IV aesthetic. This is a React-based web game featuring a stunning main menu with military styling, animations, and immersive atmosphere.

## 🎮 Project Overview

**Game Name:** Iron Dominion  
**Theme:** WW2 Grand Strategy  
**Status:** Base Main Menu (v0.1.0)

Iron Dominion captures the essence of Hearts of Iron IV with a dark, gritty military interface. Players encounter an authentic WW2 atmosphere with golden military buttons, parallax backgrounds, and responsive animations.

---

## 📁 Project Structure

```
iron-dominion/
├── src/
│   ├── components/
│   │   └── MainMenu.jsx       # Main menu UI component
│   ├── App.jsx                 # Root React component
│   ├── index.js                # Entry point
│   └── index.css               # Global styles + TailwindCSS
├── public/
│   ├── index.html              # HTML template
│   └── .htaccess               # Server compression config
├── assets/
│   └── (Placeholder for backgrounds, audio, fonts)
├── package.json                # Dependencies and scripts
├── tailwind.config.js          # TailwindCSS configuration
├── postcss.config.js           # PostCSS configuration
└── .gitignore                  # Git ignore rules
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Installation & Running

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm build
```

The game will open at `http://localhost:3000`

---

## 🎨 Features Implemented

### ✅ Main Menu UI
- **Large, thematic title** - "IRON DOMINION" with golden glow effect
- **Subtitle tagline** - Military-themed tagline with vintage styling
- **5 Main buttons** - Singleplayer, Multiplayer, Load Game, Settings, Exit Game
- **Responsive layout** - Scales perfectly for 16:9 and 4:3 resolutions

### ✅ Visual Design
- **Dark, gritty atmosphere** - #0a0a0a base with layered overlays
- **Metallic/weathered buttons** - Gradient-based military button styling
- **Golden text (#ffd700)** - Authentic military color scheme
- **Parallax background** - Multi-layer backgrounds with mouse tracking
- **Scanline effect** - Vintage CRT monitor aesthetic
- **Corner decorations** - Military corner borders for framing

### ✅ Animations & Interactions
- **Hover animations** - Buttons scale, glow, and shift upward on hover
- **Smooth slide-in** - Title animates in on page load
- **Parallax effects** - Background layers shift with mouse movement
- **Pulsing glow** - Button glow effect on hover
- **Screen flicker** - Subtle flickering for authenticity
- **Shine effect** - Animated light sweep across buttons on hover

### ✅ Interactive Features
- **Music toggle** - Bottom-left button to toggle background music (muted by default)
- **Button click handlers** - Ready for future game logic integration
- **Responsive buttons** - Mobile-optimized sizing (tested at multiple breakpoints)

### ✅ Technical Excellence
- **React component architecture** - Modular, reusable MainMenu component
- **TailwindCSS styling** - Utility-first CSS with custom animations
- **Google Fonts integration** - Roboto Condensed for military aesthetic
- **Audio ready** - Placeholder audio element with volume control
- **Responsive design** - Mobile, tablet, and desktop support
- **Performance optimized** - Minimal re-renders, CSS animations

### ✅ Styling & Fonts
- **Primary font:** Roboto Condensed (Google Fonts) - Military/Bold
- **Secondary font:** Courier New - Military/Technical feel
- **Color scheme:** Golden (#ffd700) text on dark backgrounds
- **Effects:** Text shadows, glows, gradients for depth

---

## 🎮 How to Use

### Main Menu Controls
- **Click any button** to see the action logged (console)
- **Hover over buttons** to see animation effects
- **Move mouse** to experience parallax effect
- **Click music icon** (bottom-left) to toggle background music

### Keyboard Navigation (Future)
Currently, the menu is mouse/touch driven. Keyboard navigation can be added in future versions.

---

## 🛠️ Customization Guide

### Change Game Title
Edit `src/components/MainMenu.jsx`, line 97:
```jsx
<h1 className="text-6xl md:text-7xl font-black tracking-widest text-yellow-400 title-glow font-hoi4 drop-shadow-2xl">
  YOUR_GAME_NAME_HERE
</h1>
```

### Modify Button Colors
Edit `tailwind.config.js` custom colors section or modify `.military-btn` in `src/index.css`

### Change Background Music
Edit `src/components/MainMenu.jsx`, line 84:
```jsx
<audio
  ref={audioRef}
  loop
  preload="auto"
  src="YOUR_AUDIO_URL_HERE"
/>
```

### Add Custom Background Image
Replace the gradient background in `src/components/MainMenu.jsx` with:
```jsx
style={{
  backgroundImage: 'url(/assets/background.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}}
```

### Adjust Button Styling
Modify the `.military-btn` class in `src/index.css` for:
- Border colors
- Shadow effects
- Button size
- Font styling

---

## 📱 Responsive Breakpoints

The game is optimized for:
- **Desktop:** 1920x1080, 2560x1440, etc.
- **16:9 widescreen:** Full scaling
- **4:3 aspect ratio:** Adapted layout
- **Tablets:** iPad, Surface, etc.
- **Mobile:** iPhone, Android (portrait/landscape)

Media queries in `src/index.css` handle responsive sizing.

---

## 🎵 Audio System

- **Background music:** Enabled with click to toggle
- **Default state:** Muted (respectful UX)
- **Volume:** 30% to avoid overwhelming
- **Format:** MP3 or WebM recommended
- **Loop:** Infinite playlist

To add sound effects for button clicks, modify `MainMenu.jsx` to play audio on `handleButtonClick()`.

---

## 🔧 Development Tips

### Adding New Menu Items
1. Add button in `src/components/MainMenu.jsx`
2. Create handler in `handleButtonClick()`
3. Route to new component when ready

### Styling New Elements
1. Use TailwindCSS classes for quick iteration
2. Add custom styles to `src/index.css` if needed
3. Test responsive breakpoints

### Performance Optimization
- Lazy-load large assets
- Optimize PNG/JPG backgrounds
- Consider CSS-in-JS for dynamic styling
- Use React.memo() for expensive components

---

## 🚢 Deployment

### Build for Production
```bash
npm run build
```

Output will be in `/build` directory.

### Deploy to Netlify, Vercel, or GitHub Pages
```bash
# For Vercel
vercel deploy --prod

# For Netlify
netlify deploy --prod --dir=build

# For GitHub Pages
npm run build
# Push build/ to gh-pages branch
```

---

## 🎯 Future Roadmap

- [ ] Game state management (Redux/Context API)
- [ ] Actual gameplay mechanics
- [ ] Map interface and nation selection
- [ ] Turn-based diplomatic system
- [ ] Military unit management
- [ ] Technology trees
- [ ] Save/Load functionality
- [ ] Multiplayer integration
- [ ] Audio effects for interactions
- [ ] Settings menu implementation
- [ ] More realistic HOI4 fonts (if available)

---

## 📄 License

Created for educational/fun purposes. Not affiliated with Paradox Interactive or Hearts of Iron IV.

---

## 💡 Credits

- **Game Concept:** Hearts of Iron IV (Paradox Interactive)
- **Design:** Military/WW2 aesthetics
- **Fonts:** Google Fonts (Roboto Condensed)
- **Framework:** React + TailwindCSS
- **Inspiration:** Classic grand strategy gaming

---

## ⚙️ Technical Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React     | 18.2.0  | UI Framework |
| TailwindCSS | 3.3.0  | Styling |
| PostCSS   | 8.4.24  | CSS Processing |
| Node.js   | 14+     | Runtime |

---

**Enjoy commanding your empire in Iron Dominion!** 🎖️

---

## 🎮 List of Features Implemented

### Core Features
✅ **Animated Main Menu** - Slide-in animations on load  
✅ **5 Menu Buttons** - Singleplayer, Multiplayer, Load Game, Settings, Exit  
✅ **Military Button Design** - Gradient, borders, shadows, and hover effects  
✅ **Parallax Background System** - Multi-layer backgrounds with mouse tracking  
✅ **Golden Color Scheme** - Authentic WW2 military aesthetic  
✅ **Responsive Design** - Mobile, tablet, and desktop support  
✅ **Hover Animations** - Scale, glow, and color transitions  
✅ **Scanline Effect** - Vintage CRT monitor aesthetic  
✅ **Title Glow Effect** - Golden text with shadow and glow  
✅ **Corner Decorations** - Military-style corner borders  
✅ **Music Toggle System** - Bottom control bar with mute/unmute  
✅ **TailwindCSS Integration** - Utility-first styling framework  
✅ **Google Fonts** - Roboto Condensed for military aesthetic  
✅ **Audio Element Ready** - Placeholder for background music  
✅ **Cross-browser Compatible** - Works on Chrome, Firefox, Safari, Edge  
✅ **Component Architecture** - Modular React components  
✅ **Custom TailwindCSS Config** - Extended colors, fonts, animations  
✅ **Screen Flicker Effect** - Subtle screen flicker for authenticity  
✅ **Shine Effect on Buttons** - Light sweep animation on hover  
✅ **Subtitle Tagline** - Military-themed quote with styling
