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

// GitHub API Integration - Fetch Most Active Repo
async function fetchGitHubRepos() {
    const githubReposContainer = document.getElementById('githubRepos');

    try {
        const response = await fetch('https://api.github.com/users/rivka14/repos?sort=updated&per_page=10');

        if (!response.ok) {
            throw new Error('Failed to fetch repositories');
        }

        const repos = await response.json();

        // Filter out featured projects to avoid duplicates
        const featuredRepoNames = ['rag-agent', 'recipe-sharing', 'inventory-management', 'adk-drive-agent'];
        const filteredRepos = repos.filter(repo =>
            !featuredRepoNames.some(name => repo.name.toLowerCase().includes(name))
        );

        // Get only the most active (first one after filtering)
        displayGitHubRepos(filteredRepos.slice(0, 1));
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        githubReposContainer.innerHTML = `
            <p class="error-message" style="color: var(--text-secondary); text-align: center;">
                Unable to load repository. Please visit my
                <a href="https://github.com/rivka14" target="_blank" rel="noopener noreferrer"
                   style="color: var(--accent-primary);">GitHub profile</a>
                to view my work.
            </p>
        `;
    }
}

// Fetch Contributed Repositories - Using starred repos as proxy
async function fetchContributedRepos() {
    const contributedContainer = document.getElementById('contributedRepos');

    try {
        // Fetch starred repositories (good proxy for contributions/interests)
        const response = await fetch('https://api.github.com/users/rivka14/starred?per_page=6');

        if (!response.ok) {
            throw new Error('Failed to fetch starred repos');
        }

        const repos = await response.json();

        if (repos.length === 0) {
            contributedContainer.innerHTML = `
                <p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">
                    No starred repositories to display.
                </p>
            `;
            return;
        }

        displayContributedRepos(repos);

    } catch (error) {
        console.error('Error fetching contributed repos:', error);
        contributedContainer.innerHTML = `
            <p class="error-message" style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">
                Unable to load contributions. Visit my
                <a href="https://github.com/rivka14?tab=repositories" target="_blank" rel="noopener noreferrer"
                   style="color: var(--accent-primary);">GitHub profile</a>
                to see all my work.
            </p>
        `;
    }
}

function displayGitHubRepos(repos) {
    const githubReposContainer = document.getElementById('githubRepos');

    if (repos.length === 0) {
        githubReposContainer.innerHTML = `
            <p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">
                No additional repositories to display.
            </p>
        `;
        return;
    }

    githubReposContainer.innerHTML = repos.map(repo => `
        <div class="repo-card fade-in">
            <div class="repo-header">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">
                    ${repo.name}
                </a>
            </div>
            <p class="repo-description">
                ${repo.description || 'No description available'}
            </p>
            <div class="repo-footer">
                ${repo.language ? `
                    <span class="repo-language">
                        <span class="language-dot" style="background-color: ${getLanguageColor(repo.language)}"></span>
                        ${repo.language}
                    </span>
                ` : ''}
                <span class="repo-stars">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    ${repo.stargazers_count}
                </span>
            </div>
        </div>
    `).join('');

    // Re-observe new elements for fade-in animation
    document.querySelectorAll('.repo-card').forEach(el => {
        observer.observe(el);
    });
}

// Language color mapping
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'TypeScript': '#2b7489',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C#': '#178600',
        'HTML': '#e34c26',
        'CSS': '#563d7c',
        'React': '#61dafb',
        'Vue': '#42b883',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'Ruby': '#701516',
        'PHP': '#4F5D95',
        'Swift': '#ffac45',
        'Kotlin': '#F18E33'
    };

    return colors[language] || '#8b949e';
}

// Display Contributed Repositories
function displayContributedRepos(repos) {
    const contributedContainer = document.getElementById('contributedRepos');

    if (repos.length === 0) {
        contributedContainer.innerHTML = `
            <p style="color: var(--text-secondary); text-align: center; grid-column: 1 / -1;">
                No recent contributions to display.
            </p>
        `;
        return;
    }

    contributedContainer.innerHTML = repos.map(repo => `
        <div class="repo-card fade-in">
            <div class="repo-header">
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="repo-name">
                    ${repo.name}
                </a>
            </div>
            <p class="repo-description">
                ${repo.description || 'No description available'}
            </p>
            <div class="repo-footer">
                ${repo.language ? `
                    <span class="repo-language">
                        <span class="language-dot" style="background-color: ${getLanguageColor(repo.language)}"></span>
                        ${repo.language}
                    </span>
                ` : ''}
                <span class="repo-stars">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    ${repo.stargazers_count}
                </span>
                <span class="repo-owner">
                    by ${repo.owner.login}
                </span>
            </div>
        </div>
    `).join('');

    // Re-observe new elements for fade-in animation
    document.querySelectorAll('#contributedRepos .repo-card').forEach(el => {
        observer.observe(el);
    });
}

// Load GitHub repos and contributions when page loads
document.addEventListener('DOMContentLoaded', () => {
    initTypewriter();
    initParticles();
    fetchGitHubRepos();
    fetchContributedRepos();
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
