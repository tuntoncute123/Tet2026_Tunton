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
import MemoryButton from './components/MemoryButton';
import MemoryPage from './components/MemoryPage';
import ViewMemoriesButton from './components/ViewMemoriesButton';
import ViewMemoriesPage from './components/ViewMemoriesPage';
import WordCloudButton from './components/WordCloudButton';
import WordCloudPage from './components/WordCloudPage';
import OrientationLock from './components/OrientationLock';
import './App.css';

// Set target to January 1, 2026 00:00:00
const targetDate = new Date('2026-01-01T00:00:00');

function App() {
  // 'home' | 'questions' | 'wishes' | 'view-wishes' | 'memory' | 'view-memories' | 'word-cloud'
  const [currentView, setCurrentView] = useState('home');
  const [isNewYear, setIsNewYear] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case 'questions':
        return <QuestionPage onBack={() => setCurrentView('home')} />;
      case 'wishes':
        return <WishesPage onBack={() => setCurrentView('home')} />;
      case 'view-wishes':
        return <ViewWishesPage onBack={() => setCurrentView('home')} />;
      case 'memory':
        return <MemoryPage onBack={() => setCurrentView('home')} />;
      case 'view-memories':
        return <ViewMemoriesPage onBack={() => setCurrentView('home')} />;
      case 'word-cloud':
        return <WordCloudPage onBack={() => setCurrentView('home')} />;
      default:
        // Home View Logic
        return isNewYear ? (
          <Celebration />
        ) : (
          <Countdown
            targetDate={targetDate}
            onComplete={() => setIsNewYear(true)}
          />
        );
    }
  };

  return (
    <div className="app-container">
      <OrientationLock />
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
          {/* Left Side */}
          <WordCloudButton onClick={() => setCurrentView('word-cloud')} />
          <ViewMemoriesButton onClick={() => setCurrentView('view-memories')} />
          <MemoryButton onClick={() => setCurrentView('memory')} />

          {/* Right Side */}
          <ViewWishesButton onClick={() => setCurrentView('view-wishes')} />
          <WishesButton onClick={() => setCurrentView('wishes')} />
          <QuestionButton onClick={() => setCurrentView('questions')} />
        </>
      )}
    </div>
  );
}

export default App;
