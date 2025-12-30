import './OrientationLock.css';

const OrientationLock = () => {
    return (
        <div className="orientation-lock-overlay">
            <div className="orientation-content">
                <div className="phone-icon">📱</div>
                <h2>Vui lòng xoay ngang điện thoại</h2>
                <p>Ứng dụng hoạt động tốt nhất ở chế độ màn hình ngang.</p>
                <div className="rotate-animation">⟳</div>
            </div>
        </div>
    );
};

export default OrientationLock;
