/* ===============================================
   GALERIA DO MUSEU - JAVASCRIPT
   =============================================== */

// ============= HAMBURGER MENU =============
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

    // Expandir cursor ao passar por links, botões e cards
    const interactiveElements = document.querySelectorAll('a, button, .photo-frame');
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

// ============= ÁUDIO AMBIENTE =============
let audio = null;
let isPlaying = false;
const audioToggle = document.getElementById('audioToggle');
const audioIcon = document.getElementById('audioIcon');

function initAudio() {
    audio = new Audio('audio/audiofundo.mp3');
    audio.loop = true;
    audio.volume = 0.3;
}

if (audioToggle && audioIcon) {
    audioToggle.addEventListener('click', () => {
        if (!audio) {
            initAudio();
        }

        if (isPlaying) {
            audio.pause();
            audioToggle.classList.add('muted');
            audioIcon.innerHTML = `
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
            `;
        } else {
            audio.play().catch(err => {
                console.log('Erro ao reproduzir áudio:', err);
            });
            audioToggle.classList.remove('muted');
            audioIcon.innerHTML = `
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            `;
        }
        
        isPlaying = !isPlaying;
    });

    document.addEventListener('DOMContentLoaded', () => {
        const startAudio = () => {
            if (!audio) initAudio();
            audio.play();
            isPlaying = true;

            audioToggle.classList.remove('muted');
            audioIcon.innerHTML = `
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            `;

            document.removeEventListener('click', startAudio);
            document.removeEventListener('mousemove', startAudio);
        };

        document.addEventListener('click', startAudio);
        document.addEventListener('mousemove', startAudio);
    });
}

// ============= MODAL DE FOTO COM MOLDURA =============
const photoModal = document.getElementById('photoModal');
const modalContent = document.getElementById('modalContent');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');
const modalPrev = document.getElementById('modalPrev');
const modalNext = document.getElementById('modalNext');

let currentPhotoIndex = 0;
let allPhotos = [];

function initGallery() {
    const photoFrames = document.querySelectorAll('.photo-frame');
    
    if (photoFrames.length === 0) {
        console.log('Nenhuma foto encontrada. Verificando novamente...');
        setTimeout(initGallery, 500);
        return;
    }
    
    allPhotos = [];
    
    photoFrames.forEach((frame, index) => {
        const img = frame.querySelector('img');
        const title = frame.querySelector('.photo-title');
        
        if (img) {
            allPhotos.push({
                src: img.src,
                alt: img.alt || '',
                title: title ? title.textContent : 'Sem título'
            });

            frame.style.cursor = 'pointer';
            frame.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Clicou na foto:', index, 'Título:', title ? title.textContent : 'Sem título');
                openModal(index);
            });
        }
    });
    
    console.log(`✅ ${allPhotos.length} fotos carregadas!`);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}

function openModal(index) {
    if (!photoModal || !modalContent) {
        console.error('Elementos do modal não encontrados!');
        return;
    }
    
    currentPhotoIndex = index;
    const photo = allPhotos[index];
    
    console.log('Abrindo modal com:', photo);
    
    modalContent.innerHTML = `
        <div class="modal-frame-container">
            <div class="modal-frame-shadow"></div>
            <div class="modal-frame-border">
                <img src="${photo.src}" alt="${photo.alt}">
                <div class="modal-frame-spotlight"></div>
            </div>
        </div>
    `;
    
    if (modalTitle) {
        modalTitle.textContent = photo.title;
        console.log('Título atualizado para:', photo.title);
    }
    
    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    console.log('Modal aberto!');
}

function closeModal() {
    if (photoModal) {
        photoModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function navigateModal(direction) {
    currentPhotoIndex += direction;
    
    if (currentPhotoIndex < 0) {
        currentPhotoIndex = allPhotos.length - 1;
    } else if (currentPhotoIndex >= allPhotos.length) {
        currentPhotoIndex = 0;
    }
    
    const photo = allPhotos[currentPhotoIndex];
    
    modalContent.innerHTML = `
        <div class="modal-frame-container">
            <div class="modal-frame-shadow"></div>
            <div class="modal-frame-border">
                <img src="${photo.src}" alt="${photo.alt}">
                <div class="modal-frame-spotlight"></div>
            </div>
        </div>
    `;
    
    if (modalTitle) {
        modalTitle.textContent = photo.title;
    }
}

// Event listeners do modal
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

if (modalPrev) {
    modalPrev.addEventListener('click', () => navigateModal(-1));
}

if (modalNext) {
    modalNext.addEventListener('click', () => navigateModal(1));
}

if (photoModal) {
    photoModal.addEventListener('click', (e) => {
        if (e.target === photoModal) {
            closeModal();
        }
    });
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (photoModal && photoModal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            navigateModal(-1);
        } else if (e.key === 'ArrowRight') {
            navigateModal(1);
        }
    }
});

// ============= INTERSECTION OBSERVER - ANIMAÇÕES =============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observar séries
document.querySelectorAll('.series-section').forEach(section => {
    observer.observe(section);
});

// ============= PARALLAX SUAVE =============
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Parallax nas luzes do museu
    const lights = document.querySelectorAll('.museum-lighting');
    lights.forEach((light, index) => {
        const speed = 0.1 + (index * 0.05);
        light.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============= EFEITO DE SHAKE NO LOGO =============
const logo = document.querySelector('.logo img');

if (logo) {
    logo.addEventListener('mouseenter', function() {
        this.style.animation = 'shake 0.5s ease';
    });

    logo.addEventListener('animationend', function() {
        this.style.animation = '';
    });
}

// Adicionar animação de shake
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
`;
document.head.appendChild(shakeStyle);

// ============= LAZY LOADING MELHORADO =============
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============= EFEITO DE ILUMINAÇÃO DINÂMICA =============
document.querySelectorAll('.photo-frame').forEach(frame => {
    frame.addEventListener('mouseenter', function() {
        const spotlight = this.querySelector('.frame-spotlight');
        if (spotlight) {
            spotlight.style.opacity = '1';
        }
    });

    frame.addEventListener('mouseleave', function() {
        const spotlight = this.querySelector('.frame-spotlight');
        if (spotlight) {
            spotlight.style.opacity = '0';
        }
    });
});

// ============= SMOOTH SCROLL =============
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// ============= INDICADOR DE CARREGAMENTO =============
window.addEventListener('load', () => {
    console.log('🎨 Museu Digital carregado com sucesso!');
    
    // Fade in suave de todas as imagens
    document.querySelectorAll('.photo-frame img').forEach((img, index) => {
        setTimeout(() => {
            img.style.opacity = '1';
        }, index * 50);
    });
});

// ============= DICAS DE INTERAÇÃO =============
const showInteractionHint = () => {
    const hint = document.createElement('div');
    hint.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        background: rgba(69, 162, 158, 0.9);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-size: 14px;
        z-index: 1000;
        animation: fadeIn 0.5s ease;
    `;
    hint.textContent = '💡 Clique nas fotos para ampliar!';
    document.body.appendChild(hint);
    
    setTimeout(() => {
        hint.style.animation = 'fadeOut 0.5s ease forwards';
        setTimeout(() => hint.remove(), 500);
    }, 4000);
};

// Mostrar dica após 3 segundos
setTimeout(showInteractionHint, 3000);

// Adicionar animações de fade
const fadeStyle = document.createElement('style');
fadeStyle.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(20px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(20px); }
    }
`;
document.head.appendChild(fadeStyle);

console.log('✅ Script da Galeria do Museu carregado com sucesso!');