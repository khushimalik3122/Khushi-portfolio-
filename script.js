// --- Responsive Hamburger Menu ---
const nav = document.querySelector('nav');
const navUl = document.querySelector('nav ul');
const hamburger = document.createElement('button');
hamburger.id = 'hamburgerMenu';
hamburger.setAttribute('aria-label', 'Open navigation menu');
hamburger.innerHTML = `<span></span><span></span><span></span>`;
hamburger.style.cssText = `
    display: none; position: fixed; top: 20px; right: 30px; z-index: 1100;
    background: var(--cta-color, #0078d7); border: none; border-radius: 8px; width: 48px; height: 48px; cursor: pointer;
`;
document.body.appendChild(hamburger);

hamburger.addEventListener('click', () => {
    navUl.classList.toggle('open');
    hamburger.classList.toggle('open');
    hamburger.setAttribute('aria-label', navUl.classList.contains('open') ? 'Close navigation menu' : 'Open navigation menu');
});

window.addEventListener('resize', () => {
    hamburger.style.display = window.innerWidth <= 768 ? 'block' : 'none';
    if (window.innerWidth > 768) navUl.classList.remove('open');
});
window.dispatchEvent(new Event('resize'));

// --- Theme Color Picker ---
const colorPicker = document.createElement('input');
colorPicker.type = 'color';
colorPicker.id = 'themeColorPicker';
colorPicker.value = localStorage.getItem('themeColor') || '#0078d7';
colorPicker.title = 'Pick theme color';
colorPicker.style.cssText = `
    position: fixed; bottom: 90px; left: 30px; width: 45px; height: 45px; border: none; border-radius: 50%;
    z-index: 1001; cursor: pointer; box-shadow: 0 4px 8px rgba(0,0,0,0.3);
`;
document.body.appendChild(colorPicker);

function setThemeColor(color) {
    document.documentElement.style.setProperty('--cta-color', color);
    localStorage.setItem('themeColor', color);
}
setThemeColor(colorPicker.value);

colorPicker.addEventListener('input', e => {
    setThemeColor(e.target.value);
    showToast('Theme color updated!');
});

// --- Accessibility Improvements ---
document.body.insertAdjacentHTML('beforeend', `
    <style>
        :focus-visible { outline: 2px solid var(--cta-color, #0078d7); outline-offset: 2px; }
        nav ul.open { display: block !important; animation: slideDown 0.3s; }
        #hamburgerMenu span { display: block; width: 28px; height: 4px; margin: 6px auto; background: #fff; border-radius: 2px; transition: 0.3s; }
        #hamburgerMenu.open span:nth-child(1) { transform: translateY(10px) rotate(45deg);}
        #hamburgerMenu.open span:nth-child(2) { opacity: 0;}
        #hamburgerMenu.open span:nth-child(3) { transform: translateY(-10px) rotate(-45deg);}
        @keyframes slideDown { from { opacity: 0; transform: translateY(-20px);} to { opacity: 1; transform: translateY(0);} }
        .toast { position: fixed; bottom: 30px; right: 90px; background: var(--cta-color, #0078d7); color: #fff; padding: 12px 24px; border-radius: 8px; z-index: 2000; opacity: 0; pointer-events: none; transition: opacity 0.3s;}
        .toast.show { opacity: 1; pointer-events: auto;}
        .blur-up { filter: blur(8px); transition: filter 0.5s;}
        .blur-up.loaded { filter: blur(0);}
        .modal { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 3000; }
        .modal-content { background: #fff; padding: 32px; border-radius: 12px; max-width: 90vw; box-shadow: 0 8px 32px rgba(0,0,0,0.2);}
        .modal-close { position: absolute; top: 16px; right: 24px; background: none; border: none; font-size: 2em; cursor: pointer;}
        .section-underline { position: absolute; left: 0; bottom: 0; height: 3px; background: var(--cta-color, #0078d7); transition: width 0.3s, left 0.3s;}
    </style>
`);

// --- Toast Notification ---
function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// --- Animated Number Counters ---
document.querySelectorAll('.counter').forEach(counter => {
    const animate = () => {
        const target = +counter.dataset.target;
        const speed = 200;
        let count = +counter.innerText;
        if (count < target) {
            counter.innerText = Math.ceil(count + (target - count) / speed * 10);
            setTimeout(animate, 10);
        } else {
            counter.innerText = target;
        }
    };
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animate();
            obs.disconnect();
        }
    }, { threshold: 0.7 });
    obs.observe(counter);
});

