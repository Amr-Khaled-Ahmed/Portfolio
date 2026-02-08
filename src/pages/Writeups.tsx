import { useEffect, useState } from 'react';
import { ExternalLink, Calendar, Tag, Bug, Flag, DollarSign, FileText, Shield, Network, Cpu } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Writeup } from '../types';

type CategoryFilter = 'all' | 'malware' | 'ctf' | 'bug-bounty' | 'research' | 'network-security' | 'digital-forensics' | 'privilege-escalation';

// Static writeups data
const staticWriteups: Writeup[] = [
    {
    id: '3', // Make sure this is unique
    title: "ZICHMP CTF 2026 - Cyber Champions 2026 Write-up",
    description: "Step-by-step write-up of the ZICHMP CTF 2026 challenges, including solutions, techniques, and lessons learned.",
    longDescription: "This detailed write-up covers the ZICHMP CTF 2026 challenges from Cyber Champions 2026, with complete explanations of each solution, the techniques used, and insights for future competitions.",
    category: "ctf", // fits into your existing CTF category
    content_url: "https://medium.com/@amrkhaledv2171516/zichmp-ctf-2026-cyber-champions-2026-abbfe3f13fc6",
    tags: ["CTF", "Cyber Champions 2026", "Reverse Engineering", "Exploitation", "Network Security"],
    published_date: "2026-02-08", // use the actual date you want
    featured: true, // set true if you want it to appear in featured section
    created_at: "2026-02-08T00:00:00Z"
},

  {
    id: '2',
    title: "Comprehensive Analysis of BadRabbit Ransomware",
    description: "Full technical dissection of BadRabbit ransomware including kernel-level persistence, network propagation, and advanced encryption mechanisms.",
    longDescription: "In-depth technical analysis of BadRabbit ransomware covering infection chain, encryption schemes, kernel-level persistence techniques, network propagation via SMB exploits, reverse engineering methodology, MITRE ATT&CK mapping, and detection/mitigation strategies with complete IoCs.",
    category: "malware-analysis",
    content_url: "https://github.com/Amr-Khaled-Ahmed/Malware-analysis-work-shop/tree/main/task10%20-%20ransomware%20BadRabbit%20full%20analysis",
    tags: ["Ransomware", "BadRabbit", "Reverse Engineering", "Incident Response", "MITRE ATT&CK"],
    published_date: "2025-02-27",
    featured: true,
    created_at: "2025-02-27T00:00:00Z"
  },
    {
    id: '1',
    title: "PrivExec Privilege Escalation Write-up",
    description: "Detailed analysis and exploitation of PrivExec for privilege escalation techniques.",
    longDescription: "A comprehensive write-up covering the exploitation of PrivExec for privilege escalation, including technical details, exploitation methods, and mitigation strategies.",
    category: "privilege-escalation",
    content_url: "https://medium.com/@amrkhaledv2171516/privexec-privilege-escalation-write-up-cba868c1a34c",
    tags: ["Privilege Escalation", "Windows Security", "Exploitation", "Red Teaming"],
    published_date: "2024-12-15",
    featured: true,
    created_at: "2024-12-15T00:00:00Z"
  },




];

