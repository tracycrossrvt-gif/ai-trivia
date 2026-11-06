import PracticeMode from './components/PracticeMode.jsx';
import PracticeSession from './components/PracticeSession.jsx';

export default function App() {
  return (
    <main className="app">
      <header>
        <h1>VetBoard</h1>
        <p className="subtitle">VTNE study practice for veterinary technicians</p>
      </header>

      <PracticeMode />
      <PracticeSession />
    </main>
  );
}
