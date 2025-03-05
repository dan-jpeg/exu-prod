import React, {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import VideoCell from './VideoCell';
import VideoPlayer from './VideoPlayer';
import {videos} from '@/data';
import ExhibitionCell from "@/components/ExhibitionCell.jsx";

const VideoGrid = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };

    const handleClose = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="w-full mt-12 pb-32">
            <AnimatePresence>
                {selectedVideo && (
                    <VideoPlayer
                        video={selectedVideo}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>

            <div className="grid grid-cols-6 gap-[4vw]">
                {videos.map((video) => (
                    <VideoCell
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

export default VideoGrid;

