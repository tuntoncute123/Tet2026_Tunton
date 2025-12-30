import './ViewMemoriesButton.css';

const ViewMemoriesButton = ({ onClick }) => {
    return (
        <button className="view-memories-btn" onClick={onClick}>
            Xem Kỉ Niệm
        </button>
    );
};

export default ViewMemoriesButton;
