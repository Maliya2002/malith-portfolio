import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

const AnimatedSphere = () => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = t * 0.1;
    ref.current.rotation.y = t * 0.15;
    ref.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <Sphere ref={ref} args={[1, 64, 64]} scale={1.8}>
      <MeshDistortMaterial
        color="#0066FF"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.08}
        emissive="#0066FF"
        emissiveIntensity={0.3}
      />
    </Sphere>
  );
};

const InnerSphere = () => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.rotation.x = -t * 0.2;
    ref.current.rotation.z = t * 0.1;
  });

  return (
    <Sphere ref={ref} args={[1, 32, 32]} scale={1.2}>
      <MeshDistortMaterial
        color="#8B5CF6"
        distort={0.6}
        speed={3}
        wireframe
        transparent
        opacity={0.1}
        emissive="#8B5CF6"
        emissiveIntensity={0.2}
      />
    </Sphere>
  );
};

const GlowingSphere = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.2} />
        <pointLight
          position={[5, 5, 5]}
          intensity={0.5}
          color="#0066FF"
        />
        <pointLight
          position={[-5, -5, -5]}
          intensity={0.3}
          color="#8B5CF6"
        />
        <AnimatedSphere />
        <InnerSphere />
      </Canvas>
    </div>
  );
};

export default GlowingSphere;