import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import NavbarMenu from './NavbarMenu';
import CompanyLogo from '../CompanyLogo';
import { motion, AnimatePresence } from 'framer-motion';
import { NavbarButton, TrailingEffect } from './NavbarButton';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = !isOpen ? 'hidden' : 'unset';
  };
  return (
    <>
      <motion.nav 
        className="w-full absolute top-0 left-0 z-[9999]"
        animate={{
          y: isOpen ? 60 : 0,
        }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <div className="w-full mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <motion.div
              animate={{
                opacity: isOpen ? 0 : 1
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <CompanyLogo />
            </motion.div>
            <div className="relative">
              <NavbarButton isOpen={isOpen} toggleMenu={toggleMenu} />
              <AnimatePresence>
                <TrailingEffect isOpen={isOpen} />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.nav>
      <NavbarMenu isOpen={isOpen} toggleMenu={toggleMenu} />
    </>
  );
};


export default Navbar;