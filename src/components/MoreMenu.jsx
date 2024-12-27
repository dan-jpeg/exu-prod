import React, { useState, useEffect } from 'react';

const MoreMenu = ({ onVideoClick, onDrawingClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check for mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const handleToggle = () => {
        if (isMobile) {
            setIsExpanded(!isExpanded);
        }
    };

    return (
        <div
            className="fixed right-8 text-right"
            onMouseEnter={() => !isMobile && setIsExpanded(true)}
            onMouseLeave={() => !isMobile && setIsExpanded(false)}
            onClick={handleToggle}
        >
            <div className="inline-block min-w-[120px]">
                <p className="font-alte-haas text-custom pb-0 mb-0 tracking-[-0.51px] cursor-pointer">
                    {isExpanded ? "- " : "+ "}More
                </p>

                <div className={`flex flex-col items-end -space-y-2 overflow-hidden transition-all duration-200 ${
                    isExpanded ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
                }`}>
                    <button
                        onClick={onVideoClick}
                        className="font-alte-haas  my-0 py-0  tracking-[-0.51px] hover:opacity-25 transition-opacity cursor-pointer"
                    >
                        Performance
                    </button>
                    <button
                        onClick={onDrawingClick}
                        className="font-alte-haas  my-0 py-0  tracking-[-0.51px] hover:opacity-25 transition-opacity cursor-pointer"
                    >
                        Paper
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MoreMenu;