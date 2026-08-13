import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// Floating Shape
const FloatingShape = ({ position, color, speed, size, shape }) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x = Math.sin(t) * 0.5;
    ref.current.rotation.y = Math.cos(t) * 0.5;
    ref.current.rotation.z = Math.sin(t * 0.5) * 0.3;
    ref.current.position.y =
      position[1] + Math.sin(t) * 0.3;
  });

  const getGeometry = () => {
    switch (shape) {
      case "torus":
        return <torusGeometry args={[size, size * 0.4, 16, 32]} />;
      case "octahedron":
        return <octahedronGeometry args={[size]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[size]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[size, size * 0.3, 64, 16]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[size]} />;
      default:
        return <icosahedronGeometry args={[size]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={ref} position={position}>
        {getGeometry()}
        <meshStandardMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
          emissive={color}
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
};

// Particle Ring
const ParticleRing = () => {
  const ref = useRef();
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3 + Math.random() * 0.5;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 0.5;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y =
      state.clock.getElapsedTime() * 0.05;
    ref.current.rotation.x =
      Math.sin(state.clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#0066FF"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// DNA Helix
const DNAHelix = () => {
  const ref = useRef();
  const count = 100;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 4;
      const strand = i % 2 === 0 ? 1 : -1;
      pos[i * 3] = Math.cos(t) * 0.3 * strand;
      pos[i * 3 + 1] = (i / count) * 4 - 2;
      pos[i * 3 + 2] = Math.sin(t) * 0.3 * strand;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y =
      state.clock.getElapsedTime() * 0.2;
  });

  return (
    <points ref={ref} position={[4, 0, -2]}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#8B5CF6"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
};

// Mouse Light
const MouseLight = () => {
  const light = useRef();

  useFrame((state) => {
    light.current.position.x = state.mouse.x * 5;
    light.current.position.y = state.mouse.y * 3;
  });

  return (
    <pointLight
      ref={light}
      intensity={0.5}
      color="#0066FF"
      distance={8}
    />
  );
};

// Main Scene
const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        {/* Lights */}
        <ambientLight intensity={0.1} />
        <MouseLight />
        <pointLight
          position={[10, 10, 10]}
          intensity={0.2}
          color="#0066FF"
        />
        <pointLight
          position={[-10, -10, -10]}
          intensity={0.1}
          color="#8B5CF6"
        />

        {/* Stars */}
        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />

        {/* Floating Shapes */}
        <FloatingShape
          position={[-3, 1, -2]}
          color="#0066FF"
          speed={0.3}
          size={0.4}
          shape="torus"
        />
        <FloatingShape
          position={[3, -1, -3]}
          color="#8B5CF6"
          speed={0.4}
          size={0.3}
          shape="octahedron"
        />
        <FloatingShape
          position={[-2, -1.5, -1]}
          color="#EC4899"
          speed={0.35}
          size={0.25}
          shape="icosahedron"
        />
        <FloatingShape
          position={[2, 2, -4]}
          color="#06B6D4"
          speed={0.25}
          size={0.35}
          shape="torusKnot"
        />
        <FloatingShape
          position={[0, -2, -2]}
          color="#F59E0B"
          speed={0.45}
          size={0.2}
          shape="dodecahedron"
        />
        <FloatingShape
          position={[-4, 0, -3]}
          color="#10B981"
          speed={0.3}
          size={0.3}
          shape="torus"
        />
        <FloatingShape
          position={[4, 1.5, -2]}
          color="#0066FF"
          speed={0.35}
          size={0.25}
          shape="octahedron"
        />

        {/* Particles */}
        <ParticleRing />
        <DNAHelix />
      </Canvas>
    </div>
  );
};

export default Scene3D;