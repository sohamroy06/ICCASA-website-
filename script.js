document.addEventListener("DOMContentLoaded", () => {
    
    /* --- 1. Mobile Menu Toggle --- */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('no-scroll'); // Prevents background scrolling
        });
    }

    /* --- 2. Hero Slideshow Logic --- */
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // 5 seconds

    const nextSlide = () => {
        if(slides.length === 0) return;
        
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    };

    if(slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }

    /* --- 3. Navbar Scroll Effect --- */
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* --- 4. Coming Soon Modal Logic (THE FIX) --- */
    const modal = document.getElementById('cs-modal');
    const closeBtn = document.querySelector('.cs-close-btn');
    const ackBtn = document.querySelector('.cs-ack-btn');
    
    // Select ALL <a> tags on the page
    const allLinks = document.querySelectorAll('a');

    allLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Logic: 
            // 1. If it's a "mailto:" link (email), let it work.
            // 2. If it's "index.html" (Home), let it work.
            // 3. If it's just "#" or starts with "#" (internal scroll), let it work.
            // 4. EVERYTHING ELSE -> Stop navigation and show popup.

            if (href && !href.startsWith('mailto:') && href !== 'index.html' && href !== '/' && !href.startsWith('#')) {
                e.preventDefault(); // STOP the redirect
                
                // Close mobile menu if it's open
                if(navMenu.classList.contains('active')){
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }

                openModal();
            }
        });
    });

    // Function to Open Modal
    function openModal() {
        if(modal) {
            modal.classList.add('active');
            // We use a slight timeout to ensure the CSS transition looks good
            setTimeout(() => {
                document.body.style.overflow = 'hidden'; 
            }, 10);
        }
    }

    // Function to Close Modal
    function closeModal() {
        if(modal) {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Restore scrolling
        }
    }

    // Event Listeners for closing the modal
    if(closeBtn) closeBtn.addEventListener('click', closeModal);
    if(ackBtn) ackBtn.addEventListener('click', closeModal);
    
    // Close if clicking outside the white box (on the dark background)
    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    /* --- 5. Smooth Scroll for Anchor Links (e.g. #hero) --- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only scroll if it's a valid ID on this page
            const targetId = this.getAttribute('href');
            if(targetId !== '#' && document.querySelector(targetId)) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    

});