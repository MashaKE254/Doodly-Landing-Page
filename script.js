const doodlyText = document.getElementById('doodly-text');
const phrases = [
    "Great ideas start here...",
    "Doodle your thoughts...",
    "Creativity unleashed!",
    "Notes with personality..."
];

let currentPhraseIndex = 0;
let currentCharIndex = 0;
let isErasing = false;
let typingSpeed = 100;
let erasingSpeed = 50;
let pauseDuration = 1000;

function animateText() {
    const currentPhrase = phrases[currentPhraseIndex];

    if (!isErasing && currentCharIndex < currentPhrase.length) {
        doodlyText.textContent += currentPhrase[currentCharIndex];
        currentCharIndex++;
        setTimeout(animateText, typingSpeed);
    } else if (!isErasing && currentCharIndex === currentPhrase.length) {
        isErasing = true;
        setTimeout(animateText, pauseDuration);
    } else if (isErasing && currentCharIndex > 0) {
        doodlyText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
        currentCharIndex--;
        setTimeout(animateText, erasingSpeed);
    } else if (isErasing && currentCharIndex === 0) {
        isErasing = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        setTimeout(animateText, typingSpeed);
    }
}

animateText();

const counters = document.querySelectorAll('.stat-number');
const speed = 200;

function animateCounter(counter) {
    const target = +counter.getAttribute('data-target');
    let count = 0;
    const inc = target / speed;
    
    function updateCount() {
        if (count < target) {
            count += inc;
            counter.innerText = Math.ceil(count);
            requestAnimationFrame(updateCount);
        } else {
            counter.innerText = target;
        }
    }
    
    updateCount();
}

function checkScroll() {
    const triggerBottom = window.innerHeight;
    
    counters.forEach(counter => {
        const counterTop = counter.getBoundingClientRect().top;
        
        if (counterTop < triggerBottom && !counter.classList.contains('animated')) {
            animateCounter(counter);
            counter.classList.add('animated');
        }
    });
}

function initCounters() {
    const statisticsSection = document.getElementById('statistics');
    const sectionTop = statisticsSection.getBoundingClientRect().top;
    
    if (sectionTop < window.innerHeight) {
        counters.forEach(counter => {
            if (!counter.classList.contains('animated')) {
                animateCounter(counter);
                counter.classList.add('animated');
            }
        });
    }
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', initCounters);
