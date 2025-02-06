import React, { useRef, useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import ImageContainer from "@/components/ImageContainer.jsx";
import WorksList from "@/components/WorksList.jsx";
import {loremStack} from "@/data.js";
import {Fullscreen} from "lucide-react";



const ResonateWithFragmentation = () => {
    const textRef = useRef(null);
    const photoRef = useRef(null);
    const [activeSection, setActiveSection] = useState("photo");

    const scrollToSection = (ref) => {
        if (ref.current) {
            const element = ref.current;
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

            console.log('Photo pos:', photoPos);
            console.log('Text pos:', textPos);

            if (photoPos !== undefined && textPos !== undefined) {
                if (Math.abs(photoPos) < Math.abs(textPos - 200)) {
                    console.log('Setting active to photo');
                    setActiveSection("photo");
                } else {
                    console.log('Setting active to text');
                    setActiveSection("text");
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const images = [

        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate04%400.3x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate05%400.3x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate06%400.3x.jpg",


        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate02%400.3x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/edie+exhib+cover+photos/resonate-with-fragmentation_01.jpeg",

        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate03%400.3x.jpg"
    ]

    const workIncluded = [

        {
            id: 1,
            title: "Landmart",
            year: "2024",
            dimensions: "352 × 522 × 475 cm",
            material: "Knit, aluminum, cement residue",
            description: "",
            images: [
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate04%400.3x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate05%400.3x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate06%400.3x.jpg",


                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate02%400.3x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/edie+exhib+cover+photos/resonate-with-fragmentation_01.jpeg",

                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate03%400.3x.jpg",
            ]
        },
        {
            id: 2,
            title: "Intimate Being",
            year: "2023",
            dimensions: "40 × 25 × 25 cm",
            material: "Ceramics",
            description:
                "s embrace through the memories of my hands. The back of the piece is slightly cured and bent over showing subtle bumps of one’s spine, arched into a finger like tentacle. The piece is not glazed, it is made with two different clay, fired at 1800 degrees creating different texture and color. The black line in the middle of the ‘torso’ is inspired a daily life encounter of washing shrimp, and being surprised to realize they actually have two black vein instead of one",
            images: [
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate04%400.3x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate05%400.3x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate06%400.3x.jpg",


                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate02%400.3x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/edie+exhib+cover+photos/resonate-with-fragmentation_01.jpeg",

                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/resonate03%400.3x.jpg",
            ]



        }
        ]



    return (
        <div className="relative font-alte-haas justify-center place-content-center w-full">
            <div ref={photoRef}>
                <ImageContainer images={images}/>
            </div>

            <WorksList works={workIncluded[0]}/>


            <div ref={textRef} className="w-[61vw] lg:w-[31vw] mx-auto text-left space-y-4 text-[11px] pt-44 pb-32">
                <p className="indent-4">{loremStack[1]}{loremStack[4]}</p>
                <p className="indent-4">{loremStack[2]}{loremStack[4]}</p>
                <p className="indent-4">{loremStack[3]}</p>
            </div>

            <div className="fixed bottom-2 left-0 w-full text-center">
                <div
                    className="flex flex-row space-x-10 items-center font-alte-haas font-bold text[2vw] md:text-[1vw] lg:text-[12px] justify-center">
                    <span> SOMATIC ATTUNEMENT </span>
                    <div className="flex-row space-x-2">
                        <span
                            className={`cursor-pointer transition-opacity ${activeSection === "text" ? "font-bold opacity-100" : "opacity-30 hover:opacity-60"}`}
                            onClick={() => scrollToSection(textRef)}
                        >
                            Text
                        </span>
                        <span
                            className={`cursor-pointer transition-opacity ${activeSection === "photo" ? "font-bold opacity-100" : "opacity-30 hover:opacity-60"}`}
                            onClick={() => scrollToSection(photoRef)}
                        >
                            Photo
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResonateWithFragmentation;