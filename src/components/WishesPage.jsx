import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './QuestionPage.css'; // Reuse existing styles for consistency

const WishesPage = ({ onBack }) => {
    const [name, setName] = useState('');
    const [wish, setWish] = useState('');
    const [sent, setSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (wish.trim() && name.trim()) {
            setIsSubmitting(true);
            try {
                const { error } = await supabase
                    .from('wishes')
                    .insert([
                        { name: name, message: wish }
                    ]);

                if (error) throw error;

                setSent(true);
                console.log("Wish sent to Supabase:", { name, wish });
            } catch (error) {
                console.error("Error sending wish:", error);
                alert("Có lỗi xảy ra khi gửi lời chúc. Vui lòng thử lại!");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            alert("Vui lòng nhập cả tên và lời chúc nhé!");
        }
    };

    return (
        <div className="question-page-container">
            <div className="question-card">
                <button className="back-btn" onClick={onBack}>
                    ← Quay lại
                </button>

                <h1 className="question-title">Gửi Lời Chúc</h1>

                {sent ? (
                    <div className="score-section">
                        <h2>Lời chúc đã được gửi!</h2>
                        <p className="final-score" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                            Cảm ơn <strong>{name}</strong> đã gửi những lời chúc tốt đẹp.<br />
                            Chúc bạn một năm mới An Khang Thịnh Vượng!
                        </p>
                        <button className="action-btn" onClick={onBack}>Trở về trang chủ</button>
                    </div>
                ) : (
                    <form className="quiz-section" onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <p className="question-subtitle" style={{ marginBottom: '2rem' }}>
                            Hãy viết những lời chúc ý nghĩa nhất gửi đến mọi người trong năm 2026 nhé.
                        </p>

                        <div style={{ width: '100%', marginBottom: '1.5rem', textAlign: 'left' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fbbf24', fontWeight: 'bold' }}>
                                Tên người chúc
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Nhập tên của bạn..."
                                style={{
                                    width: '100%',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontFamily: 'inherit',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div style={{ width: '100%', marginBottom: '2rem', textAlign: 'left' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#fbbf24', fontWeight: 'bold' }}>
                                Lời chúc của bạn
                            </label>
                            <textarea
                                value={wish}
                                onChange={(e) => setWish(e.target.value)}
                                placeholder="Hãy gửi lời chúc tại đây..."
                                style={{
                                    width: '100%',
                                    minHeight: '150px',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.2)',
                                    borderRadius: '12px',
                                    padding: '1rem',
                                    color: 'white',
                                    fontSize: '1.1rem',
                                    fontFamily: 'inherit',
                                    resize: 'vertical',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <button type="submit" className="action-btn" disabled={isSubmitting}>
                            {isSubmitting ? "Đang gửi..." : "Gửi lời chúc 💌"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default WishesPage;
