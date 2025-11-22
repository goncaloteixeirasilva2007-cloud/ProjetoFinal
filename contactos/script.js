// ============= CURSOR PERSONALIZADO =============
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

// ============= MENU MOBILE =============
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em link
const navLinks = nav.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ============= HEADER SCROLL =============
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============= ANIMAÇÃO DE PARTÍCULAS =============
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Posição inicial aleatória
        particle.style.left = Math.random() * 100 + '%';
        
        // Tamanho aleatório
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Delay aleatório
        particle.style.animationDelay = Math.random() * 8 + 's';
        
        // Duração aleatória
        particle.style.animationDuration = (Math.random() * 10 + 8) + 's';
        
        // Cor aleatória entre cor1 e cor2
        const colors = ['#45A29E', '#F18F01'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ============= EFEITO TILT NOS CARDS =============
const cards = document.querySelectorAll('.contacto-card[data-tilt]');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            translateY(-15px) 
            scale(1.02)
        `;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ============= ANIMAÇÃO AO SCROLL (INTERSECTION OBSERVER) =============
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInScale 0.8s ease forwards';
        }
    });
}, observerOptions);

// Observar os cards
cards.forEach(card => {
    observer.observe(card);
});

// ============= EFEITO DE RIPPLE NOS BOTÕES =============
const buttons = document.querySelectorAll('.contacto-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// CSS para efeito ripple (injetado via JS)
const style = document.createElement('style');
style.textContent = `
    .contacto-link {
        position: relative;
        overflow: hidden;
    }
    
    .ripple-effect {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============= ANIMAÇÃO DOS ÍCONES =============
const icons = document.querySelectorAll('.contacto-icon');

// Adicionar animação de rotação suave contínua
icons.forEach((icon, index) => {
    setInterval(() => {
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'pulse 2s ease infinite';
        }, 10);
    }, 4000 + (index * 500));
});

// ============= PARALLAX SUAVE NO SCROLL =============
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.contacto-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed / 10);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// ============= CONTADOR DE ANIMAÇÃO (OPCIONAL) =============
// Adicionar números animados se houver estatísticas
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.textContent = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ============= LOG DE BOAS-VINDAS =============
console.log('%c👋 Olá! Bem-vindo ao meu portfolio!', 'color: #45A29E; font-size: 20px; font-weight: bold;');
console.log('%c💼 Entre em contacto comigo!', 'color: #F18F01; font-size: 14px;');