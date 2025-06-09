
import React, { useEffect, useState } from 'react';

interface FloatingShape {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
}

const InteractiveBackground = () => {
  const [shapes, setShapes] = useState<FloatingShape[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize floating shapes with consistent dark theme styling
  useEffect(() => {
    const generateShapes = () => {
      const newShapes: FloatingShape[] = [];
      for (let i = 0; i < 12; i++) {
        newShapes.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 80 + 30,
          speed: Math.random() * 0.3 + 0.1,
          opacity: Math.random() * 0.08 + 0.02,
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 0.3 + 0.05,
        });
      }
      setShapes(newShapes);
    };

    generateShapes();
    window.addEventListener('resize', generateShapes);
    return () => window.removeEventListener('resize', generateShapes);
  }, []);

  // Animate shapes
  useEffect(() => {
    const animateShapes = () => {
      setShapes(prevShapes =>
        prevShapes.map(shape => ({
          ...shape,
          y: shape.y > window.innerHeight + shape.size ? -shape.size : shape.y + shape.speed,
          rotation: shape.rotation + shape.rotationSpeed,
        }))
      );
    };

    const interval = setInterval(animateShapes, 60);
    return () => clearInterval(interval);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Main Background Gradient - Always dark theme */}
      <div className="absolute inset-0 transition-all duration-1000 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900" />
      
      {/* Subtle Pattern Overlay - Always dark theme */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating Geometric Shapes - Always dark theme */}
      {shapes.map(shape => (
        <div
          key={shape.id}
          className="absolute transition-all duration-500 bg-teal-400"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            opacity: shape.opacity,
            borderRadius: shape.id % 3 === 0 ? '50%' : shape.id % 3 === 1 ? '20%' : '8px',
            transform: `rotate(${shape.rotation}deg) scale(${
              1 + Math.sin(Date.now() * 0.001 + shape.id) * 0.15
            })`,
            boxShadow: `0 0 ${shape.size * 0.8}px rgba(45, 212, 191, 0.1)`,
          }}
        />
      ))}

      {/* Interactive Mouse Glow Effect - Always dark theme */}
      <div
        className="absolute w-80 h-80 rounded-full transition-all duration-300 pointer-events-none bg-gradient-radial from-teal-400/8 via-emerald-400/3 to-transparent"
        style={{
          left: mousePosition.x - 160,
          top: mousePosition.y - 160,
        }}
      />

      {/* Animated Overlay for Movement - Always dark theme */}
      <div 
        className="absolute inset-0 transition-all duration-[4000ms] bg-gradient-to-tr from-transparent via-teal-900/8 to-emerald-900/8"
        style={{
          transform: `translateX(${Math.sin(Date.now() * 0.0003) * 30}px) translateY(${Math.cos(Date.now() * 0.0002) * 20}px)`,
        }}
      />
    </div>
  );
};

export default InteractiveBackground;
