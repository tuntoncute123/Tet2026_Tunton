import { memo, useState } from 'react';
import './FloatingGallery.css';

// Dynamically import all images from the assets folder using Vite's import.meta.glob
// eager: true means they are loaded synchronously at build/run time
const imagesVal = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

// Convert the object of modules to an array of image paths
const imageList = Object.values(imagesVal).map((img) => img.default);

const FloatingGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    const rows = [
        { id: 1, speed: 'slow', direction: 'left' },
        { id: 2, speed: 'medium', direction: 'right' },
        { id: 3, speed: 'slow', direction: 'left' },
    ];

    // Use the number of images found, or default to 8 if none/few to ensure scrolling works
    const framesPerRow = imageList.length > 0 ? Math.max(imageList.length, 8) : 8;

    // Helper to get image for a specific index (cycling through list)
    const getImage = (rowIndex, frameIndex) => {
        if (imageList.length === 0) return null;
        // Create a unique offset for each row so they don't look identical
        const totalIndex = (rowIndex * 3) + frameIndex;
        return imageList[totalIndex % imageList.length];
    };

    return (
        <>
            <div className="gallery-container">
                {rows.map((row, rowIndex) => (
                    <div
                        key={row.id}
                        className={`gallery-row move-${row.direction} speed-${row.speed}`}
                    >
                        {/* We duplicate the content to ensure seamless infinite scrolling */}
                        {/* First copy */}
                        <div className="row-content">
                            {[...Array(framesPerRow)].map((_, index) => {
                                const imgSrc = getImage(rowIndex, index);
                                return (
                                    <div
                                        key={`original-${index}`}
                                        className="gallery-frame"
                                        onClick={() => imgSrc && setSelectedImage(imgSrc)}
                                    >
                                        <div className="frame-inner">
                                            {imgSrc ? (
                                                <img src={imgSrc} alt="Memory" loading="lazy" />
                                            ) : (
                                                <span>No Images</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        {/* Duplicate copy for loop */}
                        <div className="row-content">
                            {[...Array(framesPerRow)].map((_, index) => {
                                const imgSrc = getImage(rowIndex, index);
                                return (
                                    <div
                                        key={`duplicate-${index}`}
                                        className="gallery-frame"
                                        onClick={() => imgSrc && setSelectedImage(imgSrc)}
                                    >
                                        <div className="frame-inner">
                                            {imgSrc ? (
                                                <img src={imgSrc} alt="Memory" loading="lazy" />
                                            ) : (
                                                <span>No Images</span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox Modal */}
            {selectedImage && (
                <div className="lightbox-overlay" onClick={() => setSelectedImage(null)}>
                    <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedImage} alt="Full Memory" className="lightbox-img" />
                        <button className="lightbox-close" onClick={() => setSelectedImage(null)}>×</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default memo(FloatingGallery);
