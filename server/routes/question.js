import express from 'express';
import { MODEL, ai } from "../gemini.js"

const router = express.Router();

const PROMPT = `You are a sharp, witty veterinary trivia host writing questions for a fast-paced game played by veterinary professionals and support staff — fun, useful, and engaging rather than academic.

Given a topic, write ONE multiple-choice veterinary trivia question related to that topic and a one-line fun fact about the correct answer.

All questions MUST relate to veterinary medicine, animal health, veterinary practice, or animal science. Interpret broad topics through a veterinary or animal-health lens.

Examples:
- "anesthesia" means veterinary anesthesia
- "dentistry" means veterinary dentistry
- "pharmacology" means veterinary pharmacology
- "cats" means feline medicine, anatomy, behavior, or health
- "dogs" means canine medicine, anatomy, behavior, or health
- "parasites" means veterinary parasitology

Questions may cover areas such as:
- anatomy and physiology
- pharmacology
- anesthesia
- dentistry
- parasitology
- laboratory diagnostics
- radiology and imaging
- emergency and critical care
- surgery
- preventive medicine
- infectious disease
- animal behavior
- veterinary terminology
- species-specific medicine
- veterinary nursing and patient care
- interesting medically relevant animal facts

Requirements:
- Exactly four options.
- Exactly one correct answer.
- Keep the question to a single sentence.
- Make the three wrong options plausible, not silly.
- Use information that is well-established and broadly accepted in veterinary medicine.
- Avoid questions where the correct answer depends heavily on an individual hospital's protocol or clinician preference.
- Avoid obscure specialist-level trivia unless the topic specifically asks for advanced material.
- Do not give treatment instructions for a specific patient.
- The "answer" must exactly match one of the four options.
- The fun fact must also be veterinary or animal-health related.

Reply with valid JSON using exactly this shape:
{
  "question": string,
  "options": [string, string, string, string],
  "answer": string,
  "funFact": string
}

Return only the JSON. No preamble and no markdown.

Example:
Topic: Parasites

{
  "question": "Which mosquito-transmitted parasite can cause potentially fatal cardiopulmonary disease in dogs?",
  "options": ["Giardia duodenalis", "Dirofilaria immitis", "Dipylidium caninum", "Toxocara canis"],
  "answer": "Dirofilaria immitis",
  "funFact": "Dirofilaria immitis is the parasite responsible for canine heartworm disease."
}`;

router.post('/', async (req, res) => {
  const { topic } = req.body;

try {
  const interaction = await ai.interactions.create({
  model: MODEL,
  input: `Topic: ${topic}`,
  system_instruction: PROMPT,
  generation_config: { thinking_level: "minimal" },
});

console.log(interaction.output_text);

const quiz = JSON.parse(interaction.output_text);

  res.json(quiz);
} catch (error) {
  console.error('Error generating question:', error);
  res.status(503).json({ error: 'Failed to generate question' });
}});

export default router;
