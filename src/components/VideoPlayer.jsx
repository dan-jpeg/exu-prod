import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

const VideoPlayer = ({ video, onClose }) => {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef(null);

    const handlePlayPause = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="absolute uppercase bottom-12 left-0 w-full text-center font-alte-haas font-bold text-[11px]">
                <div className="mb-2 italic ">{video.title}</div>
                <div className="flex justify-center space-x-6">
                    <span>{video.year}</span>
                    <span>{video.duration}</span>
                </div>
            </div>

            <div className="relative w-4/5 max-w-4xl">
                <video
                    ref={videoRef}
                    src={video.videoUrl}
                    className="w-full h-auto"
                    controls
                    autoPlay
                    onClick={handlePlayPause}
                />
            </div>

            <button
                onClick={onClose}
                className="absolute top-6 right-6 font-alte-haas font-bold text-[12px]"
            >
                CLOSE
            </button>
        </motion.div>
    );
};

export default VideoPlayer;