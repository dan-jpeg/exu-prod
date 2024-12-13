import React from 'react';

const ExtraSection = ({ textContent0, textContent1, textContent2 }) => {
    return (
        <div className="bg-white text-[10px] md:text-sm font-alte-haas z-30">
            <div className="bg-neutral-50 space-y-6 h-[100vh] transform translate-y-[50vh]  flex flex-col  items-end px-12 md:pl-auto md:pr-12 pt-20">
                <div className="  w-full md:w-[352px] opacity-0 md:h-[115px] text-black text-xs font-normal">{textContent0}</div>
                <div className=" w-full md:w-[352px] md:h-[115px] text-black text-xs font-normal">{textContent0}</div>
                <div className=" w-full md:w-[352px] md:h-[115px] text-black text-xs font-normal">{textContent1}</div>
                <div className=" w-full md:w-[352px] md:h-[115px] text-black text-xs font-normal mt-auto">{textContent2}</div>
            </div>
        </div>
    );
};

export default ExtraSection;


