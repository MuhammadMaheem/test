import { useEffect, useRef } from 'react';
import anime from 'animejs';
import { Heart, ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import ScrollReveal from '../components/ui/ScrollReveal';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: '.footer-content',
              translateY: [30, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'easeOutExpo',
            });

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="relative py-16 section-padding border-t border-white/5"
    >
      <div className="footer-content max-w-7xl mx-auto opacity-0">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <ScrollReveal animation="fadeUp" delay={0}>
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, '#hero')} 
              className="inline-block mb-4 focus:outline-none focus:ring-2 focus:ring-purple/50 rounded"
            >
              <span className="text-3xl font-clash font-bold gradient-text">MM</span>
            </a>
            <p className="text-white/60 mb-6 max-w-sm">
              AI Engineer & Creative Developer crafting intelligent systems and immersive web experiences.
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/MuhammadMaheem"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-white/60 hover:text-purple hover:bg-purple/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple/50"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-maheem-453369245/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-lg bg-white/5 text-white/60 hover:text-cyan hover:bg-cyan/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan/50"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="mailto:mirza.muhammad.maheem@gmail.com"
                className="p-2.5 rounded-lg bg-white/5 text-white/60 hover:text-pink hover:bg-pink/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-pink/50"
                aria-label="Send Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </ScrollReveal>

          {/* Quick Links */}
          <ScrollReveal animation="fadeUp" delay={100}>
            <h4 className="text-lg font-clash font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="text-white/60 hover:text-cyan transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal animation="fadeUp" delay={200}>
            <h4 className="text-lg font-clash font-semibold text-white mb-4">
              Contact
            </h4>
            <ul className="space-y-3 text-white/60">
              <li>
                <a 
                  href="mailto:mirza.muhammad.maheem@gmail.com"
                  className="hover:text-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded"
                >
                  mirza.muhammad.maheem@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+923008714141"
                  className="hover:text-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-cyan/50 rounded"
                >
                  +92 300-8714141
                </a>
              </li>
              <li>Lahore, Pakistan</li>
            </ul>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm text-center sm:text-left">
            &copy; {currentYear} Muhammad Maheem. All rights reserved.
          </p>
          
          <p className="text-white/40 text-sm flex items-center gap-1">
            Made with <Heart size={14} className="text-pink fill-pink" /> using React & Tailwind
          </p>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="group p-3 rounded-full bg-white/5 text-white/60 hover:text-white hover:bg-purple/20 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple/50"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple/50 to-transparent" />
    </footer>
  );
};

export default Footer;
