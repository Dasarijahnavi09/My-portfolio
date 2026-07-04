// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.project-card, .about-text, .contact-info, .contact-form');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelector('input[placeholder="Subject"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! I\'ll get back to you soon.');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

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

// Initialize typing effect when page loads - disabled to preserve hero HTML structure
// document.addEventListener('DOMContentLoaded', () => { ... });

// Project grid: filter (projects page shows all cards)
document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('projects-grid');
    const toggleBtn = document.getElementById('projects-toggle-btn');
    const filterBtns = document.querySelectorAll('.project-filter-btn');

    if (!grid) return;

    const isFullProjectsPage = document.body.classList.contains('projects-page');
    let activeFilter = 'all';
    let expanded = isFullProjectsPage;

    const getCards = () => Array.from(grid.querySelectorAll('.project-card'));

    const getFilteredCards = () => {
        return getCards().filter(card => {
            if (activeFilter === 'all') return true;
            return card.dataset.category === activeFilter;
        });
    };

    const updateProjectVisibility = () => {
        const filtered = getFilteredCards();
        const allCards = getCards();

        allCards.forEach(card => card.classList.add('is-hidden'));

        filtered.forEach((card, index) => {
            if (expanded || index < 6) {
                card.classList.remove('is-hidden');
            }
        });

        if (toggleBtn) {
            const hasMore = filtered.length > 6;
            toggleBtn.style.display = hasMore ? 'inline-block' : 'none';
            toggleBtn.textContent = expanded ? 'Show Fewer Projects' : 'View All Projects';
            toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        }
    };

    if (isFullProjectsPage) {
        getCards().forEach(card => card.classList.remove('is-hidden'));
    } else {
        updateProjectVisibility();
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            activeFilter = btn.dataset.filter;

            filterBtns.forEach(b => {
                const isActive = b === btn;
                b.classList.toggle('is-active', isActive);
                b.setAttribute('aria-selected', isActive ? 'true' : 'false');
            });

            if (isFullProjectsPage) {
                getCards().forEach(card => {
                    const matches = activeFilter === 'all' || card.dataset.category === activeFilter;
                    card.classList.toggle('is-hidden', !matches);
                });
            } else {
                expanded = false;
                updateProjectVisibility();
            }
        });
    });

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            expanded = !expanded;
            updateProjectVisibility();

            if (!expanded) {
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }
});

// Scroll to top functionality
const scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '↑';
scrollToTopBtn.className = 'scroll-to-top';
scrollToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 8px;
    background: #2F3E4D;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
`;

document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.style.opacity = '1';
        scrollToTopBtn.style.visibility = 'visible';
    } else {
        scrollToTopBtn.style.opacity = '0';
        scrollToTopBtn.style.visibility = 'hidden';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Skill tags animation
document.querySelectorAll('.skill-tag').forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'translateY(20px)';
    tag.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    
    setTimeout(() => {
        tag.style.opacity = '1';
        tag.style.transform = 'translateY(0)';
    }, 1000 + (index * 100));
});

// Add click effect to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animated stat counters on scroll
function animateCounter(el, duration = 1400) {
    const target = parseInt(el.dataset.target, 10);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = `${prefix}${value}${suffix}`;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

function animateSkillPct(el, target, duration = 1400) {
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        el.textContent = `${value}%`;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
    const statsRow = document.querySelector('.stats-row');
    const skillsChart = document.querySelector('.skills-chart');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            if (entry.target.classList.contains('stats-row')) {
                entry.target.querySelectorAll('.stat-value').forEach(counter => {
                    if (counter.dataset.animated) return;
                    counter.dataset.animated = 'true';
                    animateCounter(counter);
                });
            }

            if (entry.target.classList.contains('skills-chart')) {
                if (entry.target.dataset.animated) return;
                entry.target.dataset.animated = 'true';
                entry.target.classList.add('is-animated');
                entry.target.querySelectorAll('.skill-bar-pct').forEach(pct => {
                    animateSkillPct(pct, parseInt(pct.dataset.level, 10));
                });
            }

            counterObserver.unobserve(entry.target);
        });
    }, { threshold: 0.35 });

    if (statsRow) counterObserver.observe(statsRow);
    if (skillsChart) counterObserver.observe(skillsChart);
});
