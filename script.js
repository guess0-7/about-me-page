const flipBox = document.getElementById('photoFlip');
const img = document.getElementById('flipImg');

const photos = ['1.jpeg', '2.jpeg', '3.jpg'];
let index = 0;


const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;

function showNextPhoto() {
    index = (index + 1) % photos.length;
    img.src = photos[index];
}

function flipToNext() {
    if (prefersReducedMotion) {
        showNextPhoto();
        return;
    }
    if (flipBox.classList.contains('flipping')) return;
    flipBox.classList.add('flipping');
}

img.addEventListener('transitionend', (event) => {
    if (event.propertyName !== 'transform') return;
    if (flipBox.classList.contains('flipping')) {
        showNextPhoto();
        flipBox.classList.remove('flipping');
    }
});

flipBox.addEventListener('click', flipToNext);
flipBox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        flipToNext();
    }
});

const typewriter = document.getElementById('typewriter');
if (typewriter) {
    const fullText = typewriter.textContent;

    if (prefersReducedMotion) {
        typewriter.textContent = fullText;
    } else {
        function typeNextChar(charIndex) {
            if (charIndex < fullText.length) {
                typewriter.textContent = fullText.slice(0, charIndex + 1);
                setTimeout(() => typeNextChar(charIndex + 1), 80);
            }
        }

        function runTypewriter() {
            typewriter.textContent = '';
            typeNextChar(0);
        }

        runTypewriter();
        setInterval(runTypewriter, 8000);
    }
}
