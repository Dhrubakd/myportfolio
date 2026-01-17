document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0 && navLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 300) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Project filtering
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => {
                btn.classList.remove('bg-primary', 'text-white');
                btn.classList.add('border', 'border-gray-200');
            });
            
            this.classList.add('bg-primary', 'text-white');
            this.classList.remove('border', 'border-gray-200');
            
            // Filter projects
            const filter = this.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.getAttribute('data-width');
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = `${width}%`;
            }, 100);
        });
    }
    
    // Intersection Observer for skill bars animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelector('#skills').style.opacity = '1';
    observer.observe(document.querySelector('#skills'));

    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('opacity-0', 'invisible');
            backToTopButton.classList.add('opacity-100', 'visible');
        } else {
            backToTopButton.classList.remove('opacity-100', 'visible');
            backToTopButton.classList.add('opacity-0', 'invisible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulate form submission
            setTimeout(() => {
                contactForm.reset();
                formSuccess.classList.remove('hidden');
                
                setTimeout(() => {
                    formSuccess.classList.add('hidden');
                }, 5000);
            }, 1000);
        });
    }

    // Add animation classes when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-slide-up, .animate-fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial state for animated elements
    document.querySelectorAll('.animate-slide-up').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
    
    document.querySelectorAll('.animate-fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transition = 'opacity 0.6s ease-out';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});


// Dark mode toggle
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const html = document.documentElement;

    // Check if elements exist before adding event listeners
    if (!themeToggle || !mobileThemeToggle) {
        console.warn('Theme toggle elements not found');
        return;
    }

    // Check system preference
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    // Function to toggle theme
    function toggleTheme() {
        html.classList.toggle('dark');
        if (html.classList.contains('dark')) {
            localStorage.theme = 'dark';
        } else {
            localStorage.theme = 'light';
        }
    }

    // Toggle theme for desktop
    themeToggle.addEventListener('click', toggleTheme);

    // Toggle theme for mobile
    mobileThemeToggle.addEventListener('click', toggleTheme);
});

// Handle navigation active state
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

function setActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - sectionHeight/3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveLink);
setActiveLink();

// CV Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cvModal = document.getElementById('cv-modal');
    const closeModal = document.getElementById('close-modal');
    const cvButtons = document.querySelectorAll('[href*="CV.pdf"]');

    // Only proceed if modal elements exist
    if (!cvModal || !closeModal) {
        console.warn('CV modal elements not found. Skipping modal functionality.');
        return;
    }

    // Show modal when CV download is clicked
    cvButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            cvModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeModal.addEventListener('click', function() {
        cvModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    cvModal.addEventListener('click', function(e) {
        if (e.target === cvModal) {
            cvModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !cvModal.classList.contains('hidden')) {
            cvModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
});

// Track CV downloads
function trackDownload(version) {
    // You can add analytics tracking here
    console.log(`CV ${version} downloaded`);
}

// Initialize intersection observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.animate-slide-right, .animate-slide-left, .animate-fade-up'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});

// Typing animations
function initTypeAnimations() {
    // Check if TypeIt is available
    if (typeof TypeIt === 'undefined') {
        console.warn('TypeIt library not loaded. Skipping typing animations.');
        return;
    }

    // Check if elements exist
    const nameElement = document.getElementById("typing-name");
    const roleElement = document.getElementById("typing-role");
    const descElement = document.getElementById("typing-desc");

    // Name typing
    if (nameElement) {
        new TypeIt("#typing-name", {
            strings: "Dhruba Khadka",
            speed: 300,
            waitUntilVisible: true,
            loop: true,
            breakLines: false,
            deleteSpeed: 100,
            lifelike: true,
            nextStringDelay: 3000
        }).go();
    }

    // Role typing with multiple roles
    if (roleElement) {
        new TypeIt("#typing-role", {
            strings: ["Frontend Developer ", "UI/UX Designer ", "Web Developer "],
            speed: 300,
            waitUntilVisible: true,
            loop: true,
            breakLines: false,
            deleteSpeed: 100,
            lifelike: true,
            nextStringDelay: 3000
        }).go();
    }

    // Description typing
    if (descElement) {
        new TypeIt("#typing-desc", {
            strings: "I build exceptional digital experiences that are fast, accessible, and visually appealing. ",
            speed: 50,
            waitUntilVisible: true
        }).go();
    }
}

// Scroll animations
function initScrollAnimations() {
    const elements = document.querySelectorAll([
        '.scroll-fade-up',
        '.scroll-fade-right',
        '.scroll-fade-left',
        '.scroll-scale',
        '.scroll-rotate'
    ].join(','));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            } else {
                // Optional: reset animation when out of view
                // entry.target.classList.remove('scroll-visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px'
    });

    elements.forEach(el => observer.observe(el));
}

// Smooth scroll initialization
function initSmoothScroll() {
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
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    initTypeAnimations();
    initScrollAnimations();
    initSmoothScroll();
});




// Add to your script.js file to enhance the experience badge animation

// Animate experience badge on hover
document.addEventListener('DOMContentLoaded', function() {
    const experienceBadge = document.querySelector('.animate-pulse-slow');
    
    if (experienceBadge) {
        experienceBadge.addEventListener('mouseover', function() {
            this.classList.add('animate-bounce');
            setTimeout(() => {
                this.classList.remove('animate-bounce');
            }, 1000);
        });
    }
});


        // Set current year in footer
        const currentYearElement = document.getElementById('current-year');
        if (currentYearElement) {
            currentYearElement.textContent = new Date().getFullYear();
        }        // Number counter animation
        function setupCounters() {
            const counterElements = document.querySelectorAll('.counter');
            const speed = 200;

            const animateCounter = (counter) => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const inc = target / speed;

                const updateCount = () => {
                    if (count < target) {
                        count += inc;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 1);
                    } else {
                        counter.innerText = target;
                    }
                };

                updateCount();
            };

            // Create observer
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            // Observe all counter elements
            counterElements.forEach(counter => {
                observer.observe(counter);
            });
        }

        // Call the function on page load
        document.addEventListener('DOMContentLoaded', () => {
            setupCounters();

            // Add animation for timeline sections
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.2}s`;
            });
        });