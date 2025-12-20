// ============================================
// CURSOR FOLLOWER
// ============================================
const cursorFollower = document.getElementById('cursorFollower');

if (cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let fx = 0, fy = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorFollower.style.opacity = '1';
    });

    const interactive = document.querySelectorAll(
        'a, button, input, textarea, select, .card'
    );

    interactive.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('expanded');
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('expanded');
        });
    });

    function animateCursor() {
        fx += (mouseX - fx) * 0.15;
        fy += (mouseY - fy) * 0.15;
        cursorFollower.style.left = fx + 'px';
        cursorFollower.style.top = fy + 'px';
        requestAnimationFrame(animateCursor);
    }

    animateCursor();
}

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

// ============================================
// MOBILE MENU — IGUAL AO DA HOME
// ============================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        document.body.classList.toggle('menu-open', isOpen);
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

console.log('✅ Sobre Mim JS carregado (menu mobile igual à Home)');
