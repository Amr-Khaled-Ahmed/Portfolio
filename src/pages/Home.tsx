import { useEffect, useState, useRef, useCallback } from 'react';
import { Shield, Terminal, Bug, Gamepad2, Trophy, Cpu, Send, Key, Eye, EyeOff, Sparkles, Brain, Skull, Fingerprint, AlertTriangle, Clock, Hash, LockKeyhole, Search, FileCode, FolderOpen, HardDrive, Network, Globe, Users, Bell, Volume2, Settings, Power, RefreshCw, Play, StopCircle, Camera, Battery, Cloud, Sun, Moon, CloudRain, CloudLightning } from 'lucide-react';

// Mock Supabase client - replace with actual implementation
const mockSupabase = {
  from: (table: string) => ({
    select: () => ({
      eq: () => ({
        order: () => ({
          limit: () => ({
            data: [],
            error: null
          })
        })
      })
    })
  })
};

interface HomeProps {
  onNavigate: (page: string) => void;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  tech_stack: string[];
  featured: boolean;
  created_at: string;
}

interface Writeup {
  id: string;
  title: string;
  description: string;
  category: string;
  published_date: string;
  featured: boolean;
}

// Interactive Terminal Component
const InteractiveTerminal = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<{text: string, type: 'command' | 'output' | 'error' | 'info' | 'success' | 'warning' | 'ctf' | 'secret' | 'system', hidden?: boolean}[]>([
    // {text: '', type: 'system'},
    // {text: '█▓▒░ ZeroAccess TERMINAL v2.3.1 ░▒▓█', type: 'success'},
    // {text: '● System: ZeroAccessOS 11.0 (Kernel 5.19.0-pwn)', type: 'system'},
    // {text: '● Shell: ZeroAccess Z-Shell 7.2', type: 'system'},
    // {text: '● Uptime: 47d 12h 33m', type: 'system'},
    // {text: '● Security: Maximum (Hacker Mode)', type: 'warning'},
    // {text: '', type: 'system'},
    // {text: '█▓▒░ INITIALIZING... ░▒▓█', type: 'system'},
    // {text: '✓ Loading security modules... [OK]', type: 'success'},
    // {text: '✓ Establishing encrypted tunnel... [SECURE]', type: 'success'},
    // {text: '✓ Bypassing firewalls... [PWNED]', type: 'ctf'},
    // {text: '✓ Root privileges acquired... [MAXIMUM]', type: 'warning'},
    // {text: '', type: 'system'},
    // {text: '█▓▒░ WELCOME TO THE MATRIX ░▒▓█', type: 'secret'},
    // {text: '', type: 'system'},
    // {text: 'Type "help" for commands • Type "matrix" for visual mode • Type "ctf" for challenge', type: 'info'},
    // {text: '', type: 'system'},
  ]);

  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [ctfSolved, setCtfSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [systemTime, setSystemTime] = useState('');
  const [matrixMode, setMatrixMode] = useState(false);
  const [heartbeat, setHeartbeat] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Update system time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setSystemTime(now.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

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
    help: ' - Show available commands',
    clear: ' - Clear terminal output',
    ls: ' - List available files',
    'ls -la': ' - List all files with details',
    whoami: ' - Display user identity',
    date: ' - Show current date and time',
    sysinfo: ' - Display system information',
    neofetch: ' - Display system info with style',
    'cat certifications': ' - View certifications',
    'cat skills': ' - View skills',
    'cat writeups': ' - View writeups',
    'cat projects': ' - View projects',
    'cat contact': ' - View contact info',
    ctf: ' - Show Pharaoh\'s Challenge',
    hint: ' - Get a mysterious clue',
    submit: ' [flag] - Submit your answer',
    matrix: ' - Enable visual mode',
    pulse: ' - Start heartbeat monitor',
    echo: ' [text] - Echo with special effects',
    scan: ' - Scan system for vulnerabilities',
    decrypt: ' - Try to decrypt something',
    pharaoh: ' - Show pharaoh wisdom',
    hackermode: ' - Activate hacker mode (hidden)',
  };

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
        {text: `root@ZeroAccess:~$ cat ${file}`, type: 'command' as const},
        {text: `Decrypting ${file}...`, type: 'info' as const},
        {text: 'Accessing secure data...', type: 'info' as const},
        {text: `Redirecting to ${file.replace('.npz', '')}...`, type: 'success' as const},
        {text: '', type: 'system' as const}
      ];
      setOutput(newOutput);
      setTimeout(() => onNavigate(page), 1000);
    }
  };

  const checkFlag = (submittedFlag: string): boolean => {
    const correctFlag = 'Snow{w1nter_is_c0m1n9}';
    const cleanSubmitted = submittedFlag.trim();
    const cleanCorrect = correctFlag.trim();
    return cleanSubmitted === cleanCorrect;
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const newOutput = [...output, {text: `root@ZeroAccess:~$ ${cmd}`, type: 'command' as const}];

    switch (trimmedCmd.toLowerCase()) {
      case '':
        setOutput([...newOutput, {text: '', type: 'system' as const}]);
        break;

      case 'help':
        newOutput.push({text: '╔════════════════════════════════════╗', type: 'system'});
        newOutput.push({text: '║        COMMAND REFERENCE           ║', type: 'system'});
        newOutput.push({text: '╚════════════════════════════════════╝', type: 'system'});
        newOutput.push({text: '', type: 'system'});
        Object.entries(terminalCommands).forEach(([cmd, desc]) => {
          newOutput.push({text: `  ${cmd.padEnd(20)} ${desc}`, type: 'output'});
        });
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'ls':
        newOutput.push({text: '📂 PORTFOLIO/', type: 'output'});
        newOutput.push({text: '  certifications.npz  [ENCRYPTED]', type: 'ctf'});
        newOutput.push({text: '  skills.npz          [ENCRYPTED]', type: 'ctf'});
        newOutput.push({text: '  writeups.npz        [ENCRYPTED]', type: 'ctf'});
        newOutput.push({text: '  projects.npz        [ENCRYPTED]', type: 'ctf'});
        newOutput.push({text: '  contact.npz         [ENCRYPTED]', type: 'ctf'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'ls -la':
        newOutput.push({text: 'total 256K', type: 'output'});
        newOutput.push({text: 'drwx------   7 root root 4.0K Feb  1 00:00 .', type: 'output'});
        newOutput.push({text: 'drwxr-xr-x  18 root root 4.0K Feb  1 00:00 ..', type: 'output'});
        newOutput.push({text: '-rwxr-xr-x   1 root root  12K Feb  1 00:00 certifications.npz', type: 'ctf'});
        newOutput.push({text: '-rwxr-xr-x   1 root root  8.2K Feb  1 00:00 skills.npz', type: 'ctf'});
        newOutput.push({text: '-rwxr-xr-x   1 root root  12K Feb  1 00:00 writeups.npz', type: 'ctf'});
        newOutput.push({text: '-rwxr-xr-x   1 root root  16K Feb  1 00:00 projects.npz', type: 'ctf'});
        newOutput.push({text: '-rwxr-xr-x   1 root root  2.0K Feb  1 00:00 contact.npz', type: 'ctf'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'whoami':
        newOutput.push({text: '╔════════════════════════════════════╗', type: 'system'});
        newOutput.push({text: '║        USER IDENTITY               ║', type: 'system'});
        newOutput.push({text: '╚════════════════════════════════════╝', type: 'system'});
        newOutput.push({text: '', type: 'system'});
        newOutput.push({text: '👤 Username: ZeroAccess', type: 'output'});
        newOutput.push({text: '🏆 Title: Egyptian Cyber Warrior', type: 'output'});
        newOutput.push({text: '🎯 Specialty: Offensive Security', type: 'output'});
        newOutput.push({text: '📍 Location: Digital Egypt', type: 'output'});
        newOutput.push({text: '⚡ Status: Root Access Active', type: 'success'});
        newOutput.push({text: '🛡️  Security Level: MAXIMUM', type: 'warning'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'sysinfo':
        newOutput.push({text: '╔════════════════════════════════════╗', type: 'system'});
        newOutput.push({text: '║        SYSTEM INFORMATION          ║', type: 'system'});
        newOutput.push({text: '╚════════════════════════════════════╝', type: 'system'});
        newOutput.push({text: '', type: 'system'});
        newOutput.push({text: '💻 OS: ZeroAccessOS 11.0 (ZeroAccess Edition)', type: 'output'});
        newOutput.push({text: '⚙️  Kernel: 5.19.0-pwn-generic', type: 'output'});
        newOutput.push({text: '🐚 Shell: ZeroAccess Z-Shell 7.2', type: 'output'});
        newOutput.push({text: '⏱️  Uptime: 47d 12h 33m', type: 'output'});
        newOutput.push({text: '🔒 Security: Maximum (Hacker Mode Active)', type: 'warning'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'neofetch':
        newOutput.push({text: '            █▓▒░ ZeroAccess-OS ░▒▓█', type: 'system'});
        newOutput.push({text: '       ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄', type: 'system'});
        newOutput.push({text: '       OS: ZeroAccessOS 11.0 ZeroAccess', type: 'output'});
        newOutput.push({text: '       Host: Cyber War Machine', type: 'output'});
        newOutput.push({text: '       Kernel: 5.19.0-pwn-generic', type: 'output'});
        newOutput.push({text: '       Shell: zsh 7.2 (ZeroAccess)', type: 'output'});
        newOutput.push({text: '       CPU: Intel i9-13900K (24) @ 5.8GHz', type: 'output'});
        newOutput.push({text: '       Memory: 62474MiB / 64240MiB', type: 'output'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'matrix':
        setMatrixMode(!matrixMode);
        newOutput.push({text: matrixMode ? 'Exiting digital reality...' : 'ENTERING THE MATRIX...', type: matrixMode ? 'info' : 'warning'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'pulse':
        setHeartbeat(!heartbeat);
        newOutput.push({text: heartbeat ? 'Heartbeat monitor stopped.' : 'Heartbeat monitor activated...', type: heartbeat ? 'info' : 'ctf'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'scan':
        newOutput.push({text: '╔════════════════════════════════════╗', type: 'system'});
        newOutput.push({text: '║        SECURITY SCAN               ║', type: 'system'});
        newOutput.push({text: '╚════════════════════════════════════╝', type: 'system'});
        newOutput.push({text: '', type: 'system'});
        newOutput.push({text: '🔍 Scanning system...', type: 'info'});
        newOutput.push({text: '✓ Firewall: Bypassed', type: 'success'});
        newOutput.push({text: '✓ Encryption: Strong', type: 'success'});
        newOutput.push({text: '✓ Root Access: Confirmed', type: 'success'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'hackermode':
        newOutput.push({text: '⚠️  WARNING: ACTIVATING HACKER MODE', type: 'warning'});
        newOutput.push({text: 'Unlocking ultimate privileges...', type: 'ctf'});
        newOutput.push({text: '✅ HACKER MODE ACTIVATED', type: 'success'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'pharaoh':
        newOutput.push({text: '𓂀𓂀𓂀 PHARAOH\'S WISDOM 𓂀𓂀𓂀', type: 'secret'});
        newOutput.push({text: '', type: 'system'});
        newOutput.push({text: '• The best defense is a good offense', type: 'output'});
        newOutput.push({text: '• Code is law, but exploits are poetry', type: 'output'});
        newOutput.push({text: '• Every lock has a key, every system has a flaw', type: 'output'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'decrypt':
        newOutput.push({text: '🔓 INITIATING DECRYPTION SEQUENCE', type: 'ctf'});
        newOutput.push({text: 'Analyzing cipher patterns...', type: 'info'});
        newOutput.push({text: 'Pattern detected: Alphabet shift', type: 'warning'});
        newOutput.push({text: 'Try different values between 1-25', type: 'info'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'ctf':
        const encryptedFlag = 'Wvwe{p9vwlmz_qa_u9u1v5}';
        newOutput.push({text: '╔════════════════════════════════════╗', type: 'system'});
        newOutput.push({text: '║        PHARAOH\'S CHALLENGE         ║', type: 'system'});
        newOutput.push({text: '╚════════════════════════════════════╝', type: 'system'});
        newOutput.push({text: '', type: 'system'});
        newOutput.push({text: '🎯 Challenge: Decode the Secret', type: 'ctf'});
        newOutput.push({text: '🔐 Category: Transformation', type: 'output'});
        newOutput.push({text: '', type: 'system'});
        newOutput.push({text: '🔢 Encrypted Message:', type: 'info'});
        newOutput.push({text: `   ${encryptedFlag}`, type: 'warning'});
        newOutput.push({text: '', type: 'system'});
        newOutput.push({text: '📝 Format: Snow{...}', type: 'info'});
        newOutput.push({text: '', type: 'system'});
        if (ctfSolved) {
          newOutput.push({text: '✅ CHALLENGE SOLVED!', type: 'success'});
        }
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'hint':
        newOutput.push({text: '╔════════════════════════════════════╗', type: 'system'});
        newOutput.push({text: '║        ANCIENT RIDDLE              ║', type: 'system'});
        newOutput.push({text: '╚════════════════════════════════════╝', type: 'system'});
        newOutput.push({text: '', type: 'system'});
        newOutput.push({text: 'I move forward, yet stay in place,', type: 'output'});
        newOutput.push({text: 'Through letters, I slowly race.', type: 'output'});
        newOutput.push({text: 'A simple shift, a subtle slide,', type: 'output'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      case 'clear':
        setOutput([
          {text: '', type: 'system'},
          {text: '█▓▒░ ZeroAccess TERMINAL ░▒▓█', type: 'success'},
          {text: '● System reset complete', type: 'system'},
          {text: '', type: 'system'},
        ]);
        break;

      case 'date':
        const now = new Date();
        newOutput.push({text: `📅 ${now.toLocaleDateString('en-US', {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}`, type: 'output'});
        newOutput.push({text: `⏰ ${now.toLocaleTimeString('en-US', {hour12: false})}`, type: 'output'});
        newOutput.push({text: '', type: 'system'});
        setOutput(newOutput);
        break;

      default:
        if (trimmedCmd.toLowerCase().startsWith('submit ')) {
          const submittedFlag = trimmedCmd.substring(7);
          setAttempts(prev => prev + 1);

          if (checkFlag(submittedFlag)) {
            newOutput.push({text: '╔════════════════════════════════════╗', type: 'system'});
            newOutput.push({text: '║        VICTORY ACHIEVED!           ║', type: 'system'});
            newOutput.push({text: '╚════════════════════════════════════╝', type: 'system'});
            newOutput.push({text: '', type: 'system'});
            newOutput.push({text: '✅ CORRECT FLAG SUBMITTED!', type: 'success'});
            newOutput.push({text: '𓂀 You have mastered the Pharaoh\'s challenge! 𓂀', type: 'ctf'});
            newOutput.push({text: '', type: 'system'});
            newOutput.push({text: '🏆 Flag: Snow{w1nter_is_c0m1n9}', type: 'success'});
            newOutput.push({text: '', type: 'system'});
            setCtfSolved(true);
          } else {
            newOutput.push({text: '❌ INCORRECT SUBMISSION', type: 'error'});
            newOutput.push({text: `📊 Attempts: ${attempts}`, type: 'info'});
            newOutput.push({text: '💡 The letters have shifted positions...', type: 'warning'});
            newOutput.push({text: '', type: 'system'});
          }
          setOutput(newOutput);
        } else if (trimmedCmd.toLowerCase().startsWith('echo ')) {
          const echoText = trimmedCmd.substring(5);
          newOutput.push({text: echoText, type: 'secret'});
          newOutput.push({text: '✨ Echo from the void...', type: 'info'});
          newOutput.push({text: '', type: 'system'});
          setOutput(newOutput);
        } else if (trimmedCmd.toLowerCase().startsWith('cat ')) {
          const file = trimmedCmd.substring(4);
          const validFiles = ['certifications', 'skills', 'writeups', 'projects', 'contact'];

          if (validFiles.includes(file)) {
            newOutput.push({text: `Decrypting ${file}.npz...`, type: 'info'});
            newOutput.push({text: 'Redirecting...', type: 'success'});
            newOutput.push({text: '', type: 'system'});
            setOutput(newOutput);
            setTimeout(() => onNavigate(file === 'skills' ? 'certifications' : file), 800);
          } else {
            newOutput.push({text: `cat: ${file}: No such file or directory`, type: 'error'});
            newOutput.push({text: '', type: 'system'});
            setOutput(newOutput);
          }
        } else {
          newOutput.push({text: `Command not found: ${trimmedCmd}`, type: 'error'});
          newOutput.push({text: 'Type "help" for available commands', type: 'info'});
          newOutput.push({text: '', type: 'system'});
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
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
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
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = Object.keys(terminalCommands);
      const matching = commands.filter(c => c.startsWith(command.toLowerCase()));
      if (matching.length === 1) {
        setCommand(matching[0]);
      }
    }
  };

  const getOutputColor = (type: string) => {
    switch (type) {
      case 'command': return 'text-gray-300';
      case 'output': return 'text-gray-200';
      case 'error': return 'text-red-400';
      case 'info': return 'text-blue-400';
      case 'success': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'ctf': return 'text-cyan-400';
      case 'secret': return 'text-purple-400';
      case 'system': return 'text-gray-400';
      default: return 'text-gray-300';
    }
  };

  const MatrixEffect = () => {
    if (!matrixMode) return null;

    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/20 via-black/50 to-green-900/20">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-400 font-mono text-xs opacity-70"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * -100}%`,
                animation: `fall ${Math.random() * 3 + 2}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            >
              {Math.random().toString(36).substring(2, 8)}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <MatrixEffect />
      <style>{`
        @keyframes fall {
          to { transform: translateY(100vh); }
        }
      `}</style>

      <div className={`bg-slate-900/95 backdrop-blur-sm border-2 ${matrixMode ? 'border-green-500/50' : 'border-yellow-600/30'} rounded-xl p-4 font-mono shadow-2xl transition-all duration-300`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer" onClick={() => setMatrixMode(!matrixMode)}></div>
            <span className="text-gray-400 ml-2 text-sm">root@ZeroAccess:~$</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            <Clock size={12} />
            <span>{systemTime}</span>
            {matrixMode && <span className="text-green-400">MATRIX</span>}
          </div>
        </div>

        <div className="h-80 overflow-y-auto mb-4">
          {output.map((item, index) => (
            <div key={index} className="mb-1">
              {item.text.startsWith('root@ZeroAccess') ? (
                <div className="flex items-start">
                  <span className="text-yellow-600">root@ZeroAccess</span>
                  <span className="text-white">:</span>
                  <span className="text-cyan-600">~</span>
                  <span className="text-white">$ </span>
                  <span className={`${getOutputColor(item.type)} ml-1 break-all`}>
                    {item.text.substring(18)}
                  </span>
                </div>
              ) : item.text.includes('.npz') && !item.text.includes('cat ') ? (
                <div className="flex flex-wrap gap-2">
                  {item.text.split('  ').map((file, idx) => {
                    const cleanFile = file.trim().replace('[ENCRYPTED]', '').trim();
                    if (!cleanFile || cleanFile === '📂 PORTFOLIO/') return null;
                    return (
                      <button
                        key={idx}
                        onClick={() => handleFileClick(cleanFile)}
                        className="px-2 py-1 bg-yellow-600/10 hover:bg-yellow-600/20 text-yellow-600 rounded border border-yellow-600/30 hover:border-yellow-600 transition-all text-sm font-medium hover:scale-105 flex items-center gap-1"
                      >
                        <FileCode size={12} />
                        {cleanFile}
                        <span className="text-xs text-yellow-500">[ENC]</span>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className={`${getOutputColor(item.type)} ${item.type === 'success' || item.type === 'ctf' ? 'font-bold' : ''} break-all`}>
                  {item.text}
                </div>
              )}
            </div>
          ))}

          <div ref={terminalEndRef} />

          <div className="flex items-center mt-2">
            <span className="text-yellow-600">root@ZeroAccess</span>
            <span className="text-white">:</span>
            <span className="text-cyan-600">~</span>
            <span className="text-white">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none ml-1 font-mono caret-yellow-600"
              autoFocus
              spellCheck={false}
              placeholder="Type command..."
            />
          </div>
        </div>

        <div className="text-xs text-gray-500 border-t border-yellow-600/20 pt-2 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Trophy size={10} />
              <span>CTF: {ctfSolved ? '✅ SOLVED' : '🔒 ACTIVE'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Brain size={10} />
              <span>Commands: {Object.keys(terminalCommands).length}</span>
            </div>
          </div>
          <div className="text-gray-600">
            <span className="text-yellow-600">[</span>
            <span>root</span>
            <span className="text-yellow-600">]</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Home({ onNavigate }: HomeProps) {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [featuredWriteups, setFeaturedWriteups] = useState<Writeup[]>([]);
  const [sessionTime, setSessionTime] = useState('00:00:00');

  useEffect(() => {
    loadFeaturedContent();

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const hours = Math.floor(elapsed / 3600000);
      const minutes = Math.floor((elapsed % 3600000) / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      setSessionTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const loadFeaturedContent = async () => {
    // Mock data for demonstration
    setFeaturedProjects([
      {
        id: '1',
        title: 'Network Security Tool',
        description: 'Advanced packet analyzer for security assessment',
        category: 'Security',
        tech_stack: ['Python', 'Scapy', 'Wireshark'],
        featured: true,
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        title: 'Malware Analysis Lab',
        description: 'Automated malware detection and analysis system',
        category: 'Analysis',
        tech_stack: ['Python', 'YARA', 'Cuckoo'],
        featured: true,
        created_at: new Date().toISOString()
      }
    ]);

    setFeaturedWriteups([
      {
        id: '1',
        title: 'Advanced Web Exploitation',
        description: 'Deep dive into modern web vulnerabilities',
        category: 'Web Security',
        published_date: new Date().toISOString(),
        featured: true
      }
    ]);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-7xl md:text-9xl font-bold text-yellow-600 tracking-wider mb-4">
              Amr Eldhshan

            </h1>
          </div>

          <div className="space-y-4 mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-wide">
               Security Specialist
            </h2>
            <p className="text-xl md:text-2xl text-cyan-600 font-mono">
              Egyptian Cyber Warrior | Network Security | Malware Analysis
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-gray-400 text-lg">
              <div className="flex items-center gap-2">
                <Terminal className="text-yellow-600" size={20} />
                <span>Linux Enthusiast</span>
              </div>
              <div className="flex items-center gap-2">
                <Gamepad2 className="text-yellow-600" size={20} />
                <span>Gamer</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="text-yellow-600" size={20} />
                <span>CTF Creator</span>
              </div>
              <div className="flex items-center gap-2">
                <Bug className="text-yellow-600" size={20} />
                <span>Malware Analyst</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            <div className="bg-slate-800/70 backdrop-blur-sm border border-yellow-600/20 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-400 mb-1">Session Time</div>
              <div className="text-xl text-yellow-600 font-mono">{sessionTime}</div>
            </div>
            <div className="bg-slate-800/70 backdrop-blur-sm border border-yellow-600/20 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-400 mb-1">Commands</div>
              <div className="text-xl text-yellow-600 font-mono">20+</div>
            </div>
            <div className="bg-slate-800/70 backdrop-blur-sm border border-yellow-600/20 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-400 mb-1">Files</div>
              <div className="text-xl text-yellow-600 font-mono">5</div>
            </div>
            <div className="bg-slate-800/70 backdrop-blur-sm border border-yellow-600/20 rounded-lg p-3 text-center">
              <div className="text-sm text-gray-400 mb-1">CTF Status</div>
              <div className="text-xl text-yellow-600 font-mono">ACTIVE</div>
            </div>
          </div>

          <div className="mb-16 max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-yellow-600 mb-2 flex items-center justify-center gap-2">
                <Terminal className="text-yellow-600" />
                ZeroAccess Terminal v2.3.1
                <Terminal className="text-yellow-600" />
              </h3>
              <p className="text-gray-400 mb-4">
                Your gateway to the digital realm. Type commands, solve challenges, explore secrets.
              </p>
            </div>

            <InteractiveTerminal onNavigate={onNavigate} />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-800/70 backdrop-blur-sm border border-yellow-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Trophy className="text-yellow-600" size={20} />
                  <h4 className="text-lg font-bold text-white">CTF Challenge</h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Decode the transformation. Discover the cipher!
                </p>
                <div className="text-xs text-gray-400">
                  <span className="text-yellow-600">●</span> Type "ctf" for the challenge<br />
                  <span className="text-yellow-600">●</span> Type "hint" for a clue<br />
                  <span className="text-yellow-600">●</span> Type "submit [flag]" to check
                </div>
              </div>

              <div className="p-4 bg-slate-800/70 backdrop-blur-sm border border-yellow-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="text-yellow-600" size={20} />
                  <h4 className="text-lg font-bold text-white">Navigation</h4>
                </div>
                <p className="text-gray-300 text-sm mb-2">
                  Click .npz files or use "cat" commands to explore.
                </p>
                <div className="text-xs text-gray-400">
                  <span className="text-yellow-600">●</span> Click encrypted files to navigate<br />
                  <span className="text-yellow-600">●</span> Type "cat [file]" for direct access<br />
                  <span className="text-yellow-600">●</span> Type "help" for all commands
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
