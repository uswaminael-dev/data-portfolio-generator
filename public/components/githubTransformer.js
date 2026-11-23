/**
 * GitHub Ingestion & Transformer Engine
 * Parses raw GitHub API profiles and repositories, identifies data & ML tech stacks,
 * scores portfolio readiness, and transforms repos into high-impact data project cards.
 */

export const DataTechKeywords = {
  ml_ai: [
    'pytorch', 'torch', 'tensorflow', 'keras', 'huggingface', 'transformers',
    'scikit-learn', 'sklearn', 'xgboost', 'lightgbm', 'catboost', 'langchain',
    'llamaindex', 'rag', 'llm', 'fine-tuning', 'lora', 'diffusion', 'yolo',
    'opencv', 'nlp', 'deep-learning', 'machine-learning', 'reinforcement-learning',
    'vllm', 'ollama', 'onnx', 'tensorrt', 'spacy', 'nltk', 'gemini', 'openai'
  ],
  data_eng: [
    'spark', 'pyspark', 'kafka', 'airflow', 'dbt', 'polars', 'pandas', 'duckdb',
    'ray', 'prefect', 'dagster', 'flink', 'etl', 'elt', 'pipeline', 'lakehouse',
    'databricks', 'delta-lake', 'iceberg', 'hudi', 'data-warehouse', 'streaming'
  ],
  databases: [
    'snowflake', 'bigquery', 'clickhouse', 'postgresql', 'postgres', 'redshift',
    'redis', 'pinecone', 'chromadb', 'weaviate', 'milvus', 'qdrant', 'mongodb',
    'mysql', 'sqlite', 'neo4j', 'cassandra', 'scylladb', 'vector-database'
  ],
  analytics_viz: [
    'streamlit', 'plotly', 'dash', 'gradio', 'superset', 'metabase', 'tableau',
    'powerbi', 'matplotlib', 'seaborn', 'd3', 'd3js', 'altair', 'bokeh', 'eda'
  ],
  mlops_cloud: [
    'docker', 'kubernetes', 'k8s', 'mlflow', 'wandb', 'dvc', 'triton', 'sagemaker',
    'vertex-ai', 'azure-ml', 'terraform', 'fastapi', 'flask', 'bento-ml', 'aws', 'gcp', 'azure'
  ]
};

export const DataDomainLabels = {
  ml_ai: 'Machine Learning & AI',
  data_eng: 'Data Engineering & Pipelines',
  databases: 'Databases & Storage',
  analytics_viz: 'Analytics & Dashboards',
  mlops_cloud: 'MLOps & Cloud Infrastructure'
};

/**
 * Fetch GitHub profile details and public repositories
 */
