import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// The FullscreenImage component handles the expanded view of an image
const FullscreenImage = ({ url, onClose }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
        onClick={onClose}
    >
        <div className="w-full h-full p-4 flex items-center justify-center cursor-zoom-out">
            <img
                src={url}
                alt=""
                className="max-w-full max-h-full object-contain"
                // onClick={(e) => e.stopPropagation()} // Prevents image click from closing
            />
        </div>
    </motion.div>
);

// ImageContainer now includes click handling for fullscreen toggle
const ImageContainer = ({ url, onImageClick }) => (
    <div className="w-[80vw] lg:w-[60vw] xl:w-[50vw] max-w-screen-sm flex-shrink-0">
        <div
            className="aspect-[4/3] w-full max-h-[50vh] relative cursor-zoom-in"
            onClick={() => onImageClick(url)}
        >
            <img
                src={url}
                alt=""
                className="absolute inset-0 w-full h-full object-contain"
                draggable="false"
            />
        </div>
    </div>
);

const HorizontalScroll = ({ selectedWork }) => {
    // State to track the currently fullscreened image URL
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const containerRef = useRef(null);

    // Effect to manage scroll behavior when fullscreen is active
    useEffect(() => {
        // Save the initial body styles to restore them later
        const originalStyle = window.getComputedStyle(document.body).overflow;
        const originalPosition = window.getComputedStyle(document.body).position;
        const scrollY = window.scrollY;

        if (fullscreenImage) {
            // Disable scrolling when fullscreen is active
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}px`;
        } else {
            // Restore scrolling when fullscreen is closed
            document.body.style.overflow = originalStyle;
            document.body.style.position = originalPosition;
            document.body.style.width = 'auto';
            document.body.style.top = 'auto';
            // Restore scroll position
            window.scrollTo(0, scrollY);
        }

        // Cleanup function to ensure we restore scroll behavior
        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.position = originalPosition;
            document.body.style.width = 'auto';
            document.body.style.top = 'auto';
            if (fullscreenImage) {
                window.scrollTo(0, scrollY);
            }
        };
    }, [fullscreenImage]); // Only run effect when fullscreen state changes

    // Scroll animation setup
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Filter only image media items
    const images = selectedWork?.media?.filter(item => item.type === 'image') || [];

    // Calculate total scroll distance needed based on number of images
    const totalDistance = -(images.length - 1) * 95;
    const x = useTransform(scrollYProgress, [0, 1], ['0%', `${totalDistance}%`]);

    // Handle fullscreen toggling
    const handleImageClick = (url) => {
        setFullscreenImage(url);
    };

    const handleCloseFullscreen = () => {
        setFullscreenImage(null);
    };

    if (!selectedWork || images.length === 0) {
        return null;
    }

    return (
        <>
            {/* Fullscreen overlay */}
            <AnimatePresence>
                {fullscreenImage && (
                    <FullscreenImage
                        url={fullscreenImage}
                        onClose={handleCloseFullscreen}
                    />
                )}
            </AnimatePresence>

            {/* Main horizontal scroll content */}
            <div ref={containerRef} className="h-[250vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
                    <div className="relative h-full flex items-center">
                        <motion.div
                            style={{ x }}
                            className="flex gap-[12px] pl-[10vw]"
                        >
                            {images.map((media, index) => (
                                <ImageContainer
                                    key={`${selectedWork.id}-${index}`}
                                    url={media.url}
                                    onImageClick={handleImageClick}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HorizontalScroll;