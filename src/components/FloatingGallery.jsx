import { memo, useState, useEffect, useMemo } from 'react';
import './FloatingGallery.css';
import { supabase } from '../supabaseClient';

// Dynamically import all images from the assets folder (RECURSIVE)
// eager: true means they are loaded synchronously at build/run time
const imagesVal = import.meta.glob('../assets/**/*.{png,jpg,jpeg,svg,webp}', { eager: true });

// Convert the object of modules to an array of image paths
const localImageList = Object.values(imagesVal).map((img) => img.default);

console.log(`[FloatingGallery] Found ${localImageList.length} local images in assets.`);

const FloatingGallery = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [remoteImages, setRemoteImages] = useState([]);

    // Fetch remote images from Supabase
    useEffect(() => {
        const fetchRemoteImages = async () => {
            try {
                const { data, error } = await supabase
                    .from('gallery_images')
                    .select('image_url')
                    .order('created_at', { ascending: false });

                if (error) {
                    console.error("Error fetching gallery images:", error);
                } else if (data) {
                    console.log(`[FloatingGallery] Fetched ${data.length} remote images from Supabase.`);
                    const urls = data.map(item => item.image_url);
                    setRemoteImages(urls);
                }
            } catch (err) {
                console.error("Unexpected error fetching images:", err);
            }
        };

        fetchRemoteImages();

        // Realtime subscription to new images (Optional but cool)
        const subscription = supabase
            .channel('gallery_updates')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'gallery_images' }, (payload) => {
                setRemoteImages(prev => [payload.new.image_url, ...prev]);
            })
            .subscribe();

        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    // Combine local and remote images
    const imageList = useMemo(() => {
        return [...remoteImages, ...localImageList];
    }, [remoteImages]);

    const rows = [
        { id: 1, speed: 'slow', direction: 'left' },
        { id: 2, speed: 'medium', direction: 'right' },
        { id: 3, speed: 'slow', direction: 'left' },
    ];

    // Use the number of images found, or default to 10 if none/few
    // We want enough frames to fill wide screens.
    const framesPerRow = imageList.length > 0 ? Math.max(imageList.length, 10) : 10;

    // Base duration per frame (seconds) to maintain constant visual speed
    // e.g., 3s per frame. Faster flow.
    const baseDuration = framesPerRow * 3;

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
                {rows.map((row, rowIndex) => {
                    // Adjust speed multiplier
                    let speedMult = 1;
                    if (row.speed === 'fast') speedMult = 0.7; // Faster = less time
                    if (row.speed === 'slow') speedMult = 1.1; // Slower = slightly more time

                    const finalDuration = `${baseDuration * speedMult}s`;

                    return (
                        <div
                            key={row.id}
                            className={`gallery-row move-${row.direction}`}
                        // Container handles positioning and overflow
                        >
                            <div
                                className="marquee-track"
                                style={{
                                    animationDuration: finalDuration
                                }}
                            >
                                {/* First set of items */}
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

                                {/* Duplicate set for seamless loop */}
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
                    );
                })}
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
