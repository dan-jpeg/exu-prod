import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const FullscreenImage = ({ src, alt, onClose }) => (



    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 bg-white z-50 flex items-center justify-center cursor-zoom-out"
        onClick={onClose}
    >
        <img
            src={src}
            alt={alt}
            className="max-h-[90vh] max-w-[90vw] object-contain"
            draggable="false"
        />
    </motion.div>
);


const WorkRow = ({ work }) => {
    const images = work.images || [];
    const displayImages = images.slice(0, 4);
    const [fullscreenImage, setFullscreenImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setFullscreenImage(imageUrl);
    };

    return (
        <div className="w-full py-12">
            <AnimatePresence>
                {fullscreenImage && (
                    <FullscreenImage
                        src={fullscreenImage}
                        alt={work.title}
                        onClose={() => setFullscreenImage(null)}
                    />
                )}
            </AnimatePresence>

            {/* Title and details row */}
            <div className="grid text-[2vw] md:text-[1vw] lg:text-[11px] mb-20 uppercase font-bold font-alte-haas opacity-80 grid-cols-6 w-full">
                <div className="col-span-1 justify-self-start">
                    <span>{work.title}</span>
                </div>
                <div className="col-span-1 justify-self-start">
                    <span className="">{work.year}</span>
                </div>


                <div className="col-span-2 justify-self-center">  {work.dimensions}</div>
                <div className="col-span-2 justify-self-end">
                    <span>{work.material}</span>
                </div>
            </div>

            {/* 6 column grid with strategic spacing */}
            <div className="grid grid-cols-6 w-full">
            {/* First image - column 1 */}
                <div className="col-span-1 flex justify-center">
                    {displayImages[0] && (
                        <img
                            src={displayImages[0]}
                            alt={`${work.title} 1`}
                            className="h-[10vw] md:h-[5vw] w-auto object-cover cursor-zoom-in"
                            draggable="false"
                            onClick={() => handleImageClick(displayImages[0])}
                        />
                    )}
                </div>

                {/* Spacing - column 2 */}
                <div className="col-span-1"></div>

                {/* Second image - column 3 */}
                <div className="col-span-1 flex justify-center">
                    {displayImages[1] && (
                        <img
                            src={displayImages[1]}
                            alt={`${work.title} 2`}
                            className="h-[8vw] md:h-[5vw] w-auto object-cover cursor-zoom-in"
                            draggable="false"
                            onClick={() => handleImageClick(displayImages[1])}
                        />
                    )}
                </div>

                {/* Third image - column 4 */}
                <div className="col-span-1 flex justify-center">
                    {displayImages[2] && (
                        <img
                            src={displayImages[2]}
                            alt={`${work.title} 3`}
                            className="h-[7vw] md:h-[5vw] w-auto object-cover cursor-zoom-in"
                            draggable="false"
                            onClick={() => handleImageClick(displayImages[2])}
                        />
                    )}
                </div>

                {/* Spacing - column 5 */}
                <div className="col-span-1"></div>

                {/* Fourth image - column 6 */}
                <div className="col-span-1 flex justify-center">
                    {displayImages[3] && (
                        <img
                            src={displayImages[3]}
                            alt={`${work.title} 4`}
                            className="h-[10vw] md:h-[5vw] w-auto object-cover cursor-zoom-in"
                            draggable="false"
                            onClick={() => handleImageClick(displayImages[3])}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

const WorkText = ({ text }) => (
    <div className="fixed bottom-2 left-0 w-full text-center">
        <p className="text-[11px] font-alte-haas">
            {text}
        </p>
    </div>
);

const WorksList = ({ works, text }) => {
    const worksList = Array.isArray(works) ? works : [works];

    return (
        <div className="w-full mt-12">
            {worksList.map((work, index) => (
                <WorkRow key={index} work={work} />
            ))}
            {text && <WorkText text={text} />}
        </div>
    );
};

export default WorksList;