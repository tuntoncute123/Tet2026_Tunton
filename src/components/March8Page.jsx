import { useState, useMemo } from 'react';
import './March8Page.css';
import MusicPlayerModal from './MusicPlayerModal';
import LetterModal from './LetterModal';
import ImageGalleryModal from './ImageGalleryModal';
import GiftModal from './GiftModal';
import lockscreenImage from '../8.3/8thang3.png';

const FallingBouquets = () => {
    const items = useMemo(() => {
        const bouquets = ["💐", "🌷", "🌸", "🌹", "🌻", "🌺"];
        return Array.from({ length: 25 }).map((_, i) => ({
            id: i,
            emoji: bouquets[Math.floor(Math.random() * bouquets.length)],
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 6 + 6}s`, // 6-12s
            animationDelay: `${Math.random() * 5}s`,
            fontSize: `${Math.random() * 1 + 1.2}rem`,
            swayAmount: Math.random() > 0.5 ? 'sway-left' : 'sway-right'
        }));
    }, []);

    return (<div className="falling-bouquets-container" > {
        items.map((item) => (<div key={item.id}
            className={`falling-bouquet ${item.swayAmount}`}
            style={
                {
                    left: item.left,
                    animationDuration: item.animationDuration,
                    animationDelay: item.animationDelay,
                    fontSize: item.fontSize
                }
            }> {item.emoji} </div>
        ))
    } </div>
    );
};

const March8Page = ({ onBack }) => {
    const [pin, setPin] = useState('');
    const [authenticatedUser, setAuthenticatedUser] = useState(null);
    const [isError, setIsError] = useState(false);
    const [showMusicModal, setShowMusicModal] = useState(false);
    const [showLetterModal, setShowLetterModal] = useState(false);
    const [showImageModal, setShowImageModal] = useState(false);
    const [showGiftModal, setShowGiftModal] = useState(false);

    // Danh sách mật khẩu tương ứng với tên từng bạn nữ (Mật khẩu là sinh nhật, VD: 0504 là 5/4)
    const USER_PINS = useMemo(() => ({
        '1201': 'Đỗ Thanh Nhàn', // Mật khẩu mặc định/chung
        '0910': 'Nguyễn Thị Kim Huệ',
        '2006': 'Bùi Tôn Nữ Xuân An',
        '0801': 'Trần Ly Na',
        '0101': 'Hải Yến',
        '2406': 'Lê Thị Thanh Tuyền',
        '1409': 'Tạ Thị Diễm Quỳnh',
        // Thêm danh sách sinh nhật các bạn nữ lớp 9A vào đây...
    }), []);

    const handleKeyPress = (num) => {
        if (pin.length < 4) {
            setIsError(false);
            const newPin = pin + num;
            setPin(newPin);

            if (newPin.length === 4) {
                // Kiểm tra mã PIN
                setTimeout(() => {
                    const userName = USER_PINS[newPin];
                    if (userName) {
                        setAuthenticatedUser(userName);
                    } else {
                        // Báo lỗi rung lắc
                        setIsError(true);
                        setTimeout(() => {
                            setPin('');
                            setIsError(false);
                        }, 500);
                    }
                }, 300);
            }
        }
    };

    const handleDelete = () => {
        setPin(pin.slice(0, -1));
        setIsError(false);
    };

    // Giao diện khi đăng nhập thành công
    if (authenticatedUser) {
        return (<div className="mar8-container" ><FallingBouquets /><button className="mar8-back-home-btn"
            onClick={onBack}> ←Quay lại trang chủ </button><div className="mar8-menu-grid" ><button className="mar8-menu-item"
                onClick={
                    () => setShowMusicModal(true)
                }><div className="mar8-icon" > 🎵 </div><span className="mar8-label" > Music </span></
            button ><button className="mar8-menu-item"
                onClick={
                    () => setShowLetterModal(true)
                }><div className="mar8-icon" > 💌 </div><span className="mar8-label" > Letter </span></
                button ><button className="mar8-menu-item"
                    onClick={
                        () => setShowImageModal(true)
                    }><div className="mar8-icon" > 🖼️ </div><span className="mar8-label" > Image </span></
                button ><button className="mar8-menu-item"
                    onClick={
                        () => setShowGiftModal(true)
                    }><div className="mar8-icon" > 🎁 </div><span className="mar8-label" > Gift </span></
                button ></div>

            {
                showMusicModal && <MusicPlayerModal onClose={
                    () => setShowMusicModal(false)
                }
                    userName={authenticatedUser} />} {
                showLetterModal && <LetterModal onClose={
                    () => setShowLetterModal(false)
                }
                    userName={authenticatedUser} />} {
                showImageModal && <ImageGalleryModal onClose={
                    () => setShowImageModal(false)
                }
                    userName={authenticatedUser} />} {
                showGiftModal && <GiftModal onClose={
                    () => setShowGiftModal(false)
                }
                    userName={authenticatedUser} />} </
        div >
        );
    }

    // Giao diện nhập mật khẩu
    return (<div className="mar8-container" ><FallingBouquets /><button className="mar8-back-home-btn"
        onClick={onBack}> ←Trang chủ </button><div className={`mar8-password-card ${isError ? 'shake' : ''}`}><div className="mar8-image-side" > { /* Ảnh đại diện theo mẫu (Có thể thay đổi URL) */} <img src={lockscreenImage}
            alt="8/3 Highlight" /></div><div className="mar8-pad-side" ><div className="mar8-heart-icon" > ❤️ </div><p className="mar8-password-hint" > Mật khẩu chính là sinh nhật của bạn </p><div className="mar8-dots" > {
                [0, 1, 2, 3].map((index) => (<div key={index}
                    className={`mar8-dot ${index < pin.length ? 'filled' : ''} ${isError ? 'error' : ''}`} />
                ))
            } </div><div className="mar8-keypad" > {
                [1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (<button key={num}
                    className="mar8-key"
                    onClick={
                        () => handleKeyPress(num.toString())
                    }> {num} </button>
                ))
            } <div className="mar8-key empty" ></div><button className="mar8-key"
                onClick={
                    () => handleKeyPress('0')
                }>
                        0 </button><button className="mar8-key action-key"
                            onClick={handleDelete}><svg xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round" ><path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0 -2-2z" ></path><line x1="18"
                                    y1="9"
                                    x2="12"
                                    y2="15" ></line><line x1="12"
                                        y1="9"
                                        x2="18"
                                        y2="15" ></line></
                        svg ></button></
                div ></div></
        div ></div>
    );
};

export default March8Page;