import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { exhibitions2 } from "./data2.js";

const ExhibitionDetails = ({ exhibition }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className=" text-[10px] md:text-xs space-y-6 md:pl-0"
    >
        <div className=" space-y-4">
            <div className=" hidden md:flex items-baseline justify-between">
                <p className=" italic">{exhibition.title}</p>
                <p className="">{exhibition.location}</p>
            </div>
            <p className="hidden md:flex  ">{exhibition.date}</p>
            {exhibition.url && (
                <p className=" underline">
                    <a href={exhibition.url} target="_blank" rel="noopener noreferrer">
                        {exhibition.url}
                    </a>
                </p>
            )}
            {exhibition.header && (
                <p className="pt-4">
                    {exhibition.header}
                </p>
            )}
        </div>

        {exhibition.images?.[0] && (
            <div className="w-full relative my-8">
                <img
                    src={exhibition.images[0]}
                    alt={exhibition.title}
                    className="w-full h-auto object-cover"
                />
            </div>
        )}

        {exhibition.workIncluded?.length > 0 && (
            <div className="space-y-6 mt-8">
                {exhibition.workIncluded.map((work, index) => (
                    <div key={index} className="text-xs space-y-1">
                        <p className="italic">{work.title}, {work.year}</p>
                        <p>{work.dimensions}</p>
                        <p>{work.material}</p>
                        {work.description && (
                            <p className="mt-4">{work.description}</p>
                        )}
                    </div>
                ))}
            </div>
        )}

        {/*{exhibition.textContent && (*/}
        {/*    <div className="text-xs leading-relaxed whitespace-pre-line mt-8">*/}
        {/*        {exhibition.textContent}*/}
        {/*    </div>*/}
        {/*)}*/}
    </motion.div>
);

const ExhibitionsIndex = ({ handleReturn }) => {
    const [selectedExhibition, setSelectedExhibition] = useState(null);

    const selectExhibition = (exhibitionId) => {
        const exhibition = exhibitionId
            ? exhibitions2.find(e => e.id === exhibitionId)
            : null;
        setSelectedExhibition(exhibition);
    };

    return (
        <motion.div
            className="pt-20 mx-8 bg-white text-neutral-800 min-h-screen"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 20}}
            transition={{duration: 0.2}}
        >

            <div className="md:grid md:grid-cols-5 md:gap-16">
                {/* Left Column - Exhibition List with Inline Details on Mobile */}
                <div className=" md:col-span-2 space-y-8">
                    {exhibitions2.map((exhibition) => (
                        <div key={exhibition.id}>
                            <div
                                className={`transition-opacity duration-300 ${
                                    selectedExhibition && selectedExhibition.id !== exhibition.id
                                        ? 'opacity-30'
                                        : 'opacity-100'
                                }`}
                            >
                                <div
                                    className="space-y-1 cursor-pointer hover:underline"
                                    onClick={() => selectExhibition(
                                        selectedExhibition?.id === exhibition.id ? null : exhibition.id
                                    )}
                                >
                                    <div className="flex space-y-1 items-baseline md:flex-col justify-between">
                                        <p className="text-[10px] italic">{exhibition.title}</p>
                                        <p className="text-[10px]">{exhibition.location}</p>
                                        <p className="text-[10px]">{exhibition.date}</p>
                                    </div>

                                </div>
                            </div>

                            {/* Mobile Details */}
                            <div className="md:hidden">
                                <AnimatePresence mode="wait">
                                    {selectedExhibition?.id === exhibition.id && (
                                        <ExhibitionDetails exhibition={selectedExhibition}/>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Right Column - Selected Exhibition Details */}
                <div className="hidden md:col-span-3 md:block mt-8 md:mt-0">
                    <AnimatePresence mode="wait">
                        {selectedExhibition && <ExhibitionDetails exhibition={selectedExhibition}/>}
                    </AnimatePresence>
                </div>


            </div>
            {/*<motion.div className="fixed bottom-2 w-screen">*/}
            {/*    <div className="flex flex-row w-full justify-center items-center">*/}
            {/*        <span> EXHIBITION DATE</span>*/}
            {/*        <span> EXHIBITION TITLE</span>*/}
            {/*        <span> EXHIBITION LOCATION </span>*/}
            {/*    </div>*/}
            {/*</motion.div>*/}
        </motion.div>
    );
};

export default ExhibitionsIndex;