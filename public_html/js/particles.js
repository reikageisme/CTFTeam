/**
 * Particles Animation - NITECTF Style
 */

class ParticlesBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 100;
        this.connectionDistance = 150;
        
        this.init();
    }
    
    init() {
        // Setup canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '0';
        this.canvas.style.pointerEvents = 'none';
        document.body.insertBefore(this.canvas, document.body.firstChild);
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8, // Increased speed slightly
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.5 ? 'rgba(0, 255, 136, ' : 'rgba(0, 212, 255, ' // Mix of green and blue
            });
        }
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        this.ctx.fillStyle = particle.color + '0.6)';
        this.ctx.fill();
        
        // Add glow
        this.ctx.shadowBlur = 10;
        this.ctx.shadowColor = particle.color + '1)';
    }
    
    drawConnection(p1, p2, distance) {
        const opacity = 1 - (distance / this.connectionDistance);
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.lineTo(p2.x, p2.y);
        // Gradient line
        const gradient = this.ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
        gradient.addColorStop(0, p1.color + opacity * 0.3 + ')');
        gradient.addColorStop(1, p2.color + opacity * 0.3 + ')');
        
        this.ctx.strokeStyle = gradient;
        this.ctx.lineWidth = 1;
        this.ctx.stroke();
        this.ctx.shadowBlur = 0; // Reset shadow for lines
    }
    
    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            this.updateParticle(this.particles[i]);
            this.drawParticle(this.particles[i]);
            
            // Draw connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    this.drawConnection(this.particles[i], this.particles[j], distance);
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    new ParticlesBackground();
});
