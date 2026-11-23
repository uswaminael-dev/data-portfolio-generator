/**
 * Single Deployable Portfolio Template
 * Designed for students and developers: modern, minimal, premium, responsive, and self-contained.
 */

export function renderDeployablePortfolio(state) {
  const name = escapeHtml(state.name || 'Your Name');
  const role = escapeHtml(state.role || 'Software Developer & Student');
  const bio = escapeHtml(state.bio || 'Passionate about building impactful software, learning modern technologies, and solving real-world problems.');
  const location = escapeHtml(state.location || '');
  const status = escapeHtml(state.status || 'Open to Opportunities');
  const avatarUrl = escapeHtml(state.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80');

  const email = escapeHtml(state.email || '');
  const github = escapeHtml(state.github || '');
  const linkedin = escapeHtml(state.linkedin || '');
  const twitter = escapeHtml(state.twitter || '');
  const website = escapeHtml(state.website || '');

  const projects = state.projects || [];
  const skills = state.skills || { languages: [], frameworks: [], tools: [] };
  const education = state.education || [];
  const achievements = state.achievements || [];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name} — Portfolio</title>
  <meta name="description" content="${bio}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg: #090a0f;
      --surface: #111520;
      --surface-hover: #151b2a;
      --border: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(59, 130, 246, 0.4);
      --text: #f9fafb;
      --text-muted: #9ca3af;
      --text-dim: #6b7280;
      --primary: #3b82f6;
      --primary-hover: #2563eb;
      --primary-light: rgba(59, 130, 246, 0.1);
      --badge-bg: rgba(255, 255, 255, 0.04);
      --badge-border: rgba(255, 255, 255, 0.07);
      --card-radius: 12px;
      --font-sans: 'Plus Jakarta Sans', 'Inter', -apple-system, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }

    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      background-color: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      padding-bottom: 5rem;
    }

    .container {
      max-width: 920px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Top Navigation */
    .nav {
      position: sticky;
      top: 0;
      z-index: 40;
      background: rgba(9, 10, 15, 0.85);
      backdrop-filter: blur(16px) saturate(180%);
      border-bottom: 1px solid var(--border);
      padding: 0.85rem 0;
    }
    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: -0.02em;
      color: var(--text);
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--primary);
      box-shadow: 0 0 8px var(--primary);
    }
    .nav-links {
      display: flex;
      gap: 1.25rem;
      align-items: center;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 500;
      transition: color 0.15s ease;
    }
    .nav-links a:hover {
      color: var(--text);
    }
    .btn-contact {
      background: var(--primary);
      color: #fff;
      padding: 0.38rem 0.85rem;
      border-radius: 6px;
      font-size: 0.78rem;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.15s ease;
      box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3);
    }
    .btn-contact:hover {
      background: var(--primary-hover);
      transform: translateY(-0.5px);
    }

    /* Hero Section */
    .hero {
      padding: 4.5rem 0 3.5rem;
    }
    .hero-content {
      display: flex;
      gap: 2.5rem;
      align-items: center;
    }
    .hero-avatar {
      width: 130px;
      height: 130px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid rgba(255, 255, 255, 0.1);
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
      flex-shrink: 0;
    }
    .hero-text {
      flex-grow: 1;
    }
    .status-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.45rem;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      background: var(--primary-light);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.25);
      font-size: 0.72rem;
      font-weight: 600;
      margin-bottom: 0.85rem;
      letter-spacing: 0.01em;
    }
    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      box-shadow: 0 0 8px #10b981;
      animation: pulseDot 2s infinite;
    }
    @keyframes pulseDot {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.5; transform: scale(1.15); }
      100% { opacity: 1; transform: scale(1); }
    }

    .hero-name {
      font-size: 2.35rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 0.35rem;
      color: var(--text);
    }
    .hero-role {
      font-size: 1.08rem;
      font-weight: 500;
      color: #60a5fa;
      margin-bottom: 0.85rem;
      letter-spacing: -0.01em;
    }
    .hero-bio {
      color: var(--text-muted);
      font-size: 0.92rem;
      line-height: 1.6;
      max-width: 600px;
      margin-bottom: 1.25rem;
    }
    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.65rem;
      align-items: center;
    }
    .social-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.35rem 0.75rem;
      border-radius: 6px;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-muted);
      font-size: 0.78rem;
      font-weight: 500;
      text-decoration: none;
      transition: all 0.15s ease;
    }
    .social-btn:hover {
      background: var(--surface-hover);
      border-color: rgba(255, 255, 255, 0.2);
      color: var(--text);
      transform: translateY(-0.5px);
    }

    /* Section Styles */
    .section {
      padding: 3.25rem 0 1.5rem;
      border-top: 1px solid var(--border);
    }
    .section-title {
      font-size: 1.35rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 0.25rem;
      color: var(--text);
    }
    .section-desc {
      color: var(--text-dim);
      font-size: 0.84rem;
      margin-bottom: 1.75rem;
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 1.25rem;
    }
    .project-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--card-radius);
      padding: 1.4rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
    }
    .project-card:hover {
      transform: translateY(-2px);
      border-color: var(--border-accent);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.35);
    }
    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 0.65rem;
      gap: 0.5rem;
    }
    .project-title {
      font-size: 1.02rem;
      font-weight: 700;
      color: var(--text);
      letter-spacing: -0.01em;
      line-height: 1.35;
    }
    .stars-badge {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.7rem;
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.2);
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      font-weight: 600;
      white-space: nowrap;
    }
    .project-desc {
      color: var(--text-muted);
      font-size: 0.84rem;
      line-height: 1.5;
      margin-bottom: 1.15rem;
      flex-grow: 1;
    }
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      margin-bottom: 1.15rem;
    }
    .tag {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      background: var(--badge-bg);
      border: 1px solid var(--badge-border);
      color: var(--text-muted);
      padding: 0.2rem 0.45rem;
      border-radius: 4px;
    }
    .project-links {
      display: flex;
      gap: 0.85rem;
      border-top: 1px solid var(--border);
      padding-top: 0.85rem;
    }
    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.78rem;
      font-weight: 600;
      color: #60a5fa;
      text-decoration: none;
      transition: color 0.15s ease;
    }
    .project-link:hover {
      color: #93c5fd;
    }

    /* Skills Grid */
    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
    }
    .skills-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--card-radius);
      padding: 1.35rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
    }
    .skills-card-title {
      font-size: 0.88rem;
      font-weight: 700;
      margin-bottom: 0.85rem;
      display: flex;
      align-items: center;
      gap: 0.45rem;
      color: var(--text);
    }
    .skills-card-title span.dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--primary);
    }
    .skills-tags-wrap {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }
    .skill-pill {
      background: var(--badge-bg);
      border: 1px solid var(--badge-border);
      border-radius: 6px;
      padding: 0.3rem 0.6rem;
      font-size: 0.76rem;
      color: var(--text-muted);
      font-weight: 500;
    }

    /* Education & Achievements */
    .two-col-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
    .timeline-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--card-radius);
      padding: 1.5rem;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.25);
    }
    .timeline-item {
      margin-bottom: 1.25rem;
      position: relative;
    }
    .timeline-item:last-child {
      margin-bottom: 0;
    }
    .item-title {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text);
    }
    .item-subtitle {
      font-size: 0.82rem;
      color: #60a5fa;
      font-weight: 600;
      margin-top: 0.1rem;
      margin-bottom: 0.15rem;
    }
    .item-meta {
      font-size: 0.74rem;
      color: var(--text-dim);
      margin-bottom: 0.35rem;
    }
    .item-desc {
      font-size: 0.8rem;
      color: var(--text-muted);
      line-height: 1.45;
    }

    /* Footer */
    .footer {
      border-top: 1px solid var(--border);
      padding: 2.5rem 0 1rem;
      margin-top: 3.5rem;
      text-align: center;
      color: var(--text-dim);
      font-size: 0.78rem;
    }

    @media (max-width: 768px) {
      .hero-content {
        flex-direction: column;
        text-align: center;
      }
      .hero-name { font-size: 1.95rem; }
      .hero-meta { justify-content: center; }
      .two-col-grid { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>

  <!-- Navigation -->
  <nav class="nav">
    <div class="container nav-inner">
      <a href="#" class="brand">
        <span class="brand-dot"></span>
        <span>${name}</span>
      </a>
      <div class="nav-links">
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#education">Education</a>
        ${email ? `<a href="mailto:${email}" class="btn-contact">Contact</a>` : ''}
      </div>
    </div>
  </nav>

  <main class="container">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <img src="${avatarUrl}" alt="${name}" class="hero-avatar">
        <div class="hero-text">
          ${status ? `
          <div class="status-badge">
            <span class="status-dot"></span>
            <span>${status}</span>
          </div>` : ''}
          <h1 class="hero-name">${name}</h1>
          <h2 class="hero-role">${role}</h2>
          <p class="hero-bio">${bio}</p>

          <div class="hero-meta">
            ${location ? `
            <span class="social-btn" style="cursor: default;">
              📍 ${location}
            </span>` : ''}
            ${github ? `
            <a href="${github}" target="_blank" rel="noreferrer" class="social-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              GitHub
            </a>` : ''}
            ${linkedin ? `
            <a href="${linkedin}" target="_blank" rel="noreferrer" class="social-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              LinkedIn
            </a>` : ''}
            ${twitter ? `
            <a href="${twitter}" target="_blank" rel="noreferrer" class="social-btn">
              Twitter / X
            </a>` : ''}
            ${website ? `
            <a href="${website}" target="_blank" rel="noreferrer" class="social-btn">
              🌐 Website
            </a>` : ''}
            ${email ? `
            <a href="mailto:${email}" class="social-btn">
              ✉️ Email
            </a>` : ''}
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects" class="section">
      <h3 class="section-title">Featured Projects</h3>
      <p class="section-desc">Selected open source, academic, and personal projects.</p>

      <div class="projects-grid">
        ${projects.length > 0 ? projects.map(p => `
          <div class="project-card">
            <div>
              <div class="project-header">
                <h4 class="project-title">${escapeHtml(p.title)}</h4>
                ${p.stars ? `<span class="stars-badge">★ ${p.stars}</span>` : ''}
              </div>
              <p class="project-desc">${escapeHtml(p.description)}</p>
            </div>
            <div>
              ${p.tags && p.tags.length > 0 ? `
              <div class="project-tags">
                ${p.tags.map(t => `<span class="tag">${escapeHtml(t)}</span>`).join('')}
              </div>` : ''}
              <div class="project-links">
                ${p.githubUrl ? `
                <a href="${escapeHtml(p.githubUrl)}" target="_blank" rel="noreferrer" class="project-link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  Source Code
                </a>` : ''}
                ${p.demoUrl ? `
                <a href="${escapeHtml(p.demoUrl)}" target="_blank" rel="noreferrer" class="project-link">
                  ↗ Live Demo
                </a>` : ''}
              </div>
            </div>
          </div>
        `).join('') : '<p style="color: var(--text-dim); font-size: 0.85rem;">No projects added yet.</p>'}
      </div>
    </section>

    <!-- Skills Section -->
    <section id="skills" class="section">
      <h3 class="section-title">Technical Skills</h3>
      <p class="section-desc">Languages, libraries, frameworks, and developer tools.</p>

      <div class="skills-grid">
        ${renderSkillsCategory('Languages', skills.languages || [])}
        ${renderSkillsCategory('Frameworks & Libraries', skills.frameworks || [])}
        ${renderSkillsCategory('Tools & Platforms', skills.tools || [])}
      </div>
    </section>

    <!-- Education & Achievements -->
    <section id="education" class="section">
      <div class="two-col-grid">
        <!-- Education Column -->
        <div class="timeline-card">
          <h3 class="section-title" style="font-size: 1.1rem; margin-bottom: 1.15rem;">🎓 Education</h3>
          ${education.length > 0 ? education.map(edu => `
            <div class="timeline-item">
              <div class="item-title">${escapeHtml(edu.degree)}</div>
              <div class="item-subtitle">${escapeHtml(edu.institution)}</div>
              <div class="item-meta">${escapeHtml(edu.period || '')}</div>
              ${edu.details ? `<div class="item-desc">${escapeHtml(edu.details)}</div>` : ''}
            </div>
          `).join('') : '<p style="color: var(--text-dim); font-size: 0.82rem;">No education entries added yet.</p>'}
        </div>

        <!-- Achievements Column -->
        <div class="timeline-card">
          <h3 class="section-title" style="font-size: 1.1rem; margin-bottom: 1.15rem;">🏆 Achievements & Awards</h3>
          ${achievements.length > 0 ? achievements.map(ach => `
            <div class="timeline-item">
              <div class="item-title">${escapeHtml(ach.title)}</div>
              <div class="item-subtitle">${escapeHtml(ach.issuer || '')}</div>
              <div class="item-meta">${escapeHtml(ach.date || '')}</div>
              ${ach.details ? `<div class="item-desc">${escapeHtml(ach.details)}</div>` : ''}
            </div>
          `).join('') : '<p style="color: var(--text-dim); font-size: 0.82rem;">No achievements added yet.</p>'}
        </div>
      </div>
    </section>
  </main>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <p>© ${new Date().getFullYear()} ${name}. Built with PortfolioCraft.</p>
    </div>
  </footer>

</body>
</html>`;
}

function renderSkillsCategory(categoryTitle, skillList) {
  if (!skillList || skillList.length === 0) return '';
  return `
    <div class="skills-card">
      <h4 class="skills-card-title">
        <span class="dot"></span>
        <span>${escapeHtml(categoryTitle)}</span>
      </h4>
      <div class="skills-tags-wrap">
        ${skillList.map(s => `<span class="skill-pill">${escapeHtml(s)}</span>`).join('')}
      </div>
    </div>
  `;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
