// maintenance.js
document.addEventListener('DOMContentLoaded', function() {
    // Создание частиц для фона
    function createParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Случайные параметры
            const size = Math.random() * 5 + 2;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = Math.random() * 20 + 10;
            const delay = Math.random() * 5;
            const color = Math.random() > 0.5 ? 'rgba(0, 102, 255, 0.5)' : 'rgba(0, 255, 204, 0.5)';
            
            // Применение стилей
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${color};
                border-radius: 50%;
                left: ${posX}%;
                top: ${posY}%;
                box-shadow: 0 0 ${size * 2}px ${color};
                animation: particle-float ${duration}s infinite ${delay}s linear;
            `;
            
            particlesContainer.appendChild(particle);
        }
        
        // Добавляем CSS анимацию для частиц
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particle-float {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100vh) translateX(${Math.random() > 0.5 ? '' : '-'}${Math.random() * 100}px);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Анимация прогресс-бара
    function animateProgressBar() {
        const progressFill = document.getElementById('progress-fill');
        const progressPercent = document.getElementById('progress-percent');
        let progress = 0;
        
        // Имитация прогресса работ
        const interval = setInterval(() => {
            if (progress < 87) {
                // Случайное увеличение прогресса
                progress += Math.random() * 3;
                
                // Не даем превысить 87%
                if (progress > 87) progress = 87;
                
                // Обновляем отображение
                progressFill.style.width = `${progress}%`;
                progressPercent.textContent = `${Math.round(progress)}%`;
                
                // Добавляем мерцание при достижении определенных значений
                if (Math.round(progress) % 25 === 0) {
                    progressFill.style.animation = 'none';
                    setTimeout(() => {
                        progressFill.style.animation = '';
                    }, 100);
                }
            } else {
                clearInterval(interval);
            }
        }, 500);
    }
    
    // Обратный отсчет
    function startCountdown() {
        const timerValues = document.querySelectorAll('.timer-value');
        
        // Устанавливаем время 2 часа 30 минут 45 секунд
        let hours = 2;
        let minutes = 30;
        let seconds = 45;
        
        // Функция обновления таймера
        function updateTimer() {
            seconds--;
            
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        // Время истекло
                        hours = 0;
                        minutes = 0;
                        seconds = 0;
                        clearInterval(countdownInterval);
                        
                        // Показываем сообщение о завершении работ
                        const timerContainer = document.querySelector('.timer-container');
                        timerContainer.innerHTML = `
                            <div class="timer-icon">
                                <i class="fas fa-check-circle"></i>
                            </div>
                            <div class="timer-content">
                                <h3>Работы завершены!</h3>
                                <p>Сайт скоро будет доступен. Пожалуйста, обновите страницу.</p>
                            </div>
                        `;
                        timerContainer.style.borderColor = 'var(--accent-color)';
                        
                        // Обновляем прогресс-бар до 100%
                        const progressFill = document.getElementById('progress-fill');
                        const progressPercent = document.getElementById('progress-percent');
                        progressFill.style.width = '100%';
                        progressPercent.textContent = '100%';
                        
                        return;
                    }
                }
            }
            
            // Форматируем значения с ведущими нулями
            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');
            
            // Обновляем отображение
            timerValues[0].textContent = formattedHours;
            timerValues[1].textContent = formattedMinutes;
            timerValues[2].textContent = formattedSeconds;
            
            // Анимация при изменении секунд
            timerValues[2].style.transform = 'scale(1.1)';
            setTimeout(() => {
                timerValues[2].style.transform = 'scale(1)';
            }, 200);
            
            // Анимация при изменении минут
            if (seconds === 59) {
                timerValues[1].style.transform = 'scale(1.1)';
                setTimeout(() => {
                    timerValues[1].style.transform = 'scale(1)';
                }, 200);
            }
            
            // Анимация при изменении часов
            if (minutes === 59 && seconds === 59) {
                timerValues[0].style.transform = 'scale(1.1)';
                setTimeout(() => {
                    timerValues[0].style.transform = 'scale(1)';
                }, 200);
            }
        }
        
        // Запускаем обновление каждую секунду
        const countdownInterval = setInterval(updateTimer, 1000);
        
        // Инициализация таймера
        updateTimer();
    }
    
    // Кнопка обновления страницы
    function setupRefreshButton() {
        const refreshButton = document.getElementById('refresh-button');
        
        refreshButton.addEventListener('click', function() {
            // Анимация нажатия
            this.style.transform = 'scale(0.95)';
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Обновление...</span>';
            
            // Имитация задержки перед обновлением
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    }
    
    // Анимация для плавающих элементов
    function animateFloatingElements() {
        const floatingElements = document.querySelectorAll('.floating-element');
        
        floatingElements.forEach(element => {
            // Случайная задержка для каждого элемента
            const delay = Math.random() * 5;
            element.style.animationDelay = `${delay}s`;
            
            // Случайное изменение траектории
            const keyframes = `
                @keyframes float-custom-${Math.random().toString(36).substr(2, 9)} {
                    0%, 100% {
                        transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(0deg);
                        opacity: ${Math.random() * 0.3 + 0.2};
                    }
                    25% {
                        transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(90deg);
                        opacity: ${Math.random() * 0.5 + 0.3};
                    }
                    50% {
                        transform: translate(${Math.random() * 20 - 10}px, ${Math.random() * 20 - 10}px) rotate(180deg);
                        opacity: ${Math.random() * 0.3 + 0.2};
                    }
                    75% {
                        transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px) rotate(270deg);
                        opacity: ${Math.random() * 0.5 + 0.3};
                    }
                }
            `;
            
            const style = document.createElement('style');
            style.textContent = keyframes;
            document.head.appendChild(style);
            
            // Применяем уникальную анимацию к элементу
            element.style.animation = `float-custom-${Math.random().toString(36).substr(2, 9)} 15s infinite linear`;
        });
    }
    
    // Эффект мигания для статуса
    function animateStatusIndicator() {
        const statusDot = document.querySelector('.status-dot');
        
        setInterval(() => {
            statusDot.style.boxShadow = '0 0 20px var(--warning-color)';
            setTimeout(() => {
                statusDot.style.boxShadow = 'var(--neon-glow-warning)';
            }, 300);
        }, 2000);
    }
    
    // Случайное изменение цвета текста заголовка
    function animateTitleColors() {
        const titleParts = document.querySelectorAll('.text-part-1, .text-part-2, .text-part-3');
        const colors = [
            '#0066ff', '#00ccff', '#00ffcc', '#ffaa00', '#ff3366',
            '#9966ff', '#00ff99', '#ffcc00', '#ff66cc', '#66ffcc'
        ];
        
        setInterval(() => {
            titleParts.forEach(part => {
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                part.style.color = randomColor;
                part.style.textShadow = `0 0 20px ${randomColor}`;
            });
        }, 3000);
    }
    
    // Имитация активности (случайные вспышки)
    function simulateActivity() {
        setInterval(() => {
            // Случайный элемент для вспышки
            const elements = [
                document.querySelector('.logo-circle'),
                document.querySelector('.progress-bar'),
                document.querySelector('.timer-icon'),
                document.querySelector('.contact-icon')
            ].filter(el => el !== null);
            
            if (elements.length > 0) {
                const randomElement = elements[Math.floor(Math.random() * elements.length)];
                
                // Вспышка
                const originalBoxShadow = randomElement.style.boxShadow;
                randomElement.style.boxShadow = '0 0 30px var(--accent-color)';
                
                setTimeout(() => {
                    randomElement.style.boxShadow = originalBoxShadow;
                }, 300);
            }
        }, 5000);
    }
    
    // Инициализация всех функций
    function init() {
        createParticles();
        animateProgressBar();
        startCountdown();
        setupRefreshButton();
        animateFloatingElements();
        animateStatusIndicator();
        animateTitleColors();
        simulateActivity();
        
        // Добавляем обработчик для кнопки "Назад"
        const backButton = document.querySelector('.back-button');
        if (backButton) {
            backButton.addEventListener('click', function(e) {
                if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
                    e.preventDefault();
                    
                    // Анимация нажатия
                    this.style.transform = 'scale(0.95)';
                    
                    // Имитация перехода
                    setTimeout(() => {
                        // В реальном приложении здесь был бы переход на главную страницу
                        // window.location.href = 'index.html';
                        
                        // Для демонстрации просто показываем сообщение
                        alert('В обычном режиме здесь был бы переход на главную страницу');
                        this.style.transform = '';
                    }, 300);
                }
            });
        }
        
        // Эффект при наведении на контактные ссылки
        const contactLinks = document.querySelectorAll('.contact-link');
        contactLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });
    }
    
    // Запуск инициализации
    init();
});