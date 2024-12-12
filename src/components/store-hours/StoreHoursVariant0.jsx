import React, { useState } from 'react';
import { motion } from 'framer-motion';

const StoreHoursVariant0 = ({currentDay}) => {
    const [activeTab, setActiveTab] = useState('regular');

    const days = [
        'Monday', 'Tuesday', 'Wednesday', 'Thursday',
        'Friday', 'Saturday', 'Sunday'
    ];

    const listVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1
        }
    };

    return (
            <div className="max-w-lg w-full mx-auto bg-gray-100 p-8 rounded-3xl shadow-lg">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-bold mb-8">Opening Hours</h1>

                    <div className="flex mb-6 bg-gray-200 p-1 rounded-full relative">
                        <motion.div
                            layoutId="tab-background"
                            className="absolute bg-gray-800 rounded-full"
                            style={{
                                top: "4px",
                                left: activeTab === 'regular' ? "4px" : "50%",
                                width: "calc(50% - 8px)",
                                height: "calc(100% - 8px)",
                                transition: "left 0.3s ease"
                            }}
                        />
                        <button
                            onClick={() => setActiveTab('regular')}
                            className={`relative z-10 px-8 py-3 rounded-full transition-colors font-medium ${
                                activeTab === 'regular' ? 'text-white' : 'text-black hover:text-gray-700'
                            }`}
                        >
                            Regular Hours
                        </button>
                        <button
                            onClick={() => setActiveTab('holidays')}
                            className={`relative z-10 px-8 py-3 rounded-full transition-colors font-medium ${
                                activeTab === 'holidays' ? 'text-white' : 'text-black hover:text-gray-700'
                            }`}
                        >
                            Holiday Hours
                        </button>
                    </div>

                    <motion.div
                        variants={listVariants}
                        initial="hidden"
                        animate="visible"
                        key={activeTab}
                        className="w-full"
                    >
                        {days.map((day, index) => (
                            <motion.div
                                key={day}
                                variants={itemVariants}
                                className="flex justify-between py-3 border-b border-dashed border-gray-300 last:border-none"
                            >
                                <span className="font-medium">{day}</span>
                                <span className="text-gray-600">Closed</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 text-gray-600 text-sm text-center"
                    >
                        The Power Plant is currently closed for installation. We will
                        reopen on June 22 with new Summer 2023 exhibitions.
                    </motion.p>
                </div>
            </div>

    );
};

export default StoreHoursVariant0;