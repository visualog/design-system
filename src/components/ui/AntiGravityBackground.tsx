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

const PARTICLE_COUNT = 1000; // Increased by ~50%
const SPRING_STRENGTH = 0.001;
const FRICTION = 0.96;
const FLOAT_SPEED = 0.005; // Extremely slow, barely moving

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
        const scale = Math.min(width, height) * 0.5; // Large scale
        const targets: { x: number; y: number }[] = [];

        // Head (Circle) - 35%
        const headCount = Math.floor(count * 0.35);
        // Body (Rounded Semi-circle) - 65%
        const bodyCount = count - headCount;

        // Head (Filled Circle)
        for (let i = 0; i < headCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = scale * 0.35 * Math.sqrt(Math.random()); // Filled circle
            targets.push({
                x: cx + Math.cos(angle) * r,
                y: cy - scale * 0.35 + Math.sin(angle) * r
            });
        }

        // Body (Filled Semi-ellipse/Arch)
        for (let i = 0; i < bodyCount; i++) {
            // Random point inside semi-ellipse
            // theta from PI to 2PI (top arch)
            const angle = Math.PI + Math.random() * Math.PI;
            const r = Math.sqrt(Math.random()); // 0 to 1

            // Outer radius scale
            const outerR = scale * 0.7;

            // Apply radius
            const dist = r * outerR;

            targets.push({
                x: cx + Math.cos(angle) * dist,
                y: cy + scale * 0.4 + Math.sin(angle) * (dist * 0.6) // flattened height
            });
        }
        return targets;
    };

    const generateKeyIconTargets = (width: number, height: number, count: number) => {
        const cx = width / 2;
        const cy = height / 2;
        const scale = Math.min(width, height) * 0.5;
        const targets: { x: number; y: number }[] = [];

        // Composition: User Icon (Left/Center) + Key (Right Bottom)
        // Split points: 70% User, 30% Key
        const userCount = Math.floor(count * 0.7);
        const keyCount = count - userCount;

        // Generate User points (shifted left)
        const userTargets = generateUserIconTargets(width, height, userCount);
        userTargets.forEach(t => {
            t.x -= scale * 0.3; // Shift left
            targets.push(t);
        });

        // Generate Key points (At bottom right)
        // Key shape: Head (circle) + Shaft
        const keyHeadCount = Math.floor(keyCount * 0.4);
        const keyShaftCount = keyCount - keyHeadCount;

        const keyCx = cx + scale * 0.5;
        const keyCy = cy + scale * 0.4;

        // Key Head (Filled Circle)
        for (let i = 0; i < keyHeadCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const r = (scale * 0.25) * Math.sqrt(Math.random()); // Filled
            targets.push({
                x: keyCx + Math.cos(angle) * r,
                y: keyCy + Math.sin(angle) * r
            });
        }

        // Key Shaft (Filled Thick Line/Rectangle)
        const shaftWidth = scale * 0.15; // Thick shaft
        const shaftLength = scale * 0.4;

        for (let i = 0; i < keyShaftCount; i++) {
            // Random point inside rectangle
            // Vertical shaft 
            const w = (Math.random() - 0.5) * shaftWidth;
            const l = Math.random() * shaftLength;

            let tx = keyCx + w;
            let ty = keyCy + (scale * 0.2) + l; // Start below head

            // Add teeth area (filled block)
            if (l > shaftLength * 0.6 && l < shaftLength * 0.9) {
                // Extend right for teeth
                if (Math.random() > 0.5) {
                    tx += shaftWidth * 0.6;
                }
            }

            targets.push({ x: tx, y: ty });
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
                // Floating Mode
                // wander noise
                p.vx += (Math.random() - 0.5) * 0.002;
                p.vy += (Math.random() - 0.5) * 0.002;

                // Keep within low speed limits
                const maxSpeed = FLOAT_SPEED;
                const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                if (speed > maxSpeed) {
                    p.vx = (p.vx / speed) * maxSpeed;
                    p.vy = (p.vy / speed) * maxSpeed;
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
