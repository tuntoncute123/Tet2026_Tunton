import { useState, useRef, useEffect, useCallback } from 'react';
import './MusicPlayerModal.css';

// Import ảnh từ thư mục nhan
import nhan1 from '../8.3/nhan/473070012_1740558580057774_5239471001285401567_n.jpg';
import nhan2 from '../8.3/nhan/484454819_1787555022024796_4972958348730029276_n_cleanup.png';
import nhan3 from '../8.3/nhan/498225368_661468486727573_3295657091496065542_n.jpg';
import nhan4 from '../8.3/nhan/Screenshot 2025-11-11 173229.png';
import nhan5 from '../8.3/nhan/z7382237923179_018ea54c6f6972b382f011c9793dbe61.jpg';
import nhan6 from '../8.3/nhan/z7382238993474_36e0efffa2ba24b798e8f488365bb7fc.jpg';

// Import ảnh từ thư mục hue
import hue1 from '../8.3/hue/150976464_887195372042740_3615220983120976135_n.jpg';
import hue2 from '../8.3/hue/476159967_1799195324176069_5558618684124203463_n.jpg';
import hue3 from '../8.3/hue/476244217_1799195337509401_2751644267926723848_n.jpg';
import hue4 from '../8.3/hue/476667242_1799195300842738_2099258189274131979_n.jpg';

// Import ảnh từ thư mục an
import an1 from '../8.3/an/4682f1d7-f028-49de-b0e7-abc051248db8.jpg';
import an2 from '../8.3/an/4f2a59a3-3e2f-43d0-b676-0b765a85a3e6.jpg';
import an3 from '../8.3/an/500d53e9-8ccc-4d68-8dac-5ecc928274d0.jpg';
import an4 from '../8.3/an/cd58f71a-7793-473c-882a-b37770d4bc61.jpg';
import an5 from '../8.3/an/eac41048-d9da-4c88-a518-f1f2fc27fe2a.jpg';
import an6 from '../8.3/an/f78eb5c4-0543-4574-8a49-39fef37ad1c6.jpg';

// Import ảnh từ thư mục na
import na1 from '../8.3/na/605117038_1877331669574855_8864632626104638481_n.jpg';
import na2 from '../8.3/na/_MG_7395.JPG';
import na3 from '../8.3/na/🏔️.jpg';
import na4 from '../8.3/na/🦢⟡💭꙳◞🪽ྀི˖.jpg';
import na5 from '../8.3/na/🧺⸝⸝ 🥞 ⁺˚🧸⋆.jpg';

