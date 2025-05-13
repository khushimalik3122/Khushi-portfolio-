// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        // Collapse navigation menu in mobile view
        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('open');
        }
    });
});

// Scrollspy: Highlight current section in nav
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
});

// Add styling for active nav link
const style = document.createElement('style');
style.innerHTML = `
    nav a.active {
        color: var(--cta-color);
        border-bottom: 2px solid var(--cta-color);
        padding-bottom: 2px;
    }

    /* Styling for dark mode */
    body.dark-mode {
        background-color: #121212;
        color: #ffffff;
    }
    body.dark-mode nav {
        background-color: #1e1e1e;
    }
    body.dark-mode nav a {
        color: #ffffff;
    }
    body.dark-mode nav a.active {
        color: var(--cta-color);
    }

    /* Back to Top Button Hover Animation */
    #backToTopBtn:hover {
        transform: scale(1.1);
    }

    /* Dark Mode Toggle Hover Animation */
    #darkModeToggle:hover {
        transform: scale(1.1);
    }

    /* Lazy Loading Animation */
    img[data-src] {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }

    img {
        opacity: 1;
    }

    /* Animation for sections */
    .animate {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    .animate.animated {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Back to Top Button
const backToTopBtn = document.createElement('button');
backToTopBtn.innerText = "↑";
backToTopBtn.id = 'backToTopBtn';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: var(--cta-color);
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 1.2em;
    cursor: pointer;
    display: none;
    z-index: 1001;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    transition: transform 0.3s ease;
    outline: none;
`;

document.body.appendChild(backToTopBtn);

// Show button on scroll
window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

// Scroll to top
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Dark Mode Toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerText = "🌙";
darkModeToggle.id = 'darkModeToggle';
darkModeToggle.style.cssText = `
    position: fixed;
    bottom: 30px;
    left: 30px;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 50%;
    width: 45px;
    height: 45px;
    font-size: 1.2em;
    cursor: pointer;
    z-index: 1001;
    box-shadow: 0 4px 8px rgba(0,0,0,0.3);
    outline: none;
`;

document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    darkModeToggle.innerText = isDarkMode ? "☀️" : "🌙";
    darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Switch to light mode' : 'Switch to dark mode');
});

// Lazy Loading for Images
const lazyImages = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.style.opacity = '1';
            observer.unobserve(img);
        }
    });
}, { rootMargin: '0px 0px 200px 0px' });

lazyImages.forEach(img => observer.observe(img));

// Intersection Observer for Animations
const animateSections = document.querySelectorAll('.animate');
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            animationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

animateSections.forEach(section => animationObserver.observe(section));

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') {
        backToTopBtn.click();
    }
    if (e.key === 'd') {
        darkModeToggle.click();
    }
});