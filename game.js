// Game State
const gameState = {
    isPaused: false,
    speed: 1,
    currentDate: new Date(1936, 0, 1), // January 1, 1936
    ticksPerDay: 24,
    currentTick: 0,
    
    player: {
        nation: "Germany",
        politicalPower: 100,
        civilianFactories: 35,
        militaryFactories: 28,
        manpower: 1200000,
        armyXP: 0,
        
        military: {
            infantry: 24,
            panzer: 6,
            airWings: 12,
            navalFleets: 3
        },
        
        research: {
            active: null,
            progress: 0,
            completed: []
        },
        
        wars: [],
        allies: []
    },
    
    nations: {
        france: { name: "France", alive: true, isAtWar: false },
        uk: { name: "United Kingdom", alive: true, isAtWar: false },
        usa: { name: "United States", alive: true, isAtWar: false },
        ussr: { name: "Soviet Union", alive: true, isAtWar: false },
        italy: { name: "Italy", alive: true, isAtWar: false },
        japan: { name: "Japan", alive: true, isAtWar: false }
    },
    
    provinces: []
};

// Technologies
const technologies = {
    infantry: { name: "Infantry Equipment I", researchTime: 100, cost: 50 },
    tanks: { name: "Basic Tank", researchTime: 150, cost: 75 },
    fighter: { name: "Fighter I", researchTime: 120, cost: 60 },
    industry: { name: "Industrial Technology", researchTime: 200, cost: 100 }
};

// Initialize Canvas and Map
let canvas, ctx;
let selectedProvince = null;

function initializeGame() {
    canvas = document.getElementById('game-map');
    ctx = canvas.getContext('2d');
    
    // Create provinces on the map
    createProvinces();
    
    // Draw initial map
    drawMap();
    
    // Set up event listeners
    setupEventListeners();
    
    // Start game loop
    startGameLoop();
    
    // Add initial message
    addMessage("Game started! You are playing as " + gameState.player.nation, "success");
}

function createProvinces() {
    // Create a grid of provinces
    const colors = ['#8B4513', '#228B22', '#4682B4', '#DAA520', '#CD853F'];
    const owners = ['Germany', 'France', 'Soviet Union', 'United Kingdom', 'Italy', 'Poland'];
    
    for (let i = 0; i < 30; i++) {
        const x = (i % 10) * 80 + 40;
        const y = Math.floor(i / 10) * 160 + 80;
        
        gameState.provinces.push({
            id: i,
            x: x,
            y: y,
            owner: owners[Math.floor(Math.random() * owners.length)],
            color: colors[Math.floor(Math.random() * colors.length)],
            victoryPoints: Math.floor(Math.random() * 20) + 1
        });
    }
}

function drawMap() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw grid lines
    ctx.strokeStyle = '#1a252f';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 10; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 80, 0);
        ctx.lineTo(i * 80, canvas.height);
        ctx.stroke();
    }
    
    for (let i = 0; i <= 3; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * 160);
        ctx.lineTo(canvas.width, i * 160);
        ctx.stroke();
    }
    
    // Draw provinces
    gameState.provinces.forEach(province => {
        drawProvince(province);
    });
    
    // Highlight selected province
    if (selectedProvince !== null) {
        const province = gameState.provinces[selectedProvince];
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 3;
        ctx.strokeRect(province.x - 35, province.y - 75, 70, 150);
    }
}

function drawProvince(province) {
    // Draw province rectangle
    ctx.fillStyle = province.color;
    ctx.fillRect(province.x - 30, province.y - 70, 60, 140);
    
    // Draw border
    ctx.strokeStyle = province.owner === gameState.player.nation ? '#e74c3c' : '#2c3e50';
    ctx.lineWidth = province.owner === gameState.player.nation ? 2 : 1;
    ctx.strokeRect(province.x - 30, province.y - 70, 60, 140);
    
    // Draw owner text
    ctx.fillStyle = '#ecf0f1';
    ctx.font = 'bold 10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(province.owner.substring(0, 8), province.x, province.y - 50);
    
    // Draw victory points
    ctx.font = '12px Arial';
    ctx.fillText(`★${province.victoryPoints}`, province.x, province.y);
}

