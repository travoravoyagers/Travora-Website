// ==================== GLOBAL INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Travora Voyagers Website Loaded');
    

    initNavigation();
    initCarousels();
    initTestimonialSlider();
    initFAQAccordion();
    initForms();
    initBlogFilter();
    initSmoothScrolling();
    
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== NAVIGATION ====================
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (!menuToggle || !navLinks) return;
    
    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = menuToggle.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });
    
    // navigation link
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ==================== CAROUSEL SYSTEM ====================
function initCarousels() {
    const carousels = document.querySelectorAll('.carousel-container');
    
    if (carousels.length === 0) {
        console.log('No carousels found');
        return;
    }
    
    console.log(`Found ${carousels.length} carousel(s)`);
    
    carousels.forEach((carousel, index) => {
        console.log(`Initializing carousel ${index + 1}`);
        new Carousel(carousel);
    });
}

class Carousel {
    constructor(carouselElement) {
        this.element = carouselElement;
        this.track = carouselElement.querySelector('.carousel-track');
        this.slides = Array.from(carouselElement.querySelectorAll('.carousel-slide'));
        this.dots = Array.from(carouselElement.querySelectorAll('.dot'));
        this.prevBtn = carouselElement.querySelector('.prev-btn');
        this.nextBtn = carouselElement.querySelector('.next-btn');
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoSlideInterval = null;
        this.isTransitioning = false;
        
        console.log(`Carousel initialized with ${this.totalSlides} slides`);
        
        this.init();
    }
    
    init() {
        // Set initial state
        this.updateCarousel();
        
        // Button event listeners
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => {
                console.log('Previous button clicked');
                this.prevSlide();
            });
        }
        
        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => {
                console.log('Next button clicked');
                this.nextSlide();
            });
        }
        
        // Dot event listeners
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                console.log(`Dot ${index} clicked`);
                this.goToSlide(index);
            });
        });
        
        // Auto slide
        this.startAutoSlide();
        
        // Pause on hover
        this.element.addEventListener('mouseenter', () => {
            this.stopAutoSlide();
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.startAutoSlide();
        });
    }
    
    updateCarousel() {
        // Update track position
        const translateX = -this.currentSlide * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update active slide
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });
        
        // Update dots
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
        
        console.log(`Carousel updated to slide ${this.currentSlide + 1}/${this.totalSlides}`);
    }
    
    nextSlide() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    prevSlide() {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    goToSlide(index) {
        if (this.isTransitioning || index === this.currentSlide) return;
        
        this.isTransitioning = true;
        this.currentSlide = index;
        this.updateCarousel();
        
        setTimeout(() => {
            this.isTransitioning = false;
        }, 600);
    }
    
    startAutoSlide() {
        if (this.autoSlideInterval) return;
        
        this.autoSlideInterval = setInterval(() => {
            this.nextSlide();
        }, 5000); // Change slide every 5 seconds
        
        console.log('Auto slide started');
    }
    
    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
            this.autoSlideInterval = null;
            console.log('Auto slide stopped');
        }
    }
}

// ==================== TESTIMONIAL SLIDER ====================
function initTestimonialSlider() {
    const slider = document.querySelector('.testimonials-slider');
    if (!slider) return;
    
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = slider.querySelectorAll('.testimonial-dot');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    let interval = null;
    
    // Set initial slide
    updateTestimonialSlider();
    
    // Add click events to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateTestimonialSlider();
            resetAutoSlide();
        });
    });
    
    function updateTestimonialSlider() {
        // Hide all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Show current slide
        slides[currentSlide].classList.add('active');
        
        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateTestimonialSlider();
    }
    
    function startAutoSlide() {
        interval = setInterval(nextSlide, 6000);
    }
    
    function resetAutoSlide() {
        if (interval) {
            clearInterval(interval);
            startAutoSlide();
        }
    }
    
    // Start auto slide
    startAutoSlide();
}

// ==================== FAQ ACCORDION ====================
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            toggleFAQ(item);
        });
    });
    
    // Open first FAQ by default
    faqItems[0].classList.add('active');
    
    function toggleFAQ(item) {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faq => faq.classList.remove('active'));
        
        // Open current item if it was closed
        if (!isActive) {
            item.classList.add('active');
        }
    }
}

// ==================== FORM HANDLER ====================
function initForms() {
    const forms = document.querySelectorAll('form');
    if (forms.length === 0) return;
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleSubmit(form);
        });
    });
    
    function handleSubmit(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#dc3545';
            } else {
                input.style.borderColor = '';
            }
            
            // Email validation
            if (input.type === 'email' && input.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(input.value)) {
                    isValid = false;
                    input.style.borderColor = '#dc3545';
                }
            }
        });
        
        if (isValid) {
            // Show success message
            alert('Thank you! Your message has been sent successfully.');
            form.reset();
        } else {
            alert('Please fill in all required fields correctly.');
        }
    }
}

