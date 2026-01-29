import { useState, useRef, useEffect } from 'react';
import anime from 'animejs';
import type { LucideIcon } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  shortDescription: string;
  image: string;
  icon: LucideIcon;
  technologies: string[];
  color: string;
  onClick: () => void;
  index: number;
}

const ProjectCard = ({
  title,
  shortDescription,
  image,
  icon: Icon,
  technologies,
  color,
  onClick,
  index,
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: cardRef.current,
              translateY: [80, 0],
              opacity: [0, 1],
              delay: index * 100,
              duration: 800,
              easing: 'easeOutExpo',
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [index]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        scale: 1.02,
        duration: 300,
        easing: 'easeOutQuad',
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (cardRef.current) {
      anime({
        targets: cardRef.current,
        scale: 1,
        duration: 300,
        easing: 'easeOutQuad',
      });
    }
  };

  return (
    <div
      ref={cardRef}
      className="group relative opacity-0 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${title} project details`}
    >
      <div className="relative h-full rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-500">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent opacity-80" />
          
          {/* Icon badge */}
          <div className={`absolute top-4 left-4 p-2 rounded-lg bg-gradient-to-br ${color}`}>
            <Icon size={20} className="text-white" />
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-clash font-semibold text-white mb-2 group-hover:text-cyan transition-colors">
            {title}
          </h3>
          <p className="text-sm text-white/60 line-clamp-2">
            {shortDescription}
          </p>
          
          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70"
              >
                {tech}
              </span>
            ))}
            {technologies.length > 3 && (
              <span className="px-2 py-1 text-xs rounded-full bg-white/10 text-white/70">
                +{technologies.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Hover overlay */}
        <div 
          className={`absolute inset-0 bg-purple/10 transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} 
        />
      </div>
    </div>
  );
};

export default ProjectCard;
