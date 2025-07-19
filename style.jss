document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.documentElement.setAttribute('data-theme', 
            document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        
        // Save preference to localStorage
        localStorage.setItem('theme', document.documentElement.getAttribute('data-theme'));
    });

    // Check for saved theme preference
    if (localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', localStorage.getItem('theme'));
    }

    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        mobileMenuBtn.classList.toggle('active');
    });

    // Back to Top Button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Chibi Helper on Scroll
    const chibiHelper = document.querySelector('.chibi-helper');
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            chibiHelper.style.opacity = '1';
            chibiHelper.style.transform = 'translateX(0)';
        } else {
            chibiHelper.style.opacity = '0';
            chibiHelper.style.transform = 'translateX(100px)';
        }
    });

    // Create floating background elements
    createFloatingElements();

    // Initialize GSAP animations
    initAnimations();

    // Load dynamic content
    loadContent();

    // Cursor animation
    initCursorAnimation();

    // Form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would typically send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            
            // Show mail bird animation
            const mailBird = document.createElement('div');
            mailBird.className = 'mail-bird';
            mailBird.innerHTML = '<img src="assets/mail-bird.png" alt="Mail bird">';
            document.body.appendChild(mailBird);
            
            // Animate bird flying across screen
            gsap.to(mailBird, {
                x: '100vw',
                duration: 3,
                ease: 'power1.inOut',
                onComplete: () => mailBird.remove()
            });
        });
    }
});

function createFloatingElements() {
    const floatingContainer = document.querySelector('.floating-elements');
    const elements = ['pencil', 'scroll', 'book', 'calculator', 'sparkle', 'leaf'];
    
    for (let i = 0; i < 15; i++) {
        const element = document.createElement('div');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        element.className = `floating-item ${randomElement}`;
        
        // Random position and size
        const size = Math.random() * 30 + 10;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 15 + 10;
        
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        element.style.left = `${posX}%`;
        element.style.top = `${posY}%`;
        element.style.opacity = Math.random() * 0.5 + 0.1;
        element.style.animationDelay = `${delay}s`;
        element.style.animationDuration = `${duration}s`;
        
        floatingContainer.appendChild(element);
    }
}

function initAnimations() {
    // ScrollTrigger animations for sections
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
    
    // Video card hover animations
    gsap.utils.toArray('.video-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.play-icon'), { opacity: 1, duration: 0.3 });
            
            // Create paper plane animation
            const plane = document.createElement('div');
            plane.className = 'paper-plane';
            plane.innerHTML = '<img src="assets/paper-plane.png" alt="Paper plane">';
            card.appendChild(plane);
            
            gsap.fromTo(plane, 
                { x: -50, y: -50, opacity: 0 },
                { x: 100, y: -100, opacity: 1, duration: 1, onComplete: () => plane.remove() }
            );
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.play-icon'), { opacity: 0, duration: 0.3 });
        });
    });
    
    // Story card hover animations
    gsap.utils.toArray('.story-card').forEach(card => {
        const animeBoy = document.createElement('div');
        animeBoy.className = 'anime-boy';
        animeBoy.innerHTML = '<img src="assets/anime-boy.png" alt="Anime boy reading">';
        card.appendChild(animeBoy);
        animeBoy.style.opacity = '0';
        
        card.addEventListener('mouseenter', () => {
            gsap.to(animeBoy, { opacity: 1, y: -20, duration: 0.5 });
            
            // Create fireflies
            for (let i = 0; i < 3; i++) {
                const firefly = document.createElement('div');
                firefly.className = 'firefly';
                card.appendChild(firefly);
                
                gsap.to(firefly, {
                    x: Math.random() * 100 - 50,
                    y: Math.random() * 100 - 50,
                    opacity: 0,
                    duration: 2,
                    delay: i * 0.3,
                    onComplete: () => firefly.remove()
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(animeBoy, { opacity: 0, y: 0, duration: 0.5 });
        });
    });
}

function loadContent() {
    // In a real implementation, this would fetch data from an API
    // For demo purposes, we'll use mock data
    
    // Videos
    const videos = [
        {
            title: "The Last Lesson - Full Explanation",
            summary: "Complete breakdown of this emotional story with anime-style visuals",
            thumbnail: "assets/video1.jpg",
            link: "#"
        },
        // Add more videos...
    ];
    
    const videoGrid = document.querySelector('.video-grid');
    videos.forEach(video => {
        const card = document.createElement('div');
        card.className = 'video-card glass-card';
        card.innerHTML = `
            <div class="video-thumbnail">
                <img src="${video.thumbnail}" alt="${video.title}">
                <div class="play-icon">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="video-info">
                <h3>${video.title}</h3>
                <p>${video.summary}</p>
            </div>
        `;
        videoGrid.appendChild(card);
    });
    
    // Poems
    const poems = [
        {
            number: "01",
            title: "When Autumn Came",
            summary: "Analysis of this beautiful poem with cultural context and Hinglish explanations",
            link: "#"
        },
        // Add more poems...
    ];
    
    const poemCards = document.querySelector('.poem-cards');
    poems.forEach(poem => {
        const card = document.createElement('div');
        card.className = 'poem-card glass-card';
        card.innerHTML = `
            <div class="poem-number">${poem.number}</div>
            <h3 class="poem-title">${poem.title}</h3>
            <p class="poem-summary">${poem.summary}</p>
            <a href="${poem.link}" class="read-btn">Read Explanation</a>
            <div class="poem-icon pen">✍️</div>
            <div class="poem-icon book">📖</div>
            <div class="poem-icon flower">🌸</div>
        `;
        poemCards.appendChild(card);
    });
    
    // Similar implementations for stories, prompts, notes...
}

function initCursorAnimation() {
    // Custom cursor
    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);
    
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5
        });
    });
    
    // Cursor effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .video-card, .poem-card, .story-card, .prompt-card, .note-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(cursor, { scale: 2, backgroundColor: 'rgba(255, 137, 6, 0.3)' });
            gsap.to(cursorFollower, { scale: 0.5, borderColor: 'rgba(255, 137, 6, 0.8)' });
            
            // Optional sound effect
            // const sound = new Audio('assets/hover-sound.mp3');
            // sound.volume = 0.2;
            // sound.play();
        });
        
        el.addEventListener('mouseleave', () => {
            gsap.to(cursor, { scale: 1, backgroundColor: 'rgba(255, 137, 6, 0.5)' });
            gsap.to(cursorFollower, { scale: 1, borderColor: 'rgba(255, 137, 6, 0.3)' });
        });
    });
}
