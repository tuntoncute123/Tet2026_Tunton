import { useState } from 'react';
import { supabase } from '../supabaseClient';
import './QuestionPage.css';

const QUESTIONS = [
    {
        id: 1,
        question: "Năm 2026 là một năm đặc biệt như thế nào với lớp 9A chúng ta.",
        options: [
            "A. Kỉ niệm 10 năm",
            "B. Kỉ niệm 9 năm",
            "C. Kỉ niệm 11 năm",
            "D. Kỉ niệm 8 năm"
        ],
        correctAnswer: 0 // Index of "Hoa Đào"
    },
    {
        id: 2,
        question: "Lớp 9A có bao nhiêu thành viên?",
        options: [
            "A. 40",
            "B. 41",
            "C. 42",
            "D. 43"
        ],
        correctAnswer: 1 // Index of "Bánh Chưng"
    },
    {
        id: 3,
        question: "Ai được phong là cây đũa vàng trong lớp 9A?",
        options: [
            "A. Triệu Vĩ",
            "B. Vĩnh Hưng",
            "C. Gia Thành",
            "D. Hoàng Kỳ"
        ],
        correctAnswer: 2 // Index of "Xông đất"
    },
    {
        id: 4,
        question: "Chúng ta vào nhà ai nhiều nhất vào dịp tết?",
        options: [
            "A. Kim Huệ",
            "B. Duy Thiện",
            "C. Cô Vang",
            "D. Cô Tâm"
        ],
        correctAnswer: 3 // Index of "Con Cá Chép"
    },
    {
        id: 5,
        question: "Đến mùa gì thì thầy Nhật mới cho Di Thiện vào lớp?",
        options: [
            "A. Cam",
            "B. Bưởi",
            "C. Quýt",
            "D. Xoài"
        ],
        correctAnswer: 2 // Index of "Con Cá Chép"
    },
    {
        id: 6,
        question: "Thầy Nhật đã cho Toàn bao nhiêu con 0?",
        options: [
            "A. 1",
            "B. 2",
            "C. 3",
            "D. 4"
        ],
        correctAnswer: 1// Index of "Con Cá Chép"
    },
    {
        id: 7,
        question: "Vào năm lớp 6 sĩ số lớp là bao nhiêu?",
        options: [
            "A. 40",
            "B. 41",
            "C. 42",
            "D. 43"
        ],
        correctAnswer: 0// Index of "Con Cá Chép"
    },
    {
        id: 8,
        question: "Ai là người bắt Anh Kha lật tài liệu?",
        options: [
            "A. Cô Tâm",
            "B. Cô Vang",
            "C. Cô Dung",
            "D. Cô Thảo"
        ],
        correctAnswer: 3// Index of "Con Cá Chép"
    },
    {
        id: 9,
        question: "Vào 2018, chúng ta đã cùng nhau xem bóng đá U23 Việt Nam ở đâu?",
        options: [
            "A. Nhà Huệ",
            "B. Nhà Thiện",
            "C. Nhà Thư",
            "D. Nhà cô Tâm"
        ],
        correctAnswer: 2// Index of "Con Cá Chép"
    },
    {
        id: 10,
        question: "Chúng ta đã đi du lịch lần đầu tiên ở đâu?",
        options: [
            "A. Biển Nghĩa An",
            "B. Núi Thiên Bút",
            "C. Biển Mỹ Khê",
            "D. Biển Sa Huỳnh"
        ],
        correctAnswer: 2// Index of "Con Cá Chép"
    },
    {
        id: 11,
        question: "Chúng ta đã đi du lịch lần đầu tiên vào năm lớp mấy?",
        options: [
            "A. Lớp 6",
            "B. Lớp 7",
            "C. Lớp 8",
            "D. Lớp 9"
        ],
        correctAnswer: 2 // Index of "Con Cá Chép"
    },
    {
        id: 12,
        question: "Sau khi đi biển Mỹ Khê, chúng ta đã đi đến đâu tiếp theo?",
        options: [
            "A. Núi Thiên Ấn",
            "B. Về Nhà",
            "C. Núi Thiên Bút",
            "D. Vsip"
        ],
        correctAnswer: 3 // Index of "Con Cá Chép"
    },
    {
        id: 13,
        question: "Các bạn Nam đã được tặng gì vào ngày 19/11?",
        options: [
            "A. Xương rồng",
            "B. Hộp quà bí mật",
            "C. Sen đá",
            "D. Bút mực"
        ],
        correctAnswer: 2 // Index of "Con Cá Chép"
    },
    {
        id: 14,
        question: "Bữa cuối cùng năm lớp 8 để chuẩn bị nghỉ tết Di Thiện đã bị gì?",
        options: [
            "A. Què chân",
            "B. Què tay",
            "C. Dị ứng",
            "D. Cảm sốt"
        ],
        correctAnswer: 1 // Index of "Con Cá Chép"
    },
    {
        id: 15,
        question: "Hãy mô tả nhà thầy Duy? (Theo sự hướng dẫn của thầy)",
        options: [
            "A. Có cái cổng",
            "B. Ở Nghĩa Thương",
            "C. Đi qua đường ray",
            "D. Ở La Hà"
        ],
        correctAnswer: 0
    },
    {
        id: 16,
        question: "Chữ đằng sau áo lớp của chúng ta là gì?",
        options: [
            "A. AK41",
            "B. AK45",
            "C. AK43",
            "D. AK47"
        ],
        correctAnswer: 0 // Index of "Con Cá Chép"
    },
    {
        id: 17,
        question: "Vào tết 2025, cô Tâm đã lì xì cho mỗi đứa bao nhiêu tiền?",
        options: [
            "A. 10.000 VNĐ",
            "B. 20.000 VNĐ",
            "C. 30.000 VNĐ",
            "D. 40.000 VNĐ"
        ],
        correctAnswer: 1 // Index of "Con Cá Chép"
    },
    {
        id: 18,
        question: "Ai là người xì lốp xe thầy Thắm?",
        options: [
            "A. Toàn",
            "B. Thiện",
            "C. Bảo",
            "D. Đài"
        ],
        correctAnswer: 3 // Index of "Con Cá Chép"
    },
    {
        id: 19,
        question: "Ai là người làm một cô gái bên lớp khác phải khóc trước sân trường?",
        options: [
            "A. Bảo",
            "B. Kiệt",
            "C. Nhật",
            "D. Nam"
        ],
        correctAnswer: 1
    },
];

