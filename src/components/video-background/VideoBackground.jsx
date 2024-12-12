import React from 'react';

const VideoBackground = () => {
    return (
        <div className="min-h-screen w-full relative flex flex-col">
            <video
                className="absolute inset-0 w-full h-full object-contain"
                autoPlay
                muted
                loop
                playsInline
                src="https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/lp_video.mp4"
            />
        </div>
    );
};

export default VideoBackground;

