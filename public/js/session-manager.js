/**
 * Session Manager - Avanzza 2.0
 * Handles client-side inactivity timeout and route protection checks.
 */

let INACTIVITY_LIMIT = 5 * 60 * 1000; // 5 minutes (Static Default)
let inactivityTimer;

function initSession() {
    // In static mode, we skip server config and go straight to protection
    checkAuth();
    resetTimer();
}

function checkAuth() {
    const user = localStorage.getItem('avanzza_user');
    const isLoginPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('404.html');

    if (!user && !isLoginPage) {
        console.warn("[Session] No valid session found. Redirecting to login.");
        window.location.href = 'index.html';
    }
}

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(showInactivityModal, INACTIVITY_LIMIT);
}

function performLogout() {
    localStorage.removeItem('avanzza_user');
    window.location.href = 'index.html';
}

function showInactivityModal() {
    if (document.getElementById('inactivity-modal')) return;
    
    // Clear storage immediately for security
    localStorage.removeItem('avanzza_user');

    const modalHtml = `
        <div id="inactivity-modal" class="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-700">
            <div class="bg-white w-full max-w-md p-12 rounded-4xl shadow-2xl text-center space-y-8 animate-in zoom-in-95 duration-500 border border-slate-100">
                <div class="w-20 h-20 bg-blue-50 rounded-3xl mx-auto flex items-center justify-center">
                    <span class="material-symbols-outlined text-primary text-4xl">history</span>
                </div>
                <div class="space-y-4">
                    <h2 class="text-3xl font-black text-slate-800 headline-font italic">Sesión Expirada</h2>
                    <p class="text-sm text-slate-500 font-medium leading-relaxed">
                        Tu tiempo en <span class="italic font-bold text-primary">Avanzza</span> ha concluido por inactividad.
                    </p>
                </div>
                <button onclick="performLogout()" class="block w-full py-5 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Reiniciar Acceso
                </button>
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

// Global Logout Interceptor for static links
document.addEventListener('click', (e) => {
    const logoutLink = e.target.closest('a[href="/api/logout"]');
    if (logoutLink) {
        e.preventDefault();
        performLogout();
    }
});

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
const styleElement = document.createElement('style');
styleElement.textContent = `
    .editorial-title { letter-spacing: -0.02em; }
    .animate-in { animation: fadeIn 0.7s ease-out; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
`;
document.head.appendChild(styleElement);

// Periodic status check (now purely local)
setInterval(() => {
    checkAuth();
}, 30000);

