import { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = ({ targetDate, onComplete }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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

    useEffect(() => {
        const timer = setInterval(() => {
            const timeLeft = calculateTimeLeft();
            setTimeLeft(timeLeft);
            if (timeLeft.completed) {
                clearInterval(timer);
                onComplete();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate, onComplete]);

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

    return (
        <div className="countdown-container">
            <h1 className="countdown-title">
                Counting down to <span className="highlight">2026</span>
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
