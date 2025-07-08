let doorState = 0;
let isOnCooldown = false;

function generateStars() {
    const starsContainer = document.getElementById('stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

function toggleDoor() {
    if (isOnCooldown) return;
    
    isOnCooldown = true;
    document.querySelector('.door-container').classList.add('cooldown');
    
    showCooldownTimer();
    
    doorState = doorState === 0 ? 1 : 0;
    updateDoorVisual();
    
    saveDoorState();
    
    setTimeout(() => {
        isOnCooldown = false;
        document.querySelector('.door-container').classList.remove('cooldown');
        document.getElementById('cooldownTimer').classList.add('hidden');
    }, 5000);
}

function showCooldownTimer() {
    const timer = document.getElementById('cooldownTimer');
    timer.classList.remove('hidden');
    let seconds = 5;
    
    const interval = setInterval(() => {
        timer.textContent = seconds;
        seconds--;
        
        if (seconds < 0) {
            clearInterval(interval);
        }
    }, 1000);
}

function updateDoorVisual() {
    const door = document.getElementById('door');
    const doorNumber = document.getElementById('doorNumber');
    
    if (doorState === 1) {
        door.classList.add('open');
        doorNumber.textContent = 'ABIERTA';
    } else {
        door.classList.remove('open');
        doorNumber.textContent = 'CERRADA';
    }
}

function loadDoorState() {
    const storageKey = 'puerta_estado';
    const storedData = localStorage.getItem(storageKey);
    
    if (storedData) {
        doorState = parseInt(storedData);
        updateDoorVisual();
    }
}

function saveDoorState() {
    const storageKey = 'puerta_estado';
    localStorage.setItem(storageKey, doorState.toString());
    
    console.log(`Estado guardado: Puerta ${doorState === 1 ? 'Abierta' : 'Cerrada'}`);
}

window.onload = function() {
    generateStars();
    
    loadDoorState();
};