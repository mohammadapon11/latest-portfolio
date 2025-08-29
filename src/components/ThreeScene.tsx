'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Float, Sparkles as ThreeSparkles } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from '@react-three/postprocessing';
import { Suspense, useState, useEffect, useRef } from 'react';

// Performance-optimized 3D scene
const ThreeScene = () => {
  const [isHighPerformance, setIsHighPerformance] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isIntersectionSupported, setIsIntersectionSupported] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect device performance and IntersectionObserver support
  useEffect(() => {
    // Check if IntersectionObserver is supported
    setIsIntersectionSupported('IntersectionObserver' in window);

    const checkPerformance = () => {
      const memory = (performance as Performance & { memory: { usedJSHeapSize: number; totalJSHeapSize: number; jsHeapSizeLimit: number } }).memory;
      const isHighEnd = memory && memory.usedJSHeapSize < 50 * 1024 * 1024; // Less than 50MB
      const isHighFPS = navigator.hardwareConcurrency && navigator.hardwareConcurrency > 4;
      setIsHighPerformance(Boolean(isHighEnd && isHighFPS));
    };

    checkPerformance();
    
    // If IntersectionObserver is not supported, show content immediately
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    // Recheck on visibility change
    let observer: IntersectionObserver | null = null;

    try {
      observer = new IntersectionObserver(
        ([entry]) => {
          setIsVisible(entry.isIntersecting);
        },
        { threshold: 0.1 }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
      }
    } catch (error) {
      console.warn('IntersectionObserver failed in ThreeScene:', error);
      // Fallback: show content immediately
      setIsVisible(true);
    }

    return () => {
      if (observer) {
        try {
          if (containerRef.current) {
            observer.unobserve(containerRef.current);
          }
          observer.disconnect();
        } catch (error) {
          console.warn('Error disconnecting observer in ThreeScene:', error);
        }
      }
    };
  }, []);

  // Don't render if not visible
  if (!isVisible) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-cyan-900/20 to-purple-900/20" />
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ 
          antialias: isHighPerformance, // Only enable on high-end devices
          powerPreference: "high-performance",
          stencil: false,
          depth: false,
          alpha: false,
          premultipliedAlpha: false,
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
        dpr={isHighPerformance ? [1, 2] : [0.75, 1.5]} // Lower DPR on low-end devices
        performance={{ min: isHighPerformance ? 0.5 : 0.3 }} // Lower threshold on low-end
        frameloop="demand" // Only render when needed
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.toneMapping = 2; // ACESFilmicToneMapping
          gl.toneMappingExposure = 1;
          gl.outputColorSpace = 'srgb';
        }}
      >
        <Suspense fallback={null}>
          {/* Optimized lighting */}
          <ambientLight intensity={0.1} />
          <directionalLight position={[10, 10, 5]} intensity={0.3} />
          <pointLight position={[-10, -10, -10]} intensity={0.2} color="#8b5cf6" />
          
          {/* Reduced floating elements based on performance */}
          {isHighPerformance ? (
            <>
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
            </>
          ) : null}

          {/* Central sphere - always rendered */}
          <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.1}>
            <Sphere args={[0.8, isHighPerformance ? 16 : 12, isHighPerformance ? 16 : 12]} position={[0, 0, 0]}>
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

          {/* Adaptive particle count */}
          <ThreeSparkles
            count={isHighPerformance ? 50 : 25}
            scale={8}
            size={1.5}
            speed={0.2}
            color="#6366f1"
          />

          {/* Conditional effects based on performance */}
          {isHighPerformance && (
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} intensity={0.3} />
              <ChromaticAberration offset={[0.001, 0.001]} />
              <Vignette darkness={0.2} />
            </EffectComposer>
          )}
          
          {/* Optimized controls */}
          <OrbitControls 
            enableZoom={false} 
            autoRotate 
            autoRotateSpeed={0.3}
            enablePan={false}
            enableDamping={true}
            dampingFactor={0.05}
            maxPolarAngle={Math.PI}
            minPolarAngle={0}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
