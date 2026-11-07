// Checks every question in the bank. Run before deploying:
//   npm run validate
import { questions } from '../data/questions.js';
import { validateBank } from '../data/validate.js';
import { domains } from '../data/domains.js';

const problems = validateBank(questions);

console.log('Approved questions by VTNE subject:');
for (const domain of domains) {
  const inDomain = questions.filter((item) => item.domain === domain.id);
  const approved = inDomain.filter((item) => item.reviewStatus === 'approved').length;
  const drafts = inDomain.filter((item) => item.reviewStatus === 'draft').length;
  console.log(`  ${domain.name}: ${approved} approved, ${drafts} awaiting review`);
}

if (problems.length > 0) {
  console.error(`\n${problems.length} problem(s) found:`);
  problems.forEach((problem) => console.error(`  - ${problem}`));
  process.exit(1);
}

console.log(`\nAll ${questions.length} questions are valid.`);
