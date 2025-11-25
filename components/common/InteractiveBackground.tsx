import React, { useEffect, useRef } from 'react';

const InteractiveBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let mouse = { x: -1000, y: -1000 };

        // Financial symbols + geometric dots
        const symbols = ['$', '%', '∑', '↑', '●', '●', '●'];
        const particleCount = 60; // Slightly fewer for performance with glow
        const connectionDistance = 160;
        const mouseInfluenceRadius = 150;

        let isDarkMode = document.documentElement.classList.contains('dark');

        const updateTheme = () => {
            isDarkMode = document.documentElement.classList.contains('dark');
        };

        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    updateTheme();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;
            symbol: string;
            targetSymbol: string;
            morphTimer: number;

            constructor(width: number, height: number) {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * 0.3; // Slower, more elegant
                this.vy = (Math.random() - 0.5) * 0.3;
                this.size = Math.random() * 12 + 8;
                this.symbol = '●';
                this.targetSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                this.morphTimer = Math.random() * 200;
            }

            update(width: number, height: number) {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;

                // Mouse interaction (gentle magnetic pull)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseInfluenceRadius) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseInfluenceRadius - distance) / mouseInfluenceRadius;

                    // Gentle attraction
                    this.x += forceDirectionX * force * 0.5;
                    this.y += forceDirectionY * force * 0.5;
                }

                // Morphing logic
                this.morphTimer++;
                if (this.morphTimer > 300) { // Change symbol every few seconds
                    this.symbol = this.targetSymbol;
                    this.targetSymbol = symbols[Math.floor(Math.random() * symbols.length)];
                    this.morphTimer = 0;
                }
            }

            draw(context: CanvasRenderingContext2D) {
                // Color based on theme
                const baseHue = isDarkMode ? 210 : 220; // Blueish
                const lightness = isDarkMode ? 80 : 30; // Darker for light mode visibility
                const alpha = isDarkMode ? 0.6 : 0.5; // Slightly more opaque in light mode

                context.font = `${this.size}px Inter, sans-serif`;
                context.fillStyle = `hsla(${baseHue}, 70%, ${lightness}%, ${alpha})`;

                // Glow effect
                context.shadowBlur = 15;
                context.shadowColor = `hsla(${baseHue}, 80%, 60%, 0.5)`;

                if (this.symbol === '●') {
                    context.beginPath();
                    context.arc(this.x, this.y, this.size / 4, 0, Math.PI * 2);
                    context.fill();
                } else {
                    context.fillText(this.symbol, this.x, this.y);
                }

                context.shadowBlur = 0; // Reset
            }
        }

        const init = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height));
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections first
            particles.forEach((p1, i) => {
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        const opacity = 1 - distance / connectionDistance;

                        // Gradient line
                        const gradient = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
                        if (isDarkMode) {
                            gradient.addColorStop(0, `rgba(100, 200, 255, ${opacity * 0.4})`); // Cyan
                            gradient.addColorStop(1, `rgba(150, 100, 255, ${opacity * 0.4})`); // Purple
                        } else {
                            gradient.addColorStop(0, `rgba(30, 58, 138, ${opacity * 0.25})`); // Stronger Blue
                            gradient.addColorStop(1, `rgba(71, 85, 105, ${opacity * 0.25})`); // Slate-600
                        }

                        ctx.beginPath();
                        ctx.strokeStyle = gradient;
                        ctx.lineWidth = 1.5;
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });

            // Draw particles
            particles.forEach((particle) => {
                particle.update(canvas.width, canvas.height);
                particle.draw(ctx);
            });

            // Mouse "Flashlight" effect - subtle radial gradient at mouse position
            if (mouse.x > 0) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
                gradient.addColorStop(0, isDarkMode ? 'rgba(56, 189, 248, 0.15)' : 'rgba(31, 58, 95, 0.08)');
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            init();
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseLeave);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseLeave);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);
        };

    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0"
            aria-hidden="true"
            style={{ opacity: 1 }} // Controlled by canvas drawing alpha
        />
    );
};

export default InteractiveBackground;
