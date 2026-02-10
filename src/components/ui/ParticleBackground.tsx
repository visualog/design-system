import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// -----------------------------------------------------------------------------
// Shaders (Ported from React Native / Expo)
// -----------------------------------------------------------------------------

const vertexShader = `
#define PI 3.14159265359

uniform float uTime;
uniform vec2 uMouse;
uniform int uIconMode; // 0: none, 1: person, 2: lock
uniform float uFormationIntensity; // 0.0 ~ 1.0

attribute vec3 aOffset;
attribute float aRandom;
// attribute vec3 aIconTarget; // Replaced dynamically below for dual targets

varying vec2 vUv;
varying float vSize;
varying vec2 vPos;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

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
  
  // Initial position from attribute
  vec3 pos = aOffset;

  // 1. Fluid drift effect
  float driftSpeed = uTime * 0.15;
  // Reduce drift when forming icon
  float driftFactor = 1.0 - (uFormationIntensity * 0.9); 
  
  float dx = sin(driftSpeed + pos.y * 0.5) + sin(driftSpeed * 0.5 + pos.y * 2.0);
  float dy = cos(driftSpeed + pos.x * 0.5) + cos(driftSpeed * 0.5 + pos.x * 2.0);

  pos.x += dx * 0.25 * driftFactor;
  pos.y += dy * 0.25 * driftFactor;

  // 2. Icon Formation Logic (Placeholder for replacement)
  pos = mix(pos, vec3(0.0), uFormationIntensity); 

  // 3. Jellyfish Halo / Mouse Repulsion Effect
  vec2 relToMouse = pos.xy - uMouse;
  float distFromMouse = length(relToMouse);
  float angleToMouse = atan(relToMouse.y, relToMouse.x);

  float shapeFactor = noise(vec2(angleToMouse * 2.0, uTime * 0.1));
  float breathCycle = sin(uTime * 0.8);
  float currentRadius = 2.2 + breathCycle * 0.3 + (shapeFactor * 0.5);

  float dist = distFromMouse;
  float rimWidth = 1.8;
  float rimInfluence = smoothstep(rimWidth, 0.0, abs(dist - currentRadius));

  // Pulse/Push effect
  vec2 pushDir = normalize(relToMouse + vec2(0.0001, 0.0));
  float pushAmt = (breathCycle * 0.5 + 0.5) * 0.5;
  
  float formationLock = uFormationIntensity * 0.8; 
  pos.xy += pushDir * pushAmt * rimInfluence * (1.0 - formationLock);
  pos.z += rimInfluence * 0.3 * sin(uTime) * (1.0 - formationLock);

  // 4. Size & Scale Calculation
  float baseSize = 0.012 + (sin(uTime + pos.x) * 0.003);
  float activeSize = 0.055;
  float currentScale = baseSize + (rimInfluence * activeSize);
  
  // Scale up when forming icon
  currentScale = mix(currentScale, 0.04, uFormationIntensity * 0.5);
  
  float stretch = rimInfluence * 0.02;

  vec3 transformed = position; 
  transformed.x *= (currentScale + stretch);
  transformed.y *= currentScale * 0.85;

  vSize = rimInfluence;
  vPos = pos.xy;

  // Rotation
  float targetAngle = angleToMouse;
  transformed.xy = rotate2d(targetAngle) * transformed.xy;

  // Final Position
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos + transformed, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
uniform int uIconMode;
uniform float uFormationIntensity;

varying vec2 vUv;
varying float vSize;
varying vec2 vPos;

// 2025 Trend Colors
const vec3 mochaMousse = vec3(0.545, 0.451, 0.333);      // #8B7355
const vec3 softLavender = vec3(0.792, 0.714, 0.867);     // #C9B5DE
const vec3 dustyRose = vec3(0.831, 0.647, 0.647);        // #D4A5A5
const vec3 sageGreen = vec3(0.612, 0.686, 0.533);        // #9CAF88
const vec3 azureBlue = vec3(0.0, 0.506, 0.816);          // #0081CF
const vec3 peachyCream = vec3(0.961, 0.902, 0.827);      // #F5E6D3

void main() {
  vec2 center = vec2(0.5);
  vec2 pos = abs(vUv - center) * 2.0;
  float d = pow(pow(pos.x, 2.6) + pow(pos.y, 2.6), 1.0 / 2.6);
  float alpha = 1.0 - smoothstep(0.8, 1.0, d);

  if (alpha < 0.01) discard;

  // Dynamic Color Logic
  float t = uTime * 1.2;
  float p1 = sin(vPos.x * 0.8 + t);
  float p2 = sin(vPos.y * 0.8 + t * 0.8 + p1);

  vec3 activeColor;

  if (uIconMode == 1) {
    // Person: Lavender + Dusty Rose
    activeColor = mix(softLavender, dustyRose, p1 * 0.5 + 0.5);
    activeColor = mix(activeColor, mochaMousse, p2 * 0.5 + 0.5);
  } else if (uIconMode == 2) {
    // Lock: Azure Blue + Sage Green
    activeColor = mix(azureBlue, sageGreen, p1 * 0.5 + 0.5);
    activeColor = mix(activeColor, mochaMousse, p2 * 0.5 + 0.5);
  } else {
    // Default: Mixed subtle tones
    activeColor = mix(softLavender, azureBlue, p1 * 0.5 + 0.5);
    activeColor = mix(activeColor, sageGreen, p2 * 0.5 + 0.5);
    activeColor = mix(activeColor, peachyCream, 0.2); 
  }

  vec3 finalColor = mix(mochaMousse, activeColor, smoothstep(0.1, 0.8, vSize));
  
  float baseAlpha = mix(0.4, 0.95, vSize);
  baseAlpha = mix(baseAlpha, 0.9, uFormationIntensity * 0.8);
  
  float finalAlpha = alpha * baseAlpha;

  gl_FragColor = vec4(finalColor, finalAlpha);
}
`;

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

