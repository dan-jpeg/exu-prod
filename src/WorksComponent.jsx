import React, {useEffect, useRef, useState} from 'react';
import { motion, useScroll, useTransform, animate, AnimatePresence } from "framer-motion";
import Section from "./components/section/Section.jsx";
import ExtraSection from "./components/more-info/ExtraSection.jsx";
import HorizontalScroll from "./components/horizontal-scroll/HorizontalScroll.jsx";
import { selectedWorks } from "./data.js";
import { loremStack } from "./data.js";
import arrow from "@/assets/arrow1.svg"
import LanguageSwitcher from "./components/language-switch/LanguageToggle.jsx";
import ExhibitionsIndex from "./components/exhibitions-index/ExhibitionIndex.jsx";
import VideoBackground from "./components/video-background/VideoBackground.jsx";
import VideoPage from "./components/videos-and-drawings/VideoPage.jsx";
import DrawingPage from "./components/videos-and-drawings/DrawingPage.jsx";
import MoreMenu from "@/components/MoreMenu.jsx";
import OfficeMenu from "@/components/office-menu/OfficeMenu.jsx";
import { Menu, X } from 'lucide-react';
import WorksNavBar from "./components/WorksNavBar.jsx";


const LandingNav = ({color, location}) => {
    return (
        <div className={`fixed ${location} right-8`}>
            <div className="flex font-alte-haas opacity-0 md:opacity-80 flex-row text-gray-100  text-[14px] space-x-6">
                <div className="flex  flex-row ">
                    <span className={ ` ${color} cursor-pointer pr-[43px] hover:opacity-100 opacity-50`}> CV</span>
                    <span className={ ` ${color} cursor-pointer pr-[53px] hover:opacity-100 opacity-50`}> CONTACT</span>
                    <LanguageSwitcher color={color }/>

                </div>

            </div>
        </div>
    )
}




