import React, { useEffect, useRef } from 'react';

type FocusTarget = 'none' | 'user' | 'key';

interface AntiGravityBackgroundProps {
    focusTarget: FocusTarget;
    className?: string;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    targetX: number | null;
    targetY: number | null;
    size: number;
    baseSize: number;
    orbitAngle: number;
    orbitRadius: number;
    orbitSpeed: number;
}

const PARTICLE_COUNT = 450; // Increased by ~30%
const SPRING_STRENGTH = 0.005; // Much softer spring for slower morph
const FRICTION = 0.92; // Higher friction for smoother, floaty feel
const FLOAT_SPEED = 0.03; // Very slow ambient float

const AntiGravityBackground: React.FC<AntiGravityBackgroundProps> = ({ focusTarget, className }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationFrameRef = useRef<number | null>(null);
    const timeRef = useRef<number>(0);

    // Initialize particles
    const initParticles = (width: number, height: number) => {
        if (particlesRef.current.length === 0) {
            for (let i = 0; i < PARTICLE_COUNT; i++) {
                particlesRef.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * FLOAT_SPEED,
                    vy: (Math.random() - 0.5) * FLOAT_SPEED,
                    targetX: null,
                    targetY: null,
                    size: Math.random() * 0.3 + 0.5, // radius ~0.5-0.8px (diameter ~1-1.6px)
                    baseSize: Math.random() * 0.3 + 0.5,
                    orbitAngle: Math.random() * Math.PI * 2,
                    orbitRadius: Math.random() * 5 + 2, // Small jitter orbit
                    orbitSpeed: (Math.random() - 0.5) * 0.05
                });
            }
        }
    };

    // Shape generators
    const generateUserIconTargets = (width: number, height: number, count: number) => {
        const cx = width / 2;
        const cy = height / 2;
        // Make it huge - bigger than login box (> 400px usually)
        // Login box is max-w-sm (24rem = 384px)
        // Let's use 60% of screen min dimension, or at least 500px logic if possible, 
        // but relative is safer for mobile.
        const scale = Math.min(width, height) * 0.55;
        const targets: { x: number; y: number }[] = [];

        // Distribute points: 40% head, 60% body
        const headCount = Math.floor(count * 0.4);
        const bodyCount = count - headCount;

        // Head (Circle)
        for (let i = 0; i < headCount; i++) {
            const angle = (i / headCount) * Math.PI * 2;
            const r = scale * 0.35;
            targets.push({
                x: cx + Math.cos(angle) * r,
                y: cy - scale * 0.3 + Math.sin(angle) * r
            });
        }

        // Body (Arc/Ellipse)
        for (let i = 0; i < bodyCount; i++) {
            // Let's create a curve from angle 0 to PI (bottom semi-circle) but flattened
            // Let's simple use parametric equation for semi-ellipse
            // x = cos(t), y = sin(t). We want bottom semi-circle -> t from 0 to PI.
            const t = (i / (bodyCount - 1)) * Math.PI;
            // Ellipse: x wider
            targets.push({
                x: cx + Math.cos(t) * (scale * 0.8), // wide
                y: cy + scale * 0.3 + Math.sin(t) * (scale * 0.6) // height
            });
        }
        return targets;
    };

    const generateKeyIconTargets = (width: number, height: number, count: number) => {
        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height) * 0.55; // Same huge scale
        const targets: { x: number; y: number }[] = [];

        // Key Head (Circle) - 60% points
        const headCount = Math.floor(count * 0.6);
        const shaftCount = count - headCount;

        // Head
        for (let i = 0; i < headCount; i++) {
            const angle = (i / headCount) * Math.PI * 2;
            const r = scale * 0.5;
            // Shift head left slightly
            targets.push({
                x: cx - scale * 0.4 + Math.cos(angle) * r,
                y: cy + Math.sin(angle) * r
            });
        }

        // Shaft (Rectangle + Teeth)
        // Shaft goes from head edge to right
        const shaftStartX = cx - scale * 0.4 + scale * 0.5; // right edge of head
        const shaftEndX = cx + scale * 0.8;
        const shaftY = cy;
        const shaftWidth = shaftEndX - shaftStartX;

        for (let i = 0; i < shaftCount; i++) {
            const progress = i / shaftCount;
            // Randomly scatter along the line or make outline?
            // Forming simple line/bar
            const x = shaftStartX + progress * shaftWidth;
            // Add thickness jitter
            const yOffset = (Math.random() - 0.5) * scale * 0.3; // thick line

            // Add teeth at the end
            let y = shaftY + yOffset;
            if (progress > 0.7) {
                // Teeth area
                if (Math.sin(progress * 20) > 0) {
                    y += scale * 0.25; // tooth down
                }
            }

            targets.push({ x, y });
        }

        return targets;
    };


    const updateTargets = () => {
        if (!canvasRef.current) return;
        const { width, height } = canvasRef.current;

        let newTargets: { x: number; y: number }[] = [];

        if (focusTarget === 'user') {
            newTargets = generateUserIconTargets(width, height, PARTICLE_COUNT);
        } else if (focusTarget === 'key') {
            newTargets = generateKeyIconTargets(width, height, PARTICLE_COUNT);
        }

        // Assign to particles
        particlesRef.current.forEach((p, i) => {
            if (focusTarget === 'none') {
                p.targetX = null;
                p.targetY = null;
            } else {
                // Assign mapped target
                // If more particles than targets (should match), wrap around
                const t = newTargets[i % newTargets.length];
                p.targetX = t.x;
                p.targetY = t.y;
            }
        });
    };

    // Effect to update targets when focus changes
    useEffect(() => {
        updateTargets();
    }, [focusTarget]);

    const draw = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        timeRef.current += 0.02;

        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

        // Update and Draw particles
        particlesRef.current.forEach(p => {
            // Physics
            if (p.targetX !== null && p.targetY !== null) {
                // Morphing Mode

                // Add Focus specific motion (Orbit vs Pulse)
                let tx = p.targetX;
                let ty = p.targetY;

                if (focusTarget === 'user') {
                    // Start orbit motion around the target point itself (small local orbit)
                    // Or global orbit? Request says "dots orbiting around the icon".
                    // Let's simply add a circular offset driven by time
                    tx += Math.cos(timeRef.current + p.orbitAngle) * 5;
                    ty += Math.sin(timeRef.current + p.orbitAngle) * 5;
                } else if (focusTarget === 'key') {
                    // Pulse motion
                    // Scale from center
                    const cx = canvas.width / 2;
                    const cy = canvas.height / 2;
                    const dx = p.targetX - cx;
                    const dy = p.targetY - cy;
                    const scale = 1 + Math.sin(timeRef.current * 5) * 0.05; // Pulse 5%
                    tx = cx + dx * scale;
                    ty = cy + dy * scale;
                }

                const dx = tx - p.x;
                const dy = ty - p.y;

                p.vx += dx * SPRING_STRENGTH;
                p.vy += dy * SPRING_STRENGTH;
                p.vx *= FRICTION;
                p.vy *= FRICTION;
            } else {
                // Floating Mode
                // Add subtle random wandering
                p.vx += (Math.random() - 0.5) * 0.05;
                p.vy += (Math.random() - 0.5) * 0.05;

                // Max speed limit
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > 2) {
                    p.vx = (p.vx / speed) * 2;
                    p.vy = (p.vy / speed) * 2;
                }

                // Bound check (wrap around)
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;
            }

            p.x += p.vx;
            p.y += p.vy;

            // Draw
            ctx.beginPath();

            const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);

            // Color logic
            const alpha = 0.1 + Math.random() * 0.3;
            let color = `rgba(0, 0, 0, ${alpha})`;
            if (focusTarget !== 'none') {
                color = `rgba(0, 0, 0, 0.6)`;
            }

            if (speed > 0.1) {
                // Elongate based on speed
                // Length 2px to 4px
                const length = Math.min(4, Math.max(2, speed * 20));

                // Draw line centered or trailing? Trailing looks more natural for motion blur.
                // Move to "head" (p.x, p.y)
                // Line to "tail"
                const tailX = p.x - (p.vx / speed) * length;
                const tailY = p.y - (p.vy / speed) * length;

                ctx.lineWidth = p.size * 2; // Diameter
                ctx.lineCap = 'round';
                ctx.strokeStyle = color;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(tailX, tailY);
                ctx.stroke();
            } else {
                // Stationary or very slow
                ctx.fillStyle = color;
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }
        });

        animationFrameRef.current = requestAnimationFrame(draw);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles(canvas.width, canvas.height);
            updateTargets(); // Re-calculate targets on resize
        };

        handleResize(); // Init
        window.addEventListener('resize', handleResize);

        // Start animation
        animationFrameRef.current = requestAnimationFrame(draw);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className={`absolute inset-0 pointer-events-none z-0 ${className}`}
        />
    );
};

export default AntiGravityBackground;
