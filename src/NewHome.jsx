import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import VideoBackground from './components/video-background/VideoBackground';
import ExhibitionCell from './components/ExhibitionCell';
import OutOfPlace from './components/OutOfPlace';
import SomaticAttunement from "@/components/SomaticAttunement.jsx";
import { exhibitions2 } from '@/data';
import Coordinates from "@/components/Coordinates.jsx";
import ResonateWithFragmentation from "@/components/ResonateWithFragmentation.jsx";
import AllureOfTheAbject from "@/components/AllureOfTheAbject.jsx";
import LimitedIntentionality from "@/components/LimitedIntentionality.jsx";
import { WorksGrid } from "@/components/NewWorksGrid.jsx";
import VideoGrid from "@/components/VideoGrid.jsx";
import bangerBg from "@/assets/banger_01.jpg";

const NewHome = ({ initialSection }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title } = useParams();

    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [activeSection, setActiveSection] = useState(initialSection || 'exhibitions');
    const constraintsRef = useRef(null);
    const { scrollY } = useScroll();
    const [showFooter, setShowFooter] = useState(false);
    const [emailCopied, setEmailCopied] = useState(false);

    // Find exhibition by title if route includes a title parameter
    useEffect(() => {
        if (title) {
            const exhibition = exhibitions2.find(
                ex => ex.title.toLowerCase().replace(/\s+/g, '-') === title.toLowerCase()
            );
            if (exhibition) {
                setSelectedExhibition({
                    title: exhibition.title,
                    year: exhibition.date.split('.')[0],
                    images: exhibition.images || []
                });
            }
        }
    }, [title]);

    // Update active section and selected exhibition based on route
    useEffect(() => {
        // Update active section based on route
        if (initialSection) {
            setActiveSection(initialSection);
        } else if (location.pathname === '/' || location.pathname === '') {
            setActiveSection('exhibitions');
        } else if (location.pathname.includes('/works') || location.pathname.includes('works')) {
            setActiveSection('works');
        } else if (location.pathname.includes('/videos') || location.pathname.includes('videos')) {
            setActiveSection('videos');
        } else if (location.pathname.includes('/exhibitions') || location.pathname.includes('exhibitions')) {
            setActiveSection('exhibitions');
        }

        // If we're not on an exhibition route, clear the selected exhibition
        if (!location.pathname.includes('/exhibition/') && !location.pathname.includes('exhibition/')) {
            setSelectedExhibition(null);
        }
    }, [initialSection, location.pathname]);

    const exhibitionsData = exhibitions2.map(exhibition => ({
        title: exhibition.title,
        year: exhibition.date.split('.')[0],
        images: exhibition.images || []
    })).slice(0, 6); // Only take first 6 exhibitions

    useMotionValueEvent(scrollY, "change", (latest) => {
        setShowFooter(latest > 600);
    });

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('ediexxu@gmail.com')
            .then(() => {
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
            })
            .catch(err => console.error('Failed to copy email:', err));
    };

    // Helper function to scroll to content area
    const scrollToContentArea = () => {
        const viewportHeight = window.innerHeight;
        const targetY = viewportHeight - 130;

        window.scrollTo({
            top: targetY,
            behavior: 'smooth'
        });
    };

    const handleNavClick = (section) => {
        if (section === 'instagram') {
            // Instagram link is handled by the anchor tag
            return;
        }

        // First scroll to the appropriate area
        scrollToContentArea();

        // Then handle navigation
        if (section === 'index') {
            navigate('/', { replace: false });
            setSelectedExhibition(null);
            setActiveSection('exhibitions');
        } else if (section === 'exhibitions' || section === 'works' || section === 'videos') {
            navigate(`/${section}`);
            setSelectedExhibition(null);
            setActiveSection(section);
        } else if (section === 'more') {
            navigate('/videos');
            setSelectedExhibition(null);
            setActiveSection('videos');
        }
    };

    const handleExhibitionClick = (exhibition) => {
        // Scroll to the content area first
        scrollToContentArea();

        // Then navigate to the exhibition
        const slug = exhibition.title.toLowerCase().replace(/\s+/g, '-');
        // When navigating to an exhibition, ensure we push to history so back button works
        navigate(`/exhibition/${slug}`, { replace: false });
        setSelectedExhibition(exhibition);
    };

    const getExhibitionComponent = (exhibition) => {
        switch (exhibition.title) {
            case 'Out of place':
                return <OutOfPlace onNavigate={handleNavClick}/>;
            case 'Somatic Attunement':
                return <SomaticAttunement onNavigate={handleNavClick} />;
            case 'N 39.984036 S 116.496563':
                return <Coordinates onNavigate={handleNavClick} />;
            case 'Resonate w/ fragmentation':
                return <ResonateWithFragmentation onNavigate={handleNavClick} />;
            case 'Allure Of The Abject':
                return <AllureOfTheAbject onNavigate={handleNavClick} />;
            case 'limited intentionality':
                return <LimitedIntentionality onNavigate={handleNavClick} />;
            default:
                return <OutOfPlace onNavigate={handleNavClick} />;
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

            <div className="text-[1vw] lg:text-[11px] relative bg-white min-h-screen w-full">
                <div className="sticky top-0 z-50 bg-white">
                    <div className="text-center py-8 font-alte-haas font-bold">
                        <div className="mb-0">
                            <span onClick={() => handleNavClick('index')}
                                  className="mr-4 cursor-pointer hover:opacity-60">INDEX</span>
                            {/*<span onClick={() => handleNavClick('contact')}*/}
                            {/*      className="mr-4 cursor-pointer hover:opacity-60">CONTACT</span>*/}
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
                            <a
                                href="https://www.instagram.com/e__xu/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mr-4 cursor-pointer hover:opacity-60"
                            >
                                INSTAGRAM
                            </a>
                            <span
                                onClick={() => handleNavClick('videos')}
                                className={`cursor-pointer hover:opacity-60 ${activeSection === 'videos' ? 'font-bold' : 'font-bold'}`}
                            >
                                VIDEO
                            </span>
                        </div>
                        <div className="">
                            <span
                                onClick={() => handleNavClick('exhibitions')}
                                className={`mr-4 cursor-pointer hover:opacity-60 ${activeSection === 'exhibitions' ? 'font-bold' : 'font-normal'}`}
                            >
                                Exhibition
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
                            <WorksGrid onNavigate={handleNavClick}/>
                        </motion.div>
                    ) : activeSection === 'videos' ? (
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -20}}
                            transition={{duration: 0.3}}
                            className="w-full px-8"
                        >
                            <VideoGrid />
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
                                className="fixed bottom-2 left-0 w-full text-black flex flex-col items-center font-bold text-[12px] p-4"
                            >
                                <div>EDIE XU</div>
                                <div className="text-center text-[8px] opacity-85 tracking-[0.1px] space-x-4 pt-2">
                                    <span>COPYRIGHT 2025</span>
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