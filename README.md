# 🎖️ Iron Dominion - Hearts of Iron IV Style Web Game

> A WW2 grand strategy game knockoff made for fun. Features an authentic Hearts of Iron IV-inspired main menu with React, TailwindCSS, and beautiful military aesthetics.

![Status](https://img.shields.io/badge/Status-Main%20Menu%20Complete-brightgreen)
![Version](https://img.shields.io/badge/Version-0.1.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.0-38bdf8?logo=tailwindcss)

---

## 🚀 Quick Start

### Option 1: React Development Server (Recommended)
```bash
npm install
npm start
# Opens at http://localhost:3000
```

### Option 2: Standalone HTML (No Build Required)
Simply open `standalone.html` in your browser!

---

## ✨ Features Implemented

### 🎮 Main Menu Components
- ✅ **Thematic Title** - "IRON DOMINION" with golden glow effect
- ✅ **5 Menu Buttons** - Singleplayer, Multiplayer, Load Game, Settings, Exit Game
- ✅ **Subtitle Tagline** - Military-themed quote with styling
- ✅ **Responsive Layout** - Perfect for 16:9 and 4:3 resolutions

### 🎨 Visual Design
- ✅ **Dark, Gritty Atmosphere** - WW2 aesthetic with black and gold colors
- ✅ **Metallic/Weathered Buttons** - Gradient-based military button styling
- ✅ **Golden Color Scheme** - Authentic military (#ffd700) aesthetic
- ✅ **Parallax Background** - Multi-layer backgrounds with mouse tracking
- ✅ **Scanline Effect** - Vintage CRT monitor feel
- ✅ **Corner Decorations** - Military corner borders for framing

### 🎬 Animations & Interactions
- ✅ **Hover Animations** - Buttons scale, glow, and shift upward on hover
- ✅ **Slide-in Animation** - Title animates in on page load
- ✅ **Parallax Effects** - Background layers shift smoothly with mouse movement
- ✅ **Pulsing Glow** - Button glow effect on hover
- ✅ **Screen Flicker** - Subtle flickering for authenticity
- ✅ **Shine Effect** - Animated light sweep across buttons on hover

### 🎵 Audio System
- ✅ **Background Music** - Placeholder audio with mute toggle
- ✅ **Music Control** - Bottom-left button to toggle audio
- ✅ **Default Muted** - Respects user preferences
- ✅ **Adjustable Volume** - 30% default volume

### 🛠️ Technical Features
- ✅ **React Component Architecture** - Modular, reusable components
- ✅ **TailwindCSS** - Utility-first styling framework
- ✅ **Custom Animations** - Slide-in, pulse-glow, screen-flicker
- ✅ **Responsive Design** - Mobile, tablet, and desktop support
- ✅ **Google Fonts** - Roboto Condensed for military aesthetic
- ✅ **Cross-browser Compatible** - Chrome, Firefox, Safari, Edge
- ✅ **PostCSS Processing** - Autoprefixer for vendor support
- ✅ **Performance Optimized** - CSS animations, minimal re-renders

---

## 📁 Project Structure

```
iron-dominion/
├── src/
│   ├── components/
│   │   └── MainMenu.jsx       # Main menu component (250+ lines)
│   ├── App.jsx                 # Root React component
│   ├── index.js                # React entry point
│   └── index.css               # Global styles + TailwindCSS
├── public/
│   ├── index.html              # HTML template
│   └── .htaccess               # Server configuration
├── assets/                      # Placeholder for future assets
├── standalone.html             # No-build HTML version
├── package.json                # Dependencies
├── tailwind.config.js          # TailwindCSS config
├── postcss.config.js           # PostCSS config
├── SETUP.md                    # Complete setup guide
├── DEVELOPER_GUIDE.md          # In-depth development guide
├── QUICK_REFERENCE.md          # Quick reference card
└── .gitignore                  # Git configuration
```

---

## 📚 Documentation

- **[SETUP.md](SETUP.md)** - Complete installation and setup guide
- **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** - In-depth customization guide with code examples
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference card for common tasks

---

## 🎮 How to Use

1. **Open the game** - Start dev server or open `standalone.html`
2. **Hover over buttons** - See animation effects
3. **Click buttons** - Actions logged to console (placeholder for now)
4. **Toggle music** - Click button in bottom-left
5. **Move mouse** - Watch parallax background effect
6. **Test responsive** - Resize browser or use DevTools

---

## 🎨 Customization Examples

### Change Game Title
Edit `src/components/MainMenu.jsx` line 97:
```jsx
IRON DOMINION  →  YOUR_TITLE
```

### Change Colors
Edit `src/index.css` - Replace `#ffd700` (gold) with your color

### Add Button Click Sound
Edit `src/components/MainMenu.jsx` - Add audio ref and play on click

### Change Background Image
Replace gradient in `src/components/MainMenu.jsx` with background image URL

See **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** for detailed examples.

---

## 🌍 Browser Support

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✅ Full | Latest versions |
| Firefox | ✅ Full | Latest versions |
| Safari | ✅ Full | iOS 14+ |
| Mobile | ✅ Full | Responsive design |

---

## 📱 Responsive Breakpoints

Optimized for:
- 📺 Desktop (1920x1080, 2560x1440)
- 🖥️ Laptop (1024-1440px)
- 📱 Tablet (768x1024, 810x1080)
- 📲 Mobile (360-480px)
- 🎬 16:9 widescreen
- 🎬 4:3 aspect ratio

---

## 🛠️ Technical Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.2.0 | UI Framework |
| TailwindCSS | 3.3.0 | Styling |
| PostCSS | 8.4.24 | CSS Processing |
| Autoprefixer | 10.4.14 | Vendor Prefixes |
| Node.js | 14+ | Runtime |
| npm/yarn | Latest | Package Manager |

---

## 🚀 Deployment

### Netlify
```bash
npm run build
netlify deploy --prod --dir=build
```

### Vercel
```bash
npm run build
vercel deploy --prod
```

### GitHub Pages
```bash
npm run build
# Push build/ to gh-pages branch
```

---

## 🎯 Roadmap

### Current (v0.1.0)
✅ Main menu UI  
✅ Button styling and animations  
✅ Parallax background  
✅ Audio system  

### Future (v0.2.0+)
- [ ] Game state management
- [ ] Map interface
- [ ] Nation selection screen
- [ ] Diplomacy system
- [ ] Military units
- [ ] Technology tree
- [ ] Save/Load functionality
- [ ] Multiplayer integration
- [ ] Settings menu
- [ ] Sound effects

---

## 🎓 Learning Resources

- **React:** https://react.dev
- **TailwindCSS:** https://tailwindcss.com
- **CSS Animations:** https://developer.mozilla.org/en-US/docs/Web/CSS/animation
- **Hearts of Iron IV:** https://hoi4.paradoxwikis.com/

---

## 📄 License

Educational project, not affiliated with Paradox Interactive or Hearts of Iron IV.

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

---

## 💬 Questions?

- Check **[DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)** for detailed examples
- Check **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** for quick answers
- Review code comments in `src/components/MainMenu.jsx`

---

## 🎖️ Credits

- **Game Concept:** Hearts of Iron IV by Paradox Interactive
- **Design:** Military/WW2 aesthetics
- **Framework:** React + TailwindCSS
- **Fonts:** Roboto Condensed (Google Fonts)

---

**Ready to command your empire? Start with `npm start` or open `standalone.html`!** ⚔️
