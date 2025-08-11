import React, { useState } from 'react';
import Footer from '../components/Footer';

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  category: string;
  icon: string;
  github?: string;
  demo?: string;
  image?: string;
  highlights: string[];
}

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects: Project[] = [
    {
      title: "CyberSec-Toolkit",
      description: "Comprehensive cybersecurity toolkit with automated vulnerability scanning and penetration testing utilities.",
      longDescription: "A comprehensive collection of cybersecurity tools designed for security professionals and researchers. The toolkit includes automated vulnerability scanners, network reconnaissance tools, and penetration testing utilities. Built with a modular architecture for easy extension and customization.",
      technologies: ["Python", "Bash", "Nmap", "SQLmap", "Custom Scripts"],
      category: "tools",
      icon: "fas fa-toolbox",
      github: "https://github.com/Amr-Khaled-Ahmed/CyberSec-Toolkit",
      highlights: [
        "Automated vulnerability scanning",
        "Network reconnaissance modules",
        "Custom exploitation scripts",
        "Detailed reporting system",
        "Modular architecture"
      ]
    },
    {
      title: "Photoshop Editor Clone",
      description: "Advanced image editing software with professional-grade features and intuitive user interface.",
      longDescription: "A comprehensive image editing application built from scratch, featuring advanced photo manipulation tools, filters, layers support, and professional editing capabilities. Designed with a modern UI/UX approach for both beginners and professional photographers.",
      technologies: ["Python", "Tkinter", "PIL", "OpenCV", "NumPy"],
      category: "software",
      icon: "fas fa-image",
      github: "https://github.com/Amr-Khaled-Ahmed/photoshop-clone",
      highlights: [
        "Layer-based editing system",
        "Advanced filter collection",
        "Professional color correction",
        "Batch processing capabilities",
        "Export to multiple formats"
      ]
    },
    {
      title: "Advanced Cipher Implementation",
      description: "Custom cryptographic algorithms and cipher implementations for educational and research purposes.",
      longDescription: "A collection of advanced cryptographic implementations including custom cipher algorithms, hash functions, and encryption utilities. Developed for educational purposes and cryptographic research, featuring both classical and modern encryption techniques.",
      technologies: ["Python", "C++", "Cryptography", "Mathematics", "Algorithm Design"],
      category: "crypto",
      icon: "fas fa-lock",
      github: "https://github.com/Amr-Khaled-Ahmed/some-cipher-for-fun",
      highlights: [
        "Custom cipher algorithms",
        "Hash function implementations",
        "Performance optimization",
        "Cryptanalysis tools",
        "Educational documentation"
      ]
    },



    // New projects from projects.html
    {
      title: "Falcon Air Conditioning Website",
      description: "A responsive website built with Next.js for Falcon Air Conditioning services.",
      longDescription: "A modern, responsive website built for Falcon Air Conditioning services using Next.js. The project demonstrates front-end development skills and the ability to create professional business websites.",
      technologies: ["Next.js", "React", "JavaScript", "HTML", "CSS"],
      category: "webdev",
      icon: "fas fa-laptop-code",
      demo: "https://falcon-air-conditioning.vercel.app/",
      highlights: [
        "Responsive design for all devices",
        "Built with Next.js for performance",
        "Professional and clean user interface",
        "Showcasing business services and contact information"
      ]
    },
    {
      title: "Personal Portfolio",
      description: "A responsive website built with basic static Html, css, JS.",
      longDescription: "A personal portfolio website created using fundamental web technologies to showcase projects, skills, and contact information. It highlights proficiency in front-end development and design principles.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "webdev",
      icon: "fas fa-laptop-code",
      github: "https://github.com/Amr-Khaled-Ahmed/Portfolio",
      highlights: [
        "Showcasing a collection of personal projects",
        "Fully responsive design",
        "Built with static HTML, CSS, and JS",
        "Clean and modern UI"
      ]
    },
    {
      title: "Different Projects",
      description: "A good repo include many small projects in html, css, html that build in study journey.",
      longDescription: "A repository containing a collection of small front-end projects developed during a study journey. It serves as a showcase of fundamental skills in HTML, CSS, and JavaScript.",
      technologies: ["HTML", "CSS", "JavaScript"],
      category: "webdev",
      icon: "fas fa-laptop-code",
      github: "https://amr-khaled-ahmed.github.io/GDG-front-end/",
      highlights: [
        "Collection of various small front-end projects",
        "Demonstrates foundational web development skills",
        "Built for educational purposes"
      ]
    },
    {
      title: "Online Library Website",
      description: "A complete online library system with book management and user accounts.",
      longDescription: "An online library system featuring book management, user authentication, and a clean interface. This project demonstrates full-stack development skills and database integration.",
      technologies: ["HTML", "CSS", "JavaScript", "Backend Framework"],
      category: "webdev",
      icon: "fas fa-book",
      demo: "https://online-library-website-five.vercel.app/",
      highlights: [
        "Complete online library system",
        "User account management",
        "Book management features"
      ]
    },
    {
      title: "Youssef Nihad Portfolio - khamsat job",
      description: "Complete portfoilo for ENG.youssef Cyber Security Expert",
      longDescription: "A professional portfolio website developed for a cybersecurity expert, showcasing their skills, certifications, and experience. This project was completed as a freelance job on Khamsat.",
      technologies: ["Web Development", "UI/UX Design"],
      category: "webdev",
      icon: "fas fa-laptop-code",
      demo: "https://yn0.org/",
      highlights: [
        "Professional portfolio for a cybersecurity expert",
        "Freelance project for a client",
        "Showcasing skills and experience"
      ]
    },
    {
      title: "Maravel Company - khamsat job",
      description: "Complete portfoilo for Maravel Company",
      longDescription: "A comprehensive portfolio website created for Maravel Company, highlighting their services and company profile. This project was a freelance job completed on the Khamsat platform.",
      technologies: ["Web Development", "UI/UX Design"],
      category: "webdev",
      icon: "fas fa-laptop-code",
      demo: "http://www.marafeel.com/",
      highlights: [
        "Company portfolio for Maravel",
        "Freelance project for a client",
        "Demonstrates business website development"
      ]
    },
    {
      title: "FCAI Ciphers Examples",
      description: "Examples of cryptographic ciphers implemented for educational purposes.",
      longDescription: "A collection of cryptographic cipher implementations developed for educational use at Cairo University's Faculty of Computers and Artificial Intelligence (FCAI). It includes various classical and modern ciphers.",
      technologies: ["Python", "Cryptography", "Algorithms"],
      category: "crypto",
      icon: "fas fa-shield-alt",
      github: "https://github.com/Amr-Khaled-Ahmed/FCAI-Cairo-University-Ciphers-Examples",
      highlights: [
        "Cryptographic ciphers for educational purposes",
        "Developed as part of university coursework",
        "Includes various cipher examples"
      ]
    },
    {
      title: "Malware analysis work shop",
      description: "Repository include all GDSC Malware analysis workshop with some malwares analysis like ransomwares, trojans, rootkit, etc.",
      longDescription: "A repository that contains all materials from a GDSC Malware Analysis workshop. It includes detailed analysis of various malware types, such as ransomware, trojans, and rootkits.",
      technologies: ["Malware Analysis", "Reverse Engineering"],
      category: "malware",
      icon: "fas fa-shield-virus",
      github: "https://github.com/Amr-Khaled-Ahmed/Malware-analysis-work-shop",
      highlights: [
        "GDSC Malware Analysis workshop materials",
        "Analysis of various malware types (ransomware, trojans)",
        "Educational resource for malware analysis"
      ]
    },
    {
      title: "Hash Calculator",
      description: "A tool to calculate hash values for files and text.",
      longDescription: "A utility tool for calculating hash values of files and text strings. It supports various hashing algorithms and is useful for integrity checks and security tasks.",
      technologies: ["Python", "Hashing Algorithms"],
      category: "tools",
      icon: "fas fa-hashtag",
      github: "https://github.com/Amr-Khaled-Ahmed/hash-calculator-",
      highlights: [
        "Calculates hash values for files and text",
        "Supports multiple hashing algorithms",
        "Useful for data integrity checks"
      ]
    },
    {
      title: "Key Logger",
      description: "A key logging tool for educational purposes.",
      longDescription: "An educational key logger tool developed to understand how such tools function. It's intended for research and security training, not malicious use.",
      technologies: ["Python"],
      category: "tools",
      icon: "fas fa-keyboard",
      github: "https://github.com/Amr-Khaled-Ahmed/key-logger",
      highlights: [
        "Key logging tool for educational purposes",
        "Demonstrates system monitoring capabilities"
      ]
    },
    {
      title: "Python Reverse Shell",
      description: "A reverse shell implementation with persistence in Python.",
      longDescription: "A Python-based reverse shell with persistence capabilities. This project is for educational and ethical hacking purposes to understand how remote access tools work.",
      technologies: ["Python", "Networking", "Socket Programming"],
      category: "tools",
      icon: "fas fa-terminal",
      github: "https://github.com/Amr-Khaled-Ahmed/python-reverse-shell-with-persistence",
      highlights: [
        "Reverse shell implementation in Python",
        "Includes persistence features",
        "Created for educational purposes"
      ]
    },
    {
      title: "Neovim Configuration",
      description: "My personal Neovim configuration for efficient coding.",
      longDescription: "The personal configuration for Neovim, customized for efficient coding, development workflows, and enhanced user experience. It includes custom plugins, keybindings, and themes.",
      technologies: ["Neovim", "Lua", "Vimscript"],
      category: "development",
      icon: "fas fa-code",
      github: "https://github.com/Amr-Khaled-Ahmed/nvim",
      highlights: [
        "Personalized Neovim configuration",
        "Custom plugins and keybindings",
        "Optimized for efficient coding"
      ]
    },
    {
      title: "Binary Calculator",
      description: "A simple binary calculator implemented in Python.",
      longDescription: "A simple command-line binary calculator built with Python. It performs basic arithmetic operations on binary numbers, demonstrating fundamental programming logic.",
      technologies: ["Python"],
      category: "development",
      icon: "fas fa-calculator",
      github: "https://github.com/Amr-Khaled-Ahmed/binary-calculator",
      highlights: [
        "Simple binary calculator",
        "Basic arithmetic operations",
        "Implemented in Python"
      ]
    },
    {
      title: "Vole Machine",
      description: "A simulation of a simple machine architecture.",
      longDescription: "A simulation of a simple machine architecture, demonstrating concepts of computer organization and assembly language. This project models the basic components of a computer system.",
      technologies: ["Assembly", "C++"],
      category: "development",
      icon: "fas fa-microchip",
      github: "https://github.com/Amr-Khaled-Ahmed/vole_machine",
      highlights: [
        "Simple machine architecture simulation",
        "Demonstrates computer organization concepts",
        "Educational project"
      ]
    },
    {
      title: "OOP Board Games",
      description: "Object-oriented programming implementation of board games.",
      longDescription: "A project that implements various board games using object-oriented programming principles. It demonstrates clean code, design patterns, and software architecture.",
      technologies: ["C++", "OOP"],
      category: "development",
      icon: "fas fa-chess-board",
      github: "https://github.com/Amr-Khaled-Ahmed/Assignment2_OOP_Board_Games",
      highlights: [
        "OOP implementation of board games",
        "Demonstrates software design principles",
        "University coursework project"
      ]
    },
    {
      title: "Photoshop GUI Demo",
      description: "A demo of a Photoshop-like GUI built with Python.",
      longDescription: "A graphical user interface (GUI) demo inspired by Adobe Photoshop. This project, built with Python, showcases GUI development and basic image manipulation functionalities.",
      technologies: ["Python", "GUI", "Tkinter"],
      category: "development",
      icon: "fas fa-paint-brush",
      github: "https://github.com/Amr-Khaled-Ahmed/Demo_photoshop-GUI",
      highlights: [
        "Photoshop-like GUI demo",
        "Built with Python and Tkinter",
        "Showcases GUI development skills"
      ]
    },
    {
      title: "Collage System Management",
      description: "A system for managing college-related tasks and data.",
      longDescription: "A college management system developed to handle various administrative tasks, such as student registration, course management, and data tracking. This project demonstrates software development for educational institutions.",
      technologies: ["Java", "Database"],
      category: "development",
      icon: "fas fa-university",
      github: "https://github.com/Amr-Khaled-Ahmed/Collage-System-Management",
      highlights: [
        "College system management",
        "Handles student and course data",
        "Developed with Java"
      ]
    },
    {
      title: "Math-3 Project",
      description: "A project for matrix calculations and Hell Cipher algorithms.",
      longDescription: "A project developed for a Math-3 course that includes implementations for matrix calculations and the Hill Cipher algorithm. It combines mathematical concepts with programming for cryptographic purposes.",
      technologies: ["C++", "Mathematics", "Cryptography"],
      category: "development",
      icon: "fas fa-calculator",
      github: "https://github.com/Amr-Khaled-Ahmed/Math-3_Project",
      highlights: [
        "Matrix calculation implementations",
        "Hill Cipher algorithm",
        "University coursework project"
      ]
    },
    {
      title: "Powershell Configuration",
      description: "A project for powershell configuration",
      longDescription: "A configuration project for Windows Powershell using Oh-my-posh to customize the terminal with themes, icons, and useful functions for a better developer experience.",
      technologies: ["Powershell", "Oh-my-posh"],
      category: "development",
      icon: "fa fa-windows",
      github: "https://github.com/Amr-Khaled-Ahmed/Oh-my-posh-Windows-power-shell",
      highlights: [
        "Custom Powershell configuration",
        "Uses Oh-my-posh for styling",
        "Enhances terminal user experience"
      ]
    },
  ];

  const categories = [
    { key: 'all', label: 'All Projects', icon: 'fas fa-th-large' },
    { key: 'tools', label: 'Security Tools', icon: 'fas fa-toolbox' },
    { key: 'webapp', label: 'Web Security', icon: 'fas fa-globe' },
    { key: 'network', label: 'Network Security', icon: 'fas fa-network-wired' },
    { key: 'crypto', label: 'Cryptography', icon: 'fas fa-lock' },
    { key: 'malware', label: 'Malware Analysis', icon: 'fas fa-virus' },
    { key: 'forensics', label: 'Digital Forensics', icon: 'fas fa-search-plus' },
    { key: 'software', label: 'Software Dev', icon: 'fas fa-desktop' },
    { key: 'webdev', label: 'Web Development', icon: 'fas fa-laptop-code' },
    { key: 'development', label: 'Development', icon: 'fas fa-code' }
  ];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(project => project.category === selectedCategory);

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div data-aos="zoom-in" className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center shadow-2xl">
              <i className="fas fa-code text-4xl text-white"></i>
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full animate-pulse opacity-20"></div>
            </div>
          </div>

          <h1 data-aos="fade-up" className="text-4xl md:text-6xl font-bold text-text-primary mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Security & Software Projects
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" className="text-xl md:text-2xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            A showcase of innovative projects in cybersecurity, software development, and web solutions.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                  selectedCategory === category.key
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-card hover:bg-accent text-text-secondary hover:text-text-primary border border-border'
                }`}
              >
                <i className={category.icon}></i>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4"
              >
                {/* Project Header */}
                <div className="relative p-6 bg-gradient-to-br from-primary/10 to-accent/10">
                  <div className="w-16 h-16 bg-primary/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <i className={`${project.icon} text-2xl text-primary group-hover:text-white`}></i>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  {/* Technologies */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-accent text-text-primary text-xs rounded-full border border-border"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                          +{project.technologies.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Project Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="text-primary hover:text-accent transition-colors flex items-center space-x-2 font-semibold"
                    >
                      <span>View Details</span>
                      <i className="fas fa-arrow-right"></i>
                    </button>

                    <div className="flex items-center space-x-3">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                        >
                          <i className="fab fa-github text-text-secondary group-hover:text-white"></i>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
                        >
                          <i className="fas fa-external-link-alt text-text-secondary group-hover:text-white"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-8">
              {/* Modal Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className={`${selectedProject.icon} text-2xl text-primary`}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{selectedProject.title}</h2>
                    <div className="flex items-center space-x-4 mt-2">
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-accent transition-colors flex items-center space-x-1"
                        >
                          <i className="fab fa-github"></i>
                          <span>GitHub</span>
                        </a>
                      )}
                      {selectedProject.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:text-accent transition-colors flex items-center space-x-1"
                        >
                          <i className="fas fa-external-link-alt"></i>
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-10 h-10 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                >
                  <i className="fas fa-times text-text-secondary group-hover:text-white"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">Description</h3>
                  <p className="text-text-secondary leading-relaxed">{selectedProject.longDescription}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">Key Highlights</h3>
                  <ul className="space-y-2">
                    {selectedProject.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-start space-x-3 text-text-secondary">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-accent text-text-primary rounded-lg border border-border hover:bg-primary hover:text-white transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Interested in Collaboration?</h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              I'm always open to discussing new projects, innovative ideas, or opportunities to contribute
              to the cybersecurity community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-envelope"></i>
                <span>Get in Touch</span>
              </a>
              <a
                href="https://github.com/Amr-Khaled-Ahmed"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <i className="fab fa-github"></i>
                <span>View GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