function setupEventListeners() {
    // Time controls
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('speed-1').addEventListener('click', () => setSpeed(1));
    document.getElementById('speed-2').addEventListener('click', () => setSpeed(2));
    document.getElementById('speed-3').addEventListener('click', () => setSpeed(3));
    
    // Military
    document.getElementById('recruit-btn').addEventListener('click', recruitDivision);
    
    // Research
    document.getElementById('research-btn').addEventListener('click', startResearch);
    
    // Diplomacy
    document.getElementById('declare-war-btn').addEventListener('click', declareWar);
    document.getElementById('offer-alliance-btn').addEventListener('click', offerAlliance);
    
    // Map click
    canvas.addEventListener('click', handleMapClick);
}

function handleMapClick(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Find clicked province
    gameState.provinces.forEach((province, index) => {
        if (x >= province.x - 30 && x <= province.x + 30 &&
            y >= province.y - 70 && y <= province.y + 70) {
            selectedProvince = index;
            updateProvinceInfo(province);
            drawMap();
        }
    });
}

function updateProvinceInfo(province) {
    document.getElementById('selected-province').textContent = `Province #${province.id}`;
    document.getElementById('province-owner').textContent = province.owner;
}

function togglePause() {
    gameState.isPaused = !gameState.isPaused;
    const btn = document.getElementById('pause-btn');
    btn.textContent = gameState.isPaused ? '▶ Resume' : '⏸ Pause';
    addMessage(gameState.isPaused ? "Game paused" : "Game resumed", "warning");
}

function setSpeed(speed) {
    gameState.speed = speed;
    addMessage(`Game speed set to ${speed}x`, "success");
}

function recruitDivision() {
    if (gameState.player.manpower >= 1000) {
        gameState.player.manpower -= 1000;
        gameState.player.military.infantry++;
        updateUI();
        addMessage("Recruited new Infantry Division", "success");
    } else {
        addMessage("Not enough manpower to recruit!", "danger");
    }
}

function startResearch() {
    const selectedTech = document.getElementById('research-select').value;
    
    if (!selectedTech) {
        addMessage("Please select a technology to research", "warning");
        return;
    }
    
    const tech = technologies[selectedTech];
    
    if (gameState.player.research.completed.includes(selectedTech)) {
        addMessage("Technology already researched!", "warning");
        return;
    }
    
    if (gameState.player.politicalPower >= tech.cost) {
        gameState.player.politicalPower -= tech.cost;
        gameState.player.research.active = selectedTech;
        gameState.player.research.progress = 0;
        updateUI();
        addMessage(`Started researching ${tech.name}`, "success");
    } else {
        addMessage("Not enough Political Power!", "danger");
    }
}

function declareWar() {
    const targetNation = document.getElementById('target-nation').value;
    
    if (!targetNation) {
        addMessage("Please select a nation", "warning");
        return;
    }
    
    const nation = gameState.nations[targetNation];
    
    if (gameState.player.wars.includes(targetNation)) {
        addMessage(`Already at war with ${nation.name}!`, "warning");
        return;
    }
    
    gameState.player.wars.push(targetNation);
    nation.isAtWar = true;
    updateWarsUI();
    addMessage(`War declared on ${nation.name}!`, "danger");
}

function offerAlliance() {
    const targetNation = document.getElementById('target-nation').value;
    
    if (!targetNation) {
        addMessage("Please select a nation", "warning");
        return;
    }
    
    const nation = gameState.nations[targetNation];
    
    if (gameState.player.allies.includes(targetNation)) {
        addMessage(`Already allied with ${nation.name}!`, "warning");
        return;
    }
    
    if (gameState.player.wars.includes(targetNation)) {
        addMessage(`Cannot ally with ${nation.name}, you are at war!`, "danger");
        return;
    }
    
    // 50% chance of acceptance
    if (Math.random() > 0.5) {
        gameState.player.allies.push(targetNation);
        addMessage(`${nation.name} accepted your alliance offer!`, "success");
    } else {
        addMessage(`${nation.name} rejected your alliance offer`, "warning");
    }
}

function updateWarsUI() {
    const warsList = document.getElementById('wars-list');
    warsList.innerHTML = '';
    
    if (gameState.player.wars.length === 0) {
        warsList.innerHTML = '<li style="background: rgba(46,204,113,0.1); border-left-color: #2ecc71;">At peace</li>';
    } else {
        gameState.player.wars.forEach(warNation => {
            const li = document.createElement('li');
            li.textContent = `War with ${gameState.nations[warNation].name}`;
            warsList.appendChild(li);
        });
    }
}

function addMessage(text, type = 'info') {
    const messageLog = document.getElementById('message-log');
    const message = document.createElement('div');
    message.className = `message ${type}`;
    
    const time = gameState.currentDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
    
    message.textContent = `[${time}] ${text}`;
    messageLog.insertBefore(message, messageLog.firstChild);
    
    // Keep only last 20 messages
    while (messageLog.children.length > 20) {
        messageLog.removeChild(messageLog.lastChild);
    }
}

function updateUI() {
    // Update resources
    document.getElementById('political-power').textContent = Math.floor(gameState.player.politicalPower);
    document.getElementById('civilian-factories').textContent = gameState.player.civilianFactories;
    document.getElementById('military-factories').textContent = gameState.player.militaryFactories;
    document.getElementById('manpower').textContent = formatNumber(gameState.player.manpower);
    document.getElementById('army-xp').textContent = Math.floor(gameState.player.armyXP);
    
    // Update military
    document.getElementById('infantry-count').textContent = gameState.player.military.infantry;
    document.getElementById('panzer-count').textContent = gameState.player.military.panzer;
    document.getElementById('air-wings').textContent = gameState.player.military.airWings;
    document.getElementById('naval-fleets').textContent = gameState.player.military.navalFleets;
    
    // Update research
    if (gameState.player.research.active) {
        const tech = technologies[gameState.player.research.active];
        const progress = Math.floor((gameState.player.research.progress / tech.researchTime) * 100);
        document.getElementById('research-status').textContent = 
            `Researching ${tech.name}: ${progress}%`;
    } else {
        document.getElementById('research-status').textContent = 'No active research';
    }
    
    // Update date
    document.getElementById('current-date').textContent = 
        gameState.currentDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

function gameTick() {
    if (gameState.isPaused) return;
    
    gameState.currentTick++;
    
    // Advance time every 24 ticks (1 day)
    if (gameState.currentTick % gameState.ticksPerDay === 0) {
        advanceDay();
    }
}

function advanceDay() {
    // Advance date
    gameState.currentDate.setDate(gameState.currentDate.getDate() + 1);
    
    // Generate resources
    gameState.player.politicalPower += 0.2;
    gameState.player.manpower += 100;
    gameState.player.armyXP += gameState.player.wars.length * 0.5;
    
    // Research progress
    if (gameState.player.research.active) {
        gameState.player.research.progress++;
        const tech = technologies[gameState.player.research.active];
        
        if (gameState.player.research.progress >= tech.researchTime) {
            const completedTech = gameState.player.research.active;
            gameState.player.research.completed.push(completedTech);
            addMessage(`Completed research: ${tech.name}`, "success");
            gameState.player.research.active = null;
            gameState.player.research.progress = 0;
            
            // Apply tech bonuses
            if (completedTech === 'industry') {
                gameState.player.civilianFactories += 2;
                addMessage("Gained 2 Civilian Factories from research", "success");
            }
        }
    }
    
    // War simulation (simple)
    gameState.player.wars.forEach(warNation => {
        if (Math.random() < 0.01) { // 1% chance per day
            const victory = Math.random() > 0.5;
            if (victory) {
                addMessage(`Victory in battle against ${gameState.nations[warNation].name}!`, "success");
                gameState.player.armyXP += 10;
            } else {
                addMessage(`Defeat in battle against ${gameState.nations[warNation].name}`, "danger");
            }
        }
    });
    
    updateUI();
}

function startGameLoop() {
    setInterval(() => {
        for (let i = 0; i < gameState.speed; i++) {
            gameTick();
        }
    }, 100); // 10 ticks per second
}

// Initialize game when page loads
window.addEventListener('load', () => {
    initializeGame();
    updateWarsUI();
});
