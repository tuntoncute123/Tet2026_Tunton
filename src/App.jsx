
import { useState } from 'react';
import './App.css';

// Core Components
import StarryBackground from './components/StarryBackground';
import FallingBlossoms from './components/FallingBlossoms';
import FloatingGallery from './components/FloatingGallery';
import BackgroundMusic from './components/BackgroundMusic';
import Countdown from './components/Countdown';
import Celebration from './components/Celebration';

// Feature Pages (Modals/Overlays)
import QuestionPage from './components/QuestionPage';
import WishesPage from './components/WishesPage';
import MemoryPage from './components/MemoryPage';
import ViewMemoriesPage from './components/ViewMemoriesPage';
import ViewWishesPage from './components/ViewWishesPage';
import WordCloudPage from './components/WordCloudPage';
import RegretPage from './components/RegretPage';

// Buttons
import QuestionButton from './components/QuestionButton';
import WishesButton from './components/WishesButton';
import MemoryButton from './components/MemoryButton';
import ViewMemoriesButton from './components/ViewMemoriesButton';
import ViewWishesButton from './components/ViewWishesButton';
import WordCloudButton from './components/WordCloudButton';
import UploadGalleryButton from './components/UploadGalleryButton';
import RegretButton from './components/RegretButton';

function App() {
    const [currentView, setCurrentView] = useState('home'); // 'home', 'question', 'wishes', 'memory', 'view-wishes', 'view-memories', 'wordcloud', 'regret'
    const [showCelebration, setShowCelebration] = useState(false);

    // Return to home screen
    const handleBack = () => setCurrentView('home');

    // Handle Countdown Completion
    const handleNewYear = () => {
        setShowCelebration(true);
    };

    // Render the active main content
    const renderContent = () => {
        switch (currentView) {
            case 'question':
                return <QuestionPage onBack={handleBack} />;
            case 'wishes':
                return <WishesPage onBack={handleBack} />;
            case 'memory':
                return <MemoryPage onBack={handleBack} />;
            case 'view-memories':
                return <ViewMemoriesPage onBack={handleBack} />;
            case 'view-wishes':
                return <ViewWishesPage onBack={handleBack} />;
            case 'wordcloud':
                return <WordCloudPage onBack={handleBack} />;
            case 'regret':
                return <RegretPage onBack={handleBack} />;
            case 'home':
            default:
                return (
                    <>
                        <div className="hero">
                            <Countdown targetDate="2026-01-01T00:00:00" onComplete={handleNewYear} />
                            <p className="subtitle">
                                Cùng nhau đếm ngược khoảnh khắc tuyệt vời nhất của lớp 9A
                            </p>
                        </div>

                        <div className="grid">
                            {/* Game / Quiz */}
                            <QuestionButton onClick={() => setCurrentView('question')} />

                            {/* Interaction: Wishes & Memories */}
                            <WishesButton onClick={() => setCurrentView('wishes')} />
                            <MemoryButton onClick={() => setCurrentView('memory')} />

                            {/* Viewing Data */}
                            <ViewMemoriesButton onClick={() => setCurrentView('view-memories')} />
                            <ViewWishesButton onClick={() => setCurrentView('view-wishes')} />
                            <WordCloudButton onClick={() => setCurrentView('wordcloud')} />

                            {/* Upload to Background Gallery */}
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <UploadGalleryButton />
                            </div>
                        </div>
                    </>
                );
        }
    };

    return (
        <div className="app-root">
            {/* Background Layer */}
            <StarryBackground />
            <FallingBlossoms />
            <FloatingGallery /> {/* Handles its own clicks & modal */}

            {/* Audio Layer */}
            <BackgroundMusic />

            {/* Celebration Layer (Overlay) */}
            {showCelebration && <Celebration onClose={() => setShowCelebration(false)} />}

            {/* Main UI Layer */}
            <main className="app-container">
                {renderContent()}
            </main>

            {/* Floating Regret Button - Only show on home */}
            {currentView === 'home' && (
                <RegretButton onClick={() => setCurrentView('regret')} />
            )}
        </div>
    );
}


export default App;
