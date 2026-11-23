/**
 * Interactive SVG Data Science Visualizers
 * High performance, zero external dependencies, responsive, theme-aware, and interactive.
 */

/**
 * Renders an Interactive ROC Curve with draggable decision threshold and dynamic confusion matrix
 */
export function renderRocCurve(containerId, options = {}) {
  const auc = options.auc || 0.952;
  const initialThreshold = options.threshold || 0.50;

  // Generate smooth ROC curve coordinates
  const points = [];
  const count = 30;
  for (let i = 0; i <= count; i++) {
    const fpr = i / count;
    // Classic power curve simulation for ROC
    const tpr = Math.min(1.0, Math.pow(fpr, 0.22) * 0.98 + (fpr * 0.02));
    points.push({ fpr, tpr });
  }

  const svgW = 380;
  const svgH = 200;
  const padL = 40;
  const padB = 30;
  const padT = 15;
  const padR = 20;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const pathD = points.map((p, idx) => {
    const x = padL + p.fpr * plotW;
    const y = padT + (1 - p.tpr) * plotH;
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  const areaD = `${pathD} L ${padL + plotW} ${padT + plotH} L ${padL} ${padT + plotH} Z`;

  const html = `
    <div class="data-chart-widget roc-widget" data-auc="${auc}">
      <div class="chart-header">
        <span class="chart-title">Model ROC-AUC Curve</span>
        <span class="chart-badge">AUC = ${auc.toFixed(3)}</span>
      </div>
      <div class="chart-svg-container">
        <svg viewBox="0 0 ${svgW} ${svgH}" class="roc-svg" preserveAspectRatio="xMidYMid meet">
          <!-- Background Grid Lines -->
          <line x1="${padL}" y1="${padT}" x2="${padL + plotW}" y2="${padT}" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
          <line x1="${padL}" y1="${padT + plotH * 0.5}" x2="${padL + plotW}" y2="${padT + plotH * 0.5}" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
          <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--border-highlight)" />
          <line x1="${padL}" y1="${padT}" x2="${padL}" y2="${padT + plotH}" stroke="var(--border-highlight)" />
          <line x1="${padL + plotW * 0.5}" y1="${padT}" x2="${padL + plotW * 0.5}" y2="${padT + plotH}" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
          <line x1="${padL + plotW}" y1="${padT}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--border-subtle)" stroke-dasharray="2 2" />

          <!-- Random Guess Line -->
          <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT}" stroke="var(--text-dim)" stroke-dasharray="3 3" opacity="0.6" />

          <!-- Area under curve -->
          <path d="${areaD}" fill="var(--chart-line)" opacity="0.12" />

          <!-- ROC Curve -->
          <path d="${pathD}" fill="none" stroke="var(--chart-line)" stroke-width="2.5" stroke-linecap="round" />

          <!-- Active Operating Point -->
          <circle id="roc-point-${containerId}" cx="${padL + 0.12 * plotW}" cy="${padT + (1 - 0.94) * plotH}" r="6" fill="var(--accent-secondary)" stroke="#fff" stroke-width="2" />

          <!-- Axis Labels -->
          <text x="${padL + plotW / 2}" y="${svgH - 6}" text-anchor="middle" font-size="10" fill="var(--text-dim)">False Positive Rate (FPR)</text>
          <text x="12" y="${padT + plotH / 2}" text-anchor="middle" font-size="10" fill="var(--text-dim)" transform="rotate(-90 12,${padT + plotH / 2})">TPR (Recall)</text>
        </svg>
      </div>

      <!-- Interactive Operating Threshold Slider -->
      <div class="threshold-slider-group">
        <div class="slider-meta">
          <span>Decision Threshold: <strong id="thresh-val-${containerId}">${initialThreshold.toFixed(2)}</strong></span>
          <span id="f1-val-${containerId}" class="f1-badge">F1: 0.941</span>
        </div>
        <input type="range" class="chart-slider" id="slider-${containerId}" min="0.05" max="0.95" step="0.01" value="${initialThreshold}">
      </div>

      <!-- Dynamic Confusion Matrix Preview -->
      <div class="confusion-matrix-mini" id="cm-${containerId}">
        <div class="cm-cell tp">TP: <strong id="tp-${containerId}">9,420</strong></div>
        <div class="cm-cell fp">FP: <strong id="fp-${containerId}">310</strong></div>
        <div class="cm-cell fn">FN: <strong id="fn-${containerId}">580</strong></div>
        <div class="cm-cell tn">TN: <strong id="tn-${containerId}">19,690</strong></div>
      </div>
    </div>
  `;

  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = html;
    initRocSlider(containerId, padL, padT, plotW, plotH);
  }
  return html;
}

function initRocSlider(containerId, padL, padT, plotW, plotH) {
  const slider = document.getElementById(`slider-${containerId}`);
  if (!slider) return;

  const threshVal = document.getElementById(`thresh-val-${containerId}`);
  const f1Val = document.getElementById(`f1-val-${containerId}`);
  const pt = document.getElementById(`roc-point-${containerId}`);
  const tpEl = document.getElementById(`tp-${containerId}`);
  const fpEl = document.getElementById(`fp-${containerId}`);
  const fnEl = document.getElementById(`fn-${containerId}`);
  const tnEl = document.getElementById(`tn-${containerId}`);

  slider.addEventListener('input', (e) => {
    const t = parseFloat(e.target.value);
    threshVal.textContent = t.toFixed(2);

    // Compute synthetic metrics based on threshold
    const fpr = Math.max(0.01, Math.min(0.99, Math.pow(1 - t, 2.2)));
    const tpr = Math.max(0.05, Math.min(0.99, Math.pow(1 - (t * 0.4), 0.35)));

    const cx = padL + fpr * plotW;
    const cy = padT + (1 - tpr) * plotH;
    if (pt) {
      pt.setAttribute('cx', cx.toFixed(1));
      pt.setAttribute('cy', cy.toFixed(1));
    }

    const totalPositives = 10000;
    const totalNegatives = 20000;
    const tp = Math.round(totalPositives * tpr);
    const fn = totalPositives - tp;
    const fp = Math.round(totalNegatives * fpr);
    const tn = totalNegatives - fp;

    const precision = tp / (tp + fp);
    const f1 = (2 * precision * tpr) / (precision + tpr);

    if (f1Val) f1Val.textContent = `F1: ${f1.toFixed(3)}`;
    if (tpEl) tpEl.textContent = tp.toLocaleString();
    if (fpEl) fpEl.textContent = fp.toLocaleString();
    if (fnEl) fnEl.textContent = fn.toLocaleString();
    if (tnEl) tnEl.textContent = tn.toLocaleString();
  });
}

/**
 * Renders an Interactive Pipeline Throughput & Latency Timeline
 */
export function renderPipelineThroughput(containerId, options = {}) {
  const data = options.data || [
    { time: '00:00', throughput: 34, latency: 28 },
    { time: '04:00', throughput: 28, latency: 24 },
    { time: '08:00', throughput: 58, latency: 38 },
    { time: '12:00', throughput: 84, latency: 45 },
    { time: '16:00', throughput: 92, latency: 42 },
    { time: '20:00', throughput: 64, latency: 32 },
    { time: '23:59', throughput: 42, latency: 26 }
  ];

  const svgW = 380;
  const svgH = 190;
  const padL = 35;
  const padB = 25;
  const padT = 20;
  const padR = 35;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const maxT = 100; // 100k events/sec
  const maxL = 60;  // 60 ms

  const bars = data.map((d, i) => {
    const x = padL + (i / (data.length - 1)) * plotW - 10;
    const h = (d.throughput / maxT) * plotH;
    const y = padT + plotH - h;
    return `
      <rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="20" height="${h.toFixed(1)}" rx="3" fill="var(--chart-bar)" opacity="0.65" class="chart-bar-hover">
        <title>${d.time}: ${d.throughput}k events/sec</title>
      </rect>
    `;
  }).join('');

  const linePoints = data.map((d, i) => {
    const x = padL + (i / (data.length - 1)) * plotW;
    const y = padT + (1 - d.latency / maxL) * plotH;
    return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  const html = `
    <div class="data-chart-widget pipeline-widget">
      <div class="chart-header">
        <span class="chart-title">Real-Time Event Ingestion vs P95 Latency</span>
        <div class="chart-legend">
          <span class="legend-item"><span class="legend-color bar"></span> Throughput (k/s)</span>
          <span class="legend-item"><span class="legend-color line"></span> P95 Latency (ms)</span>
        </div>
      </div>
      <div class="chart-svg-container">
        <svg viewBox="0 0 ${svgW} ${svgH}" class="pipeline-svg" preserveAspectRatio="xMidYMid meet">
          <!-- Background Grid -->
          <line x1="${padL}" y1="${padT}" x2="${padL + plotW}" y2="${padT}" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
          <line x1="${padL}" y1="${padT + plotH * 0.5}" x2="${padL + plotW}" y2="${padT + plotH * 0.5}" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
          <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--border-highlight)" />

          <!-- Bars: Throughput -->
          ${bars}

          <!-- Line: Latency -->
          <path d="${linePoints}" fill="none" stroke="var(--chart-line)" stroke-width="2.5" stroke-linecap="round" />

          <!-- Line Points -->
          ${data.map((d, i) => {
            const x = padL + (i / (data.length - 1)) * plotW;
            const y = padT + (1 - d.latency / maxL) * plotH;
            return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4" fill="var(--chart-line)" stroke="var(--bg-surface)" stroke-width="1.5">
              <title>${d.time}: Latency ${d.latency}ms</title>
            </circle>`;
          }).join('')}

          <!-- X axis time ticks -->
          ${data.map((d, i) => {
            const x = padL + (i / (data.length - 1)) * plotW;
            return `<text x="${x.toFixed(1)}" y="${svgH - 8}" text-anchor="middle" font-size="9" fill="var(--text-dim)">${d.time}</text>`;
          }).join('')}
        </svg>
      </div>
      <div class="chart-summary-bar">
        <span>Peak: <strong>92k evt/s</strong></span>
        <span>Avg Latency: <strong>33.5 ms</strong></span>
        <span>SLA Reliability: <strong>99.98%</strong></span>
      </div>
    </div>
  `;

  const container = document.getElementById(containerId);
  if (container) container.innerHTML = html;
  return html;
}

/**
 * Renders a Feature Importance / Shapley Value Bar Chart
 */
export function renderFeatureImportance(containerId, options = {}) {
  const features = options.features || [
    { name: 'Dense Embedding Sim', score: 0.38, category: 'Semantic' },
    { name: 'BM25 Sparse Score', score: 0.24, category: 'Lexical' },
    { name: 'Document Freshness', score: 0.16, category: 'Temporal' },
    { name: 'Domain Authority', score: 0.12, category: 'Graph' },
    { name: 'User Interaction Affinity', score: 0.10, category: 'Behavioral' }
  ];

  const html = `
    <div class="data-chart-widget feature-widget">
      <div class="chart-header">
        <span class="chart-title">Top Feature Contribution (SHAP / Gain)</span>
        <span class="chart-badge">5 Key Predictors</span>
      </div>
      <div class="feature-bars-list">
        ${features.map(f => {
          const pct = Math.round(f.score * 100);
          return `
            <div class="feature-bar-row">
              <div class="feature-info">
                <span class="feature-name">${f.name}</span>
                <span class="feature-cat">${f.category}</span>
              </div>
              <div class="feature-track">
                <div class="feature-fill" style="width: ${pct}%;"></div>
              </div>
              <span class="feature-score">${(f.score).toFixed(2)}</span>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  const container = document.getElementById(containerId);
  if (container) container.innerHTML = html;
  return html;
}

/**
 * Renders Training Loss vs Validation Loss Curves
 */
export function renderLossCurve(containerId, options = {}) {
  const epochs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const trainLoss = [2.45, 1.62, 1.15, 0.88, 0.69, 0.54, 0.44, 0.37, 0.32, 0.28];
  const valLoss =   [2.52, 1.71, 1.28, 1.02, 0.86, 0.74, 0.69, 0.66, 0.65, 0.68];

  const svgW = 380;
  const svgH = 180;
  const padL = 35;
  const padB = 25;
  const padT = 20;
  const padR = 20;
  const plotW = svgW - padL - padR;
  const plotH = svgH - padT - padB;

  const maxLoss = 3.0;

  const trainD = epochs.map((e, idx) => {
    const x = padL + (idx / (epochs.length - 1)) * plotW;
    const y = padT + (trainLoss[idx] / maxLoss) * plotH;
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  const valD = epochs.map((e, idx) => {
    const x = padL + (idx / (epochs.length - 1)) * plotW;
    const y = padT + (valLoss[idx] / maxLoss) * plotH;
    return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
  }).join(' ');

  const html = `
    <div class="data-chart-widget loss-widget">
      <div class="chart-header">
        <span class="chart-title">Convergence: Train vs Validation Loss</span>
        <div class="chart-legend">
          <span class="legend-item"><span class="legend-color line"></span> Train</span>
          <span class="legend-item"><span class="legend-color val-line"></span> Val (Early Stop)</span>
        </div>
      </div>
      <div class="chart-svg-container">
        <svg viewBox="0 0 ${svgW} ${svgH}" class="loss-svg" preserveAspectRatio="xMidYMid meet">
          <line x1="${padL}" y1="${padT}" x2="${padL + plotW}" y2="${padT}" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
          <line x1="${padL}" y1="${padT + plotH * 0.5}" x2="${padL + plotW}" y2="${padT + plotH * 0.5}" stroke="var(--border-subtle)" stroke-dasharray="2 2" />
          <line x1="${padL}" y1="${padT + plotH}" x2="${padL + plotW}" y2="${padT + plotH}" stroke="var(--border-highlight)" />

          <!-- Train curve -->
          <path d="${trainD}" fill="none" stroke="var(--chart-line)" stroke-width="2" stroke-linecap="round" />

          <!-- Val curve -->
          <path d="${valD}" fill="none" stroke="var(--accent-secondary)" stroke-width="2" stroke-dasharray="3 3" stroke-linecap="round" />

          <!-- Best model checkpoint indicator -->
          <line x1="${padL + (8 / 9) * plotW}" y1="${padT}" x2="${padL + (8 / 9) * plotW}" y2="${padT + plotH}" stroke="var(--accent-primary)" stroke-width="1.5" stroke-dasharray="2 2" />
          <text x="${padL + (8 / 9) * plotW - 4}" y="${padT + 12}" text-anchor="end" font-size="8" fill="var(--accent-primary)">Best Checkpoint (Ep 9)</text>

          <!-- Epoch labels -->
          <text x="${padL}" y="${svgH - 6}" font-size="9" fill="var(--text-dim)">Ep 1</text>
          <text x="${padL + plotW * 0.5}" y="${svgH - 6}" text-anchor="middle" font-size="9" fill="var(--text-dim)">Ep 5</text>
          <text x="${padL + plotW}" y="${svgH - 6}" text-anchor="end" font-size="9" fill="var(--text-dim)">Ep 10</text>
        </svg>
      </div>
      <div class="chart-summary-bar">
        <span>Min Val Loss: <strong>0.652</strong></span>
        <span>Warmup Epochs: <strong>2</strong></span>
        <span>Optimizer: <strong>AdamW</strong></span>
      </div>
    </div>
  `;

  const container = document.getElementById(containerId);
  if (container) container.innerHTML = html;
  return html;
}

/**
 * Dispatches chart rendering based on project chartType
 */
export function renderProjectChart(containerId, chartType, options = {}) {
  switch (chartType) {
    case 'roc_curve':
      return renderRocCurve(containerId, options);
    case 'pipeline_throughput':
      return renderPipelineThroughput(containerId, options);
    case 'feature_importance':
      return renderFeatureImportance(containerId, options);
    case 'loss_curve':
      return renderLossCurve(containerId, options);
    default:
      return renderFeatureImportance(containerId, options);
  }
}
