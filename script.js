/* script.js */
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EmailJS Initialization ---
    // IMPORTANT: Replace with your actual Public Key from EmailJS dashboard
    if (typeof emailjs !== 'undefined') {
        emailjs.init("YOUR_PUBLIC_KEY_HERE"); 
    }

    // --- 2. Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        // Save preference
        const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', theme);
    });

    // --- 3. Mobile Menu Handling ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    
    // Close menu when clicking a link
    links.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- 4. Scroll Reveal Animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // --- 5. 3D Tilt Effect for Cards ---
    // Adds a premium feel to cards on mouse hover
    const cards = document.querySelectorAll('.project-card, .skill-category, .step-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Calculate rotation (divided by 25 to keep it subtle)
            card.style.transform = `perspective(1000px) rotateX(${y / -25}deg) rotateY(${x / 25}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- 6. Contact Form Submission ---
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusMsg = document.getElementById('form-status');

    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (typeof emailjs === 'undefined') {
                statusMsg.innerText = "Error: EmailJS not loaded.";
                return;
            }

            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with actual EmailJS IDs
            emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
                .then(() => {
                    submitBtn.innerText = 'Sent!';
                    submitBtn.style.background = '#10b981'; // Success Green
                    statusMsg.style.color = '#10b981';
                    statusMsg.innerText = 'Message Sent Successfully!';
                    form.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerText = 'Send Message';
                        submitBtn.style.background = '';
                        submitBtn.disabled = false;
                        statusMsg.innerText = '';
                    }, 4000);
                }, (err) => {
                    submitBtn.innerText = 'Retry';
                    submitBtn.disabled = false;
                    statusMsg.style.color = '#ef4444'; // Error Red
                    statusMsg.innerText = 'Failed to send. Please try again.';
                    console.error('EmailJS Error:', err);
                });
        });
    }

    // --- 7. Footer Year & Scroll To Top ---
    document.getElementById("year").textContent = new Date().getFullYear();
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'all';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
