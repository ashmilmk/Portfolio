/* ============================================
   ONE-PAGE PORTFOLIO - JAVASCRIPT
   Minimal JS for Theme Toggle & Active Link Detection
   ============================================ */

   (function() {
    'use strict';

    // ============================================
    // THEME TOGGLE FUNCTIONALITY
    // ============================================
    
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;
    
    // Get saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }

    // ============================================
    // MOBILE MENU TOGGLE & NAVIGATION
    // ============================================
    
    const mainContainer = document.getElementById('mainContainer');
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            const isActive = navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isActive);
        });
        
        // Close menu when clicking on a link
        navItems.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
    
    // Navbar scroll effect
    if (mainContainer && navbar) {
        mainContainer.addEventListener('scroll', function() {
            if (mainContainer.scrollTop > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ============================================
    // ACTIVE NAVIGATION LINK DETECTION
    // ============================================
    
    // Function to update active nav item
    function updateActiveNav() {
        const scrollPosition = mainContainer.scrollTop + (mainContainer.clientHeight / 2);
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                // Remove active class from all nav items
                navItems.forEach(item => {
                    item.classList.remove('active');
                    item.setAttribute('aria-current', 'false');
                });
                
                // Add active class to corresponding nav item
                const activeNavItem = document.querySelector(`[data-section="${sectionId}"]`);
                if (activeNavItem) {
                    activeNavItem.classList.add('active');
                    activeNavItem.setAttribute('aria-current', 'page');
                }
            }
        });
    }
    
    // Update active nav on scroll
    if (mainContainer) {
        mainContainer.addEventListener('scroll', updateActiveNav);
        // Initial check
        updateActiveNav();
    }

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    
    navItems.forEach(navItem => {
        navItem.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection && mainContainer) {
                // Calculate scroll position accounting for container offset
                const scrollPosition = targetSection.offsetTop;
                
                mainContainer.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // CONTACT FORM VALIDATION
    // ============================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form fields
            const firstName = document.getElementById('firstName');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            // Basic validation
            let isValid = true;
            const errors = [];
            
            if (!firstName.value.trim()) {
                isValid = false;
                errors.push('First name is required');
                firstName.style.borderColor = '#e74c3c';
            } else {
                firstName.style.borderColor = '';
            }
            
            if (!email.value.trim() || !isValidEmail(email.value)) {
                isValid = false;
                errors.push('Valid email is required');
                email.style.borderColor = '#e74c3c';
            } else {
                email.style.borderColor = '';
            }
            
            if (!message.value.trim()) {
                isValid = false;
                errors.push('Message is required');
                message.style.borderColor = '#e74c3c';
            } else {
                message.style.borderColor = '';
            }
            
            if (isValid) {
                // Send form data to backend
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

                fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        alert('Thank you for your message! I will get back to you soon.');
                        contactForm.reset();
                    } else {
                        alert('Error: ' + result.error);
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to send message. Please try again later.');
                });
            } else {
                alert('Please fill in all required fields correctly.\n\n' + errors.join('\n'));
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // ============================================
    // KEYBOARD NAVIGATION SUPPORT
    // ============================================
    
    // Allow keyboard navigation for theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    }
    
    // Keyboard navigation for nav items
    navItems.forEach(navItem => {
        navItem.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
    });

    // ============================================
    // ACCESSIBILITY: FOCUS MANAGEMENT
    // ============================================
    
    // Ensure focus is visible for keyboard users
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

})();