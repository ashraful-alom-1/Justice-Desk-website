// Initialize everything when DOM is loaded
        document.addEventListener('DOMContentLoaded', function() {
            // Initialize AOS animation library
            AOS.init({
                duration: 800,
                easing: 'ease-in-out',
                once: true
            });
            
            // Create particle effect for hero section
            createParticles();
            
            // Initialize counter animations
            initCounters();
            
            // Set up navigation functionality
            setupNavigation();
            
            // Set up active page highlighting
            setupActiveNav();
            
            // Initialize FAQ accordion
            setupFAQ();
            
            // Initialize form submission
            setupForm();
            
            // Initialize GSAP animations
            initAnimations();
            
            // Add free consultation alert
            setupFreeConsultationAlert();

            // Initialize Practice Area "Learn More" toggle
            setupPracticeLearnMore();

            // ✅ Initialize Blog "Read More" toggle
            setupBlogReadMore();
        });

        // Create particles for background effect
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 30;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Random size between 5px and 25px
                const size = Math.random() * 20 + 5;
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                
                // Random position
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100 + 100}%`;
                
                // Random animation duration between 10s and 30s
                const duration = Math.random() * 20 + 10;
                particle.style.animationDuration = `${duration}s`;
                
                // Random delay up to 5s
                const delay = Math.random() * 5;
                particle.style.animationDelay = `${delay}s`;
                
                particlesContainer.appendChild(particle);
            }
        }

        // Initialize counter animations
        function initCounters() {
            const counters = [
                { element: document.getElementById('yearsCounter'), end: 25 },
                { element: document.getElementById('casesCounter'), end: 2500 },
                { element: document.getElementById('successCounter'), end: 98 }
            ];

            // Register GSAP ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Animate counters when they come into view
            counters.forEach(counter => {
                gsap.to(counter.element, {
                    scrollTrigger: {
                        trigger: counter.element,
                        start: 'top bottom',
                        toggleActions: 'play none none none',
                        once: true
                    },
                    onStart: () => animateCounter(counter.element, counter.end),
                    duration: 0.1
                });
            });
        }

        // Helper function for counter animation
        function animateCounter(element, end, duration = 2000) {
            let start = 0;
            const increment = end / (duration / 16); // 16ms per frame
            
            const timer = setInterval(() => {
                start += increment;
                if (start >= end) {
                    element.textContent = end + (element.id === 'successCounter' ? '%' : '+');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start) + (element.id === 'successCounter' ? '%' : '+');
                }
            }, 16);
        }

        // Set up navigation functionality
        function setupNavigation() {
            const header = document.querySelector('header');
            const hamburger = document.getElementById('hamburger');
            const navLinks = document.getElementById('nav-links');
            
            // Header scroll effect
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Mobile menu toggle
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                hamburger.innerHTML = navLinks.classList.contains('active') ? 
                    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
            });
            
            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
                });
            });
        }

        // Set up active navigation highlighting
        function setupActiveNav() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            const homeLink = document.querySelector('.nav-links a[href="#"]');
            const heroSection = document.querySelector('.hero');
            
            // Highlight on click
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    // Handle home link separately
                    if(this === homeLink) {
                        e.preventDefault();
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }
                    
                    // Update active state after scroll completes
                    setTimeout(() => {
                        updateActiveState();
                    }, 1000); // Adjust timing based on your scroll speed
                });
            });
            
            // Update active state based on scroll position
            function updateActiveState() {
                const scrollPosition = window.scrollY;
                const heroHeight = heroSection.offsetHeight;
                
                // Check if we're at the top (home section)
                if(scrollPosition < heroHeight * 0.5) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    homeLink.classList.add('active');
                    return;
                }
                
                // Check other sections
                let currentSection = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    
                    if (scrollPosition >= (sectionTop - 200) && 
                        scrollPosition < (sectionTop + sectionHeight - 200)) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${currentSection}`) {
                        link.classList.add('active');
                    }
                });
            }
            
            // Debounce function for performance
            function debounce(func, wait = 20) {
                let timeout;
                return function() {
                    clearTimeout(timeout);
                    timeout = setTimeout(func, wait);
                };
            }
            
            window.addEventListener('scroll', debounce(updateActiveState));
            window.addEventListener('load', updateActiveState);
        }

        // Set up FAQ accordion functionality
        function setupFAQ() {
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', () => {
                    item.classList.toggle('active');
                });
            });
        }

        // Set up form submission
        function setupForm() {
            const contactForm = document.getElementById('consultation-form');
            if (contactForm) {
                contactForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Form validation would go here in a real implementation
                    
                    // Simulate form submission
                    alert('Thank you for your message! Our team will contact you shortly.');
                    contactForm.reset();
                });
            }
        }

        // Initialize GSAP animations
        function initAnimations() {
            // Hero section animations
            gsap.from('.hero-title', {
                duration: 1,
                y: 50,
                opacity: 0,
                ease: 'power3.out'
            });

            gsap.from('.hero-subtitle', {
                duration: 1,
                y: 50,
                opacity: 0,
                delay: 0.3,
                ease: 'power3.out'
            });

            gsap.from('.hero-buttons', {
                duration: 1,
                y: 50,
                opacity: 0,
                delay: 0.6,
                ease: 'power3.out'
            });
        }

        // Set up free consultation alert
        function setupFreeConsultationAlert() {
            const freeConsultationBtn = document.querySelector('a[href="#free consultation"]');
            if (freeConsultationBtn) {
                freeConsultationBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert("Currently, free consultation is temporarily unavailable. You can share your problem through the mail (info@lawsonpartners.com) or phone call: +91 123456789");
                });
            }
        }

        // Set up Practice Area "Learn More" toggle
        function setupPracticeLearnMore() {
            const learnMoreButtons = document.querySelectorAll('.learn-more-btn');
            
            learnMoreButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    const card = this.closest('.practice-card');
                    const details = card.querySelector('.practice-details');
                    const isExpanded = details.classList.contains('active');
                    
                    // Close all other open details
                    document.querySelectorAll('.practice-details').forEach(item => {
                        if (item !== details) {
                            item.classList.remove('active');
                            const correspondingBtn = item.closest('.practice-card').querySelector('.learn-more-btn');
                            if (correspondingBtn) correspondingBtn.textContent = 'Learn More';
                        }
                    });
                    
                    // Toggle current details
                    if (isExpanded) {
                        details.classList.remove('active');
                        this.textContent = 'Learn More';
                    } else {
                        details.classList.add('active');
                        this.textContent = 'Show Less';
                        
                        // Scroll to show the expanded content if it's near the bottom of the viewport
                        const cardRect = card.getBoundingClientRect();
                        if (cardRect.bottom > window.innerHeight - 100) {
                            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }
                });
            });
        }

        // ✅ Set up Blog "Read More" toggle functionality - FIXED VERSION
        function setupBlogReadMore() {
            const readMoreButtons = document.querySelectorAll('.read-more-btn');

            readMoreButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    e.preventDefault();

                    const blogContent = this.closest('.blog-content');
                    const expandedContent = blogContent.querySelector('.blog-expanded');
                    const isExpanded = expandedContent.classList.contains('active');

                    // Optional: Close all other open blog expanded sections
                    document.querySelectorAll('.blog-expanded').forEach(item => {
                        if (item !== expandedContent) {
                            item.classList.remove('active');
                            const otherBtn = item.closest('.blog-content').querySelector('.read-more-btn');
                            if (otherBtn) otherBtn.textContent = 'Read More';
                        }
                    });

                    if (isExpanded) {
                        expandedContent.classList.remove('active');
                        this.textContent = 'Read More';
                    } else {
                        expandedContent.classList.add('active');
                        this.textContent = 'Read Less';

                        // Scroll into view if needed
                        const cardRect = blogContent.getBoundingClientRect();
                        if (cardRect.bottom > window.innerHeight - 50) {
                            blogContent.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                        }
                    }
                });
            });
        }

        // ============ Contact form submit (backend integration) ============
        (function setupContactForm() {
            const form = document.getElementById('consultation-form');
            if (!form) return;

            form.addEventListener('submit', async (e) => {
                e.preventDefault();

                const name = document.getElementById('name').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const practice = document.getElementById('practice').value;
                const message = document.getElementById('message').value.trim();

                if (!name || !email || !message) {
                    alert('Please fill name, email and message.');
                    return;
                }

                try {
                    const res = await fetch('http://localhost:5000/api/inquiry', { // local dev URL
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, phone, practice, message })
                    });

                    const data = await res.json();
                    if (res.ok && data.success) {
                        alert('Message sent successfully — thank you!');
                        form.reset();
                    } else {
                        alert('Error: ' + (data.error || 'Server error'));
                    }
                } catch (err) {
                    console.error('Network error', err);
                    alert('Network error — check console or try again later');
                }
            });
        })();
        // ============ End of contact form submit setup ============