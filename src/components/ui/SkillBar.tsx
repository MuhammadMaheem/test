import { useEffect, useRef, useState } from 'react';
import anime from 'animejs';

interface SkillBarProps {
  name: string;
  level: number;
  delay?: number;
  color?: 'purple' | 'pink' | 'cyan' | 'gradient';
}

const colorClasses = {
  purple: 'from-purple to-purple-dark',
  pink: 'from-pink to-pink-dark',
  cyan: 'from-cyan to-cyan-dark',
  gradient: 'from-purple via-pink to-cyan',
};

const SkillBar = ({ 
  name, 
  level, 
  delay = 0,
  color = 'gradient' 
}: SkillBarProps) => {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            
            if (barRef.current) {
              anime({
                targets: barRef.current,
                width: `${level}%`,
                duration: 1000,
                delay,
                easing: 'easeOutExpo',
              });
            }

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (barRef.current?.parentElement) {
      observer.observe(barRef.current.parentElement);
    }

    return () => observer.disconnect();
  }, [level, delay, isVisible]);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-white/80">{name}</span>
        <span className={`text-sm font-medium transition-colors duration-300 ${
          isVisible ? 'text-cyan' : 'text-white/50'
        }`}>
          {level}%
        </span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          ref={barRef}
          className={`h-full rounded-full bg-gradient-to-r ${colorClasses[color]}`}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
};

export default SkillBar;