// ==================== BLOG FILTER ====================
function initBlogFilter() {
    const categoryBtns = document.querySelectorAll('.category-btn');
    if (categoryBtns.length === 0) return;
    
    const blogCards = document.querySelectorAll('.blog-card');
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.textContent.toLowerCase();
            filterBlogs(category);
            updateActiveButton(btn);
        });
    });
    
    function filterBlogs(category) {
        blogCards.forEach(card => {
            const cardCategory = card.querySelector('.blog-category')?.textContent.toLowerCase() || '';
            
            if (category === 'all stories' || cardCategory === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }
    
    function updateActiveButton(activeBtn) {
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }
}

// ==================== SMOOTH SCROLLING ====================
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}


// TEAM
// Team Carousel Functionality
const teamMembers = [
    { 
        name: "Sarah Johnson", 
        role: "Founder & CEO",
        desc: "20+ years in luxury travel and destination management."
    },
    { 
        name: "Michael Chen", 
        role: "Director of Operations",
        desc: "Expertise in Asian and Pacific destinations."
    },
    { 
        name: "Emily Rodriguez", 
        role: "Adventure Specialist",
        desc: "Certifications in mountain guiding and wilderness safety."
    },
    { 
        name: "James Wilson", 
        role: "Luxury Travel Consultant",
        desc: "Specializing in exclusive retreats and VIP experiences."
    },
    { 
        name: "David Miller", 
        role: "Customer Experience Head",
        desc: "15 years ensuring seamless travel journeys for clients."
    }
];

const teamCards = document.querySelectorAll(".team-card");
const teamDots = document.querySelectorAll(".team-dot");
const teamName = document.querySelector(".team-name");
const teamPosition = document.querySelector(".team-position");
const teamDesc = document.querySelector(".team-desc");
const leftBtn = document.querySelector(".team-left");
const rightBtn = document.querySelector(".team-right");

let teamIndex = 0;
let teamAnimating = false;

function updateTeamCarousel(newIndex) {
    if (teamAnimating) return;
    teamAnimating = true;
    
    teamIndex = (newIndex + teamCards.length) % teamCards.length;
    
    // Update cards positions
    teamCards.forEach((card, i) => {
        const offset = (i - teamIndex + teamCards.length) % teamCards.length;
        card.classList.remove("center", "left-1", "left-2", "right-1", "right-2", "hidden");
        
        if (offset === 0) {
            card.classList.add("center");
        } else if (offset === 1) {
            card.classList.add("right-1");
        } else if (offset === 2) {
            card.classList.add("right-2");
        } else if (offset === teamCards.length - 1) {
            card.classList.add("left-1");
        } else if (offset === teamCards.length - 2) {
            card.classList.add("left-2");
        } else {
            card.classList.add("hidden");
        }
    });
    
    // Update dots
    teamDots.forEach((dot, i) => {
        dot.classList.toggle("active", i === teamIndex);
    });
    
    // Update info with fade effect
    teamName.style.opacity = "0";
    teamPosition.style.opacity = "0";
    teamDesc.style.opacity = "0";
    
    setTimeout(() => {
        teamName.textContent = teamMembers[teamIndex].name;
        teamPosition.textContent = teamMembers[teamIndex].role;
        teamDesc.textContent = teamMembers[teamIndex].desc;
        teamName.style.opacity = "1";
        teamPosition.style.opacity = "1";
        teamDesc.style.opacity = "1";
    }, 300);
    
    setTimeout(() => {
        teamAnimating = false;
    }, 800);
}

// Event Listeners
leftBtn.addEventListener("click", () => updateTeamCarousel(teamIndex - 1));
rightBtn.addEventListener("click", () => updateTeamCarousel(teamIndex + 1));

teamDots.forEach((dot, i) => {
    dot.addEventListener("click", () => updateTeamCarousel(i));
});

teamCards.forEach((card, i) => {
    card.addEventListener("click", () => {
        if (i !== teamIndex) {
            updateTeamCarousel(i);
        }
    });
});

// Keyboard Navigation
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") updateTeamCarousel(teamIndex - 1);
    else if (e.key === "ArrowRight") updateTeamCarousel(teamIndex + 1);
});

// Touch Swipe Support
let touchStartX = 0;
let touchEndX = 0;

document.querySelector('.team-carousel').addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

document.querySelector('.team-carousel').addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            updateTeamCarousel(teamIndex + 1); // Swipe left
        } else {
            updateTeamCarousel(teamIndex - 1); // Swipe right
        }
    }
});

// Auto-rotate (optional)
let autoRotateInterval;

function startAutoRotate() {
    autoRotateInterval = setInterval(() => {
        updateTeamCarousel(teamIndex + 1);
    }, 4000);
}

function stopAutoRotate() {
    clearInterval(autoRotateInterval);
}

// Pause auto-rotate on hover
document.querySelector('.team-carousel').addEventListener('mouseenter', stopAutoRotate);
document.querySelector('.team-carousel').addEventListener('mouseleave', startAutoRotate);

// Initialize
updateTeamCarousel(0);
startAutoRotate();