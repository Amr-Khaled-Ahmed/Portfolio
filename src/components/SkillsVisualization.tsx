import React, { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
  color: string;
}

const SkillsVisualization: React.FC = () => {
  const [animatedLevels, setAnimatedLevels] = useState<{ [key: string]: number }>({});

  const skills: Skill[] = [
    { name: 'Penetration Testing', level: 90, category: 'Security', icon: 'fas fa-crosshairs', color: '#ef4444' },
    { name: 'Python', level: 85, category: 'Programming', icon: 'fab fa-python', color: '#3776ab' },
    { name: 'Network Security', level: 88, category: 'Security', icon: 'fas fa-network-wired', color: '#10b981' },
    { name: 'Web Security', level: 92, category: 'Security', icon: 'fas fa-globe', color: '#f59e0b' },
    { name: 'Malware Analysis', level: 80, category: 'Security', icon: 'fas fa-virus', color: '#8b5cf6' },
    { name: 'C++', level: 75, category: 'Programming', icon: 'fas fa-code', color: '#00599c' },
    { name: 'JavaScript', level: 82, category: 'Programming', icon: 'fab fa-js-square', color: '#f7df1e' },
    { name: 'Linux Administration', level: 85, category: 'Systems', icon: 'fab fa-linux', color: '#fcc419' },
    { name: 'Digital Forensics', level: 78, category: 'Security', icon: 'fas fa-search-plus', color: '#06b6d4' },
    { name: 'React', level: 80, category: 'Programming', icon: 'fab fa-react', color: '#61dafb' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      const animated: { [key: string]: number } = {};
      skills.forEach(skill => {
        animated[skill.name] = skill.level;
      });
      setAnimatedLevels(animated);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const categories = [...new Set(skills.map(skill => skill.category))];

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-2xl font-bold text-text-primary mb-6 flex items-center space-x-2">
            <div className="w-8 h-1 bg-primary rounded-full"></div>
            <span>{category}</span>
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills
              .filter(skill => skill.category === category)
              .map((skill, index) => (
                <div
                  key={skill.name}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="bg-card border border-border rounded-xl p-6 hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl"
                        style={{ backgroundColor: skill.color }}
                      >
                        <i className={skill.icon}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-text-primary group-hover:text-primary transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-sm text-text-secondary">
                          {animatedLevels[skill.name] || 0}% Proficiency
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full bg-accent/30 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-2000 ease-out relative overflow-hidden"
                        style={{ 
                          width: `${animatedLevels[skill.name] || 0}%`,
                          backgroundColor: skill.color
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    
                    {/* Skill level indicators */}
                    <div className="flex justify-between mt-2 text-xs text-text-secondary">
                      <span>Beginner</span>
                      <span>Intermediate</span>
                      <span>Advanced</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsVisualization;