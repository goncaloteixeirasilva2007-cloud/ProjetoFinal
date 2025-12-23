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

if (cursorFollower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorFollower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        cursorFollower.style.opacity = '1';
    });

    // Adiciona os cards de sites aos elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, .card, .site-card');

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
// ANIMAÇÃO STAGGERED PARA OS CARDS DE SITES
// ============================================
const siteCards = document.querySelectorAll('.site-card');

if (siteCards.length > 0) {
    const sitesObserver = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Adiciona delay progressivo para cada card
                setTimeout(() => {
                    entry.target.classList.add('animate-fade-in-up');
                }, index * 150); // 150ms de delay entre cada card
                
                sitesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    siteCards.forEach(card => sitesObserver.observe(card));
}

// ============================================
// PARALLAX COM OTIMIZAÇÃO
// ============================================
let ticking = false;

function updateParallax() {
    const y = window.pageYOffset;

    document.querySelectorAll('.blob').forEach((blob, i) => {
        blob.style.transform = `translateY(${y * (0.03 * (i + 1))}px)`;
    });

    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
    }
});

// ============================================
// AJUSTE DINÂMICO PARA PREENCHER ESPAÇOS
// ============================================
function adjustContentSpacing() {
    const mainSection = document.querySelector('.main-section');
    const flexContainer = document.querySelector('.flex-container');
    const footer = document.querySelector('footer');
    
    if (!mainSection || !flexContainer || !footer) return;
    
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    
    // Detecta tablets específicos em portrait
    const isTabletPortrait = (
        (windowWidth >= 768 && windowWidth <= 920 && windowHeight >= 1100) || // 820x1180, 912x1368
        (windowWidth >= 820 && windowWidth <= 880 && windowHeight >= 1200) || // 853x1280
        (windowWidth >= 1000 && windowWidth <= 1100 && windowHeight >= 1300) // 1024x1366
    );
    
    // Para tablets portrait específicos, não aplica ajustes dinâmicos
    // pois já têm CSS específico
    if (isTabletPortrait) {
        return;
    }
    
    // Apenas em desktop com espaço sobrando
    if (windowWidth >= 769) {
        const headerHeight = document.querySelector('header')?.offsetHeight || 90;
        const footerHeight = footer.offsetHeight;
        const contentHeight = mainSection.scrollHeight;
        const totalOccupiedHeight = headerHeight + contentHeight + footerHeight;
        const availableSpace = windowHeight - totalOccupiedHeight;
        
        // Se houver muito espaço vazio (mais de 100px), expande o conteúdo
        if (availableSpace > 100) {
            const extraPadding = Math.min(availableSpace * 0.4, 150);
            mainSection.style.paddingTop = `${parseInt(window.getComputedStyle(mainSection).paddingTop) + extraPadding}px`;
            mainSection.style.paddingBottom = `${parseInt(window.getComputedStyle(mainSection).paddingBottom) + extraPadding}px`;
        }
        
        // Ajusta o gap entre elementos se necessário
        const contentHeightRatio = contentHeight / windowHeight;
        if (contentHeightRatio < 0.6) {
            const currentGap = parseFloat(window.getComputedStyle(flexContainer).gap);
            flexContainer.style.gap = `${currentGap * 1.2}px`;
        }
    }
}

// ============================================
// PREVINE PROBLEMAS DE SCROLL HORIZONTAL
// ============================================
function preventHorizontalScroll() {
    const body = document.body;
    const html = document.documentElement;
    
    body.style.overflowX = 'hidden';
    html.style.overflowX = 'hidden';
    
    // Verifica elementos que ultrapassam a viewport
    const allElements = document.querySelectorAll('*');
    allElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.right > window.innerWidth + 10) {
            console.warn('⚠️ Elemento ultrapassando viewport:', el);
        }
    });
}

// ============================================
// EFEITO HOVER ESPECIAL PARA CARDS DE SITES
// ============================================
siteCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        // Adiciona leve rotação aos outros cards
        siteCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.style.opacity = '0.7';
                otherCard.style.transform = 'scale(0.98)';
            }
        });
    });
    
    card.addEventListener('mouseleave', function() {
        // Remove o efeito de todos os cards
        siteCards.forEach(otherCard => {
            otherCard.style.opacity = '1';
            otherCard.style.transform = 'scale(1)';
        });
    });
});

// ============================================
// OTIMIZAÇÃO DE PERFORMANCE
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reset estilos inline antes de recalcular
        const mainSection = document.querySelector('.main-section');
        const flexContainer = document.querySelector('.flex-container');
        
        if (mainSection) {
            mainSection.style.paddingTop = '';
            mainSection.style.paddingBottom = '';
        }
        
        if (flexContainer) {
            flexContainer.style.gap = '';
        }
        
        adjustContentSpacing();
        preventHorizontalScroll();
    }, 300);
});

// ============================================
// INICIALIZAÇÃO
// ============================================
window.addEventListener('load', () => {
    setTimeout(() => {
        adjustContentSpacing();
        preventHorizontalScroll();
    }, 100);
    
    console.log('✅ Página carregada - Layout otimizado com espaçamento dinâmico');
    console.log('✅ Secção de Sites Realizados carregada com sucesso');
});

// ============================================
// MONITORAMENTO DE VIEWPORT (APENAS PARA DEBUG)
// ============================================
if (window.location.search.includes('debug=true')) {
    const debugPanel = document.createElement('div');
    debugPanel.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: rgba(0,0,0,0.85);
        color: #fff;
        padding: 12px;
        font-size: 11px;
        border-radius: 6px;
        z-index: 99999;
        font-family: 'Courier New', monospace;
        line-height: 1.5;
        max-width: 250px;
    `;
    document.body.appendChild(debugPanel);
    
    function updateDebugInfo() {
        const mainSection = document.querySelector('.main-section');
        const footer = document.querySelector('footer');
        const header = document.querySelector('header');
        
        const totalHeight = header?.offsetHeight + mainSection?.offsetHeight + footer?.offsetHeight;
        const emptySpace = window.innerHeight - totalHeight;
        
        debugPanel.innerHTML = `
            <strong>📊 Debug Info</strong><br>
            Viewport: ${window.innerWidth}×${window.innerHeight}px<br>
            Content: ${totalHeight}px<br>
            Empty: ${emptySpace}px<br>
            Scroll: ${window.pageYOffset}px<br>
            Sites: ${siteCards.length} cards
        `;
    }
    
    updateDebugInfo();
    window.addEventListener('resize', updateDebugInfo);
    window.addEventListener('scroll', updateDebugInfo);
}

console.log('✅ Sobre Mim carregado - Responsivo e otimizado para todos os dispositivos');