// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Show loader initially and hide it after content loads
    const loader = document.querySelector('.loader');

    // Initialize text scramble for loader
    initializeTextScramble();

    // Hide loader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });

    // Initialize particles.js
    initializeParticles();

    // Initialize typed.js for typewriter effect
    initializeTyped();

    // Navigation functionality
    initializeNavigation();

    // Custom cursor
    initializeCustomCursor();

    // Stats counter animation
    initializeStatsCounter();

    // Skill bar animation
    initializeSkillBars();

    // Project filtering
    initializeProjectFilters();

    // Contact form
    initializeContactForm();

    // Scroll to top button
    initializeScrollToTop();
});

// Initialize text scramble for loader
function initializeTextScramble() {
    const scrambleTextElement = document.getElementById('scramble-text');
    if (!scrambleTextElement) return;

    const originalText = scrambleTextElement.textContent;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}[]|;:,.<>?';
    let frame = 0;
    const totalFrames = 20; // Adjust for scramble duration
    const scrambleDuration = 1000; // Total time for the scramble effect in milliseconds
    const scrambleInterval = 50; // How often to update the scrambled text in milliseconds

    const scramble = () => {
        let scrambled = '';
        for (let i = 0; i < originalText.length; i++) {
            if (i < frame / 2) {
                scrambled += originalText[i];
            } else {
                scrambled += characters.charAt(Math.floor(Math.random() * characters.length));
            }
        }
        scrambleTextElement.textContent = scrambled;

        if (frame < totalFrames) {
            frame++;
            setTimeout(scramble, scrambleInterval);
        } else {
            scrambleTextElement.textContent = originalText; // Ensure it settles on the original
        }
    };

    scramble();
}

// Initialize particles.js
function initializeParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: '#6c63ff'
            },
            shape: {
                type: 'circle',
                stroke: {
                    width: 0,
                    color: '#000000'
                },
                polygon: {
                    nb_sides: 5
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#6c63ff',
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: 'none',
                random: false,
                straight: false,
                out_mode: 'out',
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: {
                    enable: true,
                    mode: 'bubble'
                },
                onclick: {
                    enable: true,
                    mode: 'push'
                },
                resize: true
            },
            modes: {
                bubble: {
                    // Increased distance for more intricate connections
                    distance: 250, // <-- Changed from 140 to 250
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// Initialize typed.js
function initializeTyped() {
    const typeElement = document.getElementById('type-element');
    if (typeElement) {
        new Typed('#type-element', {
            // Replaced emojis with Font Awesome <i> tags
            strings: ['Creative Web Designs <i class="fas fa-globe"></i>', 'Games <i class="fas fa-gamepad"></i>', 'Apps <i class="fas fa-mobile-alt"></i>'],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 1500,
            startDelay: 1000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Initialize navigation
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    // Sticky navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');

        // Animate menu bars
        const bars = menuToggle.querySelectorAll('.bar');
        if (menuToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'rotate(0) translate(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0)';
        }
    });

    // Close mobile menu when clicking on a nav link
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');

            // Reset menu bars
            const bars = menuToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0)';
        });
    });

    // Smooth scroll for navigation links
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        });
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
}

// Initialize custom cursor
function initializeCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';

        setTimeout(() => {
            follower.style.left = e.clientX + 'px';
            follower.style.top = e.clientY + 'px';
        }, 100);
    });

    // Change cursor style on hover over links and buttons
    const hoverElements = document.querySelectorAll('a, button, .project-item');

    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
            follower.style.border = '1px solid var(--primary-color)';
            follower.style.backgroundColor = 'rgba(108, 99, 255, 0.1)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.transform = 'translate(-50%, -50%) scale(1)';
            follower.style.border = '2px solid var(--primary-color)';
            follower.style.backgroundColor = 'transparent';
        });
    });
}

// Initialize stats counter
function initializeStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const countTo = parseInt(target.getAttribute('data-count'));
                let count = 0;
                const increment = countTo / 40; // Adjust for speed

                const updateCount = () => {
                    if (count < countTo) {
                        count += increment;
                        target.textContent = Math.ceil(count);
                        setTimeout(updateCount, 30);
                    } else {
                        target.textContent = countTo;
                    }
                };

                updateCount();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => {
        observer.observe(stat);
    });
}

// Initialize skill bars
function initializeSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const percent = bar.getAttribute('data-percent') + '%';
                bar.style.width = percent;
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Initialize project filters
function initializeProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            button.classList.add('active');

            // Get filter value
            const filterValue = button.getAttribute('data-filter');

            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.classList.remove('hide');
                    setTimeout(() => {
                        item.classList.add('show');
                    }, 0);
                } else {
                    item.classList.remove('show');
                    item.classList.add('hide');
                }
            });
        });
    });
}

// Initialize contact form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Basic form validation
            if (name.trim() === '' || email.trim() === '' || subject.trim() === '' || message.trim() === '') {
                alert('Please fill in all fields');
                return;
            }

            // Simulate form submission
            // In a real application, you would send this data to a server
            alert(`Thank you for your message, ${name}! I'll get back to you soon.`);

            // Reset form
            contactForm.reset();
        });
    }
}

// Initialize scroll to top button
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollToTopBtn.classList.add('active');
        } else {
            scrollToTopBtn.classList.remove('active');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}