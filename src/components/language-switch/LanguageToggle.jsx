import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LanguageSwitcher = ({ expanding, className, color }) => {
    const [currentLanguage, setCurrentLanguage] = useState('cn');
    const [isHovered, setIsHovered] = useState(false);

    const handleLanguageChange = () => {
        setCurrentLanguage(currentLanguage === 'en' ? 'cn' : 'en');
    };

    // Hover animation variants
    // const hoverVariants = {
    //     initial: {
    //         scale: 1,
    //         opacity: 1,
    //     },
    //     hover: {
    //         scale: 1.1,
    //         transition: {
    //             duration: 0.2,
    //             ease: 'easeInOut',
    //         },
    //     },
    // };

    // Shared motion props
    const sharedMotionProps = {
        initial: 'initial',
        animate: isHovered ? 'hover' : 'initial',
        whileHover: 'hover',
        onHoverStart: () => setIsHovered(true),
        onHoverEnd: () => setIsHovered(false),
    };

    return (
        <AnimatePresence>
            <motion.div
                onClick={handleLanguageChange}
                className={`flex items-center gap-1 cursor-pointer ${className}`}
                initial={{ opacity: 0, y: expanding ? -10 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: expanding ? -10 : 10 }}
                transition={{
                    duration: 0.8,
                    delay: 0.8,
                    ease: [0.1, 0.1, 0.9, 0.9],
                }}
                {...sharedMotionProps}
            >
                <motion.span className={`flex items-center ${color}  gap-1 font-alte text-[14x]`}>
                    <span
                        className={`${
                            currentLanguage === 'en' ? 'underline opacity-100' : 'opacity-50'
                        }`}
                    >
                        EN
                    </span>
                    <span>/</span>
                    <span
                        className={`${
                            currentLanguage === 'cn' ? 'underline opacity-100' : 'opacity-50'
                        }`}
                    >
                        中文
                    </span>
                </motion.span>
            </motion.div>
        </AnimatePresence>
    );
};

export default LanguageSwitcher;