import { useState } from 'react';
import Countdown from './components/Countdown';
import Celebration from './components/Celebration';
import StarryBackground from './components/StarryBackground';
import './App.css';

function App() {
  const [isNewYear, setIsNewYear] = useState(false);

  // Set target to January 1, 2026 00:00:00
  // Note: For testing purposes, you can change this date to a few seconds in the future
  const targetDate = new Date('2026-01-01T00:00:00');

  return (
    <div className="app-container">
      <StarryBackground />
      {isNewYear ? (
        <Celebration />
      ) : (
        <Countdown
          targetDate={targetDate}
          onComplete={() => setIsNewYear(true)}
        />
      )}
    </div>
  );
}

export default App;
