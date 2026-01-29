import { useEffect, useRef } from 'react';
import anime from 'animejs';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  type?: 'chars' | 'words';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
}

const AnimatedText = ({
  text,
  className = '',
  delay = 0,
  stagger = 50,
  type = 'chars',
  as: Component = 'span',
}: AnimatedTextProps) => {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const targets = type === 'chars' 
      ? containerRef.current.querySelectorAll('.animated-char')
      : containerRef.current.querySelectorAll('.animated-word');

    anime({
      targets,
      translateY: [100, 0],
      opacity: [0, 1],
      delay: anime.stagger(stagger, { start: delay }),
      duration: 800,
      easing: 'easeOutExpo',
    });
  }, [delay, stagger, type]);

  const elements = type === 'chars' 
    ? text.split('').map((char, i) => (
        <span
          key={i}
          className="animated-char inline-block opacity-0"
          style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </span>
      ))
    : text.split(/(\s+)/).map((word, i) => (
        <span
          key={i}
          className="animated-word inline-block opacity-0 hover:text-cyan transition-colors duration-200"
          style={{ whiteSpace: word.trim() === '' ? 'pre' : 'normal' }}
        >
          {word}
        </span>
      ));

  return (
    <Component ref={containerRef as any} className={className}>
      {elements}
    </Component>
  );
};

export default AnimatedText;
