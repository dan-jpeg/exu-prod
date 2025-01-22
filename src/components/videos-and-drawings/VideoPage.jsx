// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import arrow from "@/assets/arrow1.svg";
// import { videos } from '@/data.js';
//
// const VideoPage = ({ handleReturn, setPage }) => {
//     const [selectedVideo, setSelectedVideo] = useState(null);
//     const [hoveredVideo, setHoveredVideo] = useState(null);
//
//     return (
//         <div className="min-h-screen bg-white">
//             {/* Main content */}
//             <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//             >
//                 <div className="mx-[30px]">
//                     {/* Layout Grid */}
//                     <div className="grid md:grid-cols-12 gap-x-1">
//                         {/* Back arrow and title */}
//                         <div className="col-span-2 mt-16">
//                                 <motion.img
//                                     src={arrow}
//                                     onClick={handleReturn}
//                                     className="cursor-pointer w-5 h-5 hover:opacity-60 rotate-90"
//                                     alt="back"
//                                 />
//
//                         </div>
//
//                         {/* Empty columns for spacing */}
//                         <div className="col-span-10"></div>
//
//                         {/* Video Grid - starts at column 4 */}
//                         {videos.map((video, index) => (
//                             <motion.div
//                                 key={video.id}
//                                 className="col-span-2 h-[145px] relative cursor-pointer"
//                                 style={{
//                                     gridColumn: `${4 + ((index % 3) * 2)} / span 2`,
//                                     gridRow: index < 3 ? 1 : 2,
//                                     marginTop: index < 3 ? '242px' : '4px'
//                                 }}
//                                 onHoverStart={() => setHoveredVideo(video.id)}
//                                 onHoverEnd={() => setHoveredVideo(null)}
//                                 onClick={() => setSelectedVideo(video)}
//                             >
//                                 <img
//                                     src={video.thumbnail}
//                                     alt={video.title}
//                                     className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
//                                 />
//                                 {hoveredVideo === video.id && (
//                                     <motion.div
//                                         initial={{ opacity: 0 }}
//                                         animate={{ opacity: 1 }}
//                                         exit={{ opacity: 0 }}
//                                         className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20"
//                                     >
//                                         <div className="text-black text-sm space-y-1 text-center">
//                                             <p className="font-newsreader italic">{video.title}</p>
//                                             <p className="font-alte-haas">{video.year}</p>
//                                             <p className="font-alte-haas">{video.duration}</p>
//                                         </div>
//                                     </motion.div>
//                                 )}
//                             </motion.div>
//                         ))}
//
//                         {/* Navigation Elements - positioned at the end of grid */}
//                         <div className="row-start-1 col-start-11 col-span-1 text-right grid place-items-end" style={{ marginTop: '242px' }}>
//                             <span
//                                 onClick={() => setPage('drawing')}
//                                 className="text-custom-bold hover:opacity-50   transition-opacity cursor-pointer"
//                             >
//                                 Performance
//                             </span>
//                         </div>
//                         <div className="row-start-1 col-start-12 col-span-1  text-right grid place-items-end" style={{ marginTop: '242px' }}>
//                             <span className="text-custom opacity-50 hover:opacity-90 hover:underline   cursor-pointer transition-opacity">
//                                 Paper
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </motion.div>
//
//             {/* Video player modal */}
//             {selectedVideo && (
//                 <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
//                 >
//                     <button
//                         onClick={() => setSelectedVideo(null)}
//                         className="absolute top-8 right-8 text-white hover:opacity-70"
//                     >
//                         Close
//                     </button>
//                     <video
//                         controls
//                         autoPlay
//                         className="max-w-[90vw] max-h-[90vh]"
//                         src={selectedVideo.videoUrl}
//                     />
//                 </motion.div>
//             )}
//         </div>
//     );
// };
//
// export default VideoPage;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import arrow from "@/assets/arrow1.svg";
import { videos } from '@/data.js';

const VideoPage = ({ handleReturn, setPage }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [hoveredVideo, setHoveredVideo] = useState(null);

    return (
        <div className="min-h-screen bg-white">
            {/* Main content */}
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
            >
                <div className="mx-[30px]">
                    {/* Layout Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-x-1">
                        {/* Back arrow */}
                        <div className="col-span-2 mt-16">
                            <motion.img
                                src={arrow}
                                onClick={handleReturn}
                                className="cursor-pointer w-5 h-5 hover:opacity-60 rotate-90"
                                alt="back"
                            />
                        </div>

                        {/* Empty columns for spacing */}
                        <div className="col-span-10"></div>

                        {/* Video Grid */}
                        <div
                            className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 md:col-start-4 lg:col-start-4 gap-4 mt-[242px] mx-auto">
                            {videos.map((video) => (
                                <motion.div
                                    key={video.id}
                                    className="relative cursor-pointer h-[145px] col-span-1 md:col-span-2"
                                    onHoverStart={() => setHoveredVideo(video.id)}
                                    onHoverEnd={() => setHoveredVideo(null)}
                                    onClick={() => setSelectedVideo(video)}
                                >
                                    <img
                                        src={video.thumbnail}
                                        alt={video.title}
                                        className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity duration-300"
                                    />
                                    {hoveredVideo === video.id && (
                                        <motion.div
                                            initial={{opacity: 0}}
                                            animate={{opacity: 1}}
                                            exit={{opacity: 0}}
                                            className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-20"
                                        >
                                            <div className="text-black text-sm space-y-1 text-center">
                                                <p className="font-newsreader italic">{video.title}</p>
                                                <p className="font-alte-haas">{video.year}</p>
                                                <p className="font-alte-haas">{video.duration}</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Navigation */}
                        <div className="row-start-1 col-start-11 col-span-1 text-right grid place-items-end"
                             style={{marginTop: '242px'}}>
        <span
            onClick={() => setPage('drawing')}
            className="text-custom-bold hover:opacity-50 transition-opacity cursor-pointer"
        >
            Performance
        </span>
                        </div>
                        <div className="row-start-1 col-start-12 col-span-1 text-right grid place-items-end"
                             style={{marginTop: '242px'}}>
        <span
            className="text-custom opacity-50 hover:opacity-90 hover:underline hover:underline-offset-4 cursor-pointer transition-opacity">
            Paper
        </span>
                        </div>
                    </div>
                </div>

</motion.div>

    {/* Video player modal */
    }
    {
        selectedVideo && (
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            >
                <button
                    onClick={() => setSelectedVideo(null)}
                    className="absolute top-8 right-8 text-white hover:opacity-70"
                >
                    Close
                </button>
                <video
                    controls
                    autoPlay
                    className="max-w-[90vw] max-h-[90vh]"
                    src={selectedVideo.videoUrl}
                />
            </motion.div>
        )
    }
</div>
)
    ;
};

export default VideoPage;