import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { videos } from '@/data';

const VideoCellMobile = ({ title, year, duration, thumbnail, onClick }) => {
    return (
        <div
            className="w-full mb-8 cursor-pointer"
            onClick={onClick}
        >
            <div className="overflow-hidden rounded-sm">
                <motion.img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-auto object-cover transition-all duration-500"
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    draggable="false"
                />
            </div>
            <div className="flex justify-between items-start mt-2 px-1 font-alte-haas text-[11px]">
                <div className="font-bold">
                    {title}
                </div>
                <div className="flex gap-2">
                    <span>{year}</span>
                    <span>{duration}</span>
                </div>
            </div>
        </div>
    );
};

const VideoPlayerMobile = ({ video, onClose }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <div className="absolute top-5 left-0 w-full text-center font-alte-haas font-bold text-[12px]">
                <div className="mb-1">{video.title}</div>
                <div className="flex justify-center space-x-4 text-[10px]">
                    <span>{video.year}</span>
                    <span>{video.duration}</span>
                </div>
            </div>

            <div className="relative w-[92%] mt-16">
                <video
                    src={video.videoUrl}
                    className="w-full h-auto"
                    controls
                    autoPlay
                    playsInline
                />
            </div>

            <button
                onClick={onClose}
                className="absolute top-4 right-4 font-alte-haas font-bold text-[10px]"
            >
                CLOSE
            </button>
        </motion.div>
    );
};

const VideosGridMobile = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleClose = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="w-full pt-2 pb-20">
            <AnimatePresence>
                {selectedVideo && (
                    <VideoPlayerMobile
                        video={selectedVideo}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>

            <div className="flex flex-col">
                {videos.map((video) => (
                    <VideoCellMobile
                        key={video.id}
                        title={video.title}
                        year={video.year}
                        duration={video.duration}
                        thumbnail={video.thumbnail}
                        onClick={() => handleVideoClick(video)}
                    />
                ))}
            </div>
        </div>
    );
};

export default VideosGridMobile;
