import React, { useRef, useState } from 'react';
import { motion, useAnimation, AnimatePresence, animate, useScroll, useMotionValueEvent } from 'framer-motion';
import VideoBackground from './components/video-background/VideoBackground';
import ExhibitionCell from './components/ExhibitionCell';
import OutOfPlace from './components/OutOfPlace';
import SomaticAttunement from "@/components/SomaticAttunement.jsx";
import { exhibitions2 } from '@/data';
import Coordinates from "@/components/Coordinates.jsx";
import ResonateWithFragmentation from "@/components/ResonateWithFragmentation.jsx";
import AllureOfTheAbject from "@/components/AllureOfTheAbject.jsx";
import LimitedIntentionality from "@/components/LimitedIntentionality.jsx";
import WorkDisplay, {WorksGrid} from "@/components/NewWorksGrid.jsx";

const NewHome = () => {
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [activeSection, setActiveSection] = useState('exhibitions');
    const constraintsRef = useRef(null);
    const { scrollY } = useScroll();
    const [showFooter, setShowFooter] = useState(false);

    const exhibitionsData = exhibitions2.map(exhibition => ({
        title: exhibition.title,
        year: exhibition.date.split('.')[0],
        images: exhibition.images || []
    })).slice(0, 6); // Only take first 6 exhibitions

    useMotionValueEvent(scrollY, "change", (latest) => {
        setShowFooter(latest > 600);
    });

    const scrollToContent = () => {
        const viewportHeight = window.innerHeight;
        const targetY = viewportHeight - 130;

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

    const [emailCopied, setEmailCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('ediexxu@gmail.com')
            .then(() => {
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
            })
            .catch(err => console.error('Failed to copy email:', err));
    };

    const getExhibitionComponent = (exhibition) => {
        switch (exhibition.title) {
            case 'Out of place':
                return <OutOfPlace />;
            case 'Somatic Attunement':
                return <SomaticAttunement />;
            case 'N 39.984036 S 116.496563':
                return <Coordinates />;
            case 'Resonate w/ fragmentation':
                return <ResonateWithFragmentation />;
            case 'Allure Of The Abject':
                return <AllureOfTheAbject />;
            case 'limited intentionality':
                return <LimitedIntentionality />;
            default:
                return <OutOfPlace />;
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            <div className="fixed inset-0 w-full h-full">
                <VideoBackground />
                <div className="font-davinci text-white opacity-0 md:opacity-90 -tracking-2p text-[24px] fixed top-4 left-8">
                    edie xu
                </div>
            </div>

            <div className="h-[calc(100vh-132px)] w-full" />

            <div className="text-[1vw] lg:text-[10px] relative bg-white min-h-screen w-full">
                <div className="sticky top-0 z-50 bg-white">
                    <div className="text-center py-8 font-alte-haas font-bold">
                        <div className="mb-0">
                            <span onClick={() => handleNavClick('index')} className="mr-4 cursor-pointer hover:opacity-60">INDEX</span>
                            <span onClick={() => handleNavClick('contact')} className="mr-4 cursor-pointer hover:opacity-60">CONTACT</span>
                            <a
                                className="mr-4 cursor-pointer hover:opacity-60"
                                href="https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/assets/Edie+X+Resume-1.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                CV
                            </a>
                            <span onClick={handleCopyEmail} className="mr-4 cursor-pointer hover:opacity-60">
                                {emailCopied ? 'EMAIL COPIED :)' : 'EMAIL'}
                            </span>
                            <span onClick={() => handleNavClick('instagram')} className="mr-4 cursor-pointer hover:opacity-60">INSTAGRAM</span>
                            <span onClick={() => handleNavClick('instagram')} className="cursor-pointer hover:opacity-60">MORE</span>
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

                <AnimatePresence mode="wait">
                    {selectedExhibition ? (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="w-full px-8"
                        >
                            {getExhibitionComponent(selectedExhibition)}
                        </motion.div>
                    ) : activeSection === 'works' ? (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="w-full px-8"
                        >
                            <WorksGrid />
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="flex flex-col items-center px-8"
                        >
                            <div className="w-full overflow-hidden relative" ref={constraintsRef}>
                                <div className="flex min-w-full">
                                    <div className="grid grid-cols-6 gap-[4vw] w-full">
                                        {exhibitionsData.map((exhibition, index) => (
                                            <ExhibitionCell
                                                key={index}
                                                title={exhibition.title}
                                                year={exhibition.year}
                                                images={exhibition.images}
                                                onClick={() => handleExhibitionClick(exhibition)}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="h-[10vh]"/>

                            <motion.div
                                initial={{y: -10, opacity: 0}}
                                animate={{y: showFooter ? 0 : 0, opacity: showFooter ? 1 : 0}}
                                transition={{duration: 0.2}}
                                className="fixed bottom-2 left-0 w-full flex flex-col items-center font-bold text-[14px] p-4"
                            >
                                <div>EDIE XU</div>
                                <div className="text-center text-[11px] space-x-4 pt-2">
                                    <span>COPYRIGHT 2024</span>
                                    <span>@COMMON-DESIGN</span>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default NewHome;