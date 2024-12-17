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

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        className="fixed  inset-0 bg-neutral-50 bg-opacity-70 flex items-center justify-center z-50"
                    >
                        <div className="text-neutral-800 cursor-none text-center text-lg">
                            <p
                                className="group cursor-zoom-in hover:opacity-25"
                                onClick={() => setContactOpen(true)}
                            >
                                contact
                            </p>
                            <p className="group cursor-zoom-in hover:opacity-25">
                                cv
                            </p>
                            <p
                                className="group cursor-zoom-out hover:opacity-25"
                                onClick={handleHomeClick}
                            >
                                home
                            </p>
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