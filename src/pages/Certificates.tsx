import React from 'react';
import Footer from '../components/Footer';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  imageUrl: string;
  skills: string[];
}

const Certificates: React.FC = () => {
  const certificates: Certificate[] = [
    {
      id: 17,
      title: "Cyber Security for Beginners",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Introduction to Cybersecurity covering basic concepts, tools, Courses, Fields, and resources for beginners.",
      imageUrl: "./src/images/Cyber sec for beginners.png",
      skills: ["Cybersecurity Fundamentals", "Security Tools", "Beginner Concepts"]
    },
    {
      id: 16,
      title: "Cloud and Virtualization Concepts",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Network Virtualization concepts certification covering the fundamentals of virtual networks and their applications.",
      imageUrl: "./src/images/Certificate- cloud .png",
      skills: ["Cloud Computing", "Virtualization", "Network Concepts"]
    },
    {
      id: 15,
      title: "Red Hat System Administration 1",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Red Hat System Administration 1 certification focusing on essential Linux administration skills and system management.",
      imageUrl: "./src/images/Red hat system admin 1.png",
      skills: ["Linux Administration", "System Management", "Red Hat"]
    },
    {
      id: 14,
      title: "Network Virtualization Concepts",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Network Virtualization concepts certification covering the fundamentals of virtual networks and their applications.",
      imageUrl: "./src/images/Certificate network vm.png",
      skills: ["Network Virtualization", "Virtual Networks", "VM Concepts"]
    },
    {
      id: 13,
      title: "JavaScript Programming Language",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Comprehensive course on core JavaScript concepts including data types, functions, OOP, DOM manipulation, JSON, AJAX, and event handling.",
      imageUrl: "./src/images/js.png",
      skills: ["JavaScript", "DOM Manipulation", "AJAX", "OOP"]
    },
    {
      id: 12,
      title: "start CyberSecurity learning",
      issuer: "Udemy",
      date: "Issued: 2023",
      description: "Introduction to Cybersecurity covering basic concepts, tools, Courses, Fields, and resources for beginners.",
      imageUrl: "./src/images/guide.jpg",
      skills: ["Cybersecurity Basics", "Learning Path", "Beginner Guide"]
    },
    {
      id: 11,
      title: "Database Fundamentals",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Introduction to database systems covering SQL, database design, and management principles.",
      imageUrl: "./src/images/db_intro.png",
      skills: ["SQL", "Database Design", "DB Management"]
    },
    {
      id: 10,
      title: "Python Programming",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Advanced Python programming including web development, automation.",
      imageUrl: "./src/images/python.png",
      skills: ["Python", "Web Development", "Automation"]
    },
    {
      id: 9,
      title: "Network Security",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Network security principles including firewalls, VPNs, intrusion detection, and prevention systems.",
      imageUrl: "./src/images/network2.png",
      skills: ["Network Security", "Firewalls", "VPN", "Intrusion Detection"]
    },
    {
      id: 8,
      title: "Network Fundamentals",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Computer networking fundamentals including TCP/IP, routing, switching, and network protocols.",
      imageUrl: "./src/images/network1.png",
      skills: ["Networking", "TCP/IP", "Routing", "Switching"]
    },
    {
      id: 7,
      title: "Certified Ethical Hacker",
      issuer: "Mahara Tech",
      date: "Issued: 2025",
      description: "Ethical hacking certification covering penetration testing methodologies and security assessment techniques.",
      imageUrl: "./src/images/CHE.png",
      skills: ["Ethical Hacking", "Penetration Testing", "Security Assessment"]
    },
    {
      id: 5,
      title: "Web Development",
      issuer: "IEEE",
      date: "Issued: 2023",
      description: "Modern web development certification covering HTML5, CSS3, JavaScript, and responsive design principles.",
      imageUrl: "./src/images/CC6.png",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
    },
    {
      id: 3,
      title: "OSINT",
      issuer: "Udemy",
      date: "Issued: October 2023",
      description: "Open Source Intelligence certification focusing on information gathering techniques from public sources for security analysis.",
      imageUrl: "./src/images/osint.jpg",
      skills: ["OSINT", "Information Gathering", "Security Analysis"]
    },
    {
      id: 2,
      title: "Linux Administration",
      issuer: "Udemy",
      date: "Issued: October 2023",
      description: "Comprehensive Linux administration certification covering system management, shell scripting, and server configuration.",
      imageUrl: "./src/images/linux.jpg",
      skills: ["Linux", "System Administration", "Shell Scripting"]
    },
    {
      id: 1,
      title: "CMD",
      issuer: "Udemy",
      date: "Issued: October 2023",
      description: "Windows Command Line Certification covering all essential commands and scripting techniques for effective system administration and automation.",
      imageUrl: "./src/images/UC-eb7d17b4-9788-4b0e-ae0a-98d9621d634c.jpg",
      skills: ["Command Line", "Windows CMD", "System Administration"]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div data-aos="zoom-in" className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <i className="fas fa-certificate text-5xl text-primary"></i>
            </div>
          </div>

          <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Professional Certifications
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Industry-recognized certifications demonstrating expertise in cybersecurity, ethical hacking,
            and information security management.
          </p>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
              >
                {/* Certificate Image */}
                <div className="mb-6 overflow-hidden rounded-lg">
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}

                    onError={(e) => {
                      e.currentTarget.src = 'https://images.pexels.com/photos/5380664/pexels-photo-5380664.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                </div>

                {/* Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <i className="fas fa-certificate text-2xl text-primary group-hover:text-white"></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                      {cert.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-building"></i>
                        <span>{cert.issuer}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <i className="fas fa-calendar"></i>
                        <span>{cert.date}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-text-secondary leading-relaxed mb-6">
                  {cert.description}
                </p>

                {/* Skills */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-text-primary mb-3">Key Skills Covered:</h4>
                  <div className="flex flex-wrap gap-2">
                    {cert.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 bg-accent text-text-primary text-xs rounded-full border border-border hover:bg-primary hover:text-white transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View More Button */}
                <div className="pt-4 border-t border-border">
                  <a
                    href={`/certificate.html?id=${cert.id}`}
                    className="text-primary hover:text-accent transition-colors flex items-center space-x-1"
                  >
                    <span>View Certificate</span>
                    <i className="fas fa-external-link-alt"></i>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-4xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Certification Statistics</h2>
            <p className="text-text-secondary">Demonstrating continuous learning and professional development</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div data-aos="zoom-in" data-aos-delay="100" className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">{certificates.length}</div>
              <div className="text-text-secondary">Professional Certifications</div>
            </div>

            {/* <div data-aos="zoom-in" data-aos-delay="200" className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">3</div>
              <div className="text-text-secondary">Years of Experience</div>
            </div> */}

            {/* <div data-aos="zoom-in" data-aos-delay="300" className="bg-card border border-border rounded-xl p-6 shadow-lg">
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-text-secondary">Success Rate</div>
            </div> */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="fade-up" className="bg-card border border-border rounded-2xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Ready to Secure Your Business?</h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Let's discuss how my certified expertise can help protect your organization's digital assets.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <i className="fas fa-envelope"></i>
              <span>Get in Touch</span>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Certificates;
