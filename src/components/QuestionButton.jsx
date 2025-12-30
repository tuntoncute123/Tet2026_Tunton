import './QuestionButton.css';

const QuestionButton = ({ onClick }) => {
    return (
        <button className="question-btn" onClick={onClick}>
            Trả lời câu hỏi
        </button>
    );
};

export default QuestionButton;
