import { useState, useEffect } from 'react';
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
    }
];

const QuestionPage = ({ onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [justFinished, setJustFinished] = useState(false);

    // New state for user name
    const [userName, setUserName] = useState('');
    const [isNameSubmitted, setIsNameSubmitted] = useState(false);

    // Check if user has already played when component mounts
    useEffect(() => {
        // Allow unlimited plays on localhost/dev
        const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

        if (!isDev) {
            const playedStatus = localStorage.getItem('tet2026_quiz_played');
            if (playedStatus === 'true') {
                setHasPlayed(true);
                setShowScore(true);
                setIsNameSubmitted(true); // Skip name input if blocked
            }
        }
    }, []);

    const handleStartQuiz = (e) => {
        e.preventDefault();
        if (userName.trim()) {
            setIsNameSubmitted(true);
        } else {
            alert("Bạn hãy nhập tên để bắt đầu nhé!");
        }
    };

    const question = QUESTIONS[currentQuestionIndex];

    const handleOptionClick = (index) => {
        if (isAnswered || hasPlayed) return;

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
        setJustFinished(true); // Flag that user just finished now
        setShowScore(true);
        setHasPlayed(true);
        localStorage.setItem('tet2026_quiz_played', 'true');

        // Submit to Supabase
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

    return (
        <div className="question-page-container">
            <div className="question-card">
                <button className="back-btn" onClick={onBack}>
                    ← Quay lại
                </button>

                <h1 className="question-title">Đố Vui Ngày Tết</h1>

                {showScore ? (
                    <div className="score-section">
                        {justFinished ? (
                            // Case 1: Just finished - Show Score
                            <>
                                <h2>Bạn đã hoàn thành!</h2>
                                <p className="final-score">
                                    Điểm số: <span className="highlight-score">{score}</span> / {QUESTIONS.length}
                                </p>
                                <p style={{ color: '#94a3b8', marginTop: '1rem' }}>
                                    (Kết quả đã được lưu. Bạn sẽ không thể chơi lại sau khi thoát trang này.)
                                </p>
                                {/* Dev Mode Restart Button */}
                                {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
                                    <button
                                        className="action-btn"
                                        onClick={() => {
                                            setHasPlayed(false);
                                            setShowScore(false);
                                            setJustFinished(false);
                                            setCurrentQuestionIndex(0);
                                            setScore(0);
                                            setSelectedOption(null);
                                            setIsAnswered(false);
                                        }}
                                        style={{ marginTop: '1rem', background: '#333' }}
                                    >
                                        Chơi lại (Dev only)
                                    </button>
                                )}
                            </>
                        ) : hasPlayed ? (
                            // Case 2: Returning user - Show Blocked Message
                            <>
                                <h2>Bạn đã hết lượt chơi!</h2>
                                <p className="final-score">
                                    Cảm ơn bạn đã tham gia minigame kỉ niệm.
                                </p>
                            </>
                        ) : null}

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

                        <button className="action-btn" type="submit">
                            Bắt đầu ngay &rarr;
                        </button>
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