// --- Modal Popup Example ---
function showModal(html) {
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<div class="modal-content">${html}<button class="modal-close" aria-label="Close modal">&times;</button></div>`;
    document.body.appendChild(modal);
    modal.querySelector('.modal-close').onclick = () => modal.remove();
    modal.onclick = e => { if (e.target === modal) modal.remove(); };
}
setTimeout(() => showModal('<h2>Welcome!</h2><p>Subscribe to our newsletter for updates.</p>'), 3000);

// --- Enhanced Chart.js ---
const chartCanvas = document.createElement('canvas');
chartCanvas.id = 'myChart';
chartCanvas.classList.add('chart');
document.body.appendChild(chartCanvas);

const ctx = chartCanvas.getContext('2d');
const gradient = ctx.createLinearGradient(0, 0, 0, 400);
gradient.addColorStop(0, 'rgba(75,192,192,0.4)');
gradient.addColorStop(1, 'rgba(75,192,192,0.05)');

const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Visitors',
            data: [120, 190, 300, 250, 220, 310],
            backgroundColor: gradient,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 5,
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: { enabled: true, mode: 'index', intersect: false },
            legend: { display: true, labels: { color: 'var(--cta-color, #0078d7)' } }
        },
        animation: { duration: 1200, easing: 'easeOutQuart' },
        scales: { y: { beginAtZero: true } }
    }
});

// Export Chart Button
const exportBtn = document.createElement('button');
exportBtn.innerText = 'Export Chart';
exportBtn.style.cssText = 'display:block;margin:0 auto 20px auto;padding:8px 16px;border-radius:6px;border:none;background:var(--cta-color,#0078d7);color:#fff;cursor:pointer;';
exportBtn.onclick = () => {
    const url = chartCanvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'chart.png';
    a.click();
    showToast('Chart exported!');
};
chartCanvas.before(exportBtn);

// --- Section Reveal Animations (Staggered) ---
const animateSections = document.querySelectorAll('.animate');
const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('animated'), i * 100);
            animationObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
animateSections.forEach(section => animationObserver.observe(section));

// --- Improved Lazy Loading with Blur-Up ---
document.querySelectorAll('img[data-src]').forEach(img => {
    img.classList.add('blur-up');
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            img.src = img.dataset.src;
            img.onload = () => img.classList.add('loaded');
            img.removeAttribute('data-src');
            obs.disconnect();
        }
    }, { rootMargin: '0px 0px 200px 0px' });
    obs.observe(img);
});

// --- Scroll-to-Section Highlight (Animated Underline) ---
const navLinks = document.querySelectorAll('nav ul li a');
const underline = document.createElement('div');
underline.className = 'section-underline';
navUl.style.position = 'relative';
navUl.appendChild(underline);

function updateUnderline() {
    const active = document.querySelector('nav a.active');
    if (active) {
        const rect = active.getBoundingClientRect();
        const navRect = navUl.getBoundingClientRect();
        underline.style.width = rect.width + 'px';
        underline.style.left = (rect.left - navRect.left) + 'px';
    }
}
window.addEventListener('resize', updateUnderline);
window.addEventListener('scroll', updateUnderline);
setInterval(updateUnderline, 500);

// --- Keyboard Navigation for Menu ---
navUl.addEventListener('keydown', e => {
    const links = Array.from(navLinks);
    let idx = links.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        links[(idx + 1) % links.length].focus();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        links[(idx - 1 + links.length) % links.length].focus();
    }
});

// --- Settings Panel (toggle features) ---
const settingsBtn = document.createElement('button');
settingsBtn.innerText = '⚙️';
settingsBtn.style.cssText = 'position:fixed;bottom:150px;left:30px;width:45px;height:45px;border-radius:50%;background:#444;color:#fff;z-index:1001;border:none;cursor:pointer;';
settingsBtn.title = 'Settings';
document.body.appendChild(settingsBtn);

settingsBtn.onclick = () => showModal(`
    <h3>Settings</h3>
    <label><input type="checkbox" id="toggleChart" checked> Show Chart</label><br>
    <label><input type="checkbox" id="toggleCounters" checked> Show Counters</label>
`);

document.addEventListener('change', e => {
    if (e.target.id === 'toggleChart') {
        chartCanvas.style.display = e.target.checked ? 'block' : 'none';
        exportBtn.style.display = e.target.checked ? 'block' : 'none';
    }
    if (e.target.id === 'toggleCounters') {
        document.querySelectorAll('.counter').forEach(el => el.style.display = e.target.checked ? 'inline-block' : 'none');
    }
});

// --- Rest of your features (scrollspy, scroll progress, back to top, dark mode, etc.) ---
// (Keep your existing code for these, or merge as needed)