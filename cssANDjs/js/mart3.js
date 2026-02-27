const correctAnswers = {
    q1: '19',
    q2: '12 июля',
    q3: '17 июня',
    q4: 'Симба'
};

const errorModal = document.getElementById('errorModal');
const successModal = document.getElementById('successModal');
const errorMessage = document.getElementById('errorMessage');
const quizForm = document.getElementById('quizForm');

function checkAnswers() {
    const q1 = document.querySelector('input[name="q1"]:checked');
    const q2 = document.querySelector('input[name="q2"]:checked');
    const q3 = document.querySelector('input[name="q3"]:checked');
    const q4 = document.querySelector('input[name="q4"]:checked');
    
    if (!q1 || !q2 || !q3 || !q4) {
        showError('Ты пропустила вопросы 😡');
        return;
    }
    
    const answers = {
        q1: q1.value,
        q2: q2.value,
        q3: q3.value,
        q4: q4.value
    };
    
    let correctCount = 0;
    const wrongAnswers = [];
    
    for (let [question, answer] of Object.entries(answers)) {
        if (answer === correctAnswers[question]) {
            correctCount++;
        } else {
            switch(question) {
                case 'q1': wrongAnswers.push('возрасте'); break;
                case 'q2': wrongAnswers.push('датe пикника'); break;
                case 'q3': wrongAnswers.push('датe знакомства'); break;
                case 'q4': wrongAnswers.push('имени симбы'); break;
            }
        }
    }
    
    if (correctCount === 4) {
        showSuccess();
    } else {
        let message = '';
        if (correctCount === 3) {
            message = `Ошибочка в ${wrongAnswers.join(' и ')}! Попробуй ещё раз 💕`;
        } else {
            message = `Неправильно: ${wrongAnswers.join(', ')}. Попробуй ещё! ❤️`;
        }
        showError(message);
        
        highlightWrongAnswers(answers);
    }
}

function highlightWrongAnswers(answers) {
    document.querySelectorAll('.option').forEach(opt => {
        opt.style.background = '';
    });
    
    for (let i = 1; i <= 4; i++) {
        const question = `q${i}`;
        const selected = document.querySelector(`input[name="q${question}"]:checked`);
        if (selected) {
            const parentOption = selected.closest('.option');
            if (selected.value === correctAnswers[question]) {
                parentOption.style.background = 'rgba(76, 175, 80, 0.3)';
            } else {
                parentOption.style.background = 'rgba(255, 68, 68, 0.3)';
            }
        }
    }
}

function showError(message) {
    errorMessage.textContent = message;
    errorModal.style.display = 'flex';
    createHearts(10); 
    
    setTimeout(() => {
        document.querySelectorAll('.option').forEach(opt => {
            opt.style.background = '';
        });
    }, 2000);
}

function showSuccess() {
    successModal.style.display = 'flex';
    createHearts(30); 
}

function closeModal() {
    errorModal.style.display = 'none';
}

function goToNextPage() {

    createHearts(40);
    
    setTimeout(() => {
        window.location.href = 'mart4.html';
    }, 500);
}


function createHearts(count) {
    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            createHeart(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 50);
    }
}

function createHeart(x, y) {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart falling-heart';
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';
    heart.style.color = getRandomColor();
    heart.style.fontSize = Math.random() * 30 + 15 + 'px';
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 3000);
}

function getRandomColor() {
    const colors = ['#ff1493', '#ff69b4', '#ffb6c1', '#ff6b8b', '#ff4444'];
    return colors[Math.floor(Math.random() * colors.length)];
}


window.onclick = function(event) {
    if (event.target === errorModal) {
        closeModal();
    }
    if (event.target === successModal) {
        successModal.style.display = 'none';
    }
};


window.addEventListener('load', () => {
    createHearts(15);
});


document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('mouseenter', () => {
        option.style.transform = 'translateX(15px)';
    });
    
    option.addEventListener('mouseleave', () => {
        option.style.transform = 'translateX(0)';
    });
});