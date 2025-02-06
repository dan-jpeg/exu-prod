
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FullscreenImage } from "@/components/WorksList.jsx";

const WorkDisplay = ({ work, heightArray = ['5vw', '5vw', '5vw', '5vw'] }) => {
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const images = work.media.filter(item => item.type === "image").map(item => item.url);

    const handleImageClick = (imageUrl) => {
        setFullscreenImage(imageUrl);
    };

    // Split images into rows of 4
    const rows = [];
    for (let i = 0; i < images.length; i += 4) {
        rows.push(images.slice(i, i + 4));
    }

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
            <div className="grid text-[1vw] lg:text-[11px] mb-20 uppercase font-bold font-alte-haas opacity-80 grid-cols-6 w-full">
                <div className="col-span-1 justify-self-start">
                    <span>{work.title}</span>
                </div>
                <div className="col-span-1 justify-self-start">
                    <span className="">{work.year}</span>
                </div>
                <div className="col-span-2 justify-self-center">{work.dimensions}</div>
                <div className="col-span-2 justify-self-end">
                    <span>{work.material}</span>
                </div>
            </div>

            {/* Multiple rows of images */}
            {rows.map((rowImages, rowIndex) => (
                <div key={rowIndex} className="grid grid-cols-6 w-full mb-8">
                    {/* First image - column 1 */}
                    <div className="col-span-1 flex justify-center">
                        {rowImages[0] && (
                            <img
                                src={rowImages[0]}
                                alt={`${work.title} ${rowIndex * 4 + 1}`}
                                style={{ height: heightArray[0] }}
                                className="w-auto object-cover cursor-zoom-in"
                                draggable="false"
                                onClick={() => handleImageClick(rowImages[0])}
                            />
                        )}
                    </div>

                    {/* Spacing - column 2 */}
                    <div className="col-span-1"></div>

                    {/* Second image - column 3 */}
                    <div className="col-span-1 flex justify-center">
                        {rowImages[1] && (
                            <img
                                src={rowImages[1]}
                                alt={`${work.title} ${rowIndex * 4 + 2}`}
                                style={{ height: heightArray[1] }}
                                className="w-auto object-cover cursor-zoom-in"
                                draggable="false"
                                onClick={() => handleImageClick(rowImages[1])}
                            />
                        )}
                    </div>

                    {/* Third image - column 4 */}
                    <div className="col-span-1 flex justify-center">
                        {rowImages[2] && (
                            <img
                                src={rowImages[2]}
                                alt={`${work.title} ${rowIndex * 4 + 3}`}
                                style={{ height: heightArray[2] }}
                                className="w-auto object-cover cursor-zoom-in"
                                draggable="false"
                                onClick={() => handleImageClick(rowImages[2])}
                            />
                        )}
                    </div>

                    {/* Spacing - column 5 */}
                    <div className="col-span-1"></div>

                    {/* Fourth image - column 6 */}
                    <div className="col-span-1 flex justify-center">
                        {rowImages[3] && (
                            <img
                                src={rowImages[3]}
                                alt={`${work.title} ${rowIndex * 4 + 4}`}
                                style={{ height: heightArray[3] }}
                                className="w-auto object-cover cursor-zoom-in"
                                draggable="false"
                                onClick={() => handleImageClick(rowImages[3])}
                            />
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};


// WorksGrid.jsx
import { selectedWorks } from "@/data.js";
import HorizontalScroll from "@/components/horizontal-scroll/HorizontalScroll.jsx";

export const WorksGrid = () => {
    return (
        <div className="w-full mt-12">
            <WorkDisplay
                work={selectedWorks[0]}
                heightArray={['8vw', '6vw', '8vw', '6vw']}
            />

            <WorkDisplay
                work={selectedWorks[1]}
                heightArray={['7vw', '9vw', '7vw', '9vw']}
            />

            <WorkDisplay
                work={selectedWorks[2]}
                heightArray={['6vw', '8vw', '6vw', '8vw']}
            />

            <WorkDisplay
                work={selectedWorks[3]}
                heightArray={['9vw', '7vw', '9vw', '7vw']}
            />

            <WorkDisplay
                work={selectedWorks[4]}
                heightArray={['9vw', '7vw', '9vw', '7vw']}
            />

            <WorkDisplay
                work={selectedWorks[5]}
                heightArray={['9vw', '7vw', '9vw', '7vw']}
            />

            <WorkDisplay
                work={selectedWorks[6]}
                heightArray={['9vw', '7vw', '9vw', '7vw']}
            />



            {/* Add more WorkDisplay components with custom heightArrays as needed */}
        </div>
    );
};

export default WorksGrid;