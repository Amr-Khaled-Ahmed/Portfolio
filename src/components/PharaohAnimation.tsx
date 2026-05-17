import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Mesh } from 'three';

// Eye pupil - rotating and pulsing
const EyePupil = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
      const scale = 1 + Math.sin(Date.now() * 0.002) * 0.1;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.2]}>
      <sphereGeometry args={[0.8, 64, 64]} />
      <meshPhongMaterial
        color="#FFD700"
        emissive="#FFA500"
        shininess={200}
      />
    </mesh>
  );
};

// Eye iris with detail
const EyeIris = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= 0.005;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.25]}>
      <cylinderGeometry args={[0.5, 0.5, 0.2, 64]} />
      <meshPhongMaterial
        color="#D4AF37"
        emissive="#8B7500"
        shininess={150}
      />
    </mesh>
  );
};

// Outer eye glow
const EyeGlow = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.003;
      const opacity = 0.3 + Math.sin(Date.now() * 0.003) * 0.2;
      if (meshRef.current.material && typeof meshRef.current.material === 'object') {
        (meshRef.current.material as any).opacity = opacity;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.1]}>
      <torusGeometry args={[2, 0.3, 8, 64]} />
      <meshPhongMaterial
        color="#FFD700"
        emissive="#FFB700"
        shininess={100}
        transparent
        opacity={0.6}
      />
    </mesh>
  );
};

// Hieroglyphic symbols orbiting
const HieroglyphSymbol = ({ position, rotation }: { position: [number, number, number], rotation: number }) => {
  const groupRef = useRef<any>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.002;
      groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <mesh rotation={[rotation, 0, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.1]} />
        <meshPhongMaterial
          color="#D4AF37"
          emissive="#B8960A"
          shininess={120}
        />
      </mesh>
    </group>
  );
};

// Rotating hieroglyphic ring
const HieroglyphRing = () => {
  const groupRef = useRef<any>(null);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.003;
    }
  });

  const symbols = Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2;
    const radius = 3.5;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    return { x, y, index: i, angle };
  });

  return (
    <group ref={groupRef}>
      {symbols.map((symbol) => (
        <HieroglyphSymbol
          key={symbol.index}
          position={[symbol.x, symbol.y, 0]}
          rotation={symbol.angle}
        />
      ))}
    </group>
  );
};

// Inner sacred geometry ring
const InnerRing = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z -= 0.004;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.05]}>
      <torusGeometry args={[1.3, 0.15, 8, 64]} />
      <meshPhongMaterial
        color="#FFD700"
        emissive="#DAA520"
        shininess={150}
      />
    </mesh>
  );
};

// Middle sacred geometry ring
const MiddleRing = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.0025;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.08]}>
      <torusGeometry args={[1.7, 0.1, 8, 64]} />
      <meshPhongMaterial
        color="#D4AF37"
        emissive="#8B7500"
        shininess={100}
      />
    </mesh>
  );
};

// Scene setup
const Scene = () => {
  const { camera } = useThree();

  React.useEffect(() => {
    camera.position.z = 6;
    camera.position.y = 0;
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.8} color="#D4AF37" />
      <pointLight position={[5, 5, 5]} intensity={1.3} color="#FFD700" />
      <pointLight position={[-5, -5, 3]} intensity={0.7} color="#8B7500" />
      <pointLight position={[0, 0, 3]} intensity={1.0} color="#FFB700" />

      {/* Inner rings - sacred geometry */}
      <InnerRing />
      <MiddleRing />

      {/* Eye of Pharaoh */}
      <EyeGlow />
      <EyeIris />
      <EyePupil />

      {/* Outer hieroglyphic ring */}
      <HieroglyphRing />
    </>
  );
};

// Main Eye of Pharaoh Animation - Background Version
export default function PharaohAnimationBg() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas>
        <color attach="background" args={['#0a0e1a']} />
        <Scene />
      </Canvas>
    </div>
  );
}

