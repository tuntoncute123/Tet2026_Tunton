import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './QuestionPage.css'; // Reuse existing styles

const MemoryPage = ({ onBack }) => {
    const [name, setName] = useState('');
    const [memory, setMemory] = useState('');
    const [sent, setSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (memory.trim() && name.trim()) {
            setIsSubmitting(true);
            try {
                const { error } = await supabase
                    .from('memories')
                    .insert([
                        { name: name, content: memory }
                    ]);

                if (error) throw error;

                setSent(true);
            } catch (error) {
                console.error("Error sending memory:", error);
                alert("Có lỗi xảy ra khi gửi kỉ niệm. Vui lòng thử lại!");
            } finally {
                setIsSubmitting(false);
            }
        } else {
            alert("Vui lòng nhập cả tên và nội dung kỉ niệm nhé!");
        }
    };

    return (
        <div className="question-page-container">
            <div className="question-card">
                <button className="back-btn" onClick={onBack}>
                    ← Quay lại
                </button>

                <h1 className="question-title" style={{ color: '#34d399' }}>Góc Kỉ Niệm</h1>

                {sent ? (
                    <div className="score-section">
                        <h2>Kỉ niệm đã được lưu giữ!</h2>
                        <p className="final-score" style={{ fontSize: '1.2rem', lineHeight: '1.6' }}>
                            Cảm ơn <strong>{name}</strong> đã chia sẻ những khoảnh khắc đáng nhớ.<br />
                            Kỉ niệm này sẽ mãi được trân trọng.
                        </p>
                        <button className="action-btn" onClick={onBack}>Trở về trang chủ</button>
                    </div>
                ) : (
                    <form className="quiz-section" onSubmit={handleSubmit} style={{ width: '100%' }}>
                        <p className="question-subtitle" style={{ marginBottom: '2rem' }}>
                            Hãy chia sẻ một kỉ niệm vui buồn, đáng nhớ nhất của bạn với lớp 9A.
                        </p>

                        <div style={{ width: '100%', marginBottom: '1.5rem', textAlign: 'left' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#34d399', fontWeight: 'bold' }}>
                                Tên của bạn
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
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#34d399', fontWeight: 'bold' }}>
                                Kỉ niệm káng nhớ
                            </label>
                            <textarea
                                value={memory}
                                onChange={(e) => setMemory(e.target.value)}
                                placeholder="Viết về kỉ niệm của bạn tại đây..."
                                style={{
                                    width: '100%',
                                    minHeight: '200px',
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

                        <button type="submit" className="action-btn" disabled={isSubmitting} style={{ background: '#059669' }}>
                            {isSubmitting ? "Đang lưu..." : "Lưu kỉ niệm 📔"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default MemoryPage;
