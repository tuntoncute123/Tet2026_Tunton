import { useState } from 'react';
import Countdown from './components/Countdown';
import Celebration from './components/Celebration';
import StarryBackground from './components/StarryBackground';
import FloatingGallery from './components/FloatingGallery';
import BackgroundMusic from './components/BackgroundMusic';
import QuestionButton from './components/QuestionButton';
import QuestionPage from './components/QuestionPage';
import WishesButton from './components/WishesButton';
import WishesPage from './components/WishesPage';
import ViewWishesButton from './components/ViewWishesButton';
import ViewWishesPage from './components/ViewWishesPage';
import './App.css';

// Set target to January 1, 2026 00:00:00
const targetDate = new Date('2026-01-01T00:00:00');

function App() {
  // 'home' | 'questions' | 'wishes' | 'view-wishes'
  const [currentView, setCurrentView] = useState('home');
  const [isNewYear, setIsNewYear] = useState(false);

  const renderContent = () => {
    if (currentView === 'questions') {
      return <QuestionPage onBack={() => setCurrentView('home')} />;
    }
    if (currentView === 'wishes') {
      return <WishesPage onBack={() => setCurrentView('home')} />;
    }
    if (currentView === 'view-wishes') {
      return <ViewWishesPage onBack={() => setCurrentView('home')} />;
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

      {/* Only show Action Buttons when on Home view */}
      {currentView === 'home' && (
        <>
          <ViewWishesButton onClick={() => setCurrentView('view-wishes')} />
          <WishesButton onClick={() => setCurrentView('wishes')} />
          <QuestionButton onClick={() => setCurrentView('questions')} />
        </>
      )}
    </div>
  );
}

export default App;
