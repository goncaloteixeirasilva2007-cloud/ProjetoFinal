// ============= SCROLL PROGRESS BAR =============
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============= HAMBURGER MENU =============
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// ============= INTERSECTION OBSERVER - ANIMAÇÕES AO SCROLL =============
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

const cursor = document.getElementById("cursor");

// Movimento suave do cursor
document.addEventListener("mousemove", (e) => {
    cursor.style.top = e.clientY + "px";
    cursor.style.left = e.clientX + "px";
});

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

// ============= ANIMAÇÃO ESPECIAL PARA CARDS =============
const cards = document.querySelectorAll('[data-card]');
cards.forEach((card, index) => {
    setTimeout(() => {
        observer.observe(card);
    }, index * 200);
});

// ============= PARALLAX NO SCROLL =============
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const imageSection = document.getElementById('imageSection');
    
    if (imageSection) {
        imageSection.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});

// ============= CRIAR PARTÍCULAS INTERATIVAS =============
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

// ============= EFEITO DE TYPING NO TÍTULO =============
const title = document.querySelector('.gradient-text');
const titleText = title.textContent;
title.textContent = 'Uma viagem pela arte Visual';

let charIndex = 0;
function typeWriter() {}
   