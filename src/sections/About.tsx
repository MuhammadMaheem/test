import { useRef, useEffect } from 'react';
import anime from 'animejs';
import { MapPin, GraduationCap, Calendar, Sparkles } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import ScrollReveal from '../components/ui/ScrollReveal';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate image
            anime({
              targets: '.about-image',
              scale: [0.9, 1],
              opacity: [0, 1],
              duration: 1200,
              easing: 'easeOutExpo',
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const description = `I'm a passionate AI Engineering student at Superior University, currently in my 4th semester. My journey in technology began with a curiosity about how machines can learn and evolve. Today, I specialize in creating intelligent systems that solve real-world problems.

My expertise spans across Machine Learning, Computer Vision, and Full-Stack Development. I believe in the power of combining cutting-edge AI technologies with intuitive user interfaces to create impactful solutions.`;

  const stats = [
    { icon: GraduationCap, label: 'Education', value: 'AI Major', subtext: 'Superior University' },
    { icon: Calendar, label: 'Semester', value: '4th', subtext: 'Currently Studying' },
    { icon: MapPin, label: 'Location', value: 'Lahore', subtext: 'Pakistan' },
    { icon: Sparkles, label: 'Focus', value: 'AI/ML', subtext: 'Deep Learning' },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="About Me"
          subtitle="Passionate about creating intelligent systems that bridge the gap between AI and human creativity."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative order-2 lg:order-1">
            <div className="about-image relative opacity-0">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-purple/30 rounded-2xl" />
              <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-pink/30 rounded-2xl" />
              
              {/* Main image */}
              <div className="relative rounded-2xl overflow-hidden glow-purple">
                <img
                  src="/about-image.jpg"
                  alt="AI Development Workspace"
                  loading="lazy"
                  className="w-full aspect-[3/2] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full glass-card">
                <span className="text-sm font-medium text-white/80">
                  <span className="text-cyan">21</span> Years Old
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <ScrollReveal animation="fadeRight" delay={200}>
              <div className="text-lg lg:text-xl text-white/70 leading-relaxed mb-8 whitespace-pre-line">
                {description}
              </div>
            </ScrollReveal>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <ScrollReveal
                  key={index}
                  animation="fadeUp"
                  delay={400 + index * 100}
                >
                  <div className="group p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple/30 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple/10 text-purple group-hover:bg-purple group-hover:text-white transition-colors duration-300">
                        <stat.icon size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-white/50 uppercase tracking-wider mb-1">
                          {stat.label}
                        </p>
                        <p className="text-lg font-clash font-semibold text-white">
                          {stat.value}
                        </p>
                        <p className="text-xs text-white/40">
                          {stat.subtext}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
