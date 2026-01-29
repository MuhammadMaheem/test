import { useEffect, useRef, Suspense, lazy } from 'react';
import anime from 'animejs';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import AnimatedText from '../components/ui/AnimatedText';

// Lazy load the 3D component for better performance
const NeuralNetwork3D = lazy(() => import('../components/NeuralNetwork3D'));

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = anime.timeline({ easing: 'easeOutExpo' });

    // Animate greeting
    tl.add({
      targets: '.hero-greeting',
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 800,
    })
    // Animate role
    .add({
      targets: '.hero-role',
      translateX: [-50, 0],
      opacity: [0, 1],
      duration: 800,
    }, '-=400')
    // Animate description
    .add({
      targets: '.hero-description',
      translateY: [30, 0],
      opacity: [0, 1],
      duration: 800,
    }, '-=400')
    // Animate CTA buttons
    .add({
      targets: '.hero-cta',
      translateY: [30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
    }, '-=400')
    // Animate social links
    .add({
      targets: '.hero-social',
      translateX: [-30, 0],
      opacity: [0, 1],
      delay: anime.stagger(100),
      duration: 600,
    }, '-=400')
    // Animate profile image
    .add({
      targets: '.hero-image',
      scale: [0.8, 1],
      opacity: [0, 1],
      rotateY: [30, 0],
      duration: 1200,
    }, '-=1000')
    // Animate floating elements
    .add({
      targets: '.hero-float',
      translateY: [20, 0],
      opacity: [0, 1],
      delay: anime.stagger(200),
      duration: 800,
    }, '-=800');

    // Continuous floating animation for image
    anime({
      targets: '.hero-image',
      translateY: [-10, 10],
      duration: 3000,
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutSine',
    });

    // Mouse parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current || !textRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      anime({
        targets: imageRef.current,
        rotateY: xPercent * 10,
        rotateX: -yPercent * 10,
        duration: 500,
        easing: 'easeOutQuad',
      });

      anime({
        targets: textRef.current,
        translateX: xPercent * -10,
        translateY: yPercent * -10,
        duration: 500,
        easing: 'easeOutQuad',
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center section-padding pt-20 lg:pt-0 overflow-hidden"
    >
      {/* 3D Neural Network Background */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-purple/30 border-t-purple rounded-full animate-spin" />
          </div>
        }>
          <NeuralNetwork3D className="w-full h-full" />
        </Suspense>
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark z-[1]" />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div ref={textRef} className="order-2 lg:order-1 perspective-1000">
            <p className="hero-greeting text-cyan font-medium mb-4 opacity-0">
              Hello, I&apos;m
            </p>
            
            <div className="mb-4 overflow-hidden">
              <AnimatedText
                text="Muhammad Maheem"
                type="chars"
                as="h1"
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-clash font-bold gradient-text"
                delay={200}
                stagger={40}
              />
            </div>
            
            <div className="hero-role text-xl sm:text-2xl lg:text-3xl font-clash font-semibold text-white/90 mb-6 opacity-0">
              <span className="text-purple">AI Engineer</span>
              <span className="text-white/50 mx-3">&</span>
              <span className="text-pink">Creative Developer</span>
            </div>
            
            <p className="hero-description text-base lg:text-lg text-white/60 max-w-xl mb-8 opacity-0">
              I craft intelligent systems and immersive web experiences. 
              Passionate about bridging the gap between artificial intelligence 
              and human creativity through cutting-edge deep learning solutions.
            </p>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <button
                onClick={scrollToProjects}
                className="hero-cta group relative overflow-hidden px-8 py-3 rounded-full bg-gradient-to-r from-purple to-pink text-white font-medium opacity-0 focus:outline-none focus:ring-2 focus:ring-purple/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore My Work
                  <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink to-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="hero-cta px-8 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors duration-300 opacity-0 focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                Get In Touch
              </a>
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://github.com/MuhammadMaheem"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social group p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-purple/50 hover:bg-purple/10 transition-all duration-300 opacity-0 focus:outline-none focus:ring-2 focus:ring-purple/50"
                aria-label="GitHub Profile"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-maheem-453369245/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-social group p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-cyan/50 hover:bg-cyan/10 transition-all duration-300 opacity-0 focus:outline-none focus:ring-2 focus:ring-cyan/50"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:mirza.muhammad.maheem@gmail.com"
                className="hero-social group p-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-pink/50 hover:bg-pink/10 transition-all duration-300 opacity-0 focus:outline-none focus:ring-2 focus:ring-pink/50"
                aria-label="Send Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end perspective-1000">
            <div
              ref={imageRef}
              className="hero-image relative preserve-3d opacity-0"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple via-pink to-cyan rounded-full blur-3xl opacity-30 scale-110 animate-pulse" />
              
              {/* Neural ring decoration */}
              <div className="absolute inset-0 -m-8">
                <svg className="w-full h-full animate-rotate-slow" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="95"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="0.5"
                    strokeDasharray="10 5"
                    opacity="0.5"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7B61FF" />
                      <stop offset="50%" stopColor="#FF61D2" />
                      <stop offset="100%" stopColor="#00D9FF" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Image container */}
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-2 border-white/10 glow-purple">
                <img
                  src="/hero-profile.jpg"
                  alt="Muhammad Maheem - AI Engineer"
                  loading="eager"
                  className="w-full h-full object-cover"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple/20 to-transparent" />
              </div>
              
              {/* Floating badges */}
              <div className="hero-float absolute -top-4 -right-4 px-4 py-2 rounded-full glass-card text-sm font-medium text-cyan opacity-0">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                  Available for Work
                </span>
              </div>
              
              <div className="hero-float absolute -bottom-4 -left-4 px-4 py-2 rounded-full glass-card text-sm font-medium text-purple opacity-0">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple animate-pulse" />
                  AI Engineer
                </span>
              </div>
              
              <div className="hero-float absolute top-1/2 -right-8 px-4 py-2 rounded-full glass-card text-sm font-medium text-pink opacity-0">
                <span>4th Semester</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 z-10">
        <span className="text-xs text-white/40">Scroll to explore</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2">
          <div className="w-1.5 h-3 rounded-full bg-white/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
