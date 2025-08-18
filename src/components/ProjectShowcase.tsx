import React, { useState } from 'react';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      title: 'CyberSec-Toolkit',
      description: 'Comprehensive cybersecurity toolkit with automated vulnerability scanning and penetration testing utilities.',
      image: 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Bash', 'Nmap', 'SQLmap'],
      category: 'security',
      github: 'https://github.com/Amr-Khaled-Ahmed/CyberSec-Toolkit',
      featured: true
    },
    {
      id: '2',
      title: 'Malware Analysis Workshop',
      description: 'Complete malware analysis materials including BadRabbit ransomware dissection and reverse engineering techniques.',
      image: 'https://images.pexels.com/photos/5240547/pexels-photo-5240547.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Reverse Engineering', 'Assembly', 'IDA Pro'],
      category: 'security',
      github: 'https://github.com/Amr-Khaled-Ahmed/Malware-analysis-work-shop',
      featured: true
    },
    {
      id: '3',
      title: 'Portfolio Website',
      description: 'Modern, responsive portfolio website built with React and TypeScript showcasing cybersecurity expertise.',
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['React', 'TypeScript', 'Tailwind CSS'],
      category: 'web',
      github: 'https://github.com/Amr-Khaled-Ahmed/Portfolio',
      demo: 'https://amr-khaled-ahmed.github.io/Portfolio/',
      featured: true
    },
    {
      id: '4',
      title: 'Network Scanner',
      description: 'Advanced network scanning tool with service fingerprinting and vulnerability detection capabilities.',
      image: 'https://images.pexels.com/photos/5474028/pexels-photo-5474028.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Python', 'Scapy', 'Threading'],
      category: 'security',
      featured: false
    },
    {
      id: '5',
      title: 'Cryptographic Ciphers',
      description: 'Implementation of various cryptographic algorithms and cipher techniques for educational purposes.',
      image: 'https://images.pexels.com/photos/5474031/pexels-photo-5474031.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['C++', 'Cryptography', 'Mathematics'],
      category: 'crypto',
      github: 'https://github.com/Amr-Khaled-Ahmed/some-cipher-for-fun',
      featured: false
    },
    {
      id: '6',
      title: 'Online Library System',
      description: 'Full-stack web application for library management with user authentication and book tracking.',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Django', 'SQLite', 'HTML', 'CSS'],
      category: 'web',
      demo: 'https://online-library-website-five.vercel.app/',
      featured: false
    }
  ];

  const categories = [
    { key: 'all', label: 'All Projects', icon: 'fas fa-th-large' },
    { key: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
    { key: 'web', label: 'Web Development', icon: 'fas fa-globe' },
    { key: 'crypto', label: 'Cryptography', icon: 'fas fa-lock' }
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="space-y-12">
      {/* Featured Projects */}
      <div>
        <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Featured Projects</h2>
        <div className="grid lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Overlay Actions */}
                <div className={`absolute inset-0 bg-primary/90 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <i className="fab fa-github text-xl"></i>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <i className="fas fa-external-link-alt text-xl"></i>
                    </a>
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary leading-relaxed mb-4">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-accent text-text-primary text-sm rounded-full border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map(category => (
          <button
            key={category.key}
            onClick={() => setSelectedCategory(category.key)}
            className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 ${
              selectedCategory === category.key
                ? 'bg-primary text-white shadow-lg'
                : 'bg-card border border-border text-text-secondary hover:text-text-primary hover:bg-accent'
            }`}
          >
            <i className={category.icon}></i>
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* All Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            data-aos="fade-up"
            data-aos-delay={index * 100}
            className="group bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.slice(0, 3).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-2 py-1 bg-accent text-text-primary text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <i className="fab fa-github text-text-secondary group-hover:text-white text-sm"></i>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-8 h-8 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                    >
                      <i className="fas fa-external-link-alt text-text-secondary group-hover:text-white text-sm"></i>
                    </a>
                  )}
                </div>
                
                {project.featured && (
                  <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                    Featured
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectShowcase;