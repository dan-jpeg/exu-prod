import React, { useState } from 'react';
import { motion } from 'framer-motion';
import StoreHoursVariant0 from "./StoreHoursVariant0.jsx";
import StoreHours1 from "./StoreHours.jsx";

const StoreHours = ({currentDay}) => {
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
                staggerChildren: 0.07
            }
        }
    };

    const itemVariants = {
        hidden: { y: -20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };

    return (
            <div className="max-w-lg min-w-[361px] md:min-w-[420px] w-full mx-auto bg-gray-100 p-8 rounded-3xl shadow-lg">
                <div className="flex flex-col items-start">
                    <h1 className="text-5xl font-bold pb-12 mb-8">Opening Hours</h1>

                    <div
                        className="flex w-[300px] h-[50px] place-content-between mb-6 bg-gray-300 pr-0  rounded-full relative">
                        <motion.div
                            layoutId="tab-background"
                            className="absolute bg-gray-800 rounded-full"
                            style={{
                                top: "-1px",
                                left: activeTab === 'regular' ? "0px" : "47%",
                                width: "calc(53%)",
                                height: "calc(100%)",
                                transition: "left 0.3s ease"
                            }}
                        />
                        <button
                            onClick={() => setActiveTab('regular')}
                            className={`relative  z-10 px-8 py-3  text-xs rounded-full transition-colors font-medium ${
                                activeTab === 'regular' ? 'text-white' : 'text-black hover:text-gray-700'
                            }`}
                        >
                            Regular Hours
                        </button>
                        <button
                            onClick={() => setActiveTab('holidays')}
                            className={`relative z-10 px-8  text-xs py-3 rounded-full transition-colors font-medium ${
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
                        {days.map((day) => (
                            <motion.div
                                key={day}
                                variants={itemVariants}
                                className="flex justify-between py-3 border-b border-dashed border-gray-700"
                            >
                                <div className="flex items-center relative">
                                    {day === currentDay && (
                                        <motion.div
                                            initial={{scale: 0}}
                                            animate={{scale: 1}}
                                            className="absolute -left-5 w-[10px] h-[10px] rounded-full bg-neutral-500"
                                        />
                                    )}
                                    <span className="font-medium">{day}</span>
                                </div>
                                <span className="text-gray-600">Closed</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        className="mt-6 text-gray-600 text-sm text-center"
                    >
                    Common Ground is closed for installation. We will re-open in the Spring of 2025. We hope to see
                        you then.
                    </motion.p>
                </div>
            </div>
    );
};



// Container component
const StoreHoursVariants = () => {

    const currentDay = new Date().toLocaleDateString('en-US', {weekday: 'long'});

    return (
        <div className="min-h-screen w-full bg-gray-50 p-4  md:p-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row  py-8 items-start gap-8">
                {/* Original Version */}
                <div className="flex-1 w-full">
                    <StoreHours currentDay={currentDay}/>
                </div>
                <div className="flex-1 w-full">
                    <StoreHours1 currentDay={currentDay}/>
                </div>

                <div className="flex-1 w-full">
                    <StoreHoursVariant0 currentDay={currentDay}/>
                </div>
            </div>
        </div>
    );
};

export default StoreHoursVariants;