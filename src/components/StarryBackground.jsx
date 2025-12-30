import { useMemo } from 'react';
import './StarryBackground.css';

const StarryBackground = () => {
    // Generate random box-shadow values for stars
    const generateStars = (count) => {
        let value = '';
        for (let i = 0; i < count; i++) {
            // Random x (0-100vw) and y (0-200vh to allow scrolling animation)
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            value += `${x}px ${y}px #FFF`;
            if (i < count - 1) {
                value += ', ';
            }
        }
        return value;
    };

    const starsSm = useMemo(() => generateStars(700), []);
    const starsMd = useMemo(() => generateStars(200), []);
    const starsLg = useMemo(() => generateStars(100), []);

    return (
        <div className="starry-background">
            <div className="nebula"></div>
            <div className="stars-sm" style={{ boxShadow: starsSm }}></div>
            <div className="stars-md" style={{ boxShadow: starsMd }}></div>
            <div className="stars-lg" style={{ boxShadow: starsLg }}></div>
        </div>
    );
};

export default StarryBackground;
