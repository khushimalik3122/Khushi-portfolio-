// --- Responsive Hamburger Menu (Touch Friendly) ---
hamburger.addEventListener('touchstart', e => {
    e.preventDefault();
    hamburger.click();
}, { passive: false });

// --- Prevent background scroll when modal is open ---
function showModal(html) {
    let modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `<div class="modal-content">${html}<button class="modal-close" aria-label="Close modal">&times;</button></div>`;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; // Prevent scroll
    modal.querySelector('.modal-close').onclick = () => {
        modal.remove();
        document.body.style.overflow = '';
    };
    modal.onclick = e => {
        if (e.target === modal) {
            modal.remove();
            document.body.style.overflow = '';
        }
    };
}

// --- Toast Notification (Mobile Position) ---
function showToast(msg) {
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
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

// --- Larger tap targets for buttons ---
hamburger.style.width = hamburger.style.height = '56px';
colorPicker.style.width = colorPicker.style.height = '56px';
settingsBtn.style.width = settingsBtn.style.height = '56px';

// --- Modal content responsive ---
document.body.insertAdjacentHTML('beforeend', `
<style>
@media (max-width: 600px) {
    .modal-content { padding: 16px; max-width: 98vw; }
    .modal-close { top: 8px; right: 12px; font-size: 1.5em; }
    .toast { bottom: 20px; left: 50% !important; right: auto !important; transform: translateX(-50%) !important; }
}
</style>
`);
