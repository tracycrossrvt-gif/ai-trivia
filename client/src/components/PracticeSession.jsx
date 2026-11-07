
import { useState } from 'react';
import { postJSON } from '../api.js';
import ExplainMore from './ExplainMore.jsx';

export default function PracticeSession() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [result, setResult] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [answering, setAnswering] = useState(false);
  const [error, setError] = useState('');
  const [phase, setPhase] = useState('idle');

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const [reviewing, setReviewing] = useState(false);
  const [reviewIndex, setReviewIndex] = useState(0);

  async function startSession() {
    if (loading || answering) return;

    setLoading(true);
    setError('');
    setQuestions([]);
    setCurrentIndex(0);
    setResult(null);
    setResults([]);
    setPhase('idle');

    try {
      const response = await fetch('/api/practice/session');

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error || 'Unable to start session');
      }

      const data = await response.json();

      if (!Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('No practice questions are available');
      }

      setQuestions(data.questions);
      setPhase('active');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer(option) {
    if (
      !currentQuestion ||
      result !== null ||
      answering ||
      phase !== 'active'
    ) {
      return;
    }

    setAnswering(true);
    setError('');

    try {
      const feedback = await postJSON('/api/practice/answer', {
        questionId: currentQuestion.id,
        selectedAnswer: option,
      });

      const answered = {
        questionId: currentQuestion.id,
        domain: currentQuestion.domain,
        domainName: currentQuestion.domainName,
        question: currentQuestion.question,
        selectedAnswer: option,
        ...feedback,
      };

      setResult(answered);
      setResults((previous) => [...previous, answered]);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnswering(false);
    }
  }

  function nextQuestion() {
    if (!result || phase !== 'active') return;

    if (isLastQuestion) {
      setPhase('complete');
      return;
    }

    setCurrentIndex((previous) => previous + 1);
    setResult(null);
    setError('');
  }

  
function startReview() {
  if (phase !== 'complete' || missedQuestions.length === 0) return;

  setReviewIndex(0);
  setReviewing(true);
}

function nextReview() {
  setReviewIndex((previous) =>
    Math.min(previous + 1, missedQuestions.length - 1)
  );
}

function previousReview() {
  setReviewIndex((previous) =>
    Math.max(previous - 1, 0)
  );
}

function finishReview() {
  setReviewing(false);
  setReviewIndex(0);
}


  const score = results.filter((item) => item.correct).length;
  const missedQuestions = results.filter((item) => !item.correct);
  const currentMissedQuestion = missedQuestions[reviewIndex];
    
  const domainResults = Object.values(
    results.reduce((acc, item) => {
        const domain = item.domain;

        if (!acc[domain]) {
        acc[domain] = {
            domain,
            domainName: item.domainName ?? domain,
            correct: 0,
            total: 0,
        };
        }

        acc[domain].total += 1;

        if (item.correct) {
        acc[domain].correct += 1;
        }

        return acc;
    }, {})
    ).map((domain) => ({
    ...domain,
    accuracy: Math.round(
        (domain.correct / domain.total) * 100
    ),
}));

  return (
    <section className="card">
      <h2>VTNE Practice Session</h2>

      {phase === 'idle' && (
        <div>
          <p>Practice with five questions across VTNE subjects.</p>
          <button onClick={startSession} disabled={loading}>
            {loading ? 'Preparing session...' : 'Start 5-Question Session'}
          </button>
        </div>
      )}

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {phase === 'active' && currentQuestion && (
        <div>
          <p>
            Question {currentIndex + 1} of {questions.length}
          </p>

          <progress
            value={currentIndex + 1}
            max={questions.length}
            aria-label="Practice session progress"
            style={{ width: '100%' }}
          />

          <h3>{currentQuestion.question}</h3>

          <div className="options">
            {currentQuestion.options.map((option) => {
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
                  disabled={answering || result !== null}
                  onClick={() => submitAnswer(option)}
                >
                  {option}
                </button>
              );
            })}
          </div>

          {answering && (
            <p role="status">Checking your answer...</p>
          )}

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

              <ExplainMore
                key={result.questionId}
                questionId={result.questionId}
                selectedAnswer={result.selectedAnswer}
              />

              <button type="button" onClick={nextQuestion}>
                {isLastQuestion ? 'See Results' : 'Next Question'}
              </button>
            </div>
          )}
        </div>
      )}

      {phase === 'complete' && (
        <div>
          <h3>Session Complete!</h3>
          <p>
            You answered {score} of {questions.length} correctly.
          </p>
          <p>
            Score: {Math.round((score / questions.length) * 100)}%
          </p>
           
<div className="domain-results">
  <h4>Performance by VTNE Subject</h4>

  {domainResults.map((domain) => (
    <div key={domain.domain} className="domain-result">
      <div className="domain-result-header">
        <strong>
          {domain.domainName}
        </strong>

        <span>
          {domain.correct}/{domain.total} — {domain.accuracy}%
        </span>
      </div>

      <progress
        value={domain.correct}
        max={domain.total}
        aria-label={`${domain.domainName} accuracy`}
        className="domain-progress"
      />
    </div>
  ))}
</div>
       

<div className="session-actions">
  {missedQuestions.length > 0 && !reviewing && (
    <button type="button" onClick={startReview}>
      Review {missedQuestions.length} Missed Question
      {missedQuestions.length === 1 ? '' : 's'}
    </button>
  )}

  <button
    type="button"
    onClick={startSession}
    disabled={loading}
  >
    {loading ? 'Preparing...' : 'Practice Again'}
  </button>
</div>


        
{reviewing && currentMissedQuestion && (
  <div className="missed-review">
    <h4>
      Reviewing Question {reviewIndex + 1} of{' '}
      {missedQuestions.length}
    </h4>

    <p>
      <strong>Subject:</strong>{' '}
      {currentMissedQuestion.domainName ?? currentMissedQuestion.domain}
    </p>

    <h3>{currentMissedQuestion.question}</h3>

    <p>
      <strong>Your answer:</strong>{' '}
      {currentMissedQuestion.selectedAnswer}
    </p>

    <p>
      <strong>Correct answer:</strong>{' '}
      {currentMissedQuestion.correctAnswer}
    </p>

    <div className="callout">
      <strong>Explanation</strong>
      <p>{currentMissedQuestion.explanation}</p>
      {currentMissedQuestion.source?.title && (
        <small>Source: {currentMissedQuestion.source.title}</small>
      )}

      <ExplainMore
        key={`review-${currentMissedQuestion.questionId}`}
        questionId={currentMissedQuestion.questionId}
        selectedAnswer={currentMissedQuestion.selectedAnswer}
      />
    </div>

    <div className="review-actions">
      <button
        type="button"
        onClick={previousReview}
        disabled={reviewIndex === 0}
      >
        Previous
      </button>

      {reviewIndex < missedQuestions.length - 1 ? (
        <button type="button" onClick={nextReview}>
          Next Missed Question
        </button>
      ) : (
        <button type="button" onClick={finishReview}>
          Finish Review
        </button>
      )}
    </div>
  </div>
)}

        </div>
      )}
    </section>
  );
}
