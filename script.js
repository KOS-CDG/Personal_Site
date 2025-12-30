document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. EmailJS Init ---
    if (typeof emailjs !== 'undefined') {
        // REPLACE WITH YOUR ACTUAL KEYS IF NEEDED
        emailjs.init("PIxC8FiyZMJ8V-tAK"); 
    }

    // --- 2. Theme Toggle ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
    });

    // --- 3. Mobile Menu ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');

    const toggleMenu = () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- 4. Scroll Reveal ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // --- 5. 3D Tilt for Cards ---
    const cards = document.querySelectorAll('.project-card, .skill-category, .step-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            // Gentle tilt math
            card.style.transform = `perspective(1000px) rotateX(${y / -25}deg) rotateY(${x / 25}deg) scale(1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- 6. Contact Form ---
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusMsg = document.getElementById('form-status');

    if(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Using the specific service/template IDs from your request
            emailjs.sendForm('service_jsdhyll', 'template_ujdsr3r', this)
                .then(() => {
                    submitBtn.innerText = 'Sent!';
                    submitBtn.style.background = '#10b981'; // Green
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
                    statusMsg.style.color = '#ef4444';
                    statusMsg.innerText = 'Failed to send.';
                    console.error('EmailJS Error:', err);
                });
        });
    }

    // --- 7. Footer Year & Scroll Top ---
    document.getElementById("year").textContent = new Date().getFullYear();
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    
    window.addEventListener('scroll', () => {
        scrollTopBtn.style.opacity = window.scrollY > 400 ? '1' : '0';
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
