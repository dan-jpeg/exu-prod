import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import WorksComponent from "./WorksComponent.jsx";
import NewHome from "./NewHome.jsx";
import WorksNavBar from "@/components/WorksNavBar.jsx";
import NewHomeMobile from "@/NewHomeMobile.jsx";
import "./index.css";

// Empty component that does nothing for now
function NoOpScroll() {
    return null;
}

// Responsive router that decides which component to render based on screen size
function ResponsiveRouter() {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <BrowserRouter>
            <NoOpScroll />
            <Routes>
                {/* Add routes for both with and without trailing slash */}
                <Route path="/" element={isMobile ? <NewHomeMobile /> : <NewHome />} />
                <Route path="" element={isMobile ? <NewHomeMobile /> : <NewHome />} />
                <Route path="/exhibitions" element={isMobile ? <NewHomeMobile /> : <NewHome initialSection="exhibitions" />} />
                <Route path="exhibitions" element={isMobile ? <NewHomeMobile /> : <NewHome initialSection="exhibitions" />} />
                <Route path="/works" element={isMobile ? <NewHomeMobile initialSection="works" /> : <NewHome initialSection="works" />} />
                <Route path="works" element={isMobile ? <NewHomeMobile initialSection="works" /> : <NewHome initialSection="works" />} />
                <Route path="/videos" element={isMobile ? <NewHomeMobile initialSection="videos" /> : <NewHome initialSection="videos" />} />
                <Route path="videos" element={isMobile ? <NewHomeMobile initialSection="videos" /> : <NewHome initialSection="videos" />} />
                <Route path="/exhibition/:title" element={isMobile ? <NewHomeMobile /> : <NewHome />} />
                <Route path="exhibition/:title" element={isMobile ? <NewHomeMobile /> : <NewHome />} />
                {/* Add a catch-all route that renders the home page */}
                <Route path="*" element={isMobile ? <NewHomeMobile /> : <NewHome />} />
            </Routes>
        </BrowserRouter>
    );
}

const App = () => {
    return <ResponsiveRouter />;
};

export default App;