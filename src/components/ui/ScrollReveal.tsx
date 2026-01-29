import { useEffect, useRef, type ReactNode } from 'react';
import anime from 'animejs';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'fadeIn';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const animations = {
  fadeUp: { translateY: [60, 0], opacity: [0, 1] },
  fadeLeft: { translateX: [-60, 0], opacity: [0, 1] },
  fadeRight: { translateX: [60, 0], opacity: [0, 1] },
  scale: { scale: [0.8, 1], opacity: [0, 1] },
  fadeIn: { opacity: [0, 1] },
};

const ScrollReveal = ({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  duration = 800,
  threshold = 0.1,
}: ScrollRevealProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            anime({
              targets: element,
              ...animations[animation],
              duration,
              delay,
              easing: 'easeOutExpo',
            });

            observer.unobserve(element);
          }
        });
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [animation, delay, duration, threshold]);

  return (
    <div ref={elementRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
};

export default ScrollReveal;
