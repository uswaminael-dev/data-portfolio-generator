/**
 * Automated Verification Suite for Student & Developer Portfolio Generator
 * Includes tests for deployable templates, local server, and Vercel serverless handlers.
 */

import assert from 'assert';
import { renderDeployablePortfolio } from './public/template/portfolio.js';
import healthHandler from './api/health.js';
import githubHandler from './api/github/[...path].js';

function createMockRes() {
  const headers = {};
  let statusCode = 200;
  let body = null;
  return {
    setHeader(key, val) { headers[key] = val; },
    status(code) { statusCode = code; return this; },
    json(data) { body = data; return this; },
    end() { return this; },
    getHeaders() { return headers; },
    getStatusCode() { return statusCode; },
    getBody() { return body; }
  };
}

async function runTests() {
  console.log('🧪 Starting Portfolio Generator Verification Tests...\n');

  // 1. Test Single Deployable Template Rendering
  console.log('1️⃣ Testing Single Deployable Portfolio Template...');
  const sampleState = {
    name: 'Maya Lin',
    role: 'Computer Science Student @ UC Berkeley',
    bio: 'Junior CS student passionate about systems programming and web development.',
    location: 'Berkeley, CA',
    status: 'Seeking Summer 2027 SWE Internships',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    email: 'maya.lin@berkeley.edu',
    github: 'https://github.com/octocat',
    linkedin: 'https://linkedin.com/in/octocat',
    website: 'https://mayalin.dev',
    twitter: '',
    projects: [
      {
        id: 'p1',
        title: 'StudyFlow — Collaborative Pomodoro',
        description: 'Real-time collaborative study platform with WebSockets.',
        tags: ['React', 'TypeScript', 'Node.js'],
        stars: 28,
        githubUrl: 'https://github.com/octocat/studyflow',
        demoUrl: 'https://studyflow-demo.dev'
      }
    ],
    skills: {
      languages: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
      frameworks: ['React', 'Node.js', 'Express', 'Tailwind CSS'],
      tools: ['Git', 'GitHub', 'Linux', 'Docker', 'VS Code']
    },
    education: [
      {
        institution: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        period: '2024 - 2028',
        details: 'GPA: 3.85 / 4.0. Coursework: Data Structures, Operating Systems.'
      }
    ],
    achievements: [
      {
        title: 'CalHacks 11.0 — Track Winner',
        issuer: 'CalHacks',
        date: 'Oct 2026',
        details: 'Built an open-source IDE extension.'
      }
    ]
  };

  const html = renderDeployablePortfolio(sampleState);

  // Assertions
  assert(html.startsWith('<!DOCTYPE html>'), 'Generated output must have HTML5 doctype');
  assert(html.includes('Maya Lin'), 'Generated output must include user name');
  assert(html.includes('Computer Science Student @ UC Berkeley'), 'Generated output must include role');
  assert(html.includes('StudyFlow — Collaborative Pomodoro'), 'Generated output must include project title');
  assert(html.includes('React'), 'Generated output must include project tag');
  assert(html.includes('Python'), 'Generated output must include skills');
  assert(html.includes('CalHacks 11.0'), 'Generated output must include achievements');
  assert(html.includes('University of California, Berkeley'), 'Generated output must include education');
  assert(html.includes('<style>'), 'Must include inline self-contained styles');
  assert(html.includes('name="viewport"'), 'Must include responsive viewport meta tag');
  console.log(`   ✓ Single template rendered successfully: ${(html.length / 1024).toFixed(1)} KB`);

  // 2. Test XSS / Escaping Safety
  console.log('\n2️⃣ Testing HTML Escaping & Injection Safety...');
  const maliciousState = {
    name: '<script>alert("xss")</script>',
    role: '<b>Hacker</b>',
    bio: 'Test "quotes" & <tags>',
    projects: [
      {
        title: '<img src=x onerror=alert(1)>',
        description: 'Test & dangerous',
        tags: ['<tag>'],
        githubUrl: 'https://example.com'
      }
    ]
  };

  const safeHtml = renderDeployablePortfolio(maliciousState);
  assert(!safeHtml.includes('<script>alert("xss")</script>'), 'Raw script tags must be escaped');
  assert(safeHtml.includes('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'), 'Characters must be HTML entity escaped');
  console.log('   ✓ Special characters and tags properly escaped.');

  // 3. Test Empty State Handling
  console.log('\n3️⃣ Testing Empty & Minimal State Handling...');
  const emptyHtml = renderDeployablePortfolio({});
  assert(emptyHtml.includes('Your Name'), 'Must have fallback name');
  assert(emptyHtml.includes('<!DOCTYPE html>'), 'Must render valid HTML even with empty state');
  console.log('   ✓ Empty state handled gracefully.');

  // 4. Test Vercel Serverless Function: /api/health
  console.log('\n4️⃣ Testing Vercel Serverless Function: api/health.js...');
  const healthReq = { method: 'GET' };
  const healthRes = createMockRes();
  await healthHandler(healthReq, healthRes);

  assert.strictEqual(healthRes.getStatusCode(), 200, 'Health endpoint must return 200');
  assert.strictEqual(healthRes.getHeaders()['Access-Control-Allow-Origin'], '*', 'Health must have CORS origin header');
  const healthBody = healthRes.getBody();
  assert.strictEqual(healthBody.status, 'ok', 'Health status must be "ok"');
  assert(typeof healthBody.uptime === 'number', 'Uptime must be a number');
  assert(typeof healthBody.timestamp === 'string', 'Timestamp must be an ISO string');
  console.log(`   ✓ api/health.js responded with: ${JSON.stringify(healthBody)}`);

  // Test OPTIONS preflight for health
  const healthOptionsRes = createMockRes();
  await healthHandler({ method: 'OPTIONS' }, healthOptionsRes);
  assert.strictEqual(healthOptionsRes.getStatusCode(), 204, 'OPTIONS on health must return 204');
  console.log('   ✓ api/health.js preflight OPTIONS returned 204');

  // 5. Test Vercel Serverless Catch-All Function: api/github/[...path].js
  console.log('\n5️⃣ Testing Vercel Serverless Catch-All: api/github/[...path].js...');
  
  // Test OPTIONS preflight for github proxy
  const ghOptionsRes = createMockRes();
  await githubHandler({ method: 'OPTIONS' }, ghOptionsRes);
  assert.strictEqual(ghOptionsRes.getStatusCode(), 204, 'OPTIONS on github must return 204');
  console.log('   ✓ api/github/[...path].js preflight OPTIONS returned 204');

  // Test live GitHub proxy call with query params
  console.log('   Testing query param preservation and public user fetch...');
  const ghReq = {
    method: 'GET',
    url: '/api/github/users/octocat/repos?per_page=2&sort=updated',
    query: {
      path: ['users', 'octocat', 'repos'],
      per_page: '2',
      sort: 'updated'
    },
    headers: {}
  };
  const ghRes = createMockRes();
  await githubHandler(ghReq, ghRes);

  assert.strictEqual(ghRes.getStatusCode(), 200, 'GitHub proxy endpoint must forward and return 200');
  assert.strictEqual(ghRes.getHeaders()['Access-Control-Allow-Origin'], '*', 'GitHub proxy must have CORS origin header');
  const ghBody = ghRes.getBody();
  assert(Array.isArray(ghBody), 'Repos endpoint must return an array');
  assert(ghBody.length <= 2, 'Query parameter per_page=2 must be preserved and respected');
  console.log(`   ✓ api/github/[...path].js returned ${ghBody.length} repos (preserved per_page=2 and sort=updated)`);

  console.log('\n🎉 ALL VERIFICATION TESTS PASSED CLEANLY!\n');
}

runTests().catch(err => {
  console.error('❌ Tests failed:', err);
  process.exit(1);
});
