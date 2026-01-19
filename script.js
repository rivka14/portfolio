// ============================================
// Configuration Constants
// ============================================
const CONFIG = {
    NEURAL_NETWORK: {
        MAX_DISTANCE: 150,
        NODE_COUNT: 50,
        NODE_SPEED: 0.5,
        MIN_NODE_RADIUS: 1,
        MAX_NODE_RADIUS: 3
    },
    TYPEWRITER: {
        TYPING_SPEED: 100,
        DELETING_SPEED: 50,
        PAUSE_DURATION: 2000,
        INITIAL_DELAY: 1000,
        NEXT_WORD_DELAY: 500
    },
    SCROLL: {
        NAVBAR_SCROLL_THRESHOLD: 100,
        SECTION_OFFSET: 100,
        PARALLAX_SPEED: 0.3
    },
    ANIMATION: {
        DEBOUNCE_DELAY: 250,
        MESSAGE_DISPLAY_DURATION: 5000
    }
};

// ============================================
// Theme Toggle
// ============================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'dark';
try {
    if (savedTheme === 'dark') {
        html.removeAttribute('data-theme');
    } else {
        html.setAttribute('data-theme', savedTheme);
    }
} catch (error) {
    console.error('Error loading theme:', error);
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        try {
            const currentTheme = html.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';

            if (newTheme === 'dark') {
                html.removeAttribute('data-theme');
            } else {
                html.setAttribute('data-theme', newTheme);
            }
            localStorage.setItem('theme', newTheme);

            if (neuralNetwork) {
                initNeuralNetwork();
            }
        } catch (error) {
            console.error('Error toggling theme:', error);
        }
    });
}

// ============================================
// Neural Network Background Animation
// ============================================
let neuralNetwork = null;
let animationFrameId = null;
let nodes = [];
let connections = [];

function initNeuralNetwork() {
    const canvas = document.getElementById('neuralNetwork') || document.querySelector('.particles');
    if (!canvas) return;

    try {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        if (canvas.tagName !== 'CANVAS') {
            const newCanvas = document.createElement('canvas');
            newCanvas.id = 'neuralNetwork';
            newCanvas.className = 'neural-network';
            canvas.parentNode.replaceChild(newCanvas, canvas);
            neuralNetwork = newCanvas;
        } else {
            neuralNetwork = canvas;
        }

        const ctx = neuralNetwork.getContext('2d');
        if (!ctx) {
            console.error('Failed to get canvas context');
            return;
        }

        function resize() {
            neuralNetwork.width = neuralNetwork.offsetWidth;
            neuralNetwork.height = neuralNetwork.offsetHeight;
            initNodes();
        }

        function initNodes() {
            nodes = [];
            for (let i = 0; i < CONFIG.NEURAL_NETWORK.NODE_COUNT; i++) {
                nodes.push({
                    x: Math.random() * neuralNetwork.width,
                    y: Math.random() * neuralNetwork.height,
                    vx: (Math.random() - 0.5) * CONFIG.NEURAL_NETWORK.NODE_SPEED,
                    vy: (Math.random() - 0.5) * CONFIG.NEURAL_NETWORK.NODE_SPEED,
                    radius: Math.random() * (CONFIG.NEURAL_NETWORK.MAX_NODE_RADIUS - CONFIG.NEURAL_NETWORK.MIN_NODE_RADIUS) + CONFIG.NEURAL_NETWORK.MIN_NODE_RADIUS
                });
            }
        }

        function getColor(variable) {
            return getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
        }

        function convertToRGBA(color, opacity) {
            if (color.includes('rgba')) {
                return color.replace(/[\d.]+\)$/, `${opacity})`);
            }
            if (color.includes('rgb')) {
                return color.replace('rgb', 'rgba').replace(')', `, ${opacity})`);
            }
            return `rgba(76, 110, 245, ${opacity})`;
        }

        function animate() {
            try {
                ctx.clearRect(0, 0, neuralNetwork.width, neuralNetwork.height);

                const nodeColor = getColor('--neural-node');
                const connectionColor = getColor('--neural-connection');

                nodes.forEach((node, i) => {
                    node.x += node.vx;
                    node.y += node.vy;

                    if (node.x < 0 || node.x > neuralNetwork.width) node.vx *= -1;
                    if (node.y < 0 || node.y > neuralNetwork.height) node.vy *= -1;

                    node.x = Math.max(0, Math.min(neuralNetwork.width, node.x));
                    node.y = Math.max(0, Math.min(neuralNetwork.height, node.y));

                    ctx.beginPath();
                    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                    ctx.fillStyle = nodeColor;
                    ctx.fill();

                    ctx.shadowBlur = 10;
                    ctx.shadowColor = nodeColor;
                    ctx.fill();
                    ctx.shadowBlur = 0;

                    nodes.slice(i + 1).forEach(otherNode => {
                        const dx = node.x - otherNode.x;
                        const dy = node.y - otherNode.y;
                        const distance = Math.sqrt(dx * dx + dy * dy);

                        if (distance < CONFIG.NEURAL_NETWORK.MAX_DISTANCE) {
                            const opacity = (1 - distance / CONFIG.NEURAL_NETWORK.MAX_DISTANCE) * 0.5;
                            ctx.beginPath();
                            ctx.moveTo(node.x, node.y);
                            ctx.lineTo(otherNode.x, otherNode.y);
                            ctx.strokeStyle = convertToRGBA(connectionColor, opacity);
                            ctx.lineWidth = 0.5;
                            ctx.stroke();
                        }
                    });
                });

                animationFrameId = requestAnimationFrame(animate);
            } catch (error) {
                console.error('Error in neural network animation:', error);
            }
        }

        resize();
        window.addEventListener('resize', resize);
        animate();
    } catch (error) {
        console.error('Error initializing neural network:', error);
    }
}

// ============================================
// Typewriter Animation
// ============================================
const typewriterElement = document.getElementById('typewriter');
const titles = ['Software Developer', 'AI Engineer'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = CONFIG.TYPEWRITER.TYPING_SPEED;

function typeWriter() {
    if (!typewriterElement) return;

    try {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = CONFIG.TYPEWRITER.DELETING_SPEED;
        } else {
            typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = CONFIG.TYPEWRITER.TYPING_SPEED;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            typingSpeed = CONFIG.TYPEWRITER.PAUSE_DURATION;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = CONFIG.TYPEWRITER.NEXT_WORD_DELAY;
        }

        setTimeout(typeWriter, typingSpeed);
    } catch (error) {
        console.error('Error in typewriter animation:', error);
    }
}

function initTypewriter() {
    if (typewriterElement) {
        setTimeout(typeWriter, CONFIG.TYPEWRITER.INITIAL_DELAY);
    }
}

// ============================================
// Navigation and Scroll Effects
// ============================================
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
let lastScroll = 0;

function handleScroll() {
    try {
        const currentScroll = window.pageYOffset;

        if (navbar) {
            if (currentScroll > CONFIG.SCROLL.NAVBAR_SCROLL_THRESHOLD) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (currentScroll >= sectionTop - CONFIG.SCROLL.SECTION_OFFSET) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });

        const heroBackground = document.querySelector('.hero-bg');
        if (heroBackground) {
            heroBackground.style.transform = `translateY(${currentScroll * CONFIG.SCROLL.PARALLAX_SPEED}px)`;
        }

        lastScroll = currentScroll;
    } catch (error) {
        console.error('Error in scroll handler:', error);
    }
}

window.addEventListener('scroll', handleScroll, { passive: true });

// ============================================
// Mobile Menu Toggle
// ============================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Anime.js Scroll Animations
function initAnimeAnimations() {
    if (typeof anime === 'undefined') {
        console.warn('Anime.js not loaded, using fallback animations');
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        return;
    }

    anime({
        targets: '.hero-content',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1200,
        easing: 'easeOutExpo',
        delay: 300
    });

    const observeSections = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');

                const title = entry.target.querySelector('.section-title');
                if (title) {
                    anime({
                        targets: title,
                        opacity: [0, 1],
                        translateX: [-30, 0],
                        duration: 800,
                        easing: 'easeOutExpo'
                    });
                }

                const subtitle = entry.target.querySelector('.section-subtitle');
                if (subtitle) {
                    anime({
                        targets: subtitle,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 800,
                        delay: 200,
                        easing: 'easeOutExpo'
                    });
                }

                const aboutContent = entry.target.querySelector('.about-content');
                if (aboutContent) {
                    anime({
                        targets: aboutContent,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 1000,
                        delay: 400,
                        easing: 'easeOutExpo'
                    });
                }

                const skillsContainer = entry.target.querySelector('.skills-container');
                if (skillsContainer) {
                    anime({
                        targets: skillsContainer,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 1000,
                        delay: 600,
                        easing: 'easeOutExpo'
                    });

                    const skillTags = skillsContainer.querySelectorAll('.skill-tag');
                    anime({
                        targets: skillTags,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 600,
                        delay: anime.stagger(30, {start: 800}),
                        easing: 'easeOutExpo'
                    });
                }

                const projectsGrid = entry.target.querySelector('.projects-grid');
                if (projectsGrid) {
                    anime({
                        targets: projectsGrid,
                        opacity: [0, 1],
                        duration: 600,
                        easing: 'easeOutExpo'
                    });

                    const projectCards = projectsGrid.querySelectorAll('.project-card');
                    anime({
                        targets: projectCards,
                        opacity: [0, 1],
                        translateY: [60, 0],
                        duration: 800,
                        delay: anime.stagger(150, {start: 200}),
                        easing: 'easeOutExpo'
                    });
                }

                const contactContent = entry.target.querySelector('.contact-content');
                if (contactContent) {
                    anime({
                        targets: contactContent,
                        opacity: [0, 1],
                        translateY: [40, 0],
                        duration: 1000,
                        delay: 400,
                        easing: 'easeOutExpo'
                    });
                }

                const cards = entry.target.querySelectorAll('.experience-card, .education-card');
                if (cards.length > 0) {
                    anime({
                        targets: cards,
                        opacity: [0, 1],
                        translateX: [-40, 0],
                        duration: 800,
                        delay: anime.stagger(200, {start: 400}),
                        easing: 'easeOutExpo'
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    sections.forEach(section => {
        observeSections.observe(section);
    });
}

// ============================================
// Contact Form Handling
// ============================================
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function validateEmail(email) {
    return EMAIL_REGEX.test(email.toLowerCase());
}

function validateName(name) {
    return name.trim().length >= 2 && name.trim().length <= 100;
}

function validateMessage(message) {
    return message.trim().length >= 10 && message.trim().length <= 1000;
}

if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        try {
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Comprehensive validation
            if (!name || !email || !message) {
                showFormMessage('Please fill in all fields', 'error');
                return;
            }

            if (!validateName(name)) {
                showFormMessage('Name must be between 2 and 100 characters', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            if (!validateMessage(message)) {
                showFormMessage('Message must be between 10 and 1000 characters', 'error');
                return;
            }

            // Simulate form submission
            showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
            contactForm.reset();

            // In production, send data to backend server
            // Example: fetch('/api/contact', { method: 'POST', body: JSON.stringify({ name, email, message }) })
        } catch (error) {
            console.error('Error submitting form:', error);
            showFormMessage('An error occurred. Please try again later.', 'error');
        }
    });
}

function showFormMessage(message, type) {
    if (!formMessage) return;

    try {
        formMessage.textContent = message;
        formMessage.className = `form-message ${type}`;

        // Hide message after configured duration
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, CONFIG.ANIMATION.MESSAGE_DISPLAY_DURATION);
    } catch (error) {
        console.error('Error showing form message:', error);
    }
}

// ============================================
// Smooth Scroll with Offset for Fixed Navbar
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        try {
            const targetId = this.getAttribute('href');

            if (targetId === '#' || targetId === '#home') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);
                if (targetElement && navbar) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navbarHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        } catch (error) {
            console.error('Error in smooth scroll:', error);
        }
    });
});

// ============================================
// Initialization and Cleanup
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    try {
        initTypewriter();
        initNeuralNetwork();

        // Wait for anime.js to load, then initialize
        if (typeof anime !== 'undefined') {
            initAnimeAnimations();
        } else {
            // Fallback if anime.js doesn't load
            setTimeout(initAnimeAnimations, 100);
        }

        // Add loaded class for any page load animations
        setTimeout(() => {
            document.body.classList.add('loaded');
        }, 100);
    } catch (error) {
        console.error('Error during initialization:', error);
    }
});

// Reinitialize neural network on resize (debounced)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (neuralNetwork) {
            initNeuralNetwork();
        }
    }, CONFIG.ANIMATION.DEBOUNCE_DELAY);
});

// Cleanup on page unload to prevent memory leaks
window.addEventListener('beforeunload', () => {
    try {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
});