const createPersonIcon = () => {
    const positions: number[] = [];
    // Head (Circle)
    for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        positions.push(Math.cos(angle) * 1.8, Math.sin(angle) * 1.8 + 2.5, 0);
    }
    // Body (Shoulders/Torso)
    for (let x = -2.5; x <= 2.5; x += 0.5) {
        for (let y = -4; y <= -0.5; y += 0.5) {
            positions.push(x, y, 0);
        }
    }
    return positions;
};

const createLockIcon = () => {
    const positions: number[] = [];
    // Body (Rectangle)
    for (let x = -2.2; x <= 2.2; x += 0.5) {
        for (let y = -3.5; y <= 0; y += 0.5) {
            positions.push(x, y, 0);
        }
    }
    // Shackle (Arc)
    for (let i = 0; i <= 20; i++) {
        const angle = Math.PI - (i / 20) * Math.PI;
        positions.push(Math.cos(angle) * 2.2, Math.sin(angle) * 2.2 + 0.5, 0);
        positions.push(Math.cos(angle) * 1.5, Math.sin(angle) * 1.5 + 0.5, 0);
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

    // Grid config
    const countX = 100;
    const countY = 60;
    const count = countX * countY;

    const { viewport } = useThree();

    const { offsets, targetPerson, targetLock, randoms } = useMemo(() => {
        const offsetsArray = new Float32Array(count * 3);
        const randomsArray = new Float32Array(count);

        const gridWidth = 45;
        const gridHeight = 25;
        const jitter = 0.3;

        const personPositions = createPersonIcon();
        const lockPositions = createLockIcon();

        let i = 0;
        for (let y = 0; y < countY; y++) {
            for (let x = 0; x < countX; x++) {
                const i3 = i * 3;

                // 1. Grid Position (Base State)
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

        // Generate targets
        const tPerson = new Float32Array(count * 3);
        const tLock = new Float32Array(count * 3);

        for (let j = 0; j < count; j++) {
            tPerson[j * 3] = personPositions[(j * 3) % personPositions.length];
            tPerson[j * 3 + 1] = personPositions[(j * 3 + 1) % personPositions.length];
            tPerson[j * 3 + 2] = 0;

            tLock[j * 3] = lockPositions[(j * 3) % lockPositions.length];
            tLock[j * 3 + 1] = lockPositions[(j * 3 + 1) % lockPositions.length];
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
        let targetM = 0; // 0: none, 1: person, 2: lock
        if (focusState === 'id') targetM = 1;
        if (focusState === 'password') targetM = 2;

        const active = targetM !== 0;
        targetIntensity.current = active ? 0.9 : 0.0;
        currentIntensity.current = THREE.MathUtils.lerp(currentIntensity.current, targetIntensity.current, 0.05);

        // Update Uniforms
        material.uniforms.uTime.value = time;
        material.uniforms.uMouse.value.set(
            (state.mouse.x * viewport.width) / 2,
            (state.mouse.y * viewport.height) / 2
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

    // Custom Instanced Buffer Geometry
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

    // Dynamically constructed Vertex Shader
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
                blending={THREE.NormalBlending}
            />
        </instancedMesh>
    );
};

export const ParticleBackground: React.FC<{ focusState: 'none' | 'id' | 'password', className?: string }> = ({ focusState, className }) => {
    return (
        <div className={`absolute inset-0 -z-10 bg-[#F5E6D3] ${className}`}>
            <Canvas
                camera={{ position: [0, 0, 50], fov: 60 }}
                dpr={[1, 2]}
                gl={{ antialias: true, alpha: true }}
            >
                <ParticleSystem focusState={focusState} />
            </Canvas>
        </div>
    );
};
