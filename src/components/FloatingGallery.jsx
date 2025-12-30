import './FloatingGallery.css';

const FloatingGallery = () => {
    // Dynamically import all images from the assets folder using Vite's import.meta.glob
    // eager: true means they are loaded synchronously at build/run time
    const imagesVal = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

    // Convert the object of modules to an array of image paths
    const imageList = Object.values(imagesVal).map((img) => img.default);

    const rows = [
        { id: 1, speed: 'slow', direction: 'left' },
        { id: 2, speed: 'medium', direction: 'right' },
        { id: 3, speed: 'slow', direction: 'left' },
    ];

    const framesPerRow = 8; // Number of frames in each scrolling row

    // Helper to get image for a specific index (cycling through list)
    const getImage = (rowIndex, frameIndex) => {
        if (imageList.length === 0) return null;
        // Create a unique offset for each row so they don't look identical
        const totalIndex = (rowIndex * 3) + frameIndex;
        return imageList[totalIndex % imageList.length];
    };

    return (
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
                                <div key={`original-${index}`} className="gallery-frame">
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
                                <div key={`duplicate-${index}`} className="gallery-frame">
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
    );
};

export default FloatingGallery;
