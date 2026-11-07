// Stores student reports in Upstash Redis (connected through Vercel) using
// its REST API, so no extra package is needed.
//
// Vercel sets these environment variables when you connect the database.
// Either naming style works:
//   KV_REST_API_URL + KV_REST_API_TOKEN
//   UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN

const URL_VAR = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN_VAR = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const HIDDEN_KEY = 'vetboard:hidden-questions';
const REPORTS_KEY = 'vetboard:reports';
const CACHE_MS = 15 * 1000;

let cache = { ids: new Set(), loadedAt: 0 };

export function reportsEnabled() {
  return Boolean(URL_VAR && TOKEN_VAR);
}

async function redis(...command) {
  const response = await fetch(URL_VAR, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN_VAR}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.error) {
    throw new Error(data.error || `Database request failed (${response.status})`);
  }
  return data.result;
}

// IDs of questions hidden because a student reported them. If the database
// is missing or down, nothing is hidden, so the app keeps working.
export async function getHiddenIds() {
  if (!reportsEnabled()) return new Set();
  if (Date.now() - cache.loadedAt < CACHE_MS) return cache.ids;

  try {
    const ids = await redis('SMEMBERS', HIDDEN_KEY);
    cache = { ids: new Set(ids ?? []), loadedAt: Date.now() };
  } catch (error) {
    console.error('Could not load hidden questions:', error.message);
  }
  return cache.ids;
}

export async function addReport({ questionId, reason, comment }) {
  const report = {
    questionId,
    reason,
    comment: comment || '',
    reportedAt: new Date().toISOString(),
  };

  await redis('SADD', HIDDEN_KEY, questionId);
  await redis('LPUSH', REPORTS_KEY, JSON.stringify(report));
  cache.ids = new Set([...cache.ids, questionId]);
}

export async function listReports() {
  const raw = (await redis('LRANGE', REPORTS_KEY, 0, -1)) ?? [];
  const hidden = (await redis('SMEMBERS', HIDDEN_KEY)) ?? [];
  return {
    reports: raw.map((item) => JSON.parse(item)),
    hidden,
  };
}

export async function restoreQuestion(questionId) {
  return redis('SREM', HIDDEN_KEY, questionId);
}
