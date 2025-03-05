import React, { useRef, useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import ImageContainer from "@/components/ImageContainer.jsx";
import WorksList from "@/components/WorksList.jsx";
import {loremStack} from "@/data.js";

const DateMobile = ({work, onBack}) => {
    const textRef = useRef(null);
    const photoRef = useRef(null);
    const [activeSection, setActiveSection] = useState("photo");

    const scrollToSection = (ref) => {
        const element = ref.current;
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offset = ref === photoRef ? -(window.innerHeight - element.offsetHeight) / 2 : 0;

            animate(window.scrollY, elementPosition + offset, {
                duration: 0.3,
                ease: [0.1, 0.1, 0.9, 0.9],
                onUpdate: (value) => window.scrollTo(0, value)
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const photoPos = photoRef.current?.getBoundingClientRect().top;
            const textPos = textRef.current?.getBoundingClientRect().top;

            if (photoPos !== undefined && textPos !== undefined) {
                if (Math.abs(photoPos) < Math.abs(textPos)) {
                    setActiveSection("photo");
                } else {
                    setActiveSection("text");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);



    const images = [

        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/02-20_01.jpeg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/02-20_02.jpeg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/02-20_03.jpeg"

    ]


    return (
        <div className="relative font-alte-haas justify-center place-content-center w-full">
            <div ref={photoRef} className="w-full flex justify-center place-self-center">
                <ImageContainer images={images} maxWidth="w-[92vw]"/>
            </div>
            <div className="grid grid-cols-4 text-[10px]">
                <div className="col-span-2 justify-self-start font-normal">{work.dimensions}</div>
                <div className="col-span-2 justify-self-end font-normal">
                    <span>{work.material}</span>
                </div>
            </div>


            <div ref={textRef} className="w-[61vw] lg:w-[31vw] mx-auto text-left space-y-4 text-[11px] pt-44 pb-32">
                <p className="indent-4">{loremStack[1]}{loremStack[4]}</p>
                <p className="indent-4">{loremStack[2]}{loremStack[4]}</p>
                <p className="indent-4">{loremStack[3]}</p>
            </div>
            <div className="fixed bottom-[100px] left-0 w-full text-center">
                <div
                    className="flex flex-col space-x-10 items-center text-center font-alte-haas font-bold text[2vw] md:text-[1vw] lg:text-[12px] justify-center">
                    <span> 02 20</span>
                    {/*<div className="flex-row space-x-2">*/}
                    {/*    <span*/}
                    {/*        className={`cursor-pointer transition-opacity ${activeSection === "text" ? "font-bold opacity-100" : "opacity-30 hover:opacity-60"}`}*/}
                    {/*        onClick={() => scrollToSection(textRef)}*/}
                    {/*    >*/}
                    {/*        Previous*/}
                    {/*    </span>*/}
                    {/*    <span*/}
                    {/*        className={`cursor-pointer transition-opacity ${activeSection === "photo" ? "font-bold opacity-100" : "opacity-30 hover:opacity-60"}`}*/}
                    {/*        onClick={() => scrollToSection(photoRef)}*/}
                    {/*    >*/}
                    {/*        Next*/}
                    {/*    </span>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};

export default DateMobile;