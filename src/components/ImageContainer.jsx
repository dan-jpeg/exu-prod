import React, { useState, useEffect, forwardRef } from 'react';
import { motion } from 'framer-motion';
import cursorImage from '@/assets/prev-next-cursor.png';

const ImageContainer = ({
                             images,
                             alt = "Artwork image",
                             aspectRatio = "4/3",
                             onImageChange = () => {}
                         }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [showCursor, setShowCursor] = useState(false);

    const handlePrevious = () => {
        const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
        onImageChange(newIndex);
    };

    const handleNext = () => {
        const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
        onImageChange(newIndex);
    };

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (showCursor) {
                setCursorPosition({ x: e.clientX, y: e.clientY });
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [showCursor]);

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="relative w-full pt-12">
            {/* Custom Cursor */}
            {showCursor && (
                <img
                    src={cursorImage}
                    className="pointer-events-none fixed z-[9999] w-[58px] h-[10px]"
                    style={{
                        left: `${cursorPosition.x}px`,
                        top: `${cursorPosition.y}px`,
                        transform: 'translate(-50%, -50%)',
                        imageRendering: 'pixelated',
                    }}
                    alt=""
                />
            )}

            {/* Main container with the image */}
            <div
                className="relative h-[60vh] w-full"
                style={{ aspectRatio }}
            >
                <img
                    src={images[currentIndex]}
                    alt={`${alt} ${currentIndex + 1} of ${images.length}`}
                    className="absolute inset-0 w-full h-full object-contain"
                    draggable="false"
                />
            </div>

            {/* Click areas - only show if there are multiple images */}
            {images.length > 1 && (
                <div className="absolute inset-0 flex">
                    {/* Previous image area */}
                    <motion.div
                        className="w-1/2 h-full cursor-none"
                        onClick={handlePrevious}
                        onMouseEnter={() => setShowCursor(true)}
                        onMouseLeave={() => setShowCursor(false)}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Next image area */}
                    <motion.div
                        className="w-1/2 h-full cursor-none"
                        onClick={handleNext}
                        onMouseEnter={() => setShowCursor(true)}
                        onMouseLeave={() => setShowCursor(false)}
                        transition={{ duration: 0.2 }}
                    />
                </div>
            )}

        </div>
    );
};

export default ImageContainer;