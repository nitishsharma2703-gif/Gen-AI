import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";
// 3D Boy Model Component
function BoyModel({ rotationY }) {
  const groupRef = useRef();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005; // Auto-rotation
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Head */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#E8B4A4" metalness={0.1} />
      </mesh>

      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[0.6, 1, 0.4]} />
        <meshStandardMaterial color="#3B82F6" metalness={0.2} />
      </mesh>

      {/* Left Arm */}
      <mesh position={[-0.5, 1, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.25]} />
        <meshStandardMaterial color="#E8B4A4" metalness={0.1} />
      </mesh>

      {/* Right Arm */}
      <mesh position={[0.5, 1, 0]}>
        <boxGeometry args={[0.3, 0.8, 0.25]} />
        <meshStandardMaterial color="#E8B4A4" metalness={0.1} />
      </mesh>

      {/* Left Leg */}
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.3]} />
        <meshStandardMaterial color="#2D3748" metalness={0.15} />
      </mesh>

      {/* Right Leg */}
      <mesh position={[0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.8, 0.3]} />
        <meshStandardMaterial color="#2D3748" metalness={0.15} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.15, 1.7, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      <mesh position={[0.15, 1.7, 0.4]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
    </group>
  );
}

// 3D Modal Component
export default function Model3D({ onStartClick }) {
  const canvasRef = useRef();
  const [autoRotate, setAutoRotate] = useState(true);
  const rotationYRef = useRef(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const navigate = useNavigate();
  
  const handleNewChat = () => {
  navigate("/"); // or your chat route
};

  const rotateLeft = () => {
    setAutoRotate(false);
    rotationYRef.current -= Math.PI / 4; // Rotate 45 degrees left
  };

  const rotateRight = () => {
    setAutoRotate(false);
    rotationYRef.current += Math.PI / 4; // Rotate 45 degrees right
  };

  const toggleFullScreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    setIsFullScreen(true);
  } else {
    document.exitFullscreen();
    setIsFullScreen(false);
  }
};

  const handleAskAnything = () => {
    if (onStartClick) {
      onStartClick();
    } else {
      setAutoRotate(!autoRotate);
    }
  };

  return (
    <div className="relative w-full h-screen align it bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center overflow-hidden">
      
      {/* Scene */}
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 0, 5], fov: 50 }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.2} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        
        {/* Environment */}
        <Environment preset="night" background blur={0.8} />

        {/* 3D Model */}
        <BoyModel rotationY={rotationYRef.current} />

        {/* Lights and background elements */}
        <Sphere args={[50, 64, 64]} position={[0, 0, 0]}>
          <meshBasicMaterial
            color="#1a1a2e"
            side={THREE.BackSide}
          />
        </Sphere>
      </Canvas>


     



      {/* Floating Particles Effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-cyan-400 rounded-full opacity-20"
            style={{
              width: Math.random() * 100 + 50 + "px",
              height: Math.random() * 100 + 50 + "px",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              animation: `float ${5 + Math.random() * 10}s infinite`,
              filter: "blur(40px)",
            }}
          />
        ))}
      </div>

      {/* Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px);
            opacity: 0.3;
          }
        }

        @keyframes fadeInUp {
          from {
            transform: translateY(16px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out both;
        }
      `}</style>
    </div>
  );
}
