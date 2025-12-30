import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import './ViewWishesPage.css';

const ViewWishesPage = ({ onBack }) => {
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedWish, setSelectedWish] = useState(null);

    // Fetch wishes once
    useEffect(() => {
        const fetchWishes = async () => {
            try {
                const { data, error } = await supabase
                    .from('wishes')
                    .select('name, message') // Fetch name and message
                    .order('created_at', { ascending: false });

                if (error) throw error;
                // Add some default wishes if empty so users see something
                if (!data || data.length === 0) {
                    setWishes([
                        { name: "Ban Quan Trị", message: "Chúc mừng năm mới! An khang thịnh vượng." },
                        { name: "Admin", message: "Vạn sự như ý - Tỷ sự như mơ!" }
                    ]);
                } else {
                    setWishes(data);
                }
            } catch (error) {
                console.error("Error fetching wishes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchWishes();
    }, []);

    // Generate falling items
    // We create a fixed number of "raindrops" (envelopes) matching the wishes or a set limit
    const drops = useMemo(() => {
        if (loading || wishes.length === 0) return [];

        // Create 30 falling envelopes recycling the wishes
        return Array.from({ length: 30 }).map((_, i) => ({
            id: i,
            wish: wishes[i % wishes.length], // Cycle through wishes
            left: Math.random() * 90 + 5, // Random position 5% - 95%
            delay: Math.random() * 5, // Random delay
            duration: Math.random() * 5 + 5, // Speed between 5s and 10s
            scale: Math.random() * 0.3 + 0.7 // Slight size variation
        }));
    }, [loading, wishes]);

    return (
        <div className="falling-wishes-container">
            <button className="back-btn-fixed" onClick={onBack}>
                ← Quay lại
            </button>

            {loading ? (
                <div className="loading-text">Đang chuẩn bị lì xì...</div>
            ) : (
                <div className="sky-area">
                    {drops.map((drop) => (
                        <div
                            key={drop.id}
                            className="falling-envelope"
                            style={{
                                left: `${drop.left}%`,
                                animationDelay: `${drop.delay}s`,
                                animationDuration: `${drop.duration}s`,
                                transform: `scale(${drop.scale})`
                            }}
                            onClick={() => setSelectedWish(drop.wish)}
                        >
                            <div className="envelope-icon bounce">
                                <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="5" y="10" width="50" height="65" rx="4" fill="#E11D48" stroke="#9F1239" strokeWidth="2" />
                                    <path d="M5 10 L30 40 L55 10" fill="#FB7185" stroke="#9F1239" strokeWidth="2" />
                                    <circle cx="30" cy="40" r="8" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
                                    <path d="M26 38 L30 42 L34 38" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Popup Modal for Message */}
            {selectedWish && (
                <div className="wish-modal-overlay" onClick={() => setSelectedWish(null)}>
                    <div className="wish-modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            {/* Icon removed */}
                        </div>
                        <p className="modal-message">
                            "{selectedWish.message}"
                        </p>
                        <p className="modal-footer" style={{ color: '#fbbf24', fontWeight: 'bold', fontSize: '1.2rem' }}>
                            {selectedWish.name ? `Lời chúc từ: ${selectedWish.name}` : "(Ẩn danh)"}
                        </p>
                        <button className="close-modal-btn" onClick={() => setSelectedWish(null)}>
                            Đóng
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewWishesPage;
