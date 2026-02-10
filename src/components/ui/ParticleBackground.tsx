import React, { useMemo, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// Shaders (Enhanced for requested particle motion)
// -----------------------------------------------------------------------------

const vertexShader = `
#define PI 3.14159265359

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform int uIconMode; // 0: none, 1: person, 2: lock
uniform float uFormationIntensity; // 0.0 ~ 1.0

attribute vec3 aOffset;
attribute float aRandom;
// attribute vec3 aIconTarget; // Replaced dynamically below for dual targets

varying vec2 vUv;
varying float vSize;
varying vec2 vPos;
varying float vRandom;

// Noise Function
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

// 2D Noise
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

mat2 rotate2d(float _angle) {
  return mat2(cos(_angle), sin(_angle), -sin(_angle), cos(_angle));
}

void main() {
  vUv = uv;
  vRandom = aRandom;
  
  // Base Position from Grid
  vec3 pos = aOffset;

  // ----------------------------------------------------------------
  // 1. Flow Field (Always Active - Subtle background movement)
  // ----------------------------------------------------------------
  float flowSpeed = uTime * 0.1;
  float flowScale = 0.15;
  // Create wavelike distortion
  float flowX = sin(pos.y * flowScale + flowSpeed) * 0.5;
  float flowY = cos(pos.x * flowScale + flowSpeed * 0.8) * 0.5;
  
  // Apply flow primarily when NOT forming an icon
  float freeMode = 1.0 - uFormationIntensity;
  pos.x += flowX * freeMode;
  pos.y += flowY * freeMode;

  // ----------------------------------------------------------------
  // 2. Halo Ring & Radial Alignment (Interactive with Mouse)
  // ----------------------------------------------------------------
  // Calculate vector to mouse (interactive center)
  // uMouse is mapped to world coordinates approx (-20 ~ 20)
  vec2 toMouse = pos.xy - uMouse;
  float distToMouse = length(toMouse);
  float angleToMouse = atan(toMouse.y, toMouse.x);

  // Breathing Cycle (Expands and contracts)
  float breath = sin(uTime * 0.8) * 0.5 + 0.5; // 0.0 ~ 1.0
  float haloRadius = 2.5 + breath * 0.3;       // Base radius ~2.5
  
  // Radial Alignment: Particles aligns towards center like spokes
  // We modify the rotation of the particle later based on this angle

  // Ring Formation Interaction:
  // Push particles away from center if too close, pull if too far, 
  // but only loosely to create a 'cloud' or 'aura' feel.
  
  // Force field logic:
  // Determine if particle is affected by mouse gravity
  float mouseInfluenceRadius = 8.0;
  float influence = smoothstep(mouseInfluenceRadius, 0.0, distToMouse);
  
  // Shaping the ring
  // Particles at 'haloRadius' distance get emphasized or moved
  float distFromRing = abs(distToMouse - haloRadius);
  float ringIntensity = smoothstep(1.5, 0.0, distFromRing); // 1.0 at ring, 0.0 far away
  
  // Move particles slightly towards the ring radius if influenced
  // This creates the "Halo Ring" appearance dynamically from the grid
  vec2 ringPos = normalize(toMouse) * haloRadius;
  // Lerp towards ring position based on influence * freeMode
  // But we want to keep them somewhat grid-like, just distorted.
  
  float distortionStrength = 0.5 * influence * freeMode;
  // This creates a subtle ring concentration around mouse
  // pos.xy = mix(pos.xy, uMouse + ringPos, distortionStrength); 
  
  // Improved Logic:
  // Instead of moving TO ring, we Push/Pull.
  // If inside radius, push out.
  vec2 pushDir = normalize(toMouse + vec2(0.0001)); // Prevent div/0
  float pushFactor = smoothstep(haloRadius, 0.0, distToMouse) * freeMode;
  pos.xy += pushDir * pushFactor * 1.5; // Push out from center

  // ----------------------------------------------------------------
  // 3. Icon Formation (Target Morphing)
  // ----------------------------------------------------------------
  // Placeholder for dynamic injection
  pos = mix(pos, vec3(0.0), uFormationIntensity); 

  // ----------------------------------------------------------------
  // 4. Size & Rotation
  // ----------------------------------------------------------------
  // Base size + Pulse
  float sizePulse = 0.03 + (sin(uTime * 2.0 + distToMouse) * 0.01);
  // Enlarge particles on the ring
  float ringHighlight = ringIntensity * influence * 0.04;
  
  float finalScale = sizePulse + ringHighlight;
  
  // Scale up when forming icon to make it solid
  finalScale = mix(finalScale, 0.05, uFormationIntensity);

  // Rotate particle to point to center (Radial Alignment)
  // Or just rotate over time
  float particleRotation = angleToMouse; // Align radially
  // Add some spin
  // particleRotation += uTime * 0.5;
  
  vec3 transformed = position;
  transformed.x *= finalScale;
  transformed.y *= finalScale; // Keep it square/circular
  
  transformed.xy = rotate2d(particleRotation) * transformed.xy;

  vSize = ringIntensity * influence; // Pass for coloring
  vPos = pos.xy; // World pos

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + transformed, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform int uIconMode;
uniform float uFormationIntensity;

varying vec2 vUv;
varying float vSize; // Intensity of being in the "Ring"
varying vec2 vPos;
varying float vRandom;

// Google Brand Colors (Approx)
const vec3 cBlue = vec3(0.258, 0.529, 0.96);   // #4285F4
const vec3 cRed = vec3(0.917, 0.262, 0.207);    // #EA4335
const vec3 cYellow = vec3(0.984, 0.737, 0.019); // #FBBC05
const vec3 cGreen = vec3(0.203, 0.658, 0.325);  // #34A853

// 2025 Trend for Background/Base
const vec3 cBase = vec3(0.8, 0.8, 0.8); // Neutral Greyish

void main() {
  // Soft Circle Shape
  vec2 center = vec2(0.5);
  float dist = length(vUv - center);
  float alpha = 1.0 - smoothstep(0.4, 0.5, dist);

  if (alpha < 0.01) discard;

  // ----------------------------------------------------------------
  // Color Logic: Google Color Cycle
  // ----------------------------------------------------------------
  // Cycle based on time + position
  float cycleT = uTime * 0.5 + length(vPos) * 0.1;
  float cyclePhase = mod(cycleT, 4.0); // 0~4
  
  vec3 cycleColor;
  if (cyclePhase < 1.0) {
      cycleColor = mix(cBlue, cRed, cyclePhase);
  } else if (cyclePhase < 2.0) {
      cycleColor = mix(cRed, cYellow, cyclePhase - 1.0);
  } else if (cyclePhase < 3.0) {
      cycleColor = mix(cYellow, cGreen, cyclePhase - 2.0);
  } else {
      cycleColor = mix(cGreen, cBlue, cyclePhase - 3.0);
  }

  // Base Color (When idle/far)
  vec3 finalColor = mix(vec3(0.7), cycleColor, vSize * 0.8 + 0.2); // vSize is ring intensity

  // Override color if forming Icon
  if (uFormationIntensity > 0.1) {
      // Use specific color for icon modes
      if (uIconMode == 1) finalColor = mix(finalColor, cBlue, uFormationIntensity); // ID -> Blue
      if (uIconMode == 2) finalColor = mix(finalColor, cGreen, uFormationIntensity); // PW -> Green
  }

  float finalAlpha = alpha * mix(0.3, 1.0, vSize); // More opaque in ring
  finalAlpha = mix(finalAlpha, 0.9, uFormationIntensity); // Solid in icon

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

// -----------------------------------------------------------------------------
// Helper Functions (Same Geometry)
// -----------------------------------------------------------------------------

const createPersonIcon = () => {
    const positions: number[] = [];
    // Head (Circle)
    for (let i = 0; i < 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        positions.push(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5 + 2.0, 0);
    }
    // Body (Arc/Shoulders)
    for (let i = 0; i < 40; i++) {
        const angle = Math.PI + (i / 40) * Math.PI; // Semicircle down
        // x = cos(angle)*width, y = sin(angle)*height - offset
        positions.push(Math.cos(angle) * 2.5, Math.sin(angle) * 2.5 - 1.5, 0);
    }
    return positions;
};

const createLockIcon = () => {
    const positions: number[] = [];
    // Body (Rectangle outline)
    // Bottom
    for (let x = -2.0; x <= 2.0; x += 0.4) positions.push(x, -3.0, 0);
    // Top of body
    for (let x = -2.0; x <= 2.0; x += 0.4) positions.push(x, -0.5, 0);
    // Sides
    for (let y = -3.0; y <= -0.5; y += 0.4) {
        positions.push(-2.0, y, 0);
        positions.push(2.0, y, 0);
    }

    // Shackle (Arc)
    for (let i = 0; i <= 20; i++) {
        const angle = Math.PI - (i / 20) * Math.PI;
        positions.push(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5 - 0.5, 0);
    }
    return positions;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

interface ParticleSystemProps {
    focusState: 'none' | 'id' | 'password';
}

const ParticleSystem: React.FC<ParticleSystemProps> = ({ focusState }) => {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    // Animation state references
    const targetIntensity = useRef(0);
    const currentIntensity = useRef(0);

    // High count for flow field
    const countX = 80;
    const countY = 50;
    const count = countX * countY;

    // const { viewport } = useThree(); // Unused

    const { offsets, targetPerson, targetLock, randoms } = useMemo(() => {
        const offsetsArray = new Float32Array(count * 3);
        const randomsArray = new Float32Array(count);

        const gridWidth = 40;
        const gridHeight = 25;
        const jitter = 0.5;

        const personPositions = createPersonIcon();
        const lockPositions = createLockIcon();

        let i = 0;
        for (let y = 0; y < countY; y++) {
            for (let x = 0; x < countX; x++) {
                const i3 = i * 3;

                // Grid Position
                const u = x / (countX - 1);
                const v = y / (countY - 1);

                let px = (u - 0.5) * gridWidth;
                let py = (v - 0.5) * gridHeight;

                px += (Math.random() - 0.5) * jitter;
                py += (Math.random() - 0.5) * jitter;

                offsetsArray[i3] = px;
                offsetsArray[i3 + 1] = py;
                offsetsArray[i3 + 2] = 0;

                randomsArray[i] = Math.random();

                i++;
            }
        }

        // Generate targets - distribute icon points among particles
        const tPerson = new Float32Array(count * 3);
        const tLock = new Float32Array(count * 3);

        // Simple distribution: Loop through available icon points
        for (let j = 0; j < count; j++) {
            // const pIdx = j % personPositions.length; // Unused
            // const lIdx = j % lockPositions.length; // Unused

            // Actually personPositions is flat [x,y,z, x,y,z]...
            // We need step of 3
            const pStep = (j * 3) % personPositions.length;
            const lStep = (j * 3) % lockPositions.length;

            tPerson[j * 3] = personPositions[pStep];
            tPerson[j * 3 + 1] = personPositions[pStep + 1];
            tPerson[j * 3 + 2] = 0;

            tLock[j * 3] = lockPositions[lStep];
            tLock[j * 3 + 1] = lockPositions[lStep + 1];
            tLock[j * 3 + 2] = 0;
        }

        return { offsets: offsetsArray, targetPerson: tPerson, targetLock: tLock, randoms: randomsArray };
    }, [countX, countY]);

    // Update logic
    useFrame((state) => {
        const material = materialRef.current;
        if (!material) return;

        const time = state.clock.elapsedTime;

        // Target State Logic
        let targetM = 0;
        if (focusState === 'id') targetM = 1;
        if (focusState === 'password') targetM = 2;

        const active = targetM !== 0;
        targetIntensity.current = active ? 0.95 : 0.0;
        // Smoother lerp
        currentIntensity.current = THREE.MathUtils.lerp(currentIntensity.current, targetIntensity.current, 0.08);

        // Update Uniforms
        material.uniforms.uTime.value = time;

        // Map mouse to world coordinates approx
        // Viewport width at z=0 is approx 50 (camera z=50, fov=60 => tan(30)*50*2 approx 57)
        // Let's use viewport directly if available or approximate.
        // Normalized mouse (-1 to 1) -> World
        material.uniforms.uMouse.value.set(
            (state.mouse.x * 25), // Approx world scale
            (state.mouse.y * 15)
        );

        material.uniforms.uIconMode.value = targetM;
        material.uniforms.uFormationIntensity.value = currentIntensity.current;

        // Dual Target Factors Mixing
        let pT = 0, lT = 0;
        if (focusState === 'id') pT = 1;
        if (focusState === 'password') lT = 1;

        const lerpSpeed = 0.1;
        const currentP = material.uniforms.uPersonFactor.value;
        const currentL = material.uniforms.uLockFactor.value;

        material.uniforms.uPersonFactor.value = THREE.MathUtils.lerp(currentP, pT, lerpSpeed);
        material.uniforms.uLockFactor.value = THREE.MathUtils.lerp(currentL, lT, lerpSpeed);
    });

    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(1, 1);
        const instancedGeo = new THREE.InstancedBufferGeometry();
        instancedGeo.instanceCount = count;
        instancedGeo.index = geo.index;
        instancedGeo.attributes.position = geo.attributes.position;
        instancedGeo.attributes.uv = geo.attributes.uv;

        instancedGeo.setAttribute('aOffset', new THREE.InstancedBufferAttribute(offsets, 3));
        instancedGeo.setAttribute('aRandom', new THREE.InstancedBufferAttribute(randoms, 1));
        instancedGeo.setAttribute('aTargetPerson', new THREE.InstancedBufferAttribute(targetPerson, 3));
        instancedGeo.setAttribute('aTargetLock', new THREE.InstancedBufferAttribute(targetLock, 3));

        return instancedGeo;
    }, [offsets, randoms, targetPerson, targetLock, count]);

    const dualTargetVertexShader = useMemo(() => vertexShader
        .replace(
            '// attribute vec3 aIconTarget; // Replaced dynamically below for dual targets',
            `attribute vec3 aTargetPerson;
       attribute vec3 aTargetLock;
       uniform float uPersonFactor;
       uniform float uLockFactor;`
        )
        .replace(
            'pos = mix(pos, vec3(0.0), uFormationIntensity);',
            `
      vec3 targetPos = pos;
      // Morph logic: If either factor is active, mix towards target
      if (uLockFactor > 0.01) {
          targetPos = aTargetLock;
          pos = mix(pos, targetPos, uLockFactor * uFormationIntensity);
      } else {
          targetPos = aTargetPerson;
          pos = mix(pos, targetPos, uPersonFactor * uFormationIntensity);
      }
      `
        ), []);

    const uniforms = useMemo(() => ({
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uIconMode: { value: 0 },
        uFormationIntensity: { value: 0 },
        uPersonFactor: { value: 0 },
        uLockFactor: { value: 0 }
    }), []);

    return (
        <instancedMesh args={[undefined, undefined, count]}>
            <primitive object={geometry} attach="geometry" />
            <shaderMaterial
                ref={materialRef}
                vertexShader={dualTargetVertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent={true}
                depthWrite={false}
                blending={THREE.NormalBlending} // Additive might be too bright, Normal is safer
            />
        </instancedMesh>
    );
};

export const ParticleBackground: React.FC<{ focusState: 'none' | 'id' | 'password', className?: string }> = ({ focusState, className }) => {
    return (
        // Removed z-index forcing and background color to allow parent control
        // Added pointer-events-none to let clicks pass through to particles logic if needed (but raycaster needs events)
        // Actually R3F handles events on canvas.
        <div className={`absolute inset-0 ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 50], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
                style={{ width: '100%', height: '100%', pointerEvents: 'none' }} // Canvas background should allow clicks? No, canvas needs events for mouse tracking
                onCreated={({ gl }) => {
                    gl.setClearColor(new THREE.Color(0x000000), 0); // Transparent clear
                }}
            >
                <InteractiveMouseTracker />
                <ParticleSystem focusState={focusState} />
            </Canvas>
        </div>
    );
};

// Helper to track mouse if canvas has pointer-events: none?
// Actually if we want mouse tracking on canvas, we need pointer-events: auto on canvas.
// But if canvas is on top (z-0) it might block inputs.
// Solution: Use a global mouse tracker hook or let canvas be behind (-z-10) and use event bubbling?
// Or: Canvas z-index -1, pure visual.
// But R3F state.mouse depends on events on canvas.
// Workaround: A component that listens to window mouse move.

const InteractiveMouseTracker = () => {
    const { mouse } = useThree(); // size is unused
    // We don't need to render anything, just by being here we don't fix the mouse issue if canvas has no events.
    // If canvas is behind, we need to bind window events to update R3F mouse?
    // R3F `useThree` mouse is updated by R3F event manager.

    // Let's attach a global listener to update a shared value if R3F mouse doesn't work.
    // But standard R3F: if canvas is covered, it won't get events.

    // For this specific 'background' use case:
    // We should attach 'mousemove' to window and update the uniform manually?
    // Or just trust R3F `pointerEvents` prop on Canvas?
    // Let's add a global listener for safety.

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            // Normalize -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            mouse.set(x, y);
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, [mouse]);

    return null;
}
