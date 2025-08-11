import React, { useState, useEffect } from 'react';
import Timeline from '../components/Timeline';
import LoadingProgress from '../components/LoadingProgress';
import Footer from '../components/Footer';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  const addTerminalLine = (text: string) => {
    setTerminalText(prev => [...prev, text]);
  };

  const simulateHack = () => {
    setTerminalText([]);
    setShowTerminal(true);
    setIsDownloading(true);
    setAccessGranted(false);
    setDownloadProgress(0);

    const messages = [
      "[*] Initializing secure connection...",
      "[*] Establishing encrypted tunnel (AES-256)...",
      "[*] Bypassing firewall protections...",
      "[*] Spoofing MAC address...",
      "[*] Verifying PGP credentials...",
      "[*] Accessing secure server (SSH)...",
      "[*] Decrypting CV package...",
      "[*] Validating SHA-256 checksum..."
    ];

    messages.forEach((msg, i) => {
      setTimeout(() => {
        addTerminalLine(msg);
        if (i === messages.length - 1) {
          setTimeout(() => {
            setAccessGranted(true);
            addTerminalLine("[+] ACCESS GRANTED");
            addTerminalLine("[*] Initiating secure download sequence...");
            startDownload();
          }, 800);
        }
      }, i * 800);
    });
  };

  const startDownload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          completeDownload();
        }, 500);
      }
      setDownloadProgress(progress);
      addTerminalLine(`[↓] Downloading CV: ${progress.toFixed(0)}% complete`);
    }, 150);
  };


  const completeDownload = async () => {
    try {
      const fileName = "CV.pdf"; // EXACT name from public/cv folder
      const filePath = `/cv/${fileName}`; // Path relative to the site root

      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath} (status: ${response.status})`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      addTerminalLine("[✓] Download complete!");
      addTerminalLine("[✓] File integrity verified");

      setTimeout(() => {
        setIsDownloading(false);
        setShowTerminal(false);
      }, 1500);
    } catch (error: any) {
      console.error(error);
      addTerminalLine("[!] ERROR: Download failed!");
      addTerminalLine(`[*] ${error.message}`);
      setIsDownloading(false);
    }
  };


  const services = [
    {
      title: "Penetration Testing",
      subtitle: "Web Applications & Networks",
      description: "Comprehensive security assessments using industry-standard methodologies including OWASP Top 10, network vulnerability analysis, and exploitation techniques.",
      icon: "fas fa-crosshairs",
      skills: ["OWASP", "Nmap", "Burp Suite", "Metasploit", "SQL Injection"]
    },
    {
      title: "Vulnerability Assessment",
      subtitle: "Infrastructure & Application Security",
      description: "Systematic identification and analysis of security vulnerabilities in web applications, mobile apps, and network infrastructure with detailed remediation guidance.",
      icon: "fas fa-search",
      skills: ["Nessus",'Acunetix', "Risk Assessment"]
    },
    // {
    //   title: "Security Consulting",
    //   subtitle: "Strategic Security Guidance",
    //   description: "Expert consultation on cybersecurity best practices, compliance requirements, security architecture design, and incident response planning.",
    //   icon: "fas fa-shield-alt",
    //   skills: ["ISO 27001", "PCI DSS", "NIST", "Security Architecture", "Compliance"]
    // },
    // {
    //   title: "Red Team Operations",
    //   subtitle: "Advanced Threat Simulation",
    //   description: "Sophisticated attack simulations mimicking real-world adversaries to test organizational security posture and response capabilities.",
    //   icon: "fas fa-user-ninja",
    //   skills: ["Social Engineering", "Physical Security", "OSINT"]
    // }
  ];

  const skills = [
    // {
    //   title: "Web Application Security",
    //   subtitle: "Advanced Testing Methodologies",
    //   description: "Expert in identifying and exploiting web application vulnerabilities including XSS, SQL injection, CSRF, and business logic flaws using manual and automated techniques.",
    //   icon: "fas fa-globe",
    //   skills: ["Burp Suite", "OWASP ZAP", "SQLmap", "XSS", "CSRF", "Authentication Bypass"]
    // },
    {
      title: "Network Security",
      subtitle: "Infrastructure Assessment",
      description: "Comprehensive network security testing including port scanning, service enumeration, vulnerability identification, and lateral movement techniques.",
      icon: "fas fa-network-wired",
      skills: ["Nmap", "Wireshark", "Metasploit", "Nessus", "PowerShell", "Linux"]
    },
    {
      title: "Malware Analysis",
      subtitle: "Reverse Engineering",
      description: "Static and dynamic malware analysis, reverse engineering, and threat intelligence gathering to understand attack vectors and develop countermeasures.",
      icon: "fas fa-virus",
      skills: ["IDA Pro", "Ghidra", "OllyDbg", "Sandbox Analysis", "Assembly", "Python"]
    },
    // {
    //   title: "Digital Forensics",
    //   subtitle: "Incident Investigation",
    //   description: "Digital evidence collection, analysis, and incident response activities including memory forensics, disk analysis, and network traffic examination.",
    //   icon: "fas fa-search-plus",
    //   skills: ["Volatility", "Autopsy", "FTK", "Wireshark", "Memory Analysis", "Timeline Analysis"]
    // }
  ];

  if (isLoading) {
    return <LoadingProgress onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_70%)]"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <div data-aos="zoom-in" className="mb-8">
            <div className="w-40 h-40 mx-auto mb-8 relative">
              <div className="w-full h-full bg-gradient-to-br from-primary via-accent to-primary rounded-full flex items-center justify-center shadow-2xl animate-pulse-glow">
                <i className="fas fa-shield-alt text-5xl text-white"></i>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary rounded-full animate-ping opacity-20"></div>
              <div className="absolute -inset-4 bg-gradient-to-br from-primary via-accent to-primary rounded-full animate-pulse opacity-10"></div>
            </div>
          </div>

          <h1
            data-aos="fade-up"
            data-aos-delay="200"
            className="text-5xl md:text-7xl font-bold text-text-primary mb-8 leading-tight"
          >
            <span className="text-gradient">Amr Khaled Ahmed</span>
            <span className="block text-3xl md:text-5xl text-primary font-normal mt-4 animate-float">
              Cybersecurity
            </span>
          </h1>

          <p
            data-aos="fade-up"
            data-aos-delay="400"
            className="text-xl md:text-2xl text-text-secondary mb-12 leading-relaxed max-w-4xl mx-auto"
          >
            Specialized in penetration testing, vulnerability assessment, and advanced security consulting.
            Protecting digital assets through comprehensive security solutions and innovative cybersecurity research.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="600"
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12"
          >
            <div className="relative">
              <button
                onClick={simulateHack}
                disabled={isDownloading}
                className={`cv-download-btn flex items-center space-x-3 text-lg relative overflow-hidden ${isDownloading ? 'opacity-75' : ''}`}
              >
                {isDownloading ? (
                  <>
                    <div
                      className="absolute inset-0 bg-primary/10"
                      style={{ width: `${downloadProgress}%` }}
                    />
                    <span className="relative z-10 flex items-center">
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      {downloadProgress.toFixed(0)}%
                    </span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-download"></i>
                    <span>Download CV</span>
                  </>
                )}
              </button>
              {accessGranted && (
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-blue-500 animate-pulse"></div>
              )}
            </div>

            <a
              href="/contact"
              className="px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-xl font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-lg"
            >
              <i className="fas fa-envelope"></i>
              <span>Get In Touch</span>
            </a>

            <a
              href="/projects"
              className="px-8 py-4 bg-accent hover:bg-primary text-text-primary hover:text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-3 text-lg"
            >
              <i className="fas fa-code"></i>
              <span>View Projects</span>
            </a>
          </div>

          {/* Contact Info */}
          <div
            data-aos="fade-up"
            data-aos-delay="800"
            className="flex flex-wrap justify-center gap-8 text-text-secondary"
          >

            <a href="mailto:amrkhaledv2171516@gmail.com" className="flex items-center space-x-3 hover:text-primary transition-colors group">
              <div className="w-12 h-12 bg-accent group-hover:bg-primary rounded-lg flex items-center justify-center transition-all">
                <i className="fas fa-envelope group-hover:text-white"></i>
              </div>
              <span className="font-medium">amrkhaledv2171516@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/amr-el-dahshan-843a11306" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3 hover:text-primary transition-colors group">
              <div className="w-12 h-12 bg-accent group-hover:bg-primary rounded-lg flex items-center justify-center transition-all">
                <i className="fab fa-linkedin group-hover:text-white"></i>
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>
          </div>
        </div>

  {/* Terminal Modal */}
  {showTerminal && (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl h-[32rem] bg-gray-900 border border-green-400/50 rounded-lg overflow-hidden shadow-2xl font-mono">
        <div className="flex items-center bg-gray-800/90 px-4 py-2 border-b border-green-400/50">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-green-400 text-sm flex-1">
            Secure Download Terminal - root@amrkhaled:~$
          </div>
          <div className="text-gray-400 text-xs">
            {new Date().toLocaleTimeString()}
          </div>
        </div>
        <div className="p-4 h-[calc(100%-3rem)] overflow-y-auto text-green-400 text-sm">
          <div className="mb-2">Welcome to secure download terminal v3.2.1</div>
          <div className="mb-2">Type 'help' for available commands</div>
          <div className="mb-2">Initializing secure connection...</div>
          {terminalText.map((line, i) => (
            <div key={i} className={`mb-1 ${line.startsWith('[!]') ? 'text-red-400' : line.startsWith('[✓]') ? 'text-green-400' : line.startsWith('[*]') ? 'text-blue-400' : 'text-green-400'}`}>
              {line}
              {i === terminalText.length - 1 && (
                <span className="ml-1 animate-pulse">█</span>
              )}
            </div>
          ))}
        </div>
        {!isDownloading && (
          <button
            onClick={() => setShowTerminal(false)}
            className="absolute top-4 right-4 text-gray-300 hover:text-white transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>
    </div>
  )}      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">About Me</h2>
            <p className="text-xl text-text-secondary leading-relaxed max-w-4xl mx-auto">
              A dedicated cybersecurity professional with expertise in penetration testing, vulnerability assessment,
              and security consulting. Passionate about protecting digital infrastructure and educating others about
              cybersecurity best practices.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl card-hover">
                <h3 className="text-2xl font-bold text-text-primary mb-6">Professional Background</h3>
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-graduation-cap text-primary text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-lg">Education</h4>
                      <p className="text-text-secondary">Computer Science & Cybersecurity Focus</p>
                      <p className="text-sm text-primary">Cairo University - Expected 2027</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-briefcase text-primary text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-lg">Experience</h4>
                      <p className="text-text-secondary">Penetration Testing & Security Consulting</p>
                      <p className="text-sm text-primary">DSC Cybersecurity Committee Member</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <i className="fas fa-trophy text-primary text-xl"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary text-lg">Achievements</h4>
                      <p className="text-text-secondary">Multiple Security Certifications & Bug Bounties</p>
                      <p className="text-sm text-primary">Active Security Researcher</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl card-hover">
                <h3 className="text-2xl font-bold text-text-primary mb-6">Core Competencies</h3>
                <div className="space-y-6">
                  {[
                    { skill: "Penetration Testing", icon: "fas fa-crosshairs" },
                    { skill: "Web Security", icon: "fas fa-globe" },
                    { skill: "Network Security",  icon: "fas fa-network-wired" },
                    { skill: "Malware Analysis",  icon: "fas fa-virus" },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-3">
                          <i className={`${item.icon} text-primary`}></i>
                          <span className="font-medium text-text-primary">{item.skill}</span>
                        </div>
                      </div>
                      {/* <div className="w-full bg-accent/30 rounded-full h-3">
                        <div
                          className="bg-gradient-to-r from-primary to-accent h-3 rounded-full transition-all duration-1000 shadow-glow"
                          style={{ width: `${item.level}%` }}
                          data-aos="slide-right"
                          data-aos-delay={index * 100}
                        ></div>
                      </div> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* University Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">Education</h2>
            <p className="text-xl text-text-secondary">Academic foundation in computer science and cybersecurity</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div data-aos="fade-right">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl card-hover">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className="fas fa-university text-3xl text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-text-primary">Cairo University</h3>
                    <p className="text-primary font-semibold">Faculty of Computers and Artificial Intelligence</p>
                  </div>
                </div>

                <h4 className="text-xl font-bold text-text-primary mb-4">Bachelor of Science in Computer Science</h4>

                <p className="text-text-secondary mb-6 leading-relaxed">
                  Kickstart my journey in programming with a strong foundation in essential concepts.
                  This program emphasizes problem-solving, time management, and teamwork, providing an
                  optimal environment for beginners to excel in the field of programming.
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary"></i>
                    <span className="text-text-secondary">Gain proficiency in C++, Java, and Python, QT, django, html, JavaScript, CSS</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary"></i>
                    <span className="text-text-secondary">Master Object-Oriented Programming (OOP), data structures, , algorithms,and Software engineering </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary"></i>
                    <span className="text-text-secondary">Explore web development and database management</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <i className="fas fa-check-circle text-primary"></i>
                    <span className="text-text-secondary">Build a solid foundation in your preferred specialization</span>
                  </div>
                </div>

                <div className="bg-accent/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <i className="fas fa-calendar text-primary"></i>
                    <span className="text-text-primary font-semibold">Expected Graduation: 2027</span>
                  </div>
                </div>
              </div>
            </div>

            <div data-aos="fade-left">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-xl card-hover">
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.lV99XaQQmW4BIjEp0kjTPgHaEI?rs=1&pid=ImgDetMain&o=7&rm=3"
                  alt="Cairo University Campus"
                  className="w-full h-64 object-cover rounded-lg mb-6"
                />
                <div className="text-center">
                  <h4 className="text-xl font-bold text-text-primary mb-2">Campus Life</h4>
                  <p className="text-text-secondary">
                    Engaging in academic excellence and cybersecurity research at one of Egypt's
                    premier institutions for computer science and artificial intelligence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">Technical Skills</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive expertise across multiple domains of cybersecurity and software development
            </p>
          </div>

          <div className="skills-grid">
            <div data-aos="fade-up" data-aos-delay="100" className="skills-category">
              <h3>
                <i className="fas fa-code text-primary"></i>
                Programming Languages & Scripting
              </h3>
              <div className="skills-list">
                {['C++', 'C', 'Python', 'Bash Script', 'PowerShell', 'Batch files', 'SQL', 'PHP', 'Java', 'JavaScript', 'HTML', 'CSS', 'Assembly'].map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="200" className="skills-category">
              <h3>
                <i className="fas fa-globe text-primary"></i>
                Web Development
              </h3>
              <div className="skills-list">
                {['Django', 'Bootstrap', 'Python', 'Microsoft SQL', 'SQLite', 'React', 'TailWind CSS','HTML','JavaScript'].map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="300" className="skills-category">
              <h3>
                <i className="fas fa-shield-alt text-primary"></i>
                Cybersecurity Tools
              </h3>
              <div className="skills-list">
                {['Burp Suite', 'Metasploit', 'Nmap', 'Wireshark', 'OWASP ZAP', 'Nessus', 'SQLmap', 'Ghidra', 'IDA Pro','DIE','x46dbg','gdb','other tools ...'].map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>

            </div>

            {/* <div data-aos="fade-up" data-aos-delay="400" className="skills-category">
              <h3>
                <i className="fas fa-search-plus text-primary"></i>
                Digital Forensics
              </h3>
              <div className="skills-list">
                {['Volatility', 'Autopsy', 'FTK', 'Memory Analysis', 'Timeline Analysis', 'Evidence Collection'].map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Services Timeline */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">Services</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Comprehensive cybersecurity services designed to protect your digital assets and infrastructure
            </p>
          </div>
          <Timeline items={services} type="services" />
        </div>
      </section>

      {/* Technical Skills Timeline */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">Expertise Areas</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              Advanced expertise across multiple cybersecurity domains and technologies
            </p>
          </div>
          <Timeline items={skills} type="skills" />
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8">Activities & Involvement</h2>
            <p className="text-xl text-text-secondary">Contributing to the cybersecurity community and advancing the field</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div data-aos="fade-up" data-aos-delay="100" className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-users text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">DSC Cybersecurity Committee</h3>
              <p className="text-text-secondary leading-relaxed">
                Active member of the Developer Student Club Cybersecurity Committee, organizing workshops
                and security awareness programs for students.
              </p>
            </div>



            <div data-aos="fade-up" data-aos-delay="300" className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-graduation-cap text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Community Education</h3>
              <p className="text-text-secondary leading-relaxed">
                Regular participation in cybersecurity forums, conferences, and local security meetups to share
                knowledge and learn from peers.
              </p>
            </div>

            <div data-aos="fade-up" data-aos-delay="400" className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6 mx-auto">
                <i className="fas fa-code text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-bold text-text-primary mb-4">Open Source Projects</h3>
              <p className="text-text-secondary leading-relaxed">
                Development and contribution to open-source security tools and educational resources for the
                cybersecurity community.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
