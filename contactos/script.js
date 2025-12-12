/* ===============================================
   CONTACTOS - JAVASCRIPT
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

    // Expandir cursor ao passar por elementos interativos
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .contact-card');
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

// ============= FORMULÁRIO DE CONTACTO =============
const submitBtn = document.getElementById('submitBtn');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const subjectInput = document.getElementById('subject');
const messageInput = document.getElementById('message');

if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Validação simples
        if (!nameInput.value || !emailInput.value || !subjectInput.value || !messageInput.value) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value)) {
            alert('Por favor, insira um email válido!');
            return;
        }

        // Animação de sucesso
        submitBtn.textContent = 'Enviando...';
        submitBtn.style.background = 'linear-gradient(135deg, #45A29E, #45A29E)';
        submitBtn.disabled = true;
        
        // Simular envio (aqui você integraria com um backend real)
        setTimeout(() => {
            submitBtn.textContent = '✓ Mensagem Enviada!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Limpar formulário
            nameInput.value = '';
            emailInput.value = '';
            subjectInput.value = '';
            messageInput.value = '';
            
            // Resetar botão após 3 segundos
            setTimeout(() => {
                submitBtn.textContent = 'Enviar Mensagem';
                submitBtn.style.background = 'linear-gradient(135deg, var(--cor1), var(--cor2))';
                submitBtn.disabled = false;
            }, 3000);
        }, 1500);
    });
}

// ============= ANIMAÇÃO DOS CARDS AO SCROLL =============
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

// Observar cards de contacto
document.querySelectorAll('.contact-card').forEach(card => {
    observer.observe(card);
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
        }
    });
});

console.log('✅ Página de Contactos carregada com sucesso!');