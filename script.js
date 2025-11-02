// --- Floating gold particles ---
const canvas = document.getElementById('goldParticles');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const particles = [];
const particleCount = 60;

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.size = Math.random() * 6 + 2;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.alpha = Math.random() * 0.6 + 0.2;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < -50 || this.x > width + 50 || this.y < -50 || this.y > height + 50) {
      this.reset();
    }
  }
  draw() {
    const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
    gradient.addColorStop(0, `rgba(255, 215, 0, ${this.alpha})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function init() {
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for (let p of particles) {
    p.update();
    p.draw();
  }
  requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

init();
animate();

const subtitles = [
  '"Crypto? More like schizo."',
  'Automating a farm',
  'Bits, bytes, and bribes',
  'Making sense of nonsense',
];

const subtitleElement = document.querySelector('.subtitle');
subtitleElement.style.opacity = 1; // ensure initial opacity is set

let currentIndex = Math.floor(Math.random() * subtitles.length);
subtitleElement.textContent = subtitles[currentIndex];

// Function to fade subtitle
function fadeSubtitle(nextIndex) {
  // Fade out
  subtitleElement.style.transition = 'opacity 0.6s ease';
  subtitleElement.style.opacity = 0;

  // After fade-out completes, change text and fade in
  setTimeout(() => {
    subtitleElement.textContent = subtitles[nextIndex];
    // Force browser to register the change
    requestAnimationFrame(() => {
      subtitleElement.style.opacity = 1;
    });
  }, 2600); // match the transition duration
}

// Rotate subtitles every 11 seconds
setInterval(() => {
  let nextIndex;
  do {
    nextIndex = Math.floor(Math.random() * subtitles.length);
  } while (nextIndex === currentIndex);
  fadeSubtitle(nextIndex);
  currentIndex = nextIndex;
}, 11000);

