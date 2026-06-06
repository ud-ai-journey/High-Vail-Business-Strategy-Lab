import React, { useEffect, useRef } from 'react';

interface BackgroundCanvasProps {
  scrollZ: number;
  scrollVelocity: number;
}

export default function BackgroundCanvas({ scrollZ, scrollVelocity }: BackgroundCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      mouseRef.current.targetX = (e.clientX - width / 2) / (width / 2);
      mouseRef.current.targetY = (e.clientY - height / 2) / (height / 2);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create luxury particles (soft gold, deep grey stars)
    const particleCount = 180;
    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      color: string;
      speedZ: number;
      phi: number;
      speedPhi: number;
    }> = [];

    const goldColors = [
      'rgba(198, 166, 107, 0.45)', // Accent Gold
      'rgba(212, 175, 55, 0.55)',  // luxury Gold
      'rgba(255, 255, 255, 0.35)', // Soft white
      'rgba(198, 166, 107, 0.25)',
      'rgba(255, 255, 255, 0.15)',
    ];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * 1500,
        y: (Math.random() - 0.5) * 1500,
        z: Math.random() * 2000,
        size: Math.random() * 2 + 0.8,
        color: goldColors[Math.floor(Math.random() * goldColors.length)],
        speedZ: Math.random() * 1.5 + 0.5,
        phi: Math.random() * Math.PI * 2,
        speedPhi: (Math.random() - 0.5) * 0.005,
      });
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      // Smooth mouse damping
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Dark background with subtle gradient
      ctx.fillStyle = '#050505';
      ctx.fillRect(0, 0, width, height);

      // Create a soft glowing center
      const gradient = ctx.createRadialGradient(
        width / 2 + mouse.x * 50,
        height / 2 + mouse.y * 50,
        0,
        width / 2 + mouse.x * 50,
        height / 2 + mouse.y * 50,
        width * 0.8
      );
      gradient.addColorStop(0, 'rgba(25, 22, 16, 0.4)'); // Amber glow middle
      gradient.addColorStop(0.3, 'rgba(8, 8, 8, 0.8)');
      gradient.addColorStop(1, '#050505');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Subtle dynamic tunnel lines
      ctx.strokeStyle = 'rgba(198, 166, 107, 0.03)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      // Draw 3-4 subtle rings indicating tunnel depth
      for (let r = 1; r <= 4; r++) {
        const radius = (width * 0.2 * r + scrollZ * 0.05) % (width * 0.8);
        if (radius > 10) {
          ctx.arc(
            width / 2 + mouse.x * (50 * (5 - r)),
            height / 2 + mouse.y * (50 * (5 - r)),
            radius,
            0,
            Math.PI * 2
          );
        }
      }
      ctx.stroke();

      // Draw gold luxury particles
      particles.forEach((p) => {
        // Boost speed when scrolling
        const currentSpeed = p.speedZ + Math.abs(scrollVelocity) * 1.8;
        p.z -= currentSpeed;
        p.phi += p.speedPhi;

        // Orbit drift slightly to look elegant
        p.x += Math.sin(p.phi) * 0.2;

        // If particle moves behind camera, recycle it to the back
        if (p.z <= 1) {
          p.z = 2000;
          p.x = (Math.random() - 0.5) * 1500;
          p.y = (Math.random() - 0.5) * 1500;
        }

        // Project 3D onto 2D screen
        const fov = 350;
        const scale = fov / (p.z + 1);
        const mouseShiftX = (mouse.x * 120 * (1 - p.z / 2000));
        const mouseShiftY = (mouse.y * 120 * (1 - p.z / 2000));
        const px = width / 2 + p.x * scale + mouseShiftX;
        const py = height / 2 + p.y * scale + mouseShiftY;

        // Draw particle if within viewport bounds
        if (px >= 0 && px <= width && py >= 0 && py <= height) {
          const alphaMultiplier = Math.min(1, (2000 - p.z) / 400) * Math.min(1, p.z / 200);
          ctx.beginPath();
          ctx.arc(px, py, p.size * scale * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = alphaMultiplier;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;

      // Draw elegant business constellation connections for nearby center stars
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.05)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < 30; i++) {
        for (let j = i + 1; j < 30; j++) {
          const pi = particles[i];
          const pj = particles[j];
          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dz = pi.z - pj.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 180) {
            const fov = 350;
            const scaleI = fov / (pi.z + 1);
            const scaleJ = fov / (pj.z + 1);
            const pix = width / 2 + pi.x * scaleI + mouse.x * 30;
            const piy = height / 2 + pi.y * scaleI + mouse.y * 30;
            const pjx = width / 2 + pj.x * scaleJ + mouse.x * 30;
            const pjy = height / 2 + pj.y * scaleJ + mouse.y * 30;

            const alpha = (1 - dist / 180) * 0.12 * Math.min(1, pi.z / 400) * Math.min(1, pj.z / 400);
            ctx.globalAlpha = alpha;
            ctx.moveTo(pix, piy);
            ctx.lineTo(pjx, pjy);
          }
        }
      }
      ctx.stroke();
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [scrollZ, scrollVelocity]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
}
