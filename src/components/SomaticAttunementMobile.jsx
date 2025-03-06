import React, { useRef, useEffect, useState } from 'react';
import { motion, animate } from 'framer-motion';
import ImageContainer from "@/components/ImageContainer.jsx";
import WorksList from "@/components/WorksList.jsx";
import {loremStack} from "@/data.js";
import {Fullscreen} from "lucide-react";
import MinimalNav from "@/components/MinimalNav.jsx";

export const FullWidthPhotoColumn = ({images}) => {
    const displayImages = images.slice(0, 4);

    return (
        <div className="w-screen -ml-8 mt-2" >
            {images.map((image, index) => (
                <img key={index} src={image} alt={`somatic-attunement-${index}`} className="w-full" />
            ))}
        </div>
    )
}

const SomaticAttunementMobile = ({onNavigate}) => {
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
                if (Math.abs(photoPos) < Math.abs(textPos-200)) {
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
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/edie+exhib+cover+photos/somatic-attunement_01.png",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement02%400.25x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement03%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement04%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement05%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement06%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement07%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement08%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement09%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement10%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement11%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement12%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement13%400.2x.jpg",
        "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/somatic-attunement14%400.25x.jpg",
    ]

    // const workIncluded = [
    //     {
    //         id: 1,
    //         title: "Hear me sing",
    //         year: "2023",
    //         dimensions: "28 x 30 x 8 inches (71 x 78 x 20 cm)",
    //         material: "Unglazed stoneware",
    //         description: "",
    //         images: [
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place06%400.25x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place04%400.25x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place05%400.25x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place09%400.2x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place12%400.25x.jpg"
    //
    //         ]
    //     },
    //     {
    //         id: 2,
    //         title: "Thine air",
    //         year: "2023",
    //         dimensions: "34 x 23 x 15 inches (86 x 58 x 38cm)",
    //         material: "Unglazed stoneware",
    //         description: "",
    //         images: [
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place07%400.25x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place01%400.25x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place10%400.25x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place08%400.2x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place02%400.25x.jpg",
    //             "https://edie-xu-portfolio.s3.us-east-2.amazonaws.com/photos/OUT-of-small/out-of-place03%400.25x.jpg"
    //         ]
    //     }
    // ]


    return (
        <div className="relative font-alte-haas justify-center place-content-center w-full">
            <div ref={photoRef} className="pb-40">
                <ImageContainer images={images}/>
            </div>

            {/*<div ref={photoRef}>*/}
            {/*    <FullWidthPhotoColumn ref={photoRef} images={images} />*/}
            {/*</div>*/}

            <div ref={textRef}
                 className="w-full  mx-auto text-left leading-8  font-bold text-[2vw] md:text-[1vw]  lg:text-[14px] pt-44 pb-32">
                <div className="grid grid-cols-7 uppercase place-items-center text-center justify-center">
                    <div className={`col-span-7 flex-col`}>
                        <p className="place-self-start">Group Exhibition with </p>
                        <div className=" flex flex-row space-x-1">
                            <p className=""> Cai Lei, Hang Chunhui, Liu Yue, Su Chang</p>
                            <p className="">& MORE</p>

                        </div>
                    </div>
                    <div className={`flex-row col-span-7 place-self-center text-center`}>
                        <p>Studio Gallery, Shanghai</p>
                        <p>2021</p>
                    </div>

                </div>


            </div>



            <div className="fixed bottom-20 left-0 w-full text-center">
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

export default SomaticAttunementMobile;

