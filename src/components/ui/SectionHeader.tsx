import ScrollReveal from './ScrollReveal';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

const SectionHeader = ({ 
  title, 
  subtitle, 
  align = 'center',
  className = '' 
}: SectionHeaderProps) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  
  return (
    <ScrollReveal className={`mb-16 ${alignClass} ${className}`}>
      <h2 className="text-4xl sm:text-5xl lg:text-6xl font-clash font-bold gradient-text">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
      <div className={`mt-4 w-24 h-1 bg-gradient-to-r from-purple to-pink rounded-full ${
        align === 'center' ? 'mx-auto' : ''
      }`} />
    </ScrollReveal>
  );
};

export default SectionHeader;
