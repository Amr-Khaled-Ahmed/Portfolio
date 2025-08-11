import React, { useState } from 'react';
import Footer from '../components/Footer';

interface Writeup {
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

const Writeups: React.FC = () => {
  const [selectedWriteup, setSelectedWriteup] = useState<Writeup | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const writeups: Writeup[] = [

    {
      title: "Building a Custom Network Scanner with Python",
      summary: "From basic port scanning to advanced service fingerprinting - build an enterprise-grade network scanner with extensible architecture.",
      content: `
        <h2>Network Scanning Fundamentals</h2>
        <p>Understanding TCP/IP stack behavior is crucial for effective scanning. Key metrics:</p>
        <table>
          <tr><th>Scan Type</th><th>Accuracy</th><th>Stealth</th><th>Speed</th></tr>
          <tr><td>TCP Connect</td><td>High</td><td>Low</td><td>Medium</td></tr>
          <tr><td>SYN Scan</td><td>High</td><td>High</td><td>Fast</td></tr>
          <tr><td>UDP Scan</td><td>Medium</td><td>High</td><td>Slow</td></tr>
        </table>

        <h2>Core Scanner Architecture</h2>
        <pre><code class="language-python">class NetworkScanner:
    def __init__(self, target, ports, scan_type="syn"):
        self.target = target
        self.ports = ports
        self.scan_type = scan_type
        self.results = {}

    def scan(self):
        if self.scan_type == "syn":
            return self._syn_scan()
        elif self.scan_type == "connect":
            return self._connect_scan()

    def _syn_scan(self):
        # Raw socket implementation
        pass

    def _connect_scan(self):
        # Standard socket implementation
        pass</code></pre>

        <h2>Advanced Features</h2>

        <h3>1. Service Fingerprinting</h3>
        <p>Analyze banners and response patterns:</p>
        <pre><code>def fingerprint_service(ip, port):
    try:
        with socket.create_connection((ip, port), timeout=2) as sock:
            sock.send(b"GET / HTTP/1.1\r\n\r\n")
            return sock.recv(1024).decode('utf-8', 'ignore')
    except:
        return None</code></pre>

        <h3>2. Vulnerability Correlation</h3>
        <p>Integrate with CVE databases:</p>
        <pre><code>def check_vulnerabilities(service, version):
    cves = requests.get(
        f"https://services.nvd.nist.gov/rest/json/cves/1.0?cpeMatchString=cpe:2.3:a:{service}:{version}"
    ).json()
    return cves.get("result", {}).get("CVE_Items", [])</code></pre>

        <h3>3. Distributed Scanning</h3>
        <p>Using Redis for task queue:</p>
        <pre><code>import redis
from rq import Queue

q = Queue(connection=redis.Redis())

for ip in target_ips:
    q.enqueue(scan_single_host, ip, ports)</code></pre>

        <h2>Performance Optimization</h2>
        <ul>
          <li>Asynchronous I/O with asyncio</li>
          <li>Connection pooling</li>
          <li>Rate limiting algorithms</li>
          <li>Binary packet crafting with scapy</li>
        </ul>

        <h2>Enterprise Integration</h2>
        <p>Export formats and API integrations:</p>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <h4>SIEM Integration</h4>
            <p>Splunk, ELK, Graylog</p>
          </div>
          <div>
            <h4>Report Formats</h4>
            <p>PDF, HTML, XML, STIX/TAXII</p>
          </div>
          <div>
            <h4>Cloud Providers</h4>
            <p>AWS, Azure, GCP scanning APIs</p>
          </div>
        </div>
      `,
      date: "2024-01-10",
      readTime: "20 min",
      category: "network-security",
      tags: ["Python", "Network Scanning", "Cybersecurity Tools", "Infrastructure Security", "Automation"],
      icon: "fas fa-network-wired",
      difficulty: "Beginner"
    },


    {
      title: "Comprehensive Analysis of BadRabbit Ransomware",
      summary: "Full technical dissection of BadRabbit ransomware including kernel-level persistence, network propagation, and advanced encryption mechanisms.",
      content: `
        <h2>Threat Overview</h2>
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3>Campaign Details</h3>
            <table>
              <tr><td>First Seen</td><td>2017-10-24</td></tr>
              <tr><td>Primary Targets</td><td>Media, Transportation, Government (Russia/Ukraine)</td></tr>
              <tr><td>Infection Rate</td><td>200+ organizations in first 48 hours</td></tr>
              <tr><td>Ransom Demand</td><td>0.05 BTC (~$300 at time)</td></tr>
            </table>
          </div>
          <div>
            <h3>Technical Highlights</h3>
            <table>
              <tr><td>Propagation</td><td>SMB exploits (EternalRomance)</td></tr>
              <tr><td>Encryption</td><td>AES-256 + RSA-2048 hybrid</td></tr>
              <tr><td>Persistence</td><td>Kernel-level drivers</td></tr>
              <tr><td>Evasion</td><td>Process hollowing, API unhooking</td></tr>
            </table>
          </div>
        </div>

        <h2>Infection Chain Analysis</h2>
        <div class="border-l-4 border-primary pl-4">
          <h3>1. Initial Compromise</h3>
          <p>Watering hole attacks via compromised news sites serving fake Flash updates:</p>
          <pre><code>http://breakingnews[.]com/flash_player_install.exe</code></pre>

          <h3>2. Lateral Movement</h3>
          <p>SMB exploitation using modified EternalRomance:</p>
          <pre><code>\\10.10.10.10\C$\Windows\System32\dispci.exe</code></pre>

          <h3>3. Privilege Escalation</h3>
          <p>Abusing SeDebugPrivilege for process injection:</p>
          <pre><code>AdjustTokenPrivileges(GetCurrentProcess(), SE_DEBUG_ENABLE)</code></pre>
        </div>

        <h2>Technical Deep Dive</h2>

        <h3>1. Encryption Scheme</h3>
        <p>Multi-stage cryptographic process:</p>
        <ol>
          <li>Generate AES-256 key per file</li>
          <li>Encrypt file with AES in CBC mode</li>
          <li>Encrypt AES key with embedded RSA public key</li>
          <li>Store encrypted key in file header</li>
        </ol>

        <h3>2. Kernel-Level Persistence</h3>
        <p>Loading malicious driver:</p>
        <pre><code>ZwLoadDriver("\\Registry\\Machine\\System\\CurrentControlSet\\Services\\dispci")</code></pre>

        <h3>3. Network Propagation</h3>
        <p>Scanning and exploitation workflow:</p>
        <pre><code>for ip in local_subnets:
    if port_445_open(ip):
        try_exploit(ip, "EternalRomance")</code></pre>

        <h2>Reverse Engineering Walkthrough</h2>

        <h3>1. Unpacking Process</h3>
        <p>Defeating custom packer:</p>
        <ol>
          <li>Identify memory sections with entropy >7.5</li>
          <li>Set hardware breakpoints on VirtualAlloc</li>
          <li>Dump unpacked payload from memory</li>
          <li>Rebuild import table using Scylla</li>
        </ol>

        <h3>2. Key Generation Analysis</h3>
        <p>Cryptographic operations:</p>
        <pre><code>void generate_file_key() {
    CryptGenRandom(hProv, 32, &file_key);
    CryptEncrypt(hRsa, 0, TRUE, 0, &file_key, &key_len, 256);
}</code></pre>

        <h2>MITRE ATT&CK Mapping</h2>
        <table>
          <tr><th>Tactic</th><th>Technique</th><th>Procedure</th></tr>
          <tr><td>Initial Access</td><td>T1189</td><td>Drive-by compromise</td></tr>
          <tr><td>Execution</td><td>T1059</td><td>Command-line interface</td></tr>
          <tr><td>Persistence</td><td>T1547</td><td>Boot or Logon Autostart Execution</td></tr>
          <tr><td>Lateral Movement</td><td>T1210</td><td>Exploitation of Remote Services</td></tr>
        </table>

        <h2>Detection & Mitigation</h2>
        <div class="grid grid-cols-2 gap-8">
          <div>
            <h3>Prevention</h3>
            <ul>
              <li>Disable SMBv1 protocol</li>
              <li>Application whitelisting</li>
              <li>Strict email attachment policies</li>
            </ul>
          </div>
          <div>
            <h3>Detection</h3>
            <ul>
              <li>Monitor for suspicious schtasks creations</li>
              <li>Alert on unusual rundll32.exe activity</li>
              <li>Watch for mass file encryption patterns</li>
            </ul>
          </div>
        </div>

        <h2>Indicators of Compromise</h2>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <h3>Files</h3>
            <ul>
              <li>infpub.dat (MD5: 1d724f95c6111055f0d02c2154bbccd3)</li>
              <li>dispci.exe (SHA256: 579fd8a0385482fb4c789561a30b09f25671e86422f40ef5cca2036b28f99648)</li>
            </ul>
          </div>
          <div>
            <h3>Network</h3>
            <ul>
              <li>185.149.120.3:443</li>
              <li>crl.thawte[.]com (for C2 masking)</li>
            </ul>
          </div>
          <div>
            <h3>Behavioral</h3>
            <ul>
              <li>Creates "rhaegal" scheduled task</li>
              <li>Modifies MBR (early versions)</li>
            </ul>
          </div>
        </div>

        <h2>Full Analysis & Samples</h2>
        <p>Complete technical analysis and samples available in our <a href="https://github.com/Amr-Khaled-Ahmed/Malware-analysis-work-shop/tree/main/task10%20-%20ransomware%20BadRabbit%20full%20analysis" target="_blank" class="text-primary hover:underline">GitHub repository</a>.</p>
      `,
      date: "2025-02-27",
      readTime: "30 min",
      category: "malware-analysis",
      tags: ["Ransomware", "BadRabbit", "Reverse Engineering", "Incident Response", "MITRE ATT&CK"],
      icon: "fas fa-lock",
      difficulty: "Advanced"
    },
    {
      title: "Modern Memory Forensics: Detecting Advanced Malware",
      summary: "Practical guide to memory analysis using Volatility and Rekall with case studies of fileless malware and rootkit detection.",
      content: `
        <h2>Memory Forensics Fundamentals</h2>
        <p>Why memory analysis is critical in modern investigations:</p>
        <ul>
          <li>95% of advanced malware leaves memory artifacts</li>
          <li>Fileless attacks only exist in memory</li>
          <li>Provides timeline of attack activities</li>
        </ul>

        <h2>Toolchain Comparison</h2>
        <table>
          <tr><th>Tool</th><th>Strengths</th><th>Limitations</th></tr>
          <tr><td>Volatility</td><td>Plugin ecosystem, Cross-platform</td><td>Steep learning curve</td></tr>
          <tr><td>Rekall</td><td>Accurate profiles, Python API</td><td>Less community support</td></tr>
          <tr><td>WinDbg</td><td>Kernel debugging</td><td>Windows only</td></tr>
        </table>

        <h2>Practical Investigation Workflow</h2>

        <h3>1. Acquisition</h3>
        <p>Best practices for memory capture:</p>
        <pre><code># Using WinPmem
winpmem_mini_x64_rc2.exe -o memory.raw</code></pre>

        <h3>2. Triage Analysis</h3>
        <p>Quick assessment commands:</p>
        <pre><code>vol.py -f memory.raw windows.pslist
vol.py -f memory.raw windows.netscan
vol.py -f memory.raw windows.malfind</code></pre>

        <h3>3. Advanced Techniques</h3>
        <p>Detecting API hooks:</p>
        <pre><code>vol.py -f memory.raw windows.apihooks -p 1244</code></pre>

        <h2>Case Study: Fileless Malware</h2>
        <p>PowerShell-based attack analysis:</p>
        <ol>
          <li>Identify suspicious PowerShell processes</li>
          <li>Extract command history from memory</li>
          <li>Analyze .NET assemblies in memory</li>
          <li>Recover decoded payloads</li>
        </ol>

        <h2>Memory Analysis Automation</h2>
        <p>Building custom Volatility plugins:</p>
        <pre><code>class MyPlugin(common.AbstractWindowsCommand):
    def calculate(self):
        # Custom analysis logic
        pass

    def render_text(self, outfd, data):
        # Output formatting
        pass</code></pre>
      `,
      date: "2024-02-10",
      readTime: "18 min",
      category: "digital-forensics",
      tags: ["Memory Forensics", "Volatility", "Incident Response", "Malware Analysis", "DFIR"],
      icon: "fas fa-memory",
      difficulty: "Intermediate"
    }
  ];

  const categories = [
    { key: 'all', label: 'All Articles', icon: 'fas fa-th-list' },
    { key: 'web-security', label: 'Web Security', icon: 'fas fa-globe' },
    { key: 'network-security', label: 'Network Security', icon: 'fas fa-network-wired' },
    { key: 'malware-analysis', label: 'Malware Analysis', icon: 'fas fa-virus' },
    { key: 'penetration-testing', label: 'Penetration Testing', icon: 'fas fa-crosshairs' },
    { key: 'digital-forensics', label: 'Digital Forensics', icon: 'fas fa-search-plus' }
  ];

  const filteredWriteups = selectedCategory === 'all'
    ? writeups
    : writeups.filter(writeup => writeup.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-500 bg-green-500/10 border-green-500/20';
      case 'Intermediate': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/20';
      case 'Advanced': return 'text-red-500 bg-red-500/10 border-red-500/20';
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div data-aos="zoom-in" className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
              <i className="fas fa-blog text-3xl text-primary"></i>
            </div>
          </div>

          <h1 data-aos="fade-up" className="text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Technical Writeups
          </h1>

          <p data-aos="fade-up" data-aos-delay="200" className="text-xl text-text-secondary leading-relaxed max-w-3xl mx-auto">
            In-depth technical articles covering cybersecurity topics, vulnerability research,
            and security tool development insights.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 border-b border-border">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.key}
                onClick={() => setSelectedCategory(category.key)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 transform hover:scale-105 ${
                  selectedCategory === category.key
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-card hover:bg-accent text-text-secondary hover:text-text-primary border border-border'
                }`}
              >
                <i className={category.icon}></i>
                <span>{category.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Writeups Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {filteredWriteups.map((writeup, index) => (
              <article
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="bg-card border border-border rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
                onClick={() => setSelectedWriteup(writeup)}
              >
                {/* Article Header */}
                <div className="flex items-start space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <i className={`${writeup.icon} text-xl text-primary group-hover:text-white`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className={`px-2 py-1 text-xs rounded-full border ${getDifficultyColor(writeup.difficulty)}`}>
                        {writeup.difficulty}
                      </span>
                      <span className="text-sm text-text-secondary">{writeup.readTime} read</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-primary group-hover:text-primary transition-colors leading-tight">
                      {writeup.title}
                    </h2>
                  </div>
                </div>

                {/* Article Summary */}
                <p className="text-text-secondary leading-relaxed mb-6">
                  {writeup.summary}
                </p>

                {/* Tags */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {writeup.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 bg-accent text-text-primary text-xs rounded-full border border-border"
                      >
                        {tag}
                      </span>
                    ))}
                    {writeup.tags.length > 3 && (
                      <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full border border-primary/20">
                        +{writeup.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Article Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <span className="text-sm text-text-secondary flex items-center space-x-1">
                    <i className="fas fa-calendar"></i>
                    <span>{writeup.date}</span>
                  </span>
                  <span className="text-primary hover:text-accent transition-colors flex items-center space-x-2 font-semibold">
                    <span>Read Article</span>
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Article Modal */}
      {selectedWriteup && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="p-8 border-b border-border">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <i className={`${selectedWriteup.icon} text-2xl text-primary`}></i>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className={`px-3 py-1 text-sm rounded-full border ${getDifficultyColor(selectedWriteup.difficulty)}`}>
                        {selectedWriteup.difficulty}
                      </span>
                      <span className="text-sm text-text-secondary">{selectedWriteup.readTime} read</span>
                      <span className="text-sm text-text-secondary">{selectedWriteup.date}</span>
                    </div>
                    <h1 className="text-2xl font-bold text-text-primary leading-tight">{selectedWriteup.title}</h1>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedWriteup(null)}
                  className="w-10 h-10 bg-accent hover:bg-primary rounded-lg flex items-center justify-center transition-colors group ml-4"
                >
                  <i className="fas fa-times text-text-secondary group-hover:text-white"></i>
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedWriteup.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent text-text-primary text-sm rounded-full border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)]">
              <div
                className="prose prose-lg max-w-none text-text-secondary"
                dangerouslySetInnerHTML={{ __html: selectedWriteup.content }}
                style={{
                  '--tw-prose-headings': 'var(--color-text-primary)',
                  '--tw-prose-links': 'var(--color-primary)',
                  '--tw-prose-code': 'var(--color-primary)',
                  '--tw-prose-pre-bg': 'var(--color-accent)',
                  '--tw-prose-borders': 'var(--color-border)'
                } as React.CSSProperties}
              />
            </div>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <section className="py-20 px-4 bg-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-bold text-text-primary mb-6">Stay Updated</h2>
            <p className="text-xl text-text-secondary mb-8 leading-relaxed">
              Follow me for more cybersecurity insights, vulnerability research, and technical tutorials.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                <i className="fas fa-envelope"></i>
                <span>Subscribe to Updates</span>
              </a>
              <a
                href="https://www.linkedin.com/in/amr-el-dahshan-843a11306"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 px-8 py-4 bg-transparent border-2 border-primary text-primary rounded-lg font-semibold hover:bg-primary hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                <i className="fab fa-linkedin"></i>
                <span>Follow on LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Writeups;
