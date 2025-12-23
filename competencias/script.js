// ============================================
// CURSOR FOLLOWER
// ============================================
const cursorFollower = document.getElementById('cursorFollower');

document.addEventListener('mousemove', (e) => {
    cursorFollower.style.left = e.clientX + 'px';
    cursorFollower.style.top = e.clientY + 'px';
    cursorFollower.style.opacity = '1';
});

// Expandir cursor ao passar sobre elementos interativos
const interactiveElements = document.querySelectorAll('a, button, .card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.classList.add('expanded');
    });
    el.addEventListener('mouseleave', () => {
        cursorFollower.classList.remove('expanded');
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
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

// ============================================
// MENU TOGGLE (MOBILE)
// ============================================
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em link (mobile)
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });
});

// ============================================
// ANIMAÇÃO DE ENTRADA DOS ELEMENTOS
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

// Observar todos os elementos com a classe hidden-element
const hiddenElements = document.querySelectorAll('.hidden-element');
hiddenElements.forEach(el => observer.observe(el));

// ============================================
// ANIMAÇÃO DOS CARDS COM DELAY
// ============================================
const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.15}s`;
});

// ============================================
// BLOBS - MOVIMENTO SUAVE
// ============================================
const blobs = document.querySelectorAll('.blob');

document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        const xMove = (x - 0.5) * speed;
        const yMove = (y - 0.5) * speed;
        
        blob.style.transform = `translate(${xMove}px, ${yMove}px)`;
    });
});

// ============================================
// PARALLAX SUAVE NOS CARDS
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    cards.forEach((card, index) => {
        const speed = 0.05 * (index + 1);
        const yPos = -(scrolled * speed);
        card.style.transform = `translateY(${yPos}px)`;
    });
});

// ============================================
// EFEITO DE HOVER NOS CARDS (MOBILE)
// ============================================
if ('ontouchstart' in window) {
    cards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        card.addEventListener('touchend', function() {
            setTimeout(() => {
                this.classList.remove('touch-active');
            }, 300);
        });
    });
}

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PERFORMANCE - REDUZIR ANIMAÇÕES EM DISPOSITIVOS LENTOS
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.blob').forEach(blob => {
        blob.style.animation = 'none';
    });
}

// ============================================
// INICIALIZAÇÃO
// ============================================
window.addEventListener('load', () => {
    // Remover loading se existir
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Ativar animações iniciais após um pequeno delay
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});

// ============================================
// RESPONSIVE - AJUSTES DINÂMICOS
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reposicionar elementos se necessário
        if (window.innerWidth > 768 && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }, 250);
});