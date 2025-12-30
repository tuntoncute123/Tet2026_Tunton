import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './Celebration.css';

const Celebration = () => {
    const titleRef = useRef(null);

    useEffect(() => {
        // Basic explosion
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            // since particles fall down, start a bit higher than random
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            });
            confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="celebration-container">
            <div className="firework"></div>
            <div className="firework"></div>
            <div className="firework"></div>

            <div className="content-wrapper">
                <h1 className="happy-new-year" ref={titleRef}>
                    <span className="text-glow">HAPPY</span>
                    <br />
                    <span className="text-glow">NEW YEAR</span>
                </h1>
                <div className="year-display">
                    <span>2</span>
                    <span>0</span>
                    <span>2</span>
                    <span>6</span>
                </div>
                <p className="wishes">
                    Wishing you a year filled with new hope, new aspirations, and new happiness.
                </p>
            </div>
        </div>
    );
};

export default Celebration;
