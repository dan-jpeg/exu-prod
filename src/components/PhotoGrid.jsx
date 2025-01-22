import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PhotoGrid = ({ images, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (image) => {
        setSelectedImage(selectedImage === image ? null : image);
    };

    return (
        <div className="w-full space-y-4">
            {images?.map((image, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="relative w-full"
                >
                    <motion.img
                        src={image}
                        alt={`Exhibition image ${index + 1}`}
                        className="w-full h-auto object-cover cursor-pointer"
                        onClick={() => handleImageClick(image)}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                    />
                </motion.div>
            ))}

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            src={selectedImage}
                            alt="Full size"
                            className="max-h-screen max-w-full object-contain"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PhotoGrid;