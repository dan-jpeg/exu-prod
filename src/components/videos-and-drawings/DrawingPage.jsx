import React from 'react';
import { motion } from 'framer-motion';
import arrow from "@/assets/arrow1.svg"


const DrawingPage = ({handleReturn}) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: "5%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "5%" }}
            transition={{ duration: 0.16 }}
            className="absolute inset-0 top-0 min-h-screen bg-white p-8"
        >
            <div className="flex items-center mb-16">
                <motion.img
                    src={arrow}
                    onClick={handleReturn}
                    className="cursor-pointer w-5 h-5 hover:opacity-60  rotate-90"
                    alt="back"
                />
                <h2 className="font-newsreader italic">drawing</h2>
            </div>
            <p>Drawing content here</p>
        </motion.div>
    );
};

export default DrawingPage;