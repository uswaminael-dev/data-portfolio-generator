/**
 * Data Portfolio Themes Definition
 * High-contrast, mathematically balanced themes designed specifically for data professionals.
 */

export const Themes = {
  obsidian: {
    id: 'obsidian',
    name: 'Obsidian Data Lab',
    tagline: 'Cybernetic emerald and cyan accents on deep obsidian',
    badge: 'Popular for ML & AI',
    vars: {
      '--bg-main': '#0b0f17',
      '--bg-surface': '#111827',
      '--bg-surface-elevated': '#1f2937',
      '--border-subtle': '#1f2937',
      '--border-highlight': '#374151',
      '--accent-primary': '#10b981',
      '--accent-primary-hover': '#059669',
      '--accent-glow': 'rgba(16, 185, 129, 0.25)',
      '--accent-secondary': '#06b6d4',
      '--text-main': '#f8fafc',
      '--text-muted': '#94a3b8',
      '--text-dim': '#64748b',
      '--badge-bg': 'rgba(16, 185, 129, 0.12)',
      '--badge-text': '#34d399',
      '--badge-border': 'rgba(16, 185, 129, 0.3)',
      '--card-shadow': '0 8px 30px rgba(0, 0, 0, 0.5)',
      '--metric-highlight': '#34d399',
      '--chart-line': '#10b981',
      '--chart-bar': '#06b6d4',
      '--font-family': 'Inter, system-ui, -apple-system, sans-serif'
    }
  },

  deep_neural: {
    id: 'deep_neural',
    name: 'Deep Neural Space',
    tagline: 'Cosmic indigo, electric violet and neon magenta highlights',
    badge: 'Popular for Deep Learning & R&D',
    vars: {
      '--bg-main': '#0c0a1a',
      '--bg-surface': '#15122b',
      '--bg-surface-elevated': '#211d44',
      '--border-subtle': '#27204f',
      '--border-highlight': '#3f357c',
      '--accent-primary': '#8b5cf6',
      '--accent-primary-hover': '#7c3aed',
      '--accent-glow': 'rgba(139, 92, 246, 0.3)',
      '--accent-secondary': '#ec4899',
      '--text-main': '#fdf4ff',
      '--text-muted': '#a78bfa',
      '--text-dim': '#7c69b8',
      '--badge-bg': 'rgba(139, 92, 246, 0.15)',
      '--badge-text': '#c084fc',
      '--badge-border': 'rgba(139, 92, 246, 0.35)',
      '--card-shadow': '0 8px 32px rgba(12, 10, 26, 0.7)',
      '--metric-highlight': '#e879f9',
      '--chart-line': '#a855f7',
      '--chart-bar': '#ec4899',
      '--font-family': 'Inter, system-ui, sans-serif'
    }
  },

  executive: {
    id: 'executive',
    name: 'Executive Slate & Gold',
    tagline: 'Clean enterprise dark charcoal with warm champagne gold accents',
    badge: 'Popular for Analytics & Leadership',
    vars: {
      '--bg-main': '#0f141c',
      '--bg-surface': '#161e2b',
      '--bg-surface-elevated': '#202b3c',
      '--border-subtle': '#253245',
      '--border-highlight': '#384860',
      '--accent-primary': '#f59e0b',
      '--accent-primary-hover': '#d97706',
      '--accent-glow': 'rgba(245, 158, 11, 0.25)',
      '--accent-secondary': '#38bdf8',
      '--text-main': '#f8fafc',
      '--text-muted': '#94a3b8',
      '--text-dim': '#64748b',
      '--badge-bg': 'rgba(245, 158, 11, 0.12)',
      '--badge-text': '#fbbf24',
      '--badge-border': 'rgba(245, 158, 11, 0.3)',
      '--card-shadow': '0 8px 30px rgba(0, 0, 0, 0.45)',
      '--metric-highlight': '#fbbf24',
      '--chart-line': '#f59e0b',
      '--chart-bar': '#38bdf8',
      '--font-family': 'Inter, system-ui, sans-serif'
    }
  },

  nordic: {
    id: 'nordic',
    name: 'Nordic Light Research',
    tagline: 'High-contrast publication light theme with cobalt and slate accents',
    badge: 'Crisp & Academic',
    vars: {
      '--bg-main': '#f8fafc',
      '--bg-surface': '#ffffff',
      '--bg-surface-elevated': '#f1f5f9',
      '--border-subtle': '#e2e8f0',
      '--border-highlight': '#cbd5e1',
      '--accent-primary': '#2563eb',
      '--accent-primary-hover': '#1d4ed8',
      '--accent-glow': 'rgba(37, 99, 235, 0.15)',
      '--accent-secondary': '#0d9488',
      '--text-main': '#0f172a',
      '--text-muted': '#475569',
      '--text-dim': '#94a3b8',
      '--badge-bg': 'rgba(37, 99, 235, 0.08)',
      '--badge-text': '#1d4ed8',
      '--badge-border': 'rgba(37, 99, 235, 0.25)',
      '--card-shadow': '0 4px 20px rgba(0, 0, 0, 0.06)',
      '--metric-highlight': '#1e40af',
      '--chart-line': '#2563eb',
      '--chart-bar': '#0d9488',
      '--font-family': 'Inter, system-ui, sans-serif'
    }
  },

  matrix: {
    id: 'matrix',
    name: 'Phosphor Matrix Terminal',
    tagline: 'Retro-futuristic terminal aesthetic with monospace green phosphor telemetry',
    badge: 'Hacker & Systems',
    vars: {
      '--bg-main': '#050906',
      '--bg-surface': '#0b130e',
      '--bg-surface-elevated': '#132118',
      '--border-subtle': '#183824',
      '--border-highlight': '#255737',
      '--accent-primary': '#22c55e',
      '--accent-primary-hover': '#16a34a',
      '--accent-glow': 'rgba(34, 197, 94, 0.25)',
      '--accent-secondary': '#84cc16',
      '--text-main': '#e2fee8',
      '--text-muted': '#86efac',
      '--text-dim': '#4ade80',
      '--badge-bg': 'rgba(34, 197, 94, 0.12)',
      '--badge-text': '#4ade80',
      '--badge-border': 'rgba(34, 197, 94, 0.3)',
      '--card-shadow': '0 8px 30px rgba(5, 9, 6, 0.8)',
      '--metric-highlight': '#4ade80',
      '--chart-line': '#22c55e',
      '--chart-bar': '#84cc16',
      '--font-family': 'ui-monospace, "Cascadia Code", "Source Code Pro", Menlo, monospace'
    }
  }
};

/**
 * Apply theme variables to a DOM element or iframe
 */
export function applyTheme(themeKey, targetElement = document.documentElement) {
  const theme = Themes[themeKey] || Themes.obsidian;
  for (const [key, value] of Object.entries(theme.vars)) {
    targetElement.style.setProperty(key, value);
  }
  return theme;
}

/**
 * Generate CSS variable rules string for embedding into standalone HTML export
 */
export function getThemeCssRule(themeKey) {
  const theme = Themes[themeKey] || Themes.obsidian;
  const entries = Object.entries(theme.vars)
    .map(([key, val]) => `  ${key}: ${val};`)
    .join('\n');
  return `:root {\n${entries}\n}`;
}
