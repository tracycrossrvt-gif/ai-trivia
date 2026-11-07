import { questions } from '../data/questions.js';
import express from 'express';
import { domains, domainNames } from '../data/domains.js';
import { MODEL, ai } from '../gemini.js';

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
router.get('/questions', (req, res) => {
  const { domain } = req.query;

  if (typeof domain !== 'string' || !domainNames[domain]) {
    return res.status(400).json({
      error: 'A valid VTNE domain is required',
    });
  }

  const eligible = questions.filter(
    (item) => item.domain === domain && isAvailable(item),
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
router.get('/session', (req, res) => {
  const eligible = questions.filter(isAvailable);

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

You will receive a practice question, its options, the correct answer, an explanation reviewed by a credentialed professional, and possibly the student's answer and a follow-up question.

Rules:
- Treat the correct answer and reviewed explanation as authoritative. Never contradict them.
- Expand on the concept: why the correct answer is right, why the student's choice (if wrong) is a common mix-up, and a memory tip if one helps.
- Stay at the level an entry-level credentialed veterinary technician needs.
- Use only well-established, widely accepted veterinary knowledge. If you are not sure about something, say so and suggest checking their textbook.
- If a follow-up question is unrelated to veterinary technology or VTNE study, politely steer back to the topic.
- Do not give treatment or dosing advice for a specific real patient. Direct that to their supervising veterinarian.
- Keep the reply under 180 words. Use plain text with short paragraphs. No markdown headings.`;

// A simple per-visitor limit to keep AI costs predictable.
const EXPLAIN_LIMIT = 30;
const EXPLAIN_WINDOW_MS = 10 * 60 * 1000;
const explainUsage = new Map();

function overExplainLimit(key) {
  const now = Date.now();
  const recent = (explainUsage.get(key) ?? []).filter(
    (time) => now - time < EXPLAIN_WINDOW_MS,
  );
  recent.push(now);
  explainUsage.set(key, recent);
  return recent.length > EXPLAIN_LIMIT;
}

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
    `Reviewed explanation: ${question.explanation}`,
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

export default router;