const QuestionPage = ({ onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showScore, setShowScore] = useState(false);

    // New state for user name
    const [userName, setUserName] = useState('');
    const [isNameSubmitted, setIsNameSubmitted] = useState(false);

    // Password protection state
    const [passwordInput, setPasswordInput] = useState('');
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (passwordInput === '913913') {
            setIsPasswordCorrect(true);
        } else {
            alert("Mật khẩu sai rồi! Vui lòng thử lại.");
        }
    };

    const handleStartQuiz = (e) => {
        e.preventDefault();
        if (userName.trim()) {
            setIsNameSubmitted(true);
        } else {
            alert("Bạn hãy nhập tên để bắt đầu nhé!");
        }
    };

    const handleRestart = () => {
        setScore(0);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowScore(false);
        // We keep the userName, so they don't have to re-enter it
    };

    const question = QUESTIONS[currentQuestionIndex];

    const handleOptionClick = (index) => {
        if (isAnswered) return;

        setSelectedOption(index);
        setIsAnswered(true);

        if (index === question.correctAnswer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        } else {
            // Quiz Finished
            finishQuiz();
        }
    };

    const finishQuiz = async () => {
        setShowScore(true);

        // Submit to Supabase - but don't block replay
        try {
            const { error } = await supabase
                .from('quiz_results')
                .insert([
                    { name: userName, score: score, total_questions: QUESTIONS.length }
                ]);

            if (error) {
                console.error("Error saving score:", error);
            } else {
                console.log("Score saved to Supabase:", { userName, score });
            }
        } catch (err) {
            console.error("Error saving score:", err);
        }
    };

    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

    const fetchLeaderboard = async () => {
        setLoadingLeaderboard(true);
        setShowLeaderboard(true);
        try {
            const { data, error } = await supabase
                .from('quiz_results')
                .select('*')
                .order('score', { ascending: false })
                .order('created_at', { ascending: true }); // First to score high gets top

            if (error) throw error;
            if (data) setLeaderboard(data);
        } catch (err) {
            console.error("Error fetching leaderboard:", err);
            alert("Lỗi tải bảng xếp hạng!");
        } finally {
            setLoadingLeaderboard(false);
        }
    };

    return (
        <div className="question-page-container">
            <div className="question-card">
                <button className="back-btn" onClick={onBack}>
                    ← Quay lại
                </button>

                <h1 className="question-title">Đố Vui Có Thưởng</h1>

                {!isPasswordCorrect ? (
                    <form className="quiz-section" onSubmit={handlePasswordSubmit} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="question-subtitle" style={{ marginBottom: '2rem' }}>
                            🔒 Vui lòng nhập mật khẩu để tiếp tục
                        </p>

                        <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Nhập mật khẩu..."
                            style={{
                                width: '100%',
                                maxWidth: '300px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '12px',
                                padding: '1rem',
                                color: 'white',
                                fontSize: '1.2rem',
                                marginBottom: '2rem',
                                textAlign: 'center',
                                outline: 'none'
                            }}
                            autoFocus
                        />

                        <button className="action-btn" type="submit" style={{ minWidth: '200px' }}>
                            Xác nhận
                        </button>
                    </form>
                ) : showLeaderboard ? (
                    <div className="leaderboard-section">
                        <h2>🏆 Bảng Xếp Hạng 🏆</h2>
                        <div className="leaderboard-container">
                            {loadingLeaderboard ? (
                                <p style={{ color: '#94a3b8' }}>Đang tải...</p>
                            ) : leaderboard.length === 0 ? (
                                <p style={{ color: '#94a3b8' }}>Chưa có ai chơi cả. Hãy là người đầu tiên!</p>
                            ) : (
                                leaderboard.map((entry, index) => (
                                    <div key={index} className="leaderboard-item">
                                        <span className={`leaderboard-rank top-${index + 1}`}>#{index + 1}</span>
                                        <span className="leaderboard-name">{entry.name}</span>
                                        <span className="leaderboard-score">{entry.score}/{entry.total_questions}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <button
                            className="btn-secondary"
                            onClick={() => setShowLeaderboard(false)}
                            style={{ marginTop: '2rem' }}
                        >
                            Quay lại trò chơi
                        </button>
                    </div>
                ) : showScore ? (
                    <div className="score-section">
                        <h2>Kết Quả Của {userName}</h2>
                        <div className="final-score">
                            Bạn trả lời đúng <span className="highlight-score">{score}</span> / {QUESTIONS.length} câu
                        </div>
                        <p style={{ marginBottom: '2rem', color: '#94a3b8' }}>
                            {score === QUESTIONS.length ? "Xuất sắc! Bạn là fan cứng của 9A! 🌟" :
                                score > QUESTIONS.length / 2 ? "Khá lắm! Bạn vẫn nhớ nhiều kỉ niệm đấy! 👍" :
                                    "Cần ôn lại kỉ niệm gấp nhé! 😅"}
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <button className="action-btn" onClick={fetchLeaderboard} style={{ background: '#3b82f6', minWidth: '200px' }}>
                                🏆 Xem Bảng Xếp Hạng
                            </button>
                            <button className="action-btn" onClick={handleRestart} style={{ background: '#10b981', minWidth: '200px' }}>
                                🔄 Chơi Lại
                            </button>
                            <button className="action-btn" onClick={onBack} style={{ minWidth: '200px' }}>
                                🏠 Về Trang Chủ
                            </button>
                        </div>
                    </div>
                ) : !isNameSubmitted ? (
                    <form className="quiz-section" onSubmit={handleStartQuiz} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <p className="question-subtitle" style={{ marginBottom: '2rem' }}>
                            Chào mừng bạn tham gia minigame tìm hiểu về lớp 9A.
                            <br />Hãy nhập tên của bạn để bắt đầu nhé!
                        </p>

                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            placeholder="Nhập tên của bạn..."
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '12px',
                                padding: '1rem',
                                color: 'white',
                                fontSize: '1.2rem',
                                marginBottom: '2rem',
                                textAlign: 'center',
                                outline: 'none'
                            }}
                            autoFocus
                        />

                        <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
                            <button className="action-btn" type="submit" style={{ minWidth: '250px' }}>
                                Bắt đầu ngay &rarr;
                            </button>
                            <button
                                type="button"
                                className="btn-secondary"
                                onClick={fetchLeaderboard}
                                style={{ minWidth: '250px' }}
                            >
                                🏆 Xem Bảng Xếp Hạng
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="quiz-section">
                        <div className="question-indicator">
                            Người chơi: <strong style={{ color: '#fbbf24' }}>{userName}</strong> • Câu {currentQuestionIndex + 1}/{QUESTIONS.length}
                        </div>
                        <h2 className="quiz-question">{question.question}</h2>

                        <div className="options-grid">
                            {question.options.map((option, index) => {
                                let className = "quiz-option";
                                if (isAnswered) {
                                    if (index === question.correctAnswer) className += " correct";
                                    else if (index === selectedOption) className += " wrong";
                                    else className += " disabled";
                                }

                                return (
                                    <button
                                        key={index}
                                        className={className}
                                        onClick={() => handleOptionClick(index)}
                                    >
                                        {option}
                                    </button>
                                );
                            })}
                        </div>

                        {isAnswered && (
                            <div className="next-btn-container">
                                <button className="action-btn next-btn" onClick={handleNext}>
                                    {currentQuestionIndex < QUESTIONS.length - 1 ? "Câu tiếp theo →" : "Xem kết quả"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuestionPage;
