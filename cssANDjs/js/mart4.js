let score = 0;
let timeLeft = 30;
let gameInterval;
let heartInterval;
let gameActive = false;

const gameArea = document.getElementById('gameArea');
const scoreElement = document.getElementById('score');
const timerElement = document.getElementById('timer');
const startBtn = document.getElementById('startGameBtn');
const gameResult = document.getElementById('gameResult');
const resultMessage = document.getElementById('resultMessage');
const gift2 = document.getElementById('gift2');

function createHeart() {
    if (!gameActive) return;
    
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart game-heart';
    heart.style.fontSize = Math.random() * 30 + 25 + 'px';
    heart.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
    heart.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px';
    heart.style.position = 'absolute';
    heart.style.animation = `heartFloat ${Math.random() * 2 + 1}s infinite`;
    
    heart.onclick = function() {
        if (gameActive) {
            collectHeart(this);
        }
    };
    
    gameArea.style.position = 'relative';
    gameArea.appendChild(heart);
}

function collectHeart(heart) {
    score += 10;
    scoreElement.textContent = score;
    
    createHeartEffect(heart.style.left, heart.style.top);
    
    heart.remove();
    
    createHeart();
}

function createHeartEffect(x, y) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createFallingHeart(
                parseInt(x) + Math.random() * 50 - 25,
                parseInt(y) + Math.random() * 50 - 25
            );
        }, i * 50);
    }
}

function createFallingHeart(x, y) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart falling-heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.color = getRandomColor();
    heart.style.fontSize = Math.random() * 20 + 15 + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

function getRandomColor() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ff6b8b', '#ff4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startGame() {
    score = 0;
    timeLeft = 15;
    gameActive = true;
    
    scoreElement.textContent = score;
    timerElement.textContent = timeLeft;
    
    startBtn.classList.add('hidden');
    gameResult.classList.add('hidden');
    
    gameArea.innerHTML = '';
    gameArea.style.position = 'relative';
    gameArea.style.minHeight = '200px';
    
    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            createHeart();
        }, i * 100);
    }
    
    heartInterval = setInterval(() => {
        if (gameActive) {
            createHeart();
        }
    }, 2000);
    
    gameInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    clearInterval(heartInterval);
    
    gameArea.innerHTML = '';
    
    gameResult.classList.remove('hidden');
    
    if (score) {
        resultMessage.innerHTML = '🎉 Супер! Ты набрала ' + score + ' очков!';
        gift2.classList.remove('hidden');
        createFireworks();
    }

    startBtn.classList.remove('hidden');
    startBtn.innerHTML = '<i class="fas fa-redo-alt"></i> Играть снова';
}

function resetGame() {
    gameResult.classList.add('hidden');
    startGame();
}

function createFireworks() {
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            createFallingHeart(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight / 2
            );
        }, i * 50);
    }
}

window.addEventListener('load', () => {
    setInterval(() => {
        if (!gameActive) {
            createFallingHeart(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight / 4
            );
        }
    }, 500);
});


function showSurprise() {
    const gift1 = document.getElementById('gift1');
    const overlay = document.getElementById('overlay');
    const surpriseMessage = document.getElementById('surpriseMessage');
    
    gift1.classList.add('move-left');
    overlay.classList.remove('hidden');
    
    setTimeout(() => {
        surpriseMessage.classList.remove('hidden');
    }, 300);
    
    createFireworks();
    
    setTimeout(() => {
        hideSurprise();
    }, 7500);
}

function hideSurprise() {
    const gift1 = document.getElementById('gift1');
    const overlay = document.getElementById('overlay');
    const surpriseMessage = document.getElementById('surpriseMessage');
    
    gift1.classList.remove('move-left');
    overlay.classList.add('hidden');
    surpriseMessage.classList.add('hidden');
}

document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.addEventListener('click', function() {
            hideSurprise();
        });
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        hideSurprise();
    }
});
