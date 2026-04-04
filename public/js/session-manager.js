/**
 * Session Manager - Scholarly Editorial System
 * Handles dynamic inactivity timeout and route protection checks.
 */

let INACTIVITY_LIMIT = 5 * 60 * 1000; // Default fallback
let inactivityTimer;

async function initSession() {
    try {
        const response = await fetch('/api/config');
        const config = await response.json();
        if (config.inactivityLimit) {
            INACTIVITY_LIMIT = config.inactivityLimit;
            console.log(`[Session] Inactivity limit set to ${INACTIVITY_LIMIT / 1000}s from server.`);
        }
    } catch (error) {
        console.warn("[Session] Could not fetch server config, using default timeout.");
    }
    resetTimer();
}

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showInactivityModal, INACTIVITY_LIMIT);
}

function showInactivityModal() {
    if (document.getElementById('inactivity-modal')) return;

    const modalHtml = `
        <div id="inactivity-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-primary/20 backdrop-blur-xl animate-in fade-in duration-700">
            <div class="bg-surface-container-lowest w-full max-w-md p-12 rounded-[3rem] deep-sea-shadow text-center space-y-8 animate-in zoom-in-95 duration-500">
                <div class="w-20 h-20 bg-surface-container-low rounded-3xl mx-auto flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary text-4xl opacity-40">history</span>
                </div>
                <div class="space-y-4">
                    <h2 class="text-3xl font-black text-primary tracking-tighter editorial-title italic">Sesión Expirada</h2>
                    <p class="text-sm text-primary/40 font-medium leading-relaxed">
                        Tu tiempo en el <span class="italic font-bold">Avanzza UMG</span> ha concluido por inactividad. Para su seguridad, hemos cerrado el acceso.
                    </p>
                </div>
                <a href="/api/logout" class="block w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Iniciar sesión
                </a>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);
    document.body.style.overflow = 'hidden';
}

// Dynamic Year Updater
function updateYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
}

// Event listeners for user activity
window.addEventListener('load', () => {
    initSession();
    updateYear();
});
document.onmousemove = resetTimer;
document.onkeypress = resetTimer;
document.onclick = resetTimer;
document.onscroll = resetTimer;


// Static Styles for Modal
const style = document.createElement('style');
style.textContent = `
    .editorial-title { letter-spacing: -0.02em; }
    .deep-sea-shadow { box-shadow: 0px 32px 64px rgba(17, 27, 48, 0.12); }
    .animate-in { animation: fadeIn 0.7s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(style);

// Periodic status check
setInterval(async () => {
    try {
        const res = await fetch('/api/config', { method: 'HEAD' });
        if (res.status === 401) window.location.href = '/index.html';
    } catch (e) { }
}, 60000);
