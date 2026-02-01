import { useState, useEffect } from 'react';
import { Mail, Github, Linkedin, Twitter, MessageSquare, Send, CheckCircle, Building2, Briefcase, FileText } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    service: '',
    subject: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [emailJsLoaded, setEmailJsLoaded] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
    script.async = true;
    script.onload = () => {
      window.emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
      setEmailJsLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: 'https://github.com/Amr-Khaled-Ahmed',
      color: 'hover:text-white',
      bgColor: 'hover:bg-[#333]',
      username: 'Amr-Khaled-Ahmed'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: 'https://www.linkedin.com/in/amr-eldhshan',
      color: 'hover:text-[#0077B5]',
      bgColor: 'hover:bg-[#0077B5]/20',
      username: 'amr-eldhshan'
    },
    {
      name: 'Portfolio',
      icon: Twitter,
      url: 'https://amr-khaled-ahmed.github.io/Portfolio/',
      color: 'hover:text-[#39ff14]',
      bgColor: 'hover:bg-[#39ff14]/20',
      username: 'Visit Portfolio'
    },
    {
      name: 'Email',
      icon: Mail,
      url: 'mailto:amrKhaledv2171516@gmail.com',
      color: 'hover:text-[#D4AF37]',
      bgColor: 'hover:bg-[#D4AF37]/20',
      username: 'Contact Direct'
    },
  ];

  const serviceOptions = [
    'Web Development',
    'Mobile Development',
    'UI/UX Design',
    'Consulting',
    'flag found',
    'Other'
  ];

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      setError('Please fill in Name, Email, and Message fields');
      return;
    }

    if (!emailJsLoaded || !window.emailjs) {
      setError('Email service is still loading. Please try again.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const now = new Date();
      const templateParams = {
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Not specified',
        service: formData.service || 'Not specified',
        subject: formData.subject || 'No subject',
        message: formData.message,
        time: now.toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      const response = await window.emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams
      );

      console.log('EmailJS Response:', response);
      console.log('Sent data:', templateParams);

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        company: '',
        service: '',
        subject: '',
        message: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-br from-[#0a0e1a] via-[#1B2845] to-[#0a0e1a]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-4 flex items-center justify-center gap-4">
            <span className="text-6xl">𓂀</span>
            Contact Me
            <span className="text-6xl">𓂀</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Let's connect! Whether you have a question, collaboration idea, or just want to say hi
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="bg-[#1B2845]/70 backdrop-blur-sm border-2 border-[#D4AF37]/20 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-[#D4AF37]" size={32} />
                <h2 className="text-3xl font-bold text-white">Send a Message</h2>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0e1a]/50 border-2 border-[#D4AF37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0e1a]/50 border-2 border-[#D4AF37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Building2 size={16} />
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0e1a]/50 border-2 border-[#D4AF37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                      placeholder="Your Company"
                    />
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                      <Briefcase size={16} />
                      Service
                    </label>
                    <select
                      id="service"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-[#0a0e1a]/50 border-2 border-[#D4AF37]/20 rounded-lg text-white focus:border-[#D4AF37] focus:outline-none transition-colors"
                    >
                      <option value="">Select a service</option>
                      {serviceOptions.map(service => (
                        <option key={service} value={service}>{service}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                    <FileText size={16} />
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0e1a]/50 border-2 border-[#D4AF37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors"
                    placeholder="Project inquiry, collaboration, etc."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 bg-[#0a0e1a]/50 border-2 border-[#D4AF37]/20 rounded-lg text-white placeholder-gray-500 focus:border-[#D4AF37] focus:outline-none transition-colors resize-none"
                    placeholder="Your message here..."
                  />
                </div>

                {error && (
                  <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300">
                    {error}
                  </div>
                )}

                {success && (
                  <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 flex items-center gap-2">
                    <CheckCircle size={20} />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading || !emailJsLoaded}
                  className="w-full py-4 bg-[#D4AF37] text-[#1B2845] font-bold rounded-lg hover:bg-[#C19A6B] transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-[#D4AF37]/30"
                >
                  {loading ? (
                    <span>Sending...</span>
                  ) : !emailJsLoaded ? (
                    <span>Loading...</span>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#1B2845]/70 backdrop-blur-sm border-2 border-[#D4AF37]/20 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="text-4xl">𓁢</span>
                Connect With Me
              </h2>

              <div className="space-y-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center gap-4 p-4 bg-[#0a0e1a]/50 border-2 border-[#D4AF37]/20 rounded-lg hover:border-[#D4AF37] transition-all hover:scale-105 ${social.bgColor}`}
                    >
                      <div className="p-3 bg-[#D4AF37]/10 rounded-lg group-hover:bg-[#D4AF37] transition-colors">
                        <Icon className={`${social.color} transition-colors`} size={24} />
                      </div>
                      <div>
                        <p className="text-white font-semibold">{social.name}</p>
                        <p className="text-gray-400 text-sm">{social.username}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-[#1B2845]/70 backdrop-blur-sm border-2 border-[#D4AF37]/20 rounded-xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-3xl">𓀀</span>
                Quick Facts
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">▸</span>
                  <span>Based in Egypt</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">▸</span>
                  <span>Open to freelance opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">▸</span>
                  <span>Available for consulting</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] mt-1">▸</span>
                  <span>Response time: 24-48 hours</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-[#D4AF37]/10 to-[#2E8B93]/10 backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">𓃭</div>
              <p className="text-gray-300 italic">
                "The best way to predict the future is to hack it."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
