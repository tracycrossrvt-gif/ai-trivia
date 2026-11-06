import { questions } from '../data/questions.js';
import express from 'express';

const router = express.Router();

// VTNE domains, matching the AAVSB VTNE content outline
// (VTNE Candidate Information Handbook, 2026).
const domains = [
  { id: 'pharmacy', name: 'Pharmacy and Pharmacology' },
  { id: 'surgical-nursing', name: 'Surgical Nursing' },
  { id: 'dentistry', name: 'Dentistry' },
  { id: 'laboratory', name: 'Laboratory Procedures' },
  { id: 'animal-care', name: 'Animal Care and Nursing' },
  { id: 'diagnostic-imaging', name: 'Diagnostic Imaging' },
  { id: 'anesthesia', name: 'Anesthesia' },
  { id: 'emergency', name: 'Emergency Medicine and Critical Care' },
  { id: 'pain-management', name: 'Pain Management and Analgesia' },
  {
    id: 'communication',
    name: 'Communication and Veterinary Professional Support Services',
  },
];

const domainNames = Object.fromEntries(
  domains.map((domain) => [domain.id, domain.name]),
);

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
  res.json({ domains });
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

export default router;
