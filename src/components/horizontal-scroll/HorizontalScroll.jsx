import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";

const ImageContainer = ({ url }) => (
    <div className="w-[80vw] lg:w-[60vw] xl:w-[50vw]  max-w-screen-sm flex-shrink-0">
        <div className="aspect-[4/3] w-full max-h-[50vh] relative">
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
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    // Filter only image media items
    const images = selectedWork?.media?.filter(item => item.type === 'image') || [];

    // Calculate total scroll distance needed based on number of images
    const totalDistance = -(images.length - 1) * 95;
    const x = useTransform(scrollYProgress, [0, 1], ['0%', `${totalDistance}%`]);

    if (!selectedWork || images.length === 0) {
        return null;
    }

    return (
        <div ref={containerRef} className="h-[250vh]"> {/* Height controls scroll distance */}
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-white">
                <div className="relative h-full flex items-center">
                    <motion.div
                        style={{ x }}
                        className="flex gap-[12px] pl-[10vw]" // Added padding to start from center
                    >
                        {images.map((media, index) => (
                            <ImageContainer
                                key={`${selectedWork.id}-${index}`}
                                url={media.url}
                            />
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HorizontalScroll;