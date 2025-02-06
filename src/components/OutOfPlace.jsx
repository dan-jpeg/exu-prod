import React, { useRef, useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import ImageContainer from "@/components/ImageContainer.jsx";
import WorksList from "@/components/WorksList.jsx";
import {loremStack} from "@/data.js";

const OutOfPlace = () => {
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
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place06%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place04%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place05%400.25x.jpg",

        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place09%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place12%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place11%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place07%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place01%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place10%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place08%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place02%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place03%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/edie+exhib+cover+photos/out-of-place_01.jpeg"
        ]

    const workIncluded = [
        {
            id: 1,
            title: "Hear me sing",
            year: "2023",
            dimensions: "28 x 30 x 8 inches (71 x 78 x 20 cm)",
            material: "Unglazed stoneware",
            description: "",
            images: [
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place06%400.25x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place04%400.25x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place05%400.25x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place09%400.2x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place12%400.25x.jpg"

            ]
        },
        {
            id: 2,
            title: "Thine air",
            year: "2023",
            dimensions: "34 x 23 x 15 inches (86 x 58 x 38cm)",
            material: "Unglazed stoneware",
            description: "",
            images: [
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place07%400.25x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place01%400.25x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place10%400.25x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place08%400.2x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place02%400.25x.jpg",
                "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place03%400.25x.jpg"
            ]
        }
    ]


    return (
        <div className="relative font-alte-haas justify-center place-content-center w-full">
            <div ref={photoRef}>
                <ImageContainer images={images} />
            </div>

            <WorksList works={workIncluded[0]} />
            <WorksList works={workIncluded[1]} />
            <div ref={textRef} className="w-[31vw] mx-auto text-left space-y-4 text-[11px] pt-44 pb-32">
                <p className="indent-4">{loremStack[1]}{loremStack[4]}</p>
                <p className="indent-4">{loremStack[2]}{loremStack[4]}</p>
                <p className="indent-4">{loremStack[3]}</p>
            </div>
            <div className="fixed bottom-2 left-0 w-full text-center">
                <div className="flex flex-row space-x-10 items-center font-alte-haas font-bold text-[1vw] lg:text-[12px] justify-center">
                    <span> OUT OF PLACE </span>
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

export default OutOfPlace;