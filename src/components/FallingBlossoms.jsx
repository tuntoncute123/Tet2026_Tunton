
import { useEffect, useState, memo } from 'react';
import './FallingBlossoms.css';

const FlowerIcon = ({ type }) => {
    // Determine color based on type, though CSS handles most of it via `currentColor`
    // We stick to a simple 5-petal shape
    return (
        <svg
            width="100%"
            height="100%"
            viewBox="0 0 512 512"
            fill="currentColor"
            style={{ display: 'block' }}
        >
            {/* A simple 5-petal flower path */}
            <path d="M256,0C157.5,0,121.2,65.8,121.2,121.2c0,33.5,15.6,83.8,61.9,134.8c-51,46.3-101.3,61.9-134.8,61.9
            C-7.2,317.9,0,457.5,0,457.5S139.6,464.7,194.1,409.3c33.5-33.5,49.1-83.8,61.9-134.8c12.8,51,28.4,101.3,61.9,134.8
            c54.5,54.5,194.1,48.2,194.1,48.2s7.2-139.6-48.2-194.1c-33.5-33.5-83.8-49.1-134.8-61.9c46.3-51,61.9-101.3,61.9-134.8
            C390.8,65.8,354.5,0,256,0z" transform="scale(0.8) translate(60, 20)" />
            {/* Center dot */}
            <circle cx="256" cy="256" r="30" fill="rgba(0,0,0,0.1)" />
        </svg>
    );
};

const FallingBlossoms = () => {
    const [blossoms] = useState(() => {
        // Create a fixed set of blossoms on mount
        const count = 30; // Number of flowers
        return Array.from({ length: count }).map((_, i) => {
            const type = Math.random() > 0.5 ? 'peach' : 'apricot'; // Random type
            const left = Math.random() * 100; // Random horizontal position 0-100%
            return {
                id: i,
                type,
                style: {
                    left: `${left}%`,
                    width: `${Math.random() * 15 + 15}px`, // Size 15px - 30px
                    opacity: Math.random() * 0.4 + 0.6, // Opacity 0.6 - 1.0
                    animationDuration: `${Math.random() * 10 + 10}s, ${Math.random() * 4 + 2}s`, // Fall speed 10-20s, Sway speed 2-6s
                    animationDelay: `-${Math.random() * 20}s, -${Math.random() * 20}s`, // Start at random times in the cycle
                }
            };
        });
    });

    return (
        <div className="falling-blossoms-container">
            {blossoms.map(b => (
                <div
                    key={b.id}
                    className={`blossom ${b.type}`}
                    style={b.style}
                >
                    <FlowerIcon type={b.type} />
                </div>
            ))}
        </div>
    );
};

export default memo(FallingBlossoms);
