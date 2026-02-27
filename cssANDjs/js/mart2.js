const hateBtn = document.getElementById('hateBtn');
const messageDiv = document.getElementById('message');
const fallingHearts = document.getElementById('fallingHearts');
const loveBtn = document.querySelector('.love-btn');

function teleportButton() {
    const container = document.querySelector('.buttons-container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = hateBtn.getBoundingClientRect();
    
    const maxX = containerRect.width - btnRect.width;
    const maxY = containerRect.height - btnRect.height;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    hateBtn.style.left = randomX + 'px';
    hateBtn.style.top = randomY + 'px';
    
    createHeart(btnRect.left, btnRect.top);
}

function createHeart(x, y) {
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

function showLoveMessage() {
    messageDiv.classList.remove('hidden');
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createHeart(x, y);
        }, i * 100);
    }
    
    hateBtn.disabled = true;
    hateBtn.style.opacity = '0.5';
    hateBtn.style.cursor = 'not-allowed';
    hateBtn.style.pointerEvents = 'none';
    
    hateBtn.removeEventListener('mouseover', teleportButton);
}

loveBtn.addEventListener('click', showLoveMessage);

hateBtn.addEventListener('mouseover', teleportButton);

hateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    teleportButton();

    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createHeart(
                e.clientX + (Math.random() * 50 - 25),
                e.clientY + (Math.random() * 50 - 25)
            );
        }, i * 50);
    }
});

window.addEventListener('load', () => {
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            createHeart(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 200);
    }
});

setInterval(() => {
    if (!hateBtn.disabled) {
        hateBtn.style.boxShadow = `0 0 ${Math.random() * 20 + 10}px rgba(255, 68, 68, ${Math.random() * 0.5 + 0.3})`;
    }
}, 500);