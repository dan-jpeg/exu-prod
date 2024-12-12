import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {exhibitions2} from "./data2.js";
import ContactsPage from "@/components/contacts-page/ContactsPage.jsx";
import OfficeMenu from "@/components/office-menu/OfficeMenu.jsx";



const ExhibitionsIndex = ({handleReturn}) => {
    const [selectedExhibition, setSelectedExhibition] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);


    const closeContact = () => {
        setMenuOpen(false);
        setContactOpen(false)
    }

    const handleHomeClick = () => {
        setMenuOpen(false);  // Close menu
        setContactOpen(false);  // Close contact if open
        handleReturn();  // Navigate home
    }
    return (
        <motion.div
            className="p-8 bg-white min-h-screen text-neutral-800"
            initial={{opacity: 0, x: -20}}
            animate={{opacity: 1, x: 0}}
            exit={{opacity: 0, x: 20}}
            transition={{duration: 0.2}}
        >
            <h2 className="font-newsreader italic mb-16">exhibitions</h2>
            <div className="space-y-8">
                {exhibitions2.map((exhibition) => (
                    <div key={exhibition.id}>
                        <div
                            className={`space-y-1 cursor-pointer transition-opacity duration-300
                ${selectedExhibition && selectedExhibition !== exhibition.id ? 'opacity-30' : 'opacity-100 hover:underline'}`}
                            onClick={() => setSelectedExhibition(selectedExhibition === exhibition.id ? null : exhibition.id)}
                        >
                            <p className="text-xs">{exhibition.date}</p>
                            <p className="text-xs italic">{exhibition.title}</p>
                            <p className="text-xs">{exhibition.category}</p>
                            <p className="text-xs">{exhibition.location}</p>
                        </div>

                        <AnimatePresence>
                            {selectedExhibition === exhibition.id && (
                                <motion.div
                                    initial={{height: 0, opacity: 1}}
                                    animate={{height: "auto", opacity: 1}}
                                    exit={{height: 0, opacity: 1}}
                                    transition={{duration: 0.2}}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-4 pb-8 space-y-4">
                                        {exhibition.header && (
                                            <p className="text-xs italic">{exhibition.header}</p>
                                        )}
                                        {exhibition.subheader && (
                                            <p className="text-xs">{exhibition.subheader}</p>
                                        )}
                                        {exhibition.textContent && (
                                            <div className="text-xs leading-relaxed">{exhibition.textContent}</div>
                                        )}
                                        {exhibition.workIncluded && exhibition.workIncluded.length > 0 && (
                                            <div className="space-y-2">
                                                <p className="text-xs font-medium">Works included:</p>
                                                {exhibition.workIncluded.map((work, index) => (
                                                    <div key={index} className="text-xs">
                                                        <p className="italic">{work.title}, {work.year}</p>
                                                        <p>{work.dimensions}</p>
                                                        <p>{work.material}</p>
                                                        {work.description && <p className="mt-1">{work.description}</p>}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>
            {/*<span className={`fixed bottom-1 font-newsreader cursor-alias hover:opacity-20  left-1/2 transform -translate-x-1/2`}*/}
            {/*      onClick={() => setMenuOpen(true)}>Office of Edie Xu</span>*/}
            {/*{menuOpen && (*/}
            {/*    <div*/}
            {/*        className="fixed font-newsreader inset-0 bg-neutral-50 bg-opacity-70 flex items-center justify-center z-50"*/}
            {/*    >*/}
            {/*        <div className="text-neutral-800 cursor-none text-center text-lg">*/}
            {/*            <p className="group cursor-zoom-in  hover:opacity-25"*/}
            {/*               onClick={() => setContactOpen(true)}>contact</p>*/}
            {/*            <p className="group cursor-zoom-in hover:opacity-25">cv</p>*/}
            {/*            <p className="group cursor-zoom-out  hover:opacity-25" onClick={handleHomeClick}>home</p>*/}
            {/*            <button*/}
            {/*                onClick={() => closeContact()}*/}

            {/*                className="mt- px-1 py-2 cursor-crosshair hover:opacity-10  rounded"*/}
            {/*            >*/}
            {/*                x*/}
            {/*            </button>*/}
            {/*        </div>*/}
            {/*    </div>*/}

            {/*)}*/}
            {/*{contactOpen && (*/}

            {/*   <ContactsPage closeContact={closeContact} />*/}

            {/*)}*/}

            <OfficeMenu handleReturn={handleReturn}/>
        </motion.div>
    );
};

export default ExhibitionsIndex;