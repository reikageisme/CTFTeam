/**
 * CTFtime API Integration
 * Enhanced with multi-proxy support and cyber-themed UI
 */

const CTFTIME_TEAM_ID = (typeof teamData !== 'undefined' && teamData.ctftime_id) ? teamData.ctftime_id : 412747;
const CTFTIME_API_BASE = 'https://ctftime.org/api/v1';

// List of proxies to try in order
const PROXY_LIST = [
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?',
    'https://thingproxy.freeboard.io/fetch/'
];

class CTFtimeAPI {
    constructor(teamId) {
        this.teamId = teamId;
        this.cache = {
            team: null,
            results: null,
            lastUpdate: null
        };
        this.loadCache();
    }

    loadCache() {
        try {
            const cached = localStorage.getItem(`ctftime_cache_${this.teamId}`);
            if (cached) {
                const data = JSON.parse(cached);
                if (Date.now() - data.timestamp < 3600000) { // 1 hour
                    this.cache = data.cache;
                }
            }
        } catch (e) {
            console.warn('Cache load failed', e);
        }
    }

    saveCache() {
        try {
            localStorage.setItem(`ctftime_cache_${this.teamId}`, JSON.stringify({
                timestamp: Date.now(),
                cache: this.cache
            }));
        } catch (e) {
            console.warn('Cache save failed', e);
        }
    }

    async fetchWithProxy(url, timeout = 15000) {
        // Race all proxies simultaneously
        const fetchPromises = PROXY_LIST.map(proxy => {
            return new Promise(async (resolve, reject) => {
                try {
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), timeout);
                    
                    const targetUrl = proxy + encodeURIComponent(url);
                    const response = await fetch(targetUrl, {
                        signal: controller.signal
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    
                    const data = await response.json();
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            });
        });

        try {
            // Return the first successful response
            return await Promise.any(fetchPromises);
        } catch (error) {
            console.error('All proxies failed:', error);
            return null;
        }
    }

    async getTeamInfo() {
        if (this.cache.team) return this.cache.team;

        const url = `${CTFTIME_API_BASE}/teams/${this.teamId}/`;
        const data = await this.fetchWithProxy(url);
        
        if (data) {
            this.cache.team = data;
            this.saveCache();
        }
        
        return data;
    }

    async getTeamResults(limit = 100) {
        if (this.cache.results) return this.cache.results;

        const url = `${CTFTIME_API_BASE}/results/?team_id=${this.teamId}&limit=${limit}`;
        const data = await this.fetchWithProxy(url);
        
        if (data) {
            this.cache.results = data;
            this.saveCache();
        }
        
        return data;
    }
}

// Visitor Counter & Active Users Simulation
function initVisitorCounter() {
    const counterContainer = document.createElement('div');
    counterContainer.className = 'visitor-stats';
    counterContainer.style.cssText = `
        margin-top: 2rem;
        padding: 1rem;
        border-top: 1px solid var(--primary-dark);
        display: flex;
        justify-content: space-around;
        font-family: 'VT323', monospace;
        color: var(--text-muted);
        font-size: 1.1rem;
    `;

    // Get or init total visits from local storage (simulated persistence)
    let totalVisits = localStorage.getItem('site_visits') || 1337;
    totalVisits = parseInt(totalVisits) + 1;
    localStorage.setItem('site_visits', totalVisits);

    // Simulate active users (random fluctuation)
    const getActiveUsers = () => Math.floor(Math.random() * (15 - 3 + 1)) + 3;
    
    counterContainer.innerHTML = `
        <div class="stat-item">
            <i class="fas fa-eye" style="color: var(--primary)"></i>
            <span>TOTAL VISITS: <span id="total-visits" style="color: var(--text-light)">${totalVisits}</span></span>
        </div>
        <div class="stat-item">
            <i class="fas fa-network-wired" style="color: var(--secondary)"></i>
            <span>ACTIVE NODES: <span id="active-users" style="color: var(--accent)">${getActiveUsers()}</span></span>
        </div>
    `;

    // Append to footer or stats container
    const statsContainer = document.getElementById('ctftime-stats');
    if (statsContainer) {
        statsContainer.parentNode.insertBefore(counterContainer, statsContainer.nextSibling);
    }

    // Update active users randomly
    setInterval(() => {
        const activeEl = document.getElementById('active-users');
        if (activeEl) {
            activeEl.textContent = getActiveUsers();
            activeEl.style.opacity = '0.5';
            setTimeout(() => activeEl.style.opacity = '1', 200);
        }
    }, 5000);
}

// Inject Cyber Loading Styles
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    .cyber-loader-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 3rem;
        background: rgba(0, 20, 40, 0.3);
        border: 1px solid var(--primary-dark);
        border-radius: 8px;
    }
    
    .cyber-spinner {
        width: 60px;
        height: 60px;
        border: 3px solid transparent;
        border-top-color: var(--primary);
        border-right-color: var(--secondary);
        border-radius: 50%;
        animation: cyber-spin 1s linear infinite;
        position: relative;
        margin-bottom: 1.5rem;
    }
    
    .cyber-spinner::before {
        content: '';
        position: absolute;
        top: 5px; left: 5px; right: 5px; bottom: 5px;
        border: 3px solid transparent;
        border-top-color: var(--accent);
        border-radius: 50%;
        animation: cyber-spin 2s linear infinite reverse;
    }
    
    .cyber-spinner::after {
        content: '';
        position: absolute;
        top: 15px; left: 15px; right: 15px; bottom: 15px;
        border: 3px solid transparent;
        border-top-color: var(--text-light);
        border-radius: 50%;
        animation: cyber-spin 3s linear infinite;
    }
    
    .cyber-text {
        font-family: 'VT323', monospace;
        color: var(--primary);
        font-size: 1.2rem;
        letter-spacing: 2px;
        animation: blink 1s infinite;
    }
    
    .ctf-events-container {
        margin-top: 3rem;
    }
    
    .year-header {
        font-family: 'Press Start 2P', monospace;
        color: var(--accent);
        font-size: 1.2rem;
        margin: 2rem 0 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--primary-dark);
        text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
    }
    
    .events-table {
        width: 100%;
        border-collapse: collapse;
        background: rgba(10, 14, 39, 0.6);
        border-radius: 8px;
        overflow: hidden;
        font-family: 'VT323', monospace;
        font-size: 1.1rem;
    }
    
    .events-table th {
        background: rgba(0, 255, 136, 0.1);
        color: var(--primary);
        padding: 1rem;
        text-align: left;
        font-weight: normal;
        letter-spacing: 1px;
        border-bottom: 1px solid var(--primary-dark);
    }
    
    .events-table td {
        padding: 1rem;
        border-bottom: 1px solid rgba(30, 39, 73, 0.5);
        color: var(--text-light);
    }
    
    .events-table tr:hover {
        background: rgba(0, 212, 255, 0.05);
    }
    
    .rank-badge {
        display: inline-block;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-weight: bold;
    }
    
    .rank-1 { color: #FFD700; text-shadow: 0 0 10px rgba(255, 215, 0, 0.5); }
    .rank-2 { color: #C0C0C0; text-shadow: 0 0 10px rgba(192, 192, 192, 0.5); }
    .rank-3 { color: #CD7F32; text-shadow: 0 0 10px rgba(205, 127, 50, 0.5); }
    .rank-top10 { color: var(--primary); }
    
    @keyframes cyber-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
    }
`;
document.head.appendChild(styleSheet);

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
    const statsContainer = document.getElementById('ctftime-stats');
    
    // Initialize Visitor Counter immediately
    initVisitorCounter();

    // We are using static data from data.js now, so we disable the API fetch
    // to prevent overwriting the static content.
    /*
    if (!statsContainer) return;

    const api = new CTFtimeAPI(CTFTIME_TEAM_ID);
    
    // Cyber Loading State
    statsContainer.innerHTML = `
        <div class="cyber-loader-container">
            <div class="cyber-spinner"></div>
            <div class="cyber-text">ESTABLISHING UPLINK...</div>
        </div>
    `;

    try {
        const [teamInfo, teamResults] = await Promise.all([
            api.getTeamInfo(),
            api.getTeamResults()
        ]);
        
        // ... (rest of the logic) ...
        
        statsContainer.innerHTML = htmlContent;

    } catch (error) {
        console.error('CTFtime Init Error:', error);
        // ...
    }
    */
});
