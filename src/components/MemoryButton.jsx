import './MemoryButton.css';

const MemoryButton = ({ onClick }) => {
    return (
        <button className="memory-btn" onClick={onClick}>
            Gửi Kỉ Niệm
        </button>
    );
};

export default MemoryButton;