// Danh sách bài hát cho từng user (với YouTube Video IDs)
const SONG_SETS = {
    'Đỗ Thanh Nhàn': [{
        id: 1,
        title: "Dynamite",
        artist: "BTS",
        cover: nhan1,
        youtubeId: "HaEYUJ2aRHs"
    },
    {
        id: 2,
        title: "Save me",
        artist: "BTS",
        cover: nhan2,
        youtubeId: "384_y4CS9hI"
    },
    {
        id: 3,
        title: "Boy With Luv",
        artist: "BTS ft. Halsey",
        cover: nhan3,
        youtubeId: "Q-erYa8cwnc"
    },
    {
        id: 4,
        title: "DNA",
        artist: "BTS",
        cover: nhan4,
        youtubeId: "IfemyZEhfpY"
    },
    {
        id: 5,
        title: "FAKE LOVE",
        artist: "BTS",
        cover: nhan5,
        youtubeId: "NT8ePWlgx_Y"
    },
    {
        id: 6,
        title: "Butter",
        artist: "BTS",
        cover: nhan6,
        youtubeId: "NNCBq0JHXsU"
    }
    ],
    'Nguyễn Thị Kim Huệ': [{
        id: 1,
        title: "Ở trong khu rừng",
        artist: "Nguyễn Hùng",
        cover: hue1,
        youtubeId: "0DpHE1mh_1s"
    },
    {
        id: 2,
        title: "Phép màu",
        artist: "Nguyễn Hùng",
        cover: hue2,
        youtubeId: "jPjQJYKhhk4"
    },
    {
        id: 3,
        title: "Lan man",
        artist: "Ronboogz",
        cover: hue3,
        youtubeId: "Tl7GXYuEyAM"
    },
    {
        id: 4,
        title: "Không ngừng suy nghĩ",
        artist: "Dương Domic",
        cover: hue4,
        youtubeId: "r_kefAftC8M"
    }
    ],
    'Bùi Tôn Nữ Xuân An': [{
        id: 1,
        title: "Lost Stars",
        artist: "Adam Levine",
        cover: an1,
        youtubeId: "cL4uhaQ58Rk"
    },
    {
        id: 2,
        title: "Chờ Trong Trăng",
        artist: "Wren Evans ft. itsnk",
        cover: an2,
        youtubeId: "KYSEPcSUJFk"
    },
    {
        id: 3,
        title: "Fox Rain",
        artist: "Lee Sun Hee",
        cover: an3,
        youtubeId: "CCDv-y_sM_g"
    },
    {
        id: 4,
        title: "Show Me Love",
        artist: "RPT MCK",
        cover: an4,
        youtubeId: "IVr1d084nLg"
    },
    {
        id: 5,
        title: "Vừa Tìm Thấy Đã Đánh Mất",
        artist: "Wren Evans ft. itsnk",
        cover: an5,
        youtubeId: "yye-gi_j6kg"
    },
    {
        id: 6,
        title: "Window Shopper",
        artist: "HURRYKNG",
        cover: an6,
        youtubeId: "Au5bdSjP1UU"
    }
    ],
    'Trần Ly Na': [{
        id: 1,
        title: "Hẹn lần sau",
        artist: "Nguyễn Hùng",
        cover: na1,
        youtubeId: "wKIt5vBSW-4"
    },
    {
        id: 2,
        title: "Người đầu tiên",
        artist: "Juky San",
        cover: na2,
        youtubeId: "i54avTdUqwU"
    },
    {
        id: 3,
        title: "Cảm Ơn Người Đã Thức Cùng Tôi",
        artist: "Phùng Khánh Linh",
        cover: na3,
        youtubeId: "6Hv80f1-9UQ"
    },
    {
        id: 4,
        title: "Ai ngoài anh",
        artist: "VSTRA",
        cover: na4,
        youtubeId: "cthtCRmTcgA"
    },
    {
        id: 5,
        title: "Cứ Đổ tại cơn mưa",
        artist: "Hứa Kim Tuyền & Hoàng Duyên",
        cover: na5,
        youtubeId: "E8TyHPlyjkk"
    }
    ],
};

const MusicPlayerModal = ({ onClose, userName = 'Đỗ Thanh Nhàn' }) => {
    const SONGS = SONG_SETS[userName] || SONG_SETS['Đỗ Thanh Nhàn'];
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const modalRef = useRef();
    const playerRef = useRef(null);
    const progressIntervalRef = useRef(null);

    const currentSong = SONGS[currentSongIndex];

    // 1. Define navigation handlers first
    const handleNext = useCallback(() => {
        setCurrentSongIndex((prev) => (prev + 1) % SONGS.length);
        setProgress(0);
        setCurrentTime(0);
        setIsPlaying(false);
    }, [SONGS.length]);

    const handlePrev = useCallback(() => {
        setCurrentSongIndex((prev) => (prev - 1 + SONGS.length) % SONGS.length);
        setProgress(0);
        setCurrentTime(0);
        setIsPlaying(false);
    }, [SONGS.length]);

    const handleSelectSong = useCallback((index) => {
        setCurrentSongIndex(index);
        setProgress(0);
        setCurrentTime(0);
        setIsPlaying(false);
    }, []);

    // 2. Define progress tracking functions
    const startProgressTracking = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
        progressIntervalRef.current = setInterval(() => {
            if (playerRef.current && playerRef.current.getCurrentTime) {
                const current = playerRef.current.getCurrentTime();
                const total = playerRef.current.getDuration();
                setCurrentTime(current);
                setProgress((current / total) * 100);
            }
        }, 100);
    }, []);

    const stopProgressTracking = useCallback(() => {
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
        }
    }, []);

    // 3. Define YouTube callbacks
    const onPlayerReady = useCallback((event) => {
        const duration = event.target.getDuration();
        setDuration(duration);
    }, []);

    const onPlayerStateChange = useCallback((event) => {
        // YT.PlayerState.ENDED = 0
        if (event.data === 0) {
            handleNext();
        }
        // YT.PlayerState.PLAYING = 1
        if (event.data === 1) {
            setIsPlaying(true);
            startProgressTracking();
        }
        // YT.PlayerState.PAUSED = 2
        if (event.data === 2) {
            setIsPlaying(false);
            stopProgressTracking();
        }
    }, [handleNext, startProgressTracking, stopProgressTracking]);

    // 4. Initialize YouTube Player
    useEffect(() => {
        if (!currentSong.youtubeId) return;

        // Wait for YouTube API to be ready
        const initPlayer = () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }

            playerRef.current = new window.YT.Player('youtube-player', {
                height: '0',
                width: '0',
                videoId: currentSong.youtubeId,
                playerVars: {
                    autoplay: 0,
                    controls: 0,
                },
                events: {
                    onReady: onPlayerReady,
                    onStateChange: onPlayerStateChange,
                },
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
            if (progressIntervalRef.current) {
                clearInterval(progressIntervalRef.current);
            }
        };
    }, [currentSongIndex, currentSong.youtubeId, onPlayerReady, onPlayerStateChange]);

    // 5. Dummy progress for songs without YouTube ID
    useEffect(() => {
        if (currentSong.youtubeId) return;

        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setProgress(p => {
                    if (p >= 100) {
                        handleNext();
                        return 0;
                    }
                    return p + 0.5;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isPlaying, currentSongIndex, currentSong.youtubeId, handleNext]);

    const handlePlayPause = () => {
        if (currentSong.youtubeId && playerRef.current) {
            if (isPlaying) {
                playerRef.current.pauseVideo();
            } else {
                playerRef.current.playVideo();
            }
        } else {
            setIsPlaying(!isPlaying);
        }
    };

    const formatTime = (seconds) => {
        if (!seconds || isNaN(seconds)) return '0:00';
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (<div className="music-modal-overlay"
        onClick={onClose} > <div className="music-modal-content"
            ref={modalRef}
            onClick={e => e.stopPropagation()} > { /* Hidden YouTube Player */} <div id="youtube-player"
                style={
                    { display: 'none' }
                } > </div>

            { /* Header */} <div className="music-modal-header" > <div className="music-modal-title-wrapper" > <svg className="music-modal-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round" > <path d="M9 18V5l12-2v13" > </path><circle cx="6"
                    cy="18"
                    r="3" > </circle><circle cx="18"
                        cy="16"
                        r="3" > </circle></svg> <span className="music-modal-title" > Music Player </span></div> <button className="music-modal-close"
                            onClick={onClose} > ✕ </button></div>

            { /* Album Cover */} <div className="music-album-cover" > <img src={currentSong.cover}
                alt={currentSong.title}
            /><div className="music-album-overlay"></div> </div>

            { /* Song Info */} <div className="music-song-info" > <h3 className="music-song-title" > {currentSong.title} </h3><p className="music-song-artist"> {currentSong.artist} </p> {
                currentSong.youtubeId && <span className="music-youtube-badge" > 🎵YouTube </span>} </div>

            { /* Progress Bar */} <div className="music-progress-container" > <span className="music-time-label" > {formatTime(currentTime)} </span><div className="music-progress-bar"><div className="music-progress-fill"
                style={
                    { width: `${progress}%` }
                } > </div></div> <span className="music-time-label" > {formatTime(duration || 180)} </span></div>

            { /* Controls */} <div className="music-controls" > <button className="music-control-btn"
                onClick={handlePrev} > <svg xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" > <polygon points="19 20 9 12 19 4 19 20" > </polygon><line x1="5"
                        y1="19"
                        x2="5"
                        y2="5" > </line></svg> </button><button className="music-control-btn music-play-btn"
                            onClick={handlePlayPause} > {
                        isPlaying ? (<svg xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round" > <rect x="6"
                                y="4"
                                width="4"
                                height="16" > </rect><rect x="14"
                                    y="4"
                                    width="4"
                                    height="16" > </rect></svg>
                        ) : (<svg xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round" > <polygon points="5 3 19 12 5 21 5 3" > </polygon></svg>
                        )
                    } </button><button className="music-control-btn"
                        onClick={handleNext} > <svg xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round" > <polygon points="5 4 15 12 5 20 5 4" > </polygon><line x1="19"
                                y1="5"
                                x2="19"
                                y2="19" > </line></svg> </button></div>

            { /* Playlist */} <div className="music-playlist" > <h4 className="music-playlist-title" > Playlist </h4><div className="music-playlist-items"> {
                SONGS.map((song, index) => (<div key={song.id}
                    className={`music-playlist-item ${index === currentSongIndex ? 'active' : ''}`}
                    onClick={
                        () => handleSelectSong(index)
                    } > <div className="music-playlist-item-cover" > <img src={song.cover}
                        alt={song.title}
                    /></div> <div className="music-playlist-item-info" > <div className="music-playlist-item-title" > {song.title} </div><div className="music-playlist-item-artist"> {song.artist} </div> </div> {
                        index === currentSongIndex && isPlaying && (<div className="music-eq-icon" > <span > </span><span></span> <span > </span></div>)
                    } </div>))
            } </div></div> </div></div>
    );
};

export default MusicPlayerModal;