import React from 'react';
import { motion } from 'framer-motion';

const MobilePhotoGrid = ({ images, imageSizes = [] }) => {
    return (
        <div className="grid grid-cols-1 gap-6 px-10 max-w-[350px] mx-auto">
            {images.map((image, index) => {
                const { width, height } = imageSizes[index] || { width: 4, height: 3 }; // Default to 4:3

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: index * 0.02 }}
                        className="relative w-full"
                        style={{ aspectRatio: `${width} / ${height}` }}
                    >
                        <img
                            src={image}
                            alt={`art image ${index + 1}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </motion.div>
                );
            })}
        </div>
    );
};

export default MobilePhotoGrid;