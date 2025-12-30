import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './Celebration.css';

const Celebration = ({ onClose }) => {
    const titleRef = useRef(null);

    useEffect(() => {
        // Fireworks configuration
        const duration = 60 * 1000; // Last for 60 seconds
        const animationEnd = Date.now() + duration;
        const colors = ['#ff0000', '#ffd700', '#ff4500', '#00ff00', '#ffffff']; // Red, Gold, Orange, Green, White

        const randomInRange = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // Firework 1
            confetti({
                particleCount,
                startVelocity: 30,
                spread: 360,
                origin: {
                    x: randomInRange(0.1, 0.9),
                    y: Math.random() - 0.2
                },
                colors: colors,
                zIndex: 100 // High z-index to show above text
            });

            // Firework 2 (delayed slightly in loop)
            confetti({
                particleCount: particleCount * 0.5,
                startVelocity: 45,
                spread: 100,
                decay: 0.91,
                scalar: 0.8,
                origin: {
                    x: randomInRange(0.1, 0.9),
                    y: Math.random() - 0.2
                },
                colors: colors,
                zIndex: 100
            });

        }, 400);

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

                <button
                    className="celebration-home-btn"
                    onClick={onClose}
                >
                    Vào Tiệc Ngay ➜
                </button>
            </div>
        </div>
    );
};

export default Celebration;
