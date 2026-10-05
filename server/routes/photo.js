import express from 'express';
import { MODEL, ai } from "../gemini.js"

const router = express.Router();

const PROMPT = `You are a veterinary trivia question writer.

Look at the image and write ONE fun multiple-choice veterinary question based on something reasonably identifiable in the image.

Requirements:
- The question must be related to veterinary medicine, animal care, anatomy, species, breed, husbandry, or another veterinary-relevant topic.
- Use the image as the basis for the question.
- Do not ask about irrelevant visual details such as clothing, decorations, backgrounds, or accessories unless they are veterinary-related.
- Do not make a medical diagnosis from the image.
- Exactly four options.
- Exactly one correct answer.
- The "answer" must exactly match one of the four options.

Reply with valid JSON using exactly this shape:
{
  "question": string,
  "options": [string, string, string, string],
  "answer": string
}

Return only the JSON. No preamble and no markdown.`;

router.post('/', async (req, res) => {
  const { image, mimeType } = req.body;

  const interaction = await ai.interactions.create({
  model: MODEL,
  input: [
    { type: 'image', data: image, mime_type: mimeType },
    { type: 'text', text: "Write a trivia question about this image" }
  ],
  system_instruction: PROMPT,
  generation_config: { temperature: 0.9 },
  response_format: { type: "text", mime_type: "application/json" }
});

console.log(interaction.output_text);

const quiz = JSON.parse(interaction.output_text);

  res.json(quiz);
});

export default router;
