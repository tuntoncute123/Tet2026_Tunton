import { useState, useEffect, useRef } from 'react';
import './LetterModal.css';

const LETTER_TEXTS = {
    'Đỗ Thanh Nhàn': `Happy Women's Day! Chúc Nhàn có một ngày 8/3 thật ý nghĩa và vui vẻ nhaaaaa. 
    Chúc cho công việc của bà luôn thuận buồm xuôi gió, làm đâu thắng đó và có thật nhiều cơ hội phát triển tốt trong tương lai. 
    Đi làm cố gắng nhưng nhớ giữ sức khỏe nhé, chúc mọi dự định sắp tới của bà đều thành công rực rỡ!
    Tui có ít ảnh bà chụp quá, bà xem đỡ nha! Chuyến đi Đà Lạt này bà chụp nhiều ảnh hơn nhé! `,
    'Nguyễn Thị Kim Huệ': `Gửi bà nội thân yêu của tôi,

Chúc nội một ngày 8/3 thật ý nghĩa và nhiều niềm vui. 
Chúc cho công việc hiện tại của bà luôn thuận lợi, sếp tâm lý, đồng nghiệp hòa đồng. 
Hy vọng chặng đường sự nghiệp sắp tới của bà sẽ có nhiều bước tiến mới và tích lũy được nhiều kinh nghiệm.`,
    'Bùi Tôn Nữ Xuân An': `Gửi Ngoại An thân mến,

Happy Women's Day An! Chúc bà có một ngày 8/3 thật vui và ý nghĩa. Sắp tốt nghiệp rồi nên tôi chúc con đường học hành của bà chặng cuối thật trơn tru, ra trường cầm cái bằng đẹp rồi sớm chốt được công việc xịn, lương cao. 
Cày cuốc gì thì cũng nhớ giữ sức khỏe nha.`,
    'Trần Ly Na': `Gửi Na thân mến,

8/3 chúc Na có một ngày thật ý nghĩa và nhận được nhiều quà. 
Chúc cho mọi mục tiêu sắp tới của bà, dù là học hành hay sự nghiệp, đều đạt kết quả cao chót vót. 
Tui nhường anh Di Di của tui cho bà một hôm đó. Bây không cưới tao kiện á nha!`,
    'Lê Thị Thanh Tuyền': `Ê Tuyền, 
    mùng 8/3 chúc bà luôn xinh tươi, rạng rỡ và lúc nào cũng vui vẻ nha. 
    Không biết dạo này đang cày deadline bài vở hay cày task công ty rồi, nhưng mà làm gì thì cũng chúc bà mọi chuyện mượt mà, thuận lợi hết nhé. 
    Chúc sớm thành phú bà, tiền vô như nước. Happy Women's Day!`,
};

const LetterModal = ({ onClose, userName = 'Đỗ Thanh Nhàn' }) => {
    const [displayedText, setDisplayedText] = useState('');
    const modalRef = useRef();
    const FULL_TEXT = LETTER_TEXTS[userName] || LETTER_TEXTS['Đỗ Thanh Nhàn'];

    useEffect(() => {
        let index = -1;
        const interval = setInterval(() => {
            index++;
            if (index < FULL_TEXT.length) {
                // Have to use callback to ensure we get the latest state and append correctly without relying on dependency string
                setDisplayedText((prev) => prev + FULL_TEXT.charAt(index));
            } else {
                clearInterval(interval);
            }
        }, 40); // Tốc độ chạy chữ: 40ms/kí tự

        return () => clearInterval(interval);
    }, [FULL_TEXT]);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    return (<div className="letter-modal-overlay"
        onClick={handleBackdropClick} > <div className="letter-modal-content"
            ref={modalRef}
            onClick={e => e.stopPropagation()} > <button className="letter-modal-close"
                onClick={onClose} > ✕ </button><div className="letter-paper" ><p className="letter-text" > {displayedText} <span className="letter-cursor" ></span> </p> </div><div className="letter-signature" ><span className="signature-text" > Mãi xinh đẹp nhá</span> { /* Minh hoạ gấu ôm tim */} <div className="signature-illustration" > <span style={
                    { fontSize: '2rem' }
                } > 🧸💕 </span></div> </div></div> </div>
    );
};

export default LetterModal;