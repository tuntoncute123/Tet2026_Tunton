import { useState, useEffect, useMemo } from 'react';
import { supabase } from '../supabaseClient';
import './ViewMemoriesPage.css';

const ViewMemoriesPage = ({ onBack }) => {
    const [memories, setMemories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMemory, setSelectedMemory] = useState(null);

    // Fetch memories
    useEffect(() => {
        const fetchMemories = async () => {
            try {
                const { data, error } = await supabase
                    .from('memories')
                    .select('*')
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setMemories(data || []);
            } catch (error) {
                console.error("Error fetching memories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMemories();
    }, []);

    // Prepare data: Ensure we have enough items for smooth scrolling
    const displayList = useMemo(() => {
        if (!memories.length) return [];
        let list = [...memories];
        // Repeat until we have at least 10 items for visual density
        while (list.length < 10) {
            list = [...list, ...memories];
        }
        return list;
    }, [memories]);

    // Split memories into 3 rows for Desktop visual variety
    const rows = useMemo(() => {
        const row1 = [];
        const row2 = [];
        const row3 = [];

        displayList.forEach((mem, index) => {
            if (index % 3 === 0) row1.push(mem);
            else if (index % 3 === 1) row2.push(mem);
            else row3.push(mem);
        });

        return [row1, row2, row3];
    }, [displayList]);

    const Row = ({ items, direction, speed }) => (
        <div className={`memory-row ${direction} ${speed}`}>
            {/* Duplicate content for seamless loop */}
            <div className="memory-track">
                {items.map((mem, i) => (
                    <div
                        key={`${mem.id}-${i}`}
                        className="memory-ticket"
                        onClick={() => setSelectedMemory(mem)}
                    >
                        <div className="ticket-pin">📌</div>
                        <p className="ticket-content">
                            {mem.content.length > 50 ? mem.content.substring(0, 50) + "..." : mem.content}
                        </p>
                        <div className="ticket-footer">
                            <span className="ticket-author">{mem.name}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="memory-track">
                {items.map((mem, i) => (
                    <div
                        key={`${mem.id}-${i}-dup`}
                        className="memory-ticket"
                        onClick={() => setSelectedMemory(mem)}
                    >
                        <div className="ticket-pin">📌</div>
                        <p className="ticket-content">
                            {mem.content.length > 50 ? mem.content.substring(0, 50) + "..." : mem.content}
                        </p>
                        <div className="ticket-footer">
                            <span className="ticket-author">{mem.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const MobileCard = ({ mem, index, suffix }) => (
        <div
            key={`${mem.id}-${index}-${suffix}`}
            className="memory-ticket mobile-ticket"
            onClick={() => setSelectedMemory(mem)}
        >
            <div className="ticket-pin">📌</div>
            <p className="ticket-content">
                {mem.content}
            </p>
            <div className="ticket-footer">
                <span className="ticket-author">{mem.name}</span>
            </div>
        </div>
    );

    return (
        <div className="memory-flow-container">
            <button className="back-btn-fixed" onClick={onBack}>
                ← Quay lại
            </button>

            <h2 className="flow-title">Dòng Chảy Kí Ức</h2>

            {loading ? (
                <div className="loading-text">Đang lật mở trang lưu bút...</div>
            ) : memories.length === 0 ? (
                <div className="empty-state">Chưa có kỉ niệm nào. Hãy là người đầu tiên viết nhé!</div>
            ) : (
                <>
                    {/* DESKTOP VIEW */}
                    <div className="flow-content desktop-view">
                        <Row items={rows[0]} direction="move-left" speed="slow" />
                        <Row items={rows[1]} direction="move-right" speed="medium" />
                        <Row items={rows[2]} direction="move-left" speed="fast" />
                    </div>

                    {/* MOBILE VIEW (Vertical Auto-Scroll) */}
                    <div className="mobile-scroll-view">
                        <div className="mobile-track-wrapper">
                            {/* Original List */}
                            <div className="mobile-track-column">
                                {displayList.map((mem, i) => (
                                    <MobileCard mem={mem} index={i} suffix="orig" key={`m-orig-${i}`} />
                                ))}
                            </div>
                            {/* Duplicate List for Seamless Loop */}
                            <div className="mobile-track-column">
                                {displayList.map((mem, i) => (
                                    <MobileCard mem={mem} index={i} suffix="dup" key={`m-dup-${i}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Detail Modal */}
            {selectedMemory && (
                <div className="memory-modal-overlay" onClick={() => setSelectedMemory(null)}>
                    <div className="memory-modal-paper" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-pin">📌</div>
                        <h3 className="modal-author">Kỉ niệm của {selectedMemory.name}</h3>
                        <div className="modal-body">
                            {selectedMemory.content}
                        </div>
                        <div className="modal-date">
                            {new Date(selectedMemory.created_at).toLocaleDateString('vi-VN')}
                        </div>
                        <button className="close-modal-btn" onClick={() => setSelectedMemory(null)}>
                            Đóng sổ
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ViewMemoriesPage;
