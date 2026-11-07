// Lists student reports and lets you put hidden questions back.
// Run from the server folder:
//   npm run reports                          list reports and hidden questions
//   npm run reports -- --restore mvm-anesthesia-001   show a question again
//
// To fix a reported question for good, edit it in server/data/ and redeploy,
// or set its reviewStatus to 'rejected'.
//
// Needs the database variables in server/.env. Get them with:
//   vercel env pull server/.env
import 'dotenv/config';
import { questions } from '../data/questions.js';
import { listReports, reportsEnabled, restoreQuestion } from '../data/reports.js';

async function main() {
  if (!reportsEnabled()) {
    throw new Error(
      'Database variables are missing from server/.env. Run: vercel env pull server/.env',
    );
  }

  const restoreIndex = process.argv.indexOf('--restore');
  if (restoreIndex !== -1) {
    const id = process.argv[restoreIndex + 1];
    if (!id) throw new Error('Add the question ID after --restore');
    const removed = await restoreQuestion(id);
    console.log(removed ? `${id} is visible to students again.` : `${id} was not hidden.`);
    return;
  }

  const { reports, hidden } = await listReports();

  if (reports.length === 0) {
    console.log('No reports yet.');
    return;
  }

  console.log(`${hidden.length} question(s) hidden. ${reports.length} report(s), newest first:\n`);
  for (const report of reports) {
    const question = questions.find((item) => item.id === report.questionId);
    const status = hidden.includes(report.questionId) ? 'HIDDEN' : 'restored';
    console.log(`${report.reportedAt}  ${report.questionId}  [${status}]  ${report.reason}`);
    if (question) console.log(`  Q: ${question.question}`);
    if (report.comment) console.log(`  Student comment: ${report.comment}`);
    console.log('');
  }

  console.log('To show a question again: npm run reports -- --restore <question-id>');
}

main().catch((error) => {
  console.error(`Error: ${error.message}`);
  process.exit(1);
});
