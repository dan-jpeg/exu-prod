import React, { useState } from 'react';
import { motion, animate, useScroll, useMotionValueEvent } from 'framer-motion';
import VideoBackground from './components/video-background/VideoBackground';
import ExhibitionCell from './components/ExhibitionCell';
import { exhibitions2 } from '@/data';
import OutOfPlace from './components/OutOfPlace';
import SomaticAttunement from "@/components/SomaticAttunement";
import Coordinates from "@/components/Coordinates";
import ResonateWithFragmentation from "@/components/ResonateWithFragmentation";
import AllureOfTheAbject from "@/components/AllureOfTheAbject";
import LimitedIntentionality from "@/components/LimitedIntentionality";
import { WorksGrid } from "@/components/NewWorksGrid";
import ExhibitionCellMobile from "@/ExhibitionCellMobile.jsx";

const NewHomeMobile = () => {
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [activeSection, setActiveSection] = useState('exhibitions');
    const { scrollY } = useScroll();

    const exhibitionsData = exhibitions2.map(exhibition => ({
        title: exhibition.title,
        year: exhibition.date.split('.')[0],
        images: exhibition.images || []
    }));



    const scrollToContent = () => {
        const viewportHeight = window.innerHeight;
        const targetY = viewportHeight - 100;

        animate(window.scrollY, targetY, {
            duration: 0.57,
            ease: [0.1, 0.1, 0.9, 0.9],
            onUpdate: (value) => window.scrollTo(0, value)
        });
    };

    const handleNavClick = (section) => {
        scrollToContent();

        if (section === 'index') {
            setSelectedExhibition(null);
            setActiveSection('exhibitions');
        } else if (section === 'exhibitions' || section === 'works') {
            setSelectedExhibition(null);
            setActiveSection(section);
        }
    };

    const handleExhibitionClick = (exhibition) => {
        setSelectedExhibition(exhibition);
    };

    const getExhibitionComponent = (exhibition) => {
        switch (exhibition.title) {
            case 'Out of place': return <OutOfPlace />;
            case 'Somatic Attunement': return <SomaticAttunement />;
            case 'N 39.984036 S 116.496563': return <Coordinates />;
            case 'Resonate with fragmentation': return <ResonateWithFragmentation />;
            case 'Allure Of The Abject': return <AllureOfTheAbject />;
            case 'limited intentionality': return <LimitedIntentionality />;
            default: return <OutOfPlace />;
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            {/* Video Background */}
            {/*<div className="fixed inset-0 w-full h-full">*/}
            {/*    <VideoBackground/>*/}
            {/*</div>*/}

            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 text-[9px] z-50 bg-none">
                <div className="text-center py-8 font-alte-haas font-bold">
                    <div className="mb-0">
                        <span onClick={() => handleNavClick('index')}
                              className="mr-3 cursor-pointer hover:opacity-60">INDEX</span>
                        <span onClick={() => handleNavClick('contact')}
                              className="mr-3 cursor-pointer hover:opacity-60">CONTACT</span>
                        <span onClick={() => handleNavClick('cv')}
                              className="mr-3 cursor-pointer hover:opacity-60">CV</span>
                        <span onClick={() => handleNavClick('email')}
                              className="mr-3 cursor-pointer hover:opacity-60">EMAIL</span>
                        <span onClick={() => handleNavClick('instagram')}
                              className="mr-3 cursor-pointer hover:opacity-60">INSTAGRAM</span>
                        <span onClick={() => handleNavClick('instagram')}
                              className="cursor-pointer hover:opacity-60">MORE</span>
                    </div>
                    <div className="">
                            <span
                                onClick={() => handleNavClick('exhibitions')}
                                className={`mr-4 cursor-pointer hover:opacity-60 ${activeSection === 'exhibitions' ? 'font-bold' : 'font-normal'}`}
                            >
                                Exhibitions
                            </span>
                        <span
                            onClick={() => handleNavClick('works')}
                            className={`mr-4 cursor-pointer hover:opacity-60 ${activeSection === 'works' ? 'font-bold' : 'font-normal'}`}
                        >
                                Works
                            </span>

                    </div>
                </div>
            </div>

            {/* Spacer for fixed header */}


            {/* Main Content */}
            <div className="text-sm relative bg-white min-h-screen w-full">
                {/* Content Area */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.3}}
                    className="px-4 pt-32 justify-center items-center"
                >
                    {selectedExhibition ? (
                        getExhibitionComponent(selectedExhibition)
                    ) : activeSection === 'works' ? (
                        <WorksGrid/>
                    ) : (
                        <div className="flex flex-col items-center space-y-8 pb-40">
                            {exhibitionsData.map((exhibition, index) => (
                                <ExhibitionCellMobile
                                    key={index}
                                    title={exhibition.title}
                                    year={exhibition.year}
                                    images={exhibition.images}
                                    onClick={() => handleExhibitionClick(exhibition)}
                                />
                            ))}
                        </div>
                    )}
                </motion.div>

                {/* Footer */}
                <motion.div

                    className="fixed bottom-1 text-[10px] left-0 w-full flex flex-col items-center font-bold p-2"
                >
                    <div className="text-">EDIE XU</div>
                    <div className="text-center space-x-4 pt-1">
                        <span>COPYRIGHT 2024</span>
                        <span>@COMMON-DESIGN</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NewHomeMobile;