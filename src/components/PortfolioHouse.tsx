import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Award,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  BookOpen,
  Cpu,
  ExternalLink,
  FolderOpen,
  Home,
  Mail,
  Monitor,
  Shield,
  Trophy,
  X,
  type LucideIcon,
} from 'lucide-react';
import './PortfolioHouse.css';

type RoomId = 'profile' | 'skills' | 'certifications' | 'projects' | 'writeups' | 'ctf' | 'contact';
type Point = { x: number; y: number };
type Furnishing = { label: string; x: number; y: number; width: number; height: number; icon: LucideIcon };

interface HouseRoom {
  id: RoomId;
  name: string;
  subtitle: string;
  glyph: string;
  icon: LucideIcon;
  row: 'top' | 'bottom' | 'foyer';
  column: number;
  description: string;
  details: string[];
  destination?: string;
  furnishings?: Furnishing[];
}

const skillGroups = [
  { name: 'SOC & Security Monitoring', details: 'Phishing email analysis, SIEM fundamentals, threat intelligence, digital forensics basics, endpoint and network security monitoring. Tools: Wireshark, tcpdump, Snort.' },
  { name: 'Malware Analysis & Reverse Engineering', details: 'Static and dynamic analysis, anti-analysis and debugging bypass, deobfuscation. Tools: IDA Pro, Ghidra, x64dbg, dnSpy, JADX, Sysinternals Suite, PEStudio, DIE, FakeNet-NG.' },
  { name: 'Penetration Testing', details: 'Vulnerability scanning, exploitation, web application testing. Tools: Kali Linux, Burp Suite, Metasploit, Nessus, Acunetix.' },
  { name: 'Reconnaissance & OSINT', details: 'Information gathering and asset discovery. Tools: OSINT Framework, Nmap, Amass, Shodan, Recon-ng, theHarvester.' },
  { name: 'Network Security & Firewalls', details: 'Security policy design, threat protection, system hardening, IPsec and SSL VPNs. Tools: FortiGate 7.6, FortiManager, IDS/IPS.' },
  { name: 'Networking Infrastructure', details: 'Routing, switching, OSPF, EIGRP, NAT, VLANs, STP, QoS and TCP/IP. CCNA-level networking; Wireshark.' },
  { name: 'Forensics & Detection', details: 'Memory forensics (CTF), custom YARA rules and traffic analysis.' },
  { name: 'Core Systems & Automation', details: 'Windows and Windows Server, Linux (RHEL and Debian), x86 Assembly, ARM, PowerShell, Bash, Batch, Git and GitHub.' },
  { name: 'Programming & Scripting', details: 'C, C++, Python, Java, JavaScript, HTML, SQL, x86 Assembly, ARM, PowerShell, Bash, Batch and Git.' },
];

const educationItems = [
  {
    title: 'Faculty of Computers and Artificial Intelligence',
    organization: 'Cairo University · Giza, Egypt',
    period: '2023 – Present',
    details: 'Expected graduation: 2027.',
  },
  {
    title: 'Cisco CyberOps Associate',
    organization: 'NTI · Up-Skilling Program',
    period: '2026 · In progress',
    details: 'SOC curriculum covering analyst fundamentals, protocols, threat actors, security infrastructure, cryptography, endpoint protection, logs and alerts, and digital forensics and incident response.',
  },
  {
    title: 'Intensive Cybersecurity & Networking Summer Training',
    organization: 'ITI',
    period: '2026',
    details: 'Ethical hacking fundamentals and Cisco CCNA (Introduction to Networking, Advanced Networking, and HCCDA Tech Essentials).',
  },
  {
    title: 'System Administration & Professional Skills Program',
    organization: 'NTI · Creativa Innovation Hub',
    period: '2025 · 90 hours',
    details: 'Red Hat System Administration I & II (RHCSA path): scripting, storage, LVM, filesystems, ACLs, SELinux, firewall configuration, user management, and container basics.',
  },
  {
    title: 'Intensive Cybersecurity Training',
    organization: 'Xpand CS Academy · MCS instructors',
    period: 'Jul 2025',
    details: 'Network infrastructure and security, ethical hacking fundamentals, Palo Alto firewall configuration, and cloud infrastructure virtualization.',
  },
  {
    title: 'Infrastructure & Security Track',
    organization: 'Digital Egypt Pioneers Initiative (DEPI) · MCIT Egypt',
    period: 'Dec 2025',
    details: 'FortiGate 7.6 and FortiManager; VPNs, IDS/IPS, threat protection, vulnerability assessment, incident response, security policies, system hardening, and the CCNA 200-301 curriculum.',
  },
];

type SkillsTab = 'skills' | 'education';

const rooms: HouseRoom[] = [
  {
    id: 'profile', name: 'The Foyer', subtitle: 'Profile', glyph: '𓂀', icon: Home, row: 'foyer', column: 0,
    description: 'Welcome to my home base. I am Amr Khaled Eldhshan, a SOC Engineer focused on security operations and network defense.',
    details: ['Egyptian Cyber Warrior', 'Linux enthusiast', 'CTF competitor'],
  },
  {
    id: 'skills', name: 'Skills Lab', subtitle: 'Tools & focus areas', glyph: '𓋹', icon: Cpu, row: 'top', column: 0,
    description: 'A workshop for the tools and disciplines I use across security, systems, networking, and development.',
    details: ['Linux & system administration', 'Network security', 'Security operations', 'Python & scripting', 'Web development'],
    furnishings: [
      { label: 'Workstation', x: 6, y: 17, width: 11, height: 7, icon: Monitor },
      { label: 'Reference shelf', x: 23, y: 11, width: 6, height: 17, icon: BookOpen },
    ],
  },
  {
    id: 'certifications', name: 'Certifications', subtitle: 'Credential gallery', glyph: '𓆣', icon: Award, row: 'top', column: 1,
    description: 'A gallery of professional certifications and learning milestones across cybersecurity, networking, and development.',
    details: ['Fortinet & network security', 'Linux administration', 'Routing and switching', 'Cloud and development'],
    destination: 'certifications',
    furnishings: [
      { label: 'Certificate case', x: 42, y: 17, width: 15, height: 7, icon: Award },
      { label: 'Display stand', x: 59, y: 12, width: 5, height: 14, icon: Shield },
    ],
  },
  {
    id: 'projects', name: 'Project Workshop', subtitle: 'Builds & tools', glyph: '𓇳', icon: FolderOpen, row: 'top', column: 2,
    description: 'A workshop for cybersecurity tools, experiments, and software projects built while learning and solving problems.',
    details: ['Cybersecurity utilities', 'Web applications', 'Automation and scripting', 'Open-source repositories'],
    destination: 'projects',
    furnishings: [
      { label: 'Build bench', x: 73, y: 17, width: 15, height: 7, icon: Monitor },
      { label: 'Tool cabinet', x: 90, y: 11, width: 6, height: 15, icon: Cpu },
    ],
  },
  {
    id: 'writeups', name: 'Writeups Library', subtitle: 'Research & notes', glyph: '𓏛', icon: BookOpen, row: 'bottom', column: 0,
    description: 'A quiet corner for technical notes, walkthroughs, and lessons learned from security research and CTFs.',
    details: ['CTF walkthroughs', 'Security research notes', 'Technical investigations'],
    destination: 'writeups',
    furnishings: [
      { label: 'Bookshelf', x: 5, y: 67, width: 7, height: 19, icon: BookOpen },
      { label: 'Reading table', x: 16, y: 74, width: 12, height: 7, icon: Monitor },
    ],
  },
  {
    id: 'ctf', name: 'CTF Chamber', subtitle: 'Pharaoh’s challenge', glyph: '𓂀', icon: Trophy, row: 'bottom', column: 1,
    description: 'Decode the encrypted flag. The message uses an alphabet shift; submit your answer in the required format.',
    details: ['Category: Transformation', 'Encrypted: Wvwe{p9vwlmz_qa_u9u1v5}', 'Flag format: Snow{...}'],
    furnishings: [
      { label: 'Cipher altar', x: 42, y: 72, width: 15, height: 9, icon: Trophy },
      { label: 'Artifact case', x: 60, y: 67, width: 5, height: 14, icon: Shield },
    ],
  },
  {
    id: 'contact', name: 'Contact Lounge', subtitle: 'Get in touch', glyph: '𓆸', icon: Mail, row: 'bottom', column: 2,
    description: 'Have a security opportunity, a project idea, or a question? Come by and get in touch.',
    details: ['SOC engineering', 'Cybersecurity collaboration', 'Project and research inquiries'],
    destination: 'contact',
    furnishings: [
      { label: 'Conversation table', x: 73, y: 74, width: 12, height: 7, icon: Mail },
      { label: 'Side cabinet', x: 90, y: 68, width: 6, height: 14, icon: Home },
    ],
  },
];

const columns = [175, 500, 825];
const roomRanges = [[30, 330], [355, 645], [670, 970]] as const;
const stepSize = 18;

function getDoorPosition(room: HouseRoom): Point {
  if (room.id === 'profile') return { x: 87, y: 264 };
  return { x: columns[room.column], y: room.row === 'top' ? 250 : 350 };
}

function isWalkable(point: Point): boolean {
  if (point.x < 24 || point.x > 976 || point.y < 28 || point.y > 572) return false;
  if (point.y >= 250 && point.y <= 350) return true;

  const roomIndex = roomRanges.findIndex(([left, right]) => point.x >= left && point.x <= right);
  if (roomIndex < 0) return false;

  return Math.abs(point.x - columns[roomIndex]) <= 42;
}

function collidesWithFurniture(point: Point): boolean {
  return rooms.some((room) => room.furnishings?.some((item) => {
    const left = item.x * 10;
    const top = item.y * 6;
    const right = left + item.width * 10;
    const bottom = top + item.height * 6;
    return point.x >= left - 12 && point.x <= right + 12 && point.y >= top - 12 && point.y <= bottom + 12;
  }));
}

function getNearestRoom(point: Point): HouseRoom | null {
  return rooms.find((room) => {
    const door = getDoorPosition(room);
    return Math.hypot(point.x - door.x, point.y - door.y) < 53;
  }) ?? null;
}

export default function PortfolioHouse({ onNavigate }: { onNavigate: (page: string) => void }) {
  const [player, setPlayer] = useState<Point>({ x: 87, y: 264 });
  const playerRef = useRef(player);
  const [activeRoom, setActiveRoom] = useState<HouseRoom | null>(null);
  const activeRoomRef = useRef<HouseRoom | null>(null);
  const [answer, setAnswer] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [feedback, setFeedback] = useState('');
  const [ctfSolved, setCtfSolved] = useState(false);
  const [skillsTab, setSkillsTab] = useState<SkillsTab>('skills');
  const [walking, setWalking] = useState(false);
  const walkTimer = useRef<number | null>(null);

  const move = useCallback((dx: number, dy: number) => {
    if (activeRoomRef.current) return;
    const current = playerRef.current;
    const next = { x: current.x + dx * stepSize, y: current.y + dy * stepSize };
    if (!isWalkable(next) || collidesWithFurniture(next)) return;
    playerRef.current = next;
    setPlayer(next);
    setWalking(true);
    if (walkTimer.current !== null) window.clearTimeout(walkTimer.current);
    walkTimer.current = window.setTimeout(() => setWalking(false), 180);
  }, []);

  const nearestRoom = getNearestRoom(player);

  const openRoom = useCallback((room: HouseRoom) => {
    activeRoomRef.current = room;
    setActiveRoom(room);
    setFeedback('');
    setShowHint(false);
    if (room.id === 'skills') setSkillsTab('skills');
  }, []);

  const closeRoom = useCallback(() => {
    activeRoomRef.current = null;
    setActiveRoom(null);
    setAnswer('');
  }, []);

  const interact = useCallback(() => {
    const nearbyRoom = getNearestRoom(playerRef.current);
    if (nearbyRoom) openRoom(nearbyRoom);
  }, [openRoom]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (activeRoomRef.current) {
        if (event.key === 'Escape') closeRoom();
        return;
      }

      if (event.target instanceof HTMLElement && (
        event.target.isContentEditable || event.target.matches('input, textarea, select')
      )) return;

      const key = event.key.toLowerCase();
      const directions: Record<string, Point> = {
        arrowup: { x: 0, y: -1 }, w: { x: 0, y: -1 },
        arrowdown: { x: 0, y: 1 }, s: { x: 0, y: 1 },
        arrowleft: { x: -1, y: 0 }, a: { x: -1, y: 0 },
        arrowright: { x: 1, y: 0 }, d: { x: 1, y: 0 },
      };

      if (directions[key]) {
        event.preventDefault();
        move(directions[key].x, directions[key].y);
      } else if (key === 'enter') {
        event.preventDefault();
        interact();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (walkTimer.current !== null) window.clearTimeout(walkTimer.current);
    };
  }, [closeRoom, interact, move]);

  const submitFlag = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAttempts((current) => current + 1);
    if (answer.trim().toLowerCase() === 'snow{w1nter_is_c0m1n9}'.toLowerCase()) {
      setCtfSolved(true);
      setFeedback('Correct flag. Pharaoh’s challenge complete.');
    } else {
      setFeedback('Not quite. Look closely at the cipher and try again.');
    }
  };

  return (
    <section className="portfolio-house" aria-labelledby="house-title">
      <div className="house-heading">
        <div>
          <p className="house-eyebrow">ZEROACCESS · HOME BASE</p>
          <h3 id="house-title">The Archive House</h3>
        </div>
        <div className="house-status">
          <span className="house-status-light" />
          {ctfSolved ? 'CTF CLEARED' : 'CTF ACTIVE'}
        </div>
      </div>

      <div className="house-stage" aria-label="Top-down house with six rooms">
        <div className="house-wall house-wall-top" />
        <div className="house-wall house-wall-bottom" />
        <div className="egyptian-frieze" aria-hidden="true">𓂀 | 𓋹 | 𓆣 | 𓇳 | 𓏛 | 𓆸 | 𓂀</div>
        <div className="house-hall">
          <div className="hall-rug"><span>AMR KHALED</span><small>HOME · LAB · ARCHIVE</small></div>
          <div className="temple-pillar pillar-left" aria-hidden="true" />
          <div className="temple-pillar pillar-right" aria-hidden="true" />
          <div className="hall-plant plant-left" aria-hidden="true"><i /><i /><i /></div>
          <div className="hall-plant plant-right" aria-hidden="true"><i /><i /><i /></div>
        </div>

        {rooms.filter((room) => room.row !== 'foyer').map((room) => {
          const Icon = room.icon;
          const door = getDoorPosition(room);
          return (
            <div
              key={room.id}
              className={`house-room room-${room.id} room-${room.row}`}
              style={{ left: `${3 + room.column * 32.5}%`, top: room.row === 'top' ? '5%' : '60%' }}
            >
              <div className="room-wall">
                <div className="room-title">
                  <Icon size={15} aria-hidden="true" />
                  <span>{room.name}</span>
                </div>
                <div className="room-cartouche" aria-hidden="true">{room.glyph}</div>
                <div className="room-rug" />
                {room.furnishings?.map((item) => {
                  const FurnitureIcon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="house-furniture"
                      title={item.label}
                      aria-hidden="true"
                      style={{
                        left: `${(item.x - (3 + room.column * 32.5)) / 29 * 100}%`,
                        top: room.row === 'top'
                          ? `${(item.y - 5) / 36 * 100}%`
                          : `${(item.y - 60) / 35 * 100}%`,
                        width: `${item.width / 29 * 100}%`,
                        height: `${item.height / 36 * 100}%`,
                      }}
                    >
                      <FurnitureIcon size={15} />
                      <span>{item.label}</span>
                    </div>
                  );
                })}
                <button
                  type="button"
                  className={`house-door ${room.row === 'top' ? 'door-bottom' : 'door-top'} ${room.id === 'ctf' ? 'door-challenge' : ''}`}
                  style={{ left: `${door.x / 10 - (3 + room.column * 32.5)}%` }}
                  aria-label={`Open ${room.name}`}
                  onClick={() => openRoom(room)}
                >
                  <span />
                </button>
              </div>
            </div>
          );
        })}

        <button
          type="button"
          className={`foyer-door ${nearestRoom?.id === 'profile' ? 'door-nearby' : ''}`}
          aria-label="Open profile in the foyer"
          onClick={() => openRoom(rooms[0])}
        >
          <Home size={15} />
          <span>FOYER</span>
        </button>

        {rooms.filter((room) => room.row !== 'foyer').map((room) => {
          const door = getDoorPosition(room);
          return (
            <div
              key={`${room.id}-label`}
              className={`door-label ${nearestRoom?.id === room.id ? 'door-label-nearby' : ''}`}
              style={{ left: `${door.x / 10}%`, top: `${door.y / 6}%` }}
              aria-hidden="true"
            >
              <span>{room.subtitle}</span>
            </div>
          );
        })}

        <div
          className={`stick-person ${walking ? 'stick-walking' : ''}`}
          style={{ left: `${player.x / 10}%`, top: `${player.y / 6}%` }}
          aria-label="Pharaoh explorer"
        >
          <span className="pharaoh-nemes" />
          <span className="stick-head" />
          <span className="pharaoh-uraeus" />
          <span className="pharaoh-beard" />
          <span className="pharaoh-collar" />
          <span className="stick-body" />
          <span className="stick-arm stick-arm-left" />
          <span className="stick-arm stick-arm-right" />
          <span className="pharaoh-kilt" />
          <span className="pharaoh-staff" />
          <span className="stick-leg stick-leg-left" />
          <span className="stick-leg stick-leg-right" />
        </div>

        {nearestRoom && !activeRoom && (
          <div className="nearby-prompt">
            <span>{nearestRoom.name}</span>
            <kbd>ENTER</kbd>
          </div>
        )}
      </div>

      <div className="house-footer">
        <div className="keyboard-hint"><span>↑</span><span>← ↓ →</span><small>MOVE</small><b>ENTER</b><small>OPEN ROOM</small></div>
        <div className="house-dpad" aria-label="Movement controls">
          <button type="button" aria-label="Move up" onClick={() => move(0, -1)}><ArrowUp size={17} /></button>
          <button type="button" aria-label="Move left" onClick={() => move(-1, 0)}><ArrowLeft size={17} /></button>
          <button type="button" aria-label="Move down" onClick={() => move(0, 1)}><ArrowDown size={17} /></button>
          <button type="button" aria-label="Move right" onClick={() => move(1, 0)}><ArrowRight size={17} /></button>
          <button type="button" className="dpad-enter" onClick={interact} disabled={!nearestRoom}>ENTER</button>
        </div>
      </div>

      {activeRoom && (
        <div className="house-modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && closeRoom()}>
            <section className={`house-modal ${activeRoom.id === 'skills' ? 'skills-modal' : ''}`} role="dialog" aria-modal="true" aria-labelledby="room-modal-title">
            <div className="modal-topline" />
            <button type="button" className="modal-close" onClick={closeRoom} aria-label="Close room"><X size={19} /></button>
            <div className="modal-room-icon"><activeRoom.icon size={23} /></div>
            <p className="house-eyebrow">ARCHIVE HOUSE · {activeRoom.subtitle.toUpperCase()}</p>
            <h2 id="room-modal-title">{activeRoom.name}</h2>
            <p className="modal-description">{activeRoom.description}</p>

            {activeRoom.id === 'skills' ? (
              <div className="skills-content">
                <div className="skills-tabs" role="tablist" aria-label="Skills and education">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={skillsTab === 'skills'}
                    className={skillsTab === 'skills' ? 'active' : ''}
                    onClick={() => setSkillsTab('skills')}
                  >
                    Technical Skills
                  </button>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={skillsTab === 'education'}
                    className={skillsTab === 'education' ? 'active' : ''}
                    onClick={() => setSkillsTab('education')}
                  >
                    Education & Training
                  </button>
                </div>
                {skillsTab === 'skills' ? (
                  <div className="skill-groups">
                    {skillGroups.map((group) => (
                      <article className="skill-group" key={group.name}>
                        <h3>{group.name}</h3>
                        <p>{group.details}</p>
                      </article>
                    ))}
                  </div>
                ) : (
                  <ol className="education-list">
                    {educationItems.map((item) => (
                      <li key={item.title}>
                        <div className="education-entry-heading">
                          <h3>{item.title}</h3>
                          <time>{item.period}</time>
                        </div>
                        <p className="education-organization">{item.organization}</p>
                        <p className="education-details">{item.details}</p>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            ) : activeRoom.id === 'ctf' ? (
              <div className="ctf-panel">
                <div className="ctf-details">
                  {activeRoom.details.map((detail) => <p key={detail}>{detail}</p>)}
                </div>
                <button type="button" className="hint-toggle" onClick={() => setShowHint((visible) => !visible)}>
                  {showHint ? 'Hide hint' : 'Reveal hint'}
                </button>
                {showHint && <blockquote className="ctf-hint">“I move forward, yet stay in place. Through letters, I slowly race. A simple shift, a subtle slide.”</blockquote>}
                <form className="ctf-answer-form" onSubmit={submitFlag}>
                  <label htmlFor="ctf-answer">Your flag</label>
                  <div className="answer-input-row">
                    <input
                      id="ctf-answer"
                      value={answer}
                      onChange={(event) => setAnswer(event.target.value)}
                      placeholder="Snow{...}"
                      autoComplete="off"
                      spellCheck={false}
                      disabled={ctfSolved}
                    />
                    <button type="submit" disabled={ctfSolved || !answer.trim()}>Submit</button>
                  </div>
                </form>
                <div className={`ctf-feedback ${ctfSolved ? 'feedback-success' : ''}`} aria-live="polite">
                  <span>{ctfSolved ? 'SOLVED' : `${attempts} ${attempts === 1 ? 'attempt' : 'attempts'}`}</span>
                  {feedback && <p>{feedback}</p>}
                </div>
              </div>
            ) : (
              <ul className="room-detail-list">
                {activeRoom.details.map((detail) => <li key={detail}>{detail}</li>)}
              </ul>
            )}

            {activeRoom.destination && (
              <button type="button" className="room-destination" onClick={() => onNavigate(activeRoom.destination!)}>
                Explore {activeRoom.name}<ExternalLink size={16} />
              </button>
            )}
            {activeRoom.id !== 'ctf' && <p className="modal-footnote">Press Escape or use the close button to return to the house.</p>}
          </section>
        </div>
      )}
    </section>
  );
}