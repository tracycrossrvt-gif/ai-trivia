import { useState, useEffect } from 'react';
import { postJSON } from '../api.js';

// Shows one question, its four options, and the result once an option is picked.
export default function QuestionCard({ data, picked, onPick, bestScore = 0 }) {
  const { question, options, answer, funFact } = data;
  const [hint, setHint] = useState('');
  const [loadingHint, setLoadingHint] = useState(false);
  const [hintError, setHintError] = useState('');

  // Clear local hint state when the question changes
  useEffect(() => {
    setHint('');
    setHintError('');
    setLoadingHint(false);
  }, [data]);

  async function fetchHint() {
    setLoadingHint(true);
    setHintError('');
    try {
      const res = await postJSON('/api/hint', { question });
      setHint(res.hint);
    } catch (err) {
      setHintError(err.message || 'Failed to get a hint');
    } finally {
      setLoadingHint(false);
    }
  }

  return (
    <div className="card">
      <div className="best-score">Best score: {bestScore}</div>
      <h2 className="question">{question}</h2>

      <div className="options">
        {options.map((option) => {
          let className = 'option';
          if (picked) {
            if (option === answer) className += ' correct';
            else if (option === picked) className += ' wrong';
          }

          return (
            <button
              key={option}
              className={className}
              disabled={Boolean(picked)}
              onClick={() => onPick(option)}
            >
              {option}
            </button>
          );
        })}
      </div>

      {!picked && !hint && (
        <div style={{ marginTop: '16px' }}>
          <button
            className="hint-button"
            onClick={fetchHint}
            disabled={loadingHint}
            style={{
              background: 'transparent',
              border: '1px solid var(--accent)',
              color: 'var(--accent)',
              padding: '6px 12px',
              fontSize: '13px',
              borderRadius: '6px',
            }}
          >
            {loadingHint ? 'Getting hint...' : 'Get Hint'}
          </button>
          {hintError && (
            <p className="error" style={{ fontSize: '13px', marginTop: '8px', padding: '6px 10px' }}>
              {hintError}
            </p>
          )}
        </div>
      )}

      {!picked && hint && (
        <div className="hintCallout">
          <strong>Hint</strong>
          <div>{hint}</div>
        </div>
      )}

      {picked && (
        <p className="result">
          {picked === answer ? 'Correct!' : `Nope — the answer was ${answer}.`}
        </p>
      )}

      {picked && funFact && (
        <div className="callout">
          <strong>Did you know?</strong>
          <div>{funFact}</div>
        </div>
      )}
    </div>
  );
}
