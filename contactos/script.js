// ============= CURSOR PERSONALIZADO =============
const cursorFollower = document.getElementById('cursorFollower');

if (cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorFollower.style.opacity = '1';
    });

    // Esconde o cursor quando sai da janela
    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
    });

    // Mostra o cursor quando entra na janela
    document.addEventListener('mouseenter', () => {
        cursorFollower.style.opacity = '1';
    });

    // Expandir cursor ao passar por elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .contacto-card');
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
        
        followerX += diffX * 0.15;
        followerY += diffY * 0.15;
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

// ============= MENU MOBILE =============
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Fechar menu ao clicar em link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============= HEADER SCROLL =============
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

// ============= ANIMAÇÃO DE PARTÍCULAS =============
const particlesContainer = document.getElementById('particles');

if (particlesContainer) {
    function createParticles() {
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
}

// ============= EFEITO TILT 3D NOS CARDS =============
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
const allCards = document.querySelectorAll('.contacto-card');
allCards.forEach(card => {
    observer.observe(card);
});

// ============= EFEITO DE ONDULAÇÃO (RIPPLE) NOS BOTÕES =============
const buttons = document.querySelectorAll('.contacto-link');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Cria uma ondulação suave
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

// ============= SMOOTH SCROLL PARA LINKS INTERNOS =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Fecha o menu mobile se estiver aberto
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ============= ANIMAÇÃO DE ENTRADA DOS ELEMENTOS =============
window.addEventListener('load', () => {
    // Anima o título
    const title = document.querySelector('.contactos-title');
    if (title) {
        setTimeout(() => {
            title.style.animation = 'gradient-shift 3s ease infinite, titleBounce 1s ease';
        }, 200);
    }
});

// ============= PARALLAX SUAVE NO SCROLL =============
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.contacto-card');
            
            parallaxElements.forEach((element, index) => {
                const speed = 0.05 * (index + 1);
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        });
        
        ticking = true;
    }
});

// ============= LOG DE BOAS-VINDAS =============
console.log('%c👋 Olá! Bem-vindo à página de contactos!', 'color: #45A29E; font-size: 20px; font-weight: bold;');
console.log('%c💼 Entre em contacto comigo através dos canais disponíveis!', 'color: #F18F01; font-size: 14px;');
console.log('%c✨ Efeitos carregados: Cursor personalizado, Partículas, Tilt 3D, Ripple, Parallax', 'color: #45A29E; font-size: 12px;');
console.log('✅ Script de contactos carregado com sucesso!');