import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import arrow from "@/assets/arrow1.svg"
import OfficeMenu from "../components/office-menu/OfficeMenu.jsx";

const WorksNavBar = ({
                         expanding,
                         handleReturn,
                         arrowAnimationConfig,
                         activeView,
                         setActiveView,
                         page,
                         setPage,
                         setMenuOpen
                     }) => {
    const [hamburgerOpen, setHamburgerOpen] = useState(false);

    const handleNavigate = (view) => {
        setActiveView(view);

        if (expanding) {
            handleReturn();
        }

        setHamburgerOpen(false);
    };

    const handleWorksClick = () => {
        if (!expanding) {
            setActiveView('works');
        } else {
            handleNavigate('works');
        }

        if (page === 'drawing' || page === 'video') {
            setPage('main');
        }
    };

    return (
        <>
            {/* Mobile Navigation */}
            <div className="md:hidden flex justify-between items-center bg-white w-full px-8 py-4 z-20 fixed top-0">
              <OfficeMenu handleReturn={handleReturn} expanding={expanding}/>

                <div className="w-6 flex max-w-md justify-center">
                    <motion.img
                        src={arrow}
                        onClick={handleReturn}
                        className="cursor-pointer w-5 h-5 hover:opacity-60 transition-opacity"
                        animate={{
                            rotate: expanding ? 180 : 0,
                        }}
                        transition={arrowAnimationConfig}
                        alt="return"
                    />
                </div>

                <button
                    onClick={() => setHamburgerOpen(!hamburgerOpen)}
                    className="text-black focus:outline-none"
                >
                    {hamburgerOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {hamburgerOpen && (
                    <motion.div
                        className={`absolute ${!expanding ? 'top-16 z-30' : '-top-[150px]'} left-0 right-0 bg-neutral-100 z-30 border-t border-neutral-100`}
                        initial={{y: expanding ? "50%" : "-50%", opacity: 0}}
                        animate={{y: 0, opacity: 1}}
                        exit={{y: expanding ? "50%" : "-50%", opacity: 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                    >
                        <div className="flex flex-col items-end gap-0 p-8 pb-10">
                            <button
                                className="text-custom  hover:opacity-60"
                                onClick={() => handleNavigate('works')}
                            >
                                Works
                            </button>
                            <button
                                className="text-custom  hover:opacity-60"
                                onClick={() => handleNavigate('exhibitions')}
                            >
                                Exhibitions
                            </button>
                            <button
                                className="text-custom  hover:opacity-60"
                                onClick={() => {
                                    setPage('video');
                                    setHamburgerOpen(false);
                                }}
                            >
                                Performance
                            </button>
                            <button
                                className="text-custom  hover:opacity-60"
                                onClick={() => {
                                    setPage('drawing');
                                    setHamburgerOpen(false);
                                }}
                            >
                                Paper
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Navigation */}
            <div className="hidden md:flex justify-between items-center bg-white w-full px-8 py-4 z-10 fixed -top-1">
                <div className="w-32 flex justify-start">
                    <motion.div
                        className="cursor-pointer"
                        whileHover={{opacity: 0.6}}
                        onClick={!expanding ? () => setActiveView('exhibitions') : () => handleNavigate('exhibitions')}
                    >
                        <span
                            className={`text-custom text-black ${activeView === 'exhibitions' ? 'underline underline-offset-4' : ''}`}>
                            Exhibitions
                        </span>
                    </motion.div>
                </div>

                <div className="w-6 flex max-w-md justify-center">
                    <motion.img
                        src={arrow}
                        onClick={handleReturn}
                        className="cursor-pointer w-5 h-5 hover:opacity-60 transition-opacity"
                        animate={{
                            rotate: expanding ? 180 : 0,
                        }}
                        transition={arrowAnimationConfig}
                        alt="return"
                    />
                </div>

                <div className="w-32 flex justify-end">
                    <motion.div
                        className="cursor-pointer"
                        whileHover={{opacity: 0.6}}
                        onClick={handleWorksClick}
                    >
                        <span
                            className={`text-custom text-black ${activeView === 'works' ? 'underline underline-offset-4' : ''}`}>
                            Works
                        </span>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default WorksNavBar;