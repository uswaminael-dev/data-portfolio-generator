/**
 * Generates sample exported standalone portfolio HTML files
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { renderDeployablePortfolio } from './public/template/portfolio.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const csStudentSample = {
  name: 'Maya Lin',
  role: 'Computer Science Student @ UC Berkeley',
  bio: 'Junior CS student passionate about systems programming, distributed algorithms, and web applications. Looking for Summer 2027 Software Engineering internships.',
  location: 'Berkeley, CA (Open to Relocation)',
  status: 'Seeking Summer 2027 SWE Internships',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  email: 'maya.lin@berkeley.edu',
  github: 'https://github.com/octocat',
  linkedin: 'https://linkedin.com/in/octocat',
  website: 'https://mayalin.dev',
  projects: [
    {
      title: 'StudyFlow — Collaborative Pomodoro & Notes',
      description: 'Real-time collaborative study platform featuring synchronized Pomodoro timers, shared markdown scratchpads, and room chats with WebSockets.',
      tags: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'Tailwind CSS'],
      stars: 28,
      githubUrl: 'https://github.com/octocat/studyflow',
      demoUrl: 'https://studyflow-demo.dev'
    },
    {
      title: 'AlgoViz — Interactive Algorithm Visualizer',
      description: 'Educational web tool animating graph traversal (Dijkstra, A*), pathfinding, and sorting algorithms with step-by-step state inspection.',
      tags: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Algorithms'],
      stars: 45,
      githubUrl: 'https://github.com/octocat/algoviz',
      demoUrl: 'https://algoviz.dev'
    },
    {
      title: 'Pintos OS Kernel Improvements',
      description: 'Implemented priority scheduling, multi-level feedback queue (MLFQ), user program syscalls, and virtual memory page fault handling in C.',
      tags: ['C', 'x86 Assembly', 'Operating Systems', 'GDB'],
      stars: 12,
      githubUrl: 'https://github.com/octocat/pintos-kernel',
      demoUrl: ''
    }
  ],
  skills: {
    languages: ['Python', 'Java', 'C/C++', 'JavaScript', 'TypeScript', 'SQL', 'HTML/CSS'],
    frameworks: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'Flask', 'Next.js'],
    tools: ['Git', 'GitHub', 'Linux', 'Docker', 'GDB', 'Postman', 'VS Code', 'Vercel']
  },
  education: [
    {
      institution: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      period: '2024 - 2028',
      details: 'GPA: 3.85 / 4.0. Coursework: Data Structures & Algorithms, Computer Architecture, Operating Systems, Database Design.'
    }
  ],
  achievements: [
    {
      title: 'CalHacks 11.0 — Best Developer Tool Track Winner',
      issuer: 'CalHacks',
      date: 'Oct 2026',
      details: 'Built an open-source IDE extension automating code review comments with 500+ student users.'
    },
    {
      title: "Dean's Honors List",
      issuer: 'UC Berkeley College of Letters & Science',
      date: '2024 - 2026',
      details: 'Recognized for top academic achievement across 4 consecutive semesters.'
    }
  ]
};

const html = renderDeployablePortfolio(csStudentSample);
fs.writeFileSync(path.join(__dirname, 'sample-portfolio.html'), html);
console.log('✅ Generated sample-portfolio.html successfully!');
