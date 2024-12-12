import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from "framer-motion";


const ImageContainer = ({ imageSource, description }) => {
    return (
        <div className="image-container">
            <img className="image" src={imageSource} alt="alt text goes here" />
            <p className="date">{description}</p>
        </div>
    );
};

