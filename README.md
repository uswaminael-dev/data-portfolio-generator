# 📊 DataFolio — Professional Interactive Data Portfolio Generator

> An end-to-end portfolio engineering platform that transforms GitHub repositories, projects, data skills, and technical achievements into a stunning, interactive portfolio tailored for **Machine Learning Engineers**, **Data Scientists**, **Data Platform Architects**, and **Analytics Engineers**.

---

## 🌟 Highlights & Capabilities

### 🐙 Automated GitHub Ingestion & Smart Data Classifier
- **Instant Profile Analysis:** Ingest any public GitHub username or personal profile.
- **Data Stack Detection:** Scans repository names, topics, and descriptions to auto-detect libraries across 5 specialized disciplines:
  - **Machine Learning & AI:** PyTorch, TensorFlow, Hugging Face, Scikit-Learn, XGBoost, vLLM, LangChain, LlamaIndex, LoRA, OpenCV.
  - **Data Engineering & Lakehouses:** Apache Spark, Kafka, Apache Iceberg, Delta Lake, Flink, dbt, Polars, DuckDB, Airflow, Dagster.
  - **Databases & Vector Stores:** Snowflake, BigQuery, ClickHouse, PostgreSQL, Milvus, Pinecone, ChromaDB, Redis.
  - **Analytics & BI:** Streamlit, Plotly, Dash, Tableau, PowerBI, Superset, Metabase.
  - **Cloud & MLOps:** Triton Inference Server, MLflow, Docker, Kubernetes, AWS SageMaker, GCP Vertex AI.
- **Portfolio-Readiness Scoring:** Ranks repositories based on documentation completeness, star velocity, topics, and data-domain relevance.
- **1-Click Transformation:** Converts any repository into a structured production project card with business impact, dataset specs, architecture notes, and metric scorecards.

---

### 📈 Interactive Data Science & System Visualizers
Every project card can feature an interactive, zero-dependency SVG visualization:
1. **Interactive ROC-AUC Curve with Decision Threshold Slider:** Recruiters and hiring managers can drag the classification threshold slider (0.05 - 0.95) to see real-time changes in True Positive Rate, False Positive Rate, F1-Score, and a live confusion matrix (TP, FP, FN, TN).
2. **Real-Time Event Ingestion vs P95 Latency Timeline:** Interactive timeline displaying streaming throughput (k events/sec) paired with microsecond P95 latency and SLA guarantees.
3. **Feature Importance (SHAP / Gain) Bar Chart:** Displays top predictors with categorical tags and proportional weight bars.
4. **Training vs Validation Loss Convergence Curves:** Visualizes epoch loss with learning rate warmup and early stopping checkpoints.
5. **Interactive Hardware & LLM Inference Simulator:** Live lab widget inside the portfolio allowing visitors to configure model parameter size (7B, 14B, 34B, 70B), quantization format (FP16, INT8, INT4 AWQ), and context window (1k to 65k tokens) to dynamically estimate GPU VRAM requirement, Tokens/sec throughput, Time-to-First-Token (TTFT), and cloud cost per 1M tokens.

---

### 🎨 5 Precision-Crafted Themes for Data Professionals
- **Obsidian Data Lab:** Cybernetic emerald and cyan accents on deep obsidian.
- **Deep Neural Space:** Cosmic indigo, electric violet, and neon magenta highlights.
- **Executive Slate & Gold:** Sophisticated enterprise dark charcoal with warm champagne gold accents.
- **Nordic Light Research:** High-contrast publication-grade light theme with cobalt and slate accents.
- **Phosphor Matrix Terminal:** Monospace retro-futuristic terminal aesthetic with phosphor green telemetry.

---

### 📦 Multi-Format Export Suite
- **⚡ Standalone Single-File HTML Bundle:** Produces an entirely self-contained `portfolio.html` file with all CSS, responsive grids, interactive SVG charts, simulation scripts, and icons embedded. No build steps, no node_modules required—host directly on **GitHub Pages**, **Vercel**, **Netlify Drop**, or email as a standalone file.
- **📄 GitHub Profile `README.md` Generator:** Produces a markdown document ready to paste into your `<username>/<username>` repository, complete with Shields.io badges, impact metric tables, and project links.
- **💾 JSON Backup & Restore:** Export and import full portfolio configurations anytime.

---

## 🚀 Quick Start

### 1. Launch the Studio
```bash
# Navigate to the project directory
cd data-portfolio-generator

# Start the local server
node server.js
```

Open your browser to:
```
http://localhost:3000
```

### 2. Run Verification Tests
```bash
node test.js
```

---

## 📂 Project Architecture

```
data-portfolio-generator/
├── public/
│   ├── components/
│   │   ├── charts.js              # Interactive zero-dependency SVG data charts & sliders
│   │   ├── exporter.js            # Standalone HTML & GitHub README generation engine
│   │   ├── githubTransformer.js   # GitHub API ingestion, stack detection & scoring
│   │   ├── portfolioTemplates.js  # Pre-built personas (Alex Chen, Sophia Patel, Marcus Vance)
│   │   └── themes.js              # 5 precision-engineered CSS theme palettes
│   ├── app.js                     # Main studio state management & live preview sync
│   ├── styles.css                 # Studio UI styling & dark glassmorphic design
│   └── index.html                 # DataFolio Studio web application
├── package.json                   # Pure ES module configuration
├── server.js                      # High-speed Node.js static & API server
├── test.js                        # Automated unit & integration test suite
└── README.md                      # Documentation
```

---

## 👥 Pre-Configured Personas Included

- **Alex Chen:** Senior Machine Learning & LLM Systems Engineer (PyTorch, vLLM, Milvus, Kaggle Grandmaster)
- **Sophia Patel:** Principal Data Platform & Pipeline Architect (Apache Spark, Kafka, Iceberg, dbt, Snowflake)
- **Marcus Vance:** Staff Analytics Engineer & BI Strategist (dbt Core, BigQuery, DuckDB, Streamlit, Executive KPIs)

---

## 📜 License
MIT License. Built for the global data and machine learning engineering community.
