import { useState, useRef, useMemo } from 'react';
import './GiftModal.css';

// Generate random values outside component to avoid impurity during render
const generateStars = () =>
    Array.from({ length: 30 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        width: Math.random() * 4 + 1,
        height: Math.random() * 4 + 1,
        delay: Math.random() * 4
    }));

const generateConfetti = () =>
    Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: ['#ff69b4', '#ffc0cb', '#ff1493', '#ff85c0', '#ffb6c1'][Math.floor(Math.random() * 5)]
    }));

const GiftModal = ({ onClose, userName = 'Đỗ Thanh Nhàn' }) => {
    const [isOpened, setIsOpened] = useState(false);
    const modalRef = useRef();

    // Generate random values once on mount
    const stars = useMemo(() => generateStars(), []);
    const confetti = useMemo(() => generateConfetti(), []);

    const handleOpenGift = () => {
        setIsOpened(true);
    };

    return ( <
        div className = "gift-modal-overlay"
        onClick = { onClose } >
        <
        div className = "gift-modal-content"
        ref = { modalRef }
        onClick = { e => e.stopPropagation() } > { /* Nền Sao twinkling */ } <
        div className = "gift-stars" > {
            stars.map((star) => ( <
                div key = { `star-${star.id}` }
                className = "gift-star"
                style = {
                    {
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        width: `${star.width}px`,
                        height: `${star.height}px`,
                        animationDelay: `${star.delay}s`
                    }
                }
                />
            ))
        } <
        /div>

        <
        div className = "gift-modal-badge" > { isOpened ? 'Dành tặng bạn tôi' : 'Nhấn vào để mở quà' } <
        /div>

        <
        button className = "gift-modal-close"
        onClick = { onClose } > ✕
        <
        /button>

        {
            !isOpened ? (
                // Hiển thị hộp quà
                <
                div className = "gift-box-container"
                onClick = { handleOpenGift } >
                <
                div className = "gift-box-wrapper" > { /* Hộp quà */ } <
                div className = "gift-box" > { /* Nắp hộp */ } <
                div className = "gift-box-lid" >
                <
                div className = "gift-ribbon-horizontal" > < /div> <
                /div> { /* Thân hộp */ } <
                div className = "gift-box-body" >
                <
                div className = "gift-ribbon-vertical" > < /div> <
                /div> { /* Nơ */ } <
                div className = "gift-bow" >
                <
                div className = "bow-left" > < /div> <
                div className = "bow-right" > < /div> <
                div className = "bow-center" > < /div> <
                /div> <
                /div> { /* Bóng hộp quà */ } <
                div className = "gift-box-shadow" > < /div> <
                /div> <
                div className = "gift-click-hint" > ✨Click để mở✨ < /div> <
                /div>
            ) : (
                // Hiển thị bó hoa và gấu bông
                <
                div className = "gift-opened-content" > { /* Confetti effect */ } <
                div className = "confetti-container" > {
                    confetti.map((item) => ( <
                        div key = { `confetti-${item.id}` }
                        className = "confetti"
                        style = {
                            {
                                left: `${item.left}%`,
                                animationDelay: `${item.delay}s`,
                                animationDuration: `${item.duration}s`,
                                backgroundColor: item.color
                            }
                        }
                        />
                    ))
                } <
                /div>

                <
                div className = "gifts-display" > { /* Sparkles effect */ } <
                div className = "sparkles" > {
                    [...Array(12)].map((_, i) => ( <
                        div key = { `sparkle-${i}` }
                        className = "sparkle"
                        style = {
                            {
                                left: `${10 + i * 8}%`,
                                top: `${20 + (i % 3) * 25}%`,
                                animationDelay: `${2 + i * 0.2}s`
                            }
                        } >
                        ✨
                        <
                        /div>
                    ))
                } <
                /div>

                { /* Bó hoa */ } <
                div className = "flower-bouquet" >
                <
                div className = "bouquet-icon" > 💐 < /div> <
                div className = "bouquet-roses" >
                <
                span className = "rose" > 🌹 < /span> <
                span className = "rose" > 🌹 < /span> <
                span className = "rose" > 🌹 < /span> <
                /div> <
                /div>

                { /* Gấu bông */ } <
                div className = "teddy-bear" >
                <
                svg viewBox = "0 0 300 400"
                className = "teddy-svg" >
                <
                defs >
                <
                radialGradient id = "bearGrad"
                cx = "30%"
                cy = "30%" >
                <
                stop offset = "0%"
                stopColor = "#d2691e" / >
                <
                stop offset = "100%"
                stopColor = "#8b4513" / >
                <
                /radialGradient> <
                radialGradient id = "bearLightGrad"
                cx = "30%"
                cy = "30%" >
                <
                stop offset = "0%"
                stopColor = "#f4a460" / >
                <
                stop offset = "100%"
                stopColor = "#cd853f" / >
                <
                /radialGradient> <
                /defs>

                { /* Thân */ } <
                ellipse cx = "150"
                cy = "280"
                rx = "70"
                ry = "85"
                fill = "url(#bearGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2s' } }
                />

                { /* Chân trái */ } <
                ellipse cx = "120"
                cy = "350"
                rx = "30"
                ry = "40"
                fill = "url(#bearGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.1s' } }
                /> <
                ellipse cx = "120"
                cy = "370"
                rx = "28"
                ry = "15"
                fill = "url(#bearLightGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.15s' } }
                />

                { /* Chân phải */ } <
                ellipse cx = "180"
                cy = "350"
                rx = "30"
                ry = "40"
                fill = "url(#bearGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.2s' } }
                /> <
                ellipse cx = "180"
                cy = "370"
                rx = "28"
                ry = "15"
                fill = "url(#bearLightGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.25s' } }
                />

                { /* Tay trái */ } <
                ellipse cx = "90"
                cy = "270"
                rx = "25"
                ry = "55"
                fill = "url(#bearGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.3s' } }
                transform = "rotate(-20 90 270)" / >
                <
                circle cx = "85"
                cy = "310"
                r = "18"
                fill = "url(#bearLightGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.35s' } }
                />

                { /* Tay phải */ } <
                ellipse cx = "210"
                cy = "270"
                rx = "25"
                ry = "55"
                fill = "url(#bearGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.4s' } }
                transform = "rotate(20 210 270)" / >
                <
                circle cx = "215"
                cy = "310"
                r = "18"
                fill = "url(#bearLightGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.45s' } }
                />

                { /* Đầu */ } <
                circle cx = "150"
                cy = "180"
                r = "60"
                fill = "url(#bearGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.5s' } }
                /> <
                ellipse cx = "150"
                cy = "200"
                rx = "40"
                ry = "35"
                fill = "url(#bearLightGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.55s' } }
                />

                { /* Tai trái */ } <
                circle cx = "110"
                cy = "140"
                r = "25"
                fill = "url(#bearGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.6s' } }
                /> <
                circle cx = "110"
                cy = "140"
                r = "15"
                fill = "url(#bearLightGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.65s' } }
                />

                { /* Tai phải */ } <
                circle cx = "190"
                cy = "140"
                r = "25"
                fill = "url(#bearGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.7s' } }
                /> <
                circle cx = "190"
                cy = "140"
                r = "15"
                fill = "url(#bearLightGrad)"
                className = "bear-part"
                style = {
                    { animationDelay: '2.75s' } }
                />

                { /* Mắt trái */ } <
                circle cx = "135"
                cy = "180"
                r = "6"
                fill = "#000"
                className = "bear-part"
                style = {
                    { animationDelay: '2.8s' } }
                /> <
                circle cx = "137"
                cy = "178"
                r = "2"
                fill = "#fff"
                className = "bear-part"
                style = {
                    { animationDelay: '2.82s' } }
                />

                { /* Mắt phải */ } <
                circle cx = "165"
                cy = "180"
                r = "6"
                fill = "#000"
                className = "bear-part"
                style = {
                    { animationDelay: '2.85s' } }
                /> <
                circle cx = "167"
                cy = "178"
                r = "2"
                fill = "#fff"
                className = "bear-part"
                style = {
                    { animationDelay: '2.87s' } }
                />

                { /* Mũi */ } <
                ellipse cx = "150"
                cy = "200"
                rx = "8"
                ry = "6"
                fill = "#000"
                className = "bear-part"
                style = {
                    { animationDelay: '2.9s' } }
                />

                { /* Miệng */ } <
                path d = "M 150 200 Q 140 210 135 208"
                stroke = "#000"
                strokeWidth = "2"
                fill = "none"
                className = "bear-part"
                style = {
                    { animationDelay: '2.95s' } }
                /> <
                path d = "M 150 200 Q 160 210 165 208"
                stroke = "#000"
                strokeWidth = "2"
                fill = "none"
                className = "bear-part"
                style = {
                    { animationDelay: '2.95s' } }
                />

                { /* Nơ cổ */ } <
                ellipse cx = "150"
                cy = "240"
                rx = "15"
                ry = "8"
                fill = "#ff1493"
                className = "bear-part"
                style = {
                    { animationDelay: '3s' } }
                /> <
                ellipse cx = "130"
                cy = "240"
                rx = "20"
                ry = "12"
                fill = "#ff69b4"
                className = "bear-part"
                style = {
                    { animationDelay: '3.05s' } }
                transform = "rotate(-30 130 240)" / >
                <
                ellipse cx = "170"
                cy = "240"
                rx = "20"
                ry = "12"
                fill = "#ff69b4"
                className = "bear-part"
                style = {
                    { animationDelay: '3.05s' } }
                transform = "rotate(30 170 240)" / >

                { /* Trái tim trên bụng */ } <
                path d = "M 150 270 C 150 265 145 260 140 260 C 135 260 132 263 132 268 C 132 275 150 288 150 288 C 150 288 168 275 168 268 C 168 263 165 260 160 260 C 155 260 150 265 150 270 Z"
                fill = "#ff1493"
                className = "bear-part"
                style = {
                    { animationDelay: '3.1s' } }
                /> <
                /svg> <
                /div>

                { /* Message */ } <
                div className = "gift-message" >
                <
                span className = "message-emoji" > 💝 < /span> <
                span className = "message-text" > Dành tặng { userName } < /span> <
                span className = "message-text" style={{fontSize: '0.9em', marginTop: '-0.2rem'}}>xinh đẹp< /span> <
                span className = "message-emoji" > 💝 < /span> <
                /div> <
                /div> <
                /div>
            )
        } <
        /div> <
        /div>
    );
};

export default GiftModal;