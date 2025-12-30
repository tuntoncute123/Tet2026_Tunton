import './ViewWishesButton.css';

const ViewWishesButton = ({ onClick }) => {
    return (
        <button className="view-wishes-btn" onClick={onClick}>
            Xem lời chúc
        </button>
    );
};

export default ViewWishesButton;
