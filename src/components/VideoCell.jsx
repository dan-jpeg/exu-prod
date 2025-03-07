import React from 'react';
import { motion } from 'framer-motion';

const VideoCell = ({ title, year, duration, thumbnail, onClick }) => {
    return (
        <div
            className="grid grid-rows-[auto_1fr] lg:max-w-[400px] cursor-zoom-in"
            style={{ gridTemplateRows: "auto minmax(20px, auto)" }}
            onClick={onClick}
        >
            {/* Title section */}
            <div className="flex uppercase font-bold justify-between items-start w-full mb-4">
                <span className="hover:opacity-15 font-alte-haas max-w-[70%] leading-tight">
                    {title}
                </span>
                <span className="font-alte-haas">{year}</span>
            </div>

            {/* Thumbnail section will align at the bottom of its grid cell */}
            <div className="w-full self-end pt-4 flex justify-center">
                <img
                    src={thumbnail}
                    alt={title}
                    className=" h-[20vw] md:h-[4vw] w-auto object-cover"
                    draggable="false"
                />
            </div>
        </div>
    );
};

export default VideoCell;