import React from 'react';

interface TimelineItem {
  title: string;
  subtitle?: string;
  description: string;
  icon: string;
  date?: string;
  skills?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
  type?: 'services' | 'skills';
}

const Timeline: React.FC<TimelineProps> = ({ items, type = 'services' }) => {
  return (
    <div className="timeline-container">
      <div className="timeline-line"></div>
      
      <div className="space-y-0">
        {items.map((item, index) => (
          <div
            key={index}
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-delay={index * 100}
            className="timeline-item"
          >
            <div className="timeline-node"></div>
            
            <div className={`timeline-content ${index % 2 === 0 ? 'md:mr-auto md:ml-0' : 'md:ml-auto md:mr-0'}`}>
              {/* Icon and Title */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <i className={`${item.icon} text-xl text-primary`}></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary">
                    {item.title}
                  </h3>
                  {item.subtitle && (
                    <p className="text-sm text-text-secondary">{item.subtitle}</p>
                  )}
                  {item.date && (
                    <p className="text-sm text-primary font-medium">{item.date}</p>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="text-text-secondary leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Skills Tags */}
              {item.skills && (
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="skill-tag"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;