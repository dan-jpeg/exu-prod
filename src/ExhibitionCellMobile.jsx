import React from 'react';

const ExhibitionCellMobile = ({ title, year, images, onClick }) => {

    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

    const handleMouseEnter = () => {
        const randomIndex = Math.floor(Math.random() * images.length)
        setCurrentImageIndex(randomIndex);
    }

    const handleMouseLeave = () => {
        // setCurrentImageIndex(0)
    }

    return (
        <div onClick={onClick}  className=" cursor-pointer w-1/2 max-w-[300px]  flex-col"
        onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}
        >
            <div className="flex text-[9px] lg:text-[11px]  uppercase font-bold   justify-between items-start mb-1">
                <span className=" font-alte-haas">{title}</span>
                <span className=" font-alte-haas">{year}</span>
            </div>
            <div className="w-full  flex justify-center">
                <img
                    src={images[currentImageIndex]}
                    alt={title}
                    className="h-[120px] w-auto object-cover"
                />
            </div>
        </div>
    );
};

export default ExhibitionCellMobile;

