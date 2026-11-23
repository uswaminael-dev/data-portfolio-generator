/**
 * PortfolioCraft Application Logic
 * Clean, lightweight, student- and developer-focused portfolio generator.
 */

import { renderDeployablePortfolio } from './template/portfolio.js';

// Pre-configured Sample Profiles
const Presets = {
  cs_student: {
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
    twitter: '',
    projects: [
      {
        id: 'p1',
        title: 'StudyFlow — Collaborative Pomodoro & Notes',
        description: 'Real-time collaborative study platform featuring synchronized Pomodoro timers, shared markdown scratchpads, and room chats with WebSockets.',
        tags: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'Tailwind CSS'],
        stars: 28,
        githubUrl: 'https://github.com/octocat/studyflow',
        demoUrl: 'https://studyflow-demo.dev'
      },
      {
        id: 'p2',
        title: 'AlgoViz — Interactive Algorithm Visualizer',
        description: 'Educational web tool animating graph traversal (Dijkstra, A*), pathfinding, and sorting algorithms with step-by-step state inspection.',
        tags: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Algorithms'],
        stars: 45,
        githubUrl: 'https://github.com/octocat/algoviz',
        demoUrl: 'https://algoviz.dev'
      },
      {
        id: 'p3',
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
  },

  web_dev: {
    name: 'David Kim',
    role: 'Full-Stack Software Developer',
    bio: 'Software engineer building performant web applications, modern APIs, and clean user interfaces. Experienced with TypeScript, React, and cloud backends.',
    location: 'Seattle, WA (Remote)',
    status: 'Open to Full-Time Software Engineering Roles',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    email: 'david.kim.dev@gmail.com',
    github: 'https://github.com/octocat',
    linkedin: 'https://linkedin.com/in/octocat',
    website: 'https://davidkim.codes',
    twitter: '',
    projects: [
      {
        id: 'p_dev_1',
        title: 'TaskMatrix — Kanban Project Management App',
        description: 'Trello-style drag-and-drop productivity dashboard with optimistic updates, activity logs, and workspace team sharing.',
        tags: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
        stars: 64,
        githubUrl: 'https://github.com/octocat/taskmatrix',
        demoUrl: 'https://taskmatrix.dev'
      },
      {
        id: 'p_dev_2',
        title: 'PulseChat — Real-Time Messaging Client',
        description: 'End-to-end encrypted messaging service with presence indicators, message threading, file uploads, and reactions.',
        tags: ['React', 'Node.js', 'Supabase', 'WebSockets', 'Zustand'],
        stars: 39,
        githubUrl: 'https://github.com/octocat/pulsechat',
        demoUrl: 'https://pulsechat-demo.dev'
      }
    ],
    skills: {
      languages: ['TypeScript', 'JavaScript', 'Python', 'SQL', 'Bash'],
      frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'Prisma ORM'],
      tools: ['Git', 'Docker', 'PostgreSQL', 'Supabase', 'AWS (S3, Lambda)', 'Vercel', 'Jest']
    },
    education: [
      {
        institution: 'University of Washington',
        degree: 'B.S. in Informatics (Software Development)',
        period: '2020 - 2024',
        details: 'Focus on full-stack web engineering, human-computer interaction, and cloud systems.'
      }
    ],
    achievements: [
      {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2025',
        details: 'Validated expertise in cloud infrastructure, security, and deployment pipelines.'
      }
    ]
  },

  blank: {
    name: '',
    role: '',
    bio: '',
    location: '',
    status: '',
    avatarUrl: '',
    email: '',
    github: '',
    linkedin: '',
    website: '',
    twitter: '',
    projects: [],
    skills: { languages: [], frameworks: [], tools: [] },
    education: [],
    achievements: []
  }
};

class PortfolioApp {
  constructor() {
    this.state = JSON.parse(JSON.stringify(Presets.cs_student));
    this.fetchedRepos = [];
    this.debounceTimer = null;

    this.initElements();
    this.bindEvents();
    this.populateForm();
    this.updatePreview();
  }

