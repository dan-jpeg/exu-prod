import React, { useEffect } from "react";

const MobileWorkDisplay = ({ work, heightPair = ['12vw', '12vw'], onWorkClick }) => {
    // Debug on component mount
    useEffect(() => {
        console.log(`MobileWorkDisplay mounted for work: ${work?.title}`);
        console.log(`onWorkClick prop is: ${typeof onWorkClick}`);
    }, [work, onWorkClick]);

    // Ensure we have the media property before filtering
    const images = work.media ?
        work.media.filter(item => item.type === "image").map(item => item.url) :
        [];

    const handleImageClick = (e) => {
        // Stop event propagation issues
        e.stopPropagation();
        e.preventDefault();

        if (onWorkClick && typeof onWorkClick === 'function') {
            onWorkClick(work);
        } else {
            console.error('onWorkClick is not a function or is undefined');
        }
    };

    // Split images into rows of 2
    const rows = [];
    for (let i = 0; i < images.length; i += 2) {
        rows.push(images.slice(i, i + 2));
    }

    // Only take the first row for display
    const firstRow = rows.length > 0 ? rows[0] : [];

    return (
        <div
            className="w-full py-8 cursor-pointer border border-transparent hover:border-gray-200"
            onClick={handleImageClick}
            style={{ position: 'relative' }}
        >
            {/* Overlay to ensure clicks are captured */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 10
                }}
                onClick={handleImageClick}
            />

            {/* Title and details row */}
            <div className="grid text-[10px] mb-[8vw] uppercase font-bold font-alte-haas opacity-80 grid-cols-4 w-full relative z-5">
                <div className="col-span-4 justify-self-start">
                    <span>{work.title}</span>
                </div>
                <div className="col-span-2 justify-self-start font-normal">{work.dimensions}</div>
                <div className="col-span-2 justify-self-end font-normal">
                    <span>{work.material}</span>
                </div>
            </div>

            {/* Images row - 2 per row */}
            <div className="grid grid-cols-11 w-full mb-[5vw] relative z-5">
                <div className="col-span-1"></div>
                {/* First image - column 1 */}
                <div className="col-span-4 flex justify-center">
                    {firstRow[0] && (
                        <img
                            src={firstRow[0]}
                            alt={`${work.title} 1`}
                            style={{height: heightPair[0]}}
                            className="w-auto object-cover"
                            draggable="false"
                        />
                    )}
                </div>

                {/* Spacing - column 2 */}
                <div className="col-span-1"></div>

                {/* Second image - column 3 */}
                <div className="col-span-4 flex justify-center">
                    {firstRow[1] && (
                        <img
                            src={firstRow[1]}
                            alt={`${work.title} 2`}
                            style={{height: heightPair[1]}}
                            className="w-auto object-cover"
                        />
                    )}
                </div>
                <div className="col-span-1"></div>
            </div>
        </div>
    );
};

export default MobileWorkDisplay;