export default function Writeups() {
  const [writeups, setWriteups] = useState<Writeup[]>([]);
  const [filteredWriteups, setFilteredWriteups] = useState<Writeup[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [loading, setLoading] = useState(true);

  // Update categories to include new writeup types
  const categories = [
    { id: 'all' as CategoryFilter, label: 'All Writeups', icon: FileText, color: 'from-[#D4AF37] to-[#C19A6B]' },
    { id: 'malware' as CategoryFilter, label: 'Malware Analysis', icon: Bug, color: 'from-pink-500 to-rose-500' },
    { id: 'malware-analysis' as CategoryFilter, label: 'Malware Analysis', icon: Bug, color: 'from-pink-500 to-rose-500' },
    { id: 'ctf' as CategoryFilter, label: 'CTF', icon: Flag, color: 'from-green-500 to-emerald-500' },
    { id: 'bug-bounty' as CategoryFilter, label: 'Bug Bounty', icon: DollarSign, color: 'from-yellow-500 to-orange-500' },
    { id: 'research' as CategoryFilter, label: 'Research', icon: FileText, color: 'from-blue-500 to-cyan-500' },
    { id: 'network-security' as CategoryFilter, label: 'Network Security', icon: Network, color: 'from-blue-500 to-cyan-500' },
    { id: 'digital-forensics' as CategoryFilter, label: 'Forensics', icon: Cpu, color: 'from-purple-500 to-indigo-500' },
    { id: 'privilege-escalation' as CategoryFilter, label: 'Privilege Escalation', icon: Shield, color: 'from-red-500 to-orange-500' },
  ];

  useEffect(() => {
    loadWriteups();
  }, []);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredWriteups(writeups);
    } else {
      setFilteredWriteups(writeups.filter(w => w.category === selectedCategory));
    }
  }, [selectedCategory, writeups]);

  const loadWriteups = async () => {
    setLoading(true);

    // First try to load from Supabase
    try {
      const { data } = await supabase
        .from('writeups')
        .select('*')
        .order('published_date', { ascending: false });

      if (data && data.length > 0) {
        setWriteups(data);
        setFilteredWriteups(data);
      } else {
        // If no data from Supabase, use static writeups
        setWriteups(staticWriteups);
        setFilteredWriteups(staticWriteups);
      }
    } catch (error) {
      // If Supabase fails, use static writeups
      console.log('Using static writeups data');
      setWriteups(staticWriteups);
      setFilteredWriteups(staticWriteups);
    }

    setLoading(false);
  };

  // Helper function to count writeups by category
  const getWriteupCount = (categoryId: CategoryFilter) => {
    if (categoryId === 'all') return writeups.length;
    if (categoryId === 'malware') {
      return writeups.filter(w => w.category === 'malware' || w.category === 'malware-analysis').length;
    }
    return writeups.filter(w => w.category === categoryId).length;
  };

  // Helper function to get icon for category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'malware':
      case 'malware-analysis':
        return '🦠';
      case 'ctf':
        return '🏴';
      case 'bug-bounty':
        return '💰';
      case 'research':
        return '🔬';
      case 'network-security':
        return '🌐';
      case 'digital-forensics':
        return '🖥️';
      case 'privilege-escalation':
        return '⬆️';
      default:
        return '📄';
    }
  };

  // Helper function to get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'malware':
        return 'Malware';
      case 'malware-analysis':
        return 'Malware Analysis';
      case 'ctf':
        return 'CTF';
      case 'bug-bounty':
        return 'Bug Bounty';
      case 'research':
        return 'Research';
      case 'network-security':
        return 'Network Security';
      case 'digital-forensics':
        return 'Digital Forensics';
      case 'privilege-escalation':
        return 'Privilege Escalation';
      default:
        return category;
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-4 flex items-center justify-center gap-4">
            <span className="text-6xl">𓀀</span>
            Writeups
            <span className="text-6xl">𓀀</span>
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mb-6" />
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Technical writeups on malware analysis, CTF challenges, bug bounties, security research, and forensics
          </p>
          <div className="mt-4 text-gray-400">
            <span className="text-[#D4AF37] font-bold">{writeups.length}</span> writeups in total
          </div>
        </div>

        <div className="mb-12" data-aos="fade-up" data-aos-delay="100">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              const count = getWriteupCount(category.id);

              // Skip categories with 0 writeups (except "all")
              if (count === 0 && category.id !== 'all') return null;

              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'bg-[#D4AF37] text-[#1B2845] scale-105 shadow-lg shadow-[#D4AF37]/50'
                      : 'bg-[#1B2845]/50 text-gray-300 border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] hover:scale-105'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r ${category.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                  <div className="relative flex items-center gap-2">
                    <Icon size={20} />
                    <span>{category.label}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                      isActive ? 'bg-[#1B2845]/20' : 'bg-[#D4AF37]/20 text-[#D4AF37]'
                    }`}>
                      {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin text-6xl text-[#D4AF37]">𓁢</div>
          </div>
        ) : filteredWriteups.length === 0 ? (
          <div className="text-center py-20" data-aos="fade-up">
            <div className="text-8xl mb-4">𓃭</div>
            <p className="text-2xl text-gray-400">No writeups found in this category yet</p>
            <p className="text-gray-500 mt-2">Check back soon for updates!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {filteredWriteups.map((writeup, idx) => (
              <div
                key={writeup.id}
                data-aos="fade-right"
                data-aos-delay={idx * 50}
                className="group relative bg-[#1B2845]/70 backdrop-blur-sm border-2 border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-[#D4AF37]/20"
              >
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 rounded-bl-full transform translate-x-32 -translate-y-32 group-hover:scale-150 transition-transform" />

                <div className="relative p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{getCategoryIcon(writeup.category)}</span>
                      <span className="px-4 py-1.5 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-mono font-bold">
                        {getCategoryLabel(writeup.category)}
                      </span>
                    </div>

                    {writeup.featured && (
                      <span className="text-2xl text-[#D4AF37]" title="Featured">𓁢</span>
                    )}

                    <div className="flex items-center gap-2 text-gray-400 ml-auto">
                      <Calendar size={16} />
                      <span className="text-sm font-mono">
                        {new Date(writeup.published_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {writeup.title}
                  </h3>

                  <p className="text-gray-400 mb-4 text-lg leading-relaxed">
                    {writeup.description}
                  </p>

                  {writeup.longDescription && (
                    <p className="text-gray-500 mb-4 text-sm italic">
                      {writeup.longDescription.substring(0, 150)}...
                    </p>
                  )}

                  {writeup.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                      <Tag size={16} className="text-[#2E8B93]" />
                      {writeup.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-[#2E8B93]/20 text-[#2E8B93] rounded-full text-sm font-mono hover:bg-[#2E8B93]/30 transition-colors cursor-pointer"
                          onClick={() => alert(`Filter by tag: ${tag}`)}
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-[#D4AF37]/20">
                    <a
                      href={writeup.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-[#1B2845] rounded-lg font-bold hover:bg-[#C19A6B] transition-all hover:scale-105 shadow-lg shadow-[#D4AF37]/30"
                    >
                      <span>Read Writeup</span>
                      <ExternalLink size={18} />
                    </a>

                    <div className="text-gray-400 text-sm">
                      <span className="text-[#D4AF37] font-mono">ID: {writeup.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Featured Writeups Section */}
        {writeups.filter(w => w.featured).length > 0 && selectedCategory === 'all' && (
          <div className="mt-16" data-aos="fade-up">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-[#D4AF37] mb-4 flex items-center justify-center gap-4">
                <span className="text-4xl">⭐</span>
                Featured Writeups
                <span className="text-4xl">⭐</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {writeups.filter(w => w.featured).map((writeup, idx) => (
                <div
                  key={writeup.id}
                  data-aos="zoom-in"
                  data-aos-delay={idx * 100}
                  className="group relative bg-gradient-to-br from-[#D4AF37]/10 to-transparent backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl p-6 hover:border-[#D4AF37] transition-all hover:scale-105"
                >
                  <div className="absolute top-4 right-4 text-3xl text-[#D4AF37] animate-pulse">
                    ⭐
                  </div>

                  <div className="mb-4">
                    <span className="px-3 py-1 bg-[#D4AF37]/30 text-[#D4AF37] rounded-full text-sm font-bold">
                      Featured
                    </span>
                    <span className="ml-2 px-3 py-1 bg-[#2E8B93]/20 text-[#2E8B93] rounded-full text-sm font-mono">
                      {getCategoryLabel(writeup.category)}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#D4AF37] transition-colors">
                    {writeup.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {writeup.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <a
                      href={writeup.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[#D4AF37] hover:underline flex items-center gap-1"
                    >
                      Read Now <ExternalLink size={14} />
                    </a>

                    <span className="text-xs text-gray-500">
                      {new Date(writeup.published_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
