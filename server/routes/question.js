import express from 'express';
import { MODEL, ai } from "../gemini.js"

const router = express.Router();

const PROMPT = `You are a sharp, witty trivia host writing questions for a fast-paced game played by courteous adults — fun, not academic.

Given a topic, write ONE multiple-choice question about it and a one-line fun fact about the correct answer.

Requirements:
- Exactly four options.
- Exactly one correct answer.
- Keep the question to a single sentence.
- Make the three wrong options plausible, not silly.
- Avoid trivia so obscure that only a specialist would know it.
- The "answer" must exactly match one of the four options.

Reply with valid JSON using exactly this shape:
{
  "question": string,
  "options": [string, string, string, string],
  "answer": string,
  "funFact": string
}

Return only the JSON. No preamble and no markdown.

Example:
Topic: Space

{
  "question": "Which planet has the most moons?",
  "options": ["Earth", "Mars", "Venus", "Saturn"],
  "answer": "Saturn",
  "funFact": "Saturn's rings are made mostly of ice and rock."
}`;

router.post('/', async (req, res) => {
  const { topic } = req.body;

try {
  const interaction = await ai.interactions.create({
  model: MODEL,
  input: `Topic: ${topic}`,
  system_instruction: PROMPT,
  generation_config: { temperature: 0.9 },
});

console.log(interaction.output_text);

const quiz = JSON.parse(interaction.output_text);

  res.json(quiz);
} catch (error) {
  console.error('Error generating question:', error);
  res.status(503).json({ error: 'Failed to generate question' });
}});

export default router;
