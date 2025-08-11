import React, { useState } from 'react';
import Footer from '../components/Footer';

interface Bug {
  title: string;
  company: string;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  type: string;
  description: string;
  impact: string;
  status: 'Resolved' | 'Triaged' | 'Pending';
  reward?: string;
  date: string;
  cve?: string;
  platform: string;
}

const ReportedBugs: React.FC = () => {
  const [selectedBug, setSelectedBug] = useState<Bug | null>(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const bugs: Bug[] = [
    // {
    //   title: "",
    //   company: ".",
    //   severity: "",
    //   type: "",
    //   description: "",
    //   impact: "",
    //   status: "",
    //   reward: "",
    //   date: "",
    //   cve: "",
    //   platform: ""
    // },

  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'text-red-500 bg-red-500/10 border-red-500/20';
      case 'High': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      case 'Medium': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Low': return 'text-green-500 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Triaged': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Pending': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'SQL Injection': return 'fas fa-database';
      case 'Stored XSS': case 'XSS': return 'fas fa-code';
      case 'Authentication Bypass': return 'fas fa-key';
      case 'Directory Traversal': return 'fas fa-folder-open';
      case 'IDOR': return 'fas fa-user-shield';
      case 'Race Condition': return 'fas fa-clock';
      case 'Information Disclosure': return 'fas fa-eye';
      case 'CSRF': return 'fas fa-exchange-alt';
      default: return 'fas fa-bug';
    }
  };

  const filteredBugs = bugs.filter(bug => {
    const severityMatch = filterSeverity === 'all' || bug.severity.toLowerCase() === filterSeverity;
    const statusMatch = filterStatus === 'all' || bug.status.toLowerCase() === filterStatus;
    return severityMatch && statusMatch;
  });

  const totalRewards = bugs
    .filter(bug => bug.reward)
    .reduce((sum, bug) => sum + parseInt(bug.reward!.replace(/[$,]/g, '')), 0);

  const resolvedBugs = bugs.filter(bug => bug.status === 'Resolved').length;
  const criticalBugs = bugs.filter(bug => bug.severity === 'Critical').length;

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div data-aos="zoom-in" className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <i className="fas fa-bug text-5xl text-primary"></i>
            </div>
          </div>

          <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Reported Vulnerabilities
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            A collection of security vulnerabilities I've discovered and responsibly disclosed to various
            organizations through bug bounty programs and security research.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            <div data-aos="fade-up" className="bg-card border border-border rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">{bugs.length}</div>
              <div className="text-text-secondary">Total Bugs Reported</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="100" className="bg-card border border-border rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-green-500 mb-2">{resolvedBugs}</div>
              <div className="text-text-secondary">Successfully Resolved</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200" className="bg-card border border-border rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-red-500 mb-2">{criticalBugs}</div>
              <div className="text-text-secondary">Critical Severity</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300" className="bg-card border border-border rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl font-bold text-primary mb-2">${totalRewards.toLocaleString()}</div>
              <div className="text-text-secondary">Total Rewards Earned</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {/* Severity Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-text-secondary font-medium">Severity:</label>
              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-4 py-2 bg-card border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <label className="text-text-secondary font-medium">Status:</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-card border border-border rounded-lg text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All</option>
                <option value="resolved">Resolved</option>
                <option value="triaged">Triaged</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Bugs Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredBugs.map((bug, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => setSelectedBug(bug)}
              >
                {/* Bug Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <i className={`${getTypeIcon(bug.type)} text-xl text-primary group-hover:text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getSeverityColor(bug.severity)}`}>
                        {bug.severity}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full border ${getStatusColor(bug.status)}`}>
                        {bug.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                      {bug.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-1">{bug.company} • {bug.platform}</p>
                  </div>
                </div>

                {/* Bug Description */}
                <p className="text-text-secondary leading-relaxed mb-6">
                  {bug.description}
                </p>

                {/* Bug Details */}
                <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                  <div>
                    <span className="text-text-secondary">Type:</span>
                    <span className="text-text-primary font-medium ml-2">{bug.type}</span>
                  </div>
                  <div>
                    <span className="text-text-secondary">Date:</span>
                    <span className="text-text-primary font-medium ml-2">{bug.date}</span>
                  </div>
                  {bug.reward && (
                    <div>
                      <span className="text-text-secondary">Reward:</span>
                      <span className="text-green-500 font-bold ml-2">{bug.reward}</span>
                    </div>
                  )}
                  {bug.cve && (
                    <div>
                      <span className="text-text-secondary">CVE:</span>
                      <span className="text-primary font-medium ml-2">{bug.cve}</span>
                    </div>
                  )}
                </div>

                {/* View Details */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-primary hover:text-accent transition-colors flex items-center space-x-2 font-semibold">
                    <span>View Details</span>
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bug Details Modal */}
      {selectedBug && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-8 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className={`${getTypeIcon(selectedBug.type)} text-2xl text-primary`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 text-sm rounded-full border ${getSeverityColor(selectedBug.severity)}`}>
                        {selectedBug.severity}
                      </span>
                      <span className={`px-3 py-1 text-sm rounded-full border ${getStatusColor(selectedBug.status)}`}>
                        {selectedBug.status}
                      </span>
                      {selectedBug.reward && (
                        <span className="px-3 py-1 text-sm rounded-full bg-green-500/10 text-green-500 border border-green-500/20">
                          {selectedBug.reward}
                        </span>
                      )}
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary leading-tight">{selectedBug.title}</h1>
                    <p className="text-text-secondary mt-1">{selectedBug.company} • {selectedBug.platform} • {selectedBug.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBug(null)}
                  className="w-10 h-10 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-colors group ml-4"
                >
                  <i className="fas fa-times text-text-secondary group-hover:text-white"></i>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)] space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Vulnerability Description</h3>
                <p className="text-text-secondary leading-relaxed">{selectedBug.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">Impact Assessment</h3>
                <p className="text-text-secondary leading-relaxed">{selectedBug.impact}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Technical Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Vulnerability Type:</span>
                      <span className="text-text-primary font-medium">{selectedBug.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Platform:</span>
                      <span className="text-text-primary font-medium">{selectedBug.platform}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Severity:</span>
                      <span className={`font-medium ${selectedBug.severity === 'Critical' ? 'text-red-500' : selectedBug.severity === 'High' ? 'text-orange-500' : selectedBug.severity === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {selectedBug.severity}
                      </span>
                    </div>
                    {selectedBug.cve && (
                      <div className="flex justify-between">
                        <span className="text-text-secondary">CVE ID:</span>
                        <span className="text-primary font-medium">{selectedBug.cve}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-text-primary mb-3">Resolution Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Current Status:</span>
                      <span className={`font-medium ${selectedBug.status === 'Resolved' ? 'text-green-500' : selectedBug.status === 'Triaged' ? 'text-yellow-500' : 'text-orange-500'}`}>
                        {selectedBug.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Reported Date:</span>
                      <span className="text-text-primary font-medium">{selectedBug.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Organization:</span>
                      <span className="text-text-primary font-medium">{selectedBug.company}</span>
                    </div>
                    {selectedBug.reward && (
                      <div className="flex justify-between">
                        <span className="text-text-secondary">Bug Bounty:</span>
                        <span className="text-green-500 font-bold">{selectedBug.reward}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Have a Security Concern?</h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              If you need help with security testing or vulnerability assessment for your application,
              I'd be happy to discuss how I can assist your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-envelope"></i>
                <span>Get Security Consultation</span>
              </a>
              <a
                href="/projects"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <i className="fas fa-shield-alt"></i>
                <span>View Security Tools</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ReportedBugs;
