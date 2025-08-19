// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(106, 76, 147, 0.98)';
        header.style.boxShadow = '0 5px 20px rgba(106, 76, 147, 0.3)';
    } else {
        header.style.background = 'rgba(106, 76, 147, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Mobile menu functionality
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-menu-open');
    mobileMenuBtn.textContent = navLinks.classList.contains('mobile-menu-open') ? '✕' : '☰';
});

// Add mobile menu styles dynamically
const mobileMenuStyles = `
    @media (max-width: 768px) {
        .nav-links {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--purple-primary);
            flex-direction: column;
            padding: 2rem;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            transform: translateY(-100%);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .nav-links.mobile-menu-open {
            transform: translateY(0);
            opacity: 1;
            visibility: visible;
            display: flex;
        }
        
        .nav-links li {
            margin: 0.5rem 0;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = mobileMenuStyles;
document.head.appendChild(styleSheet);

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.sobre-card, .servico-card, .atendimento-card').forEach(el => {
    observer.observe(el);
});

// Phone number formatting and click tracking
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
phoneLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Add ripple effect
        createRippleEffect(e.target, e);
        
        // Track click event (you can replace this with your analytics code)
        console.log('Phone number clicked:', link.getAttribute('href'));
    });
});

// WhatsApp link tracking
const whatsappLinks = document.querySelectorAll('a[href*="wa.me"]');
whatsappLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        // Add ripple effect
        createRippleEffect(e.target, e);
        
        // Track click event
        console.log('WhatsApp link clicked:', link.getAttribute('href'));
    });
});

// Ripple effect function
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    // Ensure the button has relative positioning
    element.style.position = 'relative';
    element.style.overflow = 'hidden';
    element.appendChild(ripple);
    
    // Add ripple animation
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
        rippleStyle.remove();
    }, 600);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.3;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Floating purple hearts animation
function createFloatingHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '💜';
    heart.style.cssText = `
        position: fixed;
        font-size: 24px;
        pointer-events: none;
        z-index: 999;
        opacity: 0.8;
        animation: floatHeart 5s ease-out forwards;
    `;
    
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.top = '100vh';
    
    const heartStyle = document.createElement('style');
    heartStyle.textContent = `
        @keyframes floatHeart {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0.8;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(heartStyle);
    
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
        heartStyle.remove();
    }, 5000);
}

// Create floating hearts periodically
setInterval(createFloatingHeart, 8000);

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 150);
    }
});

// Card hover effects
document.querySelectorAll('.sobre-card, .servico-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Professional registration hover effect
document.querySelectorAll('.contact-text a, .footer-info p').forEach(element => {
    if (element.textContent.includes('CRP') || element.textContent.includes('08/37511')) {
        element.addEventListener('mouseenter', function() {
            this.style.color = 'var(--purple-primary)';
            this.style.cursor = 'default';
        });
    }
});

// Scroll to top functionality
let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    background: var(--purple-primary);
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    z-index: 1000;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 5px 20px rgba(106, 76, 147, 0.4);
`;

document.body.appendChild(scrollToTopBtn);

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

// Loading animation
window.addEventListener('load', () => {
    // Remove any loading screens if they exist
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 300);
    }
    
    // Trigger entrance animations
    document.body.classList.add('loaded');
});

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^\(\d{3}\)\s?\d{4,5}-?\d{4}$/;
    return re.test(phone) || phone.length >= 10;
}

// Emergency contact handler
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        const contactInfo = `
            Jacqueline Tamataya - Psicóloga CRP 08/37511
            Telefone: (042) 99930-1312
            WhatsApp: https://wa.me/5542999301312
            Localização: Ponta Grossa - PR
            Especialidade: Psicanálise
        `;
        
        navigator.clipboard.writeText(contactInfo).then(() => {
            console.log('Informações de contato copiadas para a área de transferência');
        });
    }
});

console.log('🧠 Site da Psicóloga Jacqueline Tamataya carregado com sucesso!');
console.log('📞 Contato: (042) 99930-1312');
console.log('📍 Localização: Ponta Grossa - PR');
