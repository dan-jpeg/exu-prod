import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher = ({ expanding }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');
    const [isHovered, setIsHovered] = useState(false);

    const handleLanguageChange = () => {
        setCurrentLanguage(currentLanguage === "en" ? "cn" : "en");
    };

    // Hover animation variants
    const hoverVariants = {
        initial: {
            scale: 1,
            opacity: expanding ? 0.2 : 0.3
        },
        hover: {
            scale: 1.1,
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        }
    };

    // Shared props for both expanding and non-expanding states
    const sharedMotionProps = {
        variants: hoverVariants,
        initial: "initial",
        animate: isHovered ? "hover" : "initial",
        whileHover: "hover",
        onHoverStart: () => setIsHovered(true),
        onHoverEnd: () => setIsHovered(false)
    };

    return (
        <>
            <AnimatePresence>
                {expanding && (
                    <motion.div
                        onClick={handleLanguageChange}
                        className="fixed right-8 z-50 font-newsreader tracking-[-0.51px] cursor-pointer text-[12px] text-white"
                        style={{ top: 'calc(-92vh + 1rem)' }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 0.2, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.8,
                            ease: [0.1, 0.1, 0.9, 0.9]
                        }}
                        {...sharedMotionProps}
                    >
                        <motion.span>
                            {currentLanguage === 'en' ? (
                                <span className="text-[12px] transform -translate-y-2">en</span>
                            ) : (
                                <span>中文</span>
                            )}
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {!expanding && (
                    <motion.div
                        className="fixed right-8 bottom-2 z-50 font-newsreader tracking-[-0.51px] cursor-pointer text-[12px] text-black"
                        onClick={handleLanguageChange}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 0.3, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.8,
                            ease: [0.1, 0.1, 0.9, 0.9]
                        }}
                        {...sharedMotionProps}
                    >
                        <motion.span>
                            {currentLanguage === 'en' ? (
                                <span className="text-[12px] transform -translate-y-2">en</span>
                            ) : (
                                <span>中文</span>
                            )}
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default LanguageSwitcher;