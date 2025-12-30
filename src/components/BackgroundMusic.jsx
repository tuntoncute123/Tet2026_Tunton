import { useState, useEffect, useRef } from 'react';
import musicFile from '../assets/NhacBG.mp3';
import './BackgroundMusic.css';

const BackgroundMusic = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [hasInteracted, setHasInteracted] = useState(false);

    useEffect(() => {
        // Try to play automatically when component mounts
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                    // Autoplay started!
                })
                .catch((error) => {
                    // Autoplay was prevented.
                    // We simply wait for user interaction to start playing
                    console.log("Autoplay blocked by browser policy, waiting for interaction.");
                    setIsPlaying(false);
                });
        }
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
        setHasInteracted(true);
    };

    return (
        <div className="music-control-container">
            <audio
                ref={audioRef}
                src={musicFile}
                loop
                preload="auto"
            />

            <button
                onClick={togglePlay}
                className={`music-btn ${isPlaying ? 'playing' : 'paused'} ${!hasInteracted && !isPlaying ? 'pulse-attention' : ''}`}
                title={isPlaying ? "Pause Music" : "Play Music"}
            >
                {isPlaying ? (
                    <span className="icon">🔊</span>
                ) : (
                    <span className="icon">🔇</span>
                )}
            </button>
        </div>
    );
};

export default BackgroundMusic;
