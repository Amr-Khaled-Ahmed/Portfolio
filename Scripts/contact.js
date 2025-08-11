import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    service: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init("Z4u6SMrODAUc_3s04");
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitStatus('idle');

  try {
    const serviceID = 'service_6m2x21x';
    const templateID = 'template_rvmi0ko';

    // Get current time for the template
    const now = new Date();
    const timeString = now.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Get the selected service name
    const selectedService = services.find(s => s.id === formData.service)?.name || 'General Inquiry';

    const templateParams = {
      name: formData.name,
      email: formData.email,
      company: formData.company || 'Not specified',
      service: selectedService,
      subject: formData.subject,
      message: formData.message,
      time: timeString // Add this for the timestamp in email
    };

    await emailjs.send(serviceID, templateID, templateParams);

    // Success handling and form reset remains the same
    setSubmitStatus('success');
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      message: '',
      service: 'general'
    });

  } catch (err) {
    console.error('EmailJS Error:', err);
    setSubmitStatus('error');
  } finally {
    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 3000);
  }
};

  const contactMethods = [
    {
      icon: 'fas fa-envelope',
      title: 'Email',
      value: 'amrkhaledv2171516@gmail.com',
      link: 'mailto:amrkhaledv2171516@gmail.com',
      description: 'Send me an email for general inquiries'
    },
    {
      icon: 'fab fa-linkedin',
      title: 'LinkedIn',
      value: 'Amr El-Dahshan',
      link: 'https://www.linkedin.com/in/amr-el-dahshan',
      description: 'Connect with me professionally'
    },
    {
      icon: 'fab fa-github',
      title: 'GitHub',
      value: 'Amr-Khaled-Ahmed',
      link: 'https://github.com/Amr-Khaled-Ahmed',
      description: 'Check out my open source projects'
    }
  ];

  const platformProfiles = [
    {
      name: 'Hack The Box',
      icon: 'fas fa-cube',
      username: '@ZeroAccess121',
      description: 'Cybersecurity training platform',
      color: 'text-green-500'
    },
    {
      name: 'TryHackMe',
      icon: 'fas fa-flag',
      username: '@ZeroAccess121',
      description: 'Interactive cybersecurity learning',
      color: 'text-red-500'
    },
  ];

  const services = [
    {
      id: 'general',
      name: 'General Inquiry',
      description: 'General questions or discussions'
    },
    {
      id: 'pentest',
      name: 'Penetration Testing',
      description: 'Web app and network security testing'
    },
    {
      id: 'consultation',
      name: 'Security Consultation',
      description: 'Strategic security guidance and planning'
    },
    {
      id: 'training',
      name: 'Security Training',
      description: 'Cybersecurity education and workshops'
    },
    {
      id: 'research',
      name: 'Security Research',
      description: 'Vulnerability research collaboration'
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
              <i className="fas fa-envelope text-3xl text-primary"></i>
            </div>
          </div>

          <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Get in Touch
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            Ready to enhance your organization's security posture? Let's discuss how I can help protect
            your digital assets and strengthen your cybersecurity defenses.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Contact Information</h2>
            <p className="text-text-secondary">Multiple ways to reach me for your cybersecurity needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <i className={`${method.icon} text-2xl text-primary group-hover:text-white`}></i>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{method.title}</h3>
                <p className="text-text-secondary text-sm mb-4">{method.description}</p>
                <a
                  href={method.link}
                  target={method.link.startsWith('http') ? '_blank' : '_self'}
                  rel={method.link.startsWith('http') ? 'noopener noreferrer' : ''}
                  className="text-primary hover:text-accent transition-colors font-semibold break-all"
                >
                  {method.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Profiles */}
      <section className="py-16 px-4 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Platform Profiles</h2>
            <p className="text-text-secondary">Connect with me on cybersecurity platforms and communities</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformProfiles.map((platform, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group text-center"
              >
                <div className={`w-16 h-16 ${platform.color.replace('text-', 'bg-').replace('500', '500/10')} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                  <i className={`${platform.icon} text-2xl ${platform.color}`}></i>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">{platform.name}</h3>
                <p className="text-text-secondary text-sm mb-3">{platform.description}</p>
                <p className={`${platform.color} font-semibold`}>{platform.username}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Send me a Message</h2>
            <p className="text-text-secondary">Fill out the form below and I'll get back to you as soon as possible</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div data-aos="fade-up" data-aos-delay="100">
                <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-accent border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Your full name"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="200">
                <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-accent border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div data-aos="fade-up" data-aos-delay="300">
                <label htmlFor="company" className="block text-sm font-semibold text-text-primary mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-accent border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Your company name"
                />
              </div>

              <div data-aos="fade-up" data-aos-delay="400">
                <label htmlFor="service" className="block text-sm font-semibold text-text-primary mb-2">
                  Service Interest *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-accent border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                >
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div data-aos="fade-up" data-aos-delay="500" className="mb-6">
              <label htmlFor="subject" className="block text-sm font-semibold text-text-primary mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 bg-accent border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Brief description of your inquiry"
              />
            </div>

            <div data-aos="fade-up" data-aos-delay="600" className="mb-8">
              <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-accent border border-border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-vertical"
                placeholder="Please provide details about your security needs, project requirements, or questions..."
              />
            </div>

            <div data-aos="fade-up" data-aos-delay="700" className="text-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center space-x-3 mx-auto ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : submitStatus === 'success'
                      ? 'bg-green-500'
                      : submitStatus === 'error'
                        ? 'bg-red-500'
                        : 'bg-primary hover:bg-primary/90 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sending Message...</span>
                  </>
                ) : submitStatus === 'success' ? (
                  <>
                    <i className="fas fa-check"></i>
                    <span>Success!</span>
                  </>
                ) : submitStatus === 'error' ? (
                  <>
                    <i className="fas fa-exclamation-circle"></i>
                    <span>Try Again</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i>
                    <span>Send Message</span>
                  </>
                )}
              </button>
              {submitStatus === 'success' && (
                <div className="mt-4 text-green-500 animate-fade-in">
                  Your message has been sent successfully!
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 text-red-500 animate-fade-in">
                  Failed to send. Please try again.
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

      {/* Service Information */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-6xl mx-auto">
          <div data-aos="fade-up" className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Available Services</h2>
            <p className="text-text-secondary">Comprehensive cybersecurity solutions tailored to your needs</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.slice(1).map((service, index) => (
              <div
                key={service.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-text-primary mb-3">{service.name}</h3>
                <p className="text-text-secondary leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Response Time Information */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="fade-up" className="bg-card border border-border rounded-2xl p-8 shadow-xl">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-clock text-2xl text-primary"></i>
            </div>
            <h2 className="text-2xl font-bold text-text-primary mb-4">Response Time</h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              I typically respond to all inquiries within 24-48 hours. For urgent security matters,
              please call directly for a faster response. All consultations begin with a free initial
              assessment to understand your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-text-secondary">
                <i className="fas fa-check-circle text-green-500"></i>
                <span>Free Initial Consultation</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <i className="fas fa-shield-alt text-primary"></i>
                <span>Confidential & Secure</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <i className="fas fa-handshake text-accent"></i>
                <span>Professional Service</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
