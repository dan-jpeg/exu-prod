import React from "react";
import WorkDisplay from "./WorkDisplay";
import { selectedWorks } from "@/projects-and-videos.js";

export const CustomComponent1 = () => (
    <div className="bg-white p-8 rounded-lg max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">Custom Component Details</h2>
        <p className="mb-4">This is a custom component that appears instead of the fullscreen image.</p>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h3 className="font-bold mb-2">Technical Details</h3>
                <ul className="list-disc pl-5">
                    <li>Material: Mixed media</li>
                    <li>Created: 2023</li>
                    <li>Dimensions: 24" x 36"</li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold mb-2">Artist's Notes</h3>
                <p>This piece explores the relationship between technology and nature...</p>
            </div>
        </div>
    </div>
);

// Interactive component example
export const CustomComponent2 = () => {
    const [activeTab, setActiveTab] = React.useState('description');

    return (
        <div className="bg-white p-8 rounded-lg max-w-4xl">
            <div className="flex border-b mb-6">
                <button
                    className={`px-4 py-2 ${activeTab === 'description' ? 'border-b-2 border-black font-bold' : ''}`}
                    onClick={() => setActiveTab('description')}
                >
                    Description
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'process' ? 'border-b-2 border-black font-bold' : ''}`}
                    onClick={() => setActiveTab('process')}
                >
                    Process
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'exhibition' ? 'border-b-2 border-black font-bold' : ''}`}
                    onClick={() => setActiveTab('exhibition')}
                >
                    Exhibition History
                </button>
            </div>

            <div>
                {activeTab === 'description' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Artwork Description</h2>
                        <p>This installation piece creates an immersive environment that challenges viewers to reconsider their relationship with digital media...</p>
                    </div>
                )}

                {activeTab === 'process' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Creation Process</h2>
                        <p>The work began as a series of digital sketches that were later translated into physical form...</p>
                    </div>
                )}

                {activeTab === 'exhibition' && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Exhibition History</h2>
                        <ul className="list-disc pl-5">
                            <li>Contemporary Art Museum, New York, 2023</li>
                            <li>International Digital Arts Festival, Berlin, 2022</li>
                            <li>Gallery of Modern Expression, Tokyo, 2022</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
