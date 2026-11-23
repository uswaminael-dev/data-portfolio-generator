/**
 * Vercel Serverless Catch-All Function: /api/github/*
 * Safely forwards requests to GitHub REST API while preserving query parameters.
 */

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return;
  }

  // Safely reconstruct the target GitHub endpoint path
  let endpointPath = '';
  if (req.query && req.query.path) {
    const pathSegments = Array.isArray(req.query.path) ? req.query.path : [req.query.path];
    endpointPath = pathSegments
      .map(seg => String(seg).trim())
      .filter(seg => seg && seg !== '..')
      .join('/');
  } else if (req.url) {
    const urlObj = new URL(req.url, 'http://localhost');
    endpointPath = urlObj.pathname
      .replace(/^\/api\/github\/?/, '')
      .split('/')
      .filter(seg => seg && seg !== '..')
      .join('/');
  }

  // Safely preserve and reconstruct query parameters (excluding the routing key 'path')
  const queryParams = new URLSearchParams();
  if (req.query) {
    for (const [key, val] of Object.entries(req.query)) {
      if (key === 'path') continue;
      if (Array.isArray(val)) {
        val.forEach(v => queryParams.append(key, v));
      } else if (val !== undefined && val !== null) {
        queryParams.append(key, val);
      }
    }
  } else if (req.url && req.url.includes('?')) {
    const rawSearch = req.url.slice(req.url.indexOf('?'));
    const parsedParams = new URLSearchParams(rawSearch);
    parsedParams.delete('path');
    for (const [k, v] of parsedParams.entries()) {
      queryParams.append(k, v);
    }
  }

  const queryString = queryParams.toString() ? `?${queryParams.toString()}` : '';
  const targetUrl = `https://api.github.com/${endpointPath}${queryString}`;

  try {
    const headers = {
      'User-Agent': 'DataFolio-Portfolio-Generator',
      'Accept': 'application/vnd.github.v3+json'
    };

    // Optional authentication: use server environment token if provided,
    // or forward client authorization header if provided.
    // Never expose token to client.
    if (process.env.GITHUB_TOKEN) {
      headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
    } else if (req.headers && req.headers.authorization) {
      headers['Authorization'] = req.headers.authorization;
    }

    const ghRes = await fetch(targetUrl, {
      method: req.method || 'GET',
      headers
    });

    const data = await ghRes.json();
    res.status(ghRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
