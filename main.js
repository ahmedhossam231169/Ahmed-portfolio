// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Theme init
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeToggleLabel = document.getElementById('themeToggleLabel');
    function setToggleUI(isDark) {
        if (!themeToggleBtn) return;
        themeToggleBtn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        if (themeToggleLabel) themeToggleLabel.textContent = isDark ? 'Light' : 'Dark';
        if (themeToggleLabel && !themeToggleBtn.contains(themeToggleLabel)) {
            themeToggleBtn.appendChild(themeToggleLabel);
        }
    }
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        setTimeout(() => setToggleUI(true), 0);
    } else {
        setTimeout(() => setToggleUI(false), 0);
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    // Listen for scroll events
    window.addEventListener('scroll', updateActiveNavLink);

    // Intersection Observer for animations
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

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.experience-card, .tech-icon, .project, .project-mockup');
    animateElements.forEach(el => {
        observer.observe(el);
    });

    // Add hover effects to experience cards
    const experienceCards = document.querySelectorAll('.experience-card');
    experienceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click effects to tech icons
    const techIcons = document.querySelectorAll('.tech-icon');
    techIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'translateY(-5px) scale(1.1)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px) scale(1)';
            }, 200);
        });
    });

    // Add typing effect to hero title
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

    // Initialize typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero');
        const heroImage = document.querySelector('.profile-image');
        
        if (heroSection && heroImage) {
            const rate = scrolled * -0.5;
            heroImage.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animate elements on page load
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    });

    // Mobile menu functionality
    function createMobileMenu() {
        const header = document.querySelector('.header');
        const headerContainer = document.querySelector('.header .container');
        const nav = document.querySelector('.nav');
        
        // Remove existing mobile menu button if it exists
        const existingBtn = document.querySelector('.mobile-menu-btn');
        if (existingBtn) {
            existingBtn.remove();
        }
        
        // Create mobile menu button
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.setAttribute('aria-label', 'Toggle mobile menu');
        
        // Add mobile menu functionality
        mobileMenuBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            nav.classList.toggle('mobile-active');
            this.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (nav.classList.contains('mobile-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('mobile-active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                nav.classList.remove('mobile-active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            }
        });
        
        // Add mobile menu button inside header container for proper layout
        ;(headerContainer || header).appendChild(mobileMenuBtn);
    }

    // Initialize mobile menu for small screens
    if (window.innerWidth <= 768) {
        createMobileMenu();
    }

    // Handle window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            if (!document.querySelector('.mobile-menu-btn')) {
                createMobileMenu();
            }
        } else {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            if (mobileMenuBtn) {
                mobileMenuBtn.remove();
            }
            document.querySelector('.nav').classList.remove('mobile-active');
        }
    });

    // Add smooth reveal animation for sections
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.section-title, .project-title, .contact-text');
        
        reveals.forEach(reveal => {
            const windowHeight = window.innerHeight;
            const elementTop = reveal.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('reveal');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);

    // Add particle effect to hero section (optional)
    function createParticles() {
        const hero = document.querySelector('.hero');
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 2) + 's';
            particleContainer.appendChild(particle);
        }
        
        hero.appendChild(particleContainer);
    }

    // Initialize particles
    createParticles();

    // Theme toggle
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function(e) {
            e.preventDefault();
            body.classList.toggle('dark');
            const isDark = body.classList.contains('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            setToggleUI(isDark);

            // Refresh particle colors by recreating container
            const old = document.querySelector('.particles');
            if (old) old.remove();
            createParticles();
        });
    }

    // Scroll to Top Button functionality
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    // Show/hide scroll to top button based on scroll position
    function toggleScrollToTopButton() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Listen for scroll events to show/hide button
    window.addEventListener('scroll', toggleScrollToTopButton);
});

// Add CSS for animations via JavaScript
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: slideInUp 0.6s ease-out forwards;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .reveal {
        animation: reveal 0.8s ease-out forwards;
    }
    
    @keyframes reveal {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .nav-link.active {
        color: #8b5cf6;
    }
    
    .nav-link.active::after {
        width: 100%;
    }
    
    
    .particles {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
    }
    
    .particle {
        position: absolute;
        width: 2px;
        height: 2px;
        background: rgba(139, 92, 246, 0.35);
        border-radius: 50%;
        animation: float linear infinite;
    }
    
    @keyframes float {
        0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .hero-text > * {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    body.loaded .hero-text > * {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);
