/* ===============================================
GALERIA DO MUSEU - SCRIPT SEM TRAVAMENTOS
=============================================== */

// ============= LOADING SCREEN E PRELOAD =============
let imagesLoaded = 0;
let totalImages = 0;

function showLoadingScreen() {
    const loadingHTML = `
        <div class="loading-screen" id="loadingScreen">
            <div class="loading-spinner"></div>
            <div class="loading-text">Carregando galeria...</div>
        </div>
    `;
    document.body.insertAdjacentHTML('afterbegin', loadingHTML);
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
    }
}

function preloadImages() {
    const images = document.querySelectorAll('.photo-frame img');
    totalImages = images.length;
    
    if (totalImages === 0) {
        hideLoadingScreen();
        return;
    }

    images.forEach(img => {
        if (img.complete) {
            imagesLoaded++;
            if (imagesLoaded === totalImages) {
                hideLoadingScreen();
                console.log(`✅ ${totalImages} imagens carregadas!`);
            }
        } else {
            const newImg = new Image();
            newImg.onload = () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    hideLoadingScreen();
                    console.log(`✅ ${totalImages} imagens carregadas!`);
                }
            };
            newImg.onerror = () => {
                imagesLoaded++;
                if (imagesLoaded === totalImages) {
                    hideLoadingScreen();
                }
            };
            newImg.src = img.src;
        }
    });
}

// Iniciar loading
showLoadingScreen();

// ============= HEADER SCROLL =============
const header = document.getElementById('header');
let scrollTimeout;

window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            header?.classList.add('scrolled');
        } else {
            header?.classList.remove('scrolled');
        }
    }, 10);
}, { passive: true });

// ============= CURSOR PERSONALIZADO =============
const cursorFollower = document.getElementById('cursorFollower');

if (cursorFollower && window.matchMedia("(hover: hover)").matches) {
    let mouseX = 0, mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorFollower.style.left = mouseX + 'px';
        cursorFollower.style.top = mouseY + 'px';
        cursorFollower.style.opacity = '1';
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        cursorFollower.style.opacity = '0';
    });

    const interactiveElements = document.querySelectorAll('a, button, .photo-frame');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.classList.add('expanded');
        });
        element.addEventListener('mouseleave', () => {
            cursorFollower.classList.remove('expanded');
        });
    });
}

// ============= ÁUDIO AMBIENTE =============
let audio = null;
let isPlaying = false;
const audioToggle = document.getElementById('audioToggle');
const audioIcon = document.getElementById('audioIcon');

function initAudio() {
    if (!audio) {
        audio = new Audio('audio/audiofundo.mp3');
        audio.loop = true;
        audio.volume = 0.3;
    }
}

if (audioToggle && audioIcon) {
    audioToggle.addEventListener('click', () => {
        if (!audio) initAudio();

        if (isPlaying) {
            audio.pause();
            audioToggle.classList.add('muted');
            audioIcon.innerHTML = `
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
            `;
        } else {
            audio.play().catch(err => console.log('Erro ao reproduzir áudio:', err));
            audioToggle.classList.remove('muted');
            audioIcon.innerHTML = `
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
            `;
        }
        isPlaying = !isPlaying;
    });

    // Auto-play
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
    };
    document.addEventListener('click', startAudio, { once: true, passive: true });
}

// ============= MODAL DE FOTO =============
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
        setTimeout(initGallery, 100);
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

            frame.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal(index);
            });
        }
    });

    console.log(`✅ ${allPhotos.length} fotos prontas!`);
    preloadImages();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
} else {
    initGallery();
}

function openModal(index) {
    if (!photoModal || !modalContent) return;

    currentPhotoIndex = index;
    const photo = allPhotos[index];

    modalContent.innerHTML = `
        <div class="modal-frame-container">
            <div class="modal-frame-shadow"></div>
            <div class="modal-frame-border">
                <img src="${photo.src}" alt="${photo.alt}">
            </div>
        </div>
    `;

    if (modalTitle) {
        modalTitle.textContent = photo.title;
    }

    photoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
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
            </div>
        </div>
    `;

    if (modalTitle) {
        modalTitle.textContent = photo.title;
    }
}

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

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: rotate(0deg); }
        25% { transform: rotate(-5deg); }
        75% { transform: rotate(5deg); }
    }
`;
document.head.appendChild(shakeStyle);

console.log('⚡ Galeria carregada - Zero travamentos!');