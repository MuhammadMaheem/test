import { useRef, useEffect } from 'react';
import anime from 'animejs';
import { GraduationCap, Calendar, MapPin, Award, BookOpen } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import ScrollReveal from '../components/ui/ScrollReveal';

const Education = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate timeline line
            anime({
              targets: '.timeline-line',
              height: [0, '100%'],
              duration: 1500,
              easing: 'easeInOutQuad',
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (timelineRef.current) {
      observer.observe(timelineRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const educationData = [
    {
      degree: 'BS Artificial Intelligence',
      institution: 'Superior University',
      location: 'Lahore, Pakistan',
      period: '2023 - Present',
      status: '4th Semester (In Progress)',
      description: 'Currently pursuing a Bachelor\'s degree in Artificial Intelligence, focusing on Machine Learning, Deep Learning, Computer Vision, and Natural Language Processing.',
      achievements: [
        'Dean\'s List for Academic Excellence',
        'Active member of AI Research Society',
        'Participated in multiple hackathons',
      ],
    },
  ];

  const certifications = [
    { name: 'Machine Learning Specialization', provider: 'Coursera', icon: BookOpen },
    { name: 'Deep Learning Fundamentals', provider: 'Udemy', icon: Award },
    { name: 'Python for Data Science', provider: 'DataCamp', icon: BookOpen },
    { name: 'React & Next.js Mastery', provider: 'Online Course', icon: Award },
  ];

  const courses = [
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'Natural Language Processing',
    'Data Structures & Algorithms',
    'Database Management Systems',
    'Software Engineering',
    'Linear Algebra & Calculus',
  ];

  return (
    <section
      id="education"
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Education"
          subtitle="My academic journey and continuous learning path in the field of Artificial Intelligence."
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Timeline */}
          <div ref={timelineRef} className="relative">
            <h3 className="text-2xl font-clash font-semibold text-white mb-8">
              Academic Journey
            </h3>
            
            <div className="relative pl-8">
              {/* Timeline line */}
              <div className="timeline-line absolute left-0 top-0 w-0.5 h-0 bg-gradient-to-b from-purple via-pink to-cyan" />
              
              {/* Timeline items */}
              {educationData.map((edu, index) => (
                <ScrollReveal
                  key={index}
                  animation="fadeLeft"
                  delay={500 + index * 200}
                >
                  <div className="relative pb-12">
                    {/* Timeline dot */}
                    <div className="absolute -left-[39px] w-5 h-5 rounded-full bg-gradient-to-r from-purple to-pink border-4 border-dark" />
                    
                    {/* Content card */}
                    <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple/30 transition-colors duration-300">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-purple to-pink">
                          <GraduationCap size={24} className="text-white" />
                        </div>
                        <div>
                          <h4 className="text-xl font-clash font-semibold text-white">
                            {edu.degree}
                          </h4>
                          <p className="text-purple font-medium">{edu.institution}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-white/60">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {edu.period}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin size={14} />
                          {edu.location}
                        </span>
                      </div>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan/10 text-cyan text-sm mb-4">
                        <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
                        {edu.status}
                      </div>
                      
                      <p className="text-white/70 mb-4">{edu.description}</p>
                      
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-white/50">Achievements:</p>
                        {edu.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-white/70">
                            <Award size={14} className="text-pink" />
                            {achievement}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right side - Courses & Certifications */}
          <div>
            {/* Current Courses */}
            <div className="mb-10">
              <h3 className="text-2xl font-clash font-semibold text-white mb-6">
                Key Courses
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {courses.map((course, index) => (
                  <ScrollReveal
                    key={index}
                    animation="fadeUp"
                    delay={index * 50}
                  >
                    <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10 hover:border-cyan/30 transition-colors duration-300">
                      <BookOpen size={16} className="text-cyan" />
                      <span className="text-sm text-white/80">{course}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-2xl font-clash font-semibold text-white mb-6">
                Certifications
              </h3>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <ScrollReveal
                    key={index}
                    animation="fadeRight"
                    delay={index * 100}
                  >
                    <div className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-pink/30 transition-all duration-300">
                      <div className="p-2 rounded-lg bg-pink/10 group-hover:bg-pink/20 transition-colors">
                        <cert.icon size={20} className="text-pink" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{cert.name}</p>
                        <p className="text-sm text-white/50">{cert.provider}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-3 gap-4">
              {[
                { value: '3.8+', label: 'GPA' },
                { value: '12+', label: 'Courses' },
                { value: '4', label: 'Certifications' },
              ].map((stat, index) => (
                <ScrollReveal key={index} animation="scale" delay={index * 100}>
                  <div className="text-center p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-2xl font-clash font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-white/50">{stat.label}</div>
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

export default Education;
