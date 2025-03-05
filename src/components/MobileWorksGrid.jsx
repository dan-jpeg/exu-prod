import React, {useState} from "react";
import { selectedWorks } from "@/data.js";
import MobileWorkDisplay from "./MobileWorkDisplay";
import DateMobile from "@/components/0220.jsx";


export const MobileWorksGrid = () => {

        const [selectedWork, setSelectedWork] = useState(null);
        const handleWorkClick = (work) => {
                        setSelectedWork(work);
                };

        if (selectedWork) {
                        return <DateMobile work={selectedWorks[1]} onBack={() => setSelectedWork(null)} />;
                }

    return (
        <div className="w-full mt-8">
            <MobileWorkDisplay
                work={selectedWorks[0]}
                heightPair={['40vw', '40vw']}
                onWorkClick={handleWorkClick}
            />

            <MobileWorkDisplay
                work={selectedWorks[1]}
                heightPair={['30vw', '50vw']}
                onWorkClick={handleWorkClick}
            />

            <MobileWorkDisplay
                work={selectedWorks[2]}
                heightPair={['30vw', '40vw']}
                onWorkClick={handleWorkClick}
            />

            <MobileWorkDisplay
                work={selectedWorks[3]}
                heightPair={['25vw', '40vw']}
                onWorkClick={handleWorkClick}
            />

            <MobileWorkDisplay
                work={selectedWorks[4]}
                heightPair={['32vw', '48vw']}
                onWorkClick={handleWorkClick}
            />

            <MobileWorkDisplay
                work={selectedWorks[5]}
                heightPair={['30vw', '30vw']}
                onWorkClick={handleWorkClick}
            />

            <MobileWorkDisplay
                work={selectedWorks[6]}
                heightPair={['30vw', '40vw']}
                onWorkClick={handleWorkClick}
            />



            {/* Add more MobileWorkDisplay components with custom heightPairs as needed */}
        </div>
    );
};

export default MobileWorksGrid;