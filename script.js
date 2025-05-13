// Advanced Web Features with Android-Friendliness and Animated Visualizations

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetSection = document.querySelector(this.getAttribute('href'));
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        if (window.innerWidth <= 768) {
            document.querySelector('nav ul').classList.remove('open');
        }
    });
});

// Scrollspy
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

    const scrollProgress = document.getElementById('scrollProgress');
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
});

// Styles
const style = document.createElement('style');
style.innerHTML = `
    nav a.active {
        color: var(--cta-color);
        border-bottom: 2px solid var(--cta-color);
        padding-bottom: 2px;
    }
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
    #backToTopBtn:hover, #darkModeToggle:hover {
        transform: scale(1.1);
    }
    img[data-src] {
        opacity: 0;
        transition: opacity 0.5s ease-in-out;
    }
    img {
        opacity: 1;
    }
    .animate {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .animate.animated {
        opacity: 1;
        transform: translateY(0);
    }
    #scrollProgress {
        position: fixed;
        top: 0;
        left: 0;
        height: 4px;
        background: var(--cta-color);
        z-index: 1000;
        transition: width 0.25s ease-out;
    }
    canvas.chart {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 20px auto;
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

window.addEventListener('scroll', () => {
    backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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

if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.innerText = "☀️";
}

darkModeToggle.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    darkModeToggle.innerText = isDark ? "☀️" : "🌙";
    darkModeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
});

// Lazy Loading
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

// Animate sections
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

// Scroll Progress Bar
const scrollProgressBar = document.createElement('div');
scrollProgressBar.id = 'scrollProgress';
document.body.appendChild(scrollProgressBar);

// Keyboard Accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp') backToTopBtn.click();
    if (e.key === 'd') darkModeToggle.click();
});

// PWA Support
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log('Service Worker Registered'))
        .catch(err => console.error('Service Worker registration failed:', err));
}

// Chart.js Visualization (add <canvas id="myChart"></canvas> in HTML)
const chartCanvas = document.createElement('canvas');
chartCanvas.id = 'myChart';
chartCanvas.classList.add('chart');
document.body.appendChild(chartCanvas);

const ctx = chartCanvas.getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Visitors',
            data: [120, 190, 300, 250, 220, 310],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        animation: {
            duration: 1000,
            easing: 'easeOutQuart'
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});