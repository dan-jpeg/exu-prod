import React, { useState, useRef, useEffect } from 'react';

const VideoBackground = ({ onLoadingChange }) => {
    const [loading, setLoading] = useState(true);
    const videoRef = useRef(null);

    const videoUrlMp4 = "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/lp_video-safari-hd.mp4";
    const videoUrlWebM = "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/lp-vid-qhd-webm.webm";

    // Helper function to check if the browser supports WebM
    const supportsWebM = () => {
        const video = document.createElement("video");
        return video.canPlayType('video/webm; codecs="vp8, vorbis"') || video.canPlayType('video/webm; codecs="vp9"');
    };

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleCanPlayThrough = () => {
            setLoading(false);
            onLoadingChange?.(false); // Notify parent component
        };

        const handleLoadStart = () => {
            setLoading(true);
            onLoadingChange?.(true); // Notify parent component
        };

        const handleError = (error) => {
            console.error('Video loading error:', error);
            setLoading(false);
            onLoadingChange?.(false);
        };

        video.addEventListener("canplaythrough", handleCanPlayThrough);
        video.addEventListener("loadstart", handleLoadStart);
        video.addEventListener("error", handleError);

        return () => {
            video.removeEventListener("canplaythrough", handleCanPlayThrough);
            video.removeEventListener("loadstart", handleLoadStart);
            video.removeEventListener("error", handleError);
        };
    }, [onLoadingChange]);

    return (
        <div className="fixed inset-0 -z-10 w-full h-full">
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                    <div className="w-32 h-32 flex flex-col items-center justify-center">
                        <div className="mt-4 text-sm text-white">content loading...</div>
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
                {supportsWebM() ? (
                    <source src={videoUrlWebM} type="video/webm" />
                ) : (
                    <source src={videoUrlMp4} type="video/mp4" />
                )}
            </video>
        </div>
    );
};

export default VideoBackground;