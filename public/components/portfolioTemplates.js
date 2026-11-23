/**
 * Default Data Portfolio Models & Curated Industry Personas
 * Covers ML Engineering, Data Engineering, and Analytics Engineering
 */

export const Personas = {
  alex_chen: {
    id: 'alex_chen',
    name: 'Alex Chen',
    title: 'Senior Machine Learning & LLM Systems Engineer',
    headline: 'Designing production-grade LLM architectures, fine-tuning pipelines, and high-throughput inference engines.',
    bio: 'ML Engineer with 6+ years of experience operationalizing deep learning and transformer models. Former Tech Lead for conversational AI infrastructure. Passionate about efficient inference, quantization, RAG evaluation frameworks, and scalable model serving.',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    location: 'San Francisco, CA (Open to Remote)',
    status: 'Actively Interviewing for Staff / Senior ML Roles',
    email: 'alex.chen.ml@gmail.com',
    website: 'https://alexchen-ai.dev',
    github: 'https://github.com/alexchen-ml',
    linkedin: 'https://linkedin.com/in/alexchen-ai',
    twitter: 'https://twitter.com/alexchen_ai',
    kaggle: 'https://kaggle.com/alexchen_gm',
    scholar: 'https://scholar.google.com/citations?user=alexchen',
    resumeUrl: '#',
    stats: [
      { label: 'Models in Production', value: '18+' },
      { label: 'Inference P99 Latency', value: '< 16ms' },
      { label: 'Kaggle Competition Rank', value: 'Grandmaster #42' },
      { label: 'GitHub Stars', value: '3.4k' }
    ],
    theme: 'obsidian',
    playground: {
      title: 'Interactive LLM Decision & Latency Explorer',
      description: 'Simulate the trade-offs between Quantization Precision (FP16 vs INT8 vs INT4), Context Window Length, and TTFT (Time to First Token) on an inference cluster.',
      enabled: true,
      defaultType: 'llm_latency'
    },
    projects: [
      {
        id: 'proj_1',
        title: 'Chronos-RAG: Low-Latency Hybrid Search Engine',
        category: 'Machine Learning & AI',
        domainKey: 'ml_ai',
        summary: 'Architected an enterprise retrieval-augmented generation engine with hybrid sparse-dense indexing and dynamic reranking.',
        businessImpact: 'Reduced context retrieval latency from 450ms to 42ms while increasing answer faithfulness from 74% to 93.6% on proprietary domain benchmarks.',
        datasetDetails: 'Indexed 4.8M technical documents across 34 engineering teams with Milvus vector DB and BM25 hybrid fusion.',
        architecture: 'vLLM cluster with continuous batching, quantized bi-encoder embeddings, and Cross-Encoder reranker deployed on Kubernetes with Triton.',
        techStack: ['PyTorch', 'vLLM', 'Milvus', 'Hugging Face', 'FastAPI', 'Docker', 'Kubernetes'],
        metrics: [
          { label: 'Latency P95', value: '42 ms' },
          { label: 'Faithfulness', value: '93.6%' },
          { label: 'Docs Indexed', value: '4.8M' }
        ],
        chartType: 'roc_curve',
        githubUrl: 'https://github.com/alexchen-ml/chronos-rag',
        demoUrl: 'https://demo.chronos-rag.dev',
        notebookUrl: 'https://colab.research.google.com',
        paperUrl: 'https://arxiv.org/abs/2309.00000',
        featured: true,
        lastUpdated: 'Nov 2026'
      },
      {
        id: 'proj_2',
        title: 'EdgeVision-YOLO: Autonomous Defect Classifier',
        category: 'Computer Vision & Edge ML',
        domainKey: 'ml_ai',
        summary: 'Trained and deployed real-time surface anomaly detection models for automated robotic assembly lines operating at 120 FPS.',
        businessImpact: 'Decreased manufacturing false-positive defect rate by 58%, yielding an estimated $380,000 in annual salvage value.',
        datasetDetails: 'Annotated 140,000 multi-spectral factory floor camera captures with synthesized defect augmentations.',
        architecture: 'Custom pruned YOLOv10 backbone exported via TensorRT engine running on NVIDIA Jetson Orin microcomputers.',
        techStack: ['PyTorch', 'TensorRT', 'OpenCV', 'CUDA', 'Python', 'Docker'],
        metrics: [
          { label: 'Inference Speed', value: '120 FPS' },
          { label: 'mAP@50', value: '0.964' },
          { label: 'False Rejects', value: '-58%' }
        ],
        chartType: 'feature_importance',
        githubUrl: 'https://github.com/alexchen-ml/edgevision-yolo',
        demoUrl: 'https://edgevision.dev',
        notebookUrl: '',
        paperUrl: '',
        featured: true,
        lastUpdated: 'Oct 2026'
      },
      {
        id: 'proj_3',
        title: 'Speculative-Dec: Accelerated Multi-Token Drafter',
        category: 'Machine Learning & AI',
        domainKey: 'ml_ai',
        summary: 'Implemented a lightweight speculative decoding framework pairing a 70B parameter LLM with a specialized 1.3B draft model.',
        businessImpact: 'Achieved a 2.4x wall-clock speedup on generation tokens per second with zero loss in target distribution fidelity.',
        datasetDetails: 'Trained on 25B tokens of synthetic reasoning chains curated with rejection sampling.',
        architecture: 'Custom CUDA kernels for speculative tree verification and KV-cache reuse.',
        techStack: ['PyTorch', 'CUDA', 'C++', 'vLLM', 'Triton', 'Hugging Face'],
        metrics: [
          { label: 'Throughput Speedup', value: '2.4x' },
          { label: 'Acceptance Rate', value: '78.2%' },
          { label: 'KV Cache Saved', value: '40%' }
        ],
        chartType: 'loss_curve',
        githubUrl: 'https://github.com/alexchen-ml/speculative-dec',
        demoUrl: '',
        notebookUrl: '',
        paperUrl: 'https://arxiv.org/abs/2401.00000',
        featured: false,
        lastUpdated: 'Sep 2026'
      }
    ],
    skills: {
      ml_dl: [
        { name: 'PyTorch / TorchScript', level: 95 },
        { name: 'Transformers & LLMs', level: 95 },
        { name: 'vLLM & TensorRT-LLM', level: 90 },
        { name: 'LoRA / PEFT Fine-Tuning', level: 92 },
        { name: 'Scikit-Learn & XGBoost', level: 90 }
      ],
      data_eng: [
        { name: 'Milvus & Pinecone (Vector DBs)', level: 88 },
        { name: 'Polars & Pandas', level: 94 },
        { name: 'Ray & Distributed Training', level: 85 },
        { name: 'Apache Spark', level: 75 }
      ],
      cloud_mlops: [
        { name: 'Docker & Kubernetes', level: 90 },
        { name: 'Triton Inference Server', level: 88 },
        { name: 'MLflow & Weights & Biases', level: 92 },
        { name: 'AWS SageMaker & EC2', level: 85 }
      ],
      languages: [
        { name: 'Python (Expert)', level: 98 },
        { name: 'C++ / CUDA', level: 82 },
        { name: 'SQL', level: 88 },
        { name: 'Bash & Shell', level: 85 }
      ]
    },
    experience: [
      {
        role: 'Senior Machine Learning Engineer',
        company: 'Synthetix AI Systems',
        period: '2023 - Present',
        location: 'San Francisco, CA',
        bullets: [
          'Spearheaded development of core enterprise RAG pipeline serving 14M user queries monthly with sub-50ms latency.',
          'Formulated automatic model distillation workflow, shrinking 34B parameter reasoning models to 7B with 96% task retention.',
          'Built custom continuous evaluation harness tracking hallucination metrics, grounding rates, and latency anomalies.'
        ]
      },
      {
        role: 'Machine Learning Engineer',
        company: 'Apex Data Labs',
        period: '2021 - 2023',
        location: 'San Jose, CA',
        bullets: [
          'Productionized computer vision fault-detection models on 45 edge compute devices across manufacturing client sites.',
          'Reduced cloud training compute expenditure by $120k annually by instituting mixed-precision FP16 and Spot instance orchestration.'
        ]
      }
    ],
    education: [
      {
        degree: 'M.S. in Computer Science (Machine Learning Specialization)',
        institution: 'Stanford University',
        year: '2021',
        details: 'Thesis: "Self-Supervised Representation Learning for High-Noise Sensor Telemetry"'
      },
      {
        degree: 'B.S. in Applied Mathematics & Statistics',
        institution: 'UC Berkeley',
        year: '2019',
        details: 'Summa Cum Laude, Dean’s Honors List'
      }
    ],
    achievements: [
      {
        title: 'Kaggle Competitions Grandmaster',
        issuer: 'Kaggle',
        badge: 'Top 0.05% Worldwide',
        date: '2024',
        link: 'https://kaggle.com'
      },
      {
        title: 'NeurIPS 2024 Workshop Best Paper',
        issuer: 'NeurIPS',
        badge: 'Primary Author',
        date: '2024',
        link: 'https://neurips.cc'
      },
      {
        title: 'AWS Certified Machine Learning Specialty',
        issuer: 'Amazon Web Services',
        badge: 'Certified',
        date: '2023',
        link: '#'
      }
    ]
  },

  sophia_patel: {
    id: 'sophia_patel',
    name: 'Sophia Patel',
    title: 'Principal Data Platform & Pipeline Architect',
    headline: 'Building petabyte-scale real-time Lakehouses, streaming CDC architectures, and high-resiliency data platforms.',
    bio: 'Data Platform Engineer with 8+ years designing fault-tolerant distributed pipelines. Veteran of transitioning legacy warehouses to Apache Iceberg and Databricks lakehouses processing over 250M events daily.',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    location: 'Austin, TX (Remote)',
    status: 'Available for Principal Architecture & Lead Roles',
    email: 'sophia.patel.data@gmail.com',
    website: 'https://sophiapatel-data.io',
    github: 'https://github.com/sophiapatel-data',
    linkedin: 'https://linkedin.com/in/sophiapatel-data',
    twitter: '',
    kaggle: '',
    scholar: '',
    resumeUrl: '#',
    stats: [
      { label: 'Events Streamed Daily', value: '250M+' },
      { label: 'Data Lake Scale', value: '4.2 PB' },
      { label: 'Pipeline SLA Reliability', value: '99.98%' },
      { label: 'Query Cost Slashed', value: '48%' }
    ],
    theme: 'deep_neural',
    playground: {
      title: 'Interactive Pipeline SLA & Partitioning Simulator',
      description: 'Explore the trade-offs of micro-batching intervals, shuffle partitions, and Iceberg compaction frequency on end-to-end pipeline latency and dollar cost.',
      enabled: true,
      defaultType: 'pipeline_throughput'
    },
    projects: [
      {
        id: 'proj_sp_1',
        title: 'AuraStream: Low-Latency CDC Lakehouse Ingestion',
        category: 'Data Engineering & Pipelines',
        domainKey: 'data_eng',
        summary: 'Designed a zero-data-loss Change Data Capture (CDC) engine streaming 60k row mutations per second from PostgreSQL to Apache Iceberg.',
        businessImpact: 'Cut analytics warehouse replication lag from 4 hours to under 30 seconds while eliminating \$65k in unoptimized Snowflake credits.',
        datasetDetails: '250 million daily records ingestion across 48 sharded transactional clusters into Apache Iceberg on AWS S3.',
        architecture: 'Debezium connector with Kafka, Apache Flink for real-time deduplication and enrichment, streaming writes to Iceberg tables with automated compaction.',
        techStack: ['Apache Kafka', 'Apache Flink', 'Apache Iceberg', 'AWS S3', 'PostgreSQL', 'Docker', 'Terraform'],
        metrics: [
          { label: 'Replication Lag', value: '< 30s' },
          { label: 'Peak Throughput', value: '60k evt/s' },
          { label: 'Data Loss Rate', value: '0.000%' }
        ],
        chartType: 'pipeline_throughput',
        githubUrl: 'https://github.com/sophiapatel-data/aurastream-cdc',
        demoUrl: '',
        notebookUrl: '',
        paperUrl: '',
        featured: true,
        lastUpdated: 'Nov 2026'
      },
      {
        id: 'proj_sp_2',
        title: 'Polars-ETL: High-Speed Financial Feature Pipeline',
        category: 'Data Engineering & Pipelines',
        domainKey: 'data_eng',
        summary: 'Re-engineered legacy PySpark batch jobs into single-node vectorized Polars pipelines for algorithmic backtesting.',
        businessImpact: 'Reduced nightly batch run-time from 4.2 hours down to 18 minutes on 1/4 of previous cloud compute spend.',
        datasetDetails: '15 years of tick-by-tick market depth data (1.8 TB Parquet files on cloud storage).',
        architecture: 'Vectorized Rust-backed Polars engine orchestrated with Dagster and DuckDB for fast local analytical verification.',
        techStack: ['Polars', 'Python', 'DuckDB', 'Dagster', 'Apache Parquet', 'AWS S3'],
        metrics: [
          { label: 'Runtime Reduction', value: '-92%' },
          { label: 'Compute Cost', value: '-75%' },
          { label: 'Memory Footprint', value: '28 GB' }
        ],
        chartType: 'feature_importance',
        githubUrl: 'https://github.com/sophiapatel-data/polars-etl-bench',
        demoUrl: '',
        notebookUrl: '',
        paperUrl: '',
        featured: true,
        lastUpdated: 'Oct 2026'
      }
    ],
    skills: {
      data_eng: [
        { name: 'Apache Spark / PySpark', level: 96 },
        { name: 'Apache Kafka & Flink', level: 92 },
        { name: 'Apache Iceberg & Delta Lake', level: 94 },
        { name: 'dbt (Data Build Tool)', level: 90 },
        { name: 'Polars & DuckDB', level: 92 },
        { name: 'Airflow & Dagster', level: 88 }
      ],
      databases: [
        { name: 'Snowflake & BigQuery', level: 94 },
        { name: 'PostgreSQL & ClickHouse', level: 90 },
        { name: 'Redis & DynamoDB', level: 85 }
      ],
      cloud_mlops: [
        { name: 'AWS (S3, EMR, Athena, Glue)', level: 95 },
        { name: 'Terraform & Infrastructure as Code', level: 88 },
        { name: 'Docker & Kubernetes', level: 86 }
      ],
      languages: [
        { name: 'Python', level: 96 },
        { name: 'SQL (Expert Tuning)', level: 98 },
        { name: 'Scala / Java', level: 84 },
        { name: 'Bash', level: 88 }
      ]
    },
    experience: [
      {
        role: 'Principal Data Platform Engineer',
        company: 'Vanguard Data Systems',
        period: '2022 - Present',
        location: 'Austin, TX',
        bullets: [
          'Engineered migration of 4.2PB monolithic Hadoop cluster to modern modular Lakehouse on Iceberg and Snowflake.',
          'Instituted automated schema contract governance and Great Expectations data quality gates catching 99.4% of pipeline regressions.',
          'Mentored team of 11 data and analytics engineers across 3 time zones.'
        ]
      }
    ],
    education: [
      {
        degree: 'B.S. in Computer Science',
        institution: 'University of Texas at Austin',
        year: '2016',
        details: 'Concentration in Distributed Systems & Databases'
      }
    ],
    achievements: [
      {
        title: 'Databricks Certified Lead Data Engineer',
        issuer: 'Databricks',
        badge: 'Professional',
        date: '2024',
        link: '#'
      },
      {
        title: 'Snowflake SnowPro Advanced Architect',
        issuer: 'Snowflake',
        badge: 'Advanced',
        date: '2023',
        link: '#'
      }
    ]
  },

  marcus_vance: {
    id: 'marcus_vance',
    name: 'Marcus Vance',
    title: 'Staff Analytics Engineer & BI Strategist',
    headline: 'Translating complex data meshes into executive decision velocity and trusted data models.',
    bio: 'Data strategist and analytics engineer with deep expertise in dbt modeling, modern semantic layers, exploratory data analysis, and interactive C-suite executive dashboards.',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    location: 'New York, NY',
    status: 'Open to Head of Analytics & Staff Analytics Roles',
    email: 'marcus.vance.analytics@gmail.com',
    website: 'https://marcusvance.biz',
    github: 'https://github.com/marcusvance-bi',
    linkedin: 'https://linkedin.com/in/marcusvance',
    twitter: '',
    kaggle: '',
    scholar: '',
    resumeUrl: '#',
    stats: [
      { label: 'dbt Models Maintained', value: '450+' },
      { label: 'Daily Dashboard Views', value: '4.8k' },
      { label: 'Warehouse Query Speedup', value: '3.8x' },
      { label: 'Data Quality Pass Rate', value: '99.9%' }
    ],
    theme: 'executive',
    playground: {
      title: 'Interactive Executive Forecasting & Elasticity Explorer',
      description: 'Explore customer lifetime value (LTV) and CAC elasticity curves with interactive growth levers and cohort decay modeling.',
      enabled: true,
      defaultType: 'ltv_simulation'
    },
    projects: [
      {
        id: 'proj_mv_1',
        title: 'Pulse-Metric: Universal Semantic Data Layer',
        category: 'Analytics & Dashboards',
        domainKey: 'analytics_viz',
        summary: 'Standardized 120 key business metrics across finance, product, and growth into a single version of truth using dbt semantic layer and Cube.',
        businessImpact: 'Eliminated conflicting board metrics across divisions and shaved 8 hours/week off weekly financial reporting cycles.',
        datasetDetails: 'Aggregated 85M revenue and subscription events from Stripe, Salesforce, and Product Telemetry in BigQuery.',
        architecture: 'dbt Core with strict semantic manifests, materialized rollups, and Cube.js caching layer connected to Tableau & Streamlit.',
        techStack: ['dbt', 'Google BigQuery', 'Cube.js', 'Streamlit', 'Python', 'SQL', 'Git'],
        metrics: [
          { label: 'Metrics Unified', value: '120 KPIs' },
          { label: 'Query Latency', value: '< 280ms' },
          { label: 'Reporting Speed', value: '10x faster' }
        ],
        chartType: 'correlation_bars',
        githubUrl: 'https://github.com/marcusvance-bi/pulse-semantic-layer',
        demoUrl: '',
        notebookUrl: '',
        paperUrl: '',
        featured: true,
        lastUpdated: 'Nov 2026'
      }
    ],
    skills: {
      analytics_viz: [
        { name: 'dbt (Modeling & Testing)', level: 98 },
        { name: 'Streamlit & Plotly Dash', level: 92 },
        { name: 'Tableau & PowerBI', level: 94 },
        { name: 'Statistical Experimentation & A/B Testing', level: 90 },
        { name: 'Cohort & LTV Modeling', level: 92 }
      ],
      databases: [
        { name: 'Google BigQuery & Snowflake', level: 95 },
        { name: 'DuckDB for Analytics', level: 90 },
        { name: 'PostgreSQL', level: 88 }
      ],
      languages: [
        { name: 'Advanced SQL (Window functions, CTEs)', level: 99 },
        { name: 'Python (Pandas, Statsmodels)', level: 90 },
        { name: 'R (ggplot2, tidyverse)', level: 84 }
      ]
    },
    experience: [
      {
        role: 'Staff Analytics Engineer',
        company: 'Apex Growth Platforms',
        period: '2022 - Present',
        location: 'New York, NY',
        bullets: [
          'Architected global semantic layer serving 4,800 daily report consumers.',
          'Reduced BigQuery cloud compute expenditure by $180k through partition clustering and incremental dbt models.'
        ]
      }
    ],
    education: [
      {
        degree: 'B.S. in Economics & Data Analysis',
        institution: 'Columbia University',
        year: '2017',
        details: 'Concentration in Econometrics & Decision Modeling'
      }
    ],
    achievements: [
      {
        title: 'dbt Certified Developer',
        issuer: 'dbt Labs',
        badge: 'Certified Master',
        date: '2024',
        link: '#'
      }
    ]
  }
};

/**
 * Returns a cloned deep copy of a persona state
 */
export function getPersonaClone(personaKey = 'alex_chen') {
  const persona = Personas[personaKey] || Personas.alex_chen;
  return JSON.parse(JSON.stringify(persona));
}
