import './WishesButton.css';

const WishesButton = ({ onClick }) => {
    return (
        <button className="wishes-btn" onClick={onClick}>
            Gửi lời chúc
        </button>
    );
};

export default WishesButton;
