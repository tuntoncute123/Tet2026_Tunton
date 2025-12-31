
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './RegretPage.css';

const RegretPage = ({ onBack }) => {
    const [regretText, setRegretText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [recentRegrets, setRecentRegrets] = useState([]);
    const [selectedRegret, setSelectedRegret] = useState(null);

    const [loading, setLoading] = useState(true);

    // Fetch existing regrets
    useEffect(() => {
        const fetchRegrets = async () => {
            try {
                const { data, error } = await supabase
                    .from('regrets')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(20);

                if (error) throw error;
                setRecentRegrets(data || []);
            } catch (err) {
                console.error("Error fetching regrets:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchRegrets();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!regretText.trim()) return;

        setIsSubmitting(true);
        try {
            const { data, error } = await supabase
                .from('regrets')
                .insert([{ content: regretText.trim() }])
                .select()
                .single();

            if (error) throw error;

            // Add to list immediately
            if (data) {
                setRecentRegrets(prev => [data, ...prev]);
                setRegretText('');
                alert("Đã gửi nỗi lòng thành công. Mọi thứ sẽ nhẹ nhõm hơn thôi!");
            }
        } catch (err) {
            console.error("Error submitting regret:", err);
            alert("Có lỗi xảy ra, thử lại sau nhé.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="regret-page-container">
            {/* Detail Modal */}
            {selectedRegret && (
                <div className="regret-detail-overlay" onClick={() => setSelectedRegret(null)}>
                    <div className="regret-detail-modal" onClick={e => e.stopPropagation()}>
                        <button className="close-detail-btn" onClick={() => setSelectedRegret(null)}>×</button>
                        <div className="detail-heart-icon">💔</div>
                        <div className="detail-content">
                            <p>"{selectedRegret.content}"</p>
                        </div>
                        <div className="detail-footer">
                            <span className="detail-date">
                                Gửi ngày {new Date(selectedRegret.created_at).toLocaleDateString('vi-VN')}
                            </span>
                        </div>
                    </div>
                </div>
            )}

            <div className="regret-card">
                <button className="back-btn" onClick={onBack}>
                    ← Quay lại
                </button>

                <h1 className="regret-title">Góc Hối Tiếc</h1>
                <p className="regret-subtitle">
                    Ở đây không lưu tên nên mọi người có thể ghi dạng ẩn danh thỏa mái.
                    <br />
                    Hãy để lại những điều chưa nói, những điều hối tiếc để năm mới nhẹ lòng hơn.
                </p>

                <form className="regret-form" onSubmit={handleSubmit}>
                    <textarea
                        className="regret-input"
                        placeholder="Tôi hối tiếc vì đã không..."
                        value={regretText}
                        onChange={(e) => setRegretText(e.target.value)}
                        rows={4}
                    />
                    <button
                        type="submit"
                        className="regret-submit-btn"
                        disabled={isSubmitting || !regretText.trim()}
                    >
                        {isSubmitting ? "Đang gửi..." : "Gửi nỗi lòng 💔"}
                    </button>
                </form>

                <div className="recent-regrets">
                    <h3>Những nỗi lòng đang bay đi...</h3>

                    {loading ? (
                        <p className="loading-text">Đang lắng nghe...</p>
                    ) : recentRegrets.length === 0 ? (
                        <p className="empty-text">Chưa có ai chia sẻ. Bạn là người đầu tiên.</p>
                    ) : (
                        <div className="hearts-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
                            {recentRegrets.map((item, index) => {
                                // Deterministic "randomness" based on index to keep consistent during re-renders if list doesn't change
                                // or just use Math.random() if we accept jitter on re-render. 
                                // Better to compute these once or memoize, but for simplicity:
                                const randomLeft = Math.random() * 80 + 10; // 10% to 90%
                                const randomDur = Math.random() * 15 + 10; // 10s to 25s
                                const randomDelay = Math.random() * -20; // Start at random points
                                const randomScale = Math.random() * 0.3 + 0.8; // 0.8 to 1.1 scale
                                const sway = (Math.random() - 0.5) * 100 + 'px';
                                const rotate = (Math.random() - 0.5) * 30 + 'deg';

                                return (
                                    <div
                                        key={item.id}
                                        className="flying-heart"
                                        style={{
                                            left: `${randomLeft}%`,
                                            animationDuration: `${randomDur}s`,
                                            animationDelay: `${randomDelay}s`,
                                            transform: `scale(${randomScale})`,
                                            '--sway': sway,
                                            '--rotate': rotate
                                        }}
                                        onClick={() => setSelectedRegret(item)}
                                        title="Xem chi tiết"
                                    >
                                        <svg className="heart-shape" viewBox="0 0 512 512">
                                            <path d="M256,448l-30.16-27.16C118.72,323.72,48,259.8,48,181.4C48,117.6,97.6,68,161.4,68
                                           c36,0,70.52,16.76,94.6,42.96C279.88,84.76,314.4,68,350.6,68C414.4,68,464,117.6,464,181.4
                                           c0,78.4-70.72,142.32-177.84,239.44L256,448z"/>
                                        </svg>
                                        <div className="heart-content">
                                            {item.content}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RegretPage;
