import React from 'react';
import { motion } from 'framer-motion';
import arrow from "@/assets/arrow1.svg";

const VideoPage = ({handleReturn}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: "7%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "7%" }}
            transition={{ duration: 0.16 }}
            className="absolute inset-0 bg-white min-h-screen min-w-screen p-8"
        >
            <div className="flex pt-24 items-center gap-4">
                <motion.img
                    src={arrow}
                    onClick={handleReturn}
                    className="cursor-pointer w-5 h-5 hover:opacity-60 rotate-90 transition-opacity "
                    alt="back"
                />
                <h2 className="font-newsreader italic">video</h2>
            </div>
            <p className="mt-16">Video content here</p>
        </motion.div>
    );
};

export default VideoPage;