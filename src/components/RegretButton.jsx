
import './RegretButton.css';

const RegretButton = ({ onClick }) => {
    return (
        <button className="regret-floating-btn" onClick={onClick} title="Góc hối tiếc">
            <span style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}>💔</span>
            <span className="regret-btn-text">Điều hối tiếc</span>
        </button>
    );
};

export default RegretButton;