function WorksComponent() {

    const [lastSection, setLastSection] = useState('exhibitions'); // T
    const [section, setSection] = useState(null);// rack last opened section
    const [expanding, setExpanding] = useState(true);
    const [activeView, setActiveView] = useState('works');
    const [page, setPage] = useState('works');
    const [moreExpanded, setMoreExpanded] = useState(false);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);


    const animationConfig = {
        duration: 0.4,
        ease: [0.1, 0.1, 0.9, 0.9]
    };


    const handleNavigation = (newSection) => {
        setExpanding(true);
        setSection(newSection);
        setLastSection(newSection); // Update last section when navigating
    };

    const handleReturn = () => {
        // First scroll to top with animation
        const currentScroll = window.scrollY;
        animate(currentScroll, 0, {
            duration: 0.8,
            onUpdate: (value) => window.scrollTo(0, value),
            onComplete: () => {
                // After scrolling is complete, handle the expanding state
                setHamburgerOpen(false)
                if (expanding) {
                    setExpanding(false);
                    setSection(null);
                    if (page === 'video' || page === 'drawing') {
                        setPage('main')
                    }
                } else {

                    setExpanding(true);
                    setSection(lastSection);
                }
            }
        });
    };


    const containerVariants = {
        initial: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                ease: [0.1, 0.1, 0.9, 0.9]
            }
        },
        shifted: {
            opacity: 1,
            y: window.innerWidth <= 768 ? '78vh' : '94vh',
            transition: {
                duration: 0.4,
                ease: [0.1, 0.1, 0.9, 0.9]
            }
        }
    };

    const arrowAnimationConfig = {
        duration: 0.8,
        ease: [0.1, 0.1, 0.9, 0.9]
    };


    useEffect(() => {
        // Save initial body styles
        const originalStyle = window.getComputedStyle(document.body).position;
        const originalOverflow = document.body.style.overflow;
        const originalHeight = document.body.style.height;
        const originalTop = document.body.style.top;

        // Prevent the default behavior of touchmove (vertical scroll)
        const preventDefault = (e) => {
            e.preventDefault();
        };

        if (!expanding) {
            // Restore the body's styles and allow scrolling
            document.body.style.position = '';
            document.body.style.width = '';
            document.body.style.height = '';
            document.body.style.top = '';
            document.body.style.overflow = ''; // Restore original overflow

            // Remove touchmove listener to allow scrolling
            document.removeEventListener('touchmove', preventDefault);
        } else {
            // Disable scrolling when expanding is false
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            document.body.style.height = '100vh';
            document.body.style.top = `-${window.scrollY}px`;
            document.body.style.overflow = 'hidden'; // This stops scrolling

            // Add touchmove listener to block scrolling
            document.addEventListener('touchmove', preventDefault, { passive: false });
        }

        return () => {
            // Cleanup on component unmount or dependency change
            document.body.style.position = originalStyle;
            document.body.style.width = '';
            document.body.style.height = originalHeight;
            document.body.style.top = originalTop;
            document.body.style.overflow = originalOverflow;
            document.removeEventListener('touchmove', preventDefault);
        };
    }, [expanding]);


    useEffect(() => {
        // Check if iOS
        const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        // Set CSS variable for shift amount
        document.documentElement.style.setProperty(
            '--shift-amount',
            iOS ? '90vh' : '94vh'
        );
    }, []);

    const [activeWork, setActiveWork] = useState(selectedWorks[0]);
    const containerRef = useRef(null);


    // Handle work changes with scroll animation
    const handleWorkChange = (work) => {
        // Animate scroll to top
        const currentScroll = window.scrollY;
        animate(currentScroll, 0, {
            duration: 0.8,
            onUpdate: (value) => window.scrollTo(0, value)
        });

        setActiveWork(work);
    };

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["center center", "end end"]
    });


    const getOpacityStyle = (isActive) => {
        if (isActive) {
            return { opacity: 1 }; // Always fully visible
        }
        return { opacity: titleOpacity,  y: titleY}; // Fades out with scroll
    };



    const titleOpacity = useTransform(
        scrollYProgress,
        [0, 0.29, 0.3],
        [1, 1, 0]
    );

    const moreMenuOpacity = useTransform(
        scrollYProgress,
        [0, 0.29, 0.31],
        [1, 0.5, 0]
    );

    const moreMenuY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3],
        [0, 2, 4]
    );

    const titleY = useTransform(
        scrollYProgress,
        [0, 0.2, 0.3],
        [0, -2, -4]
    );

    const photoDivOpacity = useTransform(
        scrollYProgress,
        [0, 0.5, 0.8],
        [1, 1, 0]
    );


    const infoDivOpacity = useTransform(
        scrollYProgress,
        [0, 0.4, 0.6],
        [1, 1, 0]
    );

    const activeWorkOpacity = useTransform(
        scrollYProgress,
        [0, 0.15, 0.3],
        [1, 1, 1]  // Always stays visible
    );

    const extraSectionOpacity = useTransform(
        scrollYProgress,
        [0.5, 0.7],
        [0, 1]
    );


    const renderContent = () => {
        if (activeView === 'exhibitions') {
            return <ExhibitionsIndex handleReturn={handleReturn} />;
        }

        // Handle different pages in works view
        if (page === 'video') {
            return <VideoPage handleReturn={() => setPage('main')} />;
        }

        if (page === 'drawing') {
            return <DrawingPage handleReturn={() => setPage('main')} />;
        }

        return (
            <>
                <motion.div
                    className="fixed top-16 left-4 z-10"
                >
                    <p className="text-custom pl-[100px] lg:pl-[41vw] mr-8 font-alte-haas text-right tracking-wide">
                        {selectedWorks.map((work, index) => (
                            <motion.span
                                key={work.id}
                                style={getOpacityStyle(work.id === activeWork.id)}
                                className={`cursor-pointer underline-offset-4 hover:underline transition-all duration-200 hover:opacity-25
                                ${work.id === activeWork.id ? 'font-bold' : 'font-light'}`}
                                onClick={() => handleWorkChange(work)}
                            >
                                ({String(index + 1).padStart(2, '0')}) {work.title}
                                {index < selectedWorks.length - 1 ? ' ' : ''}
                            </motion.span>
                        ))}
                    </p>
                    <motion.div
                        style={{
                            opacity: moreMenuOpacity,
                            y: moreMenuY
                        }}
                        transition={{
                            delay: 0.2,  // Adds a delay to all animations
                            duration: 0.4 // Controls how long the animation takes
                        }}
                        className={` `}
                    >
                        <MoreMenu
                            onVideoClick={() => setPage('video')}
                            onDrawingClick={() => setPage('drawing')}
                        />
                    </motion.div>


                </motion.div>

                <motion.div
                    style={{opacity: photoDivOpacity}}
                    className=""
                >
                    <HorizontalScroll selectedWork={activeWork}/>
                </motion.div>



                <motion.div
                    style={{opacity: infoDivOpacity}}
                    className="fixed flex flex-row bottom-32 left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-full text-black text-[11px] italic  space-x-2 font-bold font-alte-haas">
                        <span>{activeWork.material}</span>
                        <span>{activeWork.dimensions}</span>
                    </div>
                </motion.div>

                <motion.div
                    style={{opacity: extraSectionOpacity}}
                    className="bg-white pointer-events-none -mt-[100vh] z-1"
                >
                    <ExtraSection
                        textContent0={loremStack[0]}
                        textContent1={loremStack[1]}
                        textContent2={loremStack[2]}
                    />
                </motion.div>
            </>
        );
    };
    return (
        <>
            {/* Fixed video background - always present */}
            {/*<div className="fixed inset-0 -z-10">*/}
            {/*    <video*/}
            {/*        className="absolute inset-0 w-full h-full object-contain"*/}
            {/*        autoPlay*/}
            {/*        muted*/}
            {/*        loop*/}
            {/*        playsInline*/}
            {/*        src="https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/videos/lp_video.mp4"*/}
            {/*    />*/}
            {/*</div>*/}
            <LandingNav   location={"bottom-[72px]"}  />
            <div className="font-davinci text-white opacity-0 md:opacity-80 -tracking-2p   text-[6vw] fixed top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                edie xu
            </div>
            <VideoBackground/>

            {/* Main content container */}
            <motion.div
                ref={containerRef}
                variants={containerVariants}
                animate={expanding ? "shifted" : "initial"}
                className="relative z-10"
            >
                {/* Permanent white background behind content */}
                <motion.div
                    className="fixed inset-0 bg-white -z-10"
                    initial={{opacity: 1}}
                    animate={{opacity: 1}}
                />

                <LanguageSwitcher expanding={expanding}/>
                <WorksNavBar
                    expanding={expanding}
                    handleReturn={handleReturn}
                    arrowAnimationConfig={arrowAnimationConfig}
                    activeView={activeView}
                    setActiveView={setActiveView}
                    page={page}
                    setPage={setPage}
                    hamburgerOpen={hamburgerOpen}
                    setHamburgerOpen={setHamburgerOpen} v
                />

                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
                <OfficeMenu handleReturn={handleReturn}/>
                {/*<LandingNav color={"text-black"} location={"bottom-4"}/>*/}
            </motion.div>
        </>
    );
}

export default WorksComponent;