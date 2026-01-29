import { useEffect, useRef } from 'react';
import anime from 'animejs';
import type { LucideIcon } from 'lucide-react';
import { 
  Code2, 
  Brain, 
  Database, 
  Wrench,
  Cpu,
  Eye,
  Layers,
  GitBranch
} from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import SkillBar from '../components/ui/SkillBar';
import ScrollReveal from '../components/ui/ScrollReveal';

interface SkillCategory {
  title: string;
  icon: LucideIcon;
  color: 'purple' | 'pink' | 'cyan' | 'gradient';
  skills: Array<{ name: string; level: number }>;
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const skillCategories: SkillCategory[] = [
    {
      title: 'Programming & Frameworks',
      icon: Code2,
      color: 'purple',
      skills: [
        { name: 'Python', level: 90 },
        { name: 'React', level: 85 },
        { name: 'Next.js', level: 80 },
        { name: 'FastAPI', level: 85 },
        { name: 'PyTorch', level: 75 },
        { name: 'Streamlit', level: 80 },
      ],
    },
    {
      title: 'AI/ML & Computer Vision',
      icon: Brain,
      color: 'pink',
      skills: [
        { name: 'Machine Learning', level: 85 },
        { name: 'Computer Vision', level: 80 },
        { name: 'OpenCV', level: 85 },
        { name: 'RAG', level: 75 },
        { name: 'DQN', level: 70 },
        { name: 'Classification', level: 85 },
      ],
    },
    {
      title: 'Database & Tools',
      icon: Database,
      color: 'cyan',
      skills: [
        { name: 'ChromaDB', level: 80 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Data Preprocessing', level: 90 },
        { name: 'Visualization', level: 85 },
      ],
    },
    {
      title: 'Additional Skills',
      icon: Wrench,
      color: 'gradient',
      skills: [
        { name: 'Problem Solving', level: 90 },
        { name: 'Self Learning', level: 95 },
        { name: 'Adaptability', level: 85 },
        { name: 'Technical Communication', level: 80 },
      ],
    },
  ];

  interface FloatingSkill {
    name: string;
    icon: LucideIcon;
    x: number;
    y: number;
    color: string;
  }

  const floatingSkills: FloatingSkill[] = [
    { name: 'Python', icon: Code2, x: 10, y: 20, color: '#7B61FF' },
    { name: 'React', icon: Layers, x: 85, y: 15, color: '#00D9FF' },
    { name: 'AI/ML', icon: Brain, x: 75, y: 70, color: '#FF61D2' },
    { name: 'OpenCV', icon: Eye, x: 20, y: 75, color: '#7B61FF' },
    { name: 'PyTorch', icon: Cpu, x: 50, y: 10, color: '#FF61D2' },
    { name: 'Git', icon: GitBranch, x: 90, y: 50, color: '#00D9FF' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate floating skills
            anime({
              targets: '.floating-skill',
              scale: [0, 1],
              opacity: [0, 1],
              delay: anime.stagger(100, { start: 800 }),
              duration: 600,
              easing: 'easeOutBack',
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Floating animation for skill badges
  useEffect(() => {
    floatingSkills.forEach((_, index) => {
      anime({
        targets: `.floating-skill-${index}`,
        translateY: [0, -15, 0],
        translateX: [0, 10, 0],
        duration: 3000 + index * 500,
        direction: 'alternate',
        loop: true,
        easing: 'easeInOutSine',
      });
    });
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding overflow-hidden"
    >
      {/* Floating skill badges */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {floatingSkills.map((skill, index) => (
          <div
            key={index}
            className={`floating-skill floating-skill-${index} absolute opacity-0`}
            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
          >
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-card"
              style={{ borderColor: `${skill.color}30` }}
            >
              <skill.icon size={16} style={{ color: skill.color }} />
              <span className="text-sm font-medium text-white/80">{skill.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto">
        <SectionHeader
          title="Skills & Expertise"
          subtitle="A comprehensive toolkit of technologies and skills I've mastered through projects and continuous learning."
        />

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {skillCategories.map((category, catIndex) => (
            <ScrollReveal
              key={catIndex}
              animation="fadeUp"
              delay={catIndex * 150}
            >
              <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all duration-300 h-full">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${
                    category.color === 'purple' ? 'from-purple to-purple-dark' :
                    category.color === 'pink' ? 'from-pink to-pink-dark' :
                    category.color === 'cyan' ? 'from-cyan to-cyan-dark' :
                    'from-purple via-pink to-cyan'
                  }`}>
                    <category.icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-clash font-semibold text-white">
                    {category.title}
                  </h3>
                </div>

                {/* Skills list */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skillIndex}
                      name={skill.name}
                      level={skill.level}
                      color={category.color}
                      delay={catIndex * 150 + skillIndex * 50}
                    />
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: '8+', label: 'Projects Completed' },
            { value: '4', label: 'Semesters' },
            { value: '15+', label: 'Technologies' },
            { value: '100%', label: 'Passion' },
          ].map((stat, index) => (
            <ScrollReveal key={index} animation="scale" delay={index * 100}>
              <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="text-3xl lg:text-4xl font-clash font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
