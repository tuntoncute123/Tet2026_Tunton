import { useState, useRef, useEffect } from 'react';
import './ImageGalleryModal.css';

// Import ảnh từ thư mục nhan
import nhan1 from '../8.3/nhan/473070012_1740558580057774_5239471001285401567_n.jpg';
import nhan2 from '../8.3/nhan/484454819_1787555022024796_4972958348730029276_n_cleanup.png';
import nhan3 from '../8.3/nhan/498225368_661468486727573_3295657091496065542_n.jpg';
import nhan4 from '../8.3/nhan/Screenshot 2025-11-11 173229.png';
import nhan5 from '../8.3/nhan/z7382237923179_018ea54c6f6972b382f011c9793dbe61.jpg';
import nhan6 from '../8.3/nhan/z7382238993474_36e0efffa2ba24b798e8f488365bb7fc.jpg';
import nhan7 from '../8.3/nhan/image.png';

// Import ảnh từ thư mục hue
import hue1 from '../8.3/hue/150976464_887195372042740_3615220983120976135_n.jpg';
import hue2 from '../8.3/hue/476159967_1799195324176069_5558618684124203463_n.jpg';
import hue3 from '../8.3/hue/476244217_1799195337509401_2751644267926723848_n.jpg';
import hue4 from '../8.3/hue/476667242_1799195300842738_2099258189274131979_n.jpg';
import hue5 from '../8.3/hue/481766660_1813698906059044_3386369604464241392_n.jpg';
import hue6 from '../8.3/hue/485024442_1830001441095457_3470847608366103393_n.jpg';
import hue7 from '../8.3/hue/image.png';

// Import ảnh từ thư mục an
import an1 from '../8.3/an/4682f1d7-f028-49de-b0e7-abc051248db8.jpg';
import an2 from '../8.3/an/4f2a59a3-3e2f-43d0-b676-0b765a85a3e6.jpg';
import an3 from '../8.3/an/500d53e9-8ccc-4d68-8dac-5ecc928274d0.jpg';
import an4 from '../8.3/an/cd58f71a-7793-473c-882a-b37770d4bc61.jpg';
import an5 from '../8.3/an/eac41048-d9da-4c88-a518-f1f2fc27fe2a.jpg';
import an6 from '../8.3/an/f78eb5c4-0543-4574-8a49-39fef37ad1c6.jpg';

// Import ảnh từ thư mục na
import na1 from '../8.3/na/605117038_1877331669574855_8864632626104638481_n.jpg';
import na2 from '../8.3/na/_MG_7395.JPG';
import na3 from '../8.3/na/🏔️.jpg';
import na4 from '../8.3/na/🦢⟡💭꙳◞🪽ྀི˖.jpg';
import na5 from '../8.3/na/🧺⸝⸝ 🥞 ⁺˚🧸⋆.jpg';

// Import ảnh từ thư mục tuyen
import tuyen1 from '../8.3/tuyen/_MG_7335.JPG';
import tuyen2 from '../8.3/tuyen/_MG_7471.JPG';
import tuyen3 from '../8.3/tuyen/_MG_7482.JPG';
import tuyen4 from '../8.3/tuyen/_MG_7701.JPG';

// Danh sách ảnh cho từng user
const IMAGE_SETS = {
    'Đỗ Thanh Nhàn': [
        { id: 1, url: nhan1 },
        { id: 2, url: nhan2 },
        { id: 3, url: nhan3 },
        { id: 4, url: nhan4 },
        { id: 5, url: nhan5 },
        { id: 6, url: nhan6 },
        { id: 7, url: nhan7 },
    ],
    'Nguyễn Thị Kim Huệ': [
        { id: 1, url: hue1 },
        { id: 2, url: hue2 },
        { id: 3, url: hue3 },
        { id: 4, url: hue4 },
        { id: 5, url: hue5 },
        { id: 6, url: hue6 },
        { id: 7, url: hue7 },
    ],
    'Bùi Tôn Nữ Xuân An': [
        { id: 1, url: an1 },
        { id: 2, url: an2 },
        { id: 3, url: an3 },
        { id: 4, url: an4 },
        { id: 5, url: an5 },
        { id: 6, url: an6 },
    ],
    'Trần Ly Na': [
        { id: 1, url: na1 },
        { id: 2, url: na2 },
        { id: 3, url: na3 },
        { id: 4, url: na4 },
        { id: 5, url: na5 },
    ],
    'Lê Thị Thanh Tuyền': [
        { id: 1, url: tuyen1 },
        { id: 2, url: tuyen2 },
        { id: 3, url: tuyen3 },
        { id: 4, url: tuyen4 },
    ],
};

const ImageGalleryModal = ({ onClose, userName = 'Đỗ Thanh Nhàn' }) => {
    const IMAGES = IMAGE_SETS[userName] || IMAGE_SETS['Đỗ Thanh Nhàn'];
    const modalRef = useRef();

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        }
    };

    // Chia danh sách thành 2 mảng cho 2 luồng cuộn khác nhau
    const half = Math.ceil(IMAGES.length / 2);
    const row1 = IMAGES.slice(0, half);
    const row2 = IMAGES.slice(half);

    // Nhân đôi mảng để tạo hiệu ứng cuộn vô tận mượt mà hơn
    const row1Loop = [...row1, ...row1, ...row1];
    const row2Loop = [...row2, ...row2, ...row2];

    return (<div className="img-modal-overlay"
        onClick={handleBackdropClick} >
        <div className="img-modal-content"
            ref={modalRef}
            onClick={e => e.stopPropagation()} >

            { /* Header trang trí thỏ/gấu */} <div className="img-modal-header" >
                <div className="img-modal-mascot" > 🐰 </div> <h2 className="img-modal-title" > HAPPY INTERNATIONAL WOMEN 'S DAY</h2> <button className="img-modal-close"
                    onClick={onClose} > ✕ </button> </div>

            { /* Khu vực 2 dòng cuộn */} <div className="img-gallery-scroller" > { /* Hàng 1 cuộn sang trái */} <div className="img-scroll-row go-left" >
                <div className="img-scroll-track" > {
                    row1Loop.map((img, i) => (<div key={`row1-${i}`}
                        className="img-scroll-item" >
                        <img src={img.url}
                            alt={`Gallery 1-${i}`}
                        /> </div>
                    ))
                } </div> </div>

                { /* Hàng 2 cuộn sang phải (ngược lại) */} <div className="img-scroll-row go-right" >
                    <div className="img-scroll-track" > {
                        row2Loop.map((img, i) => (<div key={`row2-${i}`}
                            className="img-scroll-item" >
                            <img src={img.url}
                                alt={`Gallery 2-${i}`}
                            /> </div>
                        ))
                    } </div> </div> </div>

            { /* Footer trang trí chó/gấu ôm tim */} <div className="img-modal-footer" >
                <h2 className="img-modal-title small" > HAPPY INTERNATIONAL WOMEN 'S DAY</h2> <div className="img-modal-mascot" > 🐶❤️ </div> </div>

        </div> </div>
    );
};

export default ImageGalleryModal;