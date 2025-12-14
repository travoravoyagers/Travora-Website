// Blog Single Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Image lazy loading
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Share buttons functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const url = window.location.href;
            const title = document.title;
            
            if (this.classList.contains('facebook')) {
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, 'facebook-share', 'width=600,height=400');
            } else if (this.classList.contains('twitter')) {
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, 'twitter-share', 'width=600,height=400');
            } else if (this.classList.contains('linkedin')) {
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, 'linkedin-share', 'width=600,height=400');
            } else if (this.classList.contains('save')) {
                // Save for later functionality
                const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
                if (!savedArticles.includes(url)) {
                    savedArticles.push(url);
                    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
                    this.innerHTML = '<i class="fas fa-bookmark"></i> Saved';
                    this.style.backgroundColor = '#2A9D8F';
                    
                    // Show notification
                    showNotification('Article saved for later!');
                }
            }
        });
    });

    // Newsletter form submission
    const newsletterForms = document.querySelectorAll('.newsletter-form, .sidebar-newsletter');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            // Simulate subscription
            this.innerHTML = '<p class="success-message">Thank you for subscribing! Check your email for confirmation.</p>';
            
            // Store in localStorage (for demo)
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            subscribers.push({ email, date: new Date().toISOString() });
            localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
        });
    });

    // Table of Contents scroll spy (if you add one)
    const tocLinks = document.querySelectorAll('.table-of-contents a');
    if (tocLinks.length > 0) {
        const sections = Array.from(tocLinks).map(link => {
            const id = link.getAttribute('href').substring(1);
            return document.getElementById(id);
        }).filter(section => section !== null);

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });

            tocLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    // Reading progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 82px;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
        width: 0%;
        z-index: 9999;
        transition: width 0.3s ease;
    `;
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    });

    // Comment form submission
    const commentForm = document.querySelector('.comment-form');
    if (commentForm) {
        const textarea = commentForm.querySelector('textarea');
        const submitBtn = commentForm.querySelector('.btn');
        
        textarea.addEventListener('input', function() {
            submitBtn.disabled = this.value.trim().length === 0;
        });
    }

    // Utility function for notifications
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px 25px;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-hover);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        .notification {
            font-family: 'Poppins', sans-serif;
            font-weight: 600;
        }
    `;
    document.head.appendChild(style);
});