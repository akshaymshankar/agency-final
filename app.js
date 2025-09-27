// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initCTAButtons();
    initScrollEffects();
    initAccessibility();
    initMobileMenu();
    
    console.log('Metro Media House website loaded successfully');
});

// Navigation Functionality - FIXED to show alerts
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const href = this.getAttribute('href');
            
            // Show placeholder alerts as required
            if (href === '#about') {
                alert('About section - Learn more about Metro Media House and our mission to help entrepreneurs build profitable personal brands.');
            } else if (href === '#services') {
                alert('Services section - Discover our comprehensive content strategy, video production, and brand building services.');
            } else if (href === '#testimonials') {
                alert('Testimonials section - See what our successful clients say about their results with Metro Media House.');
            }
        });
    });
    
    // Logo click handler
    const logo = document.querySelector('.nav-logo');
    logo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// CTA Button Functionality - FIXED to show alerts
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.nav-cta, .hero-cta');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Show booking alert immediately
            alert('🎉 Thank you for your interest in Metro Media House!\n\nWe\'re excited to help you build a profitable personal brand through short-form content.\n\nWhat happens next:\n✅ Our team will contact you within 24 hours\n✅ We\'ll schedule your free discovery call\n✅ We\'ll discuss your brand goals and current challenges\n✅ You\'ll get a custom strategy preview\n\nGet ready to transform your expertise into influence and leads!\n\n📞 Expected call duration: 30-45 minutes\n🎯 No sales pressure, just valuable insights\n💡 Leave with actionable next steps\n\nWe look forward to speaking with you soon!');
            
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
        
        // Add hover effects
        button.addEventListener('mouseenter', function() {
            if (this.classList.contains('hero-cta')) {
                this.style.transform = 'translateY(-2px)';
            } else {
                this.style.transform = 'translateY(-1px)';
            }
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Force alert functionality with event delegation as backup
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.classList.contains('nav-cta') || e.target.classList.contains('hero-cta'))) {
            e.preventDefault();
            e.stopPropagation();
            
            alert('🎉 Thank you for your interest in Metro Media House!\n\nWe\'re excited to help you build a profitable personal brand through short-form content.\n\nWhat happens next:\n✅ Our team will contact you within 24 hours\n✅ We\'ll schedule your free discovery call\n✅ We\'ll discuss your brand goals and current challenges\n✅ You\'ll get a custom strategy preview\n\nGet ready to transform your expertise into influence and leads!');
            
            return false;
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class for navbar styling
        if (currentScrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll (optional enhancement)
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Accessibility Features
function initAccessibility() {
    // Make buttons keyboard accessible
    const buttons = document.querySelectorAll('.btn, .nav-link');
    
    buttons.forEach(button => {
        button.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });
    
    // Add focus indicators
    const focusableElements = document.querySelectorAll('button, a, [tabindex]');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.setAttribute('data-focus', 'true');
        });
        
        element.addEventListener('blur', function() {
            this.removeAttribute('data-focus');
        });
    });
    
    // Skip to main content link (for screen readers)
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-primary);
        color: white;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 1001;
        transition: top 0.3s ease;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main landmark
    const hero = document.querySelector('.hero');
    if (hero && !hero.id) {
        hero.id = 'main';
        hero.setAttribute('role', 'main');
    }
}

// Mobile Menu Functionality
function initMobileMenu() {
    // Create mobile menu toggle button
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        const mobileToggle = document.createElement('button');
        mobileToggle.className = 'mobile-menu-toggle';
        mobileToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        mobileToggle.setAttribute('aria-label', 'Toggle mobile menu');
        mobileToggle.setAttribute('aria-expanded', 'false');
        
        const navContainer = document.querySelector('.nav-container');
        navContainer.appendChild(mobileToggle);
        
        mobileToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('mobile-open');
        });
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        if (window.innerWidth > 768 && mobileToggle) {
            mobileToggle.remove();
            navMenu.classList.remove('mobile-open');
        }
    });
}

// Animation Effects
function initAnimationEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe hero elements
    const heroElements = document.querySelectorAll('.hero-headline, .hero-subtitle, .cta-container');
    heroElements.forEach(element => {
        observer.observe(element);
    });
}

// Performance Optimization
function optimizePerformance() {
    // Lazy load images (if any are added later)
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Initialize additional features when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initAnimationEffects();
    optimizePerformance();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        console.log('Page hidden - pausing non-essential processes');
    } else {
        console.log('Page visible - resuming processes');
    }
});

// Analytics tracking (placeholder for future implementation)
function trackEvent(eventName, eventData = {}) {
    console.log('Analytics event:', eventName, eventData);
}

// Track CTA button clicks for analytics
document.addEventListener('click', function(e) {
    if (e.target.matches('.nav-cta, .hero-cta')) {
        trackEvent('cta_click', {
            button_type: e.target.classList.contains('nav-cta') ? 'navigation' : 'hero',
            button_text: e.target.textContent.trim()
        });
    }
});

// Additional event handlers for keyboard accessibility
document.addEventListener('keydown', function(e) {
    if ((e.key === 'Enter' || e.key === ' ') && (e.target.classList.contains('nav-cta') || e.target.classList.contains('hero-cta'))) {
        e.preventDefault();
        e.stopPropagation();
        
        alert('🎉 Thank you for your interest in Metro Media House!\n\nWe\'re excited to help you build a profitable personal brand through short-form content.\n\nWhat happens next:\n✅ Our team will contact you within 24 hours\n✅ We\'ll schedule your free discovery call\n✅ We\'ll discuss your brand goals and current challenges\n✅ You\'ll get a custom strategy preview\n\nGet ready to transform your expertise into influence and leads!');
        
        return false;
    }
});

console.log('Metro Media House JavaScript fully loaded and initialized with working alerts');
