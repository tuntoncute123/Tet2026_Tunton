import { useState, useEffect } from 'react';
import { TagCloud } from 'react-tagcloud';
import { supabase } from '../supabaseClient';
import './QuestionPage.css'; // Reuse container styles
import './WordCloudPage.css';

const WordCloudPage = ({ onBack }) => {
    const [mode, setMode] = useState('view'); // 'view' or 'submit'
    const [wordsInput, setWordsInput] = useState('');
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch tags when in view mode
    useEffect(() => {
        if (mode === 'view') {
            fetchTags();
        }
    }, [mode]);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('keywords')
                .select('word');

            if (error) throw error;

            // Process data for tag cloud (count frequencies)
            const frequency = {};
            data.forEach(item => {
                // Normalize: lowercase, trim
                const word = item.word.trim().toLowerCase();
                if (word) {
                    frequency[word] = (frequency[word] || 0) + 1;
                }
            });

            const tagData = Object.keys(frequency).map(key => ({
                value: key,
                count: frequency[key]
            }));

            // If empty, add some placeholders
            if (tagData.length === 0) {
                setTags([
                    { value: 'đoàn kết', count: 5 },
                    { value: 'vui vẻ', count: 4 },
                    { value: 'học giỏi', count: 3 },
                    { value: 'đi trễ', count: 2 },
                    { value: 'ăn vặt', count: 2 },
                ]);
            } else {
                setTags(tagData);
            }

        } catch (error) {
            console.error("Error fetching tags:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!wordsInput.trim()) return;

        setIsSubmitting(true);
        // Split by commas, newlines, or semicolons
        const words = wordsInput.split(/[,;\n]/).map(w => w.trim()).filter(w => w.length > 0);

        if (words.length === 0) {
            alert("Bạn chưa nhập từ khóa nào cả!");
            setIsSubmitting(false);
            return;
        }

        try {
            const inserts = words.map(w => ({ word: w }));
            const { error } = await supabase
                .from('keywords')
                .insert(inserts);

            if (error) throw error;

            alert("Đã gửi từ khóa thành công!");
            setWordsInput('');
            setMode('view'); // Switch to view to see update
        } catch (error) {
            console.error("Error submitting words:", error);
            alert("Lỗi khi gửi. Thử lại sau nhé!");
        } finally {
            setIsSubmitting(false);
        }
    };

    // Custom renderer for TagCloud to make it look cool
    const customRenderer = (tag, size, color) => (
        <span
            key={tag.value}
            style={{
                fontSize: `${size}px`,
                margin: '5px',
                padding: '5px',
                display: 'inline-block',
                color: color === 'blue' ? '#fff' : color, // Override default blue if needed, or rely on library colors
                fontFamily: "'Courier New', monospace",
                fontWeight: 'bold',
                cursor: 'default',
                textShadow: '0 0 10px rgba(0,0,0,0.5)',
                transition: 'transform 0.2s',
            }}
            className="cloud-tag"
        >
            {tag.value}
        </span>
    );

    return (
        <div className="question-page-container">
            <div className="question-card word-cloud-card">
                <button className="back-btn" onClick={onBack}>
                    ← Quay lại
                </button>

                <h1 className="question-title" style={{ color: '#db2777' }}>Ấn Tượng 9A</h1>

                <div className="cloud-tabs">
                    <button
                        className={`tab-btn ${mode === 'view' ? 'active' : ''}`}
                        onClick={() => setMode('view')}
                    >
                        ☁️ Xem Word Cloud
                    </button>
                    <button
                        className={`tab-btn ${mode === 'submit' ? 'active' : ''}`}
                        onClick={() => setMode('submit')}
                    >
                        ✍️ Góp Từ Khóa
                    </button>
                </div>

                {mode === 'view' ? (
                    <div className="cloud-viewer">
                        {loading ? (
                            <div className="loading-spinner">Đang tổng hợp nỗi niềm...</div>
                        ) : (
                            <TagCloud
                                minSize={16}
                                maxSize={60}
                                tags={tags}
                                renderer={customRenderer}
                                className="tag-cloud-container"
                            />
                        )}
                    </div>
                ) : (
                    <form className="cloud-form" onSubmit={handleSubmit}>
                        <p className="question-subtitle">
                            Điều gì làm bạn nhớ nhất về 9A? <br />
                            (Không cần văn vở, 3-5 từ khóa "chất" nhất!)
                        </p>

                        <div style={{ textAlign: 'left', width: '100%', marginBottom: '1.5rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px' }}>
                            <p style={{ color: '#fbbf24', fontWeight: 'bold', marginBottom: '0.5rem' }}>💡 Gợi ý cho đỡ bí:</p>
                            <ul style={{ listStyle: 'none', paddingLeft: 0, color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6' }}>
                                <li>👾 <strong>Tệ nạn:</strong> <em>Đi trễ, ngủ gật, ăn vụng, chép phao...</em></li>
                                <li>📢 <strong>Ám ảnh:</strong> <em>"Lấy giấy ra", sổ đầu bài, kiểm tra miệng...</em></li>
                                <li>🏛️ <strong>Huyền thoại:</strong> <em>Bác bảo vệ, bà căng-tin, bàn cuối...</em></li>
                                <li>🔥 <strong>Drama:</strong> <em>Mất bút, đòi nợ, crush, chia tay...</em></li>
                            </ul>
                        </div>

                        <textarea
                            value={wordsInput}
                            onChange={(e) => setWordsInput(e.target.value)}
                            placeholder="Nhập từ khóa tại đây (cách nhau dấu phẩy)...&#10;Ví dụ: Ăn vụng, Bà căng-tin, Trốn tiền quỹ"
                            style={{
                                width: '100%',
                                minHeight: '120px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '12px',
                                padding: '1rem',
                                color: 'white',
                                fontSize: '1.2rem',
                                fontFamily: 'inherit',
                                marginBottom: '2rem',
                                outline: 'none'
                            }}
                        />

                        <button
                            type="submit"
                            className="action-btn"
                            disabled={isSubmitting}
                            style={{ background: '#db2777' }}
                        >
                            {isSubmitting ? "Đang gửi..." : "Gửi ngay cho nóng 🚀"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default WordCloudPage;