  initElements() {
    // Header & Toolbars
    this.presetSelect = document.getElementById('preset-select');
    this.deviceBtns = document.querySelectorAll('.device-btn');
    this.previewWrapper = document.getElementById('preview-wrapper');
    this.previewFrame = document.getElementById('portfolio-preview-frame');
    this.btnExportHtml = document.getElementById('btn-export-html');
    this.btnSaveJson = document.getElementById('btn-save-json');
    this.btnLoadJson = document.getElementById('btn-load-json');
    this.jsonFileInput = document.getElementById('json-file-input');
    this.toastContainer = document.getElementById('toast-container');

    // Tabs
    this.tabBtns = document.querySelectorAll('.editor-tab');
    this.tabPanes = document.querySelectorAll('.tab-pane');

    // GitHub Ingestion
    this.ghUsernameInput = document.getElementById('gh-username');
    this.btnSyncGh = document.getElementById('btn-sync-gh');
    this.ghProfilePreview = document.getElementById('gh-profile-preview');
    this.ghReposList = document.getElementById('gh-repos-list');
    this.repoCountBadge = document.getElementById('repo-count-badge');

    // Projects
    this.projectsEditorList = document.getElementById('projects-editor-list');
    this.btnAddCustomProject = document.getElementById('btn-add-custom-project');

    // Education & Achievements
    this.educationEditorList = document.getElementById('education-editor-list');
    this.btnAddEducation = document.getElementById('btn-add-education');
    this.achievementsEditorList = document.getElementById('achievements-editor-list');
    this.btnAddAchievement = document.getElementById('btn-add-achievement');

    // Profile Inputs
    this.profileInputs = {
      name: document.getElementById('inp-name'),
      role: document.getElementById('inp-role'),
      bio: document.getElementById('inp-bio'),
      location: document.getElementById('inp-location'),
      status: document.getElementById('inp-status'),
      avatarUrl: document.getElementById('inp-avatar'),
      email: document.getElementById('inp-email'),
      github: document.getElementById('inp-github'),
      linkedin: document.getElementById('inp-linkedin'),
      website: document.getElementById('inp-website'),
      twitter: document.getElementById('inp-twitter')
    };

    // Skills Inputs
    this.skillsInputs = {
      languages: document.getElementById('inp-skills-languages'),
      frameworks: document.getElementById('inp-skills-frameworks'),
      tools: document.getElementById('inp-skills-tools')
    };
  }

