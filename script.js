document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       THEME TOGGLER (DARK / LIGHT MODE)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlElement = document.documentElement;

    // Retrieve active theme from local storage or set default to 'dark'
    const currentTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        const activeTheme = htmlElement.getAttribute('data-theme');
        const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.className = 'fa-solid fa-sun'; // Sun icon for light mode option
        } else {
            themeIcon.className = 'fa-solid fa-moon'; // Moon icon for dark mode option
        }
    }

    /* ==========================================================================
       MOBILE NAVIGATION HAMBURGER MENU
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    mobileToggle.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when a navigation item is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       STICKY HEADER WITH ACTIVE SCROLL STATES
       ========================================================================== */
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Sticky Header shrink
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active nav state based on scroll coordinates
        let currentActiveSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentActiveSectionId = section.getAttribute('id');
            }
        });

        if (currentActiveSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentActiveSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    /* ==========================================================================
       CURSOR GLOW POSITION TRACKER
       ========================================================================== */
    const cursorGlow = document.getElementById('cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        // Center the glow at mouse pointer coordinates
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    /* ==========================================================================
       HERO TEXT TYPING ANIMATION EFFECT
       ========================================================================== */
    const typingTextContainer = document.getElementById('typing-text');
    const titlesArray = [
        "iOS Application Developer", 
        "Machine Learning Enthusiast", 
        "Computer Science Graduate",
        "Creative Problem Solver"
    ];
    
    let activeTitleIndex = 0;
    let characterIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function handleTypingLoop() {
        const fullText = titlesArray[activeTitleIndex];
        
        if (isDeleting) {
            // Remove letters
            typingTextContainer.textContent = fullText.substring(0, characterIndex - 1);
            characterIndex--;
            typingSpeed = 50; // Deletes faster
        } else {
            // Add letters
            typingTextContainer.textContent = fullText.substring(0, characterIndex + 1);
            characterIndex++;
            typingSpeed = 100; // Normal typing speed
        }

        // State changes
        if (!isDeleting && characterIndex === fullText.length) {
            // Hold title before deleting
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && characterIndex === 0) {
            isDeleting = false;
            activeTitleIndex = (activeTitleIndex + 1) % titlesArray.length;
            typingSpeed = 500; // Pause before writing next title
        }

        setTimeout(handleTypingLoop, typingSpeed);
    }

    if (typingTextContainer) {
        handleTypingLoop();
    }

    /* ==========================================================================
       PORTFOLIO PROJECTS FILTERING FUNCTION
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.getElementById('projects-grid');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active classes from other buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // Quick fade transition container-wide
            projectsGrid.style.opacity = '0.3';

            setTimeout(() => {
                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
                
                projectsGrid.style.opacity = '1';
            }, 250);
        });
    });

    /* ==========================================================================
       SCROLL REVEAL & SKILLS PROGRESS ANIMATIONS
       ========================================================================== */
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    const skillProgressBars = document.querySelectorAll('.skill-bar-progress');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If it is the skills container or card, trigger progress bar loads
                if (entry.target.classList.contains('skills-category-card')) {
                    const bars = entry.target.querySelectorAll('.skill-bar-progress');
                    bars.forEach(bar => {
                        const widthValue = bar.style.width; // Read pre-defined percentage
                        bar.style.width = '0%'; // Reset to zero initially
                        setTimeout(() => {
                            bar.style.width = widthValue; // Trigger transition animate
                        }, 50);
                    });
                }
                
                // Stop observing this element once activated
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });

    /* ==========================================================================
       BACK TO TOP BUTTON
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    /* ==========================================================================
       CONTACT FORM SUBMISSION WITH MODAL FEEDBACK
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('form-submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    const successModal = document.getElementById('success-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.classList.add('hidden');
        btnSpinner.classList.remove('hidden');

        // Simple validation check
        const nameInput = document.getElementById('form-name').value.trim();
        const emailInput = document.getElementById('form-email').value.trim();
        const subjectInput = document.getElementById('form-subject').value.trim();
        const messageInput = document.getElementById('form-message').value.trim();

        if (!nameInput || !emailInput || !subjectInput || !messageInput) {
            alert('Please fill out all required fields.');
            resetFormBtn();
            return;
        }

        // Mocking API delay for sending email
        setTimeout(() => {
            // Show Success Modal
            successModal.classList.add('active');
            
            // Reset Form Fields
            contactForm.reset();
            resetFormBtn();
        }, 1500);
    });

    function resetFormBtn() {
        submitBtn.disabled = false;
        btnText.classList.remove('hidden');
        btnSpinner.classList.add('hidden');
    }

    // Modal Close behavior
    modalCloseBtn.addEventListener('click', () => {
        successModal.classList.remove('active');
    });

    // Close modal if user clicks backdrop
    successModal.addEventListener('click', (e) => {
        if (e.target === successModal) {
            successModal.classList.remove('active');
        }
    });
});
