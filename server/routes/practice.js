import { questions } from '../data/questions.js';
import express from 'express';
import { domains, domainNames } from '../data/domains.js';
import { MODEL, ai } from '../gemini.js';
import { addReport, getHiddenIds, reportsEnabled } from '../data/reports.js';

const router = express.Router();

const SESSION_SIZE = 5;

// Only approved questions reach students. Draft questions are also
// served during local development so they can be checked in the UI.
function isAvailable(item) {
  return (
    item.reviewStatus === 'approved' ||
    (process.env.NODE_ENV === 'development' && item.reviewStatus === 'draft')
  );
}

// Returns a shuffled copy without modifying the original array.
function shuffle(items) {
  const copy = [...items];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

// What the browser receives. The correct answer and explanation stay
// on the server until the student submits an answer. Options are
// shuffled so the correct answer isn't always in the same position.
const publicQuestion = (item) => ({
  id: item.id,
  domain: item.domain,
  domainName: domainNames[item.domain] ?? item.domain,
  question: item.question,
  options: shuffle(item.options),
});

// GET /api/practice/domains
router.get('/domains', (req, res) => {
  res.json({ domains: domains.map(({ id, name }) => ({ id, name })) });
});

// GET /api/practice/questions?domain=pharmacy
router.get('/questions', async (req, res) => {
  const { domain } = req.query;

  if (typeof domain !== 'string' || !domainNames[domain]) {
    return res.status(400).json({
      error: 'A valid VTNE domain is required',
    });
  }

  const hidden = await getHiddenIds();
  const eligible = questions.filter(
    (item) => item.domain === domain && isAvailable(item) && !hidden.has(item.id),
  );

  res.json({
    questions: shuffle(eligible).map(publicQuestion),
  });
});

// POST /api/practice/answer
router.post('/answer', (req, res) => {
  const { questionId, selectedAnswer } = req.body ?? {};

  if (typeof questionId !== 'string' || typeof selectedAnswer !== 'string') {
    return res.status(400).json({
      error: 'A question ID and selected answer are required',
    });
  }

  const question = questions.find((item) => item.id === questionId);

  if (!question || !isAvailable(question)) {
    return res.status(404).json({
      error: 'Question not available',
    });
  }

  if (!question.options.includes(selectedAnswer)) {
    return res.status(400).json({
      error: 'Selected answer is not valid for this question',
    });
  }

  res.json({
    correct: selectedAnswer === question.correctAnswer,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    source: question.source,
  });
});

// GET /api/practice/session
router.get('/session', async (req, res) => {
  const hidden = await getHiddenIds();
  const eligible = questions.filter(
    (item) => isAvailable(item) && !hidden.has(item.id),
  );

  if (eligible.length < SESSION_SIZE) {
    return res.status(409).json({
      error: 'Not enough questions to start a session',
    });
  }

  res.json({
    sessionSize: SESSION_SIZE,
    questions: shuffle(eligible).slice(0, SESSION_SIZE).map(publicQuestion),
  });
});

// ---------------------------------------------------------------
// "Explain further": an AI tutor that works only from a reviewed
// question, its answer, and its explanation.
// ---------------------------------------------------------------

const EXPLAIN_PROMPT = `You are a patient, encouraging tutor helping a recent veterinary technology graduate prepare for the VTNE.

You will receive a practice question, its options, the correct answer, a source-checked explanation, and possibly the student's answer and a follow-up question.

Rules:
- Treat the correct answer and explanation as authoritative. Never contradict them.
- Expand on the concept: why the correct answer is right, why the student's choice (if wrong) is a common mix-up, and a memory tip if one helps.
- Stay at the level an entry-level credentialed veterinary technician needs.
- Use only well-established, widely accepted veterinary knowledge. If you are not sure about something, say so and suggest checking their textbook.
- If a follow-up question is unrelated to veterinary technology or VTNE study, politely steer back to the topic.
- Do not give treatment or dosing advice for a specific real patient. Direct that to their supervising veterinarian.
- Keep the reply under 180 words. Use plain text with short paragraphs. No markdown headings.`;

// Simple per-visitor limits. Each returns true once a visitor goes over.
function makeLimiter(limit, windowMs) {
  const usage = new Map();
  return (key) => {
    const now = Date.now();
    const recent = (usage.get(key) ?? []).filter((time) => now - time < windowMs);
    recent.push(now);
    usage.set(key, recent);
    return recent.length > limit;
  };
}

// Keeps AI costs predictable.
const overExplainLimit = makeLimiter(30, 10 * 60 * 1000);

// POST /api/practice/explain
router.post('/explain', async (req, res) => {
  const { questionId, selectedAnswer, followUp } = req.body ?? {};

  if (typeof questionId !== 'string') {
    return res.status(400).json({ error: 'A question ID is required' });
  }

  if (followUp !== undefined && (typeof followUp !== 'string' || followUp.length > 500)) {
    return res.status(400).json({
      error: 'Follow-up questions must be 500 characters or fewer',
    });
  }

  const question = questions.find((item) => item.id === questionId);

  if (!question || !isAvailable(question)) {
    return res.status(404).json({ error: 'Question not available' });
  }

  if (overExplainLimit(req.ip ?? 'unknown')) {
    return res.status(429).json({
      error: 'You have asked for a lot of explanations. Please try again in a few minutes.',
    });
  }

  const studentAnswer =
    typeof selectedAnswer === 'string' && question.options.includes(selectedAnswer)
      ? selectedAnswer
      : null;

  const input = [
    `VTNE subject: ${domainNames[question.domain]}`,
    `Question: ${question.question}`,
    `Options: ${question.options.join(' | ')}`,
    `Correct answer: ${question.correctAnswer}`,
    `Explanation: ${question.explanation}`,
    studentAnswer ? `Student's answer: ${studentAnswer}` : '',
    followUp?.trim()
      ? `Student's follow-up question: ${followUp.trim()}`
      : 'Explain this concept in more depth.',
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const interaction = await ai.interactions.create({
      model: MODEL,
      input,
      system_instruction: EXPLAIN_PROMPT,
      generation_config: { temperature: 0.3 },
    });

    const explanation = interaction.output_text?.trim();
    if (!explanation) throw new Error('Empty response');

    res.json({ explanation });
  } catch (error) {
    console.error('Error generating explanation:', error);
    res.status(503).json({ error: 'Could not get an explanation right now' });
  }
});

// ---------------------------------------------------------------
// "Report this question": hides the question for everyone right away.
// Review reports with `npm run reports` in the server folder.
// ---------------------------------------------------------------

const REPORT_REASONS = ['wrong-answer', 'unclear', 'typo', 'other'];

// Limits how many questions one visitor can hide in a day.
const overReportLimit = makeLimiter(5, 24 * 60 * 60 * 1000);

// POST /api/practice/report
router.post('/report', async (req, res) => {
  const { questionId, reason, comment } = req.body ?? {};

  if (typeof questionId !== 'string' || !REPORT_REASONS.includes(reason)) {
    return res.status(400).json({ error: 'A question and a reason are required' });
  }

  if (comment !== undefined && (typeof comment !== 'string' || comment.length > 500)) {
    return res.status(400).json({ error: 'Comments must be 500 characters or fewer' });
  }

  if (!questions.some((item) => item.id === questionId)) {
    return res.status(404).json({ error: 'Question not found' });
  }

  if (!reportsEnabled()) {
    return res.status(503).json({ error: 'Reporting is not set up yet' });
  }

  if (overReportLimit(req.ip ?? 'unknown')) {
    return res.status(429).json({
      error: 'Thanks for all your reports today. Please try again tomorrow.',
    });
  }

  try {
    await addReport({ questionId, reason, comment: comment?.trim() });
    res.json({ ok: true });
  } catch (error) {
    console.error('Error saving report:', error);
    res.status(503).json({ error: 'Could not save your report right now' });
  }
});

export default router;
