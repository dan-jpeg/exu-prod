import React, { useState, useEffect } from 'react';
import {motion, AnimatePresence, useScroll} from 'framer-motion';
import WorksComponent from './WorksComponent';

const AppContainer = () => {
    const [expanding, setExpanding] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const animationConfig = {
        duration: 0.4,
        ease: [0.1, 0.1, 0.9, 0.9]
    };

    useEffect(() => {
        if (expanding) {
            // Enable scrolling when expanded
            document.body.style.overflow = 'auto';
        } else {
            // Disable scrolling when collapsed
            document.body.style.overflow = 'hidden';
        }

        // Cleanup
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [expanding]);


    return (
        <div className="fixed inset-0 overflow-none bg-white">
            {/* Top bar */}
            <motion.div
                className="flex justify-between items-center bg-white w-full px-8 py-4 z-20 fixed top-0 left-0 right-0"
                animate={{
                    y: expanding ? "calc(-100vh + 100%)" : 0
                }}
                transition={animationConfig}
            >
                <div className="w-32 flex justify-start">
                    <motion.div
                        onClick={() => setExpanding(!expanding)}
                        className="cursor-pointer"
                        whileHover={{opacity: 0.6}}
                    >
                        <span className="text-[17px] font-newsreader tracking-[-0.51px] text-black">
                            Menu
                        </span>
                    </motion.div>
                </div>
            </motion.div>

            {/* Content Panel */}
            <AnimatePresence mode="wait">
                {expanding && (
                    <motion.div
                        key="expanded-content"
                        initial={{ y: "100vh" }}
                        animate={{ y: 0 }}
                        exit={{ y: "100vh" }}
                        transition={animationConfig}
                        className="fixed inset-0 bg-white overflow-y-auto" // Added overflow-y-auto here
                    >
                        <div className="min-h-screen ">
                            <WorksComponent scrollYProgress={scrollYProgress} />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AppContainer;