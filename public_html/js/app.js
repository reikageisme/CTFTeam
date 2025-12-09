/**
 * CTF Team Portfolio - JavaScript
 */

// Navigation Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Initialize language switcher
    initLanguageSwitcher();
    
    // Initialize animations
    initializeAnimations();

    // Initialize Scroll Spy
    initScrollSpy();
});

// Scroll Spy
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    // Only select anchor tags with hash links, excluding buttons or other elements
    const navLinks = document.querySelectorAll('.nav-menu a.nav-link[href^="#"]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -70% 0px', // Trigger when section is near top
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                
                // Remove active class from all navigation links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    
                    // Add active class to the matching link
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Language Switcher
function initLanguageSwitcher() {
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langIcon = document.getElementById('lang-icon');
    const langCode = document.getElementById('lang-code');
    const langOptions = document.querySelectorAll('.lang-option');
    
    if (!langToggle || !langDropdown) return;
    
    // Language flags mapping
    const langFlags = {
        'vi': { flag: '🇻🇳', code: 'VI', name: 'Tiếng Việt' },
        'en': { flag: '🇬🇧', code: 'EN', name: 'English' },
        'zh': { flag: '🇨🇳', code: 'ZH', name: '中文' },
        'ru': { flag: '🇷🇺', code: 'RU', name: 'Русский' }
    };
    
    // Get current language from storage or default to 'vi'
    const currentLang = StorageHelper.get('language') || 'vi';
    
    // Update button with current language
    if (langFlags[currentLang]) {
        langIcon.textContent = langFlags[currentLang].flag;
        langCode.textContent = langFlags[currentLang].code;
    }
    
    // Apply language on load
    updateLanguage(currentLang);
    
    // Toggle dropdown
    langToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        langDropdown.classList.toggle('hidden');
        langToggle.classList.toggle('active');
    });
    
    // Language option click
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang');
            
            // Update language display
            if (langFlags[selectedLang]) {
                langIcon.textContent = langFlags[selectedLang].flag;
                langCode.textContent = langFlags[selectedLang].code;
            }
            
            // Hide dropdown
            langDropdown.classList.add('hidden');
            langToggle.classList.remove('active');
            
            // Update all language-dependent elements
            updateLanguage(selectedLang);
            
            // Save preference
            StorageHelper.set('language', selectedLang);
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.add('hidden');
            langToggle.classList.remove('active');
        }
    });
    
    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !langDropdown.classList.contains('hidden')) {
            langDropdown.classList.add('hidden');
            langToggle.classList.remove('active');
        }
    });
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const cards = document.querySelectorAll('.skill-card, .achievement-card, .member-card, .event-item, .achievement-detail-card');
    cards.forEach(card => {
        if (card.style.opacity === '') {
            card.style.opacity = '0';
        }
        observer.observe(card);
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Navbar shadow on scroll
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
        if (navbar) {
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
        }
    } else {
        if (navbar) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        }
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Copy to clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!');
    }).catch(() => {
        console.error('Failed to copy');
    });
}

// Notification
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #00ff88, #00cc6f);
        color: #0a0e27;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Fetch JSON helper
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// Local Storage Helper
const StorageHelper = {
    set: function(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Storage error:', error);
        }
    },
    
    get: function(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Storage error:', error);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Storage error:', error);
        }
    }
};

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    // Escape to close menus
    if (event.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }
});

// Performance monitoring
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time: ' + pageLoadTime + 'ms');
    });
}

// Error tracking
window.addEventListener('error', function(event) {
    console.error('Error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// Update language for all elements
function updateLanguage(lang) {
    const elements = document.querySelectorAll('[data-lang-vi], [data-lang-en], [data-lang-zh], [data-lang-ru]');
    elements.forEach(el => {
        const text = el.getAttribute(`data-lang-${lang}`);
        if (text) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = text;
            } else {
                el.textContent = text;
            }
        }
    });

    // Update dynamic content from data.js
    if (typeof setTeamDataLanguage === 'function') {
        setTeamDataLanguage(lang);
    }
}
