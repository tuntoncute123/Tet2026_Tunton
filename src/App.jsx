import { useState } from 'react';
import Countdown from './components/Countdown';
import Celebration from './components/Celebration';
import StarryBackground from './components/StarryBackground';
import FloatingGallery from './components/FloatingGallery';
import BackgroundMusic from './components/BackgroundMusic';
import QuestionButton from './components/QuestionButton';
import QuestionPage from './components/QuestionPage';
import './App.css';

// Set target to January 1, 2026 00:00:00
const targetDate = new Date('2026-01-01T00:00:00');

function App() {
  // 'home' (countdown/celebration) or 'questions'
  const [currentView, setCurrentView] = useState('home');
  const [isNewYear, setIsNewYear] = useState(false);

  const renderContent = () => {
    if (currentView === 'questions') {
      return <QuestionPage onBack={() => setCurrentView('home')} />;
    }

    // Home View Logic
    return isNewYear ? (
      <Celebration />
    ) : (
      <Countdown
        targetDate={targetDate}
        onComplete={() => setIsNewYear(true)}
      />
    );
  };

  return (
    <div className="app-container">
      {/* Persistent Background Elements */}
      <BackgroundMusic />
      <StarryBackground />
      <FloatingGallery />

      {/* Main Content Area */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', justifyContent: 'center' }}>
        {renderContent()}
      </div>

      {/* Only show Question Button when on Home view */}
      {currentView === 'home' && (
        <QuestionButton onClick={() => setCurrentView('questions')} />
      )}
    </div>
  );
}

export default App;
