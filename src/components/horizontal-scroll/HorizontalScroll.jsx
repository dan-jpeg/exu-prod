import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

// Enhanced FullscreenImage component with navigation
const FullscreenImage = ({ url, onClose, onNext, onPrev, hasNext, hasPrev }) => {
    const handleContainerClick = (e) => {
        // Only handle clicks directly on the container, not its children
        if (e.target === e.currentTarget) {
            const { clientX } = e;
            const { width } = e.currentTarget.getBoundingClientRect();
            const clickPosition = clientX / width;

            if (clickPosition < 0.25) {
                if (hasPrev) onPrev();
            } else if (clickPosition > 0.75) {
                if (hasNext) onNext();
            } else {
                onClose();
            }
        }
    };

    const handleMouseMove = (e) => {
        // Only change cursor if hovering on the container
        if (e.target === e.currentTarget) {
            const { clientX, currentTarget } = e;
            const { width } = currentTarget.getBoundingClientRect();
            const position = clientX / width;

            if (position < 0.25 && hasPrev) {
                currentTarget.style.cursor = 'w-resize';
            } else if (position > 0.75 && hasNext) {
                currentTarget.style.cursor = 'e-resize';
            } else {
                currentTarget.style.cursor = 'zoom-out';
            }
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
            onClick={handleContainerClick}
            onMouseMove={handleMouseMove}
        >
            <img
                src={url}
                alt=""
                className="max-w-full max-h-full object-contain"
                style={{ pointerEvents: 'none' }}
            />
        </motion.div>
    );
};

// ImageContainer component remains the same
const ImageContainer = ({ url, onImageClick }) => (
    <div
        className="w-[80vw] lg:w-[60vw] xl:w-[50vw] max-w-screen-sm z-20 flex-shrink-0"
        onClick={() => onImageClick(url)}
    >
        <div className="h-[50vh] flex items-center justify-center cursor-zoom-in">
            <img
                src={url}
                alt=""
                className="max-w-full max-h-full object-contain"
                draggable="false"
            />
        </div>
    </div>
);

const HorizontalScroll = ({ selectedWork }) => {
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        const originalPosition = window.getComputedStyle(document.body).position;
        const scrollY = window.scrollY;

        if (fullscreenImage) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.top = `-${scrollY}px`;
        } else {
            document.body.style.overflow = originalStyle;
            document.body.style.position = originalPosition;
            document.body.style.width = 'auto';
            document.body.style.top = 'auto';
            window.scrollTo(0, scrollY);
        }

        return () => {
            document.body.style.overflow = originalStyle;
            document.body.style.position = originalPosition;
            document.body.style.width = 'auto';
            document.body.style.top = 'auto';
            if (fullscreenImage) {
                window.scrollTo(0, scrollY);
            }
        };
    }, [fullscreenImage]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const images = selectedWork?.media?.filter(item => item.type === 'image') || [];
    const totalDistance = -(images.length - 1) * 95;
    const x = useTransform(scrollYProgress, [0, 1], ['0%', `${totalDistance}%`]);

    const handleImageClick = (url) => {
        const index = images.findIndex(img => img.url === url);
        setCurrentImageIndex(index);
        setFullscreenImage(url);
    };

    const handleCloseFullscreen = () => {
        setFullscreenImage(null);
        setCurrentImageIndex(null);
    };

    const handleNext = () => {
        if (currentImageIndex < images.length - 1) {
            setCurrentImageIndex(currentImageIndex + 1);
            setFullscreenImage(images[currentImageIndex + 1].url);
        }
    };

    const handlePrev = () => {
        if (currentImageIndex > 0) {
            setCurrentImageIndex(currentImageIndex - 1);
            setFullscreenImage(images[currentImageIndex - 1].url);
        }
    };

    if (!selectedWork || images.length === 0) {
        return null;
    }

    return (
        <>
            <AnimatePresence>
                {fullscreenImage && (
                    <FullscreenImage
                        url={fullscreenImage}
                        onClose={handleCloseFullscreen}
                        onNext={handleNext}
                        onPrev={handlePrev}
                        hasNext={currentImageIndex < images.length - 1}
                        hasPrev={currentImageIndex > 0}
                    />
                )}
            </AnimatePresence>

            <div ref={containerRef} className="h-[200vh]">
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