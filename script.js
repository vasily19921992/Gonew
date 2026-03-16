// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Бургер-меню
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Анимация для бургер-меню
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('active'));
    });
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.querySelectorAll('.bar').forEach(bar => bar.classList.remove('active'));
        });
    });
    
    // Параллакс-эффект
    const parallaxLayers = document.querySelectorAll('.parallax-layer');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxLayers.forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            const yPos = -(scrolled * speed);
            layer.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    });
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Эффект при наведении на карточки преимуществ
    const advantageCards = document.querySelectorAll('.advantage-card');
    advantageCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.borderColor = 'var(--accent-color)';
            this.style.boxShadow = '0 15px 30px rgba(0, 102, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.borderColor = 'rgba(0, 102, 255, 0.3)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Эффект для неоновых кнопок
    const neonButtons = document.querySelectorAll('.neon-btn');
    neonButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--neon-glow-blue)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 15px rgba(0, 102, 255, 0.4)';
        });
    });
    
    
    // Эффект для неоновых ссылок в меню
    const neonLinks = document.querySelectorAll('.neon-link');
    neonLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.color = 'var(--accent-color)';
            this.style.textShadow = 'var(--neon-glow)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.color = 'var(--light-color)';
            this.style.textShadow = 'none';
        });
    });
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами, которые нужно анимировать
    const animateElements = document.querySelectorAll('.advantage-card, .review-card, .tech-card, .curriculum-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Добавляем CSS для анимации появления
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .advantage-card, .review-card, .tech-card, .curriculum-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .advantage-card.animate-in, 
        .review-card.animate-in, 
        .tech-card.animate-in, 
        .curriculum-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Случайная смена цвета неонового текста в заголовке
    const neonText = document.querySelector('.neon-text');
    const colors = ['#00ffcc', '#0066ff', '#00ccff', '#ff00ff', '#00ff99'];
    let colorIndex = 0;
    
    if (neonText) {
        setInterval(() => {
            neonText.style.color = colors[colorIndex];
            colorIndex = (colorIndex + 1) % colors.length;
        }, 3000);
    }
});