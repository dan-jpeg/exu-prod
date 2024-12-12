import React, { useState } from 'react';
import { motion } from 'framer-motion';


const StoreHours1 = ({currentDay}) => {

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
            <div className="max-w-lg w-full mx-auto bg-gray-100 p-8 rounded-3xl min-w-[360px] md:min-w-[420px] shadow-lg">
                <div className="flex flex-col items-start">
                    <h1 className="text-5xl font-bold pb-12 mb-8">Opening Hours</h1>

                    <div className="flex w-full place-content-evenly mb-6 bg-gray-300 p-1 rounded-full relative">
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
                                className="flex justify-between py-3 border-b border-dashed border-gray-700 "
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
                       Common Ground is closed for installation. We will re-open in the Spring of 2025. We hope to see you then.
                    </motion.p>
                </div>
            </div>
    );
};

export default StoreHours1;

// import React from 'react';
// import SplitLayout from "./components/mockup/SplitLayout.jsx";
//
//
// function App(){
//     return (
//         <div className="flex justify-center items-center w-full">
//             <SplitLayout />
//         </div>
//     )
// }

// import React from 'react';
// import StoreHours from "./components/store-hours/StoreHours.jsx";
// import StoreHoursVariantsContainer from "./components/store-hours/StoreHoursVariantsContainer.jsx";
//
// function App() {
//     return (
//         <div className="App">
//             <StoreHoursVariantsContainer />
//         </div>
//     )
// }
//
