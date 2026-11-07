import { domainNames } from './domains.js';

export const REVIEW_STATUSES = ['draft', 'approved', 'rejected'];

// Returns a list of problems with one question. An empty list means it's valid.
export function validateQuestion(item) {
  const errors = [];
  const isText = (value) => typeof value === 'string' && value.trim() !== '';

  if (!item || typeof item !== 'object') return ['Not a question object'];

  if (!isText(item.id)) errors.push('Missing id');
  if (!domainNames[item.domain]) errors.push(`Unknown domain "${item.domain}"`);
  if (!isText(item.question)) errors.push('Missing question text');

  if (!Array.isArray(item.options) || item.options.length !== 4) {
    errors.push('Must have exactly 4 options');
  } else {
    if (!item.options.every(isText)) errors.push('Every option must be text');
    const unique = new Set(item.options.map((option) => String(option).trim().toLowerCase()));
    if (unique.size !== 4) errors.push('Options must all be different');
    if (!item.options.includes(item.correctAnswer)) {
      errors.push('correctAnswer must exactly match one of the options');
    }
  }

  if (!isText(item.explanation)) errors.push('Missing explanation');
  if (!REVIEW_STATUSES.includes(item.reviewStatus)) {
    errors.push(`reviewStatus must be one of: ${REVIEW_STATUSES.join(', ')}`);
  }

  if (item.reviewStatus === 'approved' && !isText(item.source?.title)) {
    errors.push('Approved questions need a source title');
  }

  return errors;
}

// Checks a whole bank, including duplicate IDs.
export function validateBank(items) {
  const problems = [];
  const seen = new Set();

  items.forEach((item, index) => {
    const label = item?.id || `item #${index + 1}`;
    if (item?.id && seen.has(item.id)) problems.push(`${label}: duplicate id`);
    if (item?.id) seen.add(item.id);
    validateQuestion(item).forEach((error) => problems.push(`${label}: ${error}`));
  });

  return problems;
}
