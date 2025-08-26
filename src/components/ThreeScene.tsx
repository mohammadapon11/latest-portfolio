'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Sparkles as ThreeSparkles } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { Suspense } from 'react';

// Simplified 3D scene for better performance
const ThreeScene = () => {
  return (
    <Canvas 
      camera={{ position: [0, 0, 8], fov: 75 }}
      gl={{ 
        antialias: false, // Disable antialiasing for better performance
        powerPreference: "high-performance",
        stencil: false,
        depth: false
      }}
      dpr={[1, 2]} // Limit device pixel ratio
      performance={{ min: 0.5 }} // Lower performance threshold
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.1} />
        <directionalLight position={[10, 10, 5]} intensity={0.3} />
        <pointLight position={[-10, -10, -10]} intensity={0.2} color="#8b5cf6" />
        
        {/* Reduced number of floating shapes */}
        <Float speed={1} rotationIntensity={0.3} floatIntensity={0.3}>
          <mesh position={[-2, 1, 0]}>
            <octahedronGeometry args={[0.3, 0]} />
            <meshStandardMaterial color="#6366f1" wireframe />
          </mesh>
        </Float>
        
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
          <mesh position={[2, -1, 0]}>
            <icosahedronGeometry args={[0.25, 0]} />
            <meshStandardMaterial color="#8b5cf6" wireframe />
          </mesh>
        </Float>

        {/* Simplified central sphere */}
        <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
          <Sphere args={[0.8, 16, 16]} position={[0, 0, 0]}>
            <MeshDistortMaterial
              color="#06b6d4"
              attach="material"
              distort={0.3}
              speed={1}
              roughness={0}
              metalness={0.6}
              transparent
              opacity={0.5}
            />
          </Sphere>
        </Float>

        {/* Reduced particle count */}
        <ThreeSparkles
          count={50} // Reduced from 100
          scale={8}
          size={1.5}
          speed={0.2}
          color="#6366f1"
        />

        {/* Simplified effects */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} intensity={0.3} />
          <ChromaticAberration offset={[0.001, 0.001]} />
          <Vignette darkness={0.2} />
        </EffectComposer>
        
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.3} // Reduced speed
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Suspense>
    </Canvas>
  );
};

export default ThreeScene;
