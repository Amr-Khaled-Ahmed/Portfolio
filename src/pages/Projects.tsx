import { useEffect, useState } from 'react';
import { Github, ExternalLink, Code2, Shield, Bug, Swords } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Project } from '../types';

type CategoryFilter = 'all' | 'web-dev' | 'cyber' | 'malware' | 'offensive' | 'webdev' | 'crypto' | 'tools' | 'development';

// Static projects data
const staticProjects: Project[] = [
  {
    id: '1',
    title: "CyberSec-Toolkit",
    description: "Comprehensive cybersecurity toolkit with automated vulnerability scanning and penetration testing utilities.",
    longDescription: "A comprehensive collection of cybersecurity tools designed for security professionals and researchers. The toolkit includes automated vulnerability scanners, network reconnaissance tools, and penetration testing utilities. Built with a modular architecture for easy extension and customization.",
    category: "tools",
    tech_stack: ["Python", "Bash", "Nmap", "SQLmap", "Custom Scripts", 'PowerShell', 'C++', 'C'],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/CyberSec-Toolkit",
    featured: true,
    created_at: "2024-01-01T00:00:00Z"
  },
  {
    id: '2',
    title: "Advanced Cipher Implementation",
    description: "Custom cryptographic algorithms and cipher implementations for educational and research purposes.",
    longDescription: "A collection of advanced cryptographic implementations including custom cipher algorithms, hash functions, and encryption utilities. Developed for educational purposes and cryptographic research, featuring both classical and modern encryption techniques.",
    category: "crypto",
    tech_stack: ["Python", "C++", "Cryptography", "Mathematics", "Algorithm Design"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/some-cipher-for-fun",
    featured: true,
    created_at: "2024-01-02T00:00:00Z"
  },
  {
    id: '3',
    title: "Falcon Air Conditioning Website",
    description: "A responsive website built with Next.js for Falcon Air Conditioning services.",
    longDescription: "A modern, responsive website built for Falcon Air Conditioning services using Next.js. The project demonstrates front-end development skills and the ability to create professional business websites.",
    category: "webdev",
    tech_stack: ["Next.js", "React", "JavaScript", "HTML", "CSS"],
    image_url: "",
    project_url: "https://falcon-air-conditioning.vercel.app/",
    github_url: "",
    featured: false,
    created_at: "2024-01-03T00:00:00Z"
  },
  {
    id: '4',
    title: "Old Personal Portfolio",
    description: "A responsive website built with basic static Html, css, JS.",
    longDescription: "A personal portfolio website created using fundamental web technologies to showcase projects, skills, and contact information. It highlights proficiency in front-end development and design principles.",
    category: "webdev",
    tech_stack: ["HTML", "CSS", "JavaScript"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Portfolio",
    featured: false,
    created_at: "2024-01-04T00:00:00Z"
  },
  {
    id: '5',
    title: "Different Projects",
    description: "A good repo include many small projects in html, css, html that build in study journey.",
    longDescription: "A repository containing a collection of small front-end projects developed during a study journey. It serves as a showcase of fundamental skills in HTML, CSS,tailwind,react,bootstrap, and JavaScript.",
    category: "webdev",
    tech_stack: ["HTML", "CSS", "JavaScript", "React", "TailWind", "BootStrap"],
    image_url: "",
    project_url: "https://amr-khaled-ahmed.github.io/GDG-front-end/",
    github_url: "",
    featured: false,
    created_at: "2024-01-05T00:00:00Z"
  },
  {
    id: '6',
    title: "Online Library Website",
    description: "A complete online library system with book management and user accounts.",
    longDescription: "An online library system featuring book management, user authentication, and a clean interface. This project demonstrates full-stack development skills and database integration.",
    category: "webdev",
    tech_stack: ["HTML", "CSS", "JavaScript", "Backend Framework", "Django", "SQLite"],
    image_url: "",
    project_url: "https://online-library-website-five.vercel.app/",
    github_url: "",
    featured: false,
    created_at: "2024-01-06T00:00:00Z"
  },
  {
    id: '7',
    title: "Youssef Nihad Portfolio - khamsat job",
    description: "Complete portfoilo for ENG.youssef Cyber Security Expert",
    longDescription: "A professional portfolio website developed for a cybersecurity expert, showcasing their skills, certifications, and experience. This project was completed as a freelance job on Khamsat.",
    category: "webdev",
    tech_stack: ["Web Development", "UI/UX Design", "HTML", "CSS", "JavaScript"],
    image_url: "",
    project_url: "https://yn0.org/",
    github_url: "",
    featured: true,
    created_at: "2024-01-07T00:00:00Z"
  },
  {
    id: '8',
    title: "Maravel Company - khamsat job",
    description: "Complete portfoilo for Maravel Company",
    longDescription: "A comprehensive portfolio website created for Maravel Company, highlighting their services and company profile. This project was a freelance job completed on the Khamsat platform.",
    category: "webdev",
    tech_stack: ["Web Development", "UI/UX Design", "HTML", "CSS", "JavaScript"],
    image_url: "",
    project_url: "http://www.marafeel.com/",
    github_url: "",
    featured: false,
    created_at: "2024-01-08T00:00:00Z"
  },
  {
    id: '9',
    title: "FCAI Ciphers Examples",
    description: "Examples of cryptographic ciphers implemented for educational purposes.",
    longDescription: "A collection of cryptographic cipher implementations developed for educational use at Cairo University's Faculty of Computers and Artificial Intelligence (FCAI). It includes various classical and modern ciphers.",
    category: "crypto",
    tech_stack: ["C++", "Cryptography", "Algorithms"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/FCAI-Cairo-University-Ciphers-Examples",
    featured: false,
    created_at: "2024-01-09T00:00:00Z"
  },
  {
    id: '10',
    title: "Malware analysis work shop",
    description: "Repository include all GDSC Malware analysis workshop with some malwares analysis like ransomwares, trojans, rootkit, etc.",
    longDescription: "A repository that contains all materials from a GDSC Malware Analysis workshop. It includes detailed analysis of various malware types, such as ransomware, trojans, and rootkits.",
    category: "malware",
    tech_stack: ["Malware Analysis", "Reverse Engineering"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Malware-analysis-work-shop",
    featured: true,
    created_at: "2024-01-10T00:00:00Z"
  },
  {
    id: '11',
    title: "Hash Calculator",
    description: "A tool to calculate hash values for files and text.",
    longDescription: "A utility tool for calculating hash values of files and text strings. It supports various hashing algorithms and is useful for integrity checks and security tasks.",
    category: "tools",
    tech_stack: ["Python", "Hashing Algorithms"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/hash-calculator-",
    featured: false,
    created_at: "2024-01-11T00:00:00Z"
  },
  {
    id: '12',
    title: "Key Logger",
    description: "A key logging tool for educational purposes.",
    longDescription: "An educational key logger tool developed to understand how such tools function. It's intended for research and security training, not malicious use.",
    category: "tools",
    tech_stack: ["Python"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/key-logger",
    featured: false,
    created_at: "2024-01-12T00:00:00Z"
  },
  {
    id: '13',
    title: "Python Reverse Shell",
    description: "A reverse shell implementation with persistence in Python.",
    longDescription: "A Python-based reverse shell with persistence capabilities. This project is for educational and ethical hacking purposes to understand how remote access tools work.",
    category: "tools",
    tech_stack: ["Python", "Networking", "Socket Programming"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/python-reverse-shell-with-persistence",
    featured: false,
    created_at: "2024-01-13T00:00:00Z"
  },
  {
    id: '14',
    title: "Neovim Configuration",
    description: "My personal Neovim configuration for efficient coding.",
    longDescription: "The personal configuration for Neovim, customized for efficient coding, development workflows, and enhanced user experience. It includes custom plugins, keybindings, and themes.",
    category: "development",
    tech_stack: ["Neovim", "Lua"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/nvim",
    featured: false,
    created_at: "2024-01-14T00:00:00Z"
  },
  {
    id: '15',
    title: "Binary Calculator",
    description: "A simple binary calculator implemented in Python.",
    longDescription: "A simple command-line binary calculator built with Python. It performs basic arithmetic operations on binary numbers, demonstrating fundamental programming logic.",
    category: "development",
    tech_stack: ["Python"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/binary-calculator",
    featured: false,
    created_at: "2024-01-15T00:00:00Z"
  },
  {
    id: '16',
    title: "Vole Machine",
    description: "A simulation of a simple machine architecture.",
    longDescription: "A simulation of a simple machine architecture, demonstrating concepts of computer organization and assembly language. This project models the basic components of a computer system.",
    category: "development",
    tech_stack: ["C++"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/vole_machine",
    featured: false,
    created_at: "2024-01-16T00:00:00Z"
  },
  {
    id: '17',
    title: "OOP Board Games",
    description: "Object-oriented programming implementation of board games.",
    longDescription: "A project that implements various board games using object-oriented programming principles. It demonstrates clean code, design patterns, and software architecture.",
    category: "development",
    tech_stack: ["C++", "OOP", 'QT'],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Assignment2_OOP_Board_Games",
    featured: false,
    created_at: "2024-01-17T00:00:00Z"
  },
  {
    id: '18',
    title: "Photoshop GUI Demo",
    description: "A demo of a Photoshop-like GUI built with Python.",
    longDescription: "A graphical user interface (GUI) demo inspired by Adobe Photoshop. This project, built with Python, showcases GUI development and basic image manipulation functionalities.",
    category: "development",
    tech_stack: ["C++", "GUI", "QT"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Demo_photoshop-GUI",
    featured: false,
    created_at: "2024-01-18T00:00:00Z"
  },
  {
    id: '19',
    title: "Collage System Management",
    description: "A system for managing college-related tasks and data.",
    longDescription: "A college management system developed to handle various administrative tasks, such as student registration, course management, and data tracking. This project demonstrates software development for educational institutions.",
    category: "development",
    tech_stack: ["Java", "Database"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Collage-System-Management",
    featured: false,
    created_at: "2024-01-19T00:00:00Z"
  },
  {
    id: '20',
    title: "Math-3 Project",
    description: "A project for matrix calculations and Hell Cipher algorithms.",
    longDescription: "A project developed for a Math-3 course that includes implementations for matrix calculations and the Hill Cipher algorithm. It combines mathematical concepts with programming for cryptographic purposes.",
    category: "development",
    tech_stack: ["Mathematics", "Cryptography", "QT"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Math-3_Project",
    featured: false,
    created_at: "2024-01-20T00:00:00Z"
  },
  {
    id: '21',
    title: "Powershell Configuration",
    description: "A project for powershell configuration",
    longDescription: "A configuration project for Windows Powershell using Oh-my-posh to customize the terminal with themes, icons, and useful functions for a better developer experience.",
    category: "development",
    tech_stack: ["Powershell", "Oh-my-posh"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Oh-my-posh-Windows-power-shell",
    featured: false,
    created_at: "2024-01-21T00:00:00Z"
  },
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [loading, setLoading] = useState(true);

  // Update categories to include new project types
  const categories = [
    { id: 'all' as CategoryFilter, label: 'All Projects', icon: Code2, color: 'from-[#D4AF37] to-[#C19A6B]' },
    { id: 'web-dev' as CategoryFilter, label: 'Web Dev', icon: Code2, color: 'from-blue-500 to-cyan-500' },
    { id: 'webdev' as CategoryFilter, label: 'Web Development', icon: Code2, color: 'from-blue-500 to-cyan-500' },
    { id: 'cyber' as CategoryFilter, label: 'Cyber Security', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { id: 'malware' as CategoryFilter, label: 'Malware', icon: Bug, color: 'from-pink-500 to-rose-500' },
    { id: 'offensive' as CategoryFilter, label: 'Offensive', icon: Swords, color: 'from-red-500 to-orange-500' },
    { id: 'tools' as CategoryFilter, label: 'Tools', icon: Code2, color: 'from-purple-500 to-pink-500' },
    { id: 'crypto' as CategoryFilter, label: 'Cryptography', icon: Shield, color: 'from-yellow-500 to-amber-500' },
    { id: 'development' as CategoryFilter, label: 'Development', icon: Code2, color: 'from-indigo-500 to-purple-500' },
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const loadProjects = async () => {
    setLoading(true);

    // First try to load from Supabase
    try {
      const { data } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (data && data.length > 0) {
        setProjects(data);
        setFilteredProjects(data);
      } else {
        // If no data from Supabase, use static projects
        setProjects(staticProjects);
        setFilteredProjects(staticProjects);
      }
    } catch (error) {
      // If Supabase fails, use static projects
      console.log('Using static projects data');
      setProjects(staticProjects);
      setFilteredProjects(staticProjects);
    }

    setLoading(false);
  };

  // Helper function to count projects by category
  const getProjectCount = (categoryId: CategoryFilter) => {
    if (categoryId === 'all') return projects.length;
    if (categoryId === 'web-dev') {
      return projects.filter(p => p.category === 'webdev' || p.category === 'web-dev').length;
    }
    return projects.filter(p => p.category === categoryId).length;
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-4 flex items-center justify-center gap-4">
            <span className="text-6xl">𓂀</span>
            Projects
            <span className="text-6xl">𓂀</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A collection of cybersecurity tools, exploits, web applications, and development projects built with passion
          </p>
          <div className="mt-4 text-gray-400">
            <span className="text-[#D4AF37] font-bold">{projects.length}</span> projects in total
          </div>
        </div>

        <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              const count = getProjectCount(category.id);

              // Skip categories with 0 projects (except "all")
              if (count === 0 && category.id !== 'all') return null;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#1B2845] scale-105 shadow-lg shadow-[#D4AF37]/50'
                      : 'bg-[#1B2845]/50 text-gray-300 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:scale-105'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative flex items-center gap-2">
                    <Icon size={20} />
                    <span>{category.label}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      isActive ? 'bg-[#1B2845]/20' : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                    }`}>
                      {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin text-6xl text-[#D4AF37]">𓁢</div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="text-8xl mb-4">𓀠</div>
            <p className="text-2xl text-gray-400">No projects found in this category yet</p>
            <p className="text-gray-500 mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={project.id}
                data-aos="zoom-in"
                data-aos-delay={idx * 100}
                className="group relative bg-[#1B2845]/70 backdrop-blur-sm border-2 border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-[#D4AF37]/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform" />

                {project.image_url && (
                  <div className="h-48 overflow-hidden bg-[#0a0e1a]">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-mono">
                      {project.category}
                    </span>
                    {project.featured && (
                      <span className="text-2xl text-[#D4AF37]" title="Featured">𓁢</span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>

                  {project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.slice(0, 4).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 bg-[#2E8B93]/20 text-[#2E8B93] rounded text-xs font-mono"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded text-xs">
                          +{project.tech_stack.length - 4} more
                        </span>
                      )}
                    </div>
                  )}

                  <div className="flex gap-3 pt-4 border-t border-[#D4AF37]/20">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-[#1B2845] transition-all"
                      >
                        <Github size={18} />
                        <span className="text-sm font-medium">Code</span>
                      </a>
                    )}
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#2E8B93]/10 text-[#2E8B93] rounded-lg hover:bg-[#2E8B93] hover:text-white transition-all"
                      >
                        <ExternalLink size={18} />
                        <span className="text-sm font-medium">Demo</span>
                      </a>
                    )}
                    {!project.github_url && !project.project_url && (
                      <span className="px-4 py-2 text-gray-400 text-sm italic">
                        No links available
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
