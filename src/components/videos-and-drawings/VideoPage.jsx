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

// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import arrow from "@/assets/arrow1.svg";
// import { videos } from '@/data.js';
//
//
//
// // Video Display Component
// const DisplayedVideo = ({ video }) => {
//     if (!video) return null;
//
//     return (
//         <div className="w-full">
//             <div className="text-center">
//                 <h2 className="font-newsreader italic pt-[39vh] text-sm pb-4">{video.title}</h2>
//                 <div className="text-xs font-newsreader">
//                     <p>{video.year}</p>
//                     <p>{video.duration}</p>
//                 </div>
//             </div>
//
//             <div className="pt-12 md:pt-[70vh] w-full flex items-center justify-center pr-2.5">
//                 {video.videoUrl ? (
//                     <video
//                         className="w-[95%] h-auto"
//                         playsInline
//                         autoPlay
//                         src={video.videoUrl}
//                     />
//                 ) : (
//                     <div className="text-center">
//                         <p>Video not available</p>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };
//
// // Thumbnail Grid Component
// const VideoThumbnails = ({ videos, onSelectVideo, selectedVideo }) => {
//     return (
//         <div className="grid grid-cols-2 md:grid-cols-3 gap-8 px-8 pt-16">
//             {videos.map((video) => (
//                 <div
//                     key={video.id}
//                     onClick={() => onSelectVideo(video)}
//                     className={`cursor-pointer transition-opacity duration-200 ${
//                         selectedVideo?.id === video.id ? 'opacity-100' : 'opacity-70'
//                     } hover:opacity-100`}
//                 >
//                     <div className="relative w-full pb-[75%] mb-4">
//                         <img
//                             src={video.thumbnail}
//                             alt={video.title}
//                             className="absolute inset-0 w-full h-full object-contain bg-neutral-100"
//                         />
//                     </div>
//                     <div className="mt-2">
//                         <p className="font-newsreader italic text-sm">{video.title}</p>
//                         <p className="text-xs">{video.year}</p>
//                         <p className="text-xs">{video.duration}</p>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };
//
// // Main Video Page Component
// const VideoPage = ({ handleReturn }) => {
//     const [selectedVideo, setSelectedVideo] = useState(null);
//
//     const handleVideoSelect = (video) => {
//         setSelectedVideo(video);
//         // Smooth scroll to top when selecting a video
//         window.scrollTo({ top: 0, behavior: 'smooth' });
//     };
//
//     return (
//         <motion.div
//             initial={{ opacity: 0, x: "7%" }}
//             animate={{ opacity: 1, x: 0 }}
//             exit={{ opacity: 0, x: "7%" }}
//             transition={{ duration: 0.16 }}
//             className="absolute inset-0 bg-white min-h-screen"
//         >
//             <div className="flex pt-24 items-center gap-4 px-8">
//                 <motion.img
//                     src={arrow}
//                     onClick={handleReturn}
//                     className="cursor-pointer w-5 h-5 hover:opacity-60 rotate-90 transition-opacity"
//                     alt="back"
//                 />
//                 <h2 className="font-newsreader italic">performance</h2>
//             </div>
//
//             {selectedVideo ? (
//                 <DisplayedVideo video={selectedVideo} />
//             ) : (
//                 <VideoThumbnails
//                     videos={videos}
//                     onSelectVideo={handleVideoSelect}
//                     selectedVideo={selectedVideo}
//
//                 />
//             )}
//         </motion.div>
//     );
// };
//
// export default VideoPage;