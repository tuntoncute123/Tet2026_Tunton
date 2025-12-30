import { useState, useEffect, useRef } from 'react';
import { supabase } from '../supabaseClient';
import './GalleryModal.css';

const GalleryModal = ({ imageUrl, onClose }) => {
    const [comments, setComments] = useState([]);
    const [reactions, setReactions] = useState({ '❤️': 0, '😂': 0, '👍': 0 });
    const [loading, setLoading] = useState(true);

    // Form state
    const [authorName, setAuthorName] = useState(localStorage.getItem('gallery_username') || ''); // Remember name
    const [commentText, setCommentText] = useState('');
    const [sending, setSending] = useState(false);

    const commentsEndRef = useRef(null);

    // Initial Fetch
    useEffect(() => {
        if (!imageUrl) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // 1. Fetch Comments
                const { data: commentsData } = await supabase
                    .from('gallery_comments')
                    .select('*')
                    .eq('image_url', imageUrl)
                    .order('created_at', { ascending: true });

                if (commentsData) setComments(commentsData);

                // 2. Fetch Reactions
                const { data: reactionsData } = await supabase
                    .from('gallery_reactions')
                    .select('reaction_type')
                    .eq('image_url', imageUrl);

                if (reactionsData) {
                    const counts = { '❤️': 0, '😂': 0, '👍': 0 };
                    reactionsData.forEach(r => {
                        if (counts[r.reaction_type] !== undefined) {
                            counts[r.reaction_type]++;
                        }
                    });
                    setReactions(counts);
                }

            } catch (err) {
                console.error("Error fetching interaction data:", err);
            } finally {
                setLoading(false);
                // Scroll to bottom
                setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
            }
        };

        fetchData();

        // Realtime Subscription
        const channel = supabase
            .channel(`img_${imageUrl}`)
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gallery_comments', filter: `image_url=eq.${imageUrl}` }, (payload) => {
                setComments(prev => {
                    // Prevent duplicate if we already added it manually (Optimistic UI)
                    if (prev.some(c => c.id === payload.new.id)) return prev;
                    return [...prev, payload.new];
                });
                setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
            })
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gallery_reactions', filter: `image_url=eq.${imageUrl}` }, (payload) => {
                setReactions(prev => ({
                    ...prev,
                    [payload.new.reaction_type]: (prev[payload.new.reaction_type] || 0) + 1
                }));
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [imageUrl]);

    const handleSendComment = async (e) => {
        e.preventDefault();
        if (!commentText.trim()) return;

        setSending(true);
        const nameToUse = authorName.trim() || 'Người giấu tên';
        // Save name for next time
        localStorage.setItem('gallery_username', nameToUse);

        try {
            // INSERT and SELECT the inserted row immediately
            const { data, error } = await supabase
                .from('gallery_comments')
                .insert([{
                    image_url: imageUrl,
                    content: commentText.trim(),
                    author_name: nameToUse
                }])
                .select()
                .single();

            if (error) throw error;

            // Update UI Immediately (Optimistic / Immediate Feedback)
            if (data) {
                setComments(prev => [...prev, data]);
                setCommentText(''); // Clear input
                setTimeout(() => commentsEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
            }

        } catch (error) {
            alert('Lỗi gửi bình luận: ' + error.message);
        } finally {
            setSending(false);
        }
    };

    const handleReaction = async (type) => {
        // Optimistic update
        setReactions(prev => ({ ...prev, [type]: prev[type] + 1 }));

        try {
            await supabase.from('gallery_reactions').insert([{
                image_url: imageUrl,
                reaction_type: type
            }]);
        } catch (error) {
            console.error('Failed to react:', error);
            // Revert on error? Nah, keep it simple.
        }
    };

    return (
        <div className="gallery-modal-overlay" onClick={onClose}>
            <div className="gallery-modal-content" onClick={e => e.stopPropagation()}>

                {/* Left: Image */}
                <div className="modal-image-section">
                    <img src={imageUrl} alt="Memory" className="modal-full-img" />
                    <button className="modal-close-btn" onClick={onClose} style={{ position: 'absolute', top: 10, right: 10, background: 'rgba(0,0,0,0.5)', borderRadius: '50%' }}>
                        ✕
                    </button>
                </div>

                {/* Right: Interaction */}
                <div className="modal-interaction-section">
                    <div className="modal-header">
                        <h3 className="modal-title">Kỉ Niệm</h3>
                    </div>

                    <div className="comments-list">
                        {loading && <p style={{ textAlign: 'center', color: '#94a3b8' }}>Đang tải bình luận...</p>}

                        {!loading && comments.length === 0 && (
                            <div className="no-comments">Chưa có bình luận nào.<br />Hãy là người đầu tiên!</div>
                        )}

                        {comments.map(comment => (
                            <div key={comment.id} className="comment-item">
                                <span className="comment-author">{comment.author_name}</span>
                                <div className="comment-content">{comment.content}</div>
                            </div>
                        ))}
                        <div ref={commentsEndRef} />
                    </div>

                    <div className="interaction-footer">
                        {/* Reaction Bar */}
                        <div className="reaction-bar">
                            <button className="reaction-btn" onClick={() => handleReaction('❤️')}>
                                <span>❤️</span> <span className="reaction-count">{reactions['❤️']}</span>
                            </button>
                            <button className="reaction-btn" onClick={() => handleReaction('😂')}>
                                <span>😂</span> <span className="reaction-count">{reactions['😂']}</span>
                            </button>
                            <button className="reaction-btn" onClick={() => handleReaction('👍')}>
                                <span>👍</span> <span className="reaction-count">{reactions['👍']}</span>
                            </button>
                        </div>

                        {/* Comment Form */}
                        <form className="comment-form" onSubmit={handleSendComment}>
                            <input
                                type="text"
                                className="input-name"
                                placeholder="Tên của bạn..."
                                value={authorName}
                                onChange={e => setAuthorName(e.target.value)}
                            />
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <textarea
                                    className="input-content"
                                    placeholder="Viết bình luận..."
                                    value={commentText}
                                    onChange={e => setCommentText(e.target.value)}
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSendComment(e);
                                        }
                                    }}
                                />
                                <button type="submit" className="send-btn" disabled={sending || !commentText.trim()}>
                                    ➤
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryModal;
