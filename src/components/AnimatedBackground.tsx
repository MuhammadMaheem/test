import { useEffect, useRef } from 'react';
import anime from 'animejs';

const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    color: string;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const particleCount = 50;
    const colors = ['#7B61FF', '#FF61D2', '#00D9FF'];
    
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let animationId: number;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 15, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(123, 97, 255, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Animate gradient blobs
    anime({
      targets: '.blob-1',
      translateX: [0, 100, -50, 0],
      translateY: [0, -80, 40, 0],
      scale: [1, 1.2, 0.9, 1],
      duration: 15000,
      easing: 'easeInOutSine',
      loop: true,
    });

    anime({
      targets: '.blob-2',
      translateX: [0, -80, 60, 0],
      translateY: [0, 60, -40, 0],
      scale: [1, 0.9, 1.1, 1],
      duration: 18000,
      easing: 'easeInOutSine',
      loop: true,
    });

    anime({
      targets: '.blob-3',
      translateX: [0, 60, -80, 0],
      translateY: [0, -40, 60, 0],
      scale: [1, 1.1, 0.8, 1],
      duration: 20000,
      easing: 'easeInOutSine',
      loop: true,
    });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Canvas for particles */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.6 }}
      />
      
      {/* Gradient blobs */}
      <div
        className="blob-1 absolute -top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #7B61FF 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="blob-2 absolute top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #FF61D2 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="blob-3 absolute -bottom-1/4 left-1/3 w-[550px] h-[550px] rounded-full opacity-20"
        style={{
          background: 'radial-gradient(circle, #00D9FF 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(123, 97, 255, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(123, 97, 255, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />
    </div>
  );
};

export default AnimatedBackground;
