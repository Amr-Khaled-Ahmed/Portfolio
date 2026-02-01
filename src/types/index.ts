export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'web-dev' | 'cyber' | 'malware' | 'offensive';
  tech_stack: string[];
  image_url: string;
  project_url?: string;
  github_url?: string;
  featured: boolean;
  created_at: string;
}

export interface Writeup {
  id: string;
  title: string;
  description: string;
  category: 'malware' | 'ctf' | 'bug-bounty' | 'research';
  content_url: string;
  tags: string[];
  published_date: string;
  featured: boolean;
  created_at: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issue_date: string;
  credential_url?: string;
  image_url?: string;
  description?: string;
  created_at: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}
