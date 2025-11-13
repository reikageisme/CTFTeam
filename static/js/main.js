// Modern CTF team site with advanced matrix animation
console.log('CTF Team site loaded');

// Matrix background animation with multiple layers
const TEAM_NAME = '6h4T9pTpR0';
const MATRIX_CHARS = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
const COLORS = ['green', 'cyan', 'purple', 'pink'];
const EXTENDED_COLORS = ['green', 'cyan', 'purple', 'pink', 'lime', 'aqua'];

// Axolotl cursor follower with cute animations
class AxolotlFollower {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.targetX = 0;
    this.targetY = 0;
    this.init();
  }

  init() {
    // Create axolotl container
    const container = document.createElement('div');
    container.id = 'axolotl-cursor';
    container.innerHTML = `
      <div class="axolotl">
        <div class="axolotl-body">
          <div class="axolotl-head">
            <div class="axolotl-eye left-eye"></div>
            <div class="axolotl-eye right-eye"></div>
            <div class="axolotl-mouth"></div>
          </div>
          <div class="axolotl-gill left-gill"></div>
          <div class="axolotl-gill right-gill"></div>
          <div class="axolotl-tail"></div>
        </div>
      </div>
    `;
    document.body.appendChild(container);

    document.addEventListener('mousemove', (e) => {
      this.targetX = e.clientX;
      this.targetY = e.clientY;
    });

    this.animate();
  }

  animate() {
    // Smooth easing towards target
    this.x += (this.targetX - this.x) * 0.1;
    this.y += (this.targetY - this.y) * 0.1;

    const container = document.getElementById('axolotl-cursor');
    if (container) {
      container.style.left = this.x + 'px';
      container.style.top = this.y + 'px';

      // Calculate direction for tail rotation
      const dx = this.targetX - this.x;
      const angle = Math.atan2(0, dx) * 180 / Math.PI;
      
      const tail = container.querySelector('.axolotl-tail');
      if (tail) {
        tail.style.transform = `rotate(${angle * 0.3}deg)`;
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

// Cursor trail effect with colorful gradient and spider web
class CursorTrail {
  constructor() {
    this.particles = [];
    this.mouseX = 0;
    this.mouseY = 0;
    this.lastX = 0;
    this.lastY = 0;
    this.init();
  }

  init() {
    document.addEventListener('mousemove', (e) => this.onMouseMove(e));
    document.addEventListener('click', (e) => this.createBurst(e));
  }

  onMouseMove(e) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;

    // Create trail rarely to not interfere with axolotl
    if (Math.random() > 0.85) {
      this.createTrail(e);
    }

    // Create web connections
    if (Math.random() > 0.9) {
      this.createWebConnection();
    }
  }

  createTrail(e) {
    const trail = document.createElement('div');
    const colors = ['#00ff41', '#06b6d4', '#a78bfa', '#ff006e', '#00ff88', '#00ddff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    trail.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      width: ${3 + Math.random() * 5}px;
      height: ${3 + Math.random() * 5}px;
      background: radial-gradient(circle, ${randomColor}, transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 997;
      box-shadow: 0 0 ${6 + Math.random() * 8}px ${randomColor};
      animation: trail-fade ${0.8 + Math.random() * 0.4}s ease-out forwards;
    `;
    
    document.body.appendChild(trail);
    setTimeout(() => trail.remove(), 1200);
  }

  createWebConnection() {
    const line = document.createElement('div');
    const colors = ['#00ff41', '#06b6d4', '#a78bfa', '#ff006e'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const prevX = this.lastX || this.mouseX;
    const prevY = this.lastY || this.mouseY;
    
    const dx = this.mouseX - prevX;
    const dy = this.mouseY - prevY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    line.style.cssText = `
      position: fixed;
      left: ${prevX}px;
      top: ${prevY}px;
      width: ${distance}px;
      height: 1px;
      background: linear-gradient(90deg, ${randomColor}, transparent);
      transform: rotate(${angle}deg);
      transform-origin: 0 0;
      pointer-events: none;
      z-index: 996;
      box-shadow: 0 0 4px ${randomColor};
      animation: web-fade 0.6s ease-out forwards;
    `;
    
    document.body.appendChild(line);
    setTimeout(() => line.remove(), 600);
    
    this.lastX = this.mouseX;
    this.lastY = this.mouseY;
  }

  createBurst(e) {
    const burstCount = 12;
    const colors = ['#00ff41', '#06b6d4', '#a78bfa', '#ff006e', '#00ff88', '#00ddff'];
    
    for (let i = 0; i < burstCount; i++) {
      const angle = (i / burstCount) * Math.PI * 2;
      const velocity = 2 + Math.random() * 3;
      
      const particle = document.createElement('div');
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      
      particle.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: 5px;
        height: 5px;
        background: ${randomColor};
        border-radius: 50%;
        pointer-events: none;
        z-index: 996;
        box-shadow: 0 0 8px ${randomColor};
      `;
      
      document.body.appendChild(particle);
      
      let x = e.clientX;
      let y = e.clientY;
      let vx = Math.cos(angle) * velocity;
      let vy = Math.sin(angle) * velocity;
      let life = 1;
      
      const animate = () => {
        x += vx;
        y += vy;
        vx *= 0.96;
        vy *= 0.96 + 0.012;
        life -= 0.016;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = life;
        
        if (life > 0) {
          requestAnimationFrame(animate);
        } else {
          particle.remove();
        }
      };
      
      animate();
    }
  }
}

// Enhanced Animated background particles with more colors and movement
class ParticleEffect {
  constructor() {
    this.particles = [];
    this.canvas = null;
    this.ctx = null;
    this.init();
  }

  init() {
    const container = document.createElement('div');
    container.id = 'particle-bg';
    container.style.cssText = `position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;overflow:hidden;`;
    document.body.insertBefore(container, document.body.firstChild);
    
    // Create more particles with enhanced colors
    for (let i = 0; i < 15; i++) {
      this.createParticle();
    }
    
    setInterval(() => this.createParticle(), 1500);
  }

  createParticle() {
    const particle = document.createElement('div');
    const colorOptions = [
      'rgba(0,255,65,0.08)',      // green
      'rgba(6,182,212,0.08)',     // cyan
      'rgba(167,139,250,0.08)',   // purple
      'rgba(255,0,110,0.08)',     // pink
      'rgba(0,255,136,0.08)',     // lime
      'rgba(0,221,255,0.08)'      // aqua
    ];
    const selectedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)];
    
    const size = 80 + Math.random() * 300;
    const duration = 6 + Math.random() * 8;
    
    particle.style.cssText = `
      position:absolute;
      width:${size}px;
      height:${size}px;
      background:radial-gradient(circle, ${selectedColor} 0%, transparent 70%);
      border-radius:50%;
      left:${Math.random() * 100}%;
      top:${Math.random() * 100}%;
      animation:float-particle ${duration}s ease-in-out infinite;
      opacity:${0.4 + Math.random() * 0.5};
      filter:blur(${2 + Math.random() * 3}px);
    `;
    
    const container = document.getElementById('particle-bg');
    if (container) {
      container.appendChild(particle);
      setTimeout(() => particle.remove(), duration * 1000 + 500);
    }
  }
}

function createMatrixBackground() {
  const container = document.createElement('div');
  container.id = 'matrix-bg';
  document.body.insertBefore(container, document.body.firstChild);
  
  // Hacker hex codes and characters
  const HACK_CODES = ['0x00ff41', '0x06b6d4', '0xa78bfa', '0xff006e', '0x00ff88', '0x00ddff', '0xdeadbeef', '0xcafebabe', '0xc0ffee', '0xb105f00d', '0x0badf00d', '0x1337', '404', '503', 'NULL', 'EOF', 'ERROR', 'HACK', 'PWN', 'ROOT', 'ADMIN'];
  
  function createMatrixChar() {
    const char = document.createElement('div');
    char.className = 'matrix-char';
    
    // Mix of team name, matrix chars, and hack codes
    const rand = Math.random();
    if (rand < 0.3) {
      char.textContent = TEAM_NAME[Math.floor(Math.random() * TEAM_NAME.length)];
    } else if (rand < 0.6) {
      char.textContent = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
    } else {
      char.textContent = HACK_CODES[Math.floor(Math.random() * HACK_CODES.length)];
      char.style.fontFamily = 'monospace';
      char.style.fontSize = (14 + Math.random() * 6) + 'px';
    }
    
    // Assign random color with more variety
    const color = EXTENDED_COLORS[Math.floor(Math.random() * EXTENDED_COLORS.length)];
    char.classList.add(color);
    
    const x = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = 6 + Math.random() * 7;
    
    char.style.left = x + '%';
    char.style.top = '-20px';
    char.style.animationDuration = duration + 's';
    char.style.animationDelay = delay + 's';
    
    // Vary opacity for depth effect
    const opacity = 0.25 + Math.random() * 0.5;
    char.style.opacity = opacity;
    
    // Random font size for variety
    const size = 13 + Math.random() * 11;
    char.style.fontSize = size + 'px';
    
    container.appendChild(char);
    
    // Remove after animation ends
    setTimeout(() => char.remove(), (delay + duration) * 1000);
  }
  
  // Create initial batch faster and denser
  for (let i = 0; i < 80; i++) {
    setTimeout(() => createMatrixChar(), i * 80);
  }
  
  // Keep creating new chars at faster intervals
  setInterval(() => {
    createMatrixChar();
  }, 200 + Math.random() * 150);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    createMatrixBackground();
    new ParticleEffect();
    new AxolotlFollower();
    new CursorTrail();
    initFeatures();
  });
} else {
  createMatrixBackground();
  new ParticleEffect();
  new AxolotlFollower();
  new CursorTrail();
  initFeatures();
}

// Additional features
function initFeatures() {
  // Active nav link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index';
  document.querySelectorAll('nav a').forEach(link => {
    const href = link.getAttribute('href');
    if ((currentPage === '' && href.includes('index')) || href.includes(currentPage)) {
      link.style.color = '#00ff41';
      link.style.borderColor = '#00ff41';
      link.style.boxShadow = '0 0 15px rgba(0,255,65,0.4)';
    }
  });

  // Scroll reveal animation
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'reveal 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Copy to clipboard for social links
  document.querySelectorAll('.handle').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function(e) {
      const text = this.textContent;
      navigator.clipboard.writeText(text).then(() => {
        const original = this.textContent;
        this.textContent = 'Copied!';
        setTimeout(() => {
          this.textContent = original;
        }, 1500);
      });
    });
  });

  // Search functionality for writeups
  const searchInput = document.getElementById('writeup-search');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const query = this.value.toLowerCase();
      document.querySelectorAll('.writeups-list li').forEach(li => {
        const text = li.textContent.toLowerCase();
        li.style.display = text.includes(query) ? 'block' : 'none';
      });
    });
  }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  });
});

// Load team API
async function loadTeamApi() {
  try {
    const res = await fetch('/api/team.json');
    if (!res.ok) return;
    const data = await res.json();
    console.log('Team data from API', data);
  } catch (err) {
    console.warn('Could not load team API', err);
  }
}

loadTeamApi();


