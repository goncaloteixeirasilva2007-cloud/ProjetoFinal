// ============================================
// SCROLL PROGRESS BAR
// ============================================

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// ============================================
// INTERSECTION OBSERVER - ANIMAÇÕES AO SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar elementos
document.querySelectorAll('.hidden-element').forEach(el => {
    observer.observe(el);
});

// ============================================
// CURSOR CUSTOMIZADO
// ============================================
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorFollower.style.opacity = '1';
});

// Expandir cursor ao passar por links e botões
const interactiveElements = document.querySelectorAll('a, button, .contacto-card');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('expanded');
    });
    
    element.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('expanded');
    });
});
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

// Elementos interativos que ativam o hover
const targets = document.querySelectorAll("a, button, input, textarea, select");

targets.forEach(el => {
    el.addEventListener("mouseenter", () => {
        cursor.classList.add("scale-150");
    });
    el.addEventListener("mouseleave", () => {
        cursor.classList.remove("scale-150");
    });
});

// Efeito de clique (encolhe)
document.addEventListener("mousedown", () => {
    cursor.classList.add("scale-50");
});

document.addEventListener("mouseup", () => {
    cursor.classList.remove("scale-50");
});

// ============================================
// ANIMAÇÃO ESPECIAL PARA CARDS
// ============================================
const cards = document.querySelectorAll('[data-card]');
cards.forEach((card, index) => {
    setTimeout(() => {
        observer.observe(card);
    }, index * 200);
});

// ============================================
// PARALLAX NO SCROLL
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const imageSection = document.getElementById('imageSection');
    
    if (imageSection) {
        imageSection.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ============================================
// CRIAR PARTÍCULAS INTERATIVAS
// ============================================
const mainSection = document.getElementById('mainSection');

function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    
    const tx = (Math.random() - 0.5) * 200;
    const ty = (Math.random() - 0.5) * 200;
    
    particle.style.setProperty('--tx', tx + 'px');
    particle.style.setProperty('--ty', ty + 'px');
    
    mainSection.appendChild(particle);
    
    setTimeout(() => particle.remove(), 4000);
}

// Criar partículas ao mover o mouse
let lastParticleTime = 0;
mainSection.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastParticleTime > 100) {
        createParticle(e.pageX, e.pageY);
        lastParticleTime = now;
    }
});