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
            <div ref={photoRef} className="pb-40">
                <ImageContainer images={images}/>
            </div>

            <WorksList works={workIncluded[0]}/>
            <WorksList works={workIncluded[1]}/>
            <div className=" w-full grid grid-cols-6 text-[11px] font-bold pb-32">
                <div className="col-span-2"></div>
                <div ref={textRef}
                     className=" col-span-2 mx-auto text-center leading-8  font-bold  text-[1vw] lg:text-[11px] pt-44 ">
                    <p className="indent-4 font-helvetica pb-12"> " Suspension of distance emerges almost
                        instantaneously
                        from Edie Siyi Xu’s juxtaposition of the ponderous and mechanical iron stand and the fossil-like
                        ceramics: upon closer scrutiny, one notices crevices on the enclosed clay cocoon which hint at
                        the
                        mysterious hollow often seen in her work evoking the intuitive sense of belonging. Underlining
                        the
                        status of disassociation, Li Shuang, who is absent in her video, recruited 20 performers styled
                        identically in blunt-cut fringe and spycam-like glasses like the artist herself. The footage of
                        avatars interacting with Li’s friends through the lens in their glasses unveils a world
                        infiltrated
                        by interfaces. We are always connected, always plugged in. If it weren't for a light source on
                        the
                        ground, perhaps no one would notice Ge Yulu's Matrix-like diagram map painted on the floor.
                        Light
                        has always been the metaphor for the field of vision, but now the flashlight illuminates an
                        interface for access. The source code sounds remote, maybe the only thing remote; the matrix
                        should
                        be preserved in the polar glacier, yet it is close at one’s feet. "</p>
                </div>

                <div className="col-span-2"></div>

                <div className="col-span-2"></div>
                <div className="grid col-span-2 grid-cols-7 uppercase place-items-center   text-center justify-center">
                    <div className={`col-span-7 flex-col`}>
                        <p className="place-self-center">Group Exhibition with </p>
                        <div className=" flex flex-row space-x-3">
                            <p className="">Chang Yuchen,</p>
                            <p className="">Ge Yulu,</p>
                            <p className="">Hu Xiaoyuan,</p>
                            <p className="">& MORE</p>

                        </div>
                    </div>


                </div>
                <div className="col-span-2"></div>
                <div className="col-span-2"></div>

                <div className={`flex-col col-span-2 place-self-center text-center`}>

                    <p>Beijing Commune,
                        Beijing 2024</p>

                </div>

                <div className="col-span-2"></div>

            </div>


            <div className="fixed top-4 left-8 font-alte-haas font-bold text-[11px] text-left">
                <span>
                    EDIE XU
                </span>
            </div>
            <div className="fixed top-4 right-8 font-alte-haas font-bold text-[11px] text-right">
                <span>
                    PROJECTS
                </span>
            </div>
            <div className="fixed bottom-20 left-0 w-full text-center">
                <div
                    className="flex flex-row space-x-10 items-center font-alte-haas font-bold text-[2vw] md:text-[1vw] lg:text-[12px] justify-center">
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