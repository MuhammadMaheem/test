import { useState } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import SectionHeader from '../components/ui/SectionHeader';
import ProjectCard from '../components/ui/ProjectCard';
import type { LucideIcon } from 'lucide-react';
import { 
  FileText, 
  MessageSquare, 
  ScanFace, 
  Gamepad2, 
  HeartPulse, 
  BrainCircuit, 
  Building2, 
  Landmark 
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  icon: LucideIcon;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  demoUrl?: string;
  color: string;
}

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'RAG-Based PDF Chatbot',
      shortDescription: 'Advanced document processing with AI-powered Q&A',
      fullDescription: 'A sophisticated chatbot that uses Retrieval-Augmented Generation (RAG) technology to process PDF documents and provide intelligent answers to user queries. The system extracts text from PDFs, creates embeddings, and uses semantic search to retrieve relevant context for generating accurate responses.',
      image: '/project-rag-chatbot.jpg',
      icon: FileText,
      technologies: ['Python', 'LangChain', 'OpenAI', 'ChromaDB', 'Streamlit'],
      features: [
        'PDF text extraction and processing',
        'Semantic search with vector embeddings',
        'Context-aware question answering',
        'Conversation history management',
        'Multi-document support',
      ],
      color: 'from-purple to-purple-dark',
    },
    {
      id: 2,
      title: 'Hadith Chatbot',
      shortDescription: 'Islamic knowledge assistant for Hadith queries',
      fullDescription: 'A specialized chatbot designed to answer questions about Hadith (sayings and traditions of Prophet Muhammad PBUH). The system uses NLP to understand queries and retrieve relevant Hadith from authenticated sources with proper references.',
      image: '/project-hadith-chatbot.jpg',
      icon: MessageSquare,
      technologies: ['Python', 'NLP', 'Transformers', 'Arabic NLP', 'FastAPI'],
      features: [
        'Natural language understanding',
        'Authenticated Hadith database',
        'Multi-language support',
        'Source citation for each response',
        'Contextual follow-up questions',
      ],
      color: 'from-pink to-pink-dark',
    },
    {
      id: 3,
      title: 'Face Recognition Attendance',
      shortDescription: 'Automated attendance with facial recognition',
      fullDescription: 'A real-time facial recognition system for automated attendance tracking. Built using Dlib and OpenCV, the system detects faces, recognizes individuals, and marks attendance automatically with high accuracy.',
      image: '/project-face-recognition.jpg',
      icon: ScanFace,
      technologies: ['Python', 'OpenCV', 'Dlib', 'Face Recognition', 'SQLite'],
      features: [
        'Real-time face detection',
        'High accuracy recognition',
        'Automated attendance marking',
        'Attendance reports generation',
        'Multi-face detection support',
      ],
      color: 'from-cyan to-cyan-dark',
    },
    {
      id: 4,
      title: 'Tic-Tac-Toe AI (DQN)',
      shortDescription: 'Game AI using Deep Q-Network reinforcement learning',
      fullDescription: 'An intelligent Tic-Tac-Toe opponent trained using Deep Q-Network (DQN), a reinforcement learning algorithm. The AI learns optimal strategies through self-play and improves over time.',
      image: '/project-tic-tac-toe.jpg',
      icon: Gamepad2,
      technologies: ['Python', 'PyTorch', 'DQN', 'Reinforcement Learning', 'NumPy'],
      features: [
        'Self-learning AI agent',
        'Deep Q-Network implementation',
        'Adaptive difficulty levels',
        'Training visualization',
        'Optimal strategy learning',
      ],
      color: 'from-purple via-pink to-cyan',
    },
    {
      id: 5,
      title: 'CKD Prediction Model',
      shortDescription: 'Medical AI for Chronic Kidney Disease prediction',
      fullDescription: 'A machine learning model that predicts Chronic Kidney Disease (CKD) based on patient health metrics. Uses classification algorithms to analyze medical data and provide early diagnosis assistance.',
      image: '/project-ckd.jpg',
      icon: HeartPulse,
      technologies: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'Matplotlib'],
      features: [
        'Multi-algorithm comparison',
        'Feature importance analysis',
        'Risk score calculation',
        'Interactive visualizations',
        'Model performance metrics',
      ],
      color: 'from-pink to-purple',
    },
    {
      id: 6,
      title: 'Personality Prediction',
      shortDescription: 'ML-based behavioral analysis system',
      fullDescription: 'A personality prediction system that analyzes user responses and predicts personality traits using machine learning models. Based on psychological frameworks and trained on validated datasets.',
      image: '/project-personality.jpg',
      icon: BrainCircuit,
      technologies: ['Python', 'Machine Learning', 'NLP', 'Pandas', 'Seaborn'],
      features: [
        'Multi-trait prediction',
        'Psychological framework based',
        'Confidence scoring',
        'Detailed personality reports',
        'Comparative analysis',
      ],
      color: 'from-cyan to-purple',
    },
    {
      id: 7,
      title: 'SaaS Management App',
      shortDescription: 'Full-stack SaaS platform for business management',
      fullDescription: 'A comprehensive SaaS management application with user authentication, subscription management, analytics dashboard, and role-based access control. Built with modern frontend technologies.',
      image: '/project-saas.jpg',
      icon: Building2,
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma'],
      features: [
        'User authentication & authorization',
        'Subscription management',
        'Analytics dashboard',
        'Role-based access control',
        'Responsive design',
      ],
      color: 'from-purple to-cyan',
    },
    {
      id: 8,
      title: 'Bank Management System',
      shortDescription: 'Financial management with Streamlit GUI',
      fullDescription: 'A comprehensive bank management system built with Python and Streamlit. Features account management, transaction processing, balance inquiries, and detailed financial reports.',
      image: '/project-bank.jpg',
      icon: Landmark,
      technologies: ['Python', 'Streamlit', 'SQLite', 'Pandas', 'Plotly'],
      features: [
        'Account creation & management',
        'Deposit & withdrawal processing',
        'Transaction history',
        'Balance tracking',
        'Financial reports & charts',
      ],
      color: 'from-cyan to-pink',
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Projects Gallery"
          subtitle="A showcase of my work across AI/ML, web development, and creative problem-solving."
        />

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              shortDescription={project.shortDescription}
              image={project.image}
              icon={project.icon}
              technologies={project.technologies}
              color={project.color}
              onClick={() => setSelectedProject(project)}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-dark-light border-white/10">
          {selectedProject && (
            <>
              {/* Project Image */}
              <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-light via-transparent to-transparent" />
              </div>

              <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${selectedProject.color}`}>
                    <selectedProject.icon size={24} className="text-white" />
                  </div>
                  <DialogTitle className="text-2xl font-clash font-bold text-white">
                    {selectedProject.title}
                  </DialogTitle>
                </div>
                <DialogDescription className="text-white/70 text-base">
                  {selectedProject.fullDescription}
                </DialogDescription>
              </DialogHeader>

              {/* Technologies */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-sm rounded-full bg-gradient-to-r from-purple/20 to-pink/20 text-white/80 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mt-6">
                <h4 className="text-sm font-medium text-white/50 uppercase tracking-wider mb-3">
                  Key Features
                </h4>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan mt-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Actions */}
              <div className="flex gap-4 mt-8">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <Github size={18} />
                    View Code
                  </a>
                )}
                {selectedProject.demoUrl && (
                  <a
                    href={selectedProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple to-pink text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-purple/50"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
