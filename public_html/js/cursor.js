/**
 * Lightweight Cyber Cursor
 * Uses CSS transforms instead of Canvas for better performance
 */

(function() {
    const initCursor = () => {
        // Check if device is touch-enabled (disable custom cursor on mobile)
        if (window.matchMedia("(pointer: coarse)").matches) return;

        // Avoid duplicate initialization
        if (document.querySelector('.cyber-cursor')) return;

        const cursor = document.createElement('div');
        cursor.className = 'cyber-cursor';
        
        const follower = document.createElement('div');
        follower.className = 'cyber-cursor-follower';

        document.body.appendChild(cursor);
        document.body.appendChild(follower);

        // Add styles dynamically
        const style = document.createElement('style');
        style.textContent = `
            body {
                cursor: none; /* Hide default cursor */
            }
            
            .cyber-cursor {
                position: fixed;
                top: 0;
                left: 0;
                width: 8px;
                height: 8px;
                background: var(--primary, #00ff88);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10002;
                transform: translate(-50%, -50%);
                mix-blend-mode: difference;
                transition: width 0.2s, height 0.2s, background 0.2s;
                will-change: transform;
            }

            .cyber-cursor-follower {
                position: fixed;
                top: 0;
                left: 0;
                width: 24px;
                height: 24px;
                border: 1px solid var(--primary, #00ff88);
                border-radius: 50%;
                pointer-events: none;
                z-index: 10001;
                transform: translate(-50%, -50%);
                transition: width 0.2s, height 0.2s, border-color 0.2s;
                mix-blend-mode: difference;
                will-change: transform;
            }

            /* Hover states */
            .cursor-hover .cyber-cursor {
                width: 12px;
                height: 12px;
                background: var(--accent, #00d4ff);
                box-shadow: 0 0 10px var(--accent, #00d4ff);
            }

            .cursor-hover .cyber-cursor-follower {
                width: 40px;
                height: 40px;
                border-color: var(--accent, #00d4ff);
                background: rgba(0, 212, 255, 0.1);
            }
            
            /* Hide on leaving window */
            body:hover .cyber-cursor,
            body:hover .cyber-cursor-follower {
                opacity: 1;
            }
            
            .cyber-cursor, .cyber-cursor-follower {
                opacity: 0;
            }
        `;
        document.head.appendChild(style);

        let mouseX = -100;
        let mouseY = -100;
        let followerX = -100;
        let followerY = -100;

        window.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Immediate update for the main dot
            cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
            
            // Show cursor
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
        });

        // Smooth follower animation loop
        function animate() {
            // Linear interpolation (lerp) for smooth following
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            
            follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0) translate(-50%, -50%)`;
            
            requestAnimationFrame(animate);
        }
        animate();

        // Handle hover effects using event delegation
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, input, textarea, .btn, .nav-link') || e.target.closest('a, button, .btn, .nav-link')) {
                document.body.classList.add('cursor-hover');
            } else {
                document.body.classList.remove('cursor-hover');
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCursor);
    } else {
        initCursor();
    }
})();
