import { useEffect, useState, useRef } from 'react';
import { Shield, Terminal, Bug, Lock, Gamepad2, Code, Trophy, Zap, Cpu, Send, Key, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Project, Writeup } from '../types';

interface HomeProps {
  onNavigate: (page: string) => void;
}

// Interactive Terminal Component
const InteractiveTerminal = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<{text: string, type: 'command' | 'output' | 'error' | 'info' | 'success' | 'warning' | 'ctf' | 'secret', hidden?: boolean}[]>([
    {text: 'pharaoh-terminal', type: 'success'},
    {text: '', type: 'info'},
    {text: 'root@pharaoh:~$', type: 'command'},
  ]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [ctfSolved, setCtfSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const terminalCommands = {
    // Basic commands
    help: 'help - Show available commands',
    clear: 'clear - Clear terminal output',
    ls: 'ls - List available files (click .npz files to navigate)',
    'ls -la': 'ls -la - List all files with details',
    whoami: 'whoami - Display user identity',
    date: 'date - Show current date and time',

    // File viewing commands
    'cat certifications': 'cat certifications - View certifications',
    'cat skills': 'cat skills - View skills',
    'cat writeups': 'cat writeups - View writeups',
    'cat projects': 'cat projects - View projects',
    'cat contact': 'cat contact - View contact info',

    // CTF commands
    ctf: 'ctf - Show Pharaoh\'s Challenge',
    hint: 'hint - Get a mysterious clue',
    submit: 'submit [flag] - Submit your answer',
  };

  // Handle file clicks
  const handleFileClick = (file: string) => {
    const pageMap: Record<string, string> = {
      'certifications.npz': 'certifications',
      'skills.npz': 'certifications',
      'writeups.npz': 'writeups',
      'projects.npz': 'projects',
      'contact.npz': 'contact'
    };

    const page = pageMap[file];
    if (page) {
      const newOutput = [...output,
        {text: `root@pharaoh:~$ cat ${file}`, type: 'command'},
        {text: `Opening ${file.replace('.npz', '')}...`, type: 'info'},
        {text: '', type: 'info'}
      ];
      setOutput(newOutput);
      setTimeout(() => onNavigate(page), 500);
    }
  };

  // Function to check if submitted flag is correct
  const checkFlag = (submittedFlag: string): boolean => {
    const correctFlag = 'Snow{w1nter_is_c0m1n9}';

    // Simple check - remove any whitespace and case-insensitive comparison
    const cleanSubmitted = submittedFlag.trim();
    const cleanCorrect = correctFlag.trim();

    return cleanSubmitted === cleanCorrect;
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const newOutput = [...output, {text: `root@pharaoh:~$ ${cmd}`, type: 'command'}];

    switch (trimmedCmd.toLowerCase()) {
      case '':
        setOutput([...newOutput, {text: '', type: 'info'}]);
        break;

      case 'help':
        newOutput.push({text: 'Available Commands:', type: 'info'});
        newOutput.push({text: '════════════════════════════════════', type: 'info'});
        Object.values(terminalCommands).forEach(desc => {
          newOutput.push({text: `  ${desc}`, type: 'output'});
        });
        newOutput.push({text: '', type: 'info'});
        setOutput(newOutput);
        break;

      case 'ls':
        newOutput.push({text: 'certifications.npz  skills.npz  writeups.npz  projects.npz  contact.npz', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        setOutput(newOutput);
        break;

      case 'ls -la':
        newOutput.push({text: 'total 32', type: 'output'});
        newOutput.push({text: '-rw-r--r-- 1 root root  4096 Feb  1 21:18 certifications.npz', type: 'output'});
        newOutput.push({text: '-rw-r--r-- 1 root root  8192 Feb  1 21:18 skills.npz', type: 'output'});
        newOutput.push({text: '-rwxr-xr-x 1 root root 12288 Feb  1 21:18 writeups.npz', type: 'output'});
        newOutput.push({text: '-rwxr-xr-x 1 root root 16384 Feb  1 21:18 projects.npz', type: 'output'});
        newOutput.push({text: '-rw-r--r-- 1 root root  2048 Feb  1 21:18 contact.npz', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        setOutput(newOutput);
        break;

      case 'whoami':
        newOutput.push({text: 'pharaoh', type: 'output'});
        newOutput.push({text: 'Egyptian Cyber Warrior | Offensive Security Specialist', type: 'info'});
        newOutput.push({text: 'Based in Egypt | Network Security | Malware Analysis', type: 'info'});
        newOutput.push({text: '', type: 'info'});
        setOutput(newOutput);
        break;

      case 'cat certifications':
        newOutput.push({text: '=== CERTIFICATIONS ===', type: 'success'});
        newOutput.push({text: 'Total: 21 certifications', type: 'output'});
        newOutput.push({text: 'Categories: Cisco, Cybersecurity, Development, Networking', type: 'output'});
        newOutput.push({text: 'Latest: CCNA Enterprise Networking (Oct 2025)', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'Opening certifications page...', type: 'info'});
        setOutput(newOutput);
        setTimeout(() => onNavigate('certifications'), 1000);
        break;

      case 'cat skills':
        newOutput.push({text: '=== SKILLS ===', type: 'success'});
        newOutput.push({text: '• Offensive Security | Network Security | Malware Analysis', type: 'output'});
        newOutput.push({text: '• Web Development | Linux Administration | Cryptography', type: 'output'});
        newOutput.push({text: '• CTF Challenges | Reverse Engineering | Network Forensics', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'Skills displayed in certifications page...', type: 'info'});
        setOutput(newOutput);
        setTimeout(() => onNavigate('certifications'), 1000);
        break;

      case 'cat writeups':
        newOutput.push({text: '=== WRITEUPS ===', type: 'success'});
        newOutput.push({text: 'Total: 2 technical writeups', type: 'output'});
        newOutput.push({text: '• PrivExec Privilege Escalation Write-up', type: 'output'});
        newOutput.push({text: '• BadRabbit Ransomware Analysis', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'Opening writeups page...', type: 'info'});
        setOutput(newOutput);
        setTimeout(() => onNavigate('writeups'), 1000);
        break;

      case 'cat projects':
        newOutput.push({text: '=== PROJECTS ===', type: 'success'});
        newOutput.push({text: 'Total: 21 projects', type: 'output'});
        newOutput.push({text: '• CyberSec-Toolkit - Comprehensive security toolkit', type: 'output'});
        newOutput.push({text: '• Advanced Cipher Implementation - Cryptographic algorithms', type: 'output'});
        newOutput.push({text: '• Malware Analysis Workshop - Educational materials', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'Opening projects page...', type: 'info'});
        setOutput(newOutput);
        setTimeout(() => onNavigate('projects'), 1000);
        break;

      case 'cat contact':
        newOutput.push({text: '=== CONTACT ===', type: 'success'});
        newOutput.push({text: 'Email: amrKhaledv2171516@gmail.com', type: 'output'});
        newOutput.push({text: 'GitHub: https://github.com/Amr-Khaled-Ahmed', type: 'output'});
        newOutput.push({text: 'LinkedIn: https://linkedin.com/in/amr-eldhshan', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'Opening contact page...', type: 'info'});
        setOutput(newOutput);
        setTimeout(() => onNavigate('contact'), 1000);
        break;

      case 'ctf':
        const encryptedFlag = 'Wvwe{p9vwlmz_qa_u9u1v5}'; // ROT8 of Snow{w1nter_is_c0m1n9}
        newOutput.push({text: '𓂀 Pharaoh\'s Hidden Challenge 𓂀', type: 'ctf'});
        newOutput.push({text: '════════════════════════════════════', type: 'info'});
        newOutput.push({text: 'Category: Unknown Transformation', type: 'output'});
        newOutput.push({text: 'Difficulty: Decode the message', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'Ciphertext:', type: 'info'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: `  ${encryptedFlag}`, type: 'warning'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'Expected format: Snow{...}', type: 'info'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'Commands:', type: 'info'});
        newOutput.push({text: '  hint - Get a mysterious clue', type: 'output'});
        newOutput.push({text: '  submit [flag] - Submit your answer', type: 'output'});
        newOutput.push({text: '', type: 'info'});
        if (ctfSolved) {
          newOutput.push({text: '✅ CHALLENGE SOLVED!', type: 'success'});
          newOutput.push({text: 'Send the flag via Contact page to claim victory!', type: 'warning'});
        }
        newOutput.push({text: '', type: 'info'});
        setOutput(newOutput);
        break;

      case 'hint':
        newOutput.push({text: '𓁢 Ancient Riddle 𓁢', type: 'ctf'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'When the alphabet circles round', type: 'info'});
        newOutput.push({text: 'And each letter finds new ground', type: 'info'});
        newOutput.push({text: 'Count the steps with careful thought', type: 'info'});
        newOutput.push({text: 'The hidden message will be caught', type: 'info'});
        newOutput.push({text: '', type: 'info'});
        newOutput.push({text: 'What moves forward but stays in place?', type: 'warning'});
        newOutput.push({text: '', type: 'info'});
        setOutput(newOutput);
        break;

      case 'clear':
        setOutput([
          {text: 'pharaoh-terminal', type: 'success'},
          {text: '', type: 'info'},
          {text: 'root@pharaoh:~$', type: 'command'},
        ]);
        break;

      case 'date':
        const now = new Date();
        newOutput.push({text: now.toLocaleString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }), type: 'output'});
        newOutput.push({text: '', type: 'info'});
        setOutput(newOutput);
        break;

      default:
        // Check if it's a submit command
        if (trimmedCmd.toLowerCase().startsWith('submit ')) {
          const submittedFlag = trimmedCmd.substring(7);
          setAttempts(prev => prev + 1);

          if (checkFlag(submittedFlag)) {
            newOutput.push({text: '✅ CORRECT FLAG!', type: 'success'});
            newOutput.push({text: '𓂀 You have deciphered the Pharaoh\'s message! 𓂀', type: 'ctf'});
            newOutput.push({text: '', type: 'info'});
            newOutput.push({text: 'To claim your victory:', type: 'warning'});
            newOutput.push({text: '1. Go to "Contact" page (click contact.npz or type cat contact)', type: 'output'});
            newOutput.push({text: '2. Send me the exact flag: Snow{w1nter_is_c0m1n9}', type: 'output'});
            newOutput.push({text: '3. Mention "Terminal CTF" in your message', type: 'output'});
            newOutput.push({text: '', type: 'info'});
            newOutput.push({text: 'I\'ll verify and contect you back, do not cheat!', type: 'info'});
            setCtfSolved(true);
          } else {
            newOutput.push({text: '❌ Incorrect submission', type: 'error'});
            newOutput.push({text: `Attempts: ${attempts}`, type: 'info'});

            // Add some random "feedback" to make it harder
            const feedbacks = [
              'The letters are dancing in the wrong rhythm',
              'Winter is coming... but not quite yet',
              'Check your transformation carefully',
              'The alphabet might need a little nudge',
              'Each character has taken a journey'
            ];
            const randomFeedback = feedbacks[Math.floor(Math.random() * feedbacks.length)];
            newOutput.push({text: `Hint: ${randomFeedback}`, type: 'warning'});

            newOutput.push({text: '', type: 'info'});
          }
          setOutput(newOutput);
        }
        // Check if it's a cat command
        else if (trimmedCmd.toLowerCase().startsWith('cat ')) {
          const file = trimmedCmd.substring(4);
          if (['certifications', 'skills', 'writeups', 'projects', 'contact'].includes(file)) {
            handleCommand(`cat ${file}`);
          } else {
            newOutput.push({text: `cat: ${file}: No such file`, type: 'error'});
            newOutput.push({text: '', type: 'info'});
            setOutput(newOutput);
          }
        }
        // Unknown command
        else {
          newOutput.push({text: `Command not found: ${trimmedCmd}`, type: 'error'});
          newOutput.push({text: 'Type "help" for available commands', type: 'info'});
          newOutput.push({text: '', type: 'info'});
          setOutput(newOutput);
        }
    }

    if (trimmedCmd && trimmedCmd.toLowerCase() !== 'clear') {
      setHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);
    }

    setCommand('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(command);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : 0;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setCommand('');
      }
    }
  };

  // Get color based on output type
  const getOutputColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-gray-300';
      case 'output': return 'text-gray-200';
      case 'error': return 'text-red-400';
      case 'info': return 'text-gray-400';
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'ctf': return 'text-cyan-400';
      case 'secret': return 'text-purple-400';
      default: return 'text-gray-300';
    }
  };

  return (
    <div className="bg-[#0a0e1a]/95 backdrop-blur-sm border-2 border-[#D4AF37]/30 rounded-xl p-4 font-mono shadow-2xl shadow-[#D4AF37]/10">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-gray-400 ml-2 text-sm">pharaoh-terminal</span>
      </div>

      <div className="h-64 overflow-y-auto mb-4">
        {output.map((item, index) => (
          <div key={index} className="mb-1">
            {item.text.startsWith('root@pharaoh') ? (
              <>
                <span className="text-[#D4AF37]">root@pharaoh</span>
                <span className="text-white">:</span>
                <span className="text-[#2E8B93]">~</span>
                <span className="text-white">$ </span>
                <span className={`${getOutputColor(item.type)}`}>
                  {item.text.substring(18)}
                </span>
              </>
            ) : item.text.includes('.npz') && !item.text.includes('cat ') ? (
              <div className="flex flex-wrap gap-2">
                {item.text.split('  ').map((file, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleFileClick(file.trim())}
                    className="px-2 py-1 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] rounded border border-[#D4AF37]/30 hover:border-[#D4AF37] transition-all text-sm font-medium hover:scale-105"
                    title={`Click to navigate to ${file.replace('.npz', '')}`}
                  >
                    {file.trim()}
                  </button>
                ))}
              </div>
            ) : item.text === 'pharaoh-terminal' ? (
              <div className="text-green-400">{item.text}</div>
            ) : item.text === 'pharaoh' ? (
              <div className="text-[#D4AF37]">{item.text}</div>
            ) : (
              <div className={`${getOutputColor(item.type)}`}>
                {item.text}
              </div>
            )}
          </div>
        ))}

        <div ref={terminalEndRef} />

        <div className="flex items-center">
          <span className="text-[#D4AF37]">root@pharaoh</span>
          <span className="text-white">:</span>
          <span className="text-[#2E8B93]">~</span>
          <span className="text-white">$ </span>
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-gray-300 outline-none ml-1 font-mono"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>

      <div className="text-xs text-gray-500 border-t border-[#D4AF37]/20 pt-2">
        <span className="text-[#D4AF37]">Tip:</span> Use ↑/↓ arrows for command history • Click .npz files to navigate
      </div>
    </div>
  );
};

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [featuredWriteups, setFeaturedWriteups] = useState<Writeup[]>([]);

  useEffect(() => {
    loadFeaturedContent();
  }, []);

  const loadFeaturedContent = async () => {
    const { data: projects } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('created_at', { ascending: false })
      .limit(3);

    const { data: writeups } = await supabase
      .from('writeups')
      .select('*')
      .eq('featured', true)
      .order('published_date', { ascending: false })
      .limit(3);

    if (projects) setFeaturedProjects(projects);
    if (writeups) setFeaturedWriteups(writeups);
  };

  return (
    <div className="relative">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="pyramid-3d" />
        </div>

        <div className="absolute top-20 left-10 text-[#D4AF37] text-6xl animate-float opacity-20">
          𓀀
        </div>
        <div className="absolute top-40 right-20 text-[#D4AF37] text-5xl animate-float-delayed opacity-20">
          𓂀
        </div>
        <div className="absolute bottom-40 left-20 text-[#D4AF37] text-7xl animate-float opacity-20">
          𓃭
        </div>
        <div className="absolute bottom-20 right-10 text-[#D4AF37] text-5xl animate-float-delayed opacity-20">
          𓁢
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center" data-aos="fade-up">
          <div className="mb-8">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-[#D4AF37] blur-2xl opacity-30 animate-pulse" />
              <h1 className="relative text-7xl md:text-9xl font-bold text-[#D4AF37] tracking-wider mb-4 hieroglyph-text">
                𓁢 PHARAOH 𓁢
              </h1>
            </div>
          </div>

          <div className="space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide">
              Offensive Security Specialist
            </h2>
            <p className="text-xl md:text-2xl text-[#2E8B93] font-mono">
              Egyptian Cyber Warrior | Network Security | Malware Analysis
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-lg">
              <div className="flex items-center gap-2">
                <Terminal className="text-[#D4AF37]" size={20} />
                <span>Linux Enthusiast</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="text-[#D4AF37]" size={20} />
                <span>Gamer</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-[#D4AF37]" size={20} />
                <span>CTF Creator</span>
              </div>
            </div>
          </div>

          {/* Quick Command Buttons - MOVE ABOVE TERMINAL */}
          <div className="mb-6">
            <div className="flex flex-wrap justify-center gap-2">
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    input.value = 'ls';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
                    input.dispatchEvent(enterEvent);
                  }
                }}
                className="px-4 py-2 bg-[#1B2845]/50 text-gray-300 rounded-lg border border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 transition-colors text-sm flex items-center gap-1"
              >
                <Code size={14} />
                ls
              </button>
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    input.value = 'whoami';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
                    input.dispatchEvent(enterEvent);
                  }
                }}
                className="px-4 py-2 bg-[#1B2845]/50 text-gray-300 rounded-lg border border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 transition-colors text-sm flex items-center gap-1"
              >
                <Eye size={14} />
                whoami
              </button>
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    input.value = 'ctf';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
                    input.dispatchEvent(enterEvent);
                  }
                }}
                className="px-4 py-2 bg-[#1B2845]/50 text-cyan-400 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/10 transition-colors text-sm flex items-center gap-1"
              >
                <Key size={14} />
                ctf
              </button>
              <button
                onClick={() => {
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (input) {
                    input.value = 'hint';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                    const enterEvent = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true });
                    input.dispatchEvent(enterEvent);
                  }
                }}
                className="px-4 py-2 bg-[#1B2845]/50 text-yellow-400 rounded-lg border border-yellow-500/20 hover:bg-yellow-500/10 transition-colors text-sm flex items-center gap-1"
              >
                <EyeOff size={14} />
                hint
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-4 py-2 bg-[#1B2845]/50 text-[#D4AF37] rounded-lg border border-[#D4AF37]/20 hover:bg-[#D4AF37]/10 transition-colors text-sm flex items-center gap-1"
              >
                <Send size={14} />
                Contact
              </button>
            </div>
          </div>

          {/* Interactive Terminal */}
          <div className="mb-16 max-w-3xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-[#D4AF37] mb-2 flex items-center justify-center gap-2">
                <Cpu className="text-[#D4AF37]" />
                Interactive Terminal
                <Cpu className="text-[#D4AF37]" />
              </h3>
              <p className="text-gray-400 mb-4">
                Type commands or click buttons above. Solve the hidden challenge!
              </p>
            </div>
            <InteractiveTerminal onNavigate={onNavigate} />

            {/* CTF Challenge Info */}
            <div className="mt-6 p-4 bg-[#1B2845]/70 backdrop-blur-sm border border-[#D4AF37]/30 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="text-[#D4AF37]" size={20} />
                <h4 className="text-lg font-bold text-white">Hidden Challenge:</h4>
              </div>
              <p className="text-gray-300 text-sm mb-2">
                Decode the mysterious message. No cryptography terms given - you must figure it out!
              </p>
              <p className="text-gray-400 text-xs">
                Type "ctf" to see the challenge, then "submit [your_answer]" to check.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Rest of your sections remain the same */}
      {featuredProjects.length > 0 && (
        <section className="py-20 px-4 bg-[#0a0e1a]/50">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4 flex items-center justify-center gap-4">
                <span className="text-5xl">𓂀</span>
                Featured Projects
                <span className="text-5xl">𓂀</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {featuredProjects.map((project, idx) => (
                <div
                  key={project.id}
                  data-aos="flip-left"
                  data-aos-delay={idx * 100}
                  className="group relative bg-[#1B2845]/70 backdrop-blur-sm border-2 border-[#D4AF37]/20 rounded-xl overflow-hidden hover:border-[#D4AF37] transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-mono">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-[#2E8B93]/20 text-[#2E8B93] rounded text-xs">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => onNavigate('projects')}
                className="px-8 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#1B2845]"
              >
                View All Projects
              </button>
            </div>
          </div>
        </section>
      )}

      {featuredWriteups.length > 0 && (
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16" data-aos="fade-up">
              <h2 className="text-4xl md:text-5xl font-bold text-[#D4AF37] mb-4 flex items-center justify-center gap-4">
                <span className="text-5xl">𓃭</span>
                Latest Writeups
                <span className="text-5xl">𓃭</span>
              </h2>
              <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              {featuredWriteups.map((writeup, idx) => (
                <div
                  key={writeup.id}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="group relative bg-[#1B2845]/70 backdrop-blur-sm border-2 border-[#D4AF37]/20 rounded-xl p-6 hover:border-[#D4AF37] transition-all duration-300 hover:transform hover:scale-105"
                >
                  <span className="px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-sm font-mono">
                    {writeup.category}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-4 mb-2">{writeup.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{writeup.description}</p>
                  <p className="text-[#2E8B93] text-sm font-mono">
                    {new Date(writeup.published_date).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => onNavigate('writeups')}
                className="px-8 py-3 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] font-bold rounded-lg transition-all duration-300 hover:bg-[#D4AF37] hover:text-[#1B2845]"
              >
                Read All Writeups
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// woooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooow
