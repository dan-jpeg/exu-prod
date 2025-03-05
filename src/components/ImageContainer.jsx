import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import cursorImage from '@/assets/prev-next-cursor.png';

const ImageContainer = ({
                            images,
                            alt = "Artwork image",
                            aspectRatio = "4/3",
                            maxWidth = "w-full",
                            onImageChange = () => {}
                        }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [showCursor, setShowCursor] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent.toLowerCase();
            const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);

            // Alternative check based on screen width
            const isMobileWidth = window.innerWidth < 768;

            setIsMobile(isMobileDevice || isMobileWidth);
        };

        checkMobile();

        // Also check on resizee
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

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
        // Only track mouse position if not on mobile and cursor should be shown
        if (isMobile || !showCursor) return;

        const handleMouseMove = (e) => {
            setCursorPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [showCursor, isMobile]);

    const handleMouseEnter = () => {
        if (!isMobile) {
            setShowCursor(true);
        }
    };

    const handleMouseLeave = () => {
        setShowCursor(false);
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className="relative pt-12">
            {/* Custom Cursor - only show on non-mobile devices */}
            {!isMobile && showCursor && (
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
                className={`relative ${maxWidth} h-[60vh] mx-auto`}
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
                <div className="absolute inset-0 w-screen left-1/2 transform -translate-x-1/2 flex" style={{ top: '0', height: '100%' }}>
                    {/* Previous image area */}
                    <motion.div
                        className={`w-1/2 h-full ${isMobile ? 'cursor-default' : 'cursor-none'}`}
                        onClick={handlePrevious}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        transition={{ duration: 0.2 }}
                    />

                    {/* Next image area */}
                    <motion.div
                        className={`w-1/2 h-full ${isMobile ? 'cursor-default' : 'cursor-none'}`}
                        onClick={handleNext}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        transition={{ duration: 0.2 }}
                    />
                </div>
            )}
        </div>
    );
};

export default ImageContainer;