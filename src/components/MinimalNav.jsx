import React from 'react';

const MinimalNav = ({ onNavigate }) => {
    return (
        <>
            <div className="fixed top-4 left-8 font-alte-haas font-bold text-[11px] text-left z-10">
        <span
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => onNavigate('exhibitions')}
        >
          EDIE XU
        </span>
            </div>
            <div className="fixed top-4 right-8 font-alte-haas font-bold text-[11px] text-right z-10">
        <span
            className="cursor-pointer hover:opacity-70 transition-opacity"
            onClick={() => onNavigate('works')}
        >
          PROJECTS
        </span>
            </div>
        </>
    );
};

export default MinimalNav;