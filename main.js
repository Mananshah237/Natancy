// Natancy's Birthday Microsite - Main JavaScript
class BirthdayExperience {
    constructor() {
        this.isLoaded = false;
        this.isListening = false;
        this.audioContext = null;
        this.analyser = null;
        this.microphone = null;
        this.particles = [];
        this.particleCanvas = null;
        this.particleCtx = null;
        
        this.init();
    }

    init() {
        this.setupCustomCursor();
        this.setupParticleSystem();
        this.setupEventListeners();
        this.startLoadingSequence();
    }

    setupCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const cursorDot = document.querySelector('.cursor-dot');

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursorDot.style.left = e.clientX - 2 + 'px';
            cursorDot.style.top = e.clientY - 2 + 'px';
        });

        document.addEventListener('mousedown', () => {
            cursor.style.transform = 'scale(0.8)';
            cursorDot.style.transform = 'scale(1.5)';
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = 'scale(1)';
            cursorDot.style.transform = 'scale(1)';
        });
    }

    setupParticleSystem() {
        this.particleCanvas = document.getElementById('particle-canvas');
        this.particleCtx = this.particleCanvas.getContext('2d');
        
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.createParticles();
        this.animateParticles();
    }

    resizeCanvas() {
        this.particleCanvas.width = window.innerWidth;
        this.particleCanvas.height = window.innerHeight;
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(window.innerWidth / 20));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.particleCanvas.width,
                y: Math.random() * this.particleCanvas.height,
                size: Math.random() * 4 + 2,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.8 + 0.2,
                color: Math.random() > 0.5 ? '#f4c2c2' : '#c2d4f4',
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 2
            });
        }
    }

    animateParticles() {
        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);
        
        this.particles.forEach(particle => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.rotation += particle.rotationSpeed;
            
            // Wrap around screen
            if (particle.x > this.particleCanvas.width) particle.x = 0;
            if (particle.x < 0) particle.x = this.particleCanvas.width;
            if (particle.y > this.particleCanvas.height) particle.y = 0;
            
            // Draw particle
            this.particleCtx.save();
            this.particleCtx.globalAlpha = particle.opacity;
            this.particleCtx.fillStyle = particle.color;
            this.particleCtx.translate(particle.x, particle.y);
            this.particleCtx.rotate(particle.rotation * Math.PI / 180);
            
            // Draw petal shape
            this.particleCtx.beginPath();
            this.particleCtx.ellipse(0, 0, particle.size, particle.size * 0.6, 0, 0, Math.PI * 2);
            this.particleCtx.fill();
            
            this.particleCtx.restore();
        });
        
        requestAnimationFrame(() => this.animateParticles());
    }

    setupEventListeners() {
        // Continue arrow interaction
        const continueArrow = document.getElementById('continueArrow');
        continueArrow.addEventListener('click', () => this.showCakeSection());
        continueArrow.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.showCakeSection();
            }
        });

        // Microphone interaction
        const micIndicator = document.getElementById('micIndicator');
        micIndicator.addEventListener('click', () => this.toggleMicrophone());
        micIndicator.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleMicrophone();
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' || e.key === ' ') {
                e.preventDefault();
                if (document.querySelector('.hero').style.display !== 'none') {
                    this.showCakeSection();
                }
            }
        });

        // Touch/click fallback for blow detection
        document.addEventListener('click', (e) => {
            if (this.isListening && e.target.closest('.cake-section')) {
                this.simulateBlow();
            }
        });
    }

    startLoadingSequence() {
        // Hide loading screen after a moment
        setTimeout(() => {
            const loadingScreen = document.getElementById('loadingScreen');
            loadingScreen.style.opacity = '0';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                this.startHeroAnimations();
            }, 1000);
        }, 2000);
    }

    startHeroAnimations() {
        // Animate name appearance
        anime({
            targets: '.name',
            opacity: [0, 1],
            translateY: [50, 0],
            duration: 2000,
            easing: 'easeOutExpo',
            delay: 500
        });

        // Animate subtitle
        anime({
            targets: '.subtitle',
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 1000
        });

        // Show continue arrow
        anime({
            targets: '.continue-arrow',
            opacity: [0, 1],
            duration: 1000,
            easing: 'easeOutExpo',
            delay: 2000
        });
    }

    showCakeSection() {
        // Hide hero section
        anime({
            targets: '.hero',
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeInExpo',
            complete: () => {
                document.querySelector('.hero').style.display = 'none';
                this.animateCakeSection();
            }
        });
    }

    animateCakeSection() {
        const cakeSection = document.getElementById('cakeSection');
        cakeSection.style.display = 'flex';

        // Animate cake container
        anime({
            targets: '.cake-container',
            opacity: [0, 1],
            translateY: [100, 0],
            duration: 2000,
            easing: 'easeOutExpo',
            delay: 500
        });

        // Animate instruction text
        anime({
            targets: '.instruction-text',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 1500,
            easing: 'easeOutExpo',
            delay: 1500
        });

        // Show microphone indicator
        anime({
            targets: '.mic-indicator',
            opacity: [0, 1],
            scale: [0, 1],
            duration: 1000,
            easing: 'easeOutBack',
            delay: 2500
        });

        // Auto-start microphone after a moment
        setTimeout(() => {
            this.startMicrophone();
        }, 4000);
    }

    async startMicrophone() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: { 
                    echoCancellation: false,
                    noiseSuppression: false,
                    autoGainControl: false
                } 
            });
            
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.analyser = this.audioContext.createAnalyser();
            this.microphone = this.audioContext.createMediaStreamSource(stream);
            
            this.analyser.fftSize = 256;
            this.microphone.connect(this.analyser);
            
            this.isListening = true;
            this.updateMicIndicator();
            this.detectBlow();
            
        } catch (error) {
            console.log('Microphone access denied, using fallback interaction');
            this.showFallbackMessage();
        }
    }

    toggleMicrophone() {
        if (this.isListening) {
            this.stopMicrophone();
        } else {
            this.startMicrophone();
        }
    }

    stopMicrophone() {
        this.isListening = false;
        if (this.microphone) {
            this.microphone.disconnect();
            this.microphone = null;
        }
        if (this.audioContext) {
            this.audioContext.close();
            this.audioContext = null;
        }
        this.updateMicIndicator();
    }

    updateMicIndicator() {
        const micIndicator = document.getElementById('micIndicator');
        if (this.isListening) {
            micIndicator.classList.add('listening');
        } else {
            micIndicator.classList.remove('listening');
        }
    }

    detectBlow() {
        if (!this.isListening || !this.analyser) return;
        
        const bufferLength = this.analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        
        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
        }
        const average = sum / bufferLength;
        
        // Detect blow (higher volume than ambient)
        if (average > 50) { // Threshold for blow detection
            this.handleBlowDetected();
            return;
        }
        
        requestAnimationFrame(() => this.detectBlow());
    }

    handleBlowDetected() {
        this.isListening = false;
        this.updateMicIndicator();
        
        // Extinguish candle animation
        const flame = document.getElementById('candleFlame');
        anime({
            targets: flame,
            opacity: [1, 0],
            scale: [1, 0.5],
            duration: 500,
            easing: 'easeInExpo',
            complete: () => {
                this.transitionToLetter();
            }
        });
        
        // Particle burst effect
        this.createBlowParticles();
        
        // Play transition sound (if audio is enabled)
        this.playTransitionSound();
    }

    simulateBlow() {
        // For touch/click fallback
        this.handleBlowDetected();
    }

    createBlowParticles() {
        // Create burst of particles around the candle
        const cakeContainer = document.getElementById('cakeContainer');
        const rect = cakeContainer.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 3;
        
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = '#ffeb99';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            document.body.appendChild(particle);
            
            anime({
                targets: particle,
                translateX: (Math.random() - 0.5) * 200,
                translateY: (Math.random() - 0.5) * 200,
                opacity: [1, 0],
                scale: [1, 0],
                duration: 1000,
                easing: 'easeOutExpo',
                complete: () => {
                    document.body.removeChild(particle);
                }
            });
        }
    }

    playTransitionSound() {
        // Create a simple chime sound using Web Audio API
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    }

    transitionToLetter() {
        // Fade out current section
        anime({
            targets: '.cake-section',
            opacity: [1, 0],
            duration: 1000,
            easing: 'easeInExpo',
            complete: () => {
                // Navigate to letter page
                window.location.href = 'letter.html';
            }
        });
    }

    showFallbackMessage() {
        const instructionText = document.getElementById('instructionText');
        instructionText.textContent = 'Tap the cake to make your wish...';
        
        // Add click handler to cake
        const cakeContainer = document.getElementById('cakeContainer');
        cakeContainer.style.cursor = 'pointer';
        cakeContainer.addEventListener('click', () => this.simulateBlow());
    }
}

// Initialize the experience when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new BirthdayExperience();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
    } else {
        // Resume animations when page is visible
    }
});

// Handle reduced motion preference
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable animations for users who prefer reduced motion
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
}