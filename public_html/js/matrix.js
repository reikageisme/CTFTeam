/**
 * Falling Hex/Cipher Background Animation
 * Creates animated falling text like Matrix effect
 */

function initMatrixBackground() {
    // Check if already initialized
    if (document.querySelector('.matrix-bg')) {
        return;
    }

    // Characters: mix of hex, flag symbols, and cipher text
    const characters = [
        // Hex codes
        '0x', '0A', 'FF', '88', '00', 'D4', '3F', '2E', 'C0', 'DE',
        '42', '1F', 'A5', 'B7', 'E2', '9C', '4D', '6B', '8F', 'AC',
        '0x', '0A', 'FF', '88', '00', 'D4', '3F', '2E', 'C0', 'DE',
        '42', '1F', 'A5', 'B7', 'E2', '9C', '4D', '6B', '8F', 'AC',
        '0x', '0A', 'FF', '88', '00', 'D4', '3F', '2E', 'C0', 'DE',
        '42', '1F', 'A5', 'B7', 'E2', '9C', '4D', '6B', '8F', 'AC',
        
        // Flag/CTF symbols
        '🚩', '⚡', '🔒', '🔑', '🎯', '⚔️', '🛡️', '💀', '👁️', '🔍',
        '🚩', '⚡', '🔒', '🔑', '🎯', '⚔️', '🛡️', '💀', '👁️', '🔍',
        '🚩', '⚡', '🔒', '🔑', '🎯', '⚔️', '🛡️', '💀', '👁️', '🔍',
        
        // Cipher text
        'FLAG{', '}', 'pwd', 'root', 'shell', 'exploit',
        'SQL', 'XSS', 'CSRF', 'RCE', 'LFI', 'RFI',
        
        // Brackets and special chars
        '[', ']', '{', '}', '<', '>', '&', '|', '^', '~'
    ];

    const container = document.createElement('div');
    container.className = 'matrix-bg';
    document.body.insertBefore(container, document.body.firstChild);

    // Create multiple falling characters
    const charCount = window.innerWidth < 768 ? 15 : 30;
    
    for (let i = 0; i < charCount; i++) {
        const char = document.createElement('div');
        char.className = 'matrix-char';
        
        // Random character from array
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        char.textContent = randomChar;
        
        // Random horizontal position
        const randomLeft = Math.random() * 100;
        char.style.left = randomLeft + '%';
        
        // Random delay for staggered effect
        const randomDelay = Math.random() * 5;
        char.style.setProperty('animation-delay', randomDelay + 's');
        
        // Random duration for variety
        const randomDuration = 8 + Math.random() * 12;
        char.style.setProperty('animation-duration', randomDuration + 's');
        
        // Random font size variation
        const randomSize = 0.8 + Math.random() * 0.6;
        char.style.fontSize = (1.2 * randomSize) + 'rem';
        
        container.appendChild(char);
    }

    // Regenerate periodically for continuous effect
    setInterval(() => {
        const chars = container.querySelectorAll('.matrix-char');
        const maxChars = window.innerWidth < 768 ? 15 : 30;
        
        if (chars.length < maxChars) {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.setProperty('animation-delay', '0s');
            char.style.fontSize = (1.2 * (0.8 + Math.random() * 0.6)) + 'rem';
            container.appendChild(char);
            
            // Remove old characters to prevent memory leak
            if (chars.length > maxChars * 2) {
                chars[0].remove();
            }
        }
    }, 3000);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMatrixBackground);
} else {
    initMatrixBackground();
}
