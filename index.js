require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Session Configuration
app.use(session({
    secret: process.env.SESSION_SECRET || 'avanzza-scholarly-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        maxAge: 5 * 60 * 1000, // 5 minutes in ms
        secure: false // Set to true if using HTTPS
    }
}));

// Auth Middleware
const requireAuth = (req, res, next) => {
    // Allow access to login page, 404, API login/config, and public static assets
    if (req.path === '/' || req.path === '/index.html' || req.path === '/404.html' || 
        req.path === '/api/login' || req.path === '/api/config' ||
        req.path.startsWith('/js/') || req.path.startsWith('/css/') || req.path.startsWith('/assets/')) {
        return next();
    }

    if (req.session && req.session.user) {
        return next();
    } else {
        // If it's an AJAX/API request, send 401
        if (req.xhr || (req.headers.accept && req.headers.accept.indexOf('json') > -1)) {
            return res.status(401).json({ success: false, message: "Session expired" });
        }
        // Redirect to login
        return res.redirect('/');
    }
};

// Apply auth middleware to all routes except public assets and login
// We must place this before express.static to protect the HTML files
app.use(requireAuth);

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Mock Login API
app.post('/api/login', (req, res) => {
    const { email, password, type } = req.body;

    // "Burned-in" credentials logic: prioritization of .env, with hardcoded fallback
    const MOCK_USER = process.env.MOCK_USER && process.env.MOCK_USER.trim() !== "" 
                      ? process.env.MOCK_USER 
                      : "admin@avanzza.com";

    const MOCK_PASS = process.env.MOCK_PASS && process.env.MOCK_PASS.trim() !== "" 
                      ? process.env.MOCK_PASS 
                      : "avanzza123";

    if (email === MOCK_USER && password === MOCK_PASS) {
        // Set Session
        req.session.user = { email, type };
        console.log(`[Success] Login for ${type}: ${email} (using ${process.env.MOCK_USER ? 'ENV' : 'HARDCODED'} credentials)`);
        return res.json({ success: true, message: "Login successful!" });
    } else {
        console.log(`[Failed] Invalid login attempt for ${email}`);
        return res.status(401).json({ success: false, message: "Identidad no verificada" });
    }
});

// Config API to expose .env settings to the client
app.get('/api/config', (req, res) => {
    res.json({
        inactivityLimit: parseInt(process.env.INACTIVITY_LIMIT_MS) || (5 * 60 * 1000)
    });
});

// Logout API
app.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(500).json({ success: false, message: "Could not log out" });
        }
        res.redirect('/index.html');
    });
});


// Root route redirects to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'not set'}`);
});
