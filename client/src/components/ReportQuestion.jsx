import { useState } from 'react';
import { postJSON } from '../api.js';

const REASONS = [
  { value: 'wrong-answer', label: 'The answer looks wrong' },
  { value: 'unclear', label: 'The question is unclear' },
  { value: 'typo', label: 'Typo or formatting problem' },
  { value: 'other', label: 'Something else' },
];

// Lets a student flag a problem. The question is hidden for everyone until
// it's checked. Give it a `key` of the question ID so it resets per question.
export default function ReportQuestion({ questionId }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [comment, setComment] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  async function submit(event) {
    event.preventDefault();
    if (!reason || sending) return;

    setSending(true);
    setError('');

    try {
      await postJSON('/api/practice/report', {
        questionId,
        reason,
        ...(comment.trim() ? { comment: comment.trim() } : {}),
      });
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <p className="report-thanks" role="status">
        Thanks for reporting this. It's been removed from practice until it's checked.
      </p>
    );
  }

  if (!open) {
    return (
      <button type="button" className="link-button" onClick={() => setOpen(true)}>
        Report a problem with this question
      </button>
    );
  }

  return (
    <form className="report-form" onSubmit={submit}>
      <label>
        What's wrong?
        <select value={reason} onChange={(event) => setReason(event.target.value)}>
          <option value="">Choose a reason</option>
          {REASONS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        Details (optional)
        <textarea
          value={comment}
          maxLength={500}
          rows={3}
          onChange={(event) => setComment(event.target.value)}
          placeholder="For example, what you think the correct answer is and why"
        />
      </label>

      <div className="report-actions">
        <button disabled={!reason || sending}>
          {sending ? 'Sending...' : 'Send report'}
        </button>
        <button type="button" className="link-button" onClick={() => setOpen(false)}>
          Cancel
        </button>
      </div>

      {error && <p className="error" role="alert">{error}</p>}
    </form>
  );
}
