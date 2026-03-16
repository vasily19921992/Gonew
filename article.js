// article.js
document.addEventListener('DOMContentLoaded', function() {
    // Бургер-меню
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Анимация для бургер-меню
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.toggle('active'));
        });
    }
    
    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
                document.querySelectorAll('.bar').forEach(bar => bar.classList.remove('active'));
            }
        });
    });
    
    // Индикатор прокрутки
    const progressBar = document.getElementById('progress-bar');
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        
        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    });
    
    // Плавная прокрутка к якорям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Пропускаем ссылки на другие страницы
            if (href === '#top' || href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                    
                    // Закрываем меню на мобильных устройствах
                    if (window.innerWidth <= 768 && mobileMenu) {
                        mobileMenu.classList.remove('active');
                        navMenu.classList.remove('active');
                        document.querySelectorAll('.bar').forEach(bar => bar.classList.remove('active'));
                    }
                }
            }
        });
    });
    
    // Подсветка активного раздела при прокрутке
    const sections = document.querySelectorAll('.article-section');
    const navItems = document.querySelectorAll('.nav-link[href^="#"]');
    
    function highlightNavItem() {
        let scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${sectionId}`) {
                        item.classList.add('active');
                        item.style.color = 'var(--accent-color)';
                        item.style.textShadow = 'var(--neon-glow)';
                    } else {
                        item.style.color = '';
                        item.style.textShadow = '';
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    
    // Подсветка пунктов оглавления при наведении
    const tocLinks = document.querySelectorAll('.toc-list a');
    tocLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = 'rgba(0, 102, 255, 0.2)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '';
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
                
                // Для карточек с задержкой
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('application-card') ||
                    entry.target.classList.contains('tool-card')) {
                    entry.target.style.transitionDelay = '0.1s';
                }
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами, которые нужно анимировать
    const animateElements = document.querySelectorAll('.feature-card, .application-card, .tool-card, .principle-card, .concept-card, .timeline-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Добавляем CSS для анимации появления
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card, .application-card, .tool-card, 
        .principle-card, .concept-card, .timeline-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .feature-card.animate-in, 
        .application-card.animate-in, 
        .tool-card.animate-in,
        .principle-card.animate-in,
        .concept-card.animate-in,
        .timeline-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .nav-link.active {
            color: var(--accent-color) !important;
            text-shadow: var(--neon-glow) !important;
        }
    `;
    document.head.appendChild(animationStyle);
    
    // Эффект для неоновых ссылок в меню
    const neonLinks = document.querySelectorAll('.neon-link');
    neonLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.color = 'var(--accent-color)';
                this.style.textShadow = 'var(--neon-glow)';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
                this.style.textShadow = '';
            }
        });
    });
    
    // Кнопка "Наверх"
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Показываем/скрываем кнопку при прокрутке
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        });
        
        // Инициализация состояния кнопки
        backToTop.style.transition = 'opacity 0.3s, visibility 0.3s';
        if (window.pageYOffset <= 500) {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    }
    
    // Эффект для кнопки "Начать обучение"
    const actionButton = document.querySelector('.action-box .btn');
    if (actionButton) {
        actionButton.addEventListener('mouseenter', function() {
            this.style.boxShadow = 'var(--neon-glow-blue)';
            this.style.transform = 'translateY(-3px)';
        });
        
        actionButton.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 4px 15px rgba(0, 102, 255, 0.4)';
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Подсветка кода при наведении на примеры
    const codeExamples = document.querySelectorAll('.code-example, .code-block');
    codeExamples.forEach(example => {
        example.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--accent-color)';
            this.style.boxShadow = '0 10px 20px rgba(0, 102, 255, 0.3)';
        });
        
        example.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
            this.style.boxShadow = '';
        });
    });
    
    // Добавление подсветки синтаксиса для блоков кода
    function highlightGoSyntax() {
        const codeBlocks = document.querySelectorAll('pre code');
        
        codeBlocks.forEach(block => {
            const code = block.textContent;
            
            // Простая подсветка ключевых слов Go
            let highlighted = code
                .replace(/\b(package|import|func|var|const|if|else|for|range|switch|case|default|go|chan|select|return|struct|interface|type|map)\b/g, 
                    '<span class="keyword">$1</span>')
                .replace(/\b(int|string|bool|float64|error|nil)\b/g, 
                    '<span class="type">$1</span>')
                .replace(/\b(main|fmt|println|Println|Open|Close|Fatal)\b/g, 
                    '<span class="builtin">$1</span>')
                .replace(/(".*?")/g, 
                    '<span class="string">$1</span>')
                .replace(/(\/\/.*)/g, 
                    '<span class="comment">$1</span>');
            
            block.innerHTML = highlighted;
        });
        
        // Добавляем стили для подсветки
        const highlightStyle = document.createElement('style');
        highlightStyle.textContent = `
            .keyword { color: #ff79c6; font-weight: bold; }
            .type { color: #8be9fd; }
            .builtin { color: #50fa7b; }
            .string { color: #f1fa8c; }
            .comment { color: #6272a4; font-style: italic; }
        `;
        document.head.appendChild(highlightStyle);
    }
    
    // Вызываем подсветку синтаксиса
    highlightGoSyntax();
    
    // Инициализация состояния индикатора прокрутки
    window.dispatchEvent(new Event('scroll'));
});