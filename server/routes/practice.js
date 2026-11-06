import { questions } from '../data/questions.js';
import express from 'express';

const router = express.Router();

// Initial VetBoard domain identifiers.
// We'll verify labels and weights against the official VTNE outline.
const domains = [
  { id: 'pharmacy', name: 'Pharmacy and Pharmacology' },
  { id: 'surgical-nursing', name: 'Surgical Nursing' },
  { id: 'dentistry', name: 'Dentistry' },
  { id: 'laboratory', name: 'Laboratory Procedures' },
  { id: 'animal-care', name: 'Animal Care and Nursing' },
  { id: 'diagnostic-imaging', name: 'Diagnostic Imaging' },
  { id: 'anesthesia', name: 'Anesthesia' },
  { id: 'emergency', name: 'Emergency and Critical Care' },
  { id: 'pain-management', name: 'Pain Management' },
  {
    id: 'communication',
    name: 'Communication and Professional Support',
  },
];

// GET /api/practice/domains
router.get('/domains', (req, res) => {
  res.json({ domains });
});


const publicQuestion = (item) => ({
  id: item.id,
  domain: item.domain,
  question: item.question,
  options: item.options,
});

// GET /api/practice/questions?domain=pharmacy
router.get('/questions', (req, res) => {
  const { domain } = req.query;

  if (
    typeof domain !== 'string' ||
    !domains.some((item) => item.id === domain)
  ) {
    return res.status(400).json({
      error: 'A valid VTNE domain is required',
    });
  }

  // Draft fixtures are available only during local development.
  // Production delivery requires approved, sourced questions.
  const eligible = questions.filter(
    (item) =>
      item.domain === domain &&
      (item.reviewStatus === 'approved' ||
        (process.env.NODE_ENV === 'development' &&
          item.reviewStatus === 'draft')),
  );

  res.json({
    questions: eligible.map(publicQuestion),
  });
});

// POST /api/practice/answer
router.post('/answer', (req, res) => {
  const { questionId, selectedAnswer } = req.body ?? {};

  if (
    typeof questionId !== 'string' ||
    typeof selectedAnswer !== 'string'
  ) {
    return res.status(400).json({
      error: 'A question ID and selected answer are required',
    });
  }

  const question = questions.find(
    (item) => item.id === questionId,
  );

  if (
    !question ||
    (question.reviewStatus !== 'approved' &&
      !(process.env.NODE_ENV === 'development' &&
        question.reviewStatus === 'draft'))
  ) {
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

const SESSION_SIZE = 5;

// GET /api/practice/session
router.get('/session', (req, res) => {
  const eligible = questions.filter(
    (item) =>
      item.reviewStatus === 'approved' ||
      (process.env.NODE_ENV === 'development' &&
        item.reviewStatus === 'draft'),
  );

  if (eligible.length < SESSION_SIZE) {
    return res.status(409).json({
      error: 'Not enough questions to start a session',
    });
  }

  // Shuffle a copy without modifying the question bank.
  const shuffled = [...eligible];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  res.json({
    sessionSize: SESSION_SIZE,
    questions: shuffled.slice(0, SESSION_SIZE).map(publicQuestion),
  });
});


export default router;
