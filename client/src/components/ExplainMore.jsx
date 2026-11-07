import { useState } from 'react';
import { postJSON } from '../api.js';

// AI tutor shown after a student answers. It works from the reviewed
// question and explanation on the server. Give it a `key` of the question
// ID so it resets when the question changes.
export default function ExplainMore({ questionId, selectedAnswer }) {
  const [replies, setReplies] = useState([]);
  const [followUp, setFollowUp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function ask(question) {
    if (loading) return;

    setLoading(true);
    setError('');

    try {
      const data = await postJSON('/api/practice/explain', {
        questionId,
        selectedAnswer,
        ...(question ? { followUp: question } : {}),
      });

      setReplies((previous) => [
        ...previous,
        { question, answer: data.explanation },
      ]);
      setFollowUp('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function submitFollowUp(event) {
    event.preventDefault();
    if (followUp.trim()) ask(followUp.trim());
  }

  return (
    <div className="explain-more">
      {replies.length === 0 && (
        <button
          type="button"
          className="secondary-button"
          onClick={() => ask()}
          disabled={loading}
        >
          {loading ? 'Thinking...' : 'Explain further'}
        </button>
      )}

      {replies.map((reply, index) => (
        <div key={index} className="explain-reply" aria-live="polite">
          {reply.question && (
            <p className="explain-question">You asked: {reply.question}</p>
          )}
          <p>{reply.answer}</p>
        </div>
      ))}

      {replies.length > 0 && (
        <>
          <p className="ai-note">
            AI tutor. Double-check anything important with your textbook.
          </p>

          <form className="topic-form explain-form" onSubmit={submitFollowUp}>
            <input
              aria-label="Ask a follow-up question"
              value={followUp}
              maxLength={500}
              onChange={(event) => setFollowUp(event.target.value)}
              placeholder="Ask a follow-up question..."
            />
            <button disabled={loading || !followUp.trim()}>
              {loading ? 'Thinking...' : 'Ask'}
            </button>
          </form>
        </>
      )}

      {error && <p className="error" role="alert">{error}</p>}
    </div>
  );
}
