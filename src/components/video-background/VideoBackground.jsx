import React, { useState, useRef, useEffect } from 'react';

const VideoBackground = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    // const videoUrl = "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/lp_video.mp4";
    const videoUrl = "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/lp-vid-qhd-webm.webm";

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Handle timeupdate event for progress
        const handleTimeUpdate = () => {
            console.log('Time update', video.currentTime, video.duration);
        };

        // Handle progress event
        const handleProgress = (e) => {
            console.log('Progress event:', e);
            console.log('Buffered ranges:', video.buffered.length);
            for(let i = 0; i < video.buffered.length; i++) {
                console.log(`Buffer ${i}: start ${video.buffered.start(i)}, end ${video.buffered.end(i)}`);
            }
        };

        // Handle loadeddata event
        const handleLoadedData = () => {
            console.log('Loaded data event');
        };

        // Handle canplaythrough event
        const handleCanPlayThrough = () => {
            console.log('Can play through event');
            setLoading(false);
        };

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('progress', handleProgress);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('canplaythrough', handleCanPlayThrough);

        return () => {
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('progress', handleProgress);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
        };
    }, []);

    return (
        <div className="fixed inset-0 -z-10 w-full h-full">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="w-32 h-32 flex flex-col items-center justify-center">
                        {/* Circular progress indicator */}

                        <div className="mt-4 text-sm text-white">
                            content loading...
                        </div>
                    </div>
                </div>
            )}
            <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
            >
                <source src={videoUrl} type="video/mp4" />
            </video>
        </div>
    );
};

export default VideoBackground;