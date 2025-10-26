# Hearts of Iron IV - Web Edition

A web-based grand strategy game inspired by Hearts of Iron 4. Play as Germany (or any major power) and manage your nation through the pre-WWII era with military, diplomatic, and economic decisions.

![Game Screenshot](https://github.com/user-attachments/assets/dfd5ec90-7703-40b2-98b8-5e037c92c004)

## Features

### 🎮 Core Gameplay
- **Time Management**: Control game speed with pause and 3 speed levels
- **Dynamic Date System**: Game starts on January 1, 1936 and progresses day by day
- **Resource Management**: Manage Political Power, Factories, and Manpower
- **Real-time Updates**: All stats update automatically as time progresses

### 🗺️ World Map
- Interactive province-based map system
- 30 provinces with different owners and victory points
- Visual representation of controlled territories
- Click provinces to view detailed information

### ⚔️ Military System
- **Infantry Divisions**: Ground forces for territorial control
- **Panzer Divisions**: Armored units for breakthrough operations
- **Air Wings**: Air superiority and ground support
- **Naval Fleets**: Control of sea lanes
- **Recruitment**: Build new divisions using manpower
- **Army Experience**: Gain XP through warfare to improve your military

### 🔬 Research System
- Research technologies to improve your nation
- Available technologies:
  - Infantry Equipment I
  - Basic Tank
  - Fighter I
  - Industrial Technology (grants +2 Civilian Factories)
- Research costs Political Power and takes time to complete
- Progress tracking with percentage display

### 🤝 Diplomacy
- **Declare War**: Start conflicts with other nations
- **Alliance System**: Offer alliances to other countries (50% acceptance chance)
- **War Management**: Track active wars and their status
- Interactive with 6 major powers:
  - France
  - United Kingdom
  - United States
  - Soviet Union
  - Italy
  - Japan

### 📊 Resources
- **Political Power**: Used for research and political decisions (generates over time)
- **Civilian Factories**: Economic production capacity
- **Military Factories**: Arms production capacity
- **Manpower**: Population available for military service (generates over time)
- **Army Experience**: Combat effectiveness improvement (gains during wars)

### 📜 Event System
- Real-time message log with timestamps
- Color-coded messages:
  - 🔵 Info: General game information
  - 🟡 Warning: Important notifications
  - 🔴 Danger: War declarations and defeats
  - 🟢 Success: Achievements and victories

## How to Play

1. **Open the Game**: Simply open `index.html` in any modern web browser
2. **Control Time**: Use the pause/speed buttons to control game progression
3. **Build Military**: Click "Recruit Division" to train new units
4. **Research Tech**: Select a technology and click "Start Research"
5. **Engage Diplomacy**: Choose a nation and either declare war or offer alliance
6. **Monitor Progress**: Watch your resources grow and respond to events

## Installation

No installation required! This is a pure HTML/CSS/JavaScript game.

### Local Hosting
```bash
# Clone the repository
git clone https://github.com/amiho-dev/hoi4fake.git
cd hoi4fake

# Start a simple web server (Python 3)
python3 -m http.server 8080

# Open in browser
# Navigate to http://localhost:8080
```

### Direct File Access
Simply double-click `index.html` to open it in your default browser.

## File Structure

```
hoi4fake/
├── index.html      # Main HTML structure
├── styles.css      # Game styling and layout
├── game.js         # Game logic and mechanics
└── README.md       # This file
```

## Game Mechanics

### Time Progression
- Game starts on January 1, 1936
- Time advances based on selected speed (1x, 2x, or 3x)
- Each day generates resources and advances research

### Resource Generation
- **Political Power**: +0.2 per day
- **Manpower**: +100 per day
- **Army XP**: +0.5 per day per active war

### Combat System
- Wars simulate automatic battles with random outcomes
- Victories grant +10 Army Experience
- War status affects resource generation

### Research Progress
- Research advances 1 point per day
- Completion time varies by technology (100-200 days)
- Technologies provide permanent bonuses

## Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Technologies Used

- **HTML5**: Structure and Canvas API for map rendering
- **CSS3**: Modern styling with gradients and animations
- **Vanilla JavaScript**: No frameworks required
- **Canvas API**: Dynamic map rendering

## Future Enhancements

Potential features for future versions:
- Save/Load game functionality
- More nations to play as
- Advanced combat mechanics
- Trade and economics system
- Historical events and decisions
- Multiplayer capability
- Sound effects and music

## Credits

Inspired by Paradox Interactive's Hearts of Iron IV grand strategy game.

## License

This is a fan-made project for educational purposes.

---

Enjoy conquering the world! 🌍⚔️
