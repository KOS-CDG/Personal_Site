/* ===================================
   OPTIMIZED PORTFOLIO JAVASCRIPT
   Glen Dhale L. Caparros
   =================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle with localStorage
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check saved theme preference
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-mode');
        localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light' : 'dark');
        
        // Animate theme toggle button
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'rotate(0deg)';
        }, 300);
    });

    // 2. Vertical Mobile Navigation (Hamburger Menu)
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = hamburger.querySelectorAll('.bar');
        if (hamburger.classList.contains('active')) {
            bars[0].style.transform = "rotate(45deg) translate(8px, 8px)";
            bars[1].style.opacity = "0";
            bars[2].style.transform = "rotate(-45deg) translate(8px, -8px)";
        } else {
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        }
    });

    // Close menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Reset hamburger
            const bars = hamburger.querySelectorAll('.bar');
            bars[0].style.transform = "none";
            bars[1].style.opacity = "1";
            bars[2].style.transform = "none";
        });
    });

    // 3. Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden').forEach(el => {
        observer.observe(el);
    });

    // 4. Enhanced Light Bulb Animation
    const bulbGlass = document.querySelector('.bulb-glass');
    const lightBeam = document.querySelector('.light-beam');
    
    if (bulbGlass) {
        setInterval(() => {
            // Flicker effect
            const randomFlicker = Math.random();
            if (randomFlicker > 0.95) {
                bulbGlass.style.opacity = '0.8';
                setTimeout(() => {
                    bulbGlass.style.opacity = '1';
                }, 50);
            }
        }, 100);
    }

    // 5. EmailJS Setup
    if (typeof emailjs !== 'undefined') {
        emailjs.init("PIxC8FiyZMJ8V-tAK");
    }

    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const statusMsg = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            submitBtn.innerText = "Sending...";
            submitBtn.disabled = true;
            
            emailjs.sendForm('service_jsdhyll', 'template_ujdsr3r', this)
                .then(() => {
                    submitBtn.innerText = "Sent!";
                    submitBtn.style.background = "linear-gradient(135deg, #10b981, #059669)";
                    statusMsg.innerText = "Message sent successfully!";
                    statusMsg.style.color = "#10b981";
                    contactForm.reset();
                    
                    setTimeout(() => {
                        submitBtn.innerText = "Send Message";
                        submitBtn.disabled = false;
                        submitBtn.style.background = "";
                        statusMsg.innerText = "";
                    }, 3000);
                }, (err) => {
                    submitBtn.innerText = "Error";
                    submitBtn.disabled = false;
                    statusMsg.innerText = "Failed to send message. Please try again.";
                    statusMsg.style.color = "#ef4444";
                    console.error('EmailJS Error:', err);
                    
                    setTimeout(() => {
                        submitBtn.innerText = "Send Message";
                        statusMsg.innerText = "";
                    }, 3000);
                });
        });
    }

    // 6. Dynamic Year in Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 7. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 8. Smooth Parallax Effect for Shapes
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const shapes = document.querySelectorAll('.shape');
                
                shapes.forEach((shape, index) => {
                    const speed = 0.5 + (index * 0.1);
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });
                
                ticking = false;
            });
            
            ticking = true;
        }
    });

    // 9. Active Navigation Link Highlight
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= (sectionTop - 200)) {
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

    // 10. Performance: Reduce animations on low-end devices
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('.shape, .bulb-glass, .light-beam').forEach(el => {
            el.style.animation = 'none';
        });
    }
});
