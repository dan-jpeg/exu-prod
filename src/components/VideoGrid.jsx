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
        <div className="w-full  flex place-items-center justify-center pb-32">
            <AnimatePresence>
                {selectedVideo && (
                    <VideoPlayer
                        video={selectedVideo}
                        onClose={handleClose}
                    />
                )}
            </AnimatePresence>

            <div className="md:grid  text-[11px] flex flex-col md:grid-cols-1  gap-[2vw]">
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

