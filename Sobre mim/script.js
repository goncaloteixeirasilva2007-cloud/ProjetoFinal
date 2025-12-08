// ============================================
// HAMBURGER MENU - CORRIGIDO
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Fecha o menu ao clicar num link
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ============================================
// CURSOR FOLLOWER - CORRIGIDO E OTIMIZADO
// ============================================
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

    // Elementos interativos expandem o cursor - CORRIGIDO
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .card');

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
// ANIMAÇÃO ESPECIAL PARA CARDS COM DELAY
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
        imageSection.style.transform = `translateY(${scrolled * 0.05}px)`;
    }

    // Parallax nos blobs
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 0.03;
        blob.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// CRIAR PARTÍCULAS INTERATIVAS
// ============================================
const mainSection = document.getElementById('mainSection');

if (mainSection) {
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

    // Criar partículas ao mover o mouse (com throttle)
    let lastParticleTime = 0;
    mainSection.addEventListener('mousemove', (e) => {
        const now = Date.now();
        if (now - lastParticleTime > 100) {
            createParticle(e.pageX, e.pageY);
            lastParticleTime = now;
        }
    });
}

// ============================================
// SMOOTH SCROLL PARA LINKS INTERNOS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Fecha o menu mobile se estiver aberto
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ============================================
// PERFORMANCE: LAZY LOADING PARA IMAGENS
// ============================================
const images = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

console.log('✅ Script da página Sobre Mim carregado com sucesso!');