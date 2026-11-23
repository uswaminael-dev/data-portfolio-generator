/**
 * Multi-Format Export Engine
 * Generates standalone zero-dependency HTML portfolios, GitHub Profile READMEs, and JSON backups.
 */

import { Themes, getThemeCssRule } from './themes.js';

/**
 * Generates a completely standalone single-file HTML portfolio
 */
export function generateStandaloneHtml(portfolioState) {
  const currentThemeKey = portfolioState.theme || 'obsidian';
  const themeCss = getThemeCssRule(currentThemeKey);
  const jsonState = JSON.stringify(portfolioState).replace(/</g, '\\u003c');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(portfolioState.name)} — ${escapeHtml(portfolioState.title)}</title>
  <meta name="description" content="${escapeHtml(portfolioState.headline)}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    ${themeCss}
    
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-main);
      color: var(--text-main);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
      background-image: 
        radial-gradient(circle at 15% 10%, var(--accent-glow) 0%, transparent 40%),
        radial-gradient(circle at 85% 60%, rgba(6, 182, 212, 0.1) 0%, transparent 35%);
      background-attachment: fixed;
    }

    .container {
      max-width: 1140px;
      margin: 0 auto;
      padding: 0 1.5rem;
    }

    /* Navigation */
    .portfolio-nav {
      position: sticky;
      top: 0;
      z-index: 50;
      background: rgba(11, 15, 23, 0.85);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-subtle);
      padding: 0.85rem 0;
    }
    .nav-inner {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand-mark {
      font-weight: 700;
      font-size: 1.1rem;
      letter-spacing: -0.02em;
      color: var(--text-main);
      display: flex;
      align-items: center;
      gap: 0.5rem;
      text-decoration: none;
    }
    .brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--accent-primary);
      box-shadow: 0 0 10px var(--accent-primary);
    }
    .nav-links {
      display: flex;
      gap: 1.5rem;
      align-items: center;
    }
    .nav-links a {
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.88rem;
      font-weight: 500;
      transition: color 0.15s ease;
    }
    .nav-links a:hover {
      color: var(--text-main);
    }
    .btn-cta {
      background: var(--accent-primary);
      color: #0b0f17;
      padding: 0.45rem 1rem;
      border-radius: 6px;
      font-weight: 600;
      font-size: 0.85rem;
      text-decoration: none;
      transition: opacity 0.15s ease, transform 0.15s ease;
    }
    .btn-cta:hover {
      opacity: 0.92;
      transform: translateY(-1px);
    }

    /* Hero Section */
    .hero-section {
      padding: 4.5rem 0 3.5rem;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 3rem;
      align-items: center;
    }
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.3rem 0.85rem;
      background: var(--badge-bg);
      color: var(--badge-text);
      border: 1px solid var(--badge-border);
      border-radius: 9999px;
      font-size: 0.78rem;
      font-weight: 600;
      margin-bottom: 1.25rem;
      letter-spacing: 0.02em;
    }
    .status-ping {
      width: 6px;
      height: 6px;
      background: var(--accent-primary);
      border-radius: 50%;
      box-shadow: 0 0 8px var(--accent-primary);
    }
    .hero-name {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
      margin-bottom: 0.75rem;
    }
    .hero-title {
      font-size: 1.35rem;
      font-weight: 500;
      color: var(--accent-primary);
      margin-bottom: 1.25rem;
    }
    .hero-headline {
      font-size: 1.08rem;
      color: var(--text-muted);
      max-width: 680px;
      margin-bottom: 1.75rem;
      line-height: 1.6;
    }
    .hero-avatar {
      width: 170px;
      height: 170px;
      border-radius: 20px;
      object-fit: cover;
      border: 2px solid var(--border-highlight);
      box-shadow: var(--card-shadow);
    }
    .social-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 1rem;
    }
    .social-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.85rem;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      color: var(--text-muted);
      text-decoration: none;
      font-size: 0.82rem;
      font-weight: 500;
      transition: all 0.15s ease;
    }
    .social-link:hover {
      border-color: var(--border-highlight);
      color: var(--text-main);
      background: var(--bg-surface-elevated);
    }

    /* Stats Grid */
    .stats-strip {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2.5rem 0 4rem;
    }
    .stat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      box-shadow: var(--card-shadow);
      position: relative;
      overflow: hidden;
    }
    .stat-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 4px;
      height: 100%;
      background: var(--accent-primary);
    }
    .stat-val {
      font-size: 1.85rem;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: var(--metric-highlight);
      margin-bottom: 0.25rem;
    }
    .stat-label {
      font-size: 0.82rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.04em;
    }

    /* Section Headings */
    .section-header {
      margin-bottom: 2rem;
    }
    .section-eyebrow {
      color: var(--accent-primary);
      font-size: 0.8rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0.35rem;
    }
    .section-title {
      font-size: 1.85rem;
      font-weight: 700;
      letter-spacing: -0.02em;
    }

    /* Projects Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 2rem;
      margin-bottom: 4.5rem;
    }
    .project-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 2rem;
      box-shadow: var(--card-shadow);
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 2rem;
      transition: border-color 0.2s ease;
    }
    .project-card:hover {
      border-color: var(--border-highlight);
    }
    .project-cat-badge {
      display: inline-block;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--accent-primary);
      margin-bottom: 0.5rem;
    }
    .project-name {
      font-size: 1.4rem;
      font-weight: 700;
      letter-spacing: -0.01em;
      margin-bottom: 0.75rem;
    }
    .project-summary {
      font-size: 0.92rem;
      color: var(--text-muted);
      margin-bottom: 1rem;
      line-height: 1.55;
    }
    .project-spec-box {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 0.85rem 1rem;
      margin-bottom: 1.2rem;
      font-size: 0.82rem;
    }
    .spec-row {
      display: flex;
      margin-bottom: 0.35rem;
    }
    .spec-row:last-child { margin-bottom: 0; }
    .spec-label {
      color: var(--text-dim);
      width: 105px;
      flex-shrink: 0;
      font-weight: 500;
    }
    .spec-value {
      color: var(--text-main);
      font-weight: 500;
    }
    .metrics-pills {
      display: flex;
      gap: 0.65rem;
      flex-wrap: wrap;
      margin-bottom: 1.25rem;
    }
    .metric-pill {
      background: var(--bg-surface-elevated);
      border: 1px solid var(--border-subtle);
      border-radius: 8px;
      padding: 0.4rem 0.75rem;
      display: flex;
      flex-direction: column;
    }
    .metric-pill-val {
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--metric-highlight);
    }
    .metric-pill-lbl {
      font-size: 0.68rem;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }
    .stack-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-bottom: 1.25rem;
    }
    .tech-tag {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.74rem;
      padding: 0.2rem 0.55rem;
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: 4px;
      color: var(--text-muted);
    }
    .project-actions {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .project-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-size: 0.82rem;
      font-weight: 600;
      text-decoration: none;
      padding: 0.45rem 0.9rem;
      border-radius: 6px;
      border: 1px solid var(--border-subtle);
      background: var(--bg-surface-elevated);
      color: var(--text-main);
      transition: all 0.15s ease;
    }
    .project-btn:hover {
      border-color: var(--accent-primary);
      color: var(--accent-primary);
    }

    /* Chart Styles */
    .data-chart-widget {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 1.25rem;
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .chart-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
    }
    .chart-title {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .chart-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.15rem 0.5rem;
      background: var(--badge-bg);
      color: var(--badge-text);
      border-radius: 4px;
    }
    .chart-legend {
      display: flex;
      gap: 0.75rem;
      font-size: 0.7rem;
      color: var(--text-dim);
    }
    .legend-item {
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
    .legend-color {
      width: 8px;
      height: 8px;
      border-radius: 2px;
    }
    .legend-color.bar { background: var(--chart-bar); }
    .legend-color.line { background: var(--chart-line); }
    .legend-color.val-line { background: var(--accent-secondary); }
    .chart-svg-container {
      width: 100%;
      flex-grow: 1;
    }
    .chart-svg-container svg {
      width: 100%;
      height: auto;
      display: block;
    }
    .threshold-slider-group {
      margin-top: 0.85rem;
      padding-top: 0.75rem;
      border-top: 1px solid var(--border-subtle);
    }
    .slider-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-bottom: 0.35rem;
    }
    .f1-badge {
      color: var(--accent-primary);
      font-weight: 700;
    }
    .chart-slider {
      width: 100%;
      accent-color: var(--accent-primary);
      cursor: pointer;
    }
    .confusion-matrix-mini {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.35rem;
      margin-top: 0.65rem;
      font-size: 0.72rem;
    }
    .cm-cell {
      background: var(--bg-surface);
      padding: 0.35rem 0.5rem;
      border-radius: 4px;
      border: 1px solid var(--border-subtle);
      color: var(--text-muted);
    }
    .cm-cell strong {
      color: var(--text-main);
    }
    .chart-summary-bar {
      display: flex;
      justify-content: space-between;
      font-size: 0.72rem;
      color: var(--text-dim);
      margin-top: 0.65rem;
      padding-top: 0.5rem;
      border-top: 1px solid var(--border-subtle);
    }
    .chart-summary-bar strong {
      color: var(--text-main);
    }
    .feature-bars-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
      flex-grow: 1;
      justify-content: center;
    }
    .feature-bar-row {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.76rem;
    }
    .feature-info {
      width: 120px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
    }
    .feature-name {
      color: var(--text-main);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .feature-cat {
      font-size: 0.65rem;
      color: var(--text-dim);
    }
    .feature-track {
      flex-grow: 1;
      height: 8px;
      background: var(--bg-surface);
      border-radius: 9999px;
      overflow: hidden;
    }
    .feature-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--chart-line), var(--chart-bar));
      border-radius: 9999px;
    }
    .feature-score {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.72rem;
      color: var(--text-muted);
      width: 32px;
      text-align: right;
    }

    /* Skills Grid */
    .skills-section {
      margin-bottom: 4.5rem;
    }
    .skills-category-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
    }
    .skill-cat-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 1.5rem;
    }
    .skill-cat-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 1.25rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .skill-cat-title span.dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-primary);
    }
    .skill-item {
      margin-bottom: 1rem;
    }
    .skill-item:last-child { margin-bottom: 0; }
    .skill-meta {
      display: flex;
      justify-content: space-between;
      font-size: 0.8rem;
      margin-bottom: 0.35rem;
    }
    .skill-name { color: var(--text-main); font-weight: 500; }
    .skill-pct { color: var(--text-dim); font-family: 'JetBrains Mono', monospace; }
    .skill-bar-track {
      height: 6px;
      background: var(--bg-main);
      border-radius: 9999px;
      overflow: hidden;
    }
    .skill-bar-fill {
      height: 100%;
      background: var(--accent-primary);
      border-radius: 9999px;
    }

    /* Interactive Model Simulator Playground */
    .playground-section {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 16px;
      padding: 2.25rem;
      margin-bottom: 4.5rem;
      box-shadow: var(--card-shadow);
    }
    .playground-grid {
      display: grid;
      grid-template-columns: 1fr 1.2fr;
      gap: 2rem;
      align-items: center;
      margin-top: 1.5rem;
    }
    .sim-controls {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .sim-control-group {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
    }
    .sim-control-label {
      display: flex;
      justify-content: space-between;
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text-main);
    }
    .sim-control-val {
      color: var(--accent-primary);
      font-family: 'JetBrains Mono', monospace;
    }
    .sim-select {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      font-size: 0.82rem;
      cursor: pointer;
    }
    .sim-results-card {
      background: var(--bg-main);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 1.5rem;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.25rem;
    }
    .sim-stat-box {
      display: flex;
      flex-direction: column;
    }
    .sim-stat-label {
      font-size: 0.75rem;
      color: var(--text-dim);
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }
    .sim-stat-number {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--metric-highlight);
      font-family: 'JetBrains Mono', monospace;
    }
    .sim-stat-sub {
      font-size: 0.7rem;
      color: var(--text-muted);
    }

    /* Experience & Timeline */
    .timeline-section {
      margin-bottom: 4.5rem;
    }
    .timeline-list {
      position: relative;
      padding-left: 1.5rem;
    }
    .timeline-list::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: var(--border-subtle);
    }
    .timeline-item {
      position: relative;
      margin-bottom: 2.5rem;
    }
    .timeline-item::before {
      content: '';
      position: absolute;
      left: -1.85rem;
      top: 6px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-primary);
      border: 2px solid var(--bg-main);
    }
    .timeline-role {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-main);
    }
    .timeline-company {
      font-size: 0.92rem;
      color: var(--accent-primary);
      font-weight: 600;
      margin-bottom: 0.25rem;
    }
    .timeline-meta {
      font-size: 0.78rem;
      color: var(--text-dim);
      margin-bottom: 0.75rem;
    }
    .timeline-bullets {
      list-style-type: disc;
      padding-left: 1.25rem;
      color: var(--text-muted);
      font-size: 0.88rem;
    }
    .timeline-bullets li {
      margin-bottom: 0.35rem;
    }

    /* Achievements & Certifications */
    .achievements-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.25rem;
      margin-bottom: 4.5rem;
    }
    .achievement-card {
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      padding: 1.25rem 1.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .achievement-info h4 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-main);
      margin-bottom: 0.2rem;
    }
    .achievement-issuer {
      font-size: 0.78rem;
      color: var(--text-muted);
    }
    .achievement-badge {
      font-size: 0.72rem;
      font-weight: 700;
      padding: 0.3rem 0.65rem;
      background: var(--badge-bg);
      color: var(--badge-text);
      border: 1px solid var(--badge-border);
      border-radius: 6px;
      white-space: nowrap;
    }

    /* Footer */
    .portfolio-footer {
      border-top: 1px solid var(--border-subtle);
      padding: 3rem 0;
      text-align: center;
      color: var(--text-dim);
      font-size: 0.85rem;
    }
    .portfolio-footer a {
      color: var(--accent-primary);
      text-decoration: none;
    }

    @media (max-width: 850px) {
      .hero-grid { grid-template-columns: 1fr; text-align: center; }
      .hero-avatar { margin: 0 auto; }
      .project-card { grid-template-columns: 1fr; }
      .playground-grid { grid-template-columns: 1fr; }
      .hero-name { font-size: 2.2rem; }
      .social-pills { justify-content: center; }
    }
  </style>
</head>
<body>

  <!-- Navigation -->
  <nav class="portfolio-nav">
    <div class="container nav-inner">
      <a href="#" class="brand-mark">
        <span class="brand-dot"></span>
        <span>${escapeHtml(portfolioState.name)}</span>
      </a>
      <div class="nav-links">
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#simulator">Lab</a>
        <a href="#experience">Experience</a>
        <a href="mailto:${escapeHtml(portfolioState.email)}" class="btn-cta">Contact</a>
      </div>
    </div>
  </nav>

  <main class="container">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-grid">
        <div>
          ${portfolioState.status ? `
          <div class="status-pill">
            <span class="status-ping"></span>
            <span>${escapeHtml(portfolioState.status)}</span>
          </div>` : ''}
          <h1 class="hero-name">${escapeHtml(portfolioState.name)}</h1>
          <h2 class="hero-title">${escapeHtml(portfolioState.title)}</h2>
          <p class="hero-headline">${escapeHtml(portfolioState.headline)}</p>
          <div class="social-pills">
            ${portfolioState.github ? `<a href="${escapeHtml(portfolioState.github)}" target="_blank" rel="noreferrer" class="social-link">GitHub</a>` : ''}
            ${portfolioState.linkedin ? `<a href="${escapeHtml(portfolioState.linkedin)}" target="_blank" rel="noreferrer" class="social-link">LinkedIn</a>` : ''}
            ${portfolioState.kaggle ? `<a href="${escapeHtml(portfolioState.kaggle)}" target="_blank" rel="noreferrer" class="social-link">Kaggle</a>` : ''}
            ${portfolioState.scholar ? `<a href="${escapeHtml(portfolioState.scholar)}" target="_blank" rel="noreferrer" class="social-link">Scholar</a>` : ''}
            ${portfolioState.email ? `<a href="mailto:${escapeHtml(portfolioState.email)}" class="social-link">Email</a>` : ''}
            ${portfolioState.resumeUrl && portfolioState.resumeUrl !== '#' ? `<a href="${escapeHtml(portfolioState.resumeUrl)}" target="_blank" class="social-link">Resume PDF</a>` : ''}
          </div>
        </div>
        <div>
          <img src="${escapeHtml(portfolioState.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80')}" alt="${escapeHtml(portfolioState.name)}" class="hero-avatar">
        </div>
      </div>
    </section>

    <!-- Key Stats Strip -->
    ${portfolioState.stats && portfolioState.stats.length > 0 ? `
    <div class="stats-strip">
      ${portfolioState.stats.map(s => `
        <div class="stat-card">
          <div class="stat-val">${escapeHtml(s.value)}</div>
          <div class="stat-label">${escapeHtml(s.label)}</div>
        </div>
      `).join('')}
    </div>` : ''}

    <!-- Featured Data Projects -->
    <section id="projects">
      <div class="section-header">
        <div class="section-eyebrow">Portfolio Work</div>
        <h3 class="section-title">Data Systems & Machine Learning Projects</h3>
      </div>

      <div class="projects-grid">
        ${(portfolioState.projects || []).map((proj, idx) => `
          <div class="project-card">
            <div>
              <span class="project-cat-badge">${escapeHtml(proj.category || 'Data Science')}</span>
              <h4 class="project-name">${escapeHtml(proj.title)}</h4>
              <p class="project-summary">${escapeHtml(proj.summary)}</p>

              <div class="project-spec-box">
                <div class="spec-row">
                  <span class="spec-label">Impact:</span>
                  <span class="spec-value">${escapeHtml(proj.businessImpact || 'Optimized operational throughput and inference latency.')}</span>
                </div>
                ${proj.datasetDetails ? `
                <div class="spec-row">
                  <span class="spec-label">Dataset:</span>
                  <span class="spec-value">${escapeHtml(proj.datasetDetails)}</span>
                </div>` : ''}
                ${proj.architecture ? `
                <div class="spec-row">
                  <span class="spec-label">Architecture:</span>
                  <span class="spec-value">${escapeHtml(proj.architecture)}</span>
                </div>` : ''}
              </div>

              ${proj.metrics && proj.metrics.length > 0 ? `
              <div class="metrics-pills">
                ${proj.metrics.map(m => `
                  <div class="metric-pill">
                    <span class="metric-pill-val">${escapeHtml(m.value)}</span>
                    <span class="metric-pill-lbl">${escapeHtml(m.label)}</span>
                  </div>
                `).join('')}
              </div>` : ''}

              <div class="stack-tags">
                ${(proj.techStack || []).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
              </div>

              <div class="project-actions">
                ${proj.githubUrl ? `<a href="${escapeHtml(proj.githubUrl)}" target="_blank" rel="noreferrer" class="project-btn">GitHub Code</a>` : ''}
                ${proj.demoUrl ? `<a href="${escapeHtml(proj.demoUrl)}" target="_blank" rel="noreferrer" class="project-btn">Live Demo</a>` : ''}
                ${proj.paperUrl ? `<a href="${escapeHtml(proj.paperUrl)}" target="_blank" rel="noreferrer" class="project-btn">arXiv Paper</a>` : ''}
              </div>
            </div>

            <!-- Dynamic Chart Embed -->
            <div id="chart-proj-${idx}"></div>
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Interactive Data Lab / Simulator -->
    <section id="simulator" class="playground-section">
      <div class="section-eyebrow">Interactive Simulation</div>
      <h3 class="section-title">LLM Hardware & Inference Cost Simulator</h3>
      <p style="color: var(--text-muted); font-size: 0.88rem; margin-top: 0.35rem;">
        Dynamically estimate GPU VRAM footprints, memory bandwidth saturation, and tokens-per-second throughput across model scales and quantization formats.
      </p>

      <div class="playground-grid">
        <div class="sim-controls">
          <div class="sim-control-group">
            <div class="sim-control-label">
              <span>Model Architecture Parameter Scale</span>
              <span id="sim-param-val" class="sim-control-val">70B</span>
            </div>
            <select id="sim-param-select" class="sim-select">
              <option value="7">7B Parameters (e.g. Llama-3-8B / Mistral)</option>
              <option value="14">14B Parameters (e.g. Qwen-2.5-14B)</option>
              <option value="34">34B Parameters (e.g. Yi-34B)</option>
              <option value="70" selected>70B Parameters (e.g. Llama-3-70B)</option>
            </select>
          </div>

          <div class="sim-control-group">
            <div class="sim-control-label">
              <span>Quantization Precision</span>
              <span id="sim-quant-val" class="sim-control-val">INT4 (AWQ/GPTQ)</span>
            </div>
            <select id="sim-quant-select" class="sim-select">
              <option value="16">FP16 / BF16 (16-bit Unquantized)</option>
              <option value="8">INT8 (8-bit Quantized)</option>
              <option value="4" selected>INT4 (4-bit AWQ / ExLlamaV2)</option>
            </select>
          </div>

          <div class="sim-control-group">
            <div class="sim-control-label">
              <span>Active Context Window (Tokens)</span>
              <span id="sim-ctx-val" class="sim-control-val">8,192 tokens</span>
            </div>
            <input type="range" id="sim-ctx-slider" min="1024" max="65536" step="1024" value="8192" class="chart-slider">
          </div>
        </div>

        <div class="sim-results-card">
          <div class="sim-stat-box">
            <span class="sim-stat-label">Min GPU VRAM Required</span>
            <span id="res-vram" class="sim-stat-number">42.8 GB</span>
            <span class="sim-stat-sub" id="res-gpu-fit">Requires 1x NVIDIA A100-80G</span>
          </div>

          <div class="sim-stat-box">
            <span class="sim-stat-label">Inference Throughput</span>
            <span id="res-tps" class="sim-stat-number">64.2 t/s</span>
            <span class="sim-stat-sub">Streaming generation speed</span>
          </div>

          <div class="sim-stat-box">
            <span class="sim-stat-label">Time to First Token (TTFT)</span>
            <span id="res-ttft" class="sim-stat-number">28 ms</span>
            <span class="sim-stat-sub">Prefill latency @ P95</span>
          </div>

          <div class="sim-stat-box">
            <span class="sim-stat-label">Estimated Cost per 1M Tokens</span>
            <span id="res-cost" class="sim-stat-number">$0.38</span>
            <span class="sim-stat-sub">Self-hosted cloud spot rate</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Taxonomy Matrix -->
    <section id="skills" class="skills-section">
      <div class="section-header">
        <div class="section-eyebrow">Technical Mastery</div>
        <h3 class="section-title">Data & Machine Learning Stack</h3>
      </div>

      <div class="skills-category-grid">
        ${Object.entries(portfolioState.skills || {}).map(([key, list]) => `
          <div class="skill-cat-card">
            <h4 class="skill-cat-title">
              <span class="dot"></span>
              <span>${formatSkillCatName(key)}</span>
            </h4>
            ${(list || []).map(sk => `
              <div class="skill-item">
                <div class="skill-meta">
                  <span class="skill-name">${escapeHtml(sk.name)}</span>
                  <span class="skill-pct">${sk.level}%</span>
                </div>
                <div class="skill-bar-track">
                  <div class="skill-bar-fill" style="width: ${sk.level}%;"></div>
                </div>
              </div>
            `).join('')}
          </div>
        `).join('')}
      </div>
    </section>

    <!-- Experience Timeline -->
    ${portfolioState.experience && portfolioState.experience.length > 0 ? `
    <section id="experience" class="timeline-section">
      <div class="section-header">
        <div class="section-eyebrow">Career History</div>
        <h3 class="section-title">Production Engineering Experience</h3>
      </div>

      <div class="timeline-list">
        ${portfolioState.experience.map(exp => `
          <div class="timeline-item">
            <div class="timeline-role">${escapeHtml(exp.role)}</div>
            <div class="timeline-company">${escapeHtml(exp.company)}</div>
            <div class="timeline-meta">${escapeHtml(exp.period)} • ${escapeHtml(exp.location || 'Remote')}</div>
            <ul class="timeline-bullets">
              ${(exp.bullets || []).map(b => `<li>${escapeHtml(b)}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
      </div>
    </section>` : ''}

    <!-- Achievements & Certifications -->
    ${portfolioState.achievements && portfolioState.achievements.length > 0 ? `
    <section class="section-header">
      <div class="section-eyebrow">Validations</div>
      <h3 class="section-title">Certifications, Competitions & Publications</h3>
    </section>
    <div class="achievements-grid">
      ${portfolioState.achievements.map(ach => `
        <div class="achievement-card">
          <div class="achievement-info">
            <h4>${escapeHtml(ach.title)}</h4>
            <div class="achievement-issuer">${escapeHtml(ach.issuer)} • ${escapeHtml(ach.date || 'Active')}</div>
          </div>
          <span class="achievement-badge">${escapeHtml(ach.badge)}</span>
        </div>
      `).join('')}
    </div>` : ''}
  </main>

  <footer class="portfolio-footer">
    <div class="container">
      <p>© ${new Date().getFullYear()} ${escapeHtml(portfolioState.name)}. Interactive Data Portfolio generated via <a href="#" target="_blank">DataFolio</a>.</p>
    </div>
  </footer>

  <!-- Embedded Client Logic & Interactive Charts -->
  <script>
    const PORTFOLIO_DATA = ${jsonState};

    // Render interactive project charts
    ${renderClientChartsScript(portfolioState)}

    // Setup interactive hardware simulator
    ${setupSimulatorScript()}
  </script>
</body>
</html>`;
}

function renderClientChartsScript(portfolioState) {
  return `
    document.addEventListener('DOMContentLoaded', () => {
      const projects = PORTFOLIO_DATA.projects || [];
      projects.forEach((proj, idx) => {
        const container = document.getElementById('chart-proj-' + idx);
        if (!container) return;

        const chartType = proj.chartType || 'roc_curve';
        if (chartType === 'roc_curve') {
          container.innerHTML = generateClientRocHtml(idx, 0.952);
          bindRocSlider(idx);
        } else if (chartType === 'pipeline_throughput') {
          container.innerHTML = generateClientPipelineHtml(idx);
        } else if (chartType === 'loss_curve') {
          container.innerHTML = generateClientLossHtml(idx);
        } else {
          container.innerHTML = generateClientFeaturesHtml(idx);
        }
      });
    });

    function generateClientRocHtml(idx, auc) {
      return \`
        <div class="data-chart-widget">
          <div class="chart-header">
            <span class="chart-title">Model ROC-AUC Curve</span>
            <span class="chart-badge">AUC = \${auc.toFixed(3)}</span>
          </div>
          <div class="chart-svg-container">
            <svg viewBox="0 0 380 200" preserveAspectRatio="xMidYMid meet">
              <line x1="40" y1="15" x2="360" y2="15" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
              <line x1="40" y1="92" x2="360" y2="92" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
              <line x1="40" y1="170" x2="360" y2="170" stroke="var(--border-highlight)" />
              <line x1="40" y1="15" x2="40" y2="170" stroke="var(--border-highlight)" />
              <line x1="40" y1="170" x2="360" y2="15" stroke="var(--text-dim)" stroke-dasharray="3 3" opacity="0.6" />
              <path d="M 40.0 170.0 L 50.7 75.3 L 61.3 57.5 L 72.0 46.1 L 82.7 37.8 L 104.0 26.6 L 146.7 18.0 L 232.0 15.2 L 360.0 15.0 L 360.0 170.0 Z" fill="var(--chart-line)" opacity="0.12" />
              <path d="M 40.0 170.0 L 50.7 75.3 L 61.3 57.5 L 72.0 46.1 L 82.7 37.8 L 104.0 26.6 L 146.7 18.0 L 232.0 15.2 L 360.0 15.0" fill="none" stroke="var(--chart-line)" stroke-width="2.5" />
              <circle id="roc-pt-\${idx}" cx="78.4" cy="24.3" r="6" fill="var(--accent-secondary)" stroke="#fff" stroke-width="2" />
              <text x="200" y="194" text-anchor="middle" font-size="10" fill="var(--text-dim)">False Positive Rate (FPR)</text>
              <text x="12" y="92" text-anchor="middle" font-size="10" fill="var(--text-dim)" transform="rotate(-90 12,92)">TPR</text>
            </svg>
          </div>
          <div class="threshold-slider-group">
            <div class="slider-meta">
              <span>Threshold: <strong id="thresh-val-\${idx}">0.50</strong></span>
              <span id="f1-val-\${idx}" class="f1-badge">F1: 0.941</span>
            </div>
            <input type="range" class="chart-slider" id="slider-\${idx}" min="0.05" max="0.95" step="0.01" value="0.50">
          </div>
          <div class="confusion-matrix-mini">
            <div class="cm-cell">TP: <strong id="tp-\${idx}">9,420</strong></div>
            <div class="cm-cell">FP: <strong id="fp-\${idx}">310</strong></div>
            <div class="cm-cell">FN: <strong id="fn-\${idx}">580</strong></div>
            <div class="cm-cell">TN: <strong id="tn-\${idx}">19,690</strong></div>
          </div>
        </div>\`;
    }

    function bindRocSlider(idx) {
      const slider = document.getElementById('slider-' + idx);
      if (!slider) return;
      slider.addEventListener('input', (e) => {
        const t = parseFloat(e.target.value);
        document.getElementById('thresh-val-' + idx).textContent = t.toFixed(2);
        const fpr = Math.max(0.01, Math.min(0.99, Math.pow(1 - t, 2.2)));
        const tpr = Math.max(0.05, Math.min(0.99, Math.pow(1 - (t * 0.4), 0.35)));
        const pt = document.getElementById('roc-pt-' + idx);
        if (pt) {
          pt.setAttribute('cx', (40 + fpr * 320).toFixed(1));
          pt.setAttribute('cy', (15 + (1 - tpr) * 155).toFixed(1));
        }
        const tp = Math.round(10000 * tpr);
        const fp = Math.round(20000 * fpr);
        const fn = 10000 - tp;
        const tn = 20000 - fp;
        const prec = tp / (tp + fp);
        const f1 = (2 * prec * tpr) / (prec + tpr);
        document.getElementById('f1-val-' + idx).textContent = 'F1: ' + f1.toFixed(3);
        document.getElementById('tp-' + idx).textContent = tp.toLocaleString();
        document.getElementById('fp-' + idx).textContent = fp.toLocaleString();
        document.getElementById('fn-' + idx).textContent = fn.toLocaleString();
        document.getElementById('tn-' + idx).textContent = tn.toLocaleString();
      });
    }

    function generateClientPipelineHtml(idx) {
      return \`
        <div class="data-chart-widget">
          <div class="chart-header">
            <span class="chart-title">Real-Time Ingestion vs P95 Latency</span>
            <div class="chart-legend">
              <span class="legend-item"><span class="legend-color bar"></span> Throughput</span>
              <span class="legend-item"><span class="legend-color line"></span> Latency</span>
            </div>
          </div>
          <div class="chart-svg-container">
            <svg viewBox="0 0 380 190" preserveAspectRatio="xMidYMid meet">
              <line x1="35" y1="20" x2="345" y2="20" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
              <line x1="35" y1="92" x2="345" y2="92" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
              <line x1="35" y1="165" x2="345" y2="165" stroke="var(--border-highlight)" />
              <rect x="25" y="115" width="20" height="50" rx="3" fill="var(--chart-bar)" opacity="0.65" />
              <rect x="76" y="124" width="20" height="41" rx="3" fill="var(--chart-bar)" opacity="0.65" />
              <rect x="128" y="81" width="20" height="84" rx="3" fill="var(--chart-bar)" opacity="0.65" />
              <rect x="180" y="43" width="20" height="122" rx="3" fill="var(--chart-bar)" opacity="0.65" />
              <rect x="231" y="32" width="20" height="133" rx="3" fill="var(--chart-bar)" opacity="0.65" />
              <rect x="283" y="72" width="20" height="93" rx="3" fill="var(--chart-bar)" opacity="0.65" />
              <rect x="335" y="104" width="20" height="61" rx="3" fill="var(--chart-bar)" opacity="0.65" />
              <path d="M 35.0 97.4 L 86.6 107.1 L 138.3 73.2 L 190.0 56.3 L 241.6 63.5 L 293.3 87.7 L 345.0 102.2" fill="none" stroke="var(--chart-line)" stroke-width="2.5" />
              <text x="35" y="182" text-anchor="middle" font-size="9" fill="var(--text-dim)">00:00</text>
              <text x="190" y="182" text-anchor="middle" font-size="9" fill="var(--text-dim)">12:00</text>
              <text x="345" y="182" text-anchor="middle" font-size="9" fill="var(--text-dim)">23:59</text>
            </svg>
          </div>
          <div class="chart-summary-bar">
            <span>Peak: <strong>92k evt/s</strong></span>
            <span>Avg Latency: <strong>33.5 ms</strong></span>
            <span>SLA: <strong>99.98%</strong></span>
          </div>
        </div>\`;
    }

    function generateClientFeaturesHtml(idx) {
      return \`
        <div class="data-chart-widget">
          <div class="chart-header">
            <span class="chart-title">Key Model Feature Contributions (SHAP)</span>
            <span class="chart-badge">5 Predictors</span>
          </div>
          <div class="feature-bars-list">
            <div class="feature-bar-row">
              <div class="feature-info"><span class="feature-name">Embedding Cosine Sim</span><span class="feature-cat">Semantic</span></div>
              <div class="feature-track"><div class="feature-fill" style="width: 38%;"></div></div>
              <span class="feature-score">0.38</span>
            </div>
            <div class="feature-bar-row">
              <div class="feature-info"><span class="feature-name">BM25 Sparse Score</span><span class="feature-cat">Lexical</span></div>
              <div class="feature-track"><div class="feature-fill" style="width: 24%;"></div></div>
              <span class="feature-score">0.24</span>
            </div>
            <div class="feature-bar-row">
              <div class="feature-info"><span class="feature-name">Document Freshness</span><span class="feature-cat">Temporal</span></div>
              <div class="feature-track"><div class="feature-fill" style="width: 16%;"></div></div>
              <span class="feature-score">0.16</span>
            </div>
            <div class="feature-bar-row">
              <div class="feature-info"><span class="feature-name">Domain Authority</span><span class="feature-cat">Graph</span></div>
              <div class="feature-track"><div class="feature-fill" style="width: 12%;"></div></div>
              <span class="feature-score">0.12</span>
            </div>
          </div>
        </div>\`;
    }

    function generateClientLossHtml(idx) {
      return \`
        <div class="data-chart-widget">
          <div class="chart-header">
            <span class="chart-title">Training Loss vs Validation Loss</span>
            <div class="chart-legend">
              <span class="legend-item"><span class="legend-color line"></span> Train</span>
              <span class="legend-item"><span class="legend-color val-line"></span> Val</span>
            </div>
          </div>
          <div class="chart-svg-container">
            <svg viewBox="0 0 380 180" preserveAspectRatio="xMidYMid meet">
              <line x1="35" y1="20" x2="360" y2="20" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
              <line x1="35" y1="87" x2="360" y2="87" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
              <line x1="35" y1="155" x2="360" y2="155" stroke="var(--border-highlight)" />
              <path d="M 35.0 130.2 L 71.1 92.9 L 107.2 71.7 L 143.3 59.6 L 179.4 51.0 L 215.6 44.3 L 251.7 39.8 L 287.8 36.6 L 323.9 34.4 L 360.0 32.6" fill="none" stroke="var(--chart-line)" stroke-width="2" />
              <path d="M 35.0 133.4 L 71.1 96.9 L 107.2 77.6 L 143.3 65.9 L 179.4 58.7 L 215.6 53.3 L 251.7 51.0 L 287.8 49.7 L 323.9 49.2 L 360.0 50.6" fill="none" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="3 3" />
              <text x="35" y="172" font-size="9" fill="var(--text-dim)">Ep 1</text>
              <text x="197" y="172" text-anchor="middle" font-size="9" fill="var(--text-dim)">Ep 5</text>
              <text x="360" y="172" text-anchor="end" font-size="9" fill="var(--text-dim)">Ep 10</text>
            </svg>
          </div>
          <div class="chart-summary-bar">
            <span>Early Stop: <strong>Ep 9</strong></span>
            <span>Final Val Loss: <strong>0.492</strong></span>
          </div>
        </div>\`;
    }
  `;
}

function setupSimulatorScript() {
  return `
    document.addEventListener('DOMContentLoaded', () => {
      const paramSelect = document.getElementById('sim-param-select');
      const quantSelect = document.getElementById('sim-quant-select');
      const ctxSlider = document.getElementById('sim-ctx-slider');

      const paramVal = document.getElementById('sim-param-val');
      const quantVal = document.getElementById('sim-quant-val');
      const ctxVal = document.getElementById('sim-ctx-val');

      const resVram = document.getElementById('res-vram');
      const resGpu = document.getElementById('res-gpu-fit');
      const resTps = document.getElementById('res-tps');
      const resTtft = document.getElementById('res-ttft');
      const resCost = document.getElementById('res-cost');

      function updateSimulation() {
        const params = parseInt(paramSelect.value, 10);
        const bits = parseInt(quantSelect.value, 10);
        const ctx = parseInt(ctxSlider.value, 10);

        if (paramVal) paramVal.textContent = params + 'B';
        if (quantVal) quantVal.textContent = quantSelect.options[quantSelect.selectedIndex].text.split(' ')[0];
        if (ctxVal) ctxVal.textContent = ctx.toLocaleString() + ' tokens';

        // Weights VRAM (GB) = (params * 10^9 * bits / 8) / (1024^3)
        const weightVram = (params * (bits / 8)) * 0.93;
        // KV Cache VRAM per token approximation
        const kvVram = (ctx * params * 0.00004);
        const totalVram = Math.round((weightVram + kvVram + 2.5) * 10) / 10;

        let gpuFit = '1x RTX 4090 (24GB)';
        let baseTps = 85;
        let costPerM = 0.12;

        if (totalVram > 80) {
          gpuFit = '2x NVIDIA A100-80G / H100';
          baseTps = 48;
          costPerM = 0.95;
        } else if (totalVram > 40) {
          gpuFit = '1x NVIDIA A100-80G';
          baseTps = 65;
          costPerM = 0.45;
        } else if (totalVram > 24) {
          gpuFit = '1x NVIDIA A6000 (48GB)';
          baseTps = 72;
          costPerM = 0.28;
        }

        const tps = Math.round((baseTps * (16 / bits) * (34 / Math.max(12, params))) * 10) / 10;
        const ttft = Math.round(14 + (ctx / 1000) * (params / 12));

        if (resVram) resVram.textContent = totalVram + ' GB';
        if (resGpu) resGpu.textContent = 'Requires ' + gpuFit;
        if (resTps) resTps.textContent = tps + ' t/s';
        if (resTtft) resTtft.textContent = ttft + ' ms';
        if (resCost) resCost.textContent = '$' + (costPerM * (params / 30)).toFixed(2);
      }

      if (paramSelect && quantSelect && ctxSlider) {
        paramSelect.addEventListener('change', updateSimulation);
        quantSelect.addEventListener('change', updateSimulation);
        ctxSlider.addEventListener('input', updateSimulation);
        updateSimulation();
      }
    });
  `;
}

/**
 * Generates a GitHub Profile README.md formatted file
 */
export function generateGitHubProfileReadme(portfolio) {
  const name = portfolio.name || 'Data Scientist';
  const title = portfolio.title || 'Machine Learning Engineer';
  const headline = portfolio.headline || '';
  const projects = portfolio.projects || [];
  const stats = portfolio.stats || [];

  let md = `# Hi there, I'm ${name} 👋\n\n`;
  md += `### ${title}\n\n`;
  if (headline) {
    md += `> ${headline}\n\n`;
  }

  // Quick stats badges
  if (stats.length > 0) {
    md += `## ⚡ Quick Impact Metrics\n\n`;
    md += `| Metric | Achievement |\n`;
    md += `| :--- | :--- |\n`;
    stats.forEach(s => {
      md += `| **${s.label}** | \`${s.value}\` |\n`;
    });
    md += `\n`;
  }

  // Featured Projects
  if (projects.length > 0) {
    md += `## 🚀 Featured Data & Machine Learning Systems\n\n`;
    projects.forEach(p => {
      md += `### 🔹 [${p.title}](${p.githubUrl || '#'})\n`;
      md += `*${p.category || 'Data Science'}* — **${(p.techStack || []).join(', ')}**\n\n`;
      md += `${p.summary}\n\n`;
      if (p.businessImpact) {
        md += `- **Business Impact:** ${p.businessImpact}\n`;
      }
      if (p.metrics && p.metrics.length > 0) {
        md += `- **Key Metrics:** ${p.metrics.map(m => `\`${m.label}: ${m.value}\``).join(' • ')}\n`;
      }
      if (p.demoUrl) {
        md += `- **Live Demo:** [Open Demo](${p.demoUrl})\n`;
      }
      md += `\n`;
    });
  }

  // Skills
  md += `## 🛠️ Technical Stack & Data Disciplines\n\n`;
  if (portfolio.skills) {
    for (const [cat, list] of Object.entries(portfolio.skills)) {
      md += `- **${formatSkillCatName(cat)}:** ${(list || []).map(s => s.name).join(', ')}\n`;
    }
    md += `\n`;
  }

  // Connect
  md += `## 📬 Connect With Me\n\n`;
  if (portfolio.linkedin) md += `[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat&logo=linkedin)](${portfolio.linkedin}) `;
  if (portfolio.github) md += `[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=flat&logo=github)](${portfolio.github}) `;
  if (portfolio.kaggle) md += `[![Kaggle](https://img.shields.io/badge/Kaggle-Profile-cyan?style=flat&logo=kaggle)](${portfolio.kaggle}) `;
  if (portfolio.email) md += `[![Email](https://img.shields.io/badge/Email-Contact_Me-red?style=flat&logo=gmail)](mailto:${portfolio.email}) `;
  md += `\n\n---\n*Portfolio auto-generated with [DataFolio](https://github.com/alexchen-ml)*\n`;

  return md;
}

function formatSkillCatName(key) {
  const map = {
    ml_dl: 'Machine Learning & Deep Learning',
    data_eng: 'Data Engineering & Pipelines',
    databases: 'Databases & Storage',
    analytics_viz: 'Analytics & Visualization',
    cloud_mlops: 'Cloud & MLOps',
    languages: 'Languages & Environments'
  };
  return map[key] || key.replace('_', ' ').toUpperCase();
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
