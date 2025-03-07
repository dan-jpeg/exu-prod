import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import VideoBackground from './components/video-background/VideoBackground';
import ExhibitionCell from './components/ExhibitionCell';
import { exhibitions2 } from '@/data';
import OutOfPlace from './components/OutOfPlace';
import SomaticAttunement from "@/components/SomaticAttunement";
import Coordinates from "@/components/Coordinates";
import ResonateWithFragmentation from "@/components/ResonateWithFragmentation";
import AllureOfTheAbject from "@/components/AllureOfTheAbject";
import LimitedIntentionality from "@/components/LimitedIntentionality";
import ExhibitionCellMobile from "@/ExhibitionCellMobile.jsx";
import LimitedIntentionalityMobile from "@/components/LimitedIntentionalityMobile.jsx";
import MobileWorksGrid from "@/components/MobileWorksGrid";
import OutOfPlaceMobile from "@/components/OutOfPlaceMobile.jsx";
import WorksGrid from "@/components/NewWorksGrid.jsx";
import SomaticAttunementMobile from "@/components/SomaticAttunementMobile.jsx";
import VideoGrid from "@/components/VideoGrid.jsx";
import WorksGridMobile from "@/components/NewWorksGridMobile.jsx";

const NewHomeMobile = ({ initialSection }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title } = useParams();

    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [activeSection, setActiveSection] = useState(initialSection || 'exhibitions');
    const { scrollY } = useScroll();
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
    }));

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('ediexxu@gmail.com')
            .then(() => {
                setEmailCopied(true);
                setTimeout(() => setEmailCopied(false), 2000);
            })
            .catch(err => console.error('Failed to copy email:', err));
    };

    // For mobile, we might want to scroll to a different position
    const scrollToMobileContentArea = () => {
        // For mobile, we'll scroll to the top of the content
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const handleNavClick = (section) => {
        // Special handlers that don't require routing
        if (section === 'email') {
            handleCopyEmail();
            return;
        } else if (section === 'instagram') {
            window.open('https://www.instagram.com/e__xu/', '_blank');
            return;
        } else if (section === 'cv') {
            window.open('https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/assets/Edie+X+Resume-1.pdf', '_blank');
            return;
        }

        // Scroll before navigation
        scrollToMobileContentArea();

        // Handle navigation
        if (section === 'index') {
            // Ensure we're properly adding the home route to history
            navigate('/', { replace: false });
            setSelectedExhibition(null);
            setActiveSection('exhibitions');
        } else if (section === 'exhibitions' || section === 'works' || section === 'videos') {
            navigate(`/${section}`);
            setSelectedExhibition(null);
            setActiveSection(section);
        }
    };

    const handleExhibitionClick = (exhibition) => {
        // Scroll to the mobile content area first
        scrollToMobileContentArea();

        // Then navigate to the exhibition
        const slug = exhibition.title.toLowerCase().replace(/\s+/g, '-');
        // Ensure proper history entry for back navigation
        navigate(`/exhibition/${slug}`, { replace: false });
        setSelectedExhibition(exhibition);
    };

    const getExhibitionComponent = (exhibition) => {
        switch (exhibition.title) {
            case 'Out of place': return <OutOfPlaceMobile onNavigate={handleNavClick} />;
            case 'Somatic Attunement': return <SomaticAttunementMobile onNavigate={handleNavClick} />;
            case 'N 39.984036 S 116.496563': return <Coordinates onNavigate={handleNavClick} />;
            case 'Resonate w/ fragmentation': return <ResonateWithFragmentation onNavigate={handleNavClick} />;
            case 'Allure Of The Abject': return <AllureOfTheAbject onNavigate={handleNavClick} />;
            case 'limited intentionality': return <LimitedIntentionalityMobile onNavigate={handleNavClick} />;
            default: return <OutOfPlace onNavigate={handleNavClick} />;
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-x-hidden">
            {/* Video Background */}
            {/*<div className="fixed inset-0 w-full h-full">*/}
            {/*    <VideoBackground/>*/}
            {/*</div>*/}

            <div className="fixed top-0 left-1/2 transform -translate-x-1/2 text-[10px] z-50 bg-none">
                <div className="text-center py-8 font-alte-haas font-bold">
                    <div className="mb-0">
                        <span onClick={() => handleNavClick('index')}
                              className="mr-3 cursor-pointer hover:opacity-60">INDEX</span>

                        <span onClick={() => handleNavClick('email')}
                              className="mr-3 cursor-pointer hover:opacity-60">
                            {emailCopied ? 'EMAIL COPIED :)' : 'EMAIL'}
                        </span>
                        <span onClick={() => handleNavClick('instagram')}
                              className="mr-3 cursor-pointer hover:opacity-60">INSTAGRAM</span>
                        <span onClick={() => handleNavClick('cv')}
                              className="mr-3 cursor-pointer hover:opacity-60">CV</span>
                        <span onClick={() => handleNavClick('videos')}
                              className="cursor-pointer hover:opacity-60">VIDEO</span>
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

            {/* Main Content */}
            <div className="text-sm relative bg-white min-h-screen w-full">
                {/* Content Area */}
                <motion.div
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -20}}
                    transition={{duration: 0.3}}
                    className="px-4 pt-20 justify-center items-center"
                >
                    {selectedExhibition ? (
                        getExhibitionComponent(selectedExhibition)
                    ) : activeSection === 'works' ? (
                        <WorksGridMobile onNavigate={handleNavClick}/>
                    ) : activeSection === 'videos' ? (
                        <VideoGrid />
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

                {activeSection !== 'exhibitions' && (
                    <div className="fixed top-[30px] w-screen">
                        <div className="w-full font-alte-haas tracking-tight font-bold text-[10px] grid grid-cols-2">
                            <div className="place-self-start text-left ml-4">EDIE XU</div>
                            <div className="place-self-end text-right mr-4 ">PROJECTS</div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                {activeSection === 'exhibitions' && !selectedExhibition && (
                    <motion.div
                        className="fixed bottom-8 text-[10px] left-0 w-full flex flex-col items-center font-bold p-2"
                    >
                        <div className="text-">EDIE XU</div>
                        <div className="text-center space-x-4 pt-1">
                            <span>COPYRIGHT 2025</span>
                            <span>@COMMON-DESIGN</span>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default NewHomeMobile;