import React, { useEffect, useRef } from 'react';

export default function ScienceCanvas3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle system
    const particleCount = Math.min(Math.floor(width / 18), 70);
    const particles = [];

    const colors = ['#00F5D4', '#3B82F6', '#8B5CF6', '#64748B'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    // Mouse interaction
    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      angle += 0.008;

      // 3D Orbit Atom Center Visual
      const atomX = width > 768 ? width * 0.72 : width * 0.5;
      const atomY = height > 768 ? height * 0.42 : height * 0.35;
      const baseRadius = width > 768 ? 140 : 90;

      // Draw Nucleus Glow
      const grad = ctx.createRadialGradient(atomX, atomY, 5, atomX, atomY, 45);
      grad.addColorStop(0, 'rgba(0, 245, 212, 0.9)');
      grad.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(atomX, atomY, 50, 0, Math.PI * 2);
      ctx.fill();

      // Draw 3D Orbits
      for (let ring = 0; ring < 3; ring++) {
        ctx.save();
        ctx.translate(atomX, atomY);
        ctx.rotate(angle * (ring % 2 === 0 ? 1 : -1.2) + (ring * Math.PI) / 3);

        ctx.beginPath();
        ctx.ellipse(0, 0, baseRadius, baseRadius * 0.35, angle * 0.5, 0, Math.PI * 2);
        ctx.strokeStyle = ring === 0 ? 'rgba(0, 245, 212, 0.35)' : ring === 1 ? 'rgba(59, 130, 246, 0.35)' : 'rgba(139, 92, 246, 0.35)';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([8, 6]);
        ctx.stroke();

        // Orbiting Electron
        const eAngle = angle * 2.5 + ring * 2;
        const ex = Math.cos(eAngle) * baseRadius;
        const ey = Math.sin(eAngle) * (baseRadius * 0.35);

        ctx.beginPath();
        ctx.arc(ex, ey, ring === 0 ? 5 : 4, 0, Math.PI * 2);
        ctx.fillStyle = ring === 0 ? '#00F5D4' : ring === 1 ? '#3B82F6' : '#8B5CF6';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = 12;
        ctx.fill();

        ctx.restore();
      }

      // Draw floating background particles & connecting lines
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(0, 245, 212, 0.08)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
