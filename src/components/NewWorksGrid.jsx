
import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FullscreenImage } from "@/components/WorksList.jsx";



export const WorkDisplay = ({
                         work,
                         heightArray = ['5vw', '5vw', '5vw', '5vw'],
                         customComponents = [], // Array of custom components to display instead of fullscreen images
                         alternateLayout = false // New prop for alternate layout
                     }) => {
    const [fullscreenImage, setFullscreenImage] = useState(null);
    const [activeComponent, setActiveComponent] = useState(null);
    const images = work.media.filter(item => item.type === "image").map(item => item.url);

    const handleImageClick = (imageUrl, index) => {
        // Check if there's a custom component for this image
        if (customComponents[index]) {
            setActiveComponent(customComponents[index]);
        } else {
            setFullscreenImage(imageUrl);
        }
    };

    const handleClose = () => {
        setFullscreenImage(null);
        setActiveComponent(null);
    };

    // Split images into rows of 4 (default layout)
    const rows = [];
    if (!alternateLayout || images.length !== 3) {
        for (let i = 0; i < images.length; i += 4) {
            rows.push(images.slice(i, i + 4));
        }
    }

    return (
        <div className="w-full py-12">
            <AnimatePresence>
                {fullscreenImage && (
                    <FullscreenImage
                        src={fullscreenImage}
                        alt={work.title}
                        description={work.description}
                        onClose={handleClose}
                    />
                )}
                {activeComponent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
                        <div className="relative max-w-screen-lg max-h-[100vh] overflow-auto hide-scrollbar ">
                            <button
                                className="fixed top-2 right-2 text-gray text-2xl bg-black bg-opacity-0 rounded-full w-10 h-10 flex items-center justify-center z-10"
                                onClick={handleClose}
                            >
                                ×
                            </button>
                            {activeComponent}
                        </div>
                    </div>
                )}
            </AnimatePresence>

            {/* Title and details row */}
            <div className="grid text-[1vw] lg:text-[10px] mb-[8vw] uppercase font-bold font-alte-haas opacity-80 grid-cols-6 w-full">
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

            {/* Alternate layout for exactly 3 images */}
            {alternateLayout && images.length === 3 ? (
                <div className="grid grid-cols-6 w-full  mb-[2vw]">
                    {/* First image - larger, spans 6 columns */}
                    <div className="col-span-1 flex justify-center">
                        <img
                            src={images[0]}
                            alt={`${work.title} 1`}
                            style={{height: heightArray[0] !== '5vw' ? heightArray[0] : '30vw'}}
                            className="w-auto object-contain cursor-zoom-in"
                            draggable="false"
                            onClick={() => handleImageClick(images[0], 0)}
                        />
                    </div>

                    {/* Small spacer */}
                    <div className="col-span-1"></div>

                    {/* Second image - vertical stack */}
                    <div className="col-span-2 flex flex-col justify-center ">
                        <img
                            src={images[1]}
                            alt={`${work.title} 2`}
                            style={{height: heightArray[1] !== '5vw' ? heightArray[1] : '9vw'}}
                            className="w-auto object-contain
                             cursor-zoom-in"
                            draggable="false"
                            onClick={() => handleImageClick(images[1], 1)}
                        />

                        {/* Third image - below second */}

                    </div>

                    <div className="col-span-1"></div>

                    <div className="col-span-1 flex flex-col items-center ">
                        <img
                            src={images[2]}
                            alt={`${work.title} 2`}
                            style={{height: heightArray[1] !== '5vw' ? heightArray[1] : '9vw'}}
                            className="w-auto object-contain cursor-zoom-in"
                            draggable="false"
                            onClick={() => handleImageClick(images[2], 1)}
                        />

                        {/* Third image - below second */}

                    </div>

                    {/* Empty space for balance */}
                </div>
            ) : (
                /* Regular layout with rows of 4 */
                rows.map((rowImages, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-6 w-full mb-[2vw]">
                        {/* First image - column 1 */}
                        <div className="col-span-1 flex justify-center">
                            {rowImages[0] && (
                                <img
                                    src={rowImages[0]}
                                    alt={`${work.title} ${rowIndex * 4 + 1}`}
                                    style={{ height: heightArray[0] }}
                                    className="w-auto object-cover cursor-zoom-in"
                                    draggable="false"
                                    onClick={() => handleImageClick(rowImages[0], rowIndex * 4)}
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
                                    onClick={() => handleImageClick(rowImages[1], rowIndex * 4 + 1)}
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
                                    onClick={() => handleImageClick(rowImages[2], rowIndex * 4 + 2)}
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
                                    onClick={() => handleImageClick(rowImages[3], rowIndex * 4 + 3)}
                                />
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};


// WorksGrid.jsx
import { selectedWorks } from "@/projects-and-videos.js";
import FromEarthAndUp from "@/components/FromEarthAndUp.jsx";
import MinimalNav from "@/components/MinimalNav.jsx";

export const WorksGrid = ({onNavigate}) => {
    return (
        <div className="w-full  mt-12">

            <MinimalNav onNavigate={onNavigate} />

            <WorkDisplay
                work={selectedWorks[0]}
                // heightArray={['12vw', '8vw', '6vw', '10vw']}
                customComponents={[
                    < FromEarthAndUp  key="custom-1"/>,
                    < FromEarthAndUp  key="custom-2"/>,
                    < FromEarthAndUp  key="custom-3"/>,
                    < FromEarthAndUp  key="custom-4"/>

                ]}
            />

            <WorkDisplay
                work={selectedWorks[1]}
                // heightArray={['6vw', '8vw', '6vw', '10vw']}

            />

            <WorkDisplay
                work={selectedWorks[2]}
                // heightArray={['10vw', '9vw', '12vw', '10vw']}
            />

            <WorkDisplay
                work={selectedWorks[3]}
                heightArray={['7vw', '7vw', '7vw', '7vw']}

            />

            <WorkDisplay
                work={selectedWorks[4]}
                heightArray={['7vw', '7vw', '7vw', '7vw']}
            />

            <WorkDisplay
                work={selectedWorks[5]}
                // heightArray={['14vw', '15vw', '9vw', '12vw']}
            />

            <WorkDisplay
                work={selectedWorks[6]}
                // heightArray={['9vw', '12vw', '9vw', '12vw']}
            />

            <WorkDisplay
                work={selectedWorks[7]}
                // heightArray={['9vw', '12vw', '9vw', '12vw']}
            />

            <WorkDisplay
                work={selectedWorks[8]}
                // heightArray={['12vw', '12vw', '12vw', '12vw']}
                alternateLayout={false}
            />

            <WorkDisplay
                work={selectedWorks[9]}
                // heightArray={['7vw', '7vw', '7v w', '12vw']}
            />

            <WorkDisplay
                work={selectedWorks[10]}
                // heightArray={['7vw', '7vw', '7vw', '7vw']}
            />





            <div className="w-full h-screen flex justify-center place-items-center" >
                <span
                    className="cursor-n-resize sepia hover:opacity-10"
                    onClick={() => onNavigate('works')}> RETURN TO TOP</span>
            </div>

            {/* Add more WorkDisplay components with custom heightArrays as needed */}
        </div>
    );
};

export default WorksGrid;