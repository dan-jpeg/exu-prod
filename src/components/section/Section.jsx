import React from "react";
import "./section.css";

const Section = ({ title, height = "100vh" }) => {
    return (
        <div className={`section ${title == "forgot" ? "translate-y-full transform" : "" } bg-white h-[100vh] `}>
            <div className=" bg-white flex justify-between items-center">
                <h1 className="text-8xl text-black">{title}</h1>
                <div className="icon">
                </div>
            </div>
        </div>
    );
};

export default Section;

