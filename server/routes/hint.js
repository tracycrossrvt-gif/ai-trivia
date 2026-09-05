import express from 'express';
import { MODEL, ai } from "../gemini.js";

const router = express.Router();

const PROMPT = `You are a helpful and witty trivia assistant.
Given a trivia question, provide ONE short hint that nudges the player toward the answer without giving it away or stating the answer directly.
Keep the hint to a single concise sentence. Never reveal the answer.

Reply with valid JSON using exactly this shape:
{
  "hint": string
}

Return only the JSON. No preamble and no markdown.`;

router.post('/', async (req, res) => {
  const { question } = req.body;

  if (!question || typeof question !== 'string' || !question.trim()) {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const interaction = await ai.interactions.create({
      model: MODEL,
      input: `Question: ${question}`,
      system_instruction: PROMPT,
      generation_config: { temperature: 0.7 },
      response_format: { type: "text", mime_type: "application/json" }
    });

    const data = JSON.parse(interaction.output_text);
    res.json(data);
  } catch (error) {
    console.error('Error generating hint:', error);
    res.status(503).json({ error: 'Failed to generate hint' });
  }
});

export default router;