export async function fetchGitHubUserData(username, token = '') {
  const headers = {
    Accept: 'application/vnd.github.v3+json'
  };
  if (token) {
    headers.Authorization = `token ${token}`;
  }

  // Fetch user profile
  const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, { headers });
  if (!userRes.ok) {
    if (userRes.status === 404) throw new Error(`GitHub user "${username}" was not found.`);
    if (userRes.status === 403) throw new Error(`GitHub API rate limit exceeded. Provide a personal access token or try demo personas.`);
    throw new Error(`GitHub error: ${userRes.statusText}`);
  }
  const user = await userRes.json();

  // Fetch repositories (up to 100 per page, sorted by updated)
  const reposRes = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`, { headers });
  if (!reposRes.ok) {
    throw new Error(`Failed to fetch repositories for ${username}`);
  }
  const rawRepos = await reposRes.json();

  // Filter out forks if desired, or keep non-forks prioritized
  const processedRepos = rawRepos.map(repo => analyzeRepository(repo));

  // Sort by portfolio readiness score descending
  processedRepos.sort((a, b) => b.readinessScore - a.readinessScore);

  return {
    profile: {
      username: user.login,
      name: user.name || user.login,
      avatarUrl: user.avatar_url,
      bio: user.bio || 'Data Scientist & Machine Learning Specialist',
      company: user.company || '',
      location: user.location || 'Remote',
      blog: user.blog || '',
      twitter: user.twitter_username || '',
      email: user.email || '',
      publicReposCount: user.public_repos,
      followers: user.followers,
      following: user.following,
      createdAt: user.created_at
    },
    repositories: processedRepos
  };
}

/**
 * Analyzes a single repository for data stacks, domain category, readiness, and metrics
 */
export function analyzeRepository(repo) {
  const textBlob = `${repo.name} ${repo.description || ''} ${(repo.topics || []).join(' ')} ${repo.language || ''}`.toLowerCase();

  const detectedStacks = new Set();
  const domainScores = {
    ml_ai: 0,
    data_eng: 0,
    databases: 0,
    analytics_viz: 0,
    mlops_cloud: 0
  };

  // Primary language detection
  if (repo.language) {
    detectedStacks.add(repo.language);
    if (['Python', 'Jupyter Notebook', 'R', 'Julia'].includes(repo.language)) {
      domainScores.ml_ai += 2;
      domainScores.analytics_viz += 1;
    } else if (['SQL', 'Scala'].includes(repo.language)) {
      domainScores.data_eng += 3;
    }
  }

  // Topic & Keyword scanning
  for (const [domain, keywords] of Object.entries(DataTechKeywords)) {
    for (const kw of keywords) {
      if (textBlob.includes(kw)) {
        detectedStacks.add(formatTechName(kw));
        domainScores[domain] += 2;
      }
    }
  }

  // Determine top domain
  let topDomain = 'ml_ai';
  let maxScore = -1;
  for (const [domain, score] of Object.entries(domainScores)) {
    if (score > maxScore) {
      maxScore = score;
      topDomain = domain;
    }
  }

  // Calculate readiness score (0 - 100)
  let score = 30; // base score
  if (repo.description && repo.description.length > 25) score += 20;
  if (repo.topics && repo.topics.length > 0) score += Math.min(repo.topics.length * 4, 20);
  if (repo.stargazers_count > 0) score += Math.min(repo.stargazers_count * 3, 20);
  if (!repo.fork) score += 10;
  if (maxScore > 0) score += 10;
  score = Math.min(score, 100);

  // Suggested project metrics based on repo stats
  const suggestedMetrics = [];
  if (repo.stargazers_count > 0) {
    suggestedMetrics.push({ label: 'GitHub Stars', value: `${repo.stargazers_count} ★` });
  }
  if (repo.forks_count > 0) {
    suggestedMetrics.push({ label: 'Forks', value: `${repo.forks_count}` });
  }

  // Synthetic or inferred metrics for data projects
  const defaultMetricsByDomain = {
    ml_ai: [
      { label: 'Evaluation Metric', value: '0.942 F1' },
      { label: 'Inference Latency', value: '< 24 ms' }
    ],
    data_eng: [
      { label: 'Daily Throughput', value: '45M events' },
      { label: 'SLA Delivery', value: '99.98%' }
    ],
    analytics_viz: [
      { label: 'Active Stakeholders', value: '1.2k users' },
      { label: 'Query Latency', value: '< 300 ms' }
    ],
    databases: [
      { label: 'Dataset Footprint', value: '8.4 TB' },
      { label: 'Query Speedup', value: '4.8x' }
    ],
    mlops_cloud: [
      { label: 'Model Uptime', value: '99.95%' },
      { label: 'Cold Start', value: '< 1.8s' }
    ]
  };

  const domainDefaults = defaultMetricsByDomain[topDomain] || defaultMetricsByDomain.ml_ai;
  for (const item of domainDefaults) {
    if (suggestedMetrics.length < 3) {
      suggestedMetrics.push(item);
    }
  }

  return {
    id: repo.id,
    name: repo.name,
    fullName: repo.full_name,
    description: repo.description || 'Open-source data project repository with complete pipelines and documentation.',
    htmlUrl: repo.html_url,
    homepage: repo.homepage || '',
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    openIssues: repo.open_issues_count,
    language: repo.language || 'Python',
    topics: repo.topics || [],
    isFork: repo.fork,
    updatedAt: repo.updated_at,
    detectedDomain: topDomain,
    domainLabel: DataDomainLabels[topDomain],
    detectedStacks: Array.from(detectedStacks).slice(0, 8),
    readinessScore: score,
    suggestedMetrics
  };
}

/**
 * Transforms a selected GitHub repository into a full professional Data Project Object
 */
export function transformRepoToProject(repo) {
  // Generate human-friendly title
  const formattedTitle = repo.name
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Default chart type selection depending on domain
  let chartType = 'metrics';
  if (repo.detectedDomain === 'ml_ai') chartType = 'roc_curve';
  else if (repo.detectedDomain === 'data_eng') chartType = 'pipeline_throughput';
  else if (repo.detectedDomain === 'analytics_viz') chartType = 'feature_importance';
  else chartType = 'correlation_bars';

  return {
    id: `proj_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    title: formattedTitle,
    category: repo.domainLabel,
    domainKey: repo.detectedDomain,
    summary: repo.description,
    businessImpact: `Engineered an automated end-to-end pipeline that slashed processing overhead by 42% and delivered validated real-time data insights.`,
    datasetDetails: 'Custom multi-modal dataset (1.2M records, partitioned by date and tenant)',
    architecture: `Modular architecture featuring Python, containerized microservices, automated regression tests, and distributed processing.`,
    techStack: repo.detectedStacks.length > 0 ? repo.detectedStacks : ['Python', 'SQL', 'Docker', 'FastAPI'],
    metrics: repo.suggestedMetrics || [
      { label: 'Primary Score', value: '94.8%' },
      { label: 'Latency', value: '18 ms' },
      { label: 'Scale', value: '2.4M rows' }
    ],
    chartType,
    githubUrl: repo.htmlUrl,
    demoUrl: repo.homepage || '',
    notebookUrl: '',
    paperUrl: '',
    featured: repo.readinessScore > 75,
    lastUpdated: repo.updatedAt ? new Date(repo.updatedAt).toLocaleDateString() : 'Recent'
  };
}

function formatTechName(tech) {
  const dictionary = {
    'pytorch': 'PyTorch',
    'tensorflow': 'TensorFlow',
    'scikit-learn': 'Scikit-Learn',
    'sklearn': 'Scikit-Learn',
    'xgboost': 'XGBoost',
    'lightgbm': 'LightGBM',
    'catboost': 'CatBoost',
    'huggingface': 'Hugging Face',
    'transformers': 'Transformers',
    'langchain': 'LangChain',
    'llamaindex': 'LlamaIndex',
    'fastapi': 'FastAPI',
    'pyspark': 'Apache Spark',
    'spark': 'Apache Spark',
    'kafka': 'Apache Kafka',
    'airflow': 'Apache Airflow',
    'snowflake': 'Snowflake',
    'bigquery': 'Google BigQuery',
    'clickhouse': 'ClickHouse',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'duckdb': 'DuckDB',
    'polars': 'Polars',
    'pandas': 'Pandas',
    'streamlit': 'Streamlit',
    'docker': 'Docker',
    'kubernetes': 'Kubernetes',
    'mlflow': 'MLflow',
    'dbt': 'dbt',
    'ray': 'Ray',
    'vllm': 'vLLM',
    'pinecone': 'Pinecone',
    'chromadb': 'ChromaDB',
    'weaviate': 'Weaviate'
  };
  return dictionary[tech.toLowerCase()] || tech.charAt(0).toUpperCase() + tech.slice(1);
}
