import React, { useState } from 'react';

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string;
  category: 'education' | 'certification' | 'project' | 'achievement';
  details?: string[];
  link?: string;
}

const InteractiveTimeline: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const events: TimelineEvent[] = [
    {
      id: '1',
      title: 'Started Computer Science at Cairo University',
      date: '2023',
      description: 'Began my journey in Computer Science with a focus on cybersecurity at Cairo University\'s Faculty of Computers and Artificial Intelligence.',
      icon: 'fas fa-graduation-cap',
      category: 'education',
      details: [
        'Enrolled in Computer Science program',
        'Specialized in cybersecurity track',
        'Joined DSC Cybersecurity Committee'
      ]
    },
    {
      id: '2',
      title: 'First Security Certification',
      date: '2023',
      description: 'Earned my first cybersecurity certification, marking the beginning of my professional security journey.',
      icon: 'fas fa-certificate',
      category: 'certification',
      details: [
        'Completed comprehensive security training',
        'Learned fundamental security concepts',
        'Gained hands-on experience with security tools'
      ]
    },
    {
      id: '3',
      title: 'CyberSec-Toolkit Development',
      date: '2024',
      description: 'Developed a comprehensive cybersecurity toolkit with automated vulnerability scanning capabilities.',
      icon: 'fas fa-toolbox',
      category: 'project',
      details: [
        'Built modular security scanning tools',
        'Implemented automated vulnerability detection',
        'Created extensible architecture for future enhancements'
      ],
      link: 'https://github.com/Amr-Khaled-Ahmed/CyberSec-Toolkit'
    },
    {
      id: '4',
      title: 'Multiple Professional Certifications',
      date: '2024-2025',
      description: 'Achieved multiple industry-recognized certifications in cybersecurity, networking, and programming.',
      icon: 'fas fa-award',
      category: 'certification',
      details: [
        'Certified Ethical Hacker (CEH)',
        'Network Security Specialist',
        'Python Programming Expert',
        'Red Hat System Administrator'
      ]
    },
    {
      id: '5',
      title: 'Malware Analysis Workshop',
      date: '2024',
      description: 'Conducted comprehensive malware analysis workshop covering ransomware, trojans, and rootkits.',
      icon: 'fas fa-virus',
      category: 'achievement',
      details: [
        'Analyzed BadRabbit ransomware',
        'Reverse engineered malicious samples',
        'Shared knowledge with security community'
      ],
      link: 'https://github.com/Amr-Khaled-Ahmed/Malware-analysis-work-shop'
    },
    {
      id: '6',
      title: 'Portfolio Website Launch',
      date: '2025',
      description: 'Launched professional portfolio showcasing cybersecurity expertise and projects.',
      icon: 'fas fa-globe',
      category: 'project',
      details: [
        'Built with React and TypeScript',
        'Implemented modern design principles',
        'Showcased technical skills and projects'
      ]
    }
  ];

  const categories = [
    { key: 'all', label: 'All Events', color: 'bg-primary' },
    { key: 'education', label: 'Education', color: 'bg-blue-500' },
    { key: 'certification', label: 'Certifications', color: 'bg-green-500' },
    { key: 'project', label: 'Projects', color: 'bg-purple-500' },
    { key: 'achievement', label: 'Achievements', color: 'bg-orange-500' }
  ];

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.category === filter);

  const getCategoryColor = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      education: 'bg-blue-500',
      certification: 'bg-green-500',
      project: 'bg-purple-500',
      achievement: 'bg-orange-500'
    };
    return categoryMap[category] || 'bg-primary';
  };

  return (
    <div className="space-y-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map(category => (
          <button
            key={category.key}
            onClick={() => setFilter(category.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              filter === category.key
                ? `${category.color} text-white shadow-lg`
                : 'bg-card border border-border text-text-secondary hover:text-text-primary'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

        {/* Timeline Events */}
        <div className="space-y-8">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="relative flex items-start space-x-6 group"
            >
              {/* Timeline Node */}
              <div className={`relative z-10 w-16 h-16 ${getCategoryColor(event.category)} rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <i className={`${event.icon} text-xl`}></i>
                <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100"></div>
              </div>

              {/* Event Content */}
              <div 
                className="flex-1 bg-card border border-border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <span className="text-sm text-text-secondary bg-accent px-3 py-1 rounded-full">
                    {event.date}
                  </span>
                </div>
                
                <p className="text-text-secondary leading-relaxed mb-4">
                  {event.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 text-xs rounded-full text-white ${getCategoryColor(event.category)}`}>
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                  
                  <button className="text-primary hover:text-accent transition-colors flex items-center space-x-1">
                    <span>View Details</span>
                    <i className="fas fa-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 ${getCategoryColor(selectedEvent.category)} rounded-lg flex items-center justify-center text-white`}>
                    <i className={selectedEvent.icon}></i>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-text-primary">{selectedEvent.title}</h2>
                    <p className="text-text-secondary">{selectedEvent.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-10 h-10 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-colors group"
                >
                  <i className="fas fa-times text-text-secondary group-hover:text-white"></i>
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              <p className="text-text-secondary leading-relaxed mb-6">
                {selectedEvent.description}
              </p>

              {selectedEvent.details && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Key Highlights:</h3>
                  <ul className="space-y-2">
                    {selectedEvent.details.map((detail, index) => (
                      <li key={index} className="flex items-start space-x-3 text-text-secondary">
                        <i className="fas fa-check-circle text-primary mt-1"></i>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selectedEvent.link && (
                <div className="pt-4 border-t border-border">
                  <a
                    href={selectedEvent.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <i className="fas fa-external-link-alt"></i>
                    <span>View Project</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveTimeline;