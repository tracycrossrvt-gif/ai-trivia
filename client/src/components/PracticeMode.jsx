import { useEffect, useState } from 'react';
import { postJSON } from '../api.js';

export default function PracticeMode() {
  const [domains, setDomains] = useState([]);
  const [selectedDomain, setSelectedDomain] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [error, setError] = useState('');

  const question = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const finished = started && questions.length > 0 && currentIndex >= questions.length;

  useEffect(() => {
    const controller = new AbortController();

    async function loadDomains() {
      try {
        const response = await fetch('/api/practice/domains', {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Failed to load VTNE subjects');
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

  function reset() {
    setQuestions([]);
    setCurrentIndex(0);
    setResult(null);
    setCorrectCount(0);
    setStarted(false);
  }

  async function loadQuestions(event) {
    event?.preventDefault();
    if (!selectedDomain || loading) return;

    setLoading(true);
    setError('');
    reset();

    try {
      const response = await fetch(
        `/api/practice/questions?domain=${encodeURIComponent(selectedDomain)}`,
      );

      if (!response.ok) {
        throw new Error('Failed to load practice questions');
      }

      const data = await response.json();
      setQuestions(data.questions);
      setStarted(true);
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
      if (data.correct) setCorrectCount((previous) => previous + 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnswering(false);
    }
  }

  function nextQuestion() {
    setResult(null);
    setCurrentIndex((previous) => previous + 1);
  }

  return (
    <section className="card">
      <h2>Practice by Subject</h2>
      <p>Choose a VTNE subject and work through its questions.</p>

      <form onSubmit={loadQuestions} className="topic-form practice-domain-form">
        <select
          aria-label="VTNE study subject"
          value={selectedDomain}
          onChange={(event) => {
            setSelectedDomain(event.target.value);
            reset();
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

      {loading && <p role="status">Loading practice questions...</p>}

      {started && !loading && questions.length === 0 && (
        <p>No reviewed questions are available for this subject yet.</p>
      )}

      {question && (
        <div className="practice-question">
          <p className="muted">
            Question {currentIndex + 1} of {questions.length}
          </p>

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
              <strong>{result.correct ? 'Correct!' : 'Not quite!'}</strong>
              <p>Correct answer: {result.correctAnswer}</p>
              <p>{result.explanation}</p>
              {result.source?.title && (
                <small>Source: {result.source.title}</small>
              )}

              <div className="session-actions">
                <button type="button" onClick={nextQuestion}>
                  {isLastQuestion ? 'Finish Subject' : 'Next Question'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {finished && (
        <div className="callout">
          <strong>Subject complete!</strong>
          <p>
            You answered {correctCount} of {questions.length} correctly.
          </p>
          <div className="session-actions">
            <button type="button" onClick={loadQuestions}>
              Practice This Subject Again
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
