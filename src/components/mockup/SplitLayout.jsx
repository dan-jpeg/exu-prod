import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { selectedWorks } from "../../data.js";
import { exhibitions2 } from "../../data.js";

const titles = [...selectedWorks.map(work => work.title), ...exhibitions2.map(exhibition => exhibition.title)];

const SplitLayout = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isHoveringTop, setIsHoveringTop] = useState(false);

    useEffect(() => {
        let interval;

        if (!isHoveringTop) {  // Only run the interval if NOT hovering
            interval = setInterval(() => {
                setScrollY(prev => (prev + 1) % (titles.length * 40));
            }, 100);
        }

        return () => clearInterval(interval);
    }, [isHoveringTop]);  // Dependency on isHoveringTop

    return (
        <div className="h-screen w-full max-w-screen-md font-sans uppercase font-bold flex flex-col">
            {/* Top Section */}
            <div
                className="h-1/2 overflow-hidden bg-neutral-800 relative"
                onMouseEnter={() => setIsHoveringTop(true)}
                onMouseLeave={() => setIsHoveringTop(false)}
            >
                <div className="h-full flex justify-center">
                    <motion.div
                        className="absolute text-center"
                        style={{ y: -scrollY }}
                        transition={{ type: "linear" }}
                    >
                        {titles.map((name, index) => (
                            <div
                                key={index}
                                className="py-2 hover:opacity-60 cursor-crosshair px-4 text-white text-4xl tracking-tight"
                            >
                                {name}
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="h-1/2 bg-white relative flex flex-col items-center justify-between p-8">
                <div className="w-full flex font-sans uppercase justify-between text-sm">
                    <span className="hover:underline cursor-pointer">about</span>
                    <span className="hover:underline cursor-pointer">contact</span>
                </div>

                <div className="text-center opacity-100 mx-32 w-2/3 text-6xl bold tracking-tighter">
                    <img className="" src={exhibitions2[2].images[0]} alt="image" />
                </div>

                <div className="text-sm text-neutral-800 font-sans">
                    EDIE XU - SELECTED WORKS
                </div>
            </div>
        </div>
    );
};

export default SplitLayout;