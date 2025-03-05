import React from 'react';
import {motion} from 'framer-motion';

const VideoCell = ({title, year, duration, thumbnail, onClick}) => {
    return (
        <div className="md:h-4  max-w-[200px] lg:h-[1vw] flex flex-col mb-5 cursor-zoom-in" onClick={onClick}>
            <div className="flex uppercase font-bold justify-between items-start w-full">
                <span className=" hover:opacity-15 font-alte-haas max-w-[70%] leading-tight">{title}</span>
                <span className="font-alte-haas">{year}</span>
            </div>

            <div className="w-full pt-4 flex justify-center">
                <img
                    src={thumbnail}
                    alt={title}
                    className="h-[3vw] w-auto object-cover"
                    draggable="false"
                />
            </div>
        </div>

    );
};

export default VideoCell;

