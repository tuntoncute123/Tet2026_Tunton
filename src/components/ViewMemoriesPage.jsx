import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './QuestionPage.css'; // Reuse container styles
import './ViewMemoriesPage.css';

const ViewMemoriesPage = ({ onBack }) => {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const { data, error } = await supabase
                    .from('memories')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setMemories(data);
            } catch (error) {
                console.error("Error fetching memories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMemories();
    }, []);

    return (
        <div className="question-page-container">
            <div className="question-card memories-list-card">
                <button className="back-btn" onClick={onBack}>
                    ← Quay lại
                </button>

                <h1 className="question-title" style={{ color: '#34d399' }}>Góc Kỉ Niệm Lớp 9A</h1>

                {loading ? (
                    <div className="loading-spinner">Đang mở cuốn lưu bút...</div>
                ) : memories.length === 0 ? (
                    <div className="empty-state">
                        <p>Chưa có kỉ niệm nào được chia sẻ.</p>
                        <p>Hãy là người đầu tiên viết vào lưu bút nhé!</p>
                    </div>
                ) : (
                    <div className="memories-grid">
                        {memories.map((mem) => (
                            <div key={mem.id} className="memory-card">
                                <div className="memory-pin">📍</div>
                                <div className="memory-content">
                                    "{mem.content}"
                                </div>
                                <div className="memory-footer">
                                    <span className="memory-author">— {mem.name}</span>
                                    <span className="memory-date">
                                        {new Date(mem.created_at).toLocaleDateString('vi-VN')}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ViewMemoriesPage;
