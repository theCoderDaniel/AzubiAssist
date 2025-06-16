'use strict';

// Document loaded check
document.addEventListener('DOMContentLoaded', () => {
    // Prevent FOUC (Flash of Unstyled Content)
    document.documentElement.style.visibility = 'visible';
    
    // Initialize animations after layout is stable
    requestAnimationFrame(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });

        document.querySelectorAll('.feature-item, .testimonial-card, .timeline-item')
            .forEach(el => observer.observe(el));
    });

    initializeAnimations();
    initializeEmailForms();
    initializeFAQ();
    initializeSmoothScroll();
    observeElements();

    // Feature Items Animation
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                featureObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '50px'
    });

    document.querySelectorAll('.feature-item').forEach((item, index) => {
        // Add delay based on index
        item.style.transitionDelay = `${index * 0.1}s`;
        featureObserver.observe(item);
    });
});

// GSAP Animations
const initializeAnimations = () => {
    const animations = [
        { element: ".hero-text h1", y: 50, delay: 0.2 },
        { element: ".hero-text p", y: 30, delay: 0.4 },
        { element: ".cta-section", y: 30, delay: 0.6 },
        { element: ".phone-mockup", x: 50, delay: 0.8 }
    ];

    animations.forEach(({ element, y = 0, x = 0, delay }) => {
        gsap.from(element, {
            duration: 1,
            y,
            x,
            opacity: 0,
            delay,
            ease: "power2.out"
        });
    });
};

// Email Form Handler
const initializeEmailForms = () => {
    const handleSubmit = async (formId, inputId, messageId, countId) => {
        const form = document.getElementById(formId);
        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const input = document.getElementById(inputId);
            const message = document.getElementById(messageId);
            const counter = document.getElementById(countId);
            
            if (!input || !message || !counter) return;

            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 300));
                
                message.style.display = 'block';
                input.value = '';
                
                const count = parseInt(counter.textContent) + 1;
                document.querySelectorAll('.signup-counter').forEach(el => {
                    el.textContent = count;
                });
                
                setTimeout(() => {
                    message.style.display = 'none';
                }, 5000);
            } catch (error) {
                console.error('Error:', error);
            }
        });
    };

    handleSubmit('emailForm', 'emailInput', 'successMessage', 'signupCount');
    handleSubmit('emailFormFinal', 'emailInputFinal', 'successMessageFinal', 'finalSignupCount');
};

// FAQ Functionality
const initializeFAQ = () => {
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            if (!faqItem) return;

            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) item.classList.remove('active');
            });
            
            faqItem.classList.toggle('active');
        });
    });
};

// Smooth Scroll
const initializeSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;

            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
};

// Intersection Observer for animations
const observeElements = () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '50px' }
    );

    document.querySelectorAll('.feature-item, .testimonial-card, .timeline-item')
        .forEach(el => observer.observe(el));
};