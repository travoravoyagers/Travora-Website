// DOM Elements
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navLinksArray = document.querySelectorAll('.nav-link');
const bookBtn = document.querySelector('.book-btn');
const contactForm = document.getElementById('contactForm');

// Mobile Menu Toggle
if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
}

// Close mobile menu when clicking on a link
navLinksArray.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
});

// Book Now Button
if (bookBtn) {
    bookBtn.addEventListener('click', () => {
        window.location.href = 'contact.html';
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.padding = '15px 0';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '20px 0';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    }
});

// Contact Form Submission
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        const newsletter = document.getElementById('newsletter').checked;
        
        // In a real application, you would send this data to a server
        console.log('Form submitted:', { 
            firstName, 
            lastName, 
            email, 
            phone, 
            subject, 
            message, 
            newsletter 
        });
        
        // Show success message
        alert('Thank you for your message! We will get back to you within 24 hours.');
        
        // Reset form
        contactForm.reset();
    });
}

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isActive = answer.classList.contains('active');
            
            // Close all answers
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('active');
                ans.previousElementSibling.classList.remove('active');
            });
            
            // Open current answer if it was closed
            if (!isActive) {
                answer.classList.add('active');
                question.classList.add('active');
            }
        });
    });
}

// Blog Categories Filter
const categoryBtns = document.querySelectorAll('.category-btn');
if (categoryBtns.length > 0) {
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            // In a real application, you would filter blog posts here
            console.log('Filtering by category:', btn.textContent);
        });
    });
}

// Newsletter Subscription
const newsletterForms = document.querySelectorAll('.newsletter-form');
newsletterForms.forEach(form => {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        if (email) {
            // In a real application, you would send this to a server
            console.log('Newsletter subscription:', email);
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
});

// Set active navigation link based on current page
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinksArray.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes(linkHref.replace('.html', '')))) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Travora Voyagers website loaded successfully!');
    setActiveNavLink();
    
    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.reason-card, .destination-card, .testimonial-card, .mission-card, .team-member, .blog-post, .faq-item').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });
});