import './WordCloudButton.css';

const WordCloudButton = ({ onClick }) => {
    return (
        <button className="word-cloud-btn" onClick={onClick}>
            Từ Khóa Lớp
        </button>
    );
};

export default WordCloudButton;
