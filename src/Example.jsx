import { motion, useTransform, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { selectedWorks } from './data.js';

const ProjectCarousel = ({ activeWork }) => {
    if (!activeWork) return null;

    return (
        <div className="bg-neutral-300">
            <div className="flex h-24 items-center justify-center">
                <span className="font-sans italic text-neutral-500">
                    Scroll to view
                </span>
            </div>
            <HorizontalScrollCarousel activeWork={activeWork} />
        </div>
    );
};

const HorizontalScrollCarousel = ({ activeWork }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const images = activeWork?.media?.filter(item => item.type === 'image') || [];
    // Calculate total scroll based on number of images
    const scrollDistance = -(images.length - 1) * 100;
    const x = useTransform(scrollYProgress, [0, 1], ["0%", `${scrollDistance}%`]);

    return (
        <section ref={targetRef} className="relative h-[300vh] bg-neutral-300">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div
                    style={{ x }}
                    className="flex"
                >
                    {images.map((image, index) => (
                        <Card
                            key={index}
                            imageUrl={image.url}
                            title={activeWork.title}
                            index={index + 1}
                            total={images.length}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Card = ({ imageUrl, title, index, total }) => {
    return (
        <div className="relative h-screen w-screen flex-shrink-0 bg-neutral-300">
            <div className="h-full w-full flex items-center justify-center px-8">
                <img
                    src={imageUrl}
                    alt={`${title} - ${index}`}
                    className="max-h-[80vh] object-contain"
                />
            </div>
            <div className="absolute bottom-24 right-8 font-newsreader text-sm text-neutral-400">
                {index} / {total}
            </div>
        </div>
    );
};

const WorkIndexContent = ({ setPage }) => {
    const [activeWork, setActiveWork] = useState(null);
    const [moreExpanded, setMoreExpanded] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-5%" }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white"
        >
            <div className="px-8 font-newsreader">
                <h2 className="text-base italic mb-16">work</h2>
                <p className="text-right font-newsreader text-[17px] md:text-[24px] md:pl-[21vw] tracking-[-0.51px]">
                    {selectedWorks.map((work, index) => (
                        <span
                            key={work.id}
                            className={`cursor-pointer transition-opacity hover:opacity-25 
                                ${activeWork?.id === work.id ? 'opacity-100' : ''}`}
                            onClick={() => setActiveWork(work)}
                        >
                            ({String(index + 1).padStart(2, '0')}) {work.title}
                            {index < selectedWorks.length - 1 ? ' ' : ''}
                        </span>
                    ))}
                </p>
            </div>

            <div
                onMouseEnter={() => setMoreExpanded(true)}
                onMouseLeave={() => setMoreExpanded(false)}
                className="relative z-10"
            >
                <p className="text-right px-8 pt-6 pb-0 mb-0 font-newsreader text-[17px] cursor-s-resize md:text-[24px] md:pl-[21vw] tracking-[-0.51px]">
                    {moreExpanded ? "-" : "+"} More
                </p>
                <ul className={`text-right px-8 font-newsreader text-[17px] md:text-[24px] md:pl-[21vw] tracking-[-0.51px] leading-tight transition-opacity duration-200 
                    ${moreExpanded ? 'opacity-100' : 'opacity-0'}`}
                >
                    <li className="hover:opacity-25 cursor-pointer" onClick={() => setPage(2)}>
                        Video
                    </li>
                    <li className="hover:opacity-25 cursor-pointer" onClick={() => setPage(3)}>
                        Drawing
                    </li>
                </ul>
            </div>

            <div className="flex flex-col items-center">
                <div className="w-full">
                    <ProjectCarousel activeWork={activeWork} />
                </div>
                {activeWork && (
                    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 space-x-4 font-newsreader flex flex-row text-[12px] italic tracking-[-0.42px]">
                        <p className="italic">{activeWork.title}</p>
                        <p>{activeWork.material}</p>
                        <p>{activeWork.dimensions}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default WorkIndexContent;