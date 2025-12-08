// Loading screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

// Menu toggle para mobile
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Header scroll effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Cursor follower
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorFollower.style.opacity = '1';
});

// Elementos interativos expandem o cursor
const interactiveElements = document.querySelectorAll('a, button');

interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('expanded');
    });
    
    element.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('expanded');
    });
});

// Animação suave do cursor
function animateCursor() {
    const diffX = mouseX - followerX;
    const diffY = mouseY - followerY;
    
    followerX += diffX * 0.1;
    followerY += diffY * 0.1;
    
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    requestAnimationFrame(animateCursor);
}

animateCursor();

// Partículas flutuantes no hero
const hero = document.getElementById('hero');

function createParticle() {
    const particle = document.createElement('div');
    particle.className = 'particle';
    
    const size = Math.random() * 5 + 3;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 4 + 's';
    particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
    
    hero.appendChild(particle);
    
    setTimeout(() => {
        particle.remove();
    }, 7000);
}

setInterval(createParticle, 300);

// Efeito de typewriter no título
const heroTitle = document.getElementById('heroTitle');
const titleText = heroTitle.textContent;
heroTitle.textContent = '';
heroTitle.style.opacity = '1';

let i = 0;
function typeWriter() {
    if (i < titleText.length) {
        heroTitle.textContent += titleText.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    }
}

setTimeout(typeWriter, 500);

// Parallax effect no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Enter button functionality
const enterBtn = document.getElementById('enterBtn');
if (enterBtn) {
    enterBtn.addEventListener('click', () => {
        // Adiciona aqui o que queres que aconteça ao clicar no botão
        console.log('Enter button clicked!');
        // Exemplo: window.location.href = 'outra-pagina.html';
    });
}