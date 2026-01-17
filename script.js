// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme preference or default to light
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Typewriter Animation
const typewriterElement = document.getElementById('typewriter');
const titles = ['Software Developer', 'AI Engineer'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentTitle = titles[titleIndex];

    if (isDeleting) {
        // Deleting characters
        typewriterElement.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        // Typing characters
        typewriterElement.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // Check if word is complete
    if (!isDeleting && charIndex === currentTitle.length) {
        // Pause at end of word
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        // Move to next word
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500;
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start typewriter animation when page loads
function initTypewriter() {
    if (typewriterElement) {
        setTimeout(typeWriter, 1000);
    }
}

// Animated Background Particles
function createParticle() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random size between 6px and 16px (larger particles)
    const size = Math.random() * 10 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random horizontal position
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.bottom = '0';

    // Random horizontal movement
    const xMovement = (Math.random() - 0.5) * 300;
    particle.style.setProperty('--x-movement', `${xMovement}px`);

    // Random animation duration between 3 and 6 seconds (faster)
    const duration = Math.random() * 3 + 3;
    particle.style.animation = `floatParticle ${duration}s linear`;

    particlesContainer.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Create particles at intervals
function initParticles() {
    // Create initial particles (reduced for performance)
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            createParticle();
        }, i * 150);
    }

    // Continue creating particles
    setInterval(() => {
        createParticle();
    }, 400);
}

// Particles will be initialized from main DOMContentLoaded listener

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active Navigation Link on Scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Load animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initParticles();
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Basic validation
    if (!name || !email || !message) {
        showFormMessage('Please fill in all fields', 'error');
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showFormMessage('Please enter a valid email address', 'error');
        return;
    }

    // Simulate form submission (since there's no backend)
    showFormMessage('Thank you for your message! I will get back to you soon.', 'success');
    contactForm.reset();

    // In a real application, you would send this data to a backend server
    console.log('Form submitted:', { name, email, message });
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.className = 'form-message';
    }, 5000);
}

// Smooth Scroll with Offset for Fixed Navbar
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        if (targetId === '#' || targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const heroBackground = document.querySelector('.hero-bg');
    if (heroBackground) {
        const scrolled = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add loading state animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Cursor Trail Effect (optional - subtle enhancement)
document.addEventListener('mousemove', (e) => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.left = e.pageX + 'px';
    trail.style.top = e.pageY + 'px';

    document.body.appendChild(trail);

    setTimeout(() => {
        trail.remove();
    }, 1000);
});

// Add subtle particle effect on buttons hover
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function(e) {
        const rect = this.getBoundingClientRect();

        for (let i = 0; i < 3; i++) {
            const particle = document.createElement('span');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'var(--accent-primary)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = (Math.random() * rect.width) + 'px';
            particle.style.top = (Math.random() * rect.height) + 'px';
            particle.style.opacity = '0';
            particle.style.transition = 'all 0.5s ease';

            this.style.position = 'relative';
            this.appendChild(particle);

            setTimeout(() => {
                particle.style.opacity = '1';
                particle.style.transform = `translateY(-20px)`;
            }, 10);

            setTimeout(() => {
                particle.remove();
            }, 500);
        }
    });
});

// Console Easter Egg
console.log('%c👋 Hi there, fellow developer!', 'color: #4361ee; font-size: 20px; font-weight: bold;');
console.log('%cLooking at the code? I like your style! 🚀', 'color: #667eea; font-size: 14px;');
console.log('%cFeel free to reach out: rivka.weiss9@gmail.com', 'color: #764ba2; font-size: 12px;');
