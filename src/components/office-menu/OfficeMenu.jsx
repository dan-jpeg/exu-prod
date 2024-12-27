import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContactsPage from "@/components/contacts-page/ContactsPage.jsx";

const OfficeMenu = ({ handleReturn, expanding }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [contactOpen, setContactOpen] = useState(false);

    const closeContact = () => {
        setMenuOpen(false);
        setContactOpen(false);
    };

    const handleHomeClick = () => {
        setMenuOpen(false);
        setContactOpen(false);
        if (handleReturn) handleReturn();
    };

    const openAndExpand = () => {
        if (expanding) {
            handleReturn();
        }

        setMenuOpen(true);

    }

    return (
        <>
           <span
               className="text-custom cursor-pointer" // Matched to the original nav styling
               onClick={openAndExpand}
           >
                Edie Xu
            </span>

            {/*<AnimatePresence>*/}
            {/*    {menuOpen && (*/}
            {/*        <motion.div*/}
            {/*            initial={{opacity: 0}}*/}
            {/*            animate={{opacity: 1}}*/}
            {/*            exit={{opacity: 0}}*/}
            {/*            className="fixed font-bold text-2xl inset-0 bg-neutral-50 bg-opacity-100 flex items-center text-left pl-[31vw] z-50"*/}
            {/*        >*/}
            {/*            <div className="text-neutral-800 space-y-10 cursor-none text-center ">*/}

            {/*                <p*/}
            {/*                    className="group cursor-zoom-in hover:opacity-25"*/}
            {/*                    onClick={() => setContactOpen(true)}*/}
            {/*                >*/}
            {/*                    contact*/}
            {/*                </p>*/}
            {/*                <p className="group cursor-zoom-in hover:opacity-25">*/}
            {/*                    cv*/}
            {/*                </p>*/}
            {/*                <p*/}
            {/*                    className="group cursor-zoom-out hover:opacity-25"*/}
            {/*                    onClick={handleHomeClick}*/}
            {/*                >*/}
            {/*                    home*/}
            {/*                </p>*/}

            {/*            </div>*/}
            {/*        </motion.div>*/}
            {/*    )}*/}
            {/*</AnimatePresence>*/}

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className={`fixed inset-0 justify-center flex items-center bg-neutral-100 z-30 border-t border-neutral-100`}
                        initial={{y: expanding ? "0" : "50%", opacity: 0}}
                        animate={{y: 0, opacity: 1, duration: expanding ? 10 : 200}}
                        exit={{y: expanding ? "50%" : "-50%", opacity: 0}}
                        transition={{duration: 0.3, ease: "easeInOut"}}
                    >
                        <div className="flex flex-col items-start gap-0 p-8 pb-10">
                            <button
                                className="text-custom  hover:opacity-60"
                                onClick={() => setContactOpen(true)}
                            >
                                Contact
                            </button>
                            <button
                                className="text-custom  hover:opacity-60"
                                onClick={() => handleNavigate('exhibitions')}
                            >
                                CV
                            </button>
                            <button
                                className="text-custom hover:opacity-60"
                                onClick={() => handleHomeClick()}
                            >
                                Home
                            </button>
                            <button
                                onClick={closeContact}
                                className="px-1 py-2 cursor-crosshair hover:opacity-10 rounded"
                            >
                                x
                            </button>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {contactOpen && (
                    <ContactsPage closeContact={closeContact}/>
                )}
            </AnimatePresence>
        </>
    );
};

export default OfficeMenu;