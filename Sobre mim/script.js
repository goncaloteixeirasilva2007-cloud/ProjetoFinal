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
// CURSOR FOLLOWER
// ============================================
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorFollower.style.opacity = '1';
});

// Elementos interativos expandem o cursor
const interactiveElements = document.querySelectorAll('a, button, .card');

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

// ============================================
// INTERSECTION OBSERVER (ANIMAÇÕES)
// ============================================
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hidden-element').forEach(el => observer.observe(el));

// ============================================
// PARALLAX
// ============================================
window.addEventListener('scroll', () => {
    const y = window.pageYOffset;

    document.querySelectorAll('.blob').forEach((blob, i) => {
        blob.style.transform = `translateY(${y * (0.03 * (i + 1))}px)`;
    });
});

console.log('✅ Sobre Mim carregado - Menu inline igual à página principal');