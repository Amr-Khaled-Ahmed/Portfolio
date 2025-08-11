import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Projects', path: '/projects' },
    { name: 'Writeups', path: '/writeups' },
    { name: 'Reported Bugs', path: '/bugs' },
    { name: 'Contact', path: '/contact' }
  ];

  const socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/amr-el-dahshan-843a11306',
      icon: 'fab fa-linkedin'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/Amr-Khaled-Ahmed',
      icon: 'fab fa-github'
    },
    {
      name: 'Email',
      url: 'mailto:amr171516@gmail.com',
      icon: 'fas fa-envelope'
    },

  ];

  const services = [
    'Penetration Testing',
    'Vulnerability Assessment',
    'Security Consulting',
    'Red Team Operations',
    'Malware Analysis',
    'Digital Forensics'
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* About Section */}
          <div className="footer-section">
            <h3>Amr Khaled Ahmed</h3>
            <p className="mb-4">
              Cybersecurity Expert specializing in penetration testing, vulnerability assessment,
              and advanced security consulting. Protecting digital assets through comprehensive security solutions.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target={social.url.startsWith('http') ? '_blank' : '_self'}
                  rel={social.url.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="w-10 h-10 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title={social.name}
                >
                  <i className={`${social.icon} text-text-secondary hover:text-white`}></i>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <div className="space-y-2">
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="block hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h3>Services</h3>
            <div className="space-y-2">
              {services.map((service, index) => (
                <p key={index} className="text-text-secondary">
                  {service}
                </p>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h3>Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <i className="fas fa-envelope text-primary"></i>
                <a href="mailto:amr171516@gmail.com" className="hover:text-primary">
                  amr171516@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <i className="fas fa-map-marker-alt text-primary"></i>
                <span>Cairo, Egypt</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Amr Khaled Ahmed. All rights reserved. |
            <span className="text-primary"> Cybersecurity Expert</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