  bindEvents() {
    // Tab switching
    this.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.tabBtns.forEach(b => b.classList.remove('active'));
        this.tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const pane = document.getElementById(`tab-${btn.dataset.tab}`);
        if (pane) pane.classList.add('active');
      });
    });

    // Preset changing
    this.presetSelect.addEventListener('change', (e) => {
      const presetKey = e.target.value;
      this.state = JSON.parse(JSON.stringify(Presets[presetKey] || Presets.cs_student));
      this.populateForm();
      this.updatePreview();
      this.showToast(`Loaded ${this.state.name || 'blank'} profile`);
    });

    // Device switcher
    this.deviceBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.deviceBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const dev = btn.dataset.device;
        this.previewWrapper.className = `preview-wrapper device-${dev}`;
      });
    });

    // GitHub Sync
    this.btnSyncGh.addEventListener('click', () => this.handleGitHubSync());
    this.ghUsernameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.handleGitHubSync();
    });

    // Profile inputs live binding
    for (const [key, el] of Object.entries(this.profileInputs)) {
      if (el) {
        el.addEventListener('input', (e) => {
          this.state[key] = e.target.value;
          this.debouncePreview();
        });
      }
    }

    // Skills inputs live binding
    for (const [key, el] of Object.entries(this.skillsInputs)) {
      if (el) {
        el.addEventListener('input', (e) => {
          this.state.skills[key] = e.target.value
            .split(',')
            .map(s => s.trim())
            .filter(Boolean);
          this.debouncePreview();
        });
      }
    }

    // Add Custom Project button
    this.btnAddCustomProject.addEventListener('click', () => {
      const newProj = {
        id: `custom_${Date.now()}`,
        title: 'New Featured Project',
        description: 'A brief description of the problem solved, architecture used, and results achieved.',
        tags: ['React', 'TypeScript', 'Node.js'],
        stars: 0,
        githubUrl: 'https://github.com',
        demoUrl: ''
      };
      this.state.projects.unshift(newProj);
      this.renderProjectsEditor();
      this.updatePreview();
      this.showToast('New project card added');
    });

    // Add Education button
    this.btnAddEducation.addEventListener('click', () => {
      this.state.education.push({
        institution: 'University Name',
        degree: 'B.S. in Computer Science',
        period: '2024 - 2028',
        details: 'Relevant coursework and activities.'
      });
      this.renderEducationEditor();
      this.updatePreview();
    });

    // Add Achievement button
    this.btnAddAchievement.addEventListener('click', () => {
      this.state.achievements.push({
        title: 'Hackathon Award / Certification',
        issuer: 'Organization / Issuer',
        date: '2026',
        details: 'Short detail about the achievement.'
      });
      this.renderAchievementsEditor();
      this.updatePreview();
    });

    // Export HTML
    this.btnExportHtml.addEventListener('click', () => this.exportStandaloneHtml());

    // Save JSON
    this.btnSaveJson.addEventListener('click', () => this.saveJsonDraft());

    // Load JSON
    this.btnLoadJson.addEventListener('click', () => this.jsonFileInput.click());
    this.jsonFileInput.addEventListener('change', (e) => this.loadJsonDraft(e));
  }

  /**
   * Populate all form fields from current this.state
   */
  populateForm() {
    // Profile
    for (const [key, el] of Object.entries(this.profileInputs)) {
      if (el) el.value = this.state[key] || '';
    }

    // Skills
    if (this.skillsInputs.languages) {
      this.skillsInputs.languages.value = (this.state.skills?.languages || []).join(', ');
    }
    if (this.skillsInputs.frameworks) {
      this.skillsInputs.frameworks.value = (this.state.skills?.frameworks || []).join(', ');
    }
    if (this.skillsInputs.tools) {
      this.skillsInputs.tools.value = (this.state.skills?.tools || []).join(', ');
    }

    // Projects, Education, Achievements
    this.renderProjectsEditor();
    this.renderEducationEditor();
    this.renderAchievementsEditor();
  }

  /**
   * Fetch from GitHub API and render repos selection checklist
   */
  async handleGitHubSync() {
    const username = this.ghUsernameInput.value.trim();
    if (!username) {
      this.showToast('Please enter a GitHub username', true);
      return;
    }

    this.btnSyncGh.disabled = true;
    this.btnSyncGh.textContent = 'Syncing...';

    try {
      // 1. Fetch user profile via server API endpoint
      const userRes = await fetch(`/api/github/users/${encodeURIComponent(username)}`);
      if (!userRes.ok) {
        if (userRes.status === 404) throw new Error(`User "${username}" not found on GitHub.`);
        if (userRes.status === 403) throw new Error(`GitHub rate limit exceeded. Please try again later.`);
        const errData = await userRes.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || `GitHub API error (${userRes.status}): ${userRes.statusText}`);
      }
      const user = await userRes.json();

      // Auto-fill profile details if blank or requested
      if (!this.state.name) this.state.name = user.name || user.login;
      if (!this.state.bio) this.state.bio = user.bio || '';
      if (!this.state.avatarUrl) this.state.avatarUrl = user.avatar_url;
      if (!this.state.location) this.state.location = user.location || '';
      this.state.github = `https://github.com/${user.login}`;

      // Update form inputs
      this.populateForm();

      // Show profile card in tab 1
      this.ghProfilePreview.style.display = 'flex';
      this.ghProfilePreview.innerHTML = `
        <img src="${user.avatar_url}" class="gh-profile-avatar" alt="${user.login}">
        <div>
          <div class="gh-profile-name">${user.name || user.login} (@${user.login})</div>
          <div class="gh-profile-bio">${user.bio || 'Public GitHub Developer'}</div>
          <div style="font-size: 0.72rem; color: var(--studio-text-dim); margin-top: 0.25rem;">
            ${user.public_repos} public repos • ${user.followers} followers
          </div>
        </div>
      `;

      // 2. Fetch public repos via server API endpoint
      const reposRes = await fetch(`/api/github/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`);
      if (!reposRes.ok) {
        const errData = await reposRes.json().catch(() => ({}));
        throw new Error(errData.error || errData.message || `Could not fetch public repositories (${reposRes.status}).`);
      }
      const rawRepos = await reposRes.json();

      this.fetchedRepos = rawRepos.map(r => ({
        id: String(r.id),
        name: r.name,
        description: r.description || 'Public open-source repository on GitHub.',
        language: r.language || 'Code',
        stars: r.stargazers_count,
        forks: r.forks_count,
        htmlUrl: r.html_url,
        homepage: r.homepage || ''
      }));

      // Sort by stars descending
      this.fetchedRepos.sort((a, b) => b.stars - a.stars);

      this.repoCountBadge.textContent = `${this.fetchedRepos.length} repos found`;
      this.renderReposChecklist();
      this.updatePreview();
      this.showToast(`Found ${this.fetchedRepos.length} repositories for ${username}!`);
    } catch (err) {
      this.showToast(err.message, true);
    } finally {
      this.btnSyncGh.disabled = false;
      this.btnSyncGh.textContent = 'Sync GitHub';
    }
  }

  /**
   * Render Checkbox list of GitHub repositories
   */
  renderReposChecklist() {
    if (this.fetchedRepos.length === 0) {
      this.ghReposList.innerHTML = `<div class="empty-state">No repositories found.</div>`;
      return;
    }

    const currentProjectTitles = new Set(this.state.projects.map(p => p.title.toLowerCase()));

    this.ghReposList.innerHTML = this.fetchedRepos.map(repo => {
      const isChecked = currentProjectTitles.has(repo.name.toLowerCase());
      return `
        <label class="repo-item-row ${isChecked ? 'selected' : ''}" data-repoid="${repo.id}">
          <input type="checkbox" class="repo-checkbox" data-repoid="${repo.id}" ${isChecked ? 'checked' : ''}>
          <div class="repo-item-info">
            <div class="repo-item-title">
              <span>${repo.name}</span>
              ${repo.stars > 0 ? `<span style="color: #fbbf24; font-size: 0.72rem;">★ ${repo.stars}</span>` : ''}
            </div>
            <div class="repo-item-desc">${repo.description}</div>
            <div class="repo-item-meta">
              <span>${repo.language}</span>
              <span>Updated recently</span>
            </div>
          </div>
        </label>
      `;
    }).join('');

    // Bind checkboxes
    this.ghReposList.querySelectorAll('.repo-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const repoId = e.target.dataset.repoid;
        const repo = this.fetchedRepos.find(r => r.id === repoId);
        const row = e.target.closest('.repo-item-row');

        if (e.target.checked) {
          row.classList.add('selected');
          // Add to projects if not already there
          if (!this.state.projects.some(p => p.title.toLowerCase() === repo.name.toLowerCase())) {
            this.state.projects.unshift({
              id: `gh_${repo.id}`,
              title: repo.name,
              description: repo.description,
              tags: [repo.language, 'Open Source'],
              stars: repo.stars,
              githubUrl: repo.htmlUrl,
              demoUrl: repo.homepage
            });
            this.renderProjectsEditor();
            this.updatePreview();
            this.showToast(`Added "${repo.name}" to projects!`);
          }
        } else {
          row.classList.remove('selected');
          // Remove from projects
          this.state.projects = this.state.projects.filter(p => p.title.toLowerCase() !== repo.name.toLowerCase());
          this.renderProjectsEditor();
          this.updatePreview();
          this.showToast(`Removed "${repo.name}" from projects`);
        }
      });
    });
  }

  /**
   * Render Projects in Tab 3 (Editable Cards)
   */
  renderProjectsEditor() {
    if (!this.projectsEditorList) return;

    if (this.state.projects.length === 0) {
      this.projectsEditorList.innerHTML = `
        <div class="empty-state">
          No projects added yet. Sync your GitHub repos in Tab 1 or click <strong>+ Add Project</strong> above.
        </div>`;
      return;
    }

    this.projectsEditorList.innerHTML = this.state.projects.map((p, idx) => `
      <div class="project-card-edit" data-idx="${idx}">
        <div class="project-card-header">
          <span class="project-card-num">Project #${idx + 1}</span>
          <button class="btn-remove-item btn-del-proj" data-idx="${idx}">✕ Remove</button>
        </div>

        <div class="form-group">
          <label class="form-label">Project Title</label>
          <input type="text" class="form-input p-inp-title" data-idx="${idx}" value="${p.title || ''}">
        </div>

        <div class="form-group">
          <label class="form-label">Description / Problem Solved</label>
          <textarea class="form-textarea p-inp-desc" data-idx="${idx}">${p.description || ''}</textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Tech Stack Tags (Comma separated)</label>
          <input type="text" class="form-input p-inp-tags" data-idx="${idx}" value="${(p.tags || []).join(', ')}">
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">GitHub URL</label>
            <input type="text" class="form-input p-inp-gh" data-idx="${idx}" value="${p.githubUrl || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Live Demo URL</label>
            <input type="text" class="form-input p-inp-demo" data-idx="${idx}" value="${p.demoUrl || ''}">
          </div>
        </div>
      </div>
    `).join('');

    // Bind project editor inputs
    this.projectsEditorList.querySelectorAll('.p-inp-title').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.projects[e.target.dataset.idx].title = e.target.value;
        this.debouncePreview();
      });
    });
    this.projectsEditorList.querySelectorAll('.p-inp-desc').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.projects[e.target.dataset.idx].description = e.target.value;
        this.debouncePreview();
      });
    });
    this.projectsEditorList.querySelectorAll('.p-inp-tags').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.projects[e.target.dataset.idx].tags = e.target.value
          .split(',')
          .map(s => s.trim())
          .filter(Boolean);
        this.debouncePreview();
      });
    });
    this.projectsEditorList.querySelectorAll('.p-inp-gh').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.projects[e.target.dataset.idx].githubUrl = e.target.value;
        this.debouncePreview();
      });
    });
    this.projectsEditorList.querySelectorAll('.p-inp-demo').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.projects[e.target.dataset.idx].demoUrl = e.target.value;
        this.debouncePreview();
      });
    });
    this.projectsEditorList.querySelectorAll('.btn-del-proj').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        this.state.projects.splice(i, 1);
        this.renderProjectsEditor();
        this.renderReposChecklist();
        this.updatePreview();
      });
    });
  }

  /**
   * Render Education in Tab 5
   */
  renderEducationEditor() {
    if (!this.educationEditorList) return;

    this.educationEditorList.innerHTML = (this.state.education || []).map((edu, idx) => `
      <div class="project-card-edit">
        <div class="project-card-header">
          <span class="project-card-num">Education #${idx + 1}</span>
          <button class="btn-remove-item btn-del-edu" data-idx="${idx}">✕ Remove</button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">School / University</label>
            <input type="text" class="form-input edu-inp-inst" data-idx="${idx}" value="${edu.institution || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Degree & Major</label>
            <input type="text" class="form-input edu-inp-deg" data-idx="${idx}" value="${edu.degree || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Years / Graduation</label>
            <input type="text" class="form-input edu-inp-period" data-idx="${idx}" value="${edu.period || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Coursework / GPA Details</label>
            <input type="text" class="form-input edu-inp-details" data-idx="${idx}" value="${edu.details || ''}">
          </div>
        </div>
      </div>
    `).join('');

    this.educationEditorList.querySelectorAll('.edu-inp-inst').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.education[e.target.dataset.idx].institution = e.target.value;
        this.debouncePreview();
      });
    });
    this.educationEditorList.querySelectorAll('.edu-inp-deg').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.education[e.target.dataset.idx].degree = e.target.value;
        this.debouncePreview();
      });
    });
    this.educationEditorList.querySelectorAll('.edu-inp-period').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.education[e.target.dataset.idx].period = e.target.value;
        this.debouncePreview();
      });
    });
    this.educationEditorList.querySelectorAll('.edu-inp-details').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.education[e.target.dataset.idx].details = e.target.value;
        this.debouncePreview();
      });
    });
    this.educationEditorList.querySelectorAll('.btn-del-edu').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        this.state.education.splice(i, 1);
        this.renderEducationEditor();
        this.updatePreview();
      });
    });
  }

  /**
   * Render Achievements in Tab 5
   */
  renderAchievementsEditor() {
    if (!this.achievementsEditorList) return;

    this.achievementsEditorList.innerHTML = (this.state.achievements || []).map((ach, idx) => `
      <div class="project-card-edit">
        <div class="project-card-header">
          <span class="project-card-num">Achievement #${idx + 1}</span>
          <button class="btn-remove-item btn-del-ach" data-idx="${idx}">✕ Remove</button>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Award / Honor Title</label>
            <input type="text" class="form-input ach-inp-title" data-idx="${idx}" value="${ach.title || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Issuer / Organization</label>
            <input type="text" class="form-input ach-inp-issuer" data-idx="${idx}" value="${ach.issuer || ''}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date / Year</label>
            <input type="text" class="form-input ach-inp-date" data-idx="${idx}" value="${ach.date || ''}">
          </div>
          <div class="form-group">
            <label class="form-label">Details</label>
            <input type="text" class="form-input ach-inp-details" data-idx="${idx}" value="${ach.details || ''}">
          </div>
        </div>
      </div>
    `).join('');

    this.achievementsEditorList.querySelectorAll('.ach-inp-title').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.achievements[e.target.dataset.idx].title = e.target.value;
        this.debouncePreview();
      });
    });
    this.achievementsEditorList.querySelectorAll('.ach-inp-issuer').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.achievements[e.target.dataset.idx].issuer = e.target.value;
        this.debouncePreview();
      });
    });
    this.achievementsEditorList.querySelectorAll('.ach-inp-date').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.achievements[e.target.dataset.idx].date = e.target.value;
        this.debouncePreview();
      });
    });
    this.achievementsEditorList.querySelectorAll('.ach-inp-details').forEach(inp => {
      inp.addEventListener('input', (e) => {
        this.state.achievements[e.target.dataset.idx].details = e.target.value;
        this.debouncePreview();
      });
    });
    this.achievementsEditorList.querySelectorAll('.btn-del-ach').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const i = parseInt(e.target.dataset.idx, 10);
        this.state.achievements.splice(i, 1);
        this.renderAchievementsEditor();
        this.updatePreview();
      });
    });
  }

  /**
   * Debounced Preview Update
   */
  debouncePreview() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.updatePreview(), 150);
  }

  /**
   * Update the live preview iframe with the single deployable template
   */
  updatePreview() {
    const html = renderDeployablePortfolio(this.state);
    this.previewFrame.srcdoc = html;
  }

  /**
   * Export Standalone deployable index.html
   */
  exportStandaloneHtml() {
    const html = renderDeployablePortfolio(this.state);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Downloaded deployable index.html! Ready for GitHub Pages.');
  }

  /**
   * Save draft JSON
   */
  saveJsonDraft() {
    const jsonStr = JSON.stringify(this.state, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cleanName = (this.state.name || 'portfolio').toLowerCase().replace(/\s+/g, '_');
    a.download = `${cleanName}_portfolio.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    this.showToast('Saved portfolio draft JSON!');
  }

  /**
   * Load draft JSON
   */
  loadJsonDraft(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (!imported.name && !imported.projects) throw new Error('Invalid portfolio schema');
        this.state = imported;
        this.populateForm();
        this.updatePreview();
        this.showToast('Loaded portfolio draft successfully!');
      } catch (err) {
        this.showToast('Error loading JSON: ' + err.message, true);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  }

  /**
   * Show notification toast
   */
  showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) toast.style.borderColor = 'var(--studio-danger)';
    toast.innerHTML = `
      <span>${isError ? '⚠️' : '✓'}</span>
      <span>${message}</span>
    `;
    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.2s ease';
      setTimeout(() => toast.remove(), 200);
    }, 2800);
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioApp = new PortfolioApp();
});
