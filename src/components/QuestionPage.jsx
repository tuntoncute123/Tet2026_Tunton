import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import './QuestionPage.css';
import question20Image from '../assets/z5162835355820_2857fde9c05d6bb5fd5db577f5886d67.jpg';
import q21Image from '../imageQ/21.png';
import q22Image from '../imageQ/22.png';
import q30Image from '../imageQ/30.png';
import q31Image from '../imageQ/31.png';
import q32Image from '../imageQ/32.png';
import q33Video from '../imageQ/33q.mp4';
import q33AnswerVideo from '../imageQ/33a.mp4';
import q34Image from '../imageQ/34.png';
import q35Image from '../imageQ/35.png';
import q36Image from '../imageQ/36.png';

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
        question: "Các bạn Nam đã được tặng gì vào ngày 8/3?",
        options: [
            "A. Sổ tay và bút",
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
    {
        id: 20,
        question: "Hình ảnh này chúng ta đang ở đâu?",
        image: question20Image,
        blurReveal: true,
        options: [
            "A. Nhà Huệ",
            "B. Nhà cô Tâm",
            "C. Nhà cô Vang",
            "D. Nhà Hồng"
        ],
        correctAnswer: 3
    },
    {
        id: 21,
        question: "Đây là ai?",
        image: q21Image,
        blurReveal: true,
        options: [
            "A. Kim Huệ",
            "B. Quỳnh Hương",
            "C. Thanh Nhàn",
            "D. Ly Na"
        ],
        correctAnswer: 2
    },
    {
        id: 22,
        question: "Đây là ai?",
        image: q22Image,
        blurReveal: true,
        options: [
            "A. Kim Huệ",
            "B. Quỳnh Hương",
            "C. Thanh Nhàn",
            "D. Ly Na"
        ],
        correctAnswer: 1
    },

    {
        id: 23,
        question: "Năm lớp 9 lớp chúng mình tặng cho thầy cô món quà gì vào dịp 20/11?",
        options: [
            "A. Sổ & bút",
            "B. Không tặng gì cả",
            "C. Bài hát",
            "D. Quà lưu niệm"
        ],
        correctAnswer: 2
    },
    {
        id: 24,
        question: "Lần diễn văn nghệ ở nhà văn hóa huyện, lớp chúng ta nhảy mashup 3 bài hát, đó là bài Lạc trôi và 2 bài hát nào?",
        options: [
            "A. Save me & Sóng gió",
            "B. Mình đi đâu thế bố ơi & Việt Nam ơi",
            "C. Cùng Anh & Đã lỡ yêu em nhiều",
            "D. Người lạ ơi & Chạy ngay đi"
        ],
        correctAnswer: 1
    },
    {
        id: 25,
        question: "2 bài hát lớp mình hát tặng thầy cô ngày 20/11 được chế lại lời từ 2 bài hát nào?",
        options: [
            "A. Bụi phấn & Vợ tuyệt vời nhất",
            "B. Người thầy & Mái trường mến yêu",
            "C. Bông hồng tặng cô & Lá thư gửi thầy",
            "D. Em yêu trường em & Vợ yêu"
        ],
        correctAnswer: 0
    },
    {
        id: 26,
        question: "Trong cuộc thi hội khỏe Phù Đổng cấp trường môn bóng rổ, lớp 9A đạt giải gì?",
        options: [
            "A. Giải tán",
            "B. Giải nhì",
            "C. Giải nhất",
            "D. Giải ba"
        ],
        correctAnswer: 2
    },
    {
        id: 27,
        question: "Giáo viên thực tập nào đã thực tập lớp mình tận 2 lần trong 4 năm cấp II?",
        options: [
            "A. Cô Nữ",
            "B. Cô Anh",
            "C. Cô Nhi",
            "D. Cô Tuyết"
        ],
        correctAnswer: 1
    },
    {
        id: 28,
        question: "Năm lớp 9, gần nửa lớp 9A đi trễ tiết thể dục vì lý do gì?",
        options: [
            "A. Đi ăn",
            "B. Cấn lịch",
            "C. Đi lao động",
            "D. Đi xem phim"
        ],
        correctAnswer: 3
    },
    {
        id: 29,
        question: "2 thành viên nào của lớp mình vinh dự được lên phòng hiệu trưởng ăn mì?",
        options: [
            "A. Toàn & Kỳ",
            "B. Trâm & Kỳ",
            "C. Trí & Toàn",
            "D. Trí & Đài"
        ],
        correctAnswer: 1
    },
    {
        id: 30,
        question: "Lúc này đang làm gì?",
        image: q30Image,
        blurReveal: true,
        options: [
            "A. Học môn Lý",
            "B. Học môn Toán",
            "C. Học địa lý",
            "D. Giờ ra chơi"
        ],
        correctAnswer: 1
    },
    {
        id: 31,
        question: "Đây là ai?",
        image: q31Image,
        blurReveal: true,
        options: [
            "A. Hoàng Kỳ",
            "B. Ngọc Bảo",
            "C. Hữu Bằng",
            "D. Lợi Trần"
        ],
        correctAnswer: 3
    },
    {
        id: 32,
        question: "Đây là cặp đôi nào?",
        image: q32Image,
        blurReveal: true,
        options: [
            "A. Na & Trí",
            "B. Bảo & An",
            "C. Kiệt & Na",
            "D. Tân & Hằng"
        ],
        correctAnswer: 3
    },
    {
        id: 33,
        question: "Hãy điền từ vào chỗ còn thiếu: Bởi vì tụi em rất ...?",
        video: q33Video,
        answerVideo: q33AnswerVideo,
        options: [
            "A. Đẳng cấp",
            "B. Xinh đẹp",
            "C. Professional",
            "D. Vip pro"
        ],
        correctAnswer: 3
    },
    {
        id: 34,
        question: "Đây là ai?",
        image: q34Image,
        blurReveal: true,
        options: [
            "A. Quỳnh Hương",
            "B. Kim Huệ",
            "C. Trâm Anh",
            "D. Mai Vân"
        ],
        correctAnswer: 1
    },
    {
        id: 35,
        question: "Đây là ai?",
        image: q35Image,
        blurReveal: true,
        options: [
            "A. Hương & Huệ",
            "B. An & Na",
            "C. Huệ & Nhàn",
            "D. Trang & Trâm"
        ],
        correctAnswer: 2
    },
    {
        id: 36,
        question: "Đứa khóc, đứa muốn về sớm. Đây là ai?",
        image: q36Image,
        blurReveal: true,
        options: [
            "A. Nam & Huệ",
            "B. Hưng & An",
            "C. Phương & Huệ",
            "D. Nam & Trâm"
        ],
        correctAnswer: 2
    },
];

const QuestionPage = ({ onBack }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Start from 0
    const [score, setScore] = useState(0); // Correct answer count
    const [totalPoints, setTotalPoints] = useState(0); // Total accumulated points
    const [currentPoints, setCurrentPoints] = useState(1000); // Current question points (1000 -> 100)
    const [selectedOption, setSelectedOption] = useState(null);
    const [isAnswered, setIsAnswered] = useState(false);
    // Feature Flags / UI State
    const [showScore, setShowScore] = useState(false);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loadingLeaderboard, setLoadingLeaderboard] = useState(false);

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
        setTotalPoints(0);
        setCurrentPoints(1000);
        setCurrentQuestionIndex(0);
        setSelectedOption(null);
        setIsAnswered(false);
        setShowScore(false);
        // We keep the userName, so they don't have to re-enter it
    };

    // Timer Logic
    useEffect(() => {
        let interval;
        if (isNameSubmitted && !isAnswered && !showScore && !showLeaderboard && isPasswordCorrect) {
            interval = setInterval(() => {
                setCurrentPoints((prev) => {
                    if (prev <= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev - 5; // Decrease by 5 every 100ms -> 900 points in 18 seconds
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [currentQuestionIndex, isAnswered, showScore, showLeaderboard, isNameSubmitted, isPasswordCorrect]);

    // Auto-timeout: khi điểm chạm 100 mà chưa chọn đáp án -> hết giờ, hiện đáp án đúng
    useEffect(() => {
        if (currentPoints <= 100 && !isAnswered && isNameSubmitted && isPasswordCorrect && !showScore && !showLeaderboard) {
            setSelectedOption(null); // Không chọn gì = hết giờ
            setIsAnswered(true);     // Hiện đáp án đúng
        }
    }, [currentPoints, isAnswered, isNameSubmitted, isPasswordCorrect, showScore, showLeaderboard]);

    const question = QUESTIONS[currentQuestionIndex];

    const handleOptionClick = (index) => {
        if (isAnswered) return;

        setSelectedOption(index);
        setIsAnswered(true);

        if (index === question.correctAnswer) {
            setScore(score + 1);
            setTotalPoints(totalPoints + currentPoints);
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedOption(null);
            setIsAnswered(false);
            setCurrentPoints(1000);
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
                    {
                        name: userName,
                        score: score, // Correct count
                        points: totalPoints, // Total points
                        total_questions: QUESTIONS.length
                    }
                ]);

            if (error) {
                console.error("Error saving score:", error);
            } else {
                console.log("Score saved to Supabase:", { userName, score, totalPoints });
            }
        } catch (err) {
            console.error("Error saving score:", err);
        }
    };

    const fetchLeaderboard = async () => {
        setLoadingLeaderboard(true);
        setShowLeaderboard(true);
        try {
            const { data, error } = await supabase
                .from('quiz_results')
                .select('*')
                .order('points', { ascending: false })
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


    // Debug logging
    useEffect(() => {
        console.log("State Updated:", {
            currentQuestionIndex,
            score,
            totalPoints,
            currentPoints,
            isPasswordCorrect,
            userName,
            isNameSubmitted,
            showLeaderboard,
            showScore
        });
    }, [currentQuestionIndex, score, totalPoints, currentPoints, isPasswordCorrect, userName, isNameSubmitted, showLeaderboard, showScore]);

    const renderContent = () => {
        // 1. Password Check
        if (!isPasswordCorrect) {
            return (
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
                    />

                    <button className="action-btn" type="submit" style={{ minWidth: '200px' }}>
                        Xác nhận
                    </button>
                </form>
            );
        }

        // 2. Leaderboard
        if (showLeaderboard) {
            return (
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
                                    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, marginLeft: '1rem', textAlign: 'left' }}>
                                        <span className="leaderboard-name">{entry.name}</span>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <span className="leaderboard-points">{entry.points || 0} pts</span>
                                        <span className="leaderboard-score-detail">{entry.score}/{entry.total_questions} câu</span>
                                    </div>
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
            );
        }

        // 3. Score / Result
        if (showScore) {
            return (
                <div className="score-section">
                    <h2>Kết Quả Của {userName}</h2>
                    <div className="final-score">
                        <p>Điểm số: <span className="highlight-score">{totalPoints}</span></p>
                        <p style={{ fontSize: '1.2rem', marginTop: '0.5rem' }}>Trả lời đúng: {score} / {QUESTIONS.length} câu</p>
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
            );
        }

        // 4. Name Input
        if (!isNameSubmitted) {
            return (
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
            );
        }

        // 5. Quiz Question
        if (!question) return <div style={{ color: 'white' }}>Lỗi: Không tìm thấy câu hỏi!</div>;

        return (
            <div className="quiz-section">
                <div className="question-indicator">
                    Người chơi: <strong style={{ color: '#fbbf24' }}>{userName}</strong> • Câu {currentQuestionIndex + 1}/{QUESTIONS.length}
                </div>

                {/* Progress Bar & Score */}
                <div className="timer-section">
                    <div className="timer-bar-container">
                        <div
                            className="timer-bar"
                            style={{
                                width: `${(Math.max(0, Math.min(1000, currentPoints)) / 1000) * 100}%`,
                                backgroundColor: currentPoints > 500 ? '#22c55e' : currentPoints > 200 ? '#d97706' : '#ef4444'
                            }}
                        ></div>
                    </div>
                    <div className="points-display">
                        <span>Điểm câu hỏi: {currentPoints}</span>
                        <span>Tổng điểm: {totalPoints}</span>
                    </div>
                </div>

                <h2 className="quiz-question">{question.question}</h2>

                {question.video && !isAnswered && (
                    <div className="question-video-container" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <video
                            src={question.video}
                            autoPlay
                            controls={false}
                            className="question-video"
                            style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
                            key={`q-video-${question.id}`}
                        />
                    </div>
                )}

                {question.answerVideo && isAnswered && (
                    <div className="question-video-container" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <video
                            src={question.answerVideo}
                            autoPlay
                            controls={false}
                            className="question-video"
                            style={{ maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.3)' }}
                            key={`a-video-${question.id}`}
                        />
                    </div>
                )}

                {question.image && !question.video && !question.answerVideo && (
                    <div className="question-image-container">
                        <img
                            src={question.image}
                            alt="Question illustration"
                            className={`question-image ${question.blurReveal ? 'blur-reveal' : ''}`}
                            key={question.id} // Re-trigger animation on new question
                        />
                    </div>
                )}

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
                        {selectedOption === null && (
                            <p style={{
                                color: '#f87171',
                                fontSize: '1.1rem',
                                fontWeight: 'bold',
                                marginBottom: '0.75rem',
                                animation: 'fadeIn 0.4s ease'
                            }}>
                                ⏰ Hết giờ! Đáp án đúng được hiển thị bên trên.
                            </p>
                        )}
                        <button className="action-btn next-btn" onClick={handleNext}>
                            {currentQuestionIndex < QUESTIONS.length - 1 ? "Câu tiếp theo →" : "Xem kết quả"}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    console.log("QuestionPage::Rendering JSX");
    return (
        <div className="question-page-container">
            <div className="question-card" style={{ border: '5px solid blue' }}> {/* Extra debug border */}
                <button className="back-btn" onClick={onBack}>
                    ← Quay lại
                </button>

                <h1 className="question-title">Đố Vui Có Thưởng</h1>

                {renderContent()}
            </div>
        </div>
    );
};

export default QuestionPage;
