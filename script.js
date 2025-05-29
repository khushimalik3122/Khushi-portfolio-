// --- Responsive Hamburger Menu (Touch Friendly & Keyboard Accessible) ---
(function () {
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        // For touch devices
        hamburger.addEventListener('touchstart', e => {
            e.preventDefault();
            hamburger.click();
        }, { passive: false });
        // For keyboard accessibility
        hamburger.addEventListener('keydown', e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                hamburger.click();
            }
        });
        // Visual feedback on tap/click
        hamburger.addEventListener('mousedown', () => hamburger.classList.add('active'));
        hamburger.addEventListener('mouseup', () => hamburger.classList.remove('active'));
        hamburger.addEventListener('mouseleave', () => hamburger.classList.remove('active'));
    }
})();

// --- Prevent background scroll when modal is open ---
function showModal(html) {
    // Remove any existing modal
    document.querySelectorAll('.modal').forEach(m => m.remove());
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" tabindex="-1">
            ${html}
            <button class="modal-close" aria-label="Close modal" tabindex="0">&times;</button>
        </div>
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent scroll

    // Focus trap inside modal
    const focusable = modal.querySelector('.modal-close');
    focusable && focusable.focus();

    modal.querySelector('.modal-close').onclick = () => closeModal(modal);
    modal.addEventListener('keydown', e => {
        if (e.key === "Escape") {
            e.preventDefault();
            closeModal(modal);
        }
    });
    modal.onclick = e => {
        if (e.target === modal) closeModal(modal);
    };
}

function closeModal(modal) {
    modal.remove();
    document.body.style.overflow = '';
}

// --- Toast Notification (Mobile Position, ARIA Live) ---
function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    // Move toast to bottom center for mobile
    toast.style.left = '50%';
    toast.style.right = 'auto';
    toast.style.transform = 'translateX(-50%)';
    setTimeout(() => toast.classList.remove('show'), 2000);
}

// --- Larger tap targets for buttons (Safe DOM handling) ---
(function () {
    const ids = ['hamburger', 'colorPicker', 'settingsBtn'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.style.width = el.style.height = '56px';
            el.style.touchAction = 'manipulation';
        }
    });
})();

// --- Modal and Toast Responsive CSS (injected once) ---
(function addMobileStyles() {
    if (document.getElementById('mobile-enhanced-styles')) return;
    const style = document.createElement('style');
    style.id = 'mobile-enhanced-styles';
    style.textContent = `
    @media (max-width: 600px) {
        .modal-content { padding: 16px; max-width: 98vw; }
        .modal-close { top: 8px; right: 12px; font-size: 1.5em; }
        .toast { bottom: 20px; left: 50% !important; right: auto !important; transform: translateX(-50%) !important; }
        .btn, .cta-btn, .btn-link { font-size: 1.1em; min-width: 90vw; }
    }
    .modal { z-index: 3000; }
    .toast {
        position: fixed;
        z-index: 3200;
        bottom: 30px;
        background: #323232;
        color: #fff;
        border-radius: 8px;
        padding: 12px 28px;
        font-size: 1.05em;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
    }
    .toast.show { opacity: 1; pointer-events: auto; }
    .active { box-shadow: 0 0 0 4px rgba(74,144,226,0.2); }
    `;
    document.head.appendChild(style);
})();
