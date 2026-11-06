
import { useEffect, useState } from 'react';
import { postJSON } from '../api.js';

export default function PracticeMode() {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [question, setQuestion] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadDomains() {
      try {
        const response = await fetch('/api/practice/domains', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to load VTNE domains');
        }

        const data = await response.json();
        setDomains(data.domains);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      }
    }

    loadDomains();
    return () => controller.abort();
  }, []);

  async function loadQuestion(event) {
    event.preventDefault();
    if (!selectedDomain || loading) return;

    setLoading(true);
    setError('');
    setQuestion(null);
    setResult(null);

    try {
      const response = await fetch(
        `/api/practice/questions?domain=${encodeURIComponent(selectedDomain)}`
      );

      if (!response.ok) {
        throw new Error('Failed to load practice questions');
      }

      const data = await response.json();
      setQuestion(data.questions[0] ?? null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer(option) {
    if (!question || result || answering) return;

    setAnswering(true);
    setError('');

    try {
      const data = await postJSON('/api/practice/answer', {
        questionId: question.id,
        selectedAnswer: option,
      });

      setResult({ ...data, selectedAnswer: option });
    } catch (err) {
      setError(err.message);
    } finally {
      setAnswering(false);
    }
  }

  return (
    <section className="card">
      <h2>VetBoard Practice Mode</h2>
      <p>Choose a VTNE domain to begin studying.</p>

      <form onSubmit={loadQuestion} className="topic-form practice-domain-form">
        <select
          aria-label="VTNE study domain"
          value={selectedDomain}
          onChange={(event) => {
            setSelectedDomain(event.target.value);
            setQuestion(null);
            setResult(null);
          }}
        >
          <option value="">Select a subject</option>
          {domains.map((domain) => (
            <option key={domain.id} value={domain.id}>
              {domain.name}
            </option>
          ))}
        </select>

        <button disabled={!selectedDomain || loading}>
          {loading ? 'Loading...' : 'Start Practice'}
        </button>
      </form>

      {error && <p className="error" role="alert">{error}</p>}

      {loading && <p role="status">Loading practice question...</p>}

      {!loading && selectedDomain && !question && !error && (
        <p>
          No reviewed questions are available for this subject yet.
        </p>
      )}

      {question && (
        <div className="practice-question">
          <h3>{question.question}</h3>

          <div className="options">
            {question.options.map((option) => {
              let className = 'option';

              if (result) {
                if (option === result.correctAnswer) {
                  className += ' correct';
                } else if (option === result.selectedAnswer) {
                  className += ' wrong';
                }
              }

              return (
                <button
                  key={option}
                  type="button"
                  className={className}
                  disabled={Boolean(result) || answering}
                  onClick={() => submitAnswer(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {answering && <p role="status">Checking answer...</p>}

          {result && (
            <div className="callout" aria-live="polite">
              <strong>
                {result.correct ? 'Correct!' : 'Not quite!'}
              </strong>
              <p>Correct answer: {result.correctAnswer}</p>
              <p>{result.explanation}</p>
              {result.source?.title && (
                <small>Source: {result.source.title}</small>
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
