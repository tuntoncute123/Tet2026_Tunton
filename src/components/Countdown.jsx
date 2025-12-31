import { useState, useEffect } from 'react';
import './Countdown.css';

const TimeUnit = ({ value, label }) => (
    <div className="time-unit">
        <div className="time-card">
            <span className="time-value">
                {value < 10 ? `0${value}` : value}
            </span>
        </div>
        <span className="time-label">{label}</span>
    </div>
);

const Countdown = ({ targetDate, onComplete }) => {

    function calculateTimeLeft() {
        const difference = +new Date(targetDate) - +new Date();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, completed: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            completed: false
        };
    }

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            const newTimeLeft = calculateTimeLeft();
            setTimeLeft(newTimeLeft);
            if (newTimeLeft.completed) {
                clearInterval(timer);
                onComplete();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

    return (
        <div className="countdown-container">
            <h1 className="countdown-title">
                Countdown to <span className="highlight">2026</span>
            </h1>
            <div className="timer-grid">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>
        </div>
    );
};

export default Countdown;
