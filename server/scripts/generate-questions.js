// Drafts VTNE practice questions with Gemini and saves them as drafts in
// server/data/generated-questions.js. Nothing generated here reaches students
// until a reviewer changes its reviewStatus to 'approved'.
//
// Run from the server folder:
//   npm run generate -- --domain anesthesia --count 10
//   npm run generate -- --total 150                (split by the VTNE blueprint)
//   npm run generate -- --domain dentistry --count 10 --source notes/dentistry.txt
//
// --source points to a plain-text file (for example, textbook chapter notes).
// When given, questions are based only on that material.

import 'dotenv/config';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { MODEL, ai } from '../gemini.js';
import { domains, domainNames, blueprintCounts } from '../data/domains.js';
import { questions } from '../data/questions.js';
import { generatedQuestions } from '../data/generated-questions.js';
import { validateQuestion } from '../data/validate.js';

const OUTPUT_FILE = fileURLToPath(
  new URL('../data/generated-questions.js', import.meta.url),
);
const BATCH_SIZE = 10;

// questions.js already includes the generated questions, so keep only the
// hand-written ones here and combine them with the working copy (`saved`).
const handWritten = questions.filter((item) => !generatedQuestions.includes(item));
const MAX_SOURCE_CHARS = 60000;

const PROMPT = `You write practice questions for the Veterinary Technician National Examination (VTNE), administered by the AAVSB. The students are recent veterinary technology graduates preparing for the exam.

Write the requested number of multiple-choice questions for the given VTNE domain.

Content rules:
- Test knowledge an entry-level credentialed veterinary technician is expected to have, at VTNE difficulty.
- Use current, well-established, widely accepted veterinary standards (for example, current AAHA and WSAVA guidelines). Avoid anything controversial, recently changed, or dependent on one hospital's protocol or one clinician's preference.
- If you are not certain a fact is correct and current, do not write that question.
- Mix recall questions with short applied scenarios ("A technician is monitoring...").
- Cover a variety of species where appropriate, mainly dogs and cats, but also horses, cattle, small ruminants, pigs, birds, and small mammals, as the VTNE does.
- Cover a variety of subtopics within the domain. Do not repeat or closely paraphrase any of the existing questions listed.
- Do not include specific drug doses unless they are standard textbook values that are not in dispute.

Format rules:
- Exactly 4 options, exactly one clearly best answer, and three plausible wrong options.
- No "all of the above", "none of the above", or "both A and B".
- Avoid negatively worded questions. If one is essential, capitalize the word NOT or EXCEPT.
- Do not put letters (A, B, C, D) in the options.
- "correctAnswer" must match one option exactly, character for character.
- "explanation": 2 to 4 sentences explaining why the correct answer is right and why the most tempting wrong option is wrong.
- "sourceTitle": the standard reference where a student could verify this, such as a textbook title plus the chapter topic. Do not invent page numbers, editions, or URLs.

Reply with only a JSON array, no markdown, in exactly this shape:
[
  {
    "question": string,
    "options": [string, string, string, string],
    "correctAnswer": string,
    "explanation": string,
    "sourceTitle": string
  }
]`;

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i].startsWith('--')) {
      args[argv[i].slice(2)] = argv[i + 1];
      i += 1;
    }
  }
  return args;
}

function parseJSON(text) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/```$/, '');
  return JSON.parse(cleaned);
}

async function askModel(input) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const interaction = await ai.interactions.create({
        model: MODEL,
        input,
        system_instruction: PROMPT,
        generation_config: { temperature: 0.7 },
        response_format: { type: 'text', mime_type: 'application/json' },
      });
      const items = parseJSON(interaction.output_text);
      if (!Array.isArray(items)) throw new Error('Reply was not a JSON array');
      return items;
    } catch (error) {
      console.warn(`  Attempt ${attempt} failed: ${error.message}`);
      if (attempt === 3) throw error;
    }
  }
}

async function saveGenerated(items) {
  const body =
    '// AI-drafted questions, written by `npm run generate`.\n' +
    "// Review each one, then change reviewStatus from 'draft' to 'approved'\n" +
    "// (or 'rejected'). Only approved questions are shown to students.\n" +
    `export const generatedQuestions = ${JSON.stringify(items, null, 2)};\n`;
  await writeFile(OUTPUT_FILE, body);
}

function nextIdFor(domain, bank) {
  const prefix = `ai-${domain}-`;
  const used = bank
    .filter((item) => item.id.startsWith(prefix))
    .map((item) => Number(item.id.slice(prefix.length)) || 0);
  let next = Math.max(0, ...used) + 1;
  return () => `${prefix}${String(next++).padStart(3, '0')}`;
}

async function generateForDomain(domain, count, sourceText, saved) {
  console.log(`\n${domainNames[domain]}: drafting ${count} question(s)`);
  const newId = nextIdFor(domain, [...handWritten, ...saved]);
  let added = 0;
  let rounds = 0;

  while (added < count && rounds < Math.ceil(count / BATCH_SIZE) + 3) {
    rounds += 1;
    const wanted = Math.min(BATCH_SIZE, count - added);

    const existing = [...handWritten, ...saved]
      .filter((item) => item.domain === domain && item.reviewStatus !== 'rejected')
      .map((item) => `- ${item.question}`)
      .slice(-80)
      .join('\n');

    const input = [
      `Domain: ${domainNames[domain]}`,
      `Number of questions: ${wanted}`,
      `Existing questions in this domain (do not repeat):\n${existing || '(none yet)'}`,
      sourceText
        ? `Base every question only on the following source material. Do not add facts that are not in it.\n\nSOURCE MATERIAL:\n${sourceText}`
        : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    const items = await askModel(input);

    for (const raw of items.slice(0, wanted)) {
      const draft = {
        id: newId(),
        domain,
        question: String(raw.question ?? '').trim(),
        options: Array.isArray(raw.options) ? raw.options.map((o) => String(o).trim()) : [],
        correctAnswer: String(raw.correctAnswer ?? '').trim(),
        explanation: String(raw.explanation ?? '').trim(),
        source: {
          title: String(raw.sourceTitle ?? '').trim() || 'Source verification pending',
          reference: null,
          verified: false,
          basedOnProvidedSource: Boolean(sourceText),
        },
        reviewStatus: 'draft',
        generatedBy: MODEL,
        generatedAt: new Date().toISOString(),
      };

      const errors = validateQuestion(draft);
      if (errors.length > 0) {
        console.warn(`  Skipped one question: ${errors.join('; ')}`);
        continue;
      }

      saved.push(draft);
      added += 1;
    }

    // Save after every batch so a failure later doesn't lose work.
    await saveGenerated(saved);
    console.log(`  Saved ${added} of ${count}`);
  }

  return added;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing. Add it to server/.env');
  }

  let plan;
  if (args.total) {
    plan = blueprintCounts(Number(args.total));
  } else if (args.domain && args.count) {
    if (!domainNames[args.domain]) {
      throw new Error(
        `Unknown domain "${args.domain}". Use one of: ${domains.map((d) => d.id).join(', ')}`,
      );
    }
    plan = { [args.domain]: Number(args.count) };
  } else {
    throw new Error(
      'Use either --total 150, or --domain <id> --count <number>. Optionally add --source <file>.',
    );
  }

  let sourceText = '';
  if (args.source) {
    sourceText = (await readFile(args.source, 'utf8')).slice(0, MAX_SOURCE_CHARS);
    console.log(`Using source material from ${args.source}`);
  }

  const saved = [...generatedQuestions];
  let total = 0;

  for (const [domain, count] of Object.entries(plan)) {
    if (count > 0) total += await generateForDomain(domain, count, sourceText, saved);
  }

  console.log(
    `\nDone. ${total} new draft question(s) saved to server/data/generated-questions.js.` +
      '\nReview them, then set reviewStatus to "approved" or "rejected".' +
      '\nRun `npm run validate` before deploying.',
  );
}

main().catch((error) => {
  console.error(`\nError: ${error.message}`);
  process.exit(1);
});
