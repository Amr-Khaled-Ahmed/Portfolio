import { useEffect, useState } from 'react';
import { Calendar, Building2, X, ChevronLeft, ChevronRight, Search, ExternalLink } from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  skills: string[];
}

interface DriveCertificate {
  id: string;
  name: string;
  mimeType: string;
  imageUrl: string;
  previewUrl: string;
}

const DRIVE_SCRIPT_URL = import.meta.env.VITE_DRIVE_SCRIPT_URL;

const getDriveImageUrl = (fileId: string) =>
  `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'details' | 'drive'>('drive');
  const [driveCertificates, setDriveCertificates] = useState<DriveCertificate[]>([]);
  const [drivePage, setDrivePage] = useState(1);
  const [driveLoading, setDriveLoading] = useState(true);
  const [driveError, setDriveError] = useState('');
  const [driveSearch, setDriveSearch] = useState('');

  useEffect(() => {
    const loadDriveCertificates = async () => {
      try {
        const response = await fetch(DRIVE_SCRIPT_URL);
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
        const files = await response.json() as DriveCertificate[];
        setDriveCertificates(files.filter((file) => file.imageUrl && file.previewUrl));
      } catch (error) {
        setDriveError(error instanceof Error ? error.message : 'Unable to load Drive certificates.');
      } finally {
        setDriveLoading(false);
      }
    };

    void loadDriveCertificates();
  }, []);

  const certificates: Certificate[] = [
    {
      id: 24,
      title: "NSE 4 FortiOS Administrator",
      issuer: "Fortinet",
      date: "Issued: 2026",
      description: "Fortinet NSE 4 - FortiOS Administrator Exam v7.6 certification demonstrates expertise in FortiOS platform administration. This certification validates the ability to configure, manage, and maintain FortiGate security appliances running FortiOS 7.6, including firewall policies, VPN configurations, and network security features.",
      imageUrl: "/certificates/fortinet-fortios-7-6-administrator-badge.png",
      skills: ["FortiOS 7.6", "FortiGate", "Firewall Administration", "VPN Configuration", "Network Security", "Security Policies"]
    },
    {
      id: 23,
      title: "Ubuntu Linux Essentials",
      issuer: "Mahara Tech",
      date: "Issued: June 2026",
      description: "Ubuntu Linux Essentials certification from Mahara Tech covering fundamental Linux concepts, command-line operations, and system administration. Completed 7 hours 20 minutes of intensive training on Ubuntu Linux fundamentals and practical administration skills.",
      imageUrl: "/certificates/ubuntu_linux_essentials.png",
      skills: ["Linux", "Ubuntu", "Command Line", "System Administration", "Linux Fundamentals"]
    },
    {
      id: 22,
      title: "Red Hat System Administration II",
      issuer: "Red Hat",
      date: "Issued: May 2026",
      description: "Red Hat System Administration II (RH134 - RHA) Ver. 10 certification demonstrating advanced Linux system administration skills. Completion of 40 credit hours of intensive training on advanced Red Hat Enterprise Linux administration, configuration, and management.",
      imageUrl: "/certificates/redhat2.png",
      skills: ["Red Hat Enterprise Linux", "System Administration", "RHEL 10", "Network Management", "Security Management", "Storage Management"]
    },
    {
      id: 21,
      title: "Red Hat System Administration I",
      issuer: "Red Hat",
      date: "Issued: April 2026",
      description: "Red Hat System Administration I (RH124 - RHA) Ver. 10 certification demonstrating foundational Linux system administration skills. Completion of 40 credit hours of comprehensive training on Red Hat Enterprise Linux fundamentals, basic administration, and system configuration.",
      imageUrl: "/certificates/redhat1.png",
      skills: ["Red Hat Enterprise Linux", "Linux Administration", "RHEL 10", "System Management", "User Management", "File Systems"]
    },
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

  const driveCertificatesPerPage = 15;
  const filteredDriveCertificates = driveSearch.trim()
    ? driveCertificates.filter(f => f.name.toLowerCase().includes(driveSearch.toLowerCase()))
    : driveCertificates;
  const drivePageCount = Math.max(1, Math.ceil(filteredDriveCertificates.length / driveCertificatesPerPage));
  const visibleDriveCertificates = filteredDriveCertificates.slice(
    (drivePage - 1) * driveCertificatesPerPage,
    drivePage * driveCertificatesPerPage,
  );

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
    <div className="min-h-screen py-12 sm:py-16 md:py-20 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#D4AF37] mb-4 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
            <span className="text-4xl sm:text-6xl">𓉠</span>
            <span>Certifications</span>
            <span className="text-4xl sm:text-6xl">𓉠</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-2">
            A collection of my professional certifications and achievements in cybersecurity, networking, and development
          </p>
          {/* <div className="mt-4 flex items-center justify-center gap-3 text-[#D4AF37] flex-wrap">
            <Award size={24} />
            <span className="text-xl sm:text-2xl font-bold">{driveLoading ? '…' : driveCertificates.length}</span>
            <span className="text-sm sm:text-base text-gray-400">Total Certifications</span>
          </div> */}
        </div>

        {/* Local certificate views */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex flex-wrap justify-center gap-1 rounded-full border border-[#D4AF37]/20 bg-[#0a0e1a]/70 p-1.5 shadow-lg shadow-black/20 backdrop-blur-sm">
            <button
              type="button"
              onClick={() => setActiveTab('details')}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all sm:px-6 sm:text-base ${
                activeTab === 'details'
                  ? 'bg-[#D4AF37] text-[#1B2845] shadow-lg shadow-[#D4AF37]/30'
                  : 'text-gray-300 hover:text-[#D4AF37]'
              }`}
            >
              Certificate Details
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('drive')}
              className={`rounded-full px-4 py-2.5 text-sm font-medium transition-all sm:px-6 sm:text-base ${
                activeTab === 'drive'
                  ? 'bg-[#D4AF37] text-[#1B2845] shadow-lg shadow-[#D4AF37]/30'
                  : 'text-gray-300 hover:text-[#D4AF37]'
              }`}
            >
              All Certifications
            </button>
          </div>
        </div>

        {activeTab === 'drive' ? (
          <div className="space-y-6">
            {/* ── Header row: stats + search + open-drive ─────────────────── */}
            <div className="flex flex-col gap-3">
              {/* Row 1: stats */}
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/25 bg-[#0a0e1a] px-3 py-1 text-xs text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  {driveLoading ? '…' : filteredDriveCertificates.length} total
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-red-500/25 bg-[#0a0e1a] px-3 py-1 text-xs text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                  {driveLoading ? '…' : driveCertificates.filter(f => f.mimeType === 'application/pdf').length} PDF
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-400/25 bg-[#0a0e1a] px-3 py-1 text-xs text-gray-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  {driveLoading ? '…' : driveCertificates.filter(f => f.mimeType !== 'application/pdf').length} Image
                </span>
              </div>

              {/* Row 2: search + open-drive */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="Search certificates…"
                    value={driveSearch}
                    onChange={e => { setDriveSearch(e.target.value); setDrivePage(1); }}
                    className="h-9 w-full rounded-full border border-[#D4AF37]/20 bg-[#0a0e1a] pl-8 pr-3 text-xs text-gray-300 placeholder-gray-600 outline-none transition-colors focus:border-[#D4AF37]/50"
                  />
                </div>
                <a
                  href="https://drive.google.com/drive/folders/1c4tNEKDlUBmJ6HnBFrQp6G8qV8kUMN1O"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#D4AF37]/30 bg-[#0a0e1a] px-3 sm:px-4 text-xs font-medium text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10"
                >
                  <ExternalLink size={12} />
                  <span className="hidden xs:inline sm:inline">Drive</span>
                </a>
              </div>
            </div>

            {/* ── Grid ──────────────────────────────────────────────────────── */}
            {driveLoading ? (
              /* Skeleton */
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="animate-pulse overflow-hidden rounded-xl border border-white/5 bg-[#0a0e1a]">
                    <div className="aspect-[4/3] bg-[#111827]" />
                    <div className="space-y-2 p-3">
                      <div className="h-2.5 w-4/5 rounded-md bg-[#111827]" />
                      <div className="h-2 w-1/3 rounded-md bg-[#111827]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : driveError ? (
              /* Error */
              <div className="flex min-h-64 flex-col items-center justify-center gap-4 rounded-2xl border border-red-500/15 bg-[#0a0e1a] text-center">
                <span className="text-4xl">⚠️</span>
                <p className="text-sm text-red-300">Unable to load certificates from Drive</p>
                <a
                  href="https://drive.google.com/drive/folders/1c4tNEKDlUBmJ6HnBFrQp6G8qV8kUMN1O"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium text-[#D4AF37] transition-colors hover:text-white"
                >
                  Open Drive directly →
                </a>
              </div>
            ) : filteredDriveCertificates.length === 0 ? (
              /* Empty search */
              <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-2xl border border-white/5 bg-[#0a0e1a] text-center">
                <p className="text-sm text-gray-400">
                  No certificates match &ldquo;<span className="text-[#D4AF37]">{driveSearch}</span>&rdquo;
                </p>
                <button
                  type="button"
                  onClick={() => setDriveSearch('')}
                  className="text-xs text-gray-500 underline hover:text-gray-300 transition-colors"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {visibleDriveCertificates.map((cert) => {
                    const isPdf = cert.mimeType === 'application/pdf';
                    return (
                      <a
                        key={cert.id}
                        href={cert.previewUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="group focus:outline-none"
                        title={cert.name}
                      >
                        <div className="overflow-hidden rounded-xl border border-white/5 bg-[#0a0e1a] shadow-md transition-all duration-300 group-hover:-translate-y-1.5 group-hover:border-[#D4AF37]/40 group-hover:shadow-xl group-hover:shadow-[#D4AF37]/5 group-focus-visible:ring-2 group-focus-visible:ring-[#D4AF37]">

                          {/* Thumbnail */}
                          <div className="relative aspect-[4/3] overflow-hidden bg-[#0d1424]">
                            <img
                              src={getDriveImageUrl(cert.id)}
                              alt={cert.name}
                              loading="lazy"
                              referrerPolicy="no-referrer"
                              className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.07]"
                              onError={(e) => {
                                const img = e.currentTarget;
                                if (img.src !== cert.imageUrl) {
                                  img.src = cert.imageUrl;
                                } else {
                                  img.src = `https://lh3.googleusercontent.com/d/${cert.id}=w800`;
                                }
                              }}
                            />

                            {/* Hover overlay */}
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/30 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                              <p className="line-clamp-2 text-[11px] font-medium leading-relaxed text-white">
                                {cert.name}
                              </p>
                              <p className="mt-1 text-[10px] font-semibold text-[#D4AF37]">Open ↗</p>
                            </div>

                            {/* Type badge */}
                            <div className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide shadow-sm ${
                              isPdf
                                ? 'bg-red-600/90 text-white shadow-red-900/40'
                                : 'bg-sky-600/90 text-white shadow-sky-900/40'
                            }`}>
                              {isPdf ? 'PDF' : 'IMG'}
                            </div>
                          </div>

                          {/* Footer */}
                          <div className="border-t border-white/5 px-3 py-2.5">
                            <p className="line-clamp-2 text-[11px] leading-relaxed text-gray-400 transition-colors group-hover:text-gray-200">
                              {cert.name}
                            </p>
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>

                {/* ── Numbered pagination ─────────────────────────────────── */}
                {drivePageCount > 1 && (
                  <div className="flex flex-wrap items-center justify-center gap-1.5 pt-2">
                    <button
                      type="button"
                      onClick={() => setDrivePage(p => Math.max(1, p - 1))}
                      disabled={drivePage === 1}
                      aria-label="Previous page"
                      className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-[#D4AF37]/20 text-base text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ‹
                    </button>
                    {Array.from({ length: drivePageCount }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => setDrivePage(page)}
                        aria-label={`Go to page ${page}`}
                        aria-current={page === drivePage ? 'page' : undefined}
                        className={`flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                          page === drivePage
                            ? 'bg-[#D4AF37] text-[#1B2845] shadow-md shadow-[#D4AF37]/30'
                            : 'text-gray-400 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => setDrivePage(p => Math.min(drivePageCount, p + 1))}
                      disabled={drivePage === drivePageCount}
                      aria-label="Next page"
                      className="flex h-9 w-9 sm:h-8 sm:w-8 items-center justify-center rounded-lg border border-[#D4AF37]/20 text-base text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/10 disabled:cursor-not-allowed disabled:opacity-30"
                    >
                      ›
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        ) : (
          <>
        {/* Filter Buttons */}
        <div className="mb-8 sm:mb-12">
          <div className="flex overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 no-scrollbar">
            {issuers.map((issuer) => (
              <button
                key={issuer}
                onClick={() => setFilter(issuer)}
                className={`shrink-0 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium transition-all text-xs sm:text-sm whitespace-nowrap ${
                  filter === issuer
                    ? 'bg-[#D4AF37] text-[#1B2845] shadow-lg shadow-[#D4AF37]/30'
                    : 'bg-[#1B2845]/70 text-gray-300 hover:bg-[#1B2845] hover:text-[#D4AF37] border border-[#D4AF37]/20'
                }`}
              >
                {issuer === 'all' ? 'All' : issuer.length > 20 ? issuer.substring(0, 17) + '...' : issuer}
              </button>
            ))}
          </div>
        </div>

        {/* Local certificate image gallery */}
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 lg:gap-10">
          {filteredCertificates.map((cert, index) => (
            <button
              key={cert.id}
              type="button"
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0a0e1a]"
              onClick={() => setSelectedCert(cert)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#D4AF37]/20 bg-[#0a0e1a]/80 p-2 shadow-xl shadow-black/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#D4AF37]/70 group-hover:shadow-[#D4AF37]/10">
              {/* Certificate Image */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#111827]">
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  loading={index > 5 ? 'lazy' : 'eager'}
                  className="h-full w-full object-contain p-2 transition-transform duration-500 group-hover:scale-[1.04] sm:p-7"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%231B2845" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D4AF37" font-size="60"%3E𓉠%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute right-2 top-2 rounded-full bg-[#D4AF37] px-2 py-0.5 text-xs font-bold text-[#1B2845] sm:right-3 sm:top-3 sm:px-2.5 sm:py-1">
                  #{cert.id}
                </div>
              </div>

              {/* Certificate Info */}
              <div className="px-2 pb-2 pt-3 sm:px-3 sm:pt-4">
                <h3 className="mb-1.5 line-clamp-2 text-sm font-bold text-white transition-colors group-hover:text-[#D4AF37] sm:mb-2 sm:text-lg">
                  {cert.title}
                </h3>

                <div className="mb-1 flex items-center gap-2 text-xs text-gray-400">
                  <Building2 size={13} className="flex-shrink-0" />
                  <span className="truncate">{cert.issuer}</span>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                  <Calendar size={13} className="flex-shrink-0" />
                  <span>{cert.date}</span>
                </div>
              </div>
            </div>
            </button>
          ))}
        </div>
          </>
        )}

        {/* Modal */}
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4">
            <div className="flex max-h-[95dvh] w-full flex-col overflow-hidden rounded-t-2xl border-2 border-[#D4AF37]/30 bg-[#1B2845] sm:max-h-[90vh] sm:max-w-4xl sm:rounded-xl">

              {/* Modal Header */}
              <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-[#D4AF37]/30 bg-[#1B2845] px-4 py-4 sm:px-6 sm:py-5">
                <div className="min-w-0 flex-1">
                  <h2 className="mb-1.5 line-clamp-2 text-lg font-bold text-[#D4AF37] sm:text-2xl md:text-3xl">
                    {selectedCert.title}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-300 sm:text-sm">
                    <div className="flex items-center gap-1.5">
                      <Building2 size={14} className="shrink-0" />
                      <span className="truncate max-w-[200px] sm:max-w-none">{selectedCert.issuer}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="shrink-0" />
                      <span>{selectedCert.date}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCert(null)}
                  className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:text-[#D4AF37]"
                  aria-label="Close"
                >
                  <X size={26} />
                </button>
              </div>

              {/* Modal Content — scrollable */}
              <div className="overflow-y-auto p-4 sm:p-6">
                {/* Certificate Image */}
                <div className="mb-5 rounded-lg bg-[#0a0e1a] p-4 sm:mb-6 sm:p-8">
                  <img
                    src={selectedCert.imageUrl}
                    alt={selectedCert.title}
                    className="mx-auto max-h-64 w-full object-contain sm:max-h-96"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231B2845" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23D4AF37" font-size="80"%3E𓉠%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>

                {/* Description */}
                <div className="mb-5 sm:mb-6">
                  <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-white sm:text-xl">
                    <span className="text-xl sm:text-2xl">𓀀</span>
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                    {selectedCert.description}
                  </p>
                </div>

                {/* Skills */}
                <div className="mb-5 sm:mb-6">
                  <h3 className="mb-2 flex items-center gap-2 text-base font-bold text-white sm:text-xl">
                    <span className="text-xl sm:text-2xl">𓁢</span>
                    Skills &amp; Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {selectedCert.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-1.5 text-xs text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/20 sm:px-4 sm:py-2 sm:text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-2 border-t border-[#D4AF37]/30 pt-4 sm:pt-6">
                  <button
                    type="button"
                    onClick={handlePrevious}
                    aria-label="View previous certificate"
                    disabled={filteredCertificates.findIndex(c => c.id === selectedCert.id) === 0}
                    className="flex min-w-0 items-center gap-1.5 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-2.5 text-xs font-medium text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/20 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <ChevronLeft size={16} className="shrink-0" />
                    <span>Prev</span>
                  </button>
                  <span className="shrink-0 text-xs text-gray-400 sm:text-sm">
                    {filteredCertificates.findIndex(c => c.id === selectedCert.id) + 1} / {filteredCertificates.length}
                  </span>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="View next certificate"
                    disabled={filteredCertificates.findIndex(c => c.id === selectedCert.id) === filteredCertificates.length - 1}
                    className="flex min-w-0 items-center gap-1.5 rounded-lg border border-[#D4AF37]/30 bg-[#D4AF37]/10 px-3 py-2.5 text-xs font-medium text-[#D4AF37] transition-colors hover:bg-[#D4AF37]/20 disabled:cursor-not-allowed disabled:opacity-50 sm:gap-2 sm:px-5 sm:py-3 sm:text-sm"
                  >
                    <span>Next</span>
                    <ChevronRight size={16} className="shrink-0" />
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
