import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  CheckCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SectionHeader from '../components/ui/SectionHeader';
import ScrollReveal from '../components/ui/ScrollReveal';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'mirza.muhammad.maheem@gmail.com',
      href: 'mailto:mirza.muhammad.maheem@gmail.com',
      color: 'from-purple to-purple-dark',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+92 300-8714141',
      href: 'tel:+923008714141',
      color: 'from-pink to-pink-dark',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Lahore, Pakistan',
      href: '#',
      color: 'from-cyan to-cyan-dark',
    },
  ];

  const socialLinks = [
    { icon: Github, href: 'https://github.com/MuhammadMaheem', label: 'GitHub', color: 'hover:text-purple' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/muhammad-maheem-453369245/', label: 'LinkedIn', color: 'hover:text-cyan' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-pink' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section
      id="contact"
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? I'd love to hear from you!"
        />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Contact info */}
          <div>
            <h3 className="text-2xl font-clash font-semibold text-white mb-6">
              Contact Information
            </h3>
            
            <div className="space-y-4 mb-10">
              {contactInfo.map((info, index) => (
                <ScrollReveal
                  key={index}
                  animation="fadeLeft"
                  delay={index * 100}
                >
                  <a
                    href={info.href}
                    className="group flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300"
                  >
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${info.color}`}>
                      <info.icon size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-white/50">{info.label}</p>
                      <p className="font-medium text-white group-hover:text-cyan transition-colors">
                        {info.value}
                      </p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>

            {/* Social Links */}
            <ScrollReveal animation="fadeUp" delay={400}>
              <div>
                <h3 className="text-xl font-clash font-semibold text-white mb-4">
                  Follow Me
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-4 rounded-xl bg-white/5 border border-white/10 text-white/60 ${social.color} hover:border-current transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-current`}
                      aria-label={social.label}
                    >
                      <social.icon size={24} />
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Availability badge */}
            <ScrollReveal animation="fadeUp" delay={600}>
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-purple/10 to-pink/10 border border-purple/20">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-medium text-white">Available for Work</span>
                </div>
                <p className="text-white/60 text-sm">
                  I&apos;m currently open to freelance projects, internships, and collaboration opportunities in AI/ML and web development.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right side - Contact form */}
          <ScrollReveal animation="fadeRight" delay={300}>
            <div className="p-6 lg:p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h3 className="text-2xl font-clash font-semibold text-white mb-6">
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/70">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple focus:ring-purple/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/70">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      required
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple focus:ring-purple/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-white/70">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What's this about?"
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple focus:ring-purple/20"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white/70">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    required
                    rows={5}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-purple focus:ring-purple/20 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-6 rounded-xl font-medium transition-all duration-300 ${
                    isSubmitted
                      ? 'bg-green-500 hover:bg-green-500'
                      : 'bg-gradient-to-r from-purple to-pink hover:opacity-90'
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={18} className="animate-spin" />
                      Sending...
                    </span>
                  ) : isSubmitted ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle size={18} />
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send size={18} />
                      Send Message
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
