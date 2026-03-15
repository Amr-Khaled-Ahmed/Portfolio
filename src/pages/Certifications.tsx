import { useState } from 'react';
import { Award, Calendar, Building2, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  skills: string[];
}

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const certificates: Certificate[] = [
    {
      id: 20,
      title: "Fortinet Cybersecurity Engineer",
      issuer: "Digital Egypt Pioneers Initiative (MCIT Egypt)",
      date: "Issued: December 2025",
      description: "Completed the Digital Egypt Pioneers (DEPI) program with a focus on Infrastructure and Security as a Fortinet Cybersecurity Engineer. The training covered CCNA (200-301) networking fundamentals alongside hands-on experience with FortiGate and FortiManager (v7.6). The program emphasized planning, implementing, managing, monitoring, and upgrading enterprise security solutions using Fortinet technologies, including firewalls, intrusion detection systems, VPNs, and threat protection. It also involved vulnerability assessment, incident response, security policy development, system hardening, and collaboration on security projects within enterprise environments.",
      imageUrl: "/certificates/NTI_DEPI_R3.png",
      skills: [
        "CCNA 200-301",
        "Network Fundamentals",
        "FortiGate 7.6",
        "FortiManager 7.6",
        "Firewall Configuration",
        "Intrusion Detection & Prevention",
        "VPN Technologies",
        "Threat & Malware Protection",
        "Vulnerability Assessment",
        "Risk Analysis",
        "Security Policies & Standards",
        "Incident Response",
        "Infrastructure Security",
        "Enterprise Network Security"
      ]
},

    {
      id: 19,
      title: "CCNA: Enterprise Networking, Security, and Automation",
      issuer: "Cisco Networking Academy",
      date: "Issued: October 2025",
      description: "Explored advanced enterprise design, scalability, and programmable networks. This certification marks the completion of the full CCNA (200-301) learning path.",
      imageUrl: "/certificates/security_automation.png",
      skills: ["OSPF & EIGRP", "WAN & VPN", "NAT", "QoS", "Threat Mitigation", "Network Automation", "SDN"]
    },
    {
      id: 18,
      title: "CCNA: Switching, Routing, and Wireless Essentials",
      issuer: "Cisco Networking Academy",
      date: "Issued: September 2025",
      description: "Deepened understanding of network operations and interconnectivity for small to medium-sized networks.",
      imageUrl: "/certificates/switching_routing_wirelessEssentials.png",
      skills: ["VLANs & Trunking", "Spanning Tree Protocol", "Dynamic Routing", "Wireless LAN", "ACLs", "Network Security"]
    },
    {
      id: 17,
      title: "CCNA: Introduction to Networks",
      issuer: "Cisco Networking Academy",
      date: "Issued: August 2025",
      description: "Focused on understanding networking fundamentals, device configurations, and IP addressing.",
      imageUrl: "/certificates/introduction_to_networks.png",
      skills: ["Network Fundamentals", "Ethernet & Switching", "IPv4/IPv6", "Subnetting", "Router Configuration", "Troubleshooting"]
    },
    {
      id: 16,
      title: "Cyber Security for Beginners",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Introduction to Cybersecurity covering basic concepts, tools, Courses, Fields, and resources for beginners.",
      imageUrl: "/certificates/Cyber sec for beginners.png",
      skills: ["Cybersecurity Fundamentals", "Security Tools", "Beginner Concepts"]
    },
    {
      id: 15,
      title: "Cloud and Virtualization Concepts",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Network Virtualization concepts certification covering the fundamentals of virtual networks and their applications.",
      imageUrl: "/certificates/Certificate- cloud .png",
      skills: ["Cloud Computing", "Virtualization", "Network Concepts"]
    },
    {
      id: 14,
      title: "Red Hat System Administration 1",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Red Hat System Administration 1 certification focusing on essential Linux administration skills and system management.",
      imageUrl: "/certificates/Red hat system admin 1.png",
      skills: ["Linux Administration", "System Management", "Red Hat"]
    },
    {
      id: 13,
      title: "Network Virtualization Concepts",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Network Virtualization concepts certification covering the fundamentals of virtual networks and their applications.",
      imageUrl: "/certificates/Certificate network vm.png",
      skills: ["Network Virtualization", "Virtual Networks", "VM Concepts"]
    },
    {
      id: 12,
      title: "GDSC Front-End Development Track",
      issuer: "Google Developer Groups - Damanhour University",
      date: "Issued: 2024-2025",
      description: "Completed 60 hours of intensive Front-End Development training, building real-world projects using modern technologies and APIs. Gained comprehensive knowledge in modern web development stack.",
      imageUrl: "/certificates/gdg_fronend.png",
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Vite", "MongoDB", "Cloudinary", "Postman", "REST APIs", "Frontend Development"]
    },
    {
      id: 11,
      title: "JavaScript Programming Language",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Comprehensive course on core JavaScript concepts including data types, functions, OOP, DOM manipulation, JSON, AJAX, and event handling.",
      imageUrl: "/certificates/js.png",
      skills: ["JavaScript", "DOM Manipulation", "AJAX", "OOP"]
    },
    {
      id: 10,
      title: "Database Fundamentals",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Introduction to database systems covering SQL, database design, and management principles.",
      imageUrl: "/certificates/db_intro.png",
      skills: ["SQL", "Database Design", "DB Management"]
    },
    {
      id: 9,
      title: "Python Programming",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Advanced Python programming including web development, automation.",
      imageUrl: "/certificates/python.png",
      skills: ["Python", "Web Development", "Automation"]
    },
    {
      id: 8,
      title: "Network Security",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Network security principles including firewalls, VPNs, intrusion detection, and prevention systems.",
      imageUrl: "/certificates/network2.png",
      skills: ["Network Security", "Firewalls", "VPN", "Intrusion Detection"]
    },
    {
      id: 7,
      title: "Network Fundamentals",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Computer networking fundamentals including TCP/IP, routing, switching, and network protocols.",
      imageUrl: "/certificates/network1.png",
      skills: ["Networking", "TCP/IP", "Routing", "Switching"]
    },
    {
      id: 6,
      title: "Ethical Hacking",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Advanced ethical hacking course covering penetration testing and vulnerability assessment.",
      imageUrl: "/certificates/CHE.png",
      skills: ["Ethical Hacking", "Penetration Testing", "Vulnerability Assessment"]
    },
    {
      id: 5,
      title: "Web Development",
      issuer: "IEEE",
      date: "Issued: 2023",
      description: "Modern web development certification covering HTML5, CSS3, JavaScript, and responsive design principles.",
      imageUrl: "/certificates/CC6.png",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    {
      id: 4,
      title: "OSINT",
      issuer: "Udemy",
      date: "Issued: October 2023",
      description: "Open Source Intelligence certification focusing on information gathering techniques from public sources for security analysis.",
      imageUrl: "/certificates/osint.jpg",
      skills: ["OSINT", "Information Gathering", "Security Analysis"]
    },
    {
      id: 3,
      title: "Linux Administration",
      issuer: "Udemy",
      date: "Issued: October 2023",
      description: "Comprehensive Linux administration certification covering system management, shell scripting, and server configuration.",
      imageUrl: "/certificates/linux.jpg",
      skills: ["Linux", "System Administration", "Shell Scripting"]
    },
    {
      id: 2,
      title: "CMD",
      issuer: "Udemy",
      date: "Issued: October 2023",
      description: "Windows Command Line Certification covering all essential commands and scripting techniques for effective system administration and automation.",
      imageUrl: "/certificates/UC-eb7d17b4-9788-4b0e-ae0a-98d9621d634c.jpg",
      skills: ["Command Line", "Windows CMD", "System Administration"]
    },
    {
      id: 1,
      title: "start CyberSecurity learning",
      issuer: "Udemy",
      date: "Issued: 2023",
      description: "Introduction to Cybersecurity covering basic concepts, tools, Courses, Fields, and resources for beginners.",
      imageUrl: "/certificates/guide.jpg",
      skills: ["Cybersecurity Basics", "Learning Path", "Beginner Guide"]
    },
  ];

  const issuers = ['all', ...Array.from(new Set(certificates.map(cert => cert.issuer)))];

  const filteredCertificates = filter === 'all'
    ? certificates
    : certificates.filter(cert => cert.issuer === filter);

  const handlePrevious = () => {
    if (!selectedCert) return;
    const currentIndex = filteredCertificates.findIndex(c => c.id === selectedCert.id);
    if (currentIndex > 0) {
      setSelectedCert(filteredCertificates[currentIndex - 1]);
    }
  };

  const handleNext = () => {
    if (!selectedCert) return;
    const currentIndex = filteredCertificates.findIndex(c => c.id === selectedCert.id);
    if (currentIndex < filteredCertificates.length - 1) {
      setSelectedCert(filteredCertificates[currentIndex + 1]);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-4 flex items-center justify-center gap-4">
            <span className="text-6xl">𓉠</span>
            Certifications
            <span className="text-6xl">𓉠</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A collection of my professional certifications and achievements in cybersecurity, networking, and development
          </p>
          <div className="mt-4 flex items-center justify-center gap-3 text-[#D4AF37]">
            <Award size={24} />
            <span className="text-2xl font-bold">{certificates.length}</span>
            <span className="text-gray-400">Total Certifications</span>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-3">
            {issuers.map((issuer) => (
              <button
                key={issuer}
                onClick={() => setFilter(issuer)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  filter === issuer
                    ? 'bg-[#D4AF37] text-[#1B2845] shadow-lg shadow-[#D4AF37]/30'
                    : 'bg-[#1B2845]/70 text-gray-300 hover:bg-[#1B2845] hover:text-[#D4AF37] border border-[#D4AF37]/20'
                }`}
              >
                {issuer === 'all' ? 'All Certifications' : issuer}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((cert, index) => (
            <div
              key={cert.id}
              className="group bg-[#1B2845]/70 backdrop-blur-sm border-2 border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37] transition-all hover:scale-105 hover:shadow-xl hover:shadow-[#D4AF37]/20 cursor-pointer"
              onClick={() => setSelectedCert(cert)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Certificate Image */}
              <div className="relative h-48 overflow-hidden bg-[#0a0e1a]">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%231B2845" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D4AF37" font-size="60"%3E𓉠%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute top-3 right-3 bg-[#D4AF37] text-[#1B2845] px-3 py-1 rounded-full text-sm font-bold">
                  #{cert.id}
                </div>
              </div>

              {/* Certificate Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                  {cert.title}
                </h3>

                <div className="flex items-center gap-2 text-gray-400 mb-2">
                  <Building2 size={16} />
                  <span className="text-sm">{cert.issuer}</span>
                </div>

                <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
                  <Calendar size={16} />
                  <span className="text-sm">{cert.date}</span>
                </div>

                <p className="text-gray-300 text-sm line-clamp-3 mb-4">
                  {cert.description}
                </p>

                {/* Skills Preview */}
                <div className="flex flex-wrap gap-2">
                  {cert.skills.slice(0, 3).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs rounded border border-[#D4AF37]/30"
                    >
                      {skill}
                    </span>
                  ))}
                  {cert.skills.length > 3 && (
                    <span className="px-2 py-1 text-gray-400 text-xs">
                      +{cert.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="mt-4 flex items-center gap-2 text-[#D4AF37] text-sm font-medium">
                  <span>View Details</span>
                  <ExternalLink size={16} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedCert && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#1B2845] border-2 border-[#D4AF37]/30 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#1B2845] border-b border-[#D4AF37]/30 p-6 flex justify-between items-start">
                <div className="flex-1">
                  <h2 className="text-3xl font-bold text-[#D4AF37] mb-2">
                    {selectedCert.title}
                  </h2>
                  <div className="flex items-center gap-4 text-gray-300">
                    <div className="flex items-center gap-2">
                      <Building2 size={18} />
                      <span>{selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{selectedCert.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="text-gray-400 hover:text-[#D4AF37] transition-colors"
                >
                  <X size={32} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Certificate Image */}
                <div className="mb-6 bg-[#0a0e1a] rounded-lg p-8">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="w-full max-h-96 object-contain mx-auto"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231B2845" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D4AF37" font-size="80"%3E𓉠%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">𓀀</span>
                    Description
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {selectedCert.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <span className="text-2xl">𓁢</span>
                    Skills & Technologies
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedCert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 transition-colors"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-[#D4AF37]/30">
                  <button
                    onClick={handlePrevious}
                    disabled={filteredCertificates.findIndex(c => c.id === selectedCert.id) === 0}
                    className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={20} />
                    Previous
                  </button>
                  <span className="text-gray-400">
                    {filteredCertificates.findIndex(c => c.id === selectedCert.id) + 1} / {filteredCertificates.length}
                  </span>
                  <button
                    onClick={handleNext}
                    disabled={filteredCertificates.findIndex(c => c.id === selectedCert.id) === filteredCertificates.length - 1}
                    className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg border border-[#D4AF37]/30 hover:bg-[#D4AF37]/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
