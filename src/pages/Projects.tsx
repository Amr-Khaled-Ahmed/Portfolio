import { useEffect, useState } from 'react';
import { Github, ExternalLink, Code2, Shield, Bug, Swords } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Project } from '../types';

type CategoryFilter = 'all' | 'cyber' | 'malware' | 'offensive' | 'webdev' | 'crypto' | 'tools' | 'development';

const staticProjects: Project[] = [
  { id: '1', title: "CyberSec-Toolkit", description: "Comprehensive cybersecurity toolkit with automated vulnerability scanning and penetration testing utilities.", longDescription: "A comprehensive collection of cybersecurity tools designed for security professionals and researchers.", category: "tools", tech_stack: ["Python", "Bash", "Nmap", "SQLmap", "Custom Scripts", 'PowerShell', 'C++', 'C'], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/CyberSec-Toolkit", featured: true, created_at: "2024-01-01T00:00:00Z" },
  // { id: '2', title: "Advanced Cipher Implementation", description: "Custom cryptographic algorithms and cipher implementations for educational and research purposes.", longDescription: "A collection of advanced cryptographic implementations.", category: "crypto", tech_stack: ["Python", "C++", "Cryptography", "Mathematics", "Algorithm Design"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/some-cipher-for-fun", featured: true, created_at: "2024-01-02T00:00:00Z" },
  { id: '3', title: "Falcon Air Conditioning Website", description: "A responsive website built with Next.js for Falcon Air Conditioning services.", longDescription: "", category: "webdev", tech_stack: ["Next.js", "React", "JavaScript", "HTML", "CSS"], image_url: "", project_url: "https://falcon-air-conditioning.vercel.app/", github_url: "", featured: false, created_at: "2024-01-03T00:00:00Z" },
  // { id: '4', title: "Old Personal Portfolio", description: "A responsive website built with basic static Html, css, JS.", longDescription: "", category: "webdev", tech_stack: ["HTML", "CSS", "JavaScript"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/Portfolio", featured: false, created_at: "2024-01-04T00:00:00Z" },
  { id: '5', title: "Different Projects", description: "A good repo include many small projects in html, css, html that build in study journey.", longDescription: "", category: "webdev", tech_stack: ["HTML", "CSS", "JavaScript", "React", "TailWind", "BootStrap"], image_url: "", project_url: "https://amr-khaled-ahmed.github.io/GDG-front-end/", github_url: "", featured: false, created_at: "2024-01-05T00:00:00Z" },
  { id: '6', title: "Online Library Website", description: "A complete online library system with book management and user accounts.", longDescription: "", category: "webdev", tech_stack: ["HTML", "CSS", "JavaScript", "Django", "SQLite"], image_url: "", project_url: "https://online-library-website-five.vercel.app/", github_url: "", featured: false, created_at: "2024-01-06T00:00:00Z" },
  { id: '7', title: "Youssef Nihad Portfolio - khamsat job", description: "Complete portfoilo for ENG.youssef Cyber Security Expert", longDescription: "", category: "webdev", tech_stack: ["Web Development", "UI/UX Design", "HTML", "CSS", "JavaScript"], image_url: "", project_url: "https://yn0.org/", github_url: "", featured: true, created_at: "2024-01-07T00:00:00Z" },
  { id: '8', title: "Maravel Company - khamsat job", description: "Complete portfoilo for Maravel Company", longDescription: "", category: "webdev", tech_stack: ["Web Development", "UI/UX Design", "HTML", "CSS", "JavaScript"], image_url: "", project_url: "http://www.marafeel.com/", github_url: "", featured: false, created_at: "2024-01-08T00:00:00Z" },
  { id: '9', title: "FCAI Ciphers Examples", description: "Examples of cryptographic ciphers implemented for educational purposes.", longDescription: "", category: "crypto", tech_stack: ["C++", "Cryptography", "Algorithms"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/FCAI-Cairo-University-Ciphers-Examples", featured: false, created_at: "2024-01-09T00:00:00Z" },
  { id: '10', title: "Malware analysis work shop", description: "Repository include all GDSC Malware analysis workshop with some malwares analysis like ransomwares, trojans, rootkit, etc.", longDescription: "", category: "malware", tech_stack: ["Malware Analysis", "Reverse Engineering"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/Malware-analysis-work-shop", featured: true, created_at: "2024-01-10T00:00:00Z" },
  { id: '11', title: "Hash Calculator", description: "A tool to calculate hash values for files and text.", longDescription: "", category: "tools", tech_stack: ["Python", "Hashing Algorithms"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/hash-calculator-", featured: false, created_at: "2024-01-11T00:00:00Z" },
  { id: '12', title: "Key Logger", description: "A key logging tool for educational purposes.", longDescription: "", category: "tools", tech_stack: ["Python"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/key-logger", featured: false, created_at: "2024-01-12T00:00:00Z" },
  { id: '13', title: "Python Reverse Shell", description: "A reverse shell implementation with persistence in Python.", longDescription: "", category: "tools", tech_stack: ["Python", "Networking", "Socket Programming"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/python-reverse-shell-with-persistence", featured: false, created_at: "2024-01-13T00:00:00Z" },
  { id: '14', title: "Neovim Configuration", description: "My personal Neovim configuration for efficient coding.", longDescription: "", category: "development", tech_stack: ["Neovim", "Lua"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/nvim", featured: false, created_at: "2024-01-14T00:00:00Z" },
  { id: '15', title: "Binary Calculator", description: "A simple binary calculator implemented in Python.", longDescription: "", category: "development", tech_stack: ["Python"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/binary-calculator", featured: false, created_at: "2024-01-15T00:00:00Z" },
  { id: '16', title: "Vole Machine", description: "A simulation of a simple machine architecture.", longDescription: "", category: "development", tech_stack: ["C++"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/vole_machine", featured: false, created_at: "2024-01-16T00:00:00Z" },
  { id: '17', title: "OOP Board Games", description: "Object-oriented programming implementation of board games.", longDescription: "", category: "development", tech_stack: ["C++", "OOP", 'QT'], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/Assignment2_OOP_Board_Games", featured: false, created_at: "2024-01-17T00:00:00Z" },
  { id: '18', title: "Photoshop GUI Demo", description: "A demo of a Photoshop-like GUI built with Python.", longDescription: "", category: "development", tech_stack: ["C++", "GUI", "QT"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/Demo_photoshop-GUI", featured: false, created_at: "2024-01-18T00:00:00Z" },
  { id: '19', title: "Collage System Management", description: "A system for managing college-related tasks and data.", longDescription: "", category: "development", tech_stack: ["Java", "Database"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/Collage-System-Management", featured: false, created_at: "2024-01-19T00:00:00Z" },
  { id: '20', title: "Math-3 Project", description: "A project for matrix calculations and Hell Cipher algorithms.", longDescription: "", category: "development", tech_stack: ["Mathematics", "Cryptography", "QT"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/Math-3_Project", featured: false, created_at: "2024-01-20T00:00:00Z" },
  { id: '21', title: "Powershell Configuration", description: "A project for powershell configuration", longDescription: "", category: "development", tech_stack: ["Powershell", "Oh-my-posh"], image_url: "", project_url: "", github_url: "https://github.com/Amr-Khaled-Ahmed/Oh-my-posh-Windows-power-shell", featured: false, created_at: "2024-01-21T00:00:00Z" },
  // === NEWLY ADDED MISSING PROJECTS (including forks) ===
  {
    id: '22',
    title: "Assembly Offensive Lab",
    description: "A structured 20-stage roadmap for mastering Assembly with a focus on offensive security techniques.",
    longDescription: "From low-level I/O and syscalls to shellcoding, malware concepts, rootkits, and hypervisors – this lab builds both fundamentals and advanced offensive engineering skills.",
    category: "offensive",
    tech_stack: ["Assembly (x86)", "Shellcoding", "Syscalls", "Rootkits", "Hypervisors"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/assembly-offensive-lab",
    featured: true,
    created_at: "2025-09-10T20:04:03Z"
  },
  {
    id: '23',
    title: "Car Wash Simulation",
    description: "An interactive simulation of a car wash system with queue management and resource allocation.",
    longDescription: "Models a real-world car wash facility – handles customer queues, service bays, washing stages, and time tracking. Demonstrates object-oriented design principles.",
    category: "development",
    tech_stack: ["C++", "OOP", "Data Structures", "Simulation Logic"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Car-Wash-Simulation",
    featured: false,
    created_at: "2025-11-15T12:00:00Z"
  },
  {
    id: '24',
    title: "CLI Simulator",
    description: "A command‑line interface simulator that mimics a Linux terminal environment.",
    longDescription: "Interactive CLI with built‑in commands, file system simulation, and script execution capabilities – great for learning shell internals.",
    category: "tools",
    tech_stack: ["C++", "CLI", "System Programming"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/CLI-simulator",
    featured: false,
    created_at: "2025-12-01T00:00:00Z"
  },
  {
    id: '25',
    title: "Computer Graphics Term Project",
    description: "3D graphics rendering and transformations using OpenGL.",
    longDescription: "A university term project covering 3D modeling, lighting, textures, and camera controls – built with OpenGL and C++.",
    category: "development",
    tech_stack: ["C++", "OpenGL", "GLSL", "3D Mathematics"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Computer-Graphics-Term-Project",
    featured: false,
    created_at: "2025-12-02T00:00:00Z"
  },
  {
    id: '26',
    title: "Connect Four Game",
    description: "Classic two‑player Connect Four game with a clean terminal interface.",
    longDescription: "Fully functional Connect Four implementation with input validation, win detection, and an optional AI opponent.",
    category: "development",
    tech_stack: ["Python", "Game Logic", "CLI"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/connect-four-game",
    featured: false,
    created_at: "2025-12-03T00:00:00Z"
  },
  {
    id: '27',
    title: "Contact Manager CLI",
    description: "A simple command‑line contact management system written in C++.",
    longDescription: "Add, delete, search, and list contacts – stores data in a file for persistence. Good example of CRUD operations in C++.",
    category: "development",
    tech_stack: ["C++", "File I/O", "CLI"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Contact-Manager-CLI-C-",
    featured: false,
    created_at: "2025-12-04T00:00:00Z"
  },
  {
    id: '28',
    title: "CPU Schedulers Simulator",
    description: "Simulation of common CPU scheduling algorithms (FCFS, SJF, Round Robin, Priority).",
    longDescription: "Visualizes process scheduling, calculates turnaround and waiting times – useful for operating systems coursework.",
    category: "development",
    tech_stack: ["C++", "Algorithms", "Simulation"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/CPU-Schedulers-Simulator",
    featured: false,
    created_at: "2025-12-05T00:00:00Z"
  },
  {
    id: '29',
    title: "Data Compression Algorithms",
    description: "Implementation of classic lossless compression algorithms (Huffman, LZW, Run‑Length).",
    longDescription: "Educational project demonstrating how compression works – includes encoder/decoder modules and performance comparisons.",
    category: "tools",
    tech_stack: ["Python", "Algorithms", "Data Compression"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Data-Compression-Algorithms-",
    featured: false,
    created_at: "2025-12-06T00:00:00Z"
  },
  {
    id: '30',
    title: "Data Structures Library",
    description: "Custom implementations of fundamental data structures (lists, stacks, queues, trees, hash tables).",
    longDescription: "Written from scratch in C++ for learning purposes – includes unit tests and complexity analysis.",
    category: "development",
    tech_stack: ["C++", "Data Structures", "Algorithms"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Data-Structures",
    featured: false,
    created_at: "2025-12-07T00:00:00Z"
  },
  {
    id: '32',
    title: "FCAI Fraction Calculator",
    description: "A fraction arithmetic calculator with simplification and operations (+, -, *, /).",
    longDescription: "University project – handles improper fractions, mixed numbers, and reduction to lowest terms.",
    category: "development",
    tech_stack: ["C++", "Mathematics", "OOP"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/FCAI-Cairo-University-Fraction-Calculator-",
    featured: false,
    created_at: "2025-12-09T00:00:00Z"
  },
  {
    id: '33',
    title: "FCAI Photoshop Application",
    description: "A simplified image editing tool with filters, layers, and basic drawing tools.",
    longDescription: "University project emulating core Photoshop features – supports blur, sharpen, brightness/contrast, and more.",
    category: "development",
    tech_stack: ["C++", "Qt", "Image Processing"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/FCAI-Cairo-University-Photoshop-Application",
    featured: false,
    created_at: "2025-12-10T00:00:00Z"
  },
  {
    id: '34',
    title: "Matrix Calculator v2",
    description: "Advanced matrix operations: determinant, inverse, eigenvalues, and system solver.",
    longDescription: "Command‑line matrix calculator with support for real and complex matrices – written in C++.",
    category: "development",
    tech_stack: ["C++", "Linear Algebra", "Numerical Methods"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/matrix-calc-v2",
    featured: false,
    created_at: "2025-12-11T00:00:00Z"
  },
  {
    id: '35',
    title: "PowerShell 7 Configuration",
    description: "Custom PowerShell 7 profile with aliases, prompt styling, and useful functions.",
    longDescription: "Dotfiles for PowerShell 7 – includes Oh‑My‑Posh theme, custom modules, and productivity aliases.",
    category: "development",
    tech_stack: ["PowerShell", "Oh‑My‑Posh", "Terminal"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/My-powerShell-configuration-7",
    featured: false,
    created_at: "2025-12-12T00:00:00Z"
  },
  {
    id: '36',
    title: "Restaurant System",
    description: "A restaurant management system for orders, menus, and billing.",
    longDescription: "Console‑based application that handles table reservations, order tracking, and invoice generation.",
    category: "development",
    tech_stack: ["C++", "OOP", "File Handling"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/Restaurant-System",
    featured: false,
    created_at: "2025-12-13T00:00:00Z"
  },
  {
    id: '37',
    title: "Something New (Sandbox)",
    description: "A personal sandbox repository for experiments and quick prototypes.",
    longDescription: "Miscellaneous code snippets, algorithm tests, and proof‑of‑concepts – not production ready.",
    category: "development",
    tech_stack: ["Python", "C++", "Bash"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/some_thing_new",
    featured: false,
    created_at: "2025-12-14T00:00:00Z"
  },
  {
    id: '38',
    title: "X (Twitter) Copy",
    description: "A front‑end clone of the X (Twitter) home page.",
    longDescription: "Static HTML/CSS replication of Twitter's layout – practice project for responsive design and CSS Grid/Flexbox.",
    category: "webdev",
    tech_stack: ["HTML", "CSS", "JavaScript"],
    image_url: "",
    project_url: "",
    github_url: "https://github.com/Amr-Khaled-Ahmed/x-twitter-copy",
    featured: false,
    created_at: "2025-12-15T00:00:00Z"
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [loading, setLoading] = useState(true);

  const categories = [
    { id: 'all' as CategoryFilter, label: 'All Projects', icon: Code2, color: 'from-[#D4AF37] to-[#C19A6B]' },
    { id: 'webdev' as CategoryFilter, label: 'Web Development', icon: Code2, color: 'from-blue-500 to-cyan-500' },
    { id: 'cyber' as CategoryFilter, label: 'Cyber Security', icon: Shield, color: 'from-green-500 to-emerald-500' },
    { id: 'malware' as CategoryFilter, label: 'Malware', icon: Bug, color: 'from-pink-500 to-rose-500' },
    { id: 'offensive' as CategoryFilter, label: 'Offensive', icon: Swords, color: 'from-red-500 to-orange-500' },
    { id: 'tools' as CategoryFilter, label: 'Tools', icon: Code2, color: 'from-purple-500 to-pink-500' },
    { id: 'crypto' as CategoryFilter, label: 'Cryptography', icon: Shield, color: 'from-yellow-500 to-amber-500' },
    { id: 'development' as CategoryFilter, label: 'Development', icon: Code2, color: 'from-indigo-500 to-purple-500' },
  ];

  useEffect(() => { loadProjects(); }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory, projects]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error || !data || data.length === 0) {
        setProjects(staticProjects);
        setFilteredProjects(staticProjects);
      } else {
        setProjects(data);
        setFilteredProjects(data);
      }
    } catch {
      setProjects(staticProjects);
      setFilteredProjects(staticProjects);
    }
    setLoading(false);
  };

  const getProjectCount = (categoryId: CategoryFilter) => {
    if (categoryId === 'all') return projects.length;
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
              if (count === 0 && category.id !== 'all') return null;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 overflow-hidden ${isActive ? 'bg-[#D4AF37] text-[#1B2845] scale-105 shadow-lg shadow-[#D4AF37]/50' : 'bg-[#1B2845]/50 text-gray-300 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:scale-105'}`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative flex items-center gap-2">
                    <Icon size={20} />
                    <span>{category.label}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${isActive ? 'bg-[#1B2845]/20' : 'bg-[#D4AF37]/20 text-[#D4AF37]'}`}>{count}</span>
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
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-mono">{project.category}</span>
                    {project.featured && <span className="text-2xl text-[#D4AF37]" title="Featured">𓁢</span>}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-4 line-clamp-3">{project.description}</p>
                  {project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech_stack.slice(0, 4).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-[#2E8B93]/20 text-[#2E8B93] rounded text-xs font-mono">{tech}</span>
                      ))}
                      {project.tech_stack.length > 4 && (
                        <span className="px-2 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded text-xs">+{project.tech_stack.length - 4} more</span>
                      )}
                    </div>
                  )}
                  <div className="flex gap-3 pt-4 border-t border-[#D4AF37]/20">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-[#1B2845] transition-all">
                        <Github size={18} /><span className="text-sm font-medium">Code</span>
                      </a>
                    )}
                    {project.project_url && (
                      <a href={project.project_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-[#2E8B93]/10 text-[#2E8B93] rounded-lg hover:bg-[#2E8B93] hover:text-white transition-all">
                        <ExternalLink size={18} /><span className="text-sm font-medium">Demo</span>
                      </a>
                    )}
                    {!project.github_url && !project.project_url && (
                      <span className="px-4 py-2 text-gray-400 text-sm italic">No links available</span>
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