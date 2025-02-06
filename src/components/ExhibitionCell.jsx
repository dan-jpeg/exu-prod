import React from 'react';

const ExhibitionCell = ({ title, year, images, onClick }) => {

    const [currentImageIndex, setCurrentImageIndex] = React.useState(1);

    const handleMouseEnter = () => {
        const randomIndex = Math.floor(Math.random() * images.length)
        setCurrentImageIndex(randomIndex);
    }

    const handleMouseLeave = () => {
        // setCurrentImageIndex(0)
    }

    return (
        <div onClick={onClick}  className=" cursor-pointer  flex-col"
        onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            <div className="flex text-[1vw] lg:text-[11px]  uppercase font-bold    justify-between items-start mb-5">
                <span className=" font-alte-haas">{title}</span>
                <span className=" font-alte-haas">{year}</span>
            </div>
            <div className="w-full pt-[1px] flex justify-center">
                <img
                    src={images[currentImageIndex]}
                    alt={title}
                    className="h-[5vw] w-auto object-cover"
                />
            </div>
        </div>
    );
};

export default ExhibitionCell;

