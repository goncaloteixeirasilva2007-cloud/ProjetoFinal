// Loading Screen
window.addEventListener('load', () => {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

// Menu Toggle Mobile
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Header Scroll Effect
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

const cursor = document.getElementById("cursor");

// ============= CURSOR PERSONALIZADO =============

// Seleciona o elemento do cursor
const cursorFollower = document.getElementById('cursorFollower');

// Variáveis para armazenar a posição do mouse e do cursor
let mouseX = 0, mouseY = 0;      // Posição real do mouse
let followerX = 0, followerY = 0; // Posição do cursor visual

// Detecta movimento do mouse
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;  // Posição X do mouse
    mouseY = e.clientY;  // Posição Y do mouse
    cursorFollower.style.opacity = '1'; // Torna o cursor visível
});

// Seleciona todos os elementos interativos (links, botões, cards)
const interactiveElements = document.querySelectorAll('a, button, .contacto-card');

// Para cada elemento interativo
interactiveElements.forEach(element => {
    // Quando o mouse ENTRA no elemento
    element.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('expanded'); // Expande o cursor
    });
    
    // Quando o mouse SAI do elemento
    element.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('expanded'); // Volta ao tamanho normal
    });
});

// Função de animação suave do cursor
function animateCursor() {
    // Calcula a diferença entre a posição do mouse e do cursor
    const diffX = mouseX - followerX;
    const diffY = mouseY - followerY;
    
    // Move o cursor 10% em direção ao mouse (efeito de "seguir")
    followerX += diffX * 0.1; // 🔧 Mude 0.1 para mais rápido (0.2) ou mais lento (0.05)
    followerY += diffY * 0.1;
    
    // Aplica a posição calculada
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    
    // Continua a animação em loop
    requestAnimationFrame(animateCursor);
}

// Inicia a animação do cursor
animateCursor();
// Elementos interativos que ativam o hover
const targets = document.querySelectorAll("a, button, input, textarea, select, .hover-target");

targets.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("scale-150", "bg-white");
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("scale-150", "bg-white");
    });
});

// Efeito de clique (encolhe)
document.addEventListener("mousedown", () => {
    cursor.classList.add("scale-50");
});

document.addEventListener("mouseup", () => {
    cursor.classList.remove("scale-50");
});

// Criar partículas flutuantes no hero
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

// Efeito de digitação no título
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

// Parallax no hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Efeito ripple no botão Enter
const enterBtn = document.getElementById('enterBtn');
enterBtn.addEventListener